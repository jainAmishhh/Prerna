from fastapi import FastAPI, Query
from typing import List

# ------- LAZY LOAD FIX -------
# Your functions import heavy ML models inside model.model
# Import model functions lazily to avoid memory spikes at startup

recommend_fn = None
filter_fn = None
cols_loaded = False

def lazy_import_models():
    global recommend_fn, filter_fn, schemes_col, scholarships_col, sports_col, motivation_col, healt_col, users_col, cols_loaded

    if not cols_loaded:
        print("Lazy loading heavy ML + DB modules...")

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

        recommend_fn = recommend
        filter_fn = filter_by_region_and_age

        cols_loaded = True

    return recommend_fn, filter_fn
# ------------------------------

from sakhi import ask_gemini
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- API ROUTES -------------------

@app.get("/recommend")
def recommend_opportunities(
    age: int = Query(None, description="User age"),
    region: str = Query("", description="User region (state or India)"),
    interests: List[str] = Query(None, description="List of interests. Example: ?interests=tech&interests=ai"),
    top_k: int = Query(5, description="Number of results to return"),
):
    """
    Returns recommended opportunities based on:
    - age
    - region
    - interests
    - top_k
    """

    try:
        recommend_fn, _ = lazy_import_models()

        results = recommend_fn(
            age=age,
            interests=interests,
            region=region,
            top_k=top_k
        )
        return {"status": "success", "count": len(results), "data": results}

    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/schemes")
def get_schemes(age: int, region: str):
    _, filter_fn = lazy_import_models()
    data = filter_fn(schemes_col, age, region)
    return {"schemes": data}


@app.get("/scholarships")
def get_scholarships(age: int, region: str):
    _, filter_fn = lazy_import_models()
    data = filter_fn(scholarships_col, age, region)
    return {"scholarships": data}


@app.get("/sports")
def get_sports(age: int, region: str):
    _, filter_fn = lazy_import_models()
    data = filter_fn(sports_col, age, region)
    return {"sports": data}


@app.get("/motivation")
def get_motivation(age: int, region: str):
    _, filter_fn = lazy_import_models()
    data = filter_fn(motivation_col, age, region)
    return {"motivation": data}


@app.get("/healthcare")
def get_healthcare(age: int, region: str):
    _, filter_fn = lazy_import_models()
    data = filter_fn(healt_col, age, region)
    return {"healthcare": data}


@app.get("/")
def home():
    return {"message": "Opportunity Recommendation API is running"}


@app.get("/sakhi")
def sakhi_chatbot(query: str = Query(..., description="User message to Sakhi chatbot")):
    try:
        response = ask_gemini(query)
        return {"status": "success", "reply": response}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# ---------------- END -----------------
