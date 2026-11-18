"""Vercel function for coordinate-specific NASA LOLA site analysis."""

from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlsplit
import json

from server import _raster_lock, lunar_site_analysis


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        params = parse_qs(urlsplit(self.path).query)
        try:
            lat = float(params["lat"][0])
            lon = float(params["lon"][0])
            with _raster_lock:
                payload = lunar_site_analysis(lat, lon)
            self._send_json(200, payload)
        except (KeyError, IndexError, ValueError) as error:
            self._send_json(400, {"message": str(error) or "Latitude and longitude are required."})
        except Exception as error:
            self._send_json(502, {"message": f"Could not read NASA LOLA data: {error}"})

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        cache_control = "public, s-maxage=86400, stale-while-revalidate=604800" if status == 200 else "no-store"
        self.send_header("Cache-Control", cache_control)
        self.end_headers()
        self.wfile.write(body)
