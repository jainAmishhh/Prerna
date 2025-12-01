# didi-backend/routes/chat_routes.py

import os
from fastapi import APIRouter
from dotenv import load_dotenv

from models.chat_history import ChatRequest 
from services.chat_service import process_chat, reset_history
from services.tts_service import text_to_speech 

# Load environment variables
load_dotenv()
BASE_URL = os.getenv("BASE_URL")  

router = APIRouter()


@router.post("/ask")
def ask(req: ChatRequest):
    answer = process_chat(req.user_id, req.message)

    audio_file = text_to_speech(answer)

    filename = audio_file.replace("\\", "/").split("/")[-1]

    audio_url = f"{BASE_URL}/tts/{filename}"

    return {
        "answer": answer,
        "audio_url": audio_url
    }

@router.post("/reset_chat")
def reset(req: ChatRequest):
    reset_history(req.user_id)
    return {"status": "chat reset"}
