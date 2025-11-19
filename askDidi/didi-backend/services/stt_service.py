import assemblyai as aai
import os
from dotenv import load_dotenv

load_dotenv()

aai.settings.api_key = os.getenv("ASSEMBLYAI_KEY")

def transcribe_audio(file_path):
    config = aai.TranscriptionConfig(
        speech_model=aai.SpeechModel.universal,
        language_code="hi",
        punctuate=True,
        format_text=True
    )

    transcriber = aai.Transcriber()
    result = transcriber.transcribe(file_path, config)
    
    return result.text
