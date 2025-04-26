from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient, models
from typing import List
import hashlib
import os

MODEL_NAME = "intfloat/e5-large-v2"
COLLECTION = "hyperdoc_chunks"

_model = SentenceTransformer(MODEL_NAME)
_qdrant = QdrantClient(url=os.getenv("QDRANT_URL", "http://localhost:6333"))

def ensure_collection(dim: int = 1024):
    if COLLECTION not in _qdrant.get_collections().collections:
        _qdrant.create_collection(
            collection_name=COLLECTION,
            vectors_config=models.VectorParams(size=dim, distance=models.Distance.COSINE)
        )

def chunk_text(text: str, chunk_size: int = 400, overlap: int = 50) -> List[str]:
    words = text.split()
    chunks = []
    i = 0
    while i < len(words):
        chunk = words[i : i + chunk_size]
        chunks.append(" ".join(chunk))
        i += chunk_size - overlap
    return chunks

def upsert_text(doc_id: str, text: str) -> int:
    ensure_collection(_model.get_sentence_embedding_dimension())
    chunks = chunk_text(text)
    embeddings = _model.encode([f"passage: {c}" for c in chunks], show_progress_bar=False)
    point_ids = []
    for idx, (chunk, vector) in enumerate(zip(chunks, embeddings)):
        point_id = int(hashlib.md5(f"{doc_id}_{idx}".encode()).hexdigest()[:16], 16)
        point_ids.append(point_id)
    _qdrant.upsert(
        collection_name=COLLECTION,
        points=models.Batch(ids=point_ids, vectors=embeddings, payloads=[{"text": c} for c in chunks]),
    )
    return len(chunks)