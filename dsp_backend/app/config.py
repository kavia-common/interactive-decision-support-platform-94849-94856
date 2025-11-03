import os
from typing import List

# PUBLIC_INTERFACE
class Settings:
    """Application settings loaded from environment variables with sensible defaults."""
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "DSP Backend API")
    PROJECT_DESCRIPTION: str = os.getenv(
        "PROJECT_DESCRIPTION",
        "FastAPI backend for Decision Support Platform providing auth and agent endpoints."
    )
    PROJECT_VERSION: str = os.getenv("PROJECT_VERSION", "0.1.0")

    SECRET_KEY: str = os.getenv("SECRET_KEY", "CHANGE_ME_PLEASE_IN_PROD")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

    # Comma-separated list of origins
    CORS_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]

    # Database URL, default to local SQLite file
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./app.db")


settings = Settings()
