from fastapi import APIRouter
from models.user_profile import UserProfile
from config.db import profiles_collection

router = APIRouter()

@router.post("/save_profile")
def save_profile(profile: UserProfile):
    profiles_collection.update_one(
        {"user_id": profile.user_id},
        {"$set": profile.dict()},
        upsert=True
    )
    return {"status": "profile saved"}
