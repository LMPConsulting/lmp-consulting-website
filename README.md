# LMP Consulting GmbH — Website

Statische One-Page der LMP Consulting GmbH. Kein Build-Schritt, keine Frameworks, keine Tracker,
keine externen Schriften oder Skripte. Gehostet auf Netlify.

## Aufbau

- `public/` — alles, was veröffentlicht wird
  - `index.html`, `impressum.html`, `datenschutz.html`, `404.html`
  - `assets/site.css` — gesamte Gestaltung (Farben und Schrift als CSS-Variablen am Anfang)
  - `assets/faden.js` — der rote Faden und das Schließen des Mobilmenüs
  - `assets/fonts/` — Schibsted Grotesk (OFL, Lizenz liegt daneben)
  - `og.png`, `favicon.svg`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`, `.well-known/security.txt`
- `netlify.toml` — Publish-Ordner, Security-Header (CSP u. a.), Weiterleitungen alter Adressen
- `tests/check_site.py` — automatische Prüfungen
- `tools/` — lokaler Server mit echten Headern, Rendern des Vorschaubilds
- `design-entwuerfe/` — Designentwürfe aus dem Redesign (werden nicht veröffentlicht)
- `docs/` — Audit, Spezifikation, Umsetzungsplan

## Regeln

- Kein Inline-CSS, kein Inline-JavaScript, keine `style`-Attribute: die Content-Security-Policy erlaubt nur Dateien von der eigenen Domain.
- Externe Ressourcen (Fonts, CDNs, Analytics) nicht einbinden, sonst müssen CSP und Datenschutzerklärung angepasst werden.

## Lokal ansehen und prüfen

```bash
python -I tools/serve.py
```

Dann `http://127.0.0.1:8766` öffnen. Der Server sendet dieselben Header wie Netlify.

```bash
python -I tests/check_site.py
```

Nach Änderungen an `tools/og-vorlage.html` das Vorschaubild neu erzeugen:

```bash
python -I tools/render_bilder.py
```

## Deployment

Push auf `main` deployt über Netlify (dauert etwa 20 Sekunden). Danach prüfen:

```bash
bash tools/check_live.sh
```
