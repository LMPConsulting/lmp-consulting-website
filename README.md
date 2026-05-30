# LMP Consulting GmbH — Website

Statische One-Page-Website der LMP Consulting GmbH. Kein Build-Step, keine externen
Schriften, keine Tracker, keine JavaScript-Bibliotheken. Alle Animationen sind SMIL
und CSS, alle Grafiken inline SVG.

## Dateien

- `index.html` — Startseite (Hero, Leistungen 2x2, Kontakt) mit allen Animationen
- `impressum.html` — Pflichtangaben gemäß § 5 DDG
- `datenschutz.html` — Datenschutzerklärung (datensparsam, ohne Cookies)
- `robots.txt`, `sitemap.xml` — SEO
- `vercel.json` — Konfiguration für Vercel (cleanUrls + Redirects der alten Routen)

## Lokal anschauen

Einfach `index.html` im Browser öffnen, oder von der Konsole:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Deployment

Vercel erkennt das Repo als statische Seite (kein Build-Befehl). Push auf `main`
deployt automatisch. Die `vercel.json` setzt zusätzlich saubere URLs und einige
Security-Header.

## Inhalte ändern

Texte, Animationen und Tokens sitzen alle in `index.html`. Das Design-System
(Farben, Typo, Spacing) ist als CSS-Variablen am Anfang der Datei dokumentiert.
