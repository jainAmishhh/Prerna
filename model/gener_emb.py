### this is used to generate embeddings 0n mongo for stored data

import pickle
from pymongo import MongoClient, UpdateOne
import pandas as pd
from tqdm import tqdm
import os

# -------------------------------
# CONFIG
# -------------------------------
USE_LOCAL = False

if USE_LOCAL:
    MONGO_URI = "mongodb://localhost:27017/"
else:
    MONGO_URI = "mongodb+srv://dubeytanisha66_db_user:Tanisha@cluster0.rh9e4xv.mongodb.net/?appName=Cluster0"

DB_NAME = "prerna"
COLLECTION_NAME = "opportunities"

CSV_FILE = "opportunities.csv"     # your dataset file
EMBEDDINGS_FILE = "embeddings.pkl"
BATCH_SIZE = 200
# -------------------------------


def load_embeddings(path):
    """Load embeddings and convert to Python lists."""
    with open(path, "rb") as f:
        emb = pickle.load(f)

    # Convert numpy / tensors → list
    try:
        import numpy as np
        if isinstance(emb, np.ndarray):
            return emb.tolist()
    except:
        pass

    try:
        return [e.tolist() for e in emb]
    except:
        return list(emb)


def main():
    # 1. Load embeddings
    print("Loading embeddings from:", EMBEDDINGS_FILE)
    embeddings = load_embeddings(EMBEDDINGS_FILE)
    n_emb = len(embeddings)
    print("Total embeddings loaded:", n_emb)

    # 2. Load CSV
    if not os.path.exists(CSV_FILE):
        print("CSV file missing:", CSV_FILE)
        return

    df = pd.read_csv(CSV_FILE)

    if "id" not in df.columns:
        print("ERROR: CSV must contain 'id' column.")
        return

    print("Loaded dataset rows:", len(df))

    # 3. Connect to MongoDB
    print("Connecting to MongoDB...")
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    coll = db[COLLECTION_NAME]
    print("Connected to:", db, coll)

    # 4. Prepare mapping id → embedding
    print("Preparing id → embedding mapping...")
    id_to_emb = {}

    for i, row in df.iterrows():
        if i >= n_emb:
            break
        item_id = str(row["id"])
        id_to_emb[item_id] = embeddings[i]

    print("Mapping ready. Total IDs:", len(id_to_emb))

    # 5. Bulk update MongoDB
    print("Uploading embeddings to MongoDB...")
    ops = []
    updated = 0

    for item_id, emb in tqdm(id_to_emb.items()):
        ops.append(
            UpdateOne(
                {"id": item_id},
                {"$set": {"embedding": emb}}
            )
        )

        if len(ops) >= BATCH_SIZE:
            res = coll.bulk_write(ops, ordered=False)
            updated += res.modified_count
            ops = []

    # Final batch
    if ops:
        res = coll.bulk_write(ops, ordered=False)
        updated += res.modified_count

    print(f"\nUpload Completed. Total docs updated: {updated}")

    # 6. Verification
    count_emb = coll.count_documents({"embedding": {"$exists": True}})
    print("Docs in DB with embeddings:", count_emb)


if __name__ == "__main__":
    main()
