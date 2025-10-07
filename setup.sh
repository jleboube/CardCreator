#!/bin/bash

# Baseball Card Creator - Quick Setup Script

echo "======================================"
echo "Baseball Card Creator - Setup"
echo "======================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Run init-env.sh to generate/validate credentials
echo "🔧 Initializing environment..."
./init-env.sh

# Check if Google OAuth credentials are set
if grep -q "your_google_client_id_here" .env; then
    echo ""
    echo "⚠️  WARNING: Google OAuth credentials not configured!"
    echo "   The app will not work until you add your Google OAuth credentials."
    echo ""
    echo "   Edit .env and update:"
    echo "   - GOOGLE_CLIENT_ID"
    echo "   - GOOGLE_CLIENT_SECRET"
    echo "   - REACT_APP_GOOGLE_CLIENT_ID"
    echo ""
    read -p "Press Enter to continue anyway (you can add credentials later)..."
fi

echo ""
echo "======================================"
echo "Building and starting containers..."
echo "======================================"
echo ""

# Build and start containers
docker compose up --build -d

if [ $? -eq 0 ]; then
    echo ""
    echo "======================================"
    echo "✅ Setup Complete!"
    echo "======================================"
    echo ""
    echo "The Baseball Card Creator is now running:"
    echo ""
    echo "  🌐 Frontend:  https://ballcard.me"
    echo "  🔧 Backend:   https://ballcard.me/api"
    echo "  🔌 Local:     http://localhost:58080"
    echo "  📊 MongoDB:   Internal Docker network only"
    echo ""
    echo "Useful commands:"
    echo "  - View logs:        docker compose logs -f"
    echo "  - Stop services:    docker compose down"
    echo "  - Restart:          docker compose restart"
    echo ""
    echo "For more information, see README.md"
    echo ""
else
    echo ""
    echo "❌ Error: Failed to start containers"
    echo "Check the logs with: docker-compose logs"
    exit 1
fi
