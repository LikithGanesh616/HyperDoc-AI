# HyperDoc AI

A full-stack Retrieval-Augmented Generation (RAG) demo: ingest PDFs, index them in Qdrant, and chat in real time with a Llama 3 model.

---

## 🚀 Features

- **PDF Ingestion**  
  Upload a PDF → chunk → embed → index in Qdrant  
- **Vector Search**  
  intfloat/e5-large-v2 embeddings + Qdrant  
- **Generative AI**  
  Llama-3-8B GGUF via `llama-cpp` (streaming SSE)  
- **Modern Web UI**  
  Next.js 15 + Tailwind CSS, dark mode, Instagram-style chat bubbles  
- **MLOps Foundations**  
  - Docker Compose for Qdrant  
  - Model versioned on Hugging Face Hub  
  - Env-driven config (`LLAMA_PATH`, `QDRANT_URL`)

---

## 🏗 Architecture

```
Browser (React + Next.js)
    ↕️ SSE / REST
Next.js Frontend        FastAPI Backend
(TS + Tailwind)         (Python + llama-cpp)
    ↕️ HTTP
  Qdrant Vector Store
```

---

## ⚙️ Quickstart

### Prerequisites

- Python 3.11+ (pyenv recommended)  
- Node.js v18+ & pnpm  
- Docker & Docker Compose  

### 1. Clone & Install

```bash
git clone https://github.com/your-org/HyperDoc-AI.git
cd HyperDoc-AI
```

#### Backend

```bash
cd backend
pyenv virtualenv 3.11.8 hyperdoc-ai
pyenv activate hyperdoc-ai
pip install -r requirements.txt
```

#### Frontend

```bash
cd ../frontend
pnpm install
```

### 2. Launch Qdrant

```bash
docker compose -f ../infra/docker-compose.dev.yml up -d --build
curl http://localhost:6333/collections
```

### 3. Run Services

Open **two** shells:

- **Backend**
  ```bash
  cd HyperDoc-AI/backend
  export LLAMA_PATH="app/models/Meta-Llama-3-8B.Q4_K_M.gguf"
  uvicorn app.main:app --reload --port 8001
  ```
- **Frontend**
  ```bash
  cd HyperDoc-AI/frontend
  pnpm dev
  ```

### 4. Try It

1. Visit `http://localhost:3000`  
2. Upload a PDF → wait for “Document ingested!”  
3. Ask questions → see streaming AI responses  

---

## 📂 Project Layout

```
HyperDoc-AI/
│
├─ backend/
│   ├─ app/
│   │   ├─ main.py
│   │   ├─ pdf_utils.py
│   │   ├─ embed_utils.py
│   │   └─ rag_utils.py
│   └─ requirements.txt
│
├─ frontend/
│   ├─ src/
│   │   ├─ app/
│   │   │   ├─ layout.tsx
│   │   │   ├─ page.tsx
│   │   │   └─ globals.css
│   │   ├─ components/
│   │   │   ├─ Sidebar.tsx
│   │   │   ├─ SearchBar.tsx
│   │   │   ├─ UploadForm.tsx
│   │   │   └─ ChatBox.tsx
│   │   └─ lib/
│   │       └─ sse.ts
│   ├─ tailwind.config.js
│   ├─ postcss.config.js
│   └─ package.json
│
└─ infra/
    └─ docker-compose.dev.yml
```



## 💼 Resume Highlights

- Retrieval-Augmented Generation: PDF → embeddings → LLM  
- Vector embeddings + Qdrant search  
- FastAPI SSE streaming endpoints  
- React/Next.js + Tailwind dark-mode UI  
- Dockerized Qdrant, HF Hub model versioning, env-driven configs  

---

Made with ❤️ by Likith Sompalli
