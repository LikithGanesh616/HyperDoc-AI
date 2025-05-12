// frontend/src/components/UploadForm.tsx
"use client";

import React, { FormEvent, JSX, useState } from "react";
import axios from "axios";

export default function UploadForm(): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;

    setStatus("Uploading…");

    try {
      const form = new FormData();
      form.append("file", file);

      // NOTE: POST to /api/ingest (rewritten to your FastAPI)
      await axios.post("/api/ingest", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("✅ Uploaded! You can now ask questions.");
      setFile(null);
    } catch (err: any) {
      console.error("Upload error:", err);
      setStatus(`❌ Upload failed: ${err.message}`);
    }
  }

  return (
    <form
      onSubmit={handleUpload}
      className="border rounded-xl p-4 flex flex-col gap-2"
    >
      <label className="font-semibold">Upload PDF</label>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block"
      />

      <button
        type="submit"
        disabled={!file}
        className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {file ? `Upload “${file.name}”` : "Select a PDF first"}
      </button>

      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}