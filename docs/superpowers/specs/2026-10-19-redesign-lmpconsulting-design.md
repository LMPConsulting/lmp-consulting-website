# Redesign lmpconsulting.de — Design-Spezifikation

Stand: 19.10.2026 · Grundlage: Entwurf [A2](../../../design-entwuerfe/a2-roter-faden.html), Audit [2026-10-19](../../audit/2026-10-19-audit.md)

## Ziel

Eine schlichte, hochwertige One-Page für die LMP Consulting GmbH, die nicht nach KI-Baukasten aussieht.
Die Seite ist eine Visitenkarte, die man im Gespräch weitergibt. Sie soll nicht über generische Suchen Kunden gewinnen.
Gleichzeitig werden alle Security- und Audit-Befunde behoben. Alles geht in einem Release live.

## Entscheidungen

| Thema | Entscheidung |
|---|---|
| Richtung | A „Roter Faden“ in der Fassung A2 |
| Hintergrund | Kühlgrau `#eceff1`, Kontakt und Fußzeile dunkel in Anthrazit |
| Stimme | „Wir“ bzw. „LMP Consulting“ als Absender, sachlich, kein Ich |
| Person | Kein Foto, kein Avatar, kein Name auf der Startseite (Name nur im Impressum) |
| Ort | Gangelt erscheint nicht auf der Startseite, nur im Impressum (Pflichtangabe) |
| Leistungen | Drei Schwerpunkte statt vier |
| Erfahrung | Branchen mit Projektarten, drei belegte Zahlen, keine Firmennamen |
| Logo | Rote Fadenschlaufe + „LMP Consulting GmbH“ in Schrift, ersetzt das blaue LMP-Quadrat |
| Kontakt | `lmpconsulting@web.de` und Telefon, kein Domain-Postfach, kein Formular |
| SEO | Nur Grundhygiene: Titel, Beschreibung, Vorschaubild, Sitemap, strukturierte Basisdaten |
| Hosting | Netlify bleibt, Konfiguration über `netlify.toml`; Vercel nur noch für die Vorschau, danach trennen |

## Gestaltung

**Farben**

| Rolle | Wert |
|---|---|
| Hintergrund | `#eceff1` Kühlgrau |
| Text | `#2b3236` Anthrazit (angelehnt an RAL 7016) |
| Sekundärtext | `#575e63` |
| Linien | `rgba(43,50,54,.16)` |
| Akzent / Faden | `#c8161d` Verkehrsrot (angelehnt an RAL 3020) |
| Dunkler Abschluss | `#2b3236` mit Text `#eef0f0` und `#b9c0c3` |

Alle Text-Kombinationen erfüllen WCAG AA (geprüft: 5,2:1 bis 13:1).

**Schrift:** Schibsted Grotesk (OFL), variabel 400–800, selbst gehostet als WOFF2. Keine Fremd-Requests.
Skala: Fließtext 18 px, Lead 18–22 px, H3 21–23 px, H2 32–56 px, H1 44–104 px, große Zahlen 40–72 px.

**Layout:** linksbündig, maximale Breite 1280 px, links eine freie Spur (56–160 px, mobil 26 px), in der der Faden läuft.
Keine Karten, keine Schatten, keine Großbuchstaben-Labels, keine Pfeile an Buttons, keine Nummerierung außer beim Vorgehen (echte Abfolge).

**Blickfang (der einzige):** Der rote Faden.
- Beim Laden zeichnet sich im Hero ein Knäuel (2,2 s, einmalig).
- Beim Scrollen läuft der Faden aus dem Knäuel in die linke Spur, setzt an jeder Abschnittsüberschrift einen Knoten, läuft auf dem Desktop quer durch die vier Vorgehensschritte und endet als Unterstreichung der Mailadresse.
- Mobil: Knäuel über der Headline, Faden sofort in die Spur, Vorgehensschritte als Knoten auf der Spur.
- Der Faden kreuzt nie Text.
- `prefers-reduced-motion`: Faden vollständig und statisch, keine Animation.
- Ohne JavaScript: Seite vollständig nutzbar, nur ohne Faden.

## Seitenaufbau und Inhalte

1. **Kopf:** Logo (Schlaufe + „LMP Consulting GmbH“), Navigation Leistungen · Vorgehen · Erfahrung · Kontakt; mobil Menü-Button.
2. **Hero:** H1 „Jedes IT‑Projekt braucht einen roten Faden.“ Lead „LMP Consulting steuert IT‑Projekte, verbessert Prozesse und automatisiert, was sich wiederholt. Für Konzerne und Mittelstand, in Deutschland und international.“ Buttons „Projekt besprechen“ und „Leistungen ansehen“.
3. **Leistungen** („Drei Schwerpunkte, ein durchgehender Plan.“)
   - IT‑Projekte & Transformation: Projekt- und Programmleitung, PMO; SAP-, Cloud- und SaaS-Migrationen; Ablösung von Altsystemen; Steuerung von Lieferanten und Partnern.
   - Prozesse & Automatisierung: Prozessaufnahme und Modellierung (BPMN, SAP Signavio); Soll-Prozesse und Optimierung; Automatisierung mit RPA und Python; Test, Abnahme, Übergabe.
   - KI in der Praxis: Use-Case-Portfolio und Priorisierung; Pilotierung, Schulung und Change; Datenschutz- und Compliance-Leitplanken.
