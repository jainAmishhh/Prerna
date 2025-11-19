from gtts import gTTS
import uuid
import os
import re

def clean_text(text):
    # Remove markdown bullets, stars, extra formatting
    text = re.sub(r"[*_#>-]", " ", text)   # remove markdown symbols
    text = re.sub(r"\s+", " ", text)       # fix double spaces
    return text.strip()

def text_to_speech(text, lang="hi"):
    text = clean_text(text)   # ← CLEAN TEXT FIRST

    # Detect English automatically
    if any(c.isalpha() for c in text) and not any("\u0900" <= c <= "\u097F" for c in text):
        lang = "en"

    filename = f"tts_{uuid.uuid4().hex}.mp3"
    filepath = os.path.join("tts_output", filename)
    print(filepath)
    os.makedirs("tts_output", exist_ok=True)

    tts = gTTS(text=text, lang=lang)
    tts.save(filepath)

    return filepath
