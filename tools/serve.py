"""Lokaler Server für public/ mit den Headern und Weiterleitungen aus netlify.toml.

Aufruf: python -I tools/serve.py [port]   (Standard: 8766)
So lassen sich CSP-Verletzungen schon lokal in der Browser-Konsole sehen.
"""
from __future__ import annotations

import sys
import tomllib
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
CFG = tomllib.loads((ROOT / "netlify.toml").read_text(encoding="utf-8"))
HEADER = next((h["values"] for h in CFG.get("headers", []) if h.get("for") == "/*"), {})
# HSTS und upgrade-insecure-requests stören auf http://localhost
HEADER = {k: v for k, v in HEADER.items() if k != "Strict-Transport-Security"}
if "Content-Security-Policy" in HEADER:
    HEADER["Content-Security-Policy"] = HEADER["Content-Security-Policy"].replace("; upgrade-insecure-requests", "")
REDIRECTS = {r["from"]: (r["to"], r.get("status", 301)) for r in CFG.get("redirects", [])}


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self) -> None:
        for k, v in HEADER.items():
            self.send_header(k, v)
        super().end_headers()

    def do_GET(self) -> None:  # noqa: N802
        pfad = self.path.split("?")[0].split("#")[0]
        if pfad in REDIRECTS:
            ziel, status = REDIRECTS[pfad]
            self.send_response(status)
            self.send_header("Location", ziel)
            self.end_headers()
            return
        datei = PUBLIC / pfad.lstrip("/")
        if pfad != "/" and not datei.exists() and (PUBLIC / (pfad.lstrip("/") + ".html")).exists():
            self.path = pfad + ".html"
        elif pfad != "/" and not datei.exists():
            inhalt = (PUBLIC / "404.html").read_bytes()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(inhalt)))
            self.end_headers()
            self.wfile.write(inhalt)
            return
        super().do_GET()


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8766
    server = ThreadingHTTPServer(("127.0.0.1", port), partial(Handler, directory=str(PUBLIC)))
    print(f"http://127.0.0.1:{port}  (Strg+C beendet)")
    server.serve_forever()


if __name__ == "__main__":
    main()
