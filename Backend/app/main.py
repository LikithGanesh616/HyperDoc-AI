from fastapi import FastAPI, UploadFile, File, HTTPException
from .pdf_utils import pdf_to_text
from .embed_utils import upsert_text

app = FastAPI()




@app.post("/ingest")
async def ingest(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=415, detail="Only PDF files are supported.")
    pdf_bytes = await file.read()
    text = pdf_to_text(pdf_bytes)
    doc_id = file.filename
    n_chunks = upsert_text(doc_id, text)
    return {
        "filename": doc_id,
        "chunks": n_chunks,
        "chars": len(text)
    }