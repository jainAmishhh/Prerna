from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from model.model import recommend

app = FastAPI()


# Input schema
class RecommendInput(BaseModel):
    age: int
    interests: List[str]
    region: str
    top_k: int = 5


@app.post("/recommend")
def recommend_opportunities(data: RecommendInput):
    results = recommend(
        age=data.age,
        interests=data.interests,
        region=data.region,
        top_k=data.top_k
    )
    return {"recommendations": results}


@app.get("/")
def home():
    return {"message": "Opportunity Recommendation API is running"}
