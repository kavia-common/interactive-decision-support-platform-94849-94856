# interactive-decision-support-platform-94849-94856

Backend API (FastAPI) and React frontend for the Decision Support Platform.

- Backend runs on http://localhost:8000 by default (see dsp_backend/README.md)
- Frontend expects REACT_APP_API_BASE_URL to be set to the backend URL (e.g., http://localhost:8000)

## Quick Start (Local Development)

Run backend and frontend locally without containers.

1) Backend (FastAPI)
- Open a terminal:
  cd interactive-decision-support-platform-94849-94856/dsp_backend
  python -m venv .venv && . .venv/bin/activate  # or use your preferred env manager
  pip install -r requirements.txt
- Create a .env file (optional): see variables in the section below. Defaults are sensible for local use.
  - Ensure CORS_ORIGINS includes http://localhost:3000 (default already does).
- Start server:
  uvicorn app.main:app --reload
- API docs available at http://localhost:8000/docs

2) Frontend (React)
- In another terminal:
  cd interactive-decision-support-platform-94849-94856/dsp_frontend
  cp .env.example .env
  # If needed, adjust REACT_APP_API_BASE_URL in .env (default points to http://localhost:8000)
  npm install
  npm start
- Frontend available at http://localhost:3000

Environment notes:
- Frontend uses REACT_APP_API_BASE_URL to talk to backend.
- Backend uses CORS_ORIGINS to allow browser requests from the frontend.
  By default CORS_ORIGINS is http://localhost:3000 which aligns with the frontend dev server.

## Run with Docker Compose

From the repository root directory:

- Start both services:
  docker compose up --build

- Access:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:8000 (docs at /docs)

- Environment controls:
  - Frontend uses REACT_APP_API_BASE_URL (set to http://localhost:8000 in docker-compose.yml)
  - Backend CORS_ORIGINS is set to http://localhost:3000 by default in docker-compose.yml

- Stop services:
  docker compose down

## Backend Environment Variables

See dsp_backend/README.md for details. Key variables:
- SECRET_KEY
- ACCESS_TOKEN_EXPIRE_MINUTES
- CORS_ORIGINS (comma-separated; should include http://localhost:3000 for local dev)
- DATABASE_URL (defaults to SQLite file)

## Frontend Environment Variables

See dsp_frontend/.env.example. Key variable:
- REACT_APP_API_BASE_URL (e.g., http://localhost:8000)
