"""Prüft die statische Website in public/ und die Netlify-Konfiguration.

Aufruf: python -I tests/check_site.py   (Exit-Code 0 = alles in Ordnung)
"""
from __future__ import annotations

import sys
import tomllib
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
SEITEN = ["index.html", "impressum.html", "datenschutz.html", "404.html"]
PFLICHT_HEADER = [
    "Content-Security-Policy", "X-Content-Type-Options", "Referrer-Policy",
    "Permissions-Policy", "Strict-Transport-Security", "Cross-Origin-Opener-Policy",
]
ALTE_ROUTEN = ["/leistungen", "/kontakt", "/projekte", "/profil"]

fehler: list[str] = []


def fail(msg: str) -> None:
    fehler.append(msg)


class Seite(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.h1 = 0
        self.lang = None
        self.meta: dict[str, str] = {}
        self.links: list[str] = []
        self.inline_script = 0
        self.style_tag = 0
        self.style_attr = 0
        self.canonical = None
        self.text: list[str] = []
        self._in_script = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "style" in a:
            self.style_attr += 1
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "h1":
            self.h1 += 1
        if tag == "style":
            self.style_tag += 1
        if tag == "script":
            self._in_script = True
            typ = (a.get("type") or "").lower()
            if "src" not in a and typ != "application/ld+json":
                self.inline_script += 1
            if "src" in a:
                self.links.append(a["src"])
        if tag == "meta":
            key = a.get("name") or a.get("property")
            if key:
                self.meta[key] = a.get("content", "")
        if tag == "link":
            if a.get("rel") == "canonical":
                self.canonical = a.get("href")
            if a.get("href"):
                self.links.append(a["href"])
        if tag in ("a", "img", "source") and (a.get("href") or a.get("src")):
            self.links.append(a.get("href") or a.get("src"))

    def handle_endtag(self, tag):
        if tag == "script":
            self._in_script = False

    def handle_data(self, data):
        if not self._in_script:
            self.text.append(data)


def lokal_existiert(seite: Path, ziel: str) -> bool:
    u = urlparse(ziel)
    if u.scheme or ziel.startswith(("mailto:", "tel:", "#", "//")):
        return True
    pfad = u.path
    if not pfad:
        return True
    basis = PUBLIC if pfad.startswith("/") else seite.parent
    datei = (basis / pfad.lstrip("/")).resolve()
    if datei.is_dir():
        datei = datei / "index.html"
    return datei.exists() or datei.with_suffix(".html").exists()


def pruefe_seiten() -> None:
    for name in SEITEN:
        datei = PUBLIC / name
        if not datei.exists():
            fail(f"{name}: fehlt")
            continue
        p = Seite()
        p.feed(datei.read_text(encoding="utf-8"))
        text = " ".join(p.text)
        if p.lang != "de":
            fail(f"{name}: lang=\"de\" fehlt")
        if p.h1 != 1:
            fail(f"{name}: {p.h1} H1 statt genau einer")
        if p.inline_script:
            fail(f"{name}: {p.inline_script} Inline-Script(s), CSP würde blockieren")
        if p.style_tag or p.style_attr:
            fail(f"{name}: Inline-CSS ({p.style_tag} <style>, {p.style_attr} style=)")
        for key in ("viewport", "description"):
            if not p.meta.get(key):
                fail(f"{name}: meta {key} fehlt")
        for ziel in p.links:
            if not lokal_existiert(datei, ziel):
                fail(f"{name}: Link/Asset nicht gefunden: {ziel}")
        if name == "index.html":
            for key in ("og:title", "og:description", "og:image", "og:url"):
                if not p.meta.get(key):
                    fail(f"index.html: {key} fehlt")
            if p.canonical != "https://lmpconsulting.de/":
                fail("index.html: canonical fehlt oder falsch")
            if "keywords" in p.meta:
                fail("index.html: meta keywords entfernen")
            if "Gangelt" in text:
                fail("index.html: „Gangelt“ soll auf der Startseite nicht erscheinen")
            roh = datei.read_text(encoding="utf-8")
            if len(roh.split("<title>")[1].split("</title>")[0]) > 60:
                fail("index.html: Titel länger als 60 Zeichen")
            # Erfahrung: Wolken statt Zuordnung Branche -> Projekt, keine Detail-Fakten, kein Telefon
            if "tel:" in roh or "+49 1573" in text or '"telephone"' in roh or "Anruf" in text:
                fail("index.html: Telefon/Anruf soll auf der Startseite nicht erscheinen (nur Mail)")
            for weg in ("Zertifizierung", "PRINCE2", "Methoden"):
                if weg in text:
                    fail(f"index.html: „{weg}“ soll entfernt sein")
            for klasse in ('class="werkzeuge"', 'class="fakten"', 'class="branchen"'):
                if klasse in roh:
                    fail(f"index.html: {klasse} soll entfernt sein")
            if 'class="wolke branchen-wolke"' not in roh or 'class="wolke themen-wolke"' not in roh:
                fail("index.html: Branchen- und Themenwolke fehlen")
            if roh.count("data-zahl=") != 3:
                fail("index.html: genau drei hochzählende Zahlen erwartet")
        if name in ("impressum.html", "datenschutz.html", "404.html"):
            if "noindex" not in p.meta.get("robots", ""):
                fail(f"{name}: robots noindex fehlt")
        if name == "datenschutz.html" and "Vorlage" in text:
            fail("datenschutz.html: Vorlagen-Hinweis noch vorhanden")
        if name == "impressum.html" and "Gangelt" not in text:
            fail("impressum.html: Pflichtangabe Anschrift fehlt")


def pruefe_dateien() -> None:
    for rel in ["assets/site.css", "assets/faden.js", "assets/fonts/SchibstedGrotesk-Variable.woff2",
                "assets/fonts/OFL.txt", "favicon.svg", "og.png", "apple-touch-icon.png",
                "robots.txt", "sitemap.xml", ".well-known/security.txt"]:
        if not (PUBLIC / rel).exists():
            fail(f"public/{rel}: fehlt")
    robots = PUBLIC / "robots.txt"
    if robots.exists() and "Disallow: /" in robots.read_text(encoding="utf-8"):
        fail("robots.txt: keine Disallow-Regeln mehr (noindex reicht)")
    sec = PUBLIC / ".well-known" / "security.txt"
    if sec.exists():
        t = sec.read_text(encoding="utf-8")
        if "Contact:" not in t or "Expires:" not in t:
            fail("security.txt: Contact und Expires sind Pflicht")
    for alt in ["index.html", "impressum.html", "datenschutz.html", "vercel.json"]:
        if (ROOT / alt).exists():
            fail(f"{alt} liegt noch im Root (wird nicht mehr veröffentlicht)")


def pruefe_netlify() -> None:
    datei = ROOT / "netlify.toml"
    if not datei.exists():
        fail("netlify.toml fehlt")
        return
    cfg = tomllib.loads(datei.read_text(encoding="utf-8"))
    if cfg.get("build", {}).get("publish") != "public":
        fail("netlify.toml: publish = \"public\" fehlt")
    header = {}
    for h in cfg.get("headers", []):
        if h.get("for") == "/*":
            header = h.get("values", {})
    for name in PFLICHT_HEADER:
        if name not in header:
            fail(f"netlify.toml: Header {name} fehlt")
    csp = header.get("Content-Security-Policy", "")
    for teil in ["default-src 'self'", "frame-ancestors 'none'", "object-src 'none'"]:
        if teil not in csp:
            fail(f"netlify.toml: CSP ohne {teil}")
    if "unsafe-inline" in csp:
        fail("netlify.toml: CSP darf kein 'unsafe-inline' enthalten")
    redirects = {r.get("from"): r for r in cfg.get("redirects", [])}
    for route in ALTE_ROUTEN:
        r = redirects.get(route)
        if not r or r.get("status") != 301:
            fail(f"netlify.toml: 301-Weiterleitung für {route} fehlt")


def main() -> int:
    pruefe_seiten()
    pruefe_dateien()
    pruefe_netlify()
    if fehler:
        print(f"{len(fehler)} Problem(e):")
        for f in fehler:
            print("  -", f)
        return 1
    print("Alle Prüfungen bestanden.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
