// frontend/src/components/ChatBox.tsx
"use client";

import React, { useState } from "react";
import { streamSSE } from "../lib/sse";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer]   = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    setAnswer("");
    setLoading(true);
    try {
      await streamSSE(
        "",                // unused baseUrl
        { question },      // payload only for query-string
        (tok) => setAnswer(a => a + tok),
        () => setLoading(false),
      );
    } catch (e: any) {
      console.error("SSE error:", e);
      setAnswer("❌ Failed to fetch answer.");
      setLoading(false);
    }
  }

  return (
    <div>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Ask a question…"
      />
      <button onClick={ask} disabled={!question || loading}>
        {loading ? "Thinking…" : "Ask"}
      </button>
      <pre>{answer}</pre>
    </div>
  );
}