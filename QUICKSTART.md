# Quick Start Guide

Get the Baseball Card Creator running in 5 minutes!

## Step 1: Prerequisites

Make sure you have installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Step 2: Get Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URI: `http://localhost/api/auth/google/callback`
5. Save your Client ID and Client Secret

## Step 3: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your settings
# Required changes:
# - GOOGLE_CLIENT_ID=your_client_id_here
# - GOOGLE_CLIENT_SECRET=your_client_secret_here
# - MONGO_PASSWORD=strong_password_here
# - SESSION_SECRET=min_32_character_secret_here
```

**Generate a secure session secret:**
```bash
openssl rand -base64 64
```

## Step 4: Run the Application

### Option A: Use the setup script (Recommended)
```bash
chmod +x setup.sh
./setup.sh
```

### Option B: Manual Docker Compose
```bash
docker-compose up --build
```

## Step 5: Access the Application

Open your browser and go to:
**http://localhost**

## Verify Everything is Working

1. **Landing Page**: You should see the Baseball Card Creator landing page
2. **Sign In**: Click "Sign in with Google" - you should be redirected to Google OAuth
3. **Create Card**: After signing in, upload a photo and create your first baseball card
4. **Dashboard**: View your saved cards in the dashboard

## Common Issues

### Port 80 Already in Use
Edit `docker-compose.yml` and change the nginx port:
```yaml
nginx:
  ports:
    - "8080:80"  # Changed from 80:80
```
Then access at: http://localhost:8080

### OAuth Redirect Error
Make sure your Google OAuth redirect URI exactly matches:
```
http://localhost/api/auth/google/callback
```

### MongoDB Connection Failed
Check MongoDB logs:
```bash
docker-compose logs mongodb
```

## Useful Commands

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose up --build

# Remove everything including volumes
docker-compose down -v
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the code structure
- Customize templates in `frontend/src/utils/cardTemplates.js`
- Add your own styling

## Need Help?

Check the troubleshooting section in [README.md](README.md) or open an issue on GitHub.

Happy card creating! ⚾🎨
