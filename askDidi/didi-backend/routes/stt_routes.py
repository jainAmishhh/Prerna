# didi-backend/routes/stt_routes.py

import os
import uuid
from fastapi import APIRouter, UploadFile, File, Form
from dotenv import load_dotenv

from services.stt_service import transcribe_audio
from services.chat_service import process_chat
from services.tts_service import text_to_speech

# Load .env
load_dotenv()
BASE_URL = os.getenv("BASE_URL") 

router = APIRouter()

@router.post("/speech_ask")
async def speech_ask(user_id: str = Form(...), audio: UploadFile = File(...)):

    os.makedirs("temp_audio", exist_ok=True)

    ext = audio.filename.split(".")[-1]
    filename = f"temp_{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join("temp_audio", filename)

    with open(filepath, "wb") as f:
        f.write(await audio.read())

    transcript = transcribe_audio(filepath)

    answer = process_chat(user_id, transcript)

    audio_path = text_to_speech(answer)

    file_name = audio_path.replace("\\", "/").split("/")[-1]

    audio_url = f"{BASE_URL}/tts/{file_name}"

    return {
        "transcript": transcript,
        "answer": answer,
        "audio_url": audio_url
    }
