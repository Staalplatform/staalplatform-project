@echo off
echo 🚀 Staalplatform Setup Script
echo.

echo 📁 Maak .env bestanden aan...
echo.

echo 🔧 Frontend .env bestand:
if exist "Frontend\.env" (
    echo ⚠️  Frontend .env bestand bestaat al!
) else (
    copy "Frontend\env.template" "Frontend\.env"
    echo ✅ Frontend .env bestand aangemaakt
    echo 📝 Vul je Supabase en API URLs in Frontend\.env
)

echo.
echo 🔧 Backend .env bestand:
if exist "Backend\.env" (
    echo ⚠️  Backend .env bestand bestaat al!
) else (
    copy "Backend\env.template" "Backend\.env"
    echo ✅ Backend .env bestand aangemaakt
    echo 📝 Vul je API keys in Backend\.env
)

echo.
echo 📦 Installeer dependencies...
echo.

echo 🔧 Frontend dependencies:
cd Frontend
call npm install
cd ..

echo.
echo 🔧 Backend dependencies:
cd Backend
call npm install
cd ..

echo.
echo ✅ Setup voltooid!
echo.
echo 📋 Volgende stappen:
echo 1. Vul je API keys in de .env bestanden
echo 2. Start Frontend: cd Frontend && npm run dev
echo 3. Start Backend: cd Backend && npm run dev
echo.
echo 📖 Lees SETUP_GUIDE.md voor gedetailleerde instructies
pause 