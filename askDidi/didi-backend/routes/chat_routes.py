from fastapi import APIRouter
from models.chat_history import ChatRequest
from services.chat_service import process_chat, reset_history
from services.tts_service import text_to_speech   # ← Add this

router = APIRouter()

@router.post("/ask")
def ask(req: ChatRequest):
    answer = process_chat(req.user_id, req.message)

    # Convert to speech (Hindi or English auto-detected)
    audio_file = text_to_speech(answer)

    # Extract filename only
    filename = audio_file.split("\\")[-1].split("/")[-1]

    # Build URL served by FastAPI static route
    file_url = f"http://127.0.0.1:8000/tts/{filename}"

    return {
        "answer": answer,
        "audio_url": file_url
    }
# reset current session history
@router.post("/reset_chat")
def reset(req: ChatRequest):
    reset_history(req.user_id)
    return {"status": "chat reset"}