// frontend/src/components/UploadForm.tsx
"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";

interface UploadFormProps {
  onUploaded: () => void;
}

export default function UploadForm({ onUploaded }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  async function handleUpload(e: FormEvent) {
    e.preventDefault();
    if (!file) return;

    setStatus("Uploading…");
    try {
      const form = new FormData();
      form.append("file", file);

      // Hit your FastAPI /ingest
      await axios.post("http://localhost:8001/ingest", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ Uploaded! You can now ask questions.");
      setFile(null);

      onUploaded();  // flip the flag
    } catch (err: any) {
      console.error(err);
      setStatus(`❌ Upload failed: ${err.message}`);
    }
  }

  return (
    <form
      onSubmit={handleUpload}
      className="border rounded-lg p-4 bg-white dark:bg-gray-800"
    >
      <label className="block mb-2 font-semibold">
        Upload PDF
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block mb-4"
      />

      <button
        type="submit"
        disabled={!file}
        className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {file ? `Upload “${file.name}”` : "Select a PDF first"}
      </button>

      {status && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{status}</p>}
    </form>
  );
}