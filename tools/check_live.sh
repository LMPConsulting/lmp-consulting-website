#!/usr/bin/env bash
# Prüft die ausgelieferte Website nach einem Deployment.
# Aufruf: bash tools/check_live.sh [basis-url]   (Standard: https://lmpconsulting.de)
B="${1:-https://lmpconsulting.de}"
ok=0; fail=0
pruef() { if eval "$2"; then echo "  OK    $1"; ok=$((ok+1)); else echo "  FEHLT $1"; fail=$((fail+1)); fi; }

H=$(curl -s -D - -o /tmp/live_index.html "$B/")
echo "Startseite"
pruef "Status 200" 'echo "$H" | head -1 | grep -q " 200"'
pruef "neuer Titel" 'grep -q "Prozessberatung | LMP Consulting" /tmp/live_index.html'
pruef "kein Gangelt auf der Startseite" '! grep -q "Gangelt" /tmp/live_index.html'
for h in Content-Security-Policy X-Content-Type-Options Referrer-Policy Permissions-Policy Strict-Transport-Security Cross-Origin-Opener-Policy; do
  pruef "Header $h" 'echo "$H" | grep -qi "^$h:"'
done
pruef "CSP mit frame-ancestors 'none'" 'echo "$H" | grep -i "^content-security-policy:" | grep -q "frame-ancestors '"'"'none'"'"'"'
pruef "HSTS mit includeSubDomains" 'echo "$H" | grep -i "^strict-transport-security:" | grep -qi "includeSubDomains"'

echo "Weiterleitungen"
for r in leistungen kontakt projekte profil; do
  R=$(curl -s -D - -o /dev/null "$B/$r")
  pruef "/$r -> 301" 'echo "$R" | head -1 | grep -q " 301"'
done
pruef "www -> Apex" 'curl -s -D - -o /dev/null https://www.lmpconsulting.de/ | grep -qi "^location: https://lmpconsulting.de/"'
pruef "http -> https" 'curl -s -D - -o /dev/null http://lmpconsulting.de/ | grep -qi "^location: https://lmpconsulting.de/"'

echo "Unterseiten und Dateien"
code() { curl -s -o /dev/null -w "%{http_code}" "$B$1"; }
pruef "/impressum 200" '[ "$(code /impressum)" = 200 ]'
pruef "Impressum mit Anschrift" 'curl -s "$B/impressum" | grep -q "52538 Gangelt"'
pruef "Datenschutz ohne Vorlagen-Hinweis" '! curl -s "$B/datenschutz" | grep -q "Vorlage"'
pruef "404 für unbekannte Seite" '[ "$(code /gibt-es-nicht)" = 404 ]'
pruef "404-Seite im neuen Stil" 'curl -s "$B/gibt-es-nicht" | grep -q "Hier reißt der Faden ab"'
pruef "security.txt 200" '[ "$(code /.well-known/security.txt)" = 200 ]'
pruef "og.png 200" '[ "$(code /og.png)" = 200 ]'
pruef "Schrift 200" '[ "$(code /assets/fonts/SchibstedGrotesk-Variable.woff2)" = 200 ]'
for f in /README.md /netlify.toml /vercel.json /tests/check_site.py /design-entwuerfe/index.html; do
  pruef "$f nicht öffentlich" '[ "$(code $f)" = 404 ]'
done

echo "Ergebnis: $ok OK, $fail fehlen"
[ "$fail" -eq 0 ]
