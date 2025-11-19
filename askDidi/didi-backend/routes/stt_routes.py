import os
import uuid
from pydub import AudioSegment
from fastapi import APIRouter, UploadFile, File, Form
from services.stt_service import transcribe_audio
from services.chat_service import process_chat
from services.tts_service import text_to_speech

router = APIRouter()

@router.post("/speech_ask")
async def speech_ask(user_id: str = Form(...), audio: UploadFile = File(...)):

    # Save user audio temporarily
    ext = audio.filename.split(".")[-1] 
    filename = f"temp_{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join("temp_audio", filename)  # temp_audio/temp_96679c46b119445cac88f0787e726be0.mp3
    os.makedirs("temp_audio", exist_ok=True)

    with open(filepath, "wb") as f:
        f.write(await audio.read()) # writes data in form of bits at filepath
    print("filesize:", os.path.getsize(filepath))

    #converts webm to .wav
    sound = AudioSegment.from_file(filepath)
    wav_path = filepath.rsplit(".", 1)[0] + ".wav"
    sound.export(wav_path, format="wav")

    # 🔍 Debug audio properties
    wav = AudioSegment.from_file(wav_path)
    print("WAV duration (ms):", len(wav))
    print("WAV dBFS:", wav.dBFS)
    print("WAV RMS:", wav.rms)

    # 1) Transcribe with .wav and gets the text
    transcript = transcribe_audio(wav_path)

    # write transcript
    # transcriptname = f"transcript_{uuid.uuid4().hex}.txt"
    # transcriptpath = os.path.join("transcript", transcriptname)  #temp_audio/temp_96679c46b119445cac88f0787e726be0.mp3
    # os.makedirs("transcript", exist_ok=True)

    # with open(transcriptpath, "wb") as f:
    #     f.write(transcript.encode("utf-8")) #writes data in form of bits at filepath

    # 2) Process chat (Gemini answer)
    answer = process_chat(user_id, transcript) # chat_service, response.text ⛳ - check if resp is both englisha nd hindi

    # 3) Convert AI answer to speech
    audio_path = text_to_speech(answer)
    file_name = audio_path.replace("\\", "/").split("/")[-1]
    audio_url = f"http://127.0.0.1:8000/tts/{file_name}"

    return {
        "transcript": transcript,
        "answer": answer,
        "audio_url": audio_url
    }
