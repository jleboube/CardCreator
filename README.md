# Baseball Card Creator ⚾

A modern web application that allows users to create professional baseball card-style images with custom photos, stats, and multiple design templates.

## Features

- 🔐 **Google OAuth Authentication** - Secure JWT token-based authentication
- 📸 **Custom Photos** - Upload player photos and team logos
- 🎨 **5 Unique Templates** - Classic, Modern, Vintage, Minimalist, and Neon designs
- 📊 **Player Statistics** - Add batting average, home runs, RBIs, and more
- 💾 **Save & Download** - Save cards to your account and download as high-res PNG
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- ✨ **Animated UI** - Smooth animations powered by Anime.js

## Tech Stack

### Frontend
- **React** 18 - UI framework
- **React Konva** - Canvas rendering for baseball cards
- **@react-oauth/google** - Google OAuth integration
- **Axios** - HTTP client
- **Anime.js** - Animations
- **React Toastify** - Notifications

### Backend
- **Node.js + Express** - API server
- **MongoDB** - Database
- **JWT** - Token-based authentication
- **Google Auth Library** - OAuth verification
- **Winston** - Logging

### DevOps
- **Docker + Docker Compose** - Containerization
- **Nginx** - Reverse proxy
- **Cloudflare Tunnel** - Secure domain access

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Google OAuth credentials ([Get them here](https://console.cloud.google.com/apis/credentials))
- Domain configured with Cloudflare Tunnel (optional for local development)

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Navigate to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set application type to **Web application**
6. Add authorized JavaScript origins:
   - `https://ballcard.me` (your domain)
   - `http://localhost` (for local testing)
7. Add authorized redirect URIs:
   - `https://ballcard.me` (your domain)
   - `http://localhost` (for local testing)
8. Save your **Client ID** and **Client Secret**

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your credentials
nano .env
```

Required environment variables:

```env
# MongoDB
MONGO_USERNAME=admin
MONGO_PASSWORD=<generate-secure-password>
MONGO_DATABASE=baseball_cards

# Google OAuth (from step 1)
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# JWT Secret (generate with: openssl rand -base64 64)
JWT_SECRET=<your-jwt-secret-64-chars>
SESSION_SECRET=<your-session-secret-32-chars>

# URLs (update for your domain)
FRONTEND_URL=https://ballcard.me
REACT_APP_API_URL=https://ballcard.me/api
REACT_APP_GOOGLE_CLIENT_ID=<same-as-GOOGLE_CLIENT_ID>
```

**Generate secure secrets:**
```bash
# JWT Secret
openssl rand -base64 64

# Session Secret
openssl rand -base64 32

# MongoDB Password
openssl rand -base64 24
```

### 3. Build and Run

```bash
# Build and start all services
docker compose up --build -d

# View logs
docker compose logs -f

# View specific service logs
docker compose logs -f backend
docker compose logs -f frontend
```

### 4. Access the Application

- **With Cloudflare Tunnel**: https://ballcard.me
- **Local Development**: http://localhost

## Project Structure

```
CardCreator/
├── backend/
│   ├── models/
│   │   ├── User.js           # User model (JWT-based)
│   │   └── Card.js            # Baseball card model
│   ├── routes/
│   │   ├── auth.js            # JWT authentication routes
│   │   └── cards.js           # Card CRUD operations
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js      # Navigation with user menu
│   │   │   ├── CardCanvas.js  # Konva canvas renderer
│   │   │   └── CardEditor.js  # Template & stats editor
│   │   ├── contexts/
│   │   │   └── AuthContext.js # Google OAuth context
│   │   ├── pages/
│   │   │   ├── Landing.js     # Landing with Google login
│   │   │   ├── Creator.js     # Card creation page
│   │   │   └── Dashboard.js   # Saved cards dashboard
│   │   ├── styles/            # CSS modules
│   │   └── utils/
│   │       ├── cardTemplates.js # Template configurations
│   │       └── useImage.js      # Image loading hook
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── nginx.conf
├── .env.example
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Verify Google OAuth credential, return JWT
- `GET /api/auth/validate` - Validate JWT token

### Cards (Protected)
- `GET /api/cards` - Get user's cards (paginated)
- `GET /api/cards/:id` - Get single card
- `POST /api/cards` - Create new card
- `PUT /api/cards/:id` - Update card
- `DELETE /api/cards/:id` - Delete card

### Health
- `GET /api/health` - API health status

## Card Templates

1. **Classic** - Traditional green and gold baseball card design
2. **Modern** - Sleek blue gradient with clean lines
3. **Vintage** - Aged paper look with serif typography
4. **Minimalist** - Black and white with minimal borders
5. **Neon** - Dark background with neon glow effects

## Cloudflare Tunnel Setup

If deploying with Cloudflare Tunnel:

1. Install `cloudflared`:
```bash
brew install cloudflare/cloudflare/cloudflared  # macOS
# or download from cloudflare.com
```

2. Authenticate:
```bash
cloudflared tunnel login
```

3. Create tunnel:
```bash
cloudflared tunnel create ballcard
```

4. Configure DNS:
```bash
cloudflared tunnel route dns ballcard ballcard.me
```

5. Run tunnel:
```bash
cloudflared tunnel run ballcard --url http://localhost:80
```

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev  # Runs with nodemon
```

### Frontend Development
```bash
cd frontend
npm install
npm start    # Runs on http://localhost:3000
```

### Environment Variables for Local Dev
```env
FRONTEND_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
```

## Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Rebuild after code changes
docker compose up --build -d

# Remove everything including volumes
docker compose down -v

# Access backend shell
docker exec -it baseball-card-backend sh

# Access MongoDB shell
docker exec -it baseball-card-mongodb mongosh -u admin -p <password>
```

## Troubleshooting

### Google OAuth Errors
- Verify your Client ID matches in both `.env` and Google Console
- Check that your domain is added to authorized JavaScript origins
- Ensure redirect URIs include your actual domain

### MongoDB Connection Failed
```bash
# Check MongoDB logs
docker compose logs mongodb

# Verify credentials in .env
# Make sure MONGO_USERNAME and MONGO_PASSWORD are correct
```

### Frontend Build Errors
```bash
# Clear node_modules and rebuild
docker compose down
rm -rf frontend/node_modules frontend/package-lock.json
docker compose up --build frontend
```

### Port Already in Use
Edit `docker-compose.yml` and change the nginx port mapping:
```yaml
nginx:
  ports:
    - "8080:80"  # Changed from 80:80
```

## Security Features

- JWT token-based authentication with 7-day expiration
- HTTPS enforced via Cloudflare
- Helmet.js for HTTP header security
- CORS protection
- Rate limiting on API endpoints
- Input validation with express-validator
- MongoDB connection security
- Environment variable protection

## Performance

- Gzip compression via Nginx
- Static asset caching
- Image optimization in canvas
- Lazy loading
- Production-optimized React builds
- MongoDB indexes for fast queries

## License

MIT

## Support

For issues or questions:
- Check troubleshooting section above
- Review Docker Compose logs
- Verify environment variables
- Check Google OAuth configuration

---

Built with ❤️ using React, Node.js, MongoDB, and Docker
