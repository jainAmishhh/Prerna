import pymongo
from sentence_transformers import SentenceTransformer, util
import torch
import numpy as np

# ------------------------------- 
#  CONNECT TO MONGODB
# -------------------------------
USE_LOCAL =False

if USE_LOCAL:
    MONGO_URI = "mongodb://localhost:27017/"
else:
    MONGO_URI = "mongodb+srv://dubeytanisha66_db_user:Tanisha@cluster0.rh9e4xv.mongodb.net/?appName=Cluster0"
    # MONGO_URI = "mongodb+srv://dubeytanisha66_db_user:Tanisha@cluster0.rh9e4xv.mongodb.net/"

client = pymongo.MongoClient(MONGO_URI)

db = client["prerna"]
collection = db["opportunities"]
schemes_col = db["schemes"]
scholarships_col = db["scholorship"]
sports_col = db["sports"]
motivation_col = db["motivation"]
healt_col=db["health-section"]


# -------------------------------
#  LOAD BERT MODEL ONCE
# -------------------------------

bert_model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------------------------------
#  MAIN RECOMMEND FUNCTION  (USED BY YOUR FASTAPI)
# -------------------------------------------------------

def recommend(age: int, interests: list, region: str, top_k: int = 5):

    # ---------------------------
    # 1️⃣ Handle empty region
    # ---------------------------
    if not region or region.strip() == "":
        region = "India"

    region = region.strip()

    # ---------------------------
    # 2️⃣ List of all Indian states (your DB uses these)
    # ---------------------------
    indian_states = [
        "Rajasthan", "Delhi", "Karnataka", "Kerala", "Tamil Nadu",
        "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Gujarat",
        "Telangana", "Bihar", "Punjab", "Haryana", "West Bengal",
        "Assam", "Odisha", "Goa", "Jharkhand", "Chhattisgarh",
        "Uttarakhand", "Himachal Pradesh", "Tripura", "Manipur",
        "Meghalaya", "Nagaland", "Sikkim", "Arunachal Pradesh", 
    ]

    # ---------------------------
    # 3️⃣ Create region filter
    # ---------------------------

    if region.lower() == "india":
        # Case: user enters India → return all states + India
        region_query = {"$in": indian_states + ["India"]}
    else:
        # Case: user enters a state → return state + India
        region_query = {"$in": [region, "India"]}

    # ---------------------------
    # 4️⃣ Create user embedding
    # ---------------------------
    user_text = " ".join(interests) + f" age {age} region {region}"
    user_embedding = bert_model.encode(user_text, convert_to_tensor=True)

    # ---------------------------
    # 5️⃣ Fetch matching documents
    # ---------------------------
    matching_docs = list(collection.find({
        "age_min": {"$lte": age},
        "age_max": {"$gte": age},
        "region": region_query,
        "embedding": {"$exists": True}
    }))

    if not matching_docs:
        return []

    # ---------------------------
    # 6️⃣ Compute similarity
    # ---------------------------
    embeddings = torch.tensor([doc["embedding"] for doc in matching_docs])
    scores = util.cos_sim(user_embedding, embeddings)[0].cpu().numpy()

    # Attach scores
    for idx, doc in enumerate(matching_docs):
        doc["score"] = float(scores[idx])
        doc["_id"] = str(doc["_id"])

    # ---------------------------
    # 7️⃣ Sort by score + return top_k
    # ---------------------------
    sorted_docs = sorted(matching_docs, key=lambda x: x["score"], reverse=True)
    return sorted_docs[:top_k]

# -----------------------------------------------
# FILTER NON-EMBEDDING COLLECTIONS (SCHEMES ETC)
# -----------------------------------------------

def build_region_query(region: str):
    indian_states = [
        "Rajasthan", "Delhi", "Karnataka", "Kerala", "Tamil Nadu",
        "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Gujarat",
        "Telangana", "Bihar", "Punjab", "Haryana", "West Bengal",
        "Assam", "Odisha", "Goa", "Jharkhand", "Chhattisgarh",
        "Uttarakhand", "Himachal Pradesh", "Tripura", "Manipur",
        "Meghalaya", "Nagaland", "Sikkim", "Arunachal Pradesh",
    ]

    if not region or region.strip() == "":
        return {"$regex": "^(India|" + "|".join(indian_states) + ")$", "$options": "i"}

    region = region.strip()

    if region.lower() == "india":
        return {"$regex": "^(India|" + "|".join(indian_states) + ")$", "$options": "i"}

    # Case-insensitive match: region OR India
    return {"$regex": f"^({region}|India)$", "$options": "i"}

def filter_by_region_and_age(collection, age: int, region: str):

    region_query = build_region_query(region)

    results = list(collection.find({
        "age_min": {"$lte": age},
        "age_max": {"$gte": age},
        "region": region_query
    }))

    for doc in results:
        doc["_id"] = str(doc["_id"])

    return results


print("Documents in opportunities:", collection.count_documents({}))