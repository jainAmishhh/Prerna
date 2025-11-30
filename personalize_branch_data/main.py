
from fastapi import FastAPI, Query
from typing import List
from sakhi import ask_gemini

from model.model import (
    recommend,
    filter_by_region_and_age,
    schemes_col,
    scholarships_col,
    sports_col,
    motivation_col,
    healt_col,
    users_col
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# -------------------------------
# ALLOW ALL CORS (Frontend React)
# -------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # your React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# 1️⃣ MAIN OPPORTUNITY RECOMMENDER
# -------------------------------
@app.get("/recommend")
def recommend_opportunities(
    age: int = Query(None, description="User age"),
    region: str = Query("", description="User region (state or India)"),
    interests: List[str] = Query(
        None,
        description="List of interests. Example: ?interests=tech&interests=ai"
    ),
    top_k: int = Query(5, description="Number of results to return"),
):
    """
    Returns recommended opportunities based on:
    - age
    - region (state/india)
    - interests (list)
    - top_k results
    """

    try:
        results = recommend(
            age=age,
            interests=interests,
            region=region,
            top_k=top_k
        )
        return {
            "status": "success",
            "count": len(results),
            "data": results
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}

# -------------------------------
# 2️⃣ SCHEMES
# -------------------------------
@app.get("/schemes")
def get_schemes(age: int, region: str):
    data = filter_by_region_and_age(schemes_col, age, region)
    return {"schemes": data}

# -------------------------------
# 3️⃣ SCHOLARSHIPS
# -------------------------------
@app.get("/scholarships")
def get_scholarships(age: int, region: str):
    data = filter_by_region_and_age(scholarships_col, age, region)
    return {"scholarships": data}

# -------------------------------
# 4️⃣ SPORTS
# -------------------------------
@app.get("/sports")
def get_sports(age: int, region: str):
    data = filter_by_region_and_age(sports_col, age, region)
    return {"sports": data}

# -------------------------------
# 5️⃣ MOTIVATION
# -------------------------------
@app.get("/motivation")
def get_motivation(age: int, region: str):
    data = filter_by_region_and_age(motivation_col, age, region)
    return {"motivation": data}

# -------------------------------
# 6️⃣ HEALTH CARE
# -------------------------------
@app.get("/healthcare")
def get_healthcare(age: int, region: str):
    data = filter_by_region_and_age(healt_col, age, region)
    return {"healthcare": data}

# -------------------------------
# 7️⃣ HOME ROUTE
# -------------------------------
@app.get("/")
def home():
    return {"message": "Opportunity Recommendation API (Gemini Version) is running"}

# -------------------------------
# 8️⃣ SAKHI CHATBOT
# -------------------------------
@app.get("/sakhi")
def sakhi_chatbot(query: str = Query(..., description="User message to Sakhi chatbot")):
    try:
        response = ask_gemini(query)
        return {"status": "success", "reply": response}
    except Exception as e:
        return {"status": "error", "message": str(e)}
