# TexnoLead — Lunar Landing Site Navigator

TexnoLead is an interactive lunar south-pole site and date planner for the NASA Space Apps Challenge. It pairs date-specific Sun/Earth ephemerides from JPL Horizons with LOLA terrain and illumination products. It does not use fabricated mission or demo values.

## Run locally

```bash
python3 -m pip install -r requirements.txt
python3 server.py
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000). Internet access is required for NASA/JPL Horizons, Moon Trek tiles, and the LOLA raster analysis. Do not open `index.html` as a `file://` URL; the local server supplies the same-origin NASA data routes.

To let teammates on the same local network open the app, start it with `python3 server.py --host 0.0.0.0 --port 8000`, then share your computer's local network address on port 8000.

## What the app does

- Shows NASA Moon Trek LRO/LOLA color shaded relief for the south polar region and an on/off, georeferenced 120 m permanent-shadow (PSR) overlay.
- Lets the user choose the TexnoLead reference point, the USGS catalog centers for Mons Mouton and Shackleton, or a custom point clicked on the map.
- Compares the named reference points and any user-entered coordinate within the 75°S–90°S map coverage. The challenge does not prescribe a fixed comparison-site count; custom points are labeled as user inputs, not official NASA locations.
- Requests hourly apparent Sun and Earth azimuth/elevation from JPL Horizons for a selected site and UTC date interval.
- Reads NASA LOLA DEM/slope rasters for point elevation and a 500 m neighborhood slope summary, and computes a 0.5°-spaced local terrain skyline out to 80 km.
- Corrects Sun/Earth visibility and the ideal horizontal-panel energy estimate against that local terrain skyline. Solar and Earth disc radii are included for partial-disc visibility.
- Explains zero Sun/Earth visibility when the selected date interval has no direct view above the local LOLA skyline, and identifies a point marked as permanent shadow by the LOLA PSR raster.
- Reports the nearest mapped PSR pixel within 20 km and the NASA LOLA long-term average Sun/Earth visibility at the selected point.
- Scans a configurable local grid using NASA LOLA average Sun/Earth visibility, slope, elevation, and PSR flags. Clicking a grid cell selects it and requests a date-specific analysis.
- Shows the straight-line distance from the selected point to the nearest mapped PSR pixel; it is not a rover route, safe approach, or ice confirmation.
- Compares multiple sites over the same UTC dates and ranks them with a visible, equal-weight screening index: normalized ideal panel energy (50%) plus Earth-center clearance above a configurable minimum angle (50%).
- Searches 90, 180, or 365 days for mission-start dates. The search uses 6-hour Horizons samples and the same terrain model; selecting a candidate then runs the precise hourly calculation.
- Provides a one-click, Dec 1–30, 2026 LZ A scenario, adjustable average system load and battery capacity, an idealized hourly battery simulation, and hours when Earth-center clearance meets the selected angle.
- Downloads the current hourly calculation, assumptions, terrain summary, sources, and limitations as a JSON mission report.
- Plots terrain-relative elevation and timeline bars for Sun visibility, Earth-disc visibility, and Earth-center clearance windows.
- Includes a collapsible, phased post-hackathon roadmap; planned instruments and modules are clearly identified as future work.
- Adds a visible navigation shortcut that opens the roadmap, plus a map-pin popup for Landing Zone A and its team-estimated PSR target.
- Displays the supplied thermal ranges and “High Stability” team assessment as estimates, separate from live Horizons/LOLA calculations.

## Data sources and resolution

