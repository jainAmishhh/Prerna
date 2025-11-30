import os
from dotenv import load_dotenv
from pathlib import Path
import google.generativeai as genai

env_path = Path(__file__).resolve().parent.parent / "server" / ".env"
load_dotenv(env_path)
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = "gemini-2.0-flash"

genai.configure(api_key=API_KEY)

def ask_gemini(prompt):
    model = genai.GenerativeModel(
        MODEL_NAME,
        generation_config={
            "temperature": 0.4,
            "top_p": 0.9,
            "response_mime_type": "text/plain",
            "max_output_tokens": 100 
        }
    )
    response = model.generate_content([prompt])
    print("RAW GEMINI RESPONSE:", response)
    return response.text