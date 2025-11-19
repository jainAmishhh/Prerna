from pydantic import BaseModel

class UserProfile(BaseModel):
    user_id: str
    name: str = None
    preferred_language: str = "Hindi"
    education: str = None
    skills: list = []
    interests: list = []
    location: str = None
