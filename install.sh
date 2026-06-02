#!/bin/bash

# Agent Task Distribution System - Installation Script for macOS/Linux

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║   Agent Task Distribution System - Installation Script        ║"
echo "║                    For macOS/Linux                            ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js is installed"
echo ""

# Install Backend Dependencies
echo "Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi
echo "✓ Backend dependencies installed"

# Create Backend .env file
if [ ! -f .env ]; then
    echo "Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please configure backend/.env with your MongoDB URI and JWT_SECRET"
fi

cd ..
echo ""

# Install Frontend Dependencies
echo "Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    cd ..
    exit 1
fi
echo "✓ Frontend dependencies installed"

# Create Frontend .env file
if [ ! -f .env ]; then
    echo "Creating frontend .env file..."
    cp .env.example .env
    echo "✓ Frontend .env created (default localhost configuration)"
fi

cd ..
echo ""

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║            ✓ Installation Complete!                          ║"
echo "╠═══════════════════════════════════════════════════════════════╣"
echo "║                                                               ║"
echo "║  Next Steps:                                                  ║"
echo "║  1. Configure backend/.env with MongoDB URI                 ║"
echo "║  2. Open TWO terminals in the project root directory        ║"
echo "║                                                               ║"
echo "║  Terminal 1 (Backend):                                       ║"
echo "║  $ cd backend                                                ║"
echo "║  $ npm run dev                                               ║"
echo "║                                                               ║"
echo "║  Terminal 2 (Frontend):                                      ║"
echo "║  $ cd frontend                                               ║"
echo "║  $ npm run dev                                               ║"
echo "║                                                               ║"
echo "║  Default Login Credentials:                                  ║"
echo "║  Email: admin@example.com                                    ║"
echo "║  Password: Admin@123                                         ║"
echo "║                                                               ║"
echo "║  Documentation:                                              ║"
echo "║  - README.md (Full documentation)                            ║"
echo "║  - QUICK_START.md (Quick setup guide)                        ║"
echo "║  - ENV_SETUP.md (Environment configuration)                 ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
