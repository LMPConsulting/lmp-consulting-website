@echo off
echo ========================================
echo Git Konfiguration und Upload
echo ========================================
echo.

echo Schritt 1: Git Benutzer konfigurieren...
git config --global user.email "info@lmp-consulting.de"
git config --global user.name "Monty Ozwirk"

echo Schritt 2: Alle Dateien hinzufuegen...
git add .

echo Schritt 3: Commit erstellen...
git commit -m "Initial commit: LMP Consulting Website"

echo Schritt 4: Branch sicherstellen...
git branch -M main

echo.
echo ========================================
echo JETZT: Repository URL hinzufuegen und pushen
echo ========================================
echo.
echo Fuehren Sie diese Befehle aus (ersetzen Sie USERNAME durch Ihren GitHub Username):
echo.
echo git remote add origin https://github.com/USERNAME/lmp-consulting-website.git
echo git push -u origin main
echo.
echo Beispiel:
echo git remote add origin https://github.com/montyozwirk/lmp-consulting-website.git
echo git push -u origin main
echo.
pause