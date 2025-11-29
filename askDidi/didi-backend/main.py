# didi-backend/main.py
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.profile_routes import router as profile_router
from routes.chat_routes import router as chat_router
from routes.stt_routes import router as stt_router

app = FastAPI()

# ---------------- CORS FIX ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# -------------------------------------------

@app.get("/")
def home():
    return {"message": "Hello FastAPI"}

# create folders
os.makedirs("tts_output", exist_ok=True)
os.makedirs("temp_audio", exist_ok=True)

# include routers
app.include_router(profile_router)
app.include_router(stt_router)      # speech_ask lives here
app.include_router(chat_router)

# serve audio files
app.mount("/tts", StaticFiles(directory="tts_output"), name="tts")


# import os
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles

# from routes.profile_routes import router as profile_router
# from routes.chat_routes import router as chat_router
# from routes.stt_routes import router as stt_router
# from routes.stt_chat_routes import router as stt_chat_router # <--- CHECK THIS IMPORT

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "Hello FastAPI"}

# # Auto-create TTS folder
# os.makedirs("tts_output", exist_ok=True)

# # Routers
# app.include_router(profile_router)
# app.include_router(stt_router)
# app.include_router(chat_router)
# app.include_router(stt_chat_router) # <--- CHECK THIS INCLUSION

# # Static URL for TTS audio
# app.mount("/tts", StaticFiles(directory="tts_output"), name="tts")


# # import os
# # from fastapi import FastAPI
# # from routes.profile_routes import router as profile_router
# # from routes.chat_routes import router as chat_router
# # from fastapi.staticfiles import StaticFiles
# # from routes.stt_routes import router as stt_router
# # from fastapi.middleware.cors import CORSMiddleware

# # app = FastAPI()
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],         # allow all origins
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"]
# # )
# # @app.get("/")
# # def home():
# #     return {"message": "Hello FastAPI"}
# # # Auto-create tts_output if not present
# # if not os.path.exists("tts_output"):
# #     os.makedirs("tts_output")

# # app.include_router(profile_router)
# # app.include_router(stt_router)
# # app.include_router(chat_router)
# # app.mount("/tts", StaticFiles(directory="tts_output"), name="tts")



# import sys
# import os

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# sys.path.append(BASE_DIR)

# from fastapi import FastAPI, Query
# # from pydantic import BaseModel
# from typing import List

# from personalize_branch_data.model.model import (
#     recommend,
#     filter_by_region_and_age,
#     schemes_col,
#     scholarships_col,
#     sports_col,
#     motivation_col,
#     healt_col
#  )
# # from personalize_branch.model import recommend 
# #     recommend,
# #     filter_by_region_and_age,
# #     schemes_col,
# #     scholarships_col,
# #     sports_col,
# #     motivation_col,
# #     healt_col,
# #     users_col
# # )

# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],   # allow all frontend URLs
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/recommend")
# def recommend_opportunities(
#     age: int = Query(None, description="User age"),
#     region: str = Query("", description="User region (state or India)"),
#     interests: List[str] = Query(None
#         , 
#         description="List of interests. Example: ?interests=tech&interests=ai"
#     ),
#     top_k: int = Query(5, description="Number of results to return"),
# ):
#     """
#     Returns recommended opportunities based on:
#     - age
#     - region (state/india)
#     - list of interests
#     - top_k results
#     """

#     try:
#         # if not age and not region:
#         #     age=10,
#         #     interests=["Drawing","Tech","Painting","Teaching","Hairstylist"]
#         results = recommend(
#             age=age,
#             interests=interests,
#             region=region,
#             top_k=top_k
#         )
#         return {"status": "success", "count": len(results), "data": results}

#     except Exception as e:
#         return {"status": "error", "message": str(e)}

# # 🔵 1. /schemes
# @app.get("/schemes")
# def get_schemes(age: int, region: str):
#     data = filter_by_region_and_age(schemes_col, age, region)
#     return {"schemes": data}

# # 🟢 2. /scholarships
# @app.get("/scholarships")
# def get_scholarships(age: int, region: str):
#     data = filter_by_region_and_age(scholarships_col, age, region)
#     return {"scholarships": data}

# # 🔴 3. /sports
# @app.get("/sports")
# def get_sports(age: int, region: str):
#     data = filter_by_region_and_age(sports_col, age, region)
#     return {"sports": data}

# # 🟠 4. /motivation
# @app.get("/motivation")
# def get_motivation(age: int, region: str):
#     data = filter_by_region_and_age(motivation_col, age, region)
#     return {"motivation": data}

# @app.get("/healthcare")
# def get_healthcare(age:int,region:str):
#     data=filter_by_region_and_age(healt_col,age,region)
#     return {"healthcare":data}