# Port Configuration

The Baseball Card Creator uses the following ports:

## External Ports (Host Machine)

- **58080** - Nginx web server
  - Access locally at: `http://localhost:58080`
  - Cloudflare Tunnel connects to this port

## Internal Ports (Docker Network Only)

- **5000** - Backend API server (not exposed to host)
- **27017** - MongoDB (not exposed to host)
- **80** - Frontend container (not exposed to host, nginx serves built files)

## Cloudflare Tunnel Configuration

When setting up your Cloudflare Tunnel, point it to:
```bash
cloudflared tunnel run ballcard --url http://localhost:58080
```

Or in your tunnel config file:
```yaml
tunnel: <your-tunnel-id>
credentials-file: /path/to/credentials.json

ingress:
  - hostname: ballcard.me
    service: http://localhost:58080
  - service: http_status:404
```

## Changing Ports

If port 58080 is also in use, edit `docker-compose.yml`:

```yaml
nginx:
  ports:
    - "YOUR_PORT:80"  # Change YOUR_PORT to any available port
```

Then update your Cloudflare Tunnel to use the new port.

## Troubleshooting Port Conflicts

If you still get port conflicts:

1. **Check what's using the port:**
```bash
# macOS/Linux
lsof -i :58080

# Find and stop the conflicting process
kill -9 <PID>
```

2. **Or choose a different port** in docker-compose.yml

3. **Verify no containers are running:**
```bash
docker compose down
docker ps -a
```
