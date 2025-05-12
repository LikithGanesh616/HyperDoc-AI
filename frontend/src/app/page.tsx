// src/app/page.tsx
import React from "react";
import UploadForm from "../components/UploadForm";
import ChatBox    from "../components/ChatBox";

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>🚀 HyperDoc AI</h1>
      <UploadForm />
      <ChatBox />
    </main>
  );
}