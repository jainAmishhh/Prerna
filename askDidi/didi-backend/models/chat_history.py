from pydantic import BaseModel

class ChatMessage(BaseModel):
    role: str   # "user" or "assistant"
    text: str

class ChatRequest(BaseModel):
    user_id: str
    message: str
