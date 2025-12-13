**Docker / Docker Compose**

This project includes example Dockerfiles and a `docker-compose.yml` so you can run the Next app and a simple Inngest runner locally in containers.

Files added:

Quick start (local)

1. Make sure you have Docker and Docker Compose installed.
2. Copy or create a `.env` file in the project root with the environment variables your app needs (do NOT commit secrets).
3. From the project root run:

```bash
docker compose up --build
```

This will build both images and start the Next server on `http://localhost:3000` and an Inngest runner that points to `http://next:3000/api/inngest` inside the compose network.

Notes and production recommendations

  - Use Inngest Cloud (recommended) and run `npx inngest deploy` from CI to register functions and crons, or
  - Run a proper Inngest runner process on a managed host/container with the recommended production command from Inngest docs.

Building images manually

```bash
# Build Next image
docker build -f Dockerfile -t stocks-app-next:latest .

# Build Inngest runner image
docker build -f Dockerfile.inngest -t stocks-app-inngest:latest .

# Build production-ready Inngest runner image
docker build -f Dockerfile.inngest.prod -t stocks-app-inngest-prod:latest .
```

Running single images

```bash
# Run Next image
docker run -p 3000:3000 --env-file .env stocks-app-next:latest

# Run Inngest runner (expects Next reachable at http://next:3000 inside compose network)
docker run --env-file .env stocks-app-inngest:latest

# Run production-ready Inngest runner (override INNGEST_URL to your public Next URL)
docker run --env-file .env -e INNGEST_URL=https://your-app.example.com/api/inngest stocks-app-inngest-prod:latest

Production compose & systemd

We include an example production compose file `docker-compose.prod.yml` and a sample systemd unit for running the Inngest runner as a long-lived service.

1) `docker-compose.prod.yml` (example)

```bash
docker compose -f docker-compose.prod.yml up -d
```

Notes:
- Place production envs in `.env.production` (do not commit).
- The compose file uses `restart: unless-stopped` and healthchecks so the runner waits until Next is healthy.

2) Systemd example for a self-hosted runner

See `docs/runner-systemd.service` for an example systemd unit. Steps to use:

- Create system user and directory:
  ```bash
  sudo useradd --system --no-create-home inngest
  sudo mkdir -p /opt/stocks-app
  sudo chown inngest:inngest /opt/stocks-app
  ```

- Place your app code at `/opt/stocks-app` and an env file at `/etc/stocks-app/env.production` (KEY=VALUE per line).

- Copy the unit file and enable it:
  ```bash
  sudo cp docs/runner-systemd.service /etc/systemd/system/stocks-app-inngest.service
  sudo systemctl daemon-reload
  sudo systemctl enable --now stocks-app-inngest.service
  sudo journalctl -u stocks-app-inngest.service -f
  ```

This provides a minimal production-grade runner setup. For scale, run multiple runner instances behind your orchestration tooling.
```
