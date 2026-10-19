# Redesign lmpconsulting.de Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die freigegebene Gestaltung A2 („Roter Faden“) als produktive, statische One-Page mit Impressum, Datenschutz und 404 bauen, alle Security-/Audit-Befunde beheben und auf Netlify ausliefern.

**Architecture:** Reines HTML/CSS/Vanilla-JS ohne Build-Schritt im Ordner `public/`. Gestaltung in einer CSS-Datei, Faden und Mobilmenü in einer JS-Datei, nichts inline (strenge CSP). `netlify.toml` setzt Publish-Ordner, Header und Weiterleitungen. Ein Python-Prüfskript sichert Struktur, Links, Meta-Daten und CSP-Tauglichkeit.

**Tech Stack:** HTML5, CSS (Custom Properties), Vanilla JS (SVG, `getPointAtLength`), Schibsted Grotesk Variable (OFL, selbst gehostet), Python 3.12 (Standardbibliothek) für Prüfungen, Headless Chrome für Bild-Rendering, Netlify.

**Quelle der Gestaltung:** `design-entwuerfe/a2-roter-faden.html` (freigegeben). Spezifikation: `docs/superpowers/specs/2026-10-19-redesign-lmpconsulting-design.md`.

---

## Dateistruktur

| Datei | Verantwortung |
|---|---|
| `tests/check_site.py` | Automatische Prüfungen aller Seiten und der Netlify-Konfiguration |
| `tools/serve.py` | Lokaler Server, der die Header aus `netlify.toml` mitsendet (CSP-Test) |
| `tools/render_bilder.py` | Rendert `og.png` und `apple-touch-icon.png` per Headless Chrome |
| `tools/og-vorlage.html`, `tools/icon-vorlage.html` | Vorlagen für die Bilder |
| `public/assets/site.css` | Komplette Gestaltung (Tokens, Layout, Seiten) |
| `public/assets/faden.js` | Roter Faden, Mobilmenü schließen |
| `public/assets/fonts/` | `SchibstedGrotesk-Variable.woff2`, `OFL.txt` |
| `public/index.html` | Startseite |
| `public/impressum.html`, `public/datenschutz.html`, `public/404.html` | Unterseiten |
| `public/favicon.svg`, `public/og.png`, `public/apple-touch-icon.png` | Icons, Vorschaubild |
| `public/robots.txt`, `public/sitemap.xml`, `public/.well-known/security.txt` | Crawler, Security-Kontakt |
| `netlify.toml` | Publish-Ordner, Header, Weiterleitungen |
| `README.md` | Aktualisierte Projektbeschreibung |
| gelöscht: `index.html`, `impressum.html`, `datenschutz.html`, `robots.txt`, `sitemap.xml`, `vercel.json` im Root | |

---

### Task 1: Prüfskript (zuerst, muss scheitern)

**Files:** Create `tests/check_site.py`

- [ ] **Step 1: Prüfskript schreiben**

```python
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
            if len((datei.read_text(encoding='utf-8').split('<title>')[1].split('</title>')[0])) > 60:
                fail("index.html: Titel länger als 60 Zeichen")
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
```

- [ ] **Step 2: Laufen lassen, muss scheitern**

Run: `python -I tests/check_site.py`
Expected: Exit 1, u. a. „index.html: fehlt“, „netlify.toml fehlt“, „index.html liegt noch im Root“.

- [ ] **Step 3: Commit** — `git add tests/check_site.py && git commit -m "Prüfskript für die neue Website"`

---

### Task 2: Schrift und Icons

**Files:** Create `public/assets/fonts/SchibstedGrotesk-Variable.woff2`, `public/assets/fonts/OFL.txt`, `public/favicon.svg`

- [ ] **Step 1: Schrift aus dem offiziellen Repo laden (OFL, ~70 KB)**

```bash
mkdir -p public/assets/fonts
curl -sL -o public/assets/fonts/SchibstedGrotesk-Variable.woff2 "https://raw.githubusercontent.com/schibsted/schibsted-grotesk/main/fonts/variable/SchibstedGrotesk%5Bwght%5D.woff2"
curl -sL -o public/assets/fonts/OFL.txt "https://raw.githubusercontent.com/schibsted/schibsted-grotesk/main/OFL.txt"
```

Prüfen: Datei beginnt mit `wOF2`, Größe ≈ 70 444 Bytes; OFL.txt enthält „SIL OPEN FONT LICENSE“.

- [ ] **Step 2: Favicon (rote Schlaufe auf Kühlgrau)**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#eceff1"/><path d="M4 21C11 21 13 8 18.5 10C24 12 19.5 22 15 18C11.5 15 17 21 28 21" fill="none" stroke="#c8161d" stroke-width="2.6" stroke-linecap="round"/></svg>
```

---

### Task 3: Gestaltung `public/assets/site.css`

**Files:** Create `public/assets/site.css`

Übernimmt den kompletten `<style>`-Block aus `design-entwuerfe/a2-roter-faden.html` mit diesen Änderungen:
- `@font-face` für `Schibsted Grotesk` mit `url("fonts/SchibstedGrotesk-Variable.woff2") format("woff2")`, `font-weight: 400 800`, `font-display: swap`.
- Dunkler Abschluss nicht mehr über `body.dunkel-unten`, sondern fest über `.kontakt` und `.fuss`.
- `.platzhalter` entfällt.
- Mobilmenü als `<details class="menu">` (funktioniert ohne JS): `.menu` nur unter 760 px sichtbar, `.nav` dort ausgeblendet.
- Neue Regeln für Unterseiten (`.unterseite`, `.recht h2`, `.recht p`) und 404 (`.fehlerseite`).
- Utility-Klassen statt `style=`-Attribute.

---

### Task 4: Faden-Script `public/assets/faden.js`

**Files:** Create `public/assets/faden.js`

Übernimmt das Faden-Script aus A2 (Funktionen `knaeuelPunkte`, `glatt`, `bauen`, `sichtbareLaenge`, `zeichnen`, `intro`) unverändert in der Logik, mit:
- Abbruch, wenn `#faden` nicht existiert (Unterseiten).
- `bauen()` erneut nach `load` (Bilder/Fonts) und per `ResizeObserver` auf `document.body`.
- Mobilmenü: Klick auf Link im `<details class="menu">` schließt es (`details.open = false`).
- Kein Entwurfs-Umschalter.

