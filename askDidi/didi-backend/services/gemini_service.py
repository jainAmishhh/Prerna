import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = "gemini-2.0-flash"

genai.configure(api_key=API_KEY)

def ask_gemini(prompt):
    model = genai.GenerativeModel(
        MODEL_NAME,
        generation_config={
            "temperature": 0.4,
            "top_p": 0.9,
            "response_mime_type": "text/plain"
        }
    )
    response = model.generate_content([prompt])
    return response.text
