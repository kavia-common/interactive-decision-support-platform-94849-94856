from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import PromptSession, User
from ..schemas import PromptRequest, PromptResponse
from ..dependencies import get_current_user
from ..services.agent_engine import decide

router = APIRouter(prefix="/agent", tags=["Agent"])


@router.post(
    "/prompt",
    response_model=PromptResponse,
    summary="Submit a prompt to the agent",
    description="Processes the provided prompt using the agent engine and stores the prompt/response in the database.",
)
def submit_prompt(
    payload: PromptRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PromptResponse:
    """Process a user prompt, store interaction, and return agent response."""
    prompt_text = payload.prompt.strip()
    if not prompt_text:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Prompt cannot be empty")

    response_text, meta = decide(prompt_text)

    session = PromptSession(user_id=current_user.id, prompt=prompt_text, response=response_text)
    db.add(session)
    db.commit()
    db.refresh(session)

    return PromptResponse(response=response_text, session_id=session.id)
