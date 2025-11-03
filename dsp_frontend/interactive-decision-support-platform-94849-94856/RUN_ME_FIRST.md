# RUN_ME_FIRST — Minimal Deployment Guide (Plain Docker)

This bundle contains a minimal set of files to run the Decision Support Platform (FastAPI backend + React frontend) using plain Docker.

Services and Ports
- Backend (FastAPI): http://localhost:8000
- Frontend (React): http://localhost:3000
- Frontend must know how to reach the backend via REACT_APP_API_BASE_URL

Contents to be included in the tarball
- dsp_backend/
  - Dockerfile
  - app/
  - routers/
  - services/
  - requirements.txt
  - .env.example
- dsp_frontend/
  - Dockerfile
  - src/
  - public/ (if present)
  - package.json
  - .env.example
- RUN_ME_FIRST.md (this file)

Important: Excludes node_modules and __pycache__.

Quick Start (Plain Docker)
1) Prepare environment files
   cd dsp_backend
   cp .env.example .env
   # Edit .env as needed (SECRET_KEY, etc.)
   cd ..

   cd dsp_frontend
   cp .env.example .env
   # Ensure REACT_APP_API_BASE_URL points to the backend, e.g., http://localhost:8000
   cd ..

2) Build images
   docker build -t dsp-backend ./dsp_backend
   docker build -t dsp-frontend ./dsp_frontend

3) Run containers
   docker run -d --name dsp-backend \
     --env-file ./dsp_backend/.env \
     -p 8000:8000 \
     dsp-backend

   docker run -d --name dsp-frontend \
     --env-file ./dsp_frontend/.env \
     -p 3000:3000 \
     dsp-frontend

4) Verify
   - Backend API docs: http://localhost:8000/docs
   - Frontend UI: http://localhost:3000

Stop and Cleanup
   docker stop dsp-frontend dsp-backend
   docker rm dsp-frontend dsp-backend
   # Optional: remove images
   # docker rmi dsp-frontend dsp-backend

Notes
- Backend SECRET_KEY should be strong in production.
- CORS_ORIGINS in backend .env should include the frontend origin (default http://localhost:3000).
- If ports are busy, adjust the published ports (-p HOST:CONTAINER).

If you received this bundle as a tar.gz:
- Extract it locally, then follow the steps above from the extracted folder.
