from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# PUBLIC_INTERFACE
class TokenResponse(BaseModel):
    """Response containing access token for authenticated sessions."""
    access_token: str = Field(..., description="Bearer JWT access token")
    token_type: str = Field("bearer", description="Token type")


# PUBLIC_INTERFACE
class UserCreate(BaseModel):
    """Request payload for creating a user account."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password (min 6 chars)")


# PUBLIC_INTERFACE
class UserLogin(BaseModel):
    """Request payload for logging in."""
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., description="User password")


# PUBLIC_INTERFACE
class UserOut(BaseModel):
    """Public user info returned from API."""
    id: int = Field(..., description="User ID")
    email: EmailStr = Field(..., description="User email address")
    created_at: datetime = Field(..., description="Creation timestamp")

    class Config:
        from_attributes = True


# PUBLIC_INTERFACE
class PromptRequest(BaseModel):
    """Request model for agent prompt."""
    prompt: str = Field(..., min_length=1, description="User prompt for decision support")


# PUBLIC_INTERFACE
class PromptResponse(BaseModel):
    """Response model containing agent output."""
    response: str = Field(..., description="Agent generated response text")
    session_id: Optional[int] = Field(None, description="Stored session record ID if persisted")
