from fastapi import FastAPI, Query
# from pydantic import BaseModel
from typing import List
from model.model import (
    recommend,
    filter_by_region_and_age,
    schemes_col,
    scholarships_col,
    sports_col,
    motivation_col,
    healt_col
)

app = FastAPI()


# # Input schema
# class RecommendInput(BaseModel):
#     age: int
#     interests: List[str]
#     region: str
#     top_k: int = 5


# @app.post("/recommend")
# def recommend_opportunities(data: RecommendInput):
#     results = recommend(
#         age=data.age,
#         interests=data.interests,
#         region=data.region,
#         top_k=data.top_k
#     )
#     return {"recommendations": results}


@app.get("/recommend")
def recommend_opportunities(
    age: int = Query(..., description="User age"),
    region: str = Query("", description="User region (state or India)"),
    interests: List[str] = Query(
        ..., 
        description="List of interests. Example: ?interests=tech&interests=ai"
    ),
    top_k: int = Query(5, description="Number of results to return"),
):
    """
    Returns recommended opportunities based on:
    - age
    - region (state/india)
    - list of interests
    - top_k results
    """

    try:
        results = recommend(
            age=age,
            interests=interests,
            region=region,
            top_k=top_k
        )
        return {"status": "success", "count": len(results), "data": results}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# 🔵 1. /schemes
@app.get("/schemes")
def get_schemes(age: int, region: str):
    data = filter_by_region_and_age(schemes_col, age, region)
    return {"schemes": data}

# 🟢 2. /scholarships
@app.get("/scholarships")
def get_scholarships(age: int, region: str):
    data = filter_by_region_and_age(scholarships_col, age, region)
    return {"scholarships": data}

# 🔴 3. /sports
@app.get("/sports")
def get_sports(age: int, region: str):
    data = filter_by_region_and_age(sports_col, age, region)
    return {"sports": data}

# 🟠 4. /motivation
@app.get("/motivation")
def get_motivation(age: int, region: str):
    data = filter_by_region_and_age(motivation_col, age, region)
    return {"motivation": data}

@app.get("/healthcare")
def get_healthcare(age:int,region:str):
    data=filter_by_region_and_age(healt_col,age,region)
    return {"healthcare":data}

@app.get("/")
def home():
    return {"message": "Opportunity Recommendation API is running"}
