@echo off
echo ========================================
echo Deployment-Probleme beheben
echo ========================================
echo.

echo Schritt 1: Aenderungen hinzufuegen...
git add .

echo Schritt 2: Commit mit Fix...
git commit -m "Fix: Add missing dependencies and remove experimental config"

echo Schritt 3: Zu GitHub pushen...
git push

echo.
echo ========================================
echo FERTIG! 
echo ========================================
echo.
echo Vercel wird automatisch neu deployen!
echo Gehen Sie zu Ihrem Vercel Dashboard und warten Sie 2-3 Minuten.
echo.
pause