from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, StreamingResponse

from .pdf_utils   import pdf_to_text
from .embed_utils import upsert_text
from .rag_utils   import answer, stream_answer

app = FastAPI()

# Allow your Next.js frontend at localhost:3000 to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ingest")
async def ingest(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(415, "Only PDF files supported")
    text = pdf_to_text(await file.read())
    n = upsert_text(file.filename, text)
    return {"filename": file.filename, "chunks": n, "chars": len(text)}

@app.post("/chat")
async def chat(question: str):
    try:
        return {"answer": answer(question)}
    except Exception as e:
        raise HTTPException(500, str(e))


# Here’s the important change: accept GET (and POST) on the same path
@app.api_route("/chat/stream", methods=["GET", "POST"])
async def chat_stream(question: str):
    if not question:
        raise HTTPException(400, "Missing `question` query parameter")

    async def event_generator():
        # yield each token as an SSE `data:` line
        for tok in stream_answer(question):
            yield f"data: {tok}\n\n"
        # one final “done” event so client can clean up
        yield "event: done\ndata: \n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
    )