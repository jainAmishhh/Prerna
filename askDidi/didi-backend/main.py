import os
from fastapi import FastAPI
from routes.profile_routes import router as profile_router
from routes.chat_routes import router as chat_router
from fastapi.staticfiles import StaticFiles
from routes.stt_routes import router as stt_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
@app.get("/")
def home():
    return {"message": "Hello FastAPI"}
# Auto-create tts_output if not present
if not os.path.exists("tts_output"):
    os.makedirs("tts_output")

app.include_router(profile_router)
app.include_router(stt_router)
app.include_router(chat_router)
app.mount("/tts", StaticFiles(directory="tts_output"), name="tts")