4. **Vorgehen** („So arbeiten wir.“): Verstehen → Planen → Umsetzen → Übergeben.
5. **Erfahrung** („Erfahrung aus Projekten in unterschiedlichen Branchen.“)
   - Automotive: SAP-S/4HANA-Migration, Ablösung von Altsystemen, Prozessautomatisierung mit RPA und Python
   - Versicherung: Cloud-Ablösung von Legacy-Komponenten, Einführung von KI-Anwendungen, Aufbau internationaler IT-Hubs
   - Finanzdienstleistung: SAP-S/4HANA-Transformation zentraler Geschäftsprozesse
   - IT‑Dienstleistung: Cloud-Transformation einer gewachsenen IT-Landschaft auf Microsoft Azure
   - Zahlen: 2,5 Mio. € gesteuertes Programmvolumen in einem Projekt · 25 Beteiligte über mehrere Teilprojekte · 1,2 FTE jährlich eingespart durch eine Automatisierung
   - Fakten: Methoden agil/klassisch/hybrid · PRINCE2 · Deutsch, Englisch · vor Ort und remote
   - Werkzeuge: SAP S/4HANA, SAP Signavio, Microsoft Azure, Jira, Confluence, UiPath, Python, MS Project
   - Quelle aller Angaben: Projektliste und Lebenslauf vom Oktober 2026. Keine Firmennamen.
6. **Kontakt** (dunkel): „Worum geht es in Ihrem Projekt?“, kurzer Satz, große Mailadresse (Ende des Fadens), Telefon.
7. **Fuß** (dunkel): © 2026 LMP Consulting GmbH · Impressum · Datenschutz.

**Impressum und Datenschutz:** gleiche Gestaltung (Kühlgrau, Schrift, Logo), Inhalte bleiben.
Im Datenschutz wird nur der Vorlagen-Hinweis entfernt und die zuständige Aufsichtsbehörde (LDI NRW) ergänzt.
Ein Hinweis, dass Schriften lokal geladen werden, kommt dazu.

**404-Seite:** kurze Seite im gleichen Stil, Text „Hier reißt der Faden ab.“ mit Link zur Startseite.

## Technik

```
public/
  index.html, impressum.html, datenschutz.html, 404.html
  assets/site.css        Gestaltung für alle Seiten
  assets/faden.js        Faden + Mobilmenü (kein Inline-JS)
  assets/fonts/          Schibsted Grotesk WOFF2 (OFL, mit Lizenzdatei)
  og.png                 Vorschaubild 1200×630
  favicon.svg, apple-touch-icon.png
  robots.txt, sitemap.xml, .well-known/security.txt
netlify.toml             Publish-Ordner, Security-Header, 301-Weiterleitungen
tests/check_site.py      automatische Prüfungen (siehe unten)
```

- Kein Build-Schritt, kein Framework, keine Abhängigkeiten zur Laufzeit.
- Kein Inline-CSS, kein Inline-JS, keine `style`-Attribute, damit die strenge CSP greift.
- `vercel.json`, `README.md` und alte Root-Dateien liegen nicht mehr im veröffentlichten Ordner.
- Die Schrift wird einmalig aus dem offiziellen Repository `github.com/schibsted/schibsted-grotesk` (OFL) geladen und mit Lizenz ins Repo gelegt.
- Vorschaubild und Touch-Icon werden aus einer SVG-Vorlage per Headless-Browser gerendert.

**Security (alle Audit-Befunde S1, S3–S5, R1–R3):** CSP `default-src 'self'`, `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`,
`Permissions-Policy`, HSTS mit `includeSubDomains`, COOP; interne Dateien nicht mehr öffentlich; `security.txt`;
Weiterleitungen `/leistungen`, `/kontakt`, `/projekte`, `/profil` mit 301.

**SEO-Grundhygiene:** Titel ≤ 60 Zeichen, Meta-Beschreibung, `og:*` mit Bild, `canonical`, JSON-LD `ProfessionalService` (ohne Adresse auf der Startseite, mit Logo),
`robots.txt` ohne Sperren (Rechtliches nur per `noindex`), Sitemap mit der Startseite. Kein `meta keywords`.

## Prüfung

`tests/check_site.py` (Python-Standardbibliothek) prüft vor jedem Push:
- alle HTML-Dateien parsen, genau eine H1 pro Seite, `lang="de"`
- kein `<script>` ohne `src`, kein `<style>`, kein `style=`-Attribut
- alle internen Links und Assets existieren
- Pflicht-Meta vorhanden (`title`, `description`, `og:image`, `canonical`, `viewport`)
- `netlify.toml` enthält alle Security-Header und Weiterleitungen
- kein „Gangelt“ auf der Startseite, kein Vorlagen-Hinweis im Datenschutz

Danach Sichtprüfung im Browser: Desktop 1440 px, Tablet 768 px, Mobil 375 px, Reduced Motion, ohne JavaScript, Tastatur-Fokus.
Nach dem Livegang: Header per `curl -I` gegen die echte Domain prüfen.

## Ablauf bis live

1. Branch `redesign` pushen, Vercel erzeugt eine Vorschau-URL.
2. Du prüfst die Vorschau. Änderungswünsche fließen auf denselben Branch.
3. Nach deinem OK: Merge auf `main`, Netlify deployt.
4. Prüfen, dass Netlify den neuen Stand ausliefert. Falls Netlify nicht mit GitHub verbunden ist, zeigt sich das hier und wir verbinden es.
5. Danach räumst du die zwei Vercel-Projekte auf (Anleitung folgt).

## Nicht im Umfang

Domain-Postfach, Kontaktformular, englische Version, Blog, Tracking, Porträt.

## Optional, nach dem Livegang

Drei kostenlose DNS-Einträge in Netlify (SPF `-all`, DMARC `reject`, Null-MX), damit niemand Mails im Namen von `@lmpconsulting.de` fälschen kann.
Zwei Minuten Aufwand, Klickanleitung folgt auf Wunsch.
