# Nach dem Livegang

Stand: 19.10.2026. Die neue Seite ist live, alle 30 Live-Prüfungen (`bash tools/check_live.sh`) bestehen.

**Erledigt am 19.10.2026:** beide Vercel-Projekte gelöscht (alle `*.vercel.app`-Kopien liefern 404),
SPF- und DMARC-Einträge in Netlify DNS angelegt und per DNS-Abfrage geprüft. Die Abschnitte unten bleiben als Referenz.

## 1. Vercel aufräumen (erledigt)

Das GitHub-Repo ist noch mit zwei Vercel-Projekten verbunden. Sie veröffentlichen bei jedem Push eine Kopie der Seite
unter `*.vercel.app`. Die echte Domain läuft über Netlify, Vercel wird nicht mehr gebraucht.

1. Auf https://vercel.com einloggen.
2. Projekt **lmp-consulting-website** öffnen → **Settings** → ganz unten **Delete Project** → bestätigen.
3. Dasselbe für **lmp-consulting-website-xhhm**.

Danach sind die Kopien offline und bei Pushes laufen keine Vercel-Builds mehr.

## 2. E-Mail-Fälschung im Namen der Domain verhindern (erledigt)

Die Domain `lmpconsulting.de` verschickt keine Mails. Diese Einträge sagen allen Mailservern:
„Mails von @lmpconsulting.de sind immer gefälscht, bitte ablehnen.“ Die web.de-Adresse ist davon nicht betroffen.

1. Auf https://app.netlify.com einloggen → **Domains** → **lmpconsulting.de** → **DNS records** → **Add new record**.
2. Diese Einträge anlegen:

| Typ | Name | Wert |
|-----|------|------|
| TXT | `@` (oder leer lassen) | `v=spf1 -all` |
| TXT | `_dmarc` | `v=DMARC1; p=reject; adkim=s; aspf=s` |

3. Prüfen: `nslookup -type=TXT lmpconsulting.de` und `nslookup -type=TXT _dmarc.lmpconsulting.de`.

Falls später doch ein Postfach `@lmpconsulting.de` eingerichtet wird, müssen diese Einträge durch die des Mail-Anbieters ersetzt werden.

## 3. E-Mail-Weiterleitung info@lmpconsulting.de → web.de

Ziel: `info@lmpconsulting.de` bei Anmeldungen angeben können. Mails an diese Adresse landen im web.de-Postfach.
Senden von dieser Adresse geht damit nicht. Antworten kommen weiterhin von `lmpconsulting@web.de`.
Kosten: keine (Porkbun-Weiterleitung ist kostenlos, bis zu 20 Adressen).

**Schritt 1: Weiterleitung bei Porkbun anlegen**

1. Auf https://porkbun.com einloggen → oben **Account** → **Domain Management**.
2. Bei **lmpconsulting.de** auf **Email** (bzw. **Email Forwarding**) klicken.
3. Neue Weiterleitung anlegen: Adresse `info`, Ziel `lmpconsulting@web.de` → speichern.
4. Porkbun meldet eventuell, dass die Domain andere Nameserver nutzt. Das ist richtig so, weiter mit Schritt 2.

**Schritt 2: Einträge in Netlify DNS**

Das DNS der Domain liegt bei Netlify, nicht bei Porkbun. Deshalb müssen die Einträge dort angelegt werden.

1. Auf https://app.netlify.com einloggen → **Domains** → **lmpconsulting.de** → **DNS records**.
2. Zwei neue Einträge anlegen (**Add new record**):

| Typ | Name | Wert | Priorität |
|-----|------|------|-----------|
| MX | `@` (oder leer lassen) | `fwd1.porkbun.com` | 10 |
| MX | `@` (oder leer lassen) | `fwd2.porkbun.com` | 20 |

3. Den bestehenden TXT-Eintrag `v=spf1 -all` bearbeiten (Stift-Symbol) und ersetzen durch:
   `v=spf1 include:_spf.porkbun.com -all`
4. Den `_dmarc`-Eintrag **nicht** ändern. Er bleibt, weil die Domain selbst weiterhin keine Mails verschickt.

**Schritt 3: Testen**

1. 10 bis 30 Minuten warten (selten bis zu 48 Stunden).
2. Von einem anderen Postfach (z. B. Handy, Gmail) eine Mail an `info@lmpconsulting.de` schicken.
3. Im web.de-Postfach nachsehen, auch im Ordner **Spam** bzw. **Unbekannt**. Landet sie dort, als „Kein Spam“ markieren.

Prüfen per DNS: `nslookup -type=MX lmpconsulting.de` muss `fwd1.porkbun.com` und `fwd2.porkbun.com` zeigen.

Wird später ein echtes Postfach eingerichtet (Empfehlung: mailbox.org Standard, 36 €/Jahr), ersetzen dessen Einträge
die beiden MX-Einträge und den SPF-Eintrag oben. Dann die Weiterleitung bei Porkbun löschen.

## 4. Änderungen an der Seite

Texte stehen in `public/index.html`, Gestaltung in `public/assets/site.css`. Vor jedem Push `python -I tests/check_site.py`,
nach dem Deploy `bash tools/check_live.sh`.
