"""Rendert public/og.png und public/apple-touch-icon.png aus den HTML-Vorlagen in tools/.

Aufruf: python -I tools/render_bilder.py
Braucht Google Chrome oder Microsoft Edge und Pillow (nur zur Größenprüfung).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BROWSER = [
    Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
    Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
]
AUFTRAEGE = [
    ("tools/og-vorlage.html", "public/og.png", (1200, 630)),
    ("tools/icon-vorlage.html", "public/apple-touch-icon.png", (180, 180)),
]


def main() -> int:
    browser = next((b for b in BROWSER if b.exists()), None)
    if not browser:
        print("Kein Chrome/Edge gefunden.")
        return 1
    from PIL import Image

    for vorlage, ziel, (w, h) in AUFTRAEGE:
        ziel_pfad = ROOT / ziel
        subprocess.run([
            str(browser), "--headless=new", "--disable-gpu", "--hide-scrollbars",
            "--force-device-scale-factor=1", f"--window-size={w},{h}",
            "--virtual-time-budget=4000", "--allow-file-access-from-files",
            f"--screenshot={ziel_pfad}", (ROOT / vorlage).as_uri(),
        ], check=True, capture_output=True, timeout=60)
        with Image.open(ziel_pfad) as img:
            if img.size != (w, h):
                print(f"{ziel}: falsche Größe {img.size}, erwartet {(w, h)}")
                return 1
        print(f"{ziel}: {w}×{h}, {ziel_pfad.stat().st_size} Bytes")
    return 0


if __name__ == "__main__":
    sys.exit(main())