---

### Task 5: Seiten

**Files:** Create `public/index.html`, `public/impressum.html`, `public/datenschutz.html`, `public/404.html`

- Startseite: Markup aus A2, Inhalte laut Spezifikation, Head mit Titel „IT-Projektmanagement & Prozessberatung | LMP Consulting“ (≤ 60 Zeichen), Beschreibung, `canonical`, `og:*`, `twitter:card`, `theme-color #eceff1`, Favicon/Touch-Icon, `site.css`, `faden.js` mit `defer`, JSON-LD `ProfessionalService` (Name, URL, E-Mail, Telefon, Logo, `areaServed`, `knowsAbout`, keine Adresse).
- Impressum: Inhalte unverändert aus dem alten `impressum.html`, neue Gestaltung, `noindex`.
- Datenschutz: Inhalte aus dem alten `datenschutz.html` ohne Vorlagen-Hinweis; ergänzt um „Schriftarten werden lokal geladen“ und die zuständige Aufsichtsbehörde (Landesbeauftragte für Datenschutz und Informationsfreiheit NRW).
- 404: „Hier reißt der Faden ab.“, Link zur Startseite, `noindex`.

---

### Task 6: Netlify und Crawler-Dateien

**Files:** Create `netlify.toml`, `public/robots.txt`, `public/sitemap.xml`, `public/.well-known/security.txt`; Delete `vercel.json`, Root-`index.html`, `impressum.html`, `datenschutz.html`, `robots.txt`, `sitemap.xml`; Modify `README.md`

`netlify.toml`:

```toml
[build]
  publish = "public"

[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"
    Cross-Origin-Opener-Policy = "same-origin"

[[headers]]
  for = "/assets/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/leistungen"
  to = "/#leistungen"
  status = 301
[[redirects]]
  from = "/kontakt"
  to = "/#kontakt"
  status = 301
[[redirects]]
  from = "/projekte"
  to = "/#erfahrung"
  status = 301
[[redirects]]
  from = "/profil"
  to = "/#erfahrung"
  status = 301
```

`robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://lmpconsulting.de/sitemap.xml
```

`security.txt`:

```
Contact: mailto:lmpconsulting@web.de
Expires: 2027-10-19T00:00:00.000Z
Preferred-Languages: de, en
Canonical: https://lmpconsulting.de/.well-known/security.txt
```

`sitemap.xml`: eine URL `https://lmpconsulting.de/` mit `lastmod` 2026-10-19.

- [ ] Run: `python -I tests/check_site.py` → Expected: nur noch fehlende Bilder (`og.png`, `apple-touch-icon.png`).

---

### Task 7: Vorschaubild und Touch-Icon

**Files:** Create `tools/og-vorlage.html`, `tools/icon-vorlage.html`, `tools/render_bilder.py`, `public/og.png`, `public/apple-touch-icon.png`

- Vorlagen nutzen `../public/assets/site.css`-Tokens und die lokale Schrift. OG: Kühlgrau, Headline links, Knäuel rechts, „LMP Consulting GmbH“ unten. Icon: Schlaufe auf Kühlgrau.
- `render_bilder.py` ruft Chrome headless auf: `--headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=4000 --screenshot=<ziel> file:///<vorlage>`; Icon analog mit 180×180.
- [ ] Run: `python -I tools/render_bilder.py` → Expected: beide PNGs existieren, Größe 1200×630 bzw. 180×180 (mit Pillow geprüft).
- [ ] Run: `python -I tests/check_site.py` → Expected: „Alle Prüfungen bestanden.“
- [ ] Commit.

---

### Task 8: Prüfung im Browser

**Files:** Create `tools/serve.py` (liest Header aus `netlify.toml`, liefert `public/` auf Port 8766 aus, 404 → `404.html`)

- [ ] Startseite bei 1440, 768, 375 px: Faden kreuzt keinen Text, Knoten an allen H2, Ende unter der Mailadresse.
- [ ] Konsole: keine CSP-Verletzungen, keine Fehler.
- [ ] Reduced Motion: Faden statisch vollständig.
- [ ] Ohne JS: Inhalte und Navigation nutzbar.
- [ ] Tastatur: Skip-Link, sichtbarer Fokus.
- [ ] Unterseiten und 404 im neuen Stil.
- [ ] Commit.

---

### Task 9: Vorschau

- [ ] `git push -u origin redesign`
- [ ] Vercel-Vorschau-URL über `https://api.github.com/repos/LMPConsulting/lmp-consulting-website/commits/<sha>/statuses` ermitteln.
- [ ] Vorschau im Browser prüfen und dem Nutzer schicken. Kein Merge auf `main` ohne ausdrückliche Freigabe.
