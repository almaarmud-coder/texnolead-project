"""Vercel function that relays requests to NASA/JPL Horizons."""

from http.server import BaseHTTPRequestHandler
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
import json


HORIZONS_ENDPOINT = "https://ssd.jpl.nasa.gov/api/horizons.api"


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlsplit(self.path).query
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
                self._send(response.status, payload)
        except HTTPError as error:
            self._send(error.code, error.read())
        except (TimeoutError, URLError, OSError) as error:
            self._send_json(502, {"message": f"Could not reach NASA/JPL Horizons: {error}"})

    def _send(self, status, payload):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(payload)

    def _send_json(self, status, payload):
        self._send(status, json.dumps(payload).encode("utf-8"))
