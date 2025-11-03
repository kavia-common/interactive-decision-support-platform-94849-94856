from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from ..routers import auth as auth_router
from ..routers import agent as agent_router


# PUBLIC_INTERFACE
def create_app() -> FastAPI:
    """Create and configure the FastAPI application with routes and middleware."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        description=settings.PROJECT_DESCRIPTION,
        version=settings.PROJECT_VERSION,
        openapi_tags=[
            {"name": "Authentication", "description": "User signup, login, and profile APIs."},
            {"name": "Agent", "description": "Agent interaction APIs for decision support."},
        ],
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routers
    app.include_router(auth_router.router)
    app.include_router(agent_router.router)

    @app.on_event("startup")
    def on_startup() -> None:
        # Ensure all tables exist
        Base.metadata.create_all(bind=engine)

    @app.get("/", tags=["Root"], summary="Health check", description="Basic health endpoint to verify service is running.")
    def root():
        return {"status": "ok", "service": settings.PROJECT_NAME, "version": settings.PROJECT_VERSION}

    @app.get(
        "/docs/websocket",
        tags=["Root"],
        summary="WebSocket usage",
        description="Note: This service currently has no WebSocket endpoints. Future real-time features will be documented here.",
    )
    def ws_help():
        return {"websocket": "No WebSocket endpoints available yet."}

    return app


app = create_app()
