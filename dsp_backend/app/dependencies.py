from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from .auth import decode_token
from .database import get_db
from .models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# PUBLIC_INTERFACE
def get_db_session() -> Session:
    """Wrapper to allow usage as Depends without yielding from within route signature."""
    # Note: We re-use the generator dependency via Depends(get_db) in runtime,
    # but export a named function for clarity in imports.
    raise RuntimeError("Use Depends(get_db) directly; this is a marker to document interface.")


# PUBLIC_INTERFACE
def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve and return the current authenticated user from the JWT Bearer token."""
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    subject = payload["sub"]
    # subject can be email or id; we store email as subject to avoid int/str ambiguity
    user = db.query(User).filter(User.email == subject).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
