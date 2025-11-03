# DSP Backend (FastAPI)

FastAPI backend for the Decision Support Platform providing:
- JWT-based authentication (signup, login, me)
- Agent prompt processing and storage
- SQLAlchemy ORM with SQLite by default
- CORS for frontend integration

## Quickstart (Local)

1. Create and activate Python 3.11+ virtualenv
2. Install dependencies:
   pip install -r requirements.txt
3. Create a .env file based on .env.example (update SECRET_KEY, CORS_ORIGINS, etc.)
4. Run server:
   uvicorn app.main:app --reload

Open API docs at http://localhost:8000/docs

## Environment Variables

See .env.example for available variables:
- SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
- CORS_ORIGINS
- DATABASE_URL

## API Endpoints

- POST /auth/signup -> { access_token, token_type }
- POST /auth/login -> { access_token, token_type }
- GET /auth/me -> User profile
- POST /agent/prompt -> { response, session_id }

All agent endpoints require Bearer token auth.

## Docker

Build and run:
docker build -t dsp-backend .
docker run -p 8000:8000 --env-file .env dsp-backend

## Database

SQLAlchemy with default SQLite (app.db). Tables are created automatically on startup.
