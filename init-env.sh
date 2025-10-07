#!/bin/bash

# Baseball Card Creator - Environment Initialization Script
# This script generates secure credentials if .env doesn't exist

ENV_FILE=".env"

# Function to generate URL-safe password (alphanumeric only, no special chars)
generate_url_safe_password() {
    # Generate 32 character alphanumeric password
    LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 32
}

# Function to generate base64 secret
generate_base64_secret() {
    openssl rand -base64 "$1" 2>/dev/null || head -c "$1" /dev/urandom | base64
}

if [ ! -f "$ENV_FILE" ]; then
    echo "🔧 No .env file found. Generating secure credentials..."

    # Generate secure, URL-safe credentials
    MONGO_PASSWORD=$(generate_url_safe_password)
    JWT_SECRET=$(generate_base64_secret 64 | tr -d '\n')
    SESSION_SECRET=$(generate_base64_secret 32 | tr -d '\n')

    # Create .env file
    cat > "$ENV_FILE" << EOF
# MongoDB Configuration
MONGO_USERNAME=admin
MONGO_PASSWORD=${MONGO_PASSWORD}
MONGO_DATABASE=baseball_cards

# Node Environment
NODE_ENV=production

# Google OAuth Configuration
# Get these from: https://console.cloud.google.com/apis/credentials
# IMPORTANT: You MUST add your own Google OAuth credentials below!
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT Secret (auto-generated)
JWT_SECRET=${JWT_SECRET}
SESSION_SECRET=${SESSION_SECRET}

# Frontend URL (Cloudflare Tunnel domain)
FRONTEND_URL=https://ballcard.me

# Backend API URL for frontend
REACT_APP_API_URL=https://ballcard.me/api

# Google Client ID for frontend (same as GOOGLE_CLIENT_ID above)
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
EOF

    echo "✅ .env file created with auto-generated credentials!"
    echo ""
    echo "⚠️  IMPORTANT: You must edit .env and add your Google OAuth credentials:"
    echo "   1. Go to https://console.cloud.google.com/apis/credentials"
    echo "   2. Create OAuth 2.0 Client ID"
    echo "   3. Add authorized origins: https://ballcard.me"
    echo "   4. Update GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and REACT_APP_GOOGLE_CLIENT_ID in .env"
    echo ""
    echo "📝 Generated credentials:"
    echo "   - MongoDB Password: ${MONGO_PASSWORD}"
    echo "   - JWT Secret: [64 bytes]"
    echo "   - Session Secret: [32 bytes]"
    echo ""
else
    echo "✅ .env file already exists"

    # Check if JWT_SECRET is set
    if ! grep -q "^JWT_SECRET=.\+" "$ENV_FILE"; then
        echo "⚠️  JWT_SECRET not found or empty in .env"
        JWT_SECRET=$(generate_base64_secret 64 | tr -d '\n')

        # Add JWT_SECRET if missing
        if grep -q "^JWT_SECRET=" "$ENV_FILE"; then
            # Replace existing empty JWT_SECRET
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|" "$ENV_FILE"
            else
                sed -i "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET}|" "$ENV_FILE"
            fi
        else
            # Append if not exists
            echo "" >> "$ENV_FILE"
            echo "# JWT Secret (auto-generated)" >> "$ENV_FILE"
            echo "JWT_SECRET=${JWT_SECRET}" >> "$ENV_FILE"
        fi
        echo "✅ Generated and added JWT_SECRET to .env"
    fi

    # Check if SESSION_SECRET is set
    if ! grep -q "^SESSION_SECRET=.\+" "$ENV_FILE"; then
        echo "⚠️  SESSION_SECRET not found or empty in .env"
        SESSION_SECRET=$(generate_base64_secret 32 | tr -d '\n')

        if grep -q "^SESSION_SECRET=" "$ENV_FILE"; then
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "s|^SESSION_SECRET=.*|SESSION_SECRET=${SESSION_SECRET}|" "$ENV_FILE"
            else
                sed -i "s|^SESSION_SECRET=.*|SESSION_SECRET=${SESSION_SECRET}|" "$ENV_FILE"
            fi
        else
            echo "SESSION_SECRET=${SESSION_SECRET}" >> "$ENV_FILE"
        fi
        echo "✅ Generated and added SESSION_SECRET to .env"
    fi

    # Check if MongoDB password looks URL-safe
    MONGO_PASS=$(grep "^MONGO_PASSWORD=" "$ENV_FILE" | cut -d'=' -f2)
    if echo "$MONGO_PASS" | grep -q '[^A-Za-z0-9]'; then
        echo "⚠️  MongoDB password contains special characters that may cause issues"
        echo "   Consider regenerating with URL-safe password (alphanumeric only)"
        NEW_MONGO_PASSWORD=$(generate_url_safe_password)

        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' "s|^MONGO_PASSWORD=.*|MONGO_PASSWORD=${NEW_MONGO_PASSWORD}|" "$ENV_FILE"
        else
            sed -i "s|^MONGO_PASSWORD=.*|MONGO_PASSWORD=${NEW_MONGO_PASSWORD}|" "$ENV_FILE"
        fi
        echo "✅ Regenerated MongoDB password with URL-safe characters: ${NEW_MONGO_PASSWORD}"
    fi
fi

echo ""
echo "🚀 Environment ready! You can now run: docker compose up --build -d"
