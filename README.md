# HyperDoc AI ■■■
End-to-end GenAI platform that lets you **upload any PDF and chat with it in real-time**.
Under the hood:
* ■ OCR / text extraction → e5-large-v2 embeddings → Qdrant
* ■ Meta Llama-3-8B (Q2_K GGUF) served locally via **llama■cpp-python** * ■ FastAPI backend with **SSE** token streaming
* ■■ Next.js 14 + Tailwind front-end (drag-and-drop upload, live chat) * ■ Docker Compose dev stack (API + Qdrant)■*(optional)*