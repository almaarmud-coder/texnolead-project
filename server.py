"""Serve TexnoLead and relay its NASA/JPL Horizons requests."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen
from functools import lru_cache
from threading import RLock
import argparse
import json
import math


try:
    import numpy as np
    import rasterio
    from rasterio.windows import Window
    _RASTER_IMPORT_ERROR = None
except ImportError as error:  # The NASA/JPL ephemeris view still works without the optional terrain stack.
    np = None
    rasterio = None
    Window = None
    _RASTER_IMPORT_ERROR = error


ROOT = Path(__file__).resolve().parent
HORIZONS_ENDPOINT = "https://ssd.jpl.nasa.gov/api/horizons.api"
LUNAR_RADIUS_M = 1_737_400.0
PDS_ROOT = "https://pds-geosciences.wustl.edu/lro/lro-l-lola-3-rdr-v1/lrolol_1xxx"
NASA_LOLA_80M = "https://pgda.gsfc.nasa.gov/data/LOLA_20mpp/"
TERRAIN_RADIUS_M = 80_000
TERRAIN_AZIMUTH_STEP_DEG = 0.5
_raster_lock = RLock()


def _raster_url(product):
    urls = {
        "dem80": f"{NASA_LOLA_80M}LDEM_80S_80MPP_ADJ.TIF",
        "slope80": f"{NASA_LOLA_80M}LDSM_80S_80MPP_ADJ.TIF",
        "dem120": f"{PDS_ROOT}/data/lola_gdr/polar/img/ldem_75s_120m.lbl",
        "slope120": f"{PDS_ROOT}/data/lola_gdr/polar/img/ldsm_75s_120m.lbl",
        "sunAverage": f"{PDS_ROOT}/extras/illumination/img/avgvisib_75s_120m_201608.lbl",
        "earthAverage": f"{PDS_ROOT}/extras/illumination/img/avgvisib_75s_120m_201608_earth.lbl",
        "psr": f"{PDS_ROOT}/extras/illumination/img/lpsr_75s_120m_201608.lbl",
    }
    return urls[product]


def _require_raster_stack(purpose):
    if rasterio is None or np is None:
        detail = f" Import error: {_RASTER_IMPORT_ERROR}" if _RASTER_IMPORT_ERROR else ""
        raise RuntimeError(f"{purpose} requires NumPy and Rasterio, but they could not be loaded in this deployment.{detail}")


@lru_cache(maxsize=7)
def _open_lola_raster(product):
    _require_raster_stack("NASA LOLA analysis")
    with rasterio.Env(
        GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR",
        CPL_VSIL_CURL_ALLOWED_EXTENSIONS=".TIF,.tif,.lbl,.LBL,.img,.IMG",
        CPL_VSIL_CURL_CACHE_SIZE="16777216",
        GDAL_HTTP_MAX_RETRY="3",
        GDAL_HTTP_RETRY_DELAY="1",
    ):
        return rasterio.open("/vsicurl/" + _raster_url(product))


def _project_south_pole(lat, lon):
    """LOLA lunar south-polar stereographic coordinates (meters, east-positive)."""
    latitude = math.radians(lat)
    longitude = math.radians(lon % 360)
    rho = 2 * LUNAR_RADIUS_M * math.tan(math.pi / 4 + latitude / 2)
    return rho * math.sin(longitude), rho * math.cos(longitude)


def _unproject_south_pole(x, y):
    rho = math.hypot(x, y)
    lat = math.degrees(2 * (math.atan(rho / (2 * LUNAR_RADIUS_M)) - math.pi / 4))
    lon = math.degrees(math.atan2(x, y)) % 360
    return lat, lon


def _physical_values(product, raw):
    if product in ("sunAverage", "earthAverage"):
        return np.asarray(raw, dtype="float64") * 0.00004
    if product == "psr":
        return np.asarray(raw, dtype="float64") * 0.000025 + 0.5
    if product in ("dem120", "slope120"):
        # Values come from the PDS labels: DEM height = DN × 0.5 m; slope = DN × 0.0015 + 45°.
        return np.asarray(raw, dtype="float64") * (0.5 if product == "dem120" else 0.0015) + (0.0 if product == "dem120" else 45.0)
    return np.asarray(raw, dtype="float64")


def _read_square(product, x, y, radius_m):
    """Return a masked raster window and its top-left row/column."""
    dataset = _open_lola_raster(product)
    row, col = dataset.index(x, y)
    pixel = abs(dataset.transform.a)
    half = max(1, math.ceil(radius_m / pixel))
    col0, row0 = max(0, col - half), max(0, row - half)
    col1, row1 = min(dataset.width, col + half + 1), min(dataset.height, row + half + 1)
    if col0 >= col1 or row0 >= row1:
        return None, row0, col0, pixel
    values = dataset.read(1, window=Window(col0, row0, col1 - col0, row1 - row0), masked=True)
    return values, row0, col0, pixel


def _site_raster_metrics(product, x, y, slope_product):
    dataset = _open_lola_raster(product)
    row, col = dataset.index(x, y)
    if not (0 <= row < dataset.height and 0 <= col < dataset.width):
        return None
    center = dataset.read(1, window=Window(col, row, 1, 1), masked=True)[0, 0]
    if np.ma.is_masked(center) or not np.isfinite(float(center)):
        return None
    dem_scale = 0.5 if product == "dem120" else 1.0
    elevation_m = float(center) * dem_scale

    slopes = _open_lola_raster(slope_product)
    slope_row, slope_col = slopes.index(x, y)
    px = abs(slopes.transform.a)
    half = max(1, math.ceil(500 / px))
    row0, col0 = max(0, slope_row - half), max(0, slope_col - half)
    row1, col1 = min(slopes.height, slope_row + half + 1), min(slopes.width, slope_col + half + 1)
    patch = slopes.read(1, window=Window(col0, row0, col1 - col0, row1 - row0), masked=True)
    patch_values = _physical_values(slope_product, patch.astype("float64").filled(np.nan))
    yy, xx = np.ogrid[row0:row1, col0:col1]
    local_disk = ((xx - slope_col) * px) ** 2 + ((yy - slope_row) * px) ** 2 <= 500 ** 2
    usable = local_disk & np.isfinite(patch_values) & (patch_values >= 0) & (patch_values <= 90)
    slope_values = patch_values[usable]
    return {
        "elevationM": round(elevation_m, 1),
        "slopeMedianDeg": round(float(np.median(slope_values)), 2) if slope_values.size else None,
        "slopeP90Deg": round(float(np.percentile(slope_values, 90)), 2) if slope_values.size else None,
        "slopeSamples": int(slope_values.size),
        "resolutionM": round(px, 1),
    }


def _terrain_horizon(dem_product, x, y, lon, observer_elevation_m):
    dem = _open_lola_raster(dem_product)
    pixel = abs(dem.transform.a)
    radius = TERRAIN_RADIUS_M
    data, row0, col0, pixel = _read_square(dem_product, x, y, radius)
    if data is None:
        return None
    height_scale = 0.5 if dem_product == "dem120" else 1.0
    heights = _physical_values(dem_product, data.astype("float64").filled(np.nan))

    distances = np.arange(max(160.0, 2 * pixel), radius + 0.1, pixel, dtype="float64")
    bearings = np.arange(0.0, 360.0, TERRAIN_AZIMUTH_STEP_DEG, dtype="float64")
    lon_radians = math.radians(lon % 360)
    bearing_radians = np.deg2rad(bearings)
    horizon = np.full(bearings.shape, -90.0, dtype="float64")
    origin_radius = LUNAR_RADIUS_M + observer_elevation_m
    theta = 2 * np.arctan(distances / (2 * LUNAR_RADIUS_M))
    cos_theta, sin_theta = np.cos(theta), np.sin(theta)

    # Batch bearings to bound memory while scanning the source LOLA DEM at its native grid spacing.
    for first in range(0, len(bearings), 48):
        last = min(first + 48, len(bearings))
        angle = lon_radians + bearing_radians[first:last, None]
        xx = x + distances[None, :] * np.sin(angle)
        yy = y + distances[None, :] * np.cos(angle)
        cols = np.floor((xx - dem.transform.c) / dem.transform.a).astype("int32")
        rows = np.floor((dem.transform.f - yy) / abs(dem.transform.e)).astype("int32")
        inside = ((cols >= col0) & (cols < col0 + heights.shape[1]) &
                  (rows >= row0) & (rows < row0 + heights.shape[0]))
        local_cols = np.clip(cols - col0, 0, heights.shape[1] - 1)
        local_rows = np.clip(rows - row0, 0, heights.shape[0] - 1)
        ray_heights = heights[local_rows, local_cols]
        valid = inside & np.isfinite(ray_heights)
        target_radius = LUNAR_RADIUS_M + ray_heights
        numerator = target_radius * cos_theta[None, :] - origin_radius
        denominator = target_radius * sin_theta[None, :]
        angles = np.degrees(np.arctan2(numerator, denominator))
        angles[~valid] = -np.inf
        batch = np.max(angles, axis=1)
        horizon[first:last] = np.where(np.isfinite(batch), batch, -90.0)

    return {
        "stepDeg": TERRAIN_AZIMUTH_STEP_DEG,
        "maxRadiusKm": round(radius / 1000, 1),
        "valuesDeg": [round(float(value), 3) for value in horizon],
        "sourceResolutionM": round(pixel, 1),
    }


def lunar_site_analysis(lat, lon):
    _require_raster_stack("NASA LOLA terrain analysis")
    if not -90 <= lat <= -75:
        raise ValueError("NASA south-polar raster coverage is 75°S–90°S.")

    x, y = _project_south_pole(lat, lon)
    # The current 80 m COG is defined poleward of 80°S. Use its full 80 km ray range only
    # where the selected point has enough coverage; otherwise use NASA's 120 m PDS mosaic.
    if lat <= -83.5:
        dem_product, slope_product = "dem80", "slope80"
    else:
        dem_product, slope_product = "dem120", "slope120"
    site = _site_raster_metrics(dem_product, x, y, slope_product)
    if site is None:
        raise ValueError("No LOLA terrain sample is available at this coordinate.")

    def one_pixel(product):
        dataset = _open_lola_raster(product)
        row, col = dataset.index(x, y)
        if not (0 <= row < dataset.height and 0 <= col < dataset.width):
            return None
        value = dataset.read(1, window=Window(col, row, 1, 1), masked=True)[0, 0]
        if np.ma.is_masked(value) or not np.isfinite(float(value)):
            return None
        scaled = float(_physical_values(product, np.asarray(value)))
        if product in ("sunAverage", "earthAverage"):
            return round(scaled * 100, 1)
        if product == "psr":
            return bool(scaled >= 0.5) if 0 <= scaled <= 1 else None
        return scaled

    illumination = {
        "averageSunVisibilityPct": one_pixel("sunAverage"),
        "averageEarthVisibilityPct": one_pixel("earthAverage"),
        "permanentShadowAtPoint": one_pixel("psr"),
    }

    # Measure the nearest 120 m LOLA permanently-shadowed pixel within 20 km.
    psr_ds = _open_lola_raster("psr")
    psr_window, psr_row0, psr_col0, psr_pixel = _read_square("psr", x, y, 20_000)
    nearest_psr = None
    if psr_window is not None:
        raw_psr = _physical_values("psr", psr_window.astype("float64").filled(np.nan))
        valid_psr = np.isfinite(raw_psr) & (raw_psr >= 0.5) & (raw_psr <= 1.0)
        if np.any(valid_psr):
            local_rows, local_cols = np.nonzero(valid_psr)
            global_rows, global_cols = local_rows + psr_row0, local_cols + psr_col0
            pixel_x, pixel_y = rasterio.transform.xy(psr_ds.transform, global_rows, global_cols, offset="center")
            distances = np.hypot(np.asarray(pixel_x) - x, np.asarray(pixel_y) - y)
            selected = int(np.argmin(distances))
            psr_lat, psr_lon = _unproject_south_pole(float(pixel_x[selected]), float(pixel_y[selected]))
            nearest_psr = {
                "distanceKm": round(float(distances[selected]) / 1000, 2),
                "lat": round(psr_lat, 4), "lon": round(psr_lon, 4),
            }

    horizon = _terrain_horizon(dem_product, x, y, lon, site["elevationM"])
    return {
        "source": "NASA LRO / LOLA",
        "elevationSource": "LDEM_80S_80MPP_ADJ" if dem_product == "dem80" else "LDEM_75S_120M",
        "slopeSource": "LDSM_80S_80MPP_ADJ" if slope_product == "slope80" else "LDSM_75S_120M",
        "site": site,
        "illumination": illumination,
        "nearestPsr": nearest_psr,
        "psrSearchRadiusKm": 20,
        "horizon": horizon,
        "averagePeriod": "LOLA 18.6-year nutation-cycle product (2016 release)",
    }


def lunar_site_scout(lat, lon, radius_km=8.0, spacing_km=1.0):
    """Return a regional LOLA pre-screen grid; cells are not landing-safety ratings."""
    _require_raster_stack("NASA LOLA scouting")
    if not -90 <= lat <= -75:
        raise ValueError("NASA south-polar raster coverage is 75°S–90°S.")
    if not 2 <= radius_km <= 12 or not 0.5 <= spacing_km <= 3:
        raise ValueError("Scouting radius must be 2–12 km and grid spacing 0.5–3 km.")
    center_x, center_y = _project_south_pole(lat, lon)
    dem_product, slope_product = ("dem80", "slope80") if lat <= -83.5 else ("dem120", "slope120")
    radius_m, spacing_m = radius_km * 1000, spacing_km * 1000
    products = (dem_product, slope_product, "sunAverage", "earthAverage", "psr")
    rasters = {}
    for product in products:
        dataset = _open_lola_raster(product)
        values, row0, col0, pixel = _read_square(product, center_x, center_y, radius_m + spacing_m)
        if values is not None:
            rasters[product] = (dataset, values, row0, col0, pixel)

    def sample(product, x, y):
        entry = rasters.get(product)
        if entry is None:
            return None
        dataset, values, row0, col0, _pixel = entry
        row, col = dataset.index(x, y)
        local_row, local_col = row - row0, col - col0
        if not (0 <= local_row < values.shape[0] and 0 <= local_col < values.shape[1]):
            return None
        raw = values[local_row, local_col]
        if np.ma.is_masked(raw) or not np.isfinite(float(raw)):
            return None
        value = float(_physical_values(product, np.asarray(raw)))
        if product in ("sunAverage", "earthAverage"):
            return round(value * 100, 1)
        if product == "psr":
            return bool(value >= 0.5) if 0 <= value <= 1 else None
        if product in ("slope80", "slope120"):
            return round(value, 2) if 0 <= value <= 90 else None
        if product == "dem120":
            return round(value, 1)
        return round(value, 1)

    offsets = np.arange(-radius_m, radius_m + spacing_m * 0.25, spacing_m)
    cells = []
    for offset_x in offsets:
        for offset_y in offsets:
            if math.hypot(float(offset_x), float(offset_y)) > radius_m:
                continue
            x, y = center_x + float(offset_x), center_y + float(offset_y)
            cell_lat, cell_lon = _unproject_south_pole(x, y)
            if cell_lat > -75 or cell_lat < -90:
                continue
            cell = {
                "lat": round(cell_lat, 5), "lon": round(cell_lon, 5),
                "x": round(x, 1), "y": round(y, 1),
                "elevationM": sample(dem_product, x, y),
                "slopeDeg": sample(slope_product, x, y),
                "sunAveragePct": sample("sunAverage", x, y),
                "earthAveragePct": sample("earthAverage", x, y),
                "permanentShadow": sample("psr", x, y),
            }
            if cell["sunAveragePct"] is not None and cell["earthAveragePct"] is not None and cell["slopeDeg"] is not None:
                cells.append(cell)
    return {
        "source": "NASA LOLA / LRO",
        "averagePeriod": "18.6-year nutation-cycle average (2016 release)",
        "center": {"lat": lat, "lon": lon},
        "radiusKm": radius_km,
        "gridSpacingKm": spacing_km,
        "terrainResolutionM": rasters.get(slope_product, (None, None, None, None, 120))[4],
        "illuminationResolutionM": rasters.get("sunAverage", (None, None, None, None, 120))[4],
        "sampleCount": len(cells),
        "cells": cells,
    }


class TexnoLeadHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        route = urlsplit(self.path)
        if route.path == "/api/horizons":
            self._proxy_horizons(route.query)
            return
        if route.path == "/api/lola/site":
            self._lola_site(route.query)
            return
        if route.path == "/api/lola/scout":
            self._lola_scout(route.query)
            return
        super().do_GET()

    def _lola_site(self, query):
        try:
            params = dict(part.split("=", 1) for part in query.split("&") if "=" in part)
            lat = float(params["lat"])
            lon = float(params["lon"])
            with _raster_lock:
                payload = lunar_site_analysis(lat, lon)
            self._send_json(200, payload)
        except (KeyError, ValueError) as error:
            self._send_json(400, {"message": str(error) or "Latitude and longitude are required."})
        except Exception as error:
            self._send_json(502, {"message": f"Could not read NASA LOLA data: {error}"})

    def _lola_scout(self, query):
        try:
            params = dict(part.split("=", 1) for part in query.split("&") if "=" in part)
            lat = float(params["lat"])
            lon = float(params["lon"])
            radius_km = float(params.get("radiusKm", "8"))
            spacing_km = float(params.get("spacingKm", "1"))
            with _raster_lock:
                payload = lunar_site_scout(lat, lon, radius_km, spacing_km)
            self._send_json(200, payload)
        except (KeyError, ValueError) as error:
            self._send_json(400, {"message": str(error) or "Latitude and longitude are required."})
        except Exception as error:
            self._send_json(502, {"message": f"Could not read NASA LOLA scouting rasters: {error}"})

    def _proxy_horizons(self, query):
        if not query or len(query) > 12_000:
            self._send_json(400, {"message": "A Horizons query is required (maximum 12,000 characters)."})
            return

        request = Request(
            f"{HORIZONS_ENDPOINT}?{query}",
            headers={"Accept": "application/json", "User-Agent": "TexnoLead-Lunar-Site-Navigator/1.0"},
        )
        try:
            with urlopen(request, timeout=90) as response:
                payload = response.read()
                self.send_response(response.status)
                self._send_headers(len(payload))
                self.wfile.write(payload)
        except HTTPError as error:
            payload = error.read()
            self.send_response(error.code)
            self._send_headers(len(payload))
            self.wfile.write(payload)
        except (TimeoutError, URLError, OSError) as error:
            self._send_json(502, {"message": f"Could not reach NASA/JPL Horizons: {error}"})

    def _send_headers(self, content_length):
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(content_length))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self._send_headers(len(body))
        self.wfile.write(body)


def main():
    parser = argparse.ArgumentParser(description="Run the TexnoLead lunar navigator with a JPL Horizons relay.")
    parser.add_argument("--port", type=int, default=8000, help="Local HTTP port (default: 8000)")
    parser.add_argument("--host", default="127.0.0.1", help="Bind address; use 0.0.0.0 to allow devices on the same network")
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.host, args.port), TexnoLeadHandler)
    shown_host = "127.0.0.1" if args.host == "0.0.0.0" else args.host
    print(f"TexnoLead running at http://{shown_host}:{args.port}")
    if args.host == "0.0.0.0":
        print("LAN sharing enabled: open this port only on a trusted local network.")
    print("NASA Moon Trek map tiles and JPL Horizons calculations need internet access.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping TexnoLead.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
