from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..auth import create_access_token, hash_password, verify_password
from ..config import settings
from ..database import get_db
from ..models import User
from ..schemas import TokenResponse, UserCreate, UserLogin, UserOut

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, summary="Sign up", description="Create a new user account and receive an access token.")
def signup(payload: UserCreate, db: Session = Depends(get_db)) -> TokenResponse:
    """Create a new user with hashed password and return a JWT token."""
    user = User(email=payload.email, password_hash=hash_password(payload.password))
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")

    access_token = create_access_token(subject=user.email, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return TokenResponse(access_token=access_token, token_type="bearer")


@router.post("/login", response_model=TokenResponse, summary="Log in", description="Authenticate with email and password to receive an access token.")
def login(payload: UserLogin, db: Session = Depends(get_db)) -> TokenResponse:
    """Authenticate a user and return a JWT token."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    access_token = create_access_token(subject=user.email, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    return TokenResponse(access_token=access_token, token_type="bearer")


from ..dependencies import get_current_user  # placed after router creation to avoid cycles


@router.get("/me", response_model=UserOut, summary="Get current user", description="Return the profile of the currently authenticated user.")
def me(current_user: User = Depends(get_current_user)) -> UserOut:
    """Return the current user info based on the bearer token."""
    return current_user
