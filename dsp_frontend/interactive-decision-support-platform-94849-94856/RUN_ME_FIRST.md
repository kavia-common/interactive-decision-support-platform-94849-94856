# RUN_ME_FIRST.md — Plain Docker Build & Run (Frontend + Backend)

This guide helps you build and run the DSP backend (FastAPI) and frontend (React) using plain Docker locally or on Rancher Desktop.

Services and ports:
- Backend API (FastAPI): http://localhost:8000
- Frontend (React): http://localhost:3000

Environment variables to set (via .env files inside each service directory):
- dsp_backend/.env: SECRET_KEY=<strong-random-string>
- dsp_frontend/.env: REACT_APP_API_BASE_URL=http://localhost:8000

Contents
- Prerequisites
- Prepare environment files
- Build images (Docker)
- Run containers (Docker)
- Verify
- Stop and cleanup
- Notes and troubleshooting

Prerequisites
- Docker Engine (Docker Desktop, Rancher Desktop with dockerd(moby), or compatible)
- Network access to fetch base images
- Ports 3000 and 8000 available on your host

Prepare environment files
Create .env files for each service. Examples below:

1) Backend: dsp_backend/.env
- SECRET_KEY=please_change_me_to_a_strong_value
- ACCESS_TOKEN_EXPIRE_MINUTES=60
- CORS_ORIGINS=http://localhost:3000
- DATABASE_URL=sqlite:////app/app.db

Create the file:
  cd dsp_backend
  printf "SECRET_KEY=please_change_me_to_a_strong_value\nACCESS_TOKEN_EXPIRE_MINUTES=60\nCORS_ORIGINS=http://localhost:3000\nDATABASE_URL=sqlite:////app/app.db\n" > .env
  cd ..

2) Frontend: dsp_frontend/.env
- REACT_APP_API_BASE_URL=http://localhost:8000
- HOST=0.0.0.0
- PORT=3000
- CHOKIDAR_USEPOLLING=true

Create the file:
  cd dsp_frontend
  printf "REACT_APP_API_BASE_URL=http://localhost:8000\nHOST=0.0.0.0\nPORT=3000\nCHOKIDAR_USEPOLLING=true\n" > .env
  cd ..

Build images (Docker)
Run from the repository root (interactive-decision-support-platform-94849-94856):

1) Backend (tag: dsp-backend)
  docker build -t dsp-backend ./dsp_backend

2) Frontend (tag: dsp-frontend)
  docker build -t dsp-frontend ./dsp_frontend

Run containers (Docker)
Run from the repository root. Ensure .env files exist per above.

1) Backend
  docker run -d --name dsp-backend \
    --env-file ./dsp_backend/.env \
    -p 8000:8000 \
    dsp-backend

2) Frontend
  docker run -d --name dsp-frontend \
    --env-file ./dsp_frontend/.env \
    -p 3000:3000 \
    dsp-frontend

Verify
- Backend API docs: http://localhost:8000/docs
- Frontend UI: http://localhost:3000

Stop and cleanup
Stop containers:
  docker stop dsp-frontend dsp-backend

Remove containers:
  docker rm dsp-frontend dsp-backend

Optional: remove images (irreversible):
  docker rmi dsp-frontend dsp-backend

Notes and troubleshooting
- SECRET_KEY is required by the backend for JWTs; set it to a strong random value in production.
- REACT_APP_API_BASE_URL must point to the backend base URL; default is http://localhost:8000 for local use.
- CORS: Backend default CORS_ORIGINS includes http://localhost:3000 which matches the frontend default.
- Port conflicts: If 3000 or 8000 are in use, change the host-side port mapping (-p HOST:CONTAINER) accordingly.
- Rancher Desktop: Ensure Container Engine is set to dockerd (moby) if you switch to docker compose. This guide uses plain docker.
- SQLite: The backend uses a SQLite DB file inside the container at /app/app.db by default. For persistence beyond container lifecycle, mount a volume to /app.
