@echo off
echo ========================================
echo LMP Consulting Website - GitHub Upload
echo ========================================
echo.

echo Schritt 1: Git initialisieren...
git init

echo Schritt 2: Alle Dateien hinzufuegen...
git add .

echo Schritt 3: Ersten Commit erstellen...
git commit -m "Initial commit: LMP Consulting Website"

echo Schritt 4: Branch umbenennen...
git branch -M main

echo.
echo ========================================
echo WICHTIG: Fuehren Sie jetzt folgende Schritte aus:
echo ========================================
echo.
echo 1. Gehen Sie zu GitHub.com und erstellen Sie ein Repository namens 'lmp-consulting-website'
echo 2. Kopieren Sie die Repository-URL (z.B. https://github.com/IhrUsername/lmp-consulting-website.git)
echo 3. Fuehren Sie dann aus:
echo    git remote add origin [IHRE-REPOSITORY-URL]
echo    git push -u origin main
echo.
echo Beispiel:
echo git remote add origin https://github.com/montyozwirk/lmp-consulting-website.git
echo git push -u origin main
echo.
pause