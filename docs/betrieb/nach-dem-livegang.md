# Nach dem Livegang

Stand: 19.10.2026. Die neue Seite ist live, alle 30 Live-Prüfungen (`bash tools/check_live.sh`) bestehen.

## 1. Vercel aufräumen (empfohlen)

Das GitHub-Repo ist noch mit zwei Vercel-Projekten verbunden. Sie veröffentlichen bei jedem Push eine Kopie der Seite
unter `*.vercel.app`. Die echte Domain läuft über Netlify, Vercel wird nicht mehr gebraucht.

1. Auf https://vercel.com einloggen.
2. Projekt **lmp-consulting-website** öffnen → **Settings** → ganz unten **Delete Project** → bestätigen.
3. Dasselbe für **lmp-consulting-website-xhhm**.

Danach sind die Kopien offline und bei Pushes laufen keine Vercel-Builds mehr.

## 2. E-Mail-Fälschung im Namen der Domain verhindern (optional, kostenlos)

Die Domain `lmpconsulting.de` verschickt keine Mails. Diese Einträge sagen allen Mailservern:
„Mails von @lmpconsulting.de sind immer gefälscht, bitte ablehnen.“ Die web.de-Adresse ist davon nicht betroffen.

1. Auf https://app.netlify.com einloggen → **Domains** → **lmpconsulting.de** → **DNS records** → **Add new record**.
2. Diese Einträge anlegen:

| Typ | Name | Wert |
|-----|------|------|
| TXT | `@` (oder leer lassen) | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject; adkim=s; aspf=s` |

3. Kurz Bescheid geben, dann prüfe ich die Einträge.

Falls später doch ein Postfach `@lmpconsulting.de` eingerichtet wird, müssen diese Einträge durch die des Mail-Anbieters ersetzt werden.

## 3. Änderungen an der Seite

Texte stehen in `public/index.html`, Gestaltung in `public/assets/site.css`. Vor jedem Push `python -I tests/check_site.py`,
nach dem Deploy `bash tools/check_live.sh`.
