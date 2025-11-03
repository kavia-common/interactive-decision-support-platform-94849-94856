import os
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# PUBLIC_INTERFACE
def get_database_url() -> str:
    """Return the database URL from env or default to local SQLite file."""
    return os.getenv("DATABASE_URL", "sqlite:///./app.db")


# Configure database engine
DATABASE_URL = get_database_url()

# For SQLite, need check_same_thread=False when using in multi-threaded frameworks like FastAPI's default server
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
    future=True,
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session, future=True)

# Base declarative class for ORM models
Base = declarative_base()


# PUBLIC_INTERFACE
def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that provides a SQLAlchemy session per request.

    Yields:
        Session: SQLAlchemy session bound to the configured engine.
    Ensures:
        The session is closed after the request lifecycle.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
