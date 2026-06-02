@echo off
REM Agent Task Distribution System - Installation Script for Windows

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║   Agent Task Distribution System - Installation Script        ║
echo ║                         For Windows                           ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
echo.

REM Install Backend Dependencies
echo Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

REM Create Backend .env file
if not exist .env (
    echo Creating backend .env file...
    copy .env.example .env
    echo ⚠️  Please configure backend/.env with your MongoDB URI and JWT_SECRET
)

cd ..
echo.

REM Install Frontend Dependencies
echo Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    cd ..
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

REM Create Frontend .env file
if not exist .env (
    echo Creating frontend .env file...
    copy .env.example .env
    echo ⚠️  Frontend .env created (default localhost configuration)
)

cd ..
echo.

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║            ✓ Installation Complete!                          ║
echo ╠═══════════════════════════════════════════════════════════════╣
echo ║                                                               ║
echo ║  Next Steps:                                                  ║
echo ║  1. Configure backend/.env with MongoDB URI                 ║
echo ║  2. Open TWO terminals in the project root directory        ║
echo ║                                                               ║
echo ║  Terminal 1 (Backend):                                       ║
echo ║  $ cd backend                                                ║
echo ║  $ npm run dev                                               ║
echo ║                                                               ║
echo ║  Terminal 2 (Frontend):                                      ║
echo ║  $ cd frontend                                               ║
echo ║  $ npm run dev                                               ║
echo ║                                                               ║
echo ║  Default Login Credentials:                                  ║
echo ║  Email: admin@example.com                                    ║
echo ║  Password: Admin@123                                         ║
echo ║                                                               ║
echo ║  Documentation:                                              ║
echo ║  - README.md (Full documentation)                            ║
echo ║  - QUICK_START.md (Quick setup guide)                        ║
echo ║  - ENV_SETUP.md (Environment configuration)                 ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
pause