- **Basemap:** NASA Moon Trek WMTS `LRO_LOLA_ClrShade_SPole75_30mp_v04` (75°S–90°S, color shaded relief). This visual tile layer is not treated as a numeric elevation raster.
- **Elevation and slope:** NASA GSFC PGDA [Product 90](https://pgda.gsfc.nasa.gov/products/90), the 80 m/pixel LOLA DEM and slope COG for the region poleward of 80°S. The local server reads the COG over HTTP range requests. Where that coverage is not used, the analysis reads the 120 m/pixel LOLA PDS DEM and slope labels/rasters. The app reports the point raster resolution used.
- **Long-term Sun visibility, Earth visibility, and PSR:** NASA GSFC PGDA [Product 69](https://pgda.gsfc.nasa.gov/products/69), the 120 m/pixel south-polar LOLA products. These are long-term averages over the lunar nutation cycle (about 18.6 years), not date-specific forecasts. The map PSR overlay is generated from the official `LPSR_75S_120M_201608` raster and aligned to its south-polar stereographic extent.
- **Live positions:** [NASA/JPL Horizons](https://ssd-api.jpl.nasa.gov/doc/horizons.html), Sun target 10 and Earth target 399, lunar surface observer `coord@301`, east-positive geodetic coordinates in longitude/latitude/altitude-km order, UTC, quantity 4 (azimuth/elevation). The LZ A team reference uses +38.15°E, −84.81° latitude, +6.0 km; other named references use a 0.0 km Horizons altitude assumption by default.
- **Feature names/centers:** [USGS Planetary Names](https://planetarynames.wr.usgs.gov/Feature/16070) for Mons Mouton and [Shackleton](https://planetarynames.wr.usgs.gov/Feature/5450). Catalog crater centers are comparison references, not landing recommendations.
- **Team references:** the main point is −84.81° (84.81°S), +38.81°E; the separate Landing Zone A/JPL observer input is −84.81° (84.81°S), +38.15°E at +6.0 km. The app treats them as separate team-provided inputs. The 130 km Mons Mouton feature diameter is from USGS; NASA describes the mountain as roughly 6,000 m above nearby terrain, which is relative relief rather than the LZ A point altitude. Team slope, PSR distance/size, and temperature inputs are labeled as estimates, not live NASA measurements.

## Model and interpretation

- The LOLA surface elevation is used to build terrain horizons from rays sampled at the DEM grid spacing. Each 0.5° azimuth ray scans up to 80 km. The model includes lunar curvature and reports the source grid spacing. It does not resolve hazards smaller than that grid or replace a higher-resolution landing-zone survey.
- JPL Horizons supplies the body direction; a local terrain skyline is subtracted from apparent elevation. The Sun's approximate 0.266° angular radius and Earth's approximate 0.95° angular radius determine partial-disc visibility.
- Energy is a theoretical estimate: 1361 W/m² × horizontal panel area × efficiency × positive sine of Sun elevation × visible solar-disc fraction, integrated between samples. The separate battery scenario assumes a full battery at the start and excludes panel temperature, conversion and wiring loss, thermal loads, hardware limits, dust, and actual battery charge behavior.
- The Earth-center elevation threshold is a conservative visibility proxy for communication planning, not a direct radio link budget, antenna model, DSN schedule, or relay availability.
- The balanced index is only a transparent early-screening heuristic, not a NASA metric, site certification, or landing-safety score. It weights normalized ideal panel energy and the fraction of time Earth-center elevation meets the configured threshold equally; users should compare the component values as well.
- The candidate grid uses Product 69's long-term average maps for regional pre-screening. Each selected cell must be checked separately with date-specific Horizons and the local terrain model.
- The PSR layer identifies persistent-shadow map cells. A PSR does not establish that water ice is present. Diviner seasonal temperature, a verified PSR thermal reading, DSN radio link budget, relay availability, and lander-specific power/thermal design are not yet part of the computed result.
- NASA's 5 m SDEM/slope products cover selected Artemis candidate regions only; the app does not claim 5 m coverage at every user-selected coordinate. The app does not return Diviner temperature at an arbitrary selected point or treat a PSR map cell as evidence of water ice.
- TexnoLead is an independent NASA Space Apps project and is not endorsed by NASA.

## References

- NASA Space Apps Challenge — [Lunar Landing Site Navigator](https://www.spaceappschallenge.org/2026/challenges/lunar-landing-site-navigator/)
- NASA GSFC PGDA — [A New View of the Lunar South Pole from LOLA (Product 90)](https://pgda.gsfc.nasa.gov/products/90), Barker et al. (2023), doi:10.3847/PSJ/acf3e1
- NASA GSFC PGDA — [Lunar Polar Illumination (Product 69)](https://pgda.gsfc.nasa.gov/products/69), Mazarico et al. (2011), doi:10.1016/j.icarus.2010.10.030
- NASA Moon Trek — [Portal](https://trek.nasa.gov/moon/) and [WMTS documentation](https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=moon)
- NASA/JPL — [Horizons API documentation](https://ssd-api.jpl.nasa.gov/doc/horizons.html)
- NASA SVS — [Mons Mouton relief](https://svs.gsfc.nasa.gov/5074/)
