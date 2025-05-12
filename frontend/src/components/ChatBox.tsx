// frontend/src/components/ChatBox.tsx
"use client";

import { useState } from "react";
import { streamSSE } from "../lib/sse";

interface ChatBoxProps {
  disabled: boolean;
}

export default function ChatBox({ disabled }: ChatBoxProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    if (disabled || !question) return;
    setAnswer("");
    try {
      await streamSSE(
        "http://localhost:8001/chat/stream",
        { question },
        (tok) => setAnswer((a) => a + tok),
        () => {}
      );
    } catch (err: any) {
      console.error(err);
      setAnswer("❌ Failed to load answer.");
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <textarea
        rows={3}
        disabled={disabled}
        placeholder={disabled ? "Upload a PDF first" : "Type your question…"}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-100"
      />

      <button
        onClick={handleAsk}
        disabled={disabled || !question}
        className="self-end bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        Ask
      </button>

      <pre className="whitespace-pre-wrap bg-white dark:bg-gray-800 p-4 rounded-lg text-gray-900 dark:text-gray-100">
        {answer}
      </pre>
    </div>
  );
}