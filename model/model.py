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

# -------------------------------
#  LOAD BERT MODEL ONCE
# -------------------------------

bert_model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------------------------------
#  MAIN RECOMMEND FUNCTION  (USED BY YOUR FASTAPI)
# -------------------------------------------------------
def recommend(age: int, interests: list, region:str= "India", top_k: int = 5):

    # 1️⃣ Create user embedding
    user_text = " ".join(interests) + f" age {age} region {region}"
    user_embedding = bert_model.encode(user_text, convert_to_tensor=True)

    # 2️⃣ Fetch matching opportunities from MongoDB
    matching_docs = list(collection.find({
    "age_min": {"$lte": age},
    "age_max": {"$gte": age},
    "embedding": {"$exists": True}
}))

    if not matching_docs:
        return []

    # 3️⃣ Extract embeddings stored in MongoDB
    embeddings = torch.tensor([doc["embedding"] for doc in matching_docs])

    # 4️⃣ Compute cosine similarity
    scores = util.cos_sim(user_embedding, embeddings)[0].cpu().numpy()

    # 5️⃣ Add score to documents
    for idx, doc in enumerate(matching_docs):
        doc["score"] = float(scores[idx])

    # 6️⃣ Sort by rank score (descending)
    ranked = sorted(matching_docs, key=lambda x: x["score"], reverse=True)

    # 7️⃣ Pick top_k items
    top_items = ranked[:top_k]

    # 8️⃣ Ensure JSON-serializable output
    for item in top_items:
        item["_id"] = str(item["_id"])  # Convert ObjectId → string


    return top_items
print("Documents in opportunities:", collection.count_documents({}))