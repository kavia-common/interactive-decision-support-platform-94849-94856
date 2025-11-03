# Deployment with Docker Compose (Rancher Desktop and plain Docker)

This repository includes a docker-compose.yml at the project root to run both the FastAPI backend (dsp_backend) and the React frontend (dsp_frontend).

- Backend: http://localhost:8000 (OpenAPI docs at /docs)
- Frontend: http://localhost:3000
- Frontend calls backend via REACT_APP_API_BASE_URL (defaults to http://localhost:8000)
- Backend CORS_ORIGINS includes http://localhost:3000 by default

Contents
- Prerequisites
- Environment configuration (.env files)
- Rancher Desktop usage
- Plain Docker Compose usage
- Notes and troubleshooting

Prerequisites
- Rancher Desktop or Docker Desktop / docker engine
- Git (optional, if you cloned this repo)

Environment configuration (.env files)
There are two separate .env files (examples provided). You can use the examples as-is for local development:

1) dsp_backend/.env.example
- SECRET_KEY=please_change_me (set a strong value for real deployments)
- ACCESS_TOKEN_EXPIRE_MINUTES=60
- CORS_ORIGINS=http://localhost:3000
- DATABASE_URL=sqlite:////app/app.db

2) dsp_frontend/.env.example
- REACT_APP_API_BASE_URL=http://localhost:8000
- HOST=0.0.0.0
- PORT=3000
- CHOKIDAR_USEPOLLING=true

To activate these:
- Copy each example to .env in the same directory:
  cp dsp_backend/.env.example dsp_backend/.env
  cp dsp_frontend/.env.example dsp_frontend/.env
- Adjust values as needed.
- The docker-compose.yml references these .env files with env_file directives, and also includes safe defaults.

Rancher Desktop usage
1. Open Rancher Desktop
2. Settings
   - Ensure “Container Engine” is set to “dockerd (moby)” (required for docker compose integration)
3. Clone or download this repository locally
4. In Rancher Desktop:
   - Apps > Compose (or similar, depending on version)
   - Import/Open the repository folder interactive-decision-support-platform-94849-94856
   - Confirm docker-compose.yml is selected
   - Launch the Compose app (up)
5. Wait for both services to start:
   - dsp_backend on port 8000
   - dsp_frontend on port 3000
6. Access the application:
   - Frontend: http://localhost:3000
   - Backend API docs: http://localhost:8000/docs

Optional: Rancher Desktop terminal
- You can also use a terminal integrated with Rancher Desktop and run:
  docker compose up --build -d

Plain Docker Compose usage
From the project root directory interactive-decision-support-platform-94849-94856:

1. Prepare env files (recommended)
   cp dsp_backend/.env.example dsp_backend/.env
   cp dsp_frontend/.env.example dsp_frontend/.env

2. Start services
   docker compose up --build

3. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:8000 (docs at /docs)

4. Stop services
   docker compose down

CORS and URLs
- Frontend points to backend via REACT_APP_API_BASE_URL (default http://localhost:8000).
- Backend allows requests from frontend origin via CORS_ORIGINS (default http://localhost:3000).
- These defaults are aligned for local usage. Update as necessary for other environments.

Troubleshooting
- Frontend shows “REACT_APP_API_BASE_URL is not set”:
  Ensure dsp_frontend/.env is created (from .env.example) or that the variable is set in docker-compose overrides.
- Backend 401 errors:
  You must sign up first at /signup then log in at /login to obtain a token. The frontend UI handles these flows.
- Port conflicts:
  If ports 3000 or 8000 are taken, stop other processes or change the published ports in docker-compose.yml.
- Node modules permissions:
  The frontend uses a named container directory for /app/node_modules to avoid permission issues. If you run into issues, remove the anonymous volume and re-run docker compose up.

ZIP Artifact (optional)
- This repository can be zipped as a bundle. If you don’t see build_artifacts/docker-compose-bundle.zip, you can create your own zip of the entire interactive-decision-support-platform-94849-94856 directory and import it into Rancher Desktop Apps > Compose.
