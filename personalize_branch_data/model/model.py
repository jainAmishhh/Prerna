import pymongo
import google.generativeai as genai
import numpy as np
from pathlib import Path
from dotenv import load_dotenv
import os

# -----------------------------------
# LOAD ENV
# -----------------------------------
path_api = Path(__file__).resolve().parent.parent / "server" / ".env"
load_dotenv(path_api)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# -----------------------------------
# MONGODB CONNECTION
# -----------------------------------
USE_LOCAL = False

if USE_LOCAL:
    MONGO_URI = "mongodb://localhost:27017/"
else:
    MONGO_URI = "mongodb+srv://dubeytanisha66_db_user:Tanisha@cluster0.rh9e4xv.mongodb.net/?appName=Cluster0"

client = pymongo.MongoClient(MONGO_URI)

db = client["prerna"]
collection = db["opportunities"]
schemes_col = db["schemes"]
scholarships_col = db["scholorship"]
sports_col = db["sports"]
motivation_col = db["motivation"]
healt_col = db["health-section"]
users_col = db["test_users"]

# -----------------------------------
# GEMINI EMBEDDING FUNCTION
# -----------------------------------
def embed_text(text: str):
    response = genai.embed_content(
        model="models/text-embedding-004",
        content=text,
    )
    return np.array(response["embedding"])  # return numpy array


# -----------------------------------
# NUMPY COSINE SIMILARITY
# -----------------------------------
def cosine_similarity(user_vec, doc_vecs):
    # Normalize vectors
    user_norm = user_vec / np.linalg.norm(user_vec)
    doc_norms = doc_vecs / np.linalg.norm(doc_vecs, axis=1, keepdims=True)

    # Dot product
    return np.dot(doc_norms, user_norm)


# ---------------------------------------------
# MAIN RECOMMEND FUNCTION
# ---------------------------------------------
def recommend(age: int, interests: list, region: str, top_k: int = 5):

    if not region or region.strip() == "":
        region = "India"

    if age is None:
        age = 20
        interests = ["Drawing", "Tech", "Painting", "Teaching", "Hairstylist"]

    region = region.strip()

    indian_states = [
        "Rajasthan", "Delhi", "Karnataka", "Kerala", "Tamil Nadu",
        "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Gujarat",
        "Telangana", "Bihar", "Punjab", "Haryana", "West Bengal",
        "Assam", "Odisha", "Goa", "Jharkhand", "Chhattisgarh",
        "Uttarakhand", "Himachal Pradesh", "Tripura", "Manipur",
        "Meghalaya", "Nagaland", "Sikkim", "Arunachal Pradesh",
    ]

    # Region filter
    if region.lower() == "india":
        region_query = {"$in": indian_states + ["India"]}
    else:
        region_query = {"$in": [region, "India"]}

    # Create user embedding
    user_text = " ".join(interests) + f" age {age} region {region}"
    user_embedding = embed_text(user_text)

    # Fetch matching opportunities
    matching_docs = list(collection.find({
        "age_min": {"$lte": age},
        "age_max": {"$gte": age},
        "region": region_query,
        "embedding": {"$exists": True}
    }))

    if not matching_docs:
        return []

    # Collect embeddings
    doc_embeddings = np.array([doc["embedding"] for doc in matching_docs])

    # Compute cosine similarity
    scores = cosine_similarity(user_embedding, doc_embeddings)

    # Attach scores
    for i, doc in enumerate(matching_docs):
        doc["_id"] = str(doc["_id"])
        doc["score"] = float(scores[i])

    # Sort & return top K
    sorted_docs = sorted(matching_docs, key=lambda x: x["score"], reverse=True)
    return sorted_docs[:top_k]


# ---------------------------------------------
# REGION + AGE FILTERS (unchanged)
# ---------------------------------------------
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
