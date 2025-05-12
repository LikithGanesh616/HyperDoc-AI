// frontend/src/app/page.tsx
"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";
import ChatBox from "../components/ChatBox";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* LEFT */}
      <div className="w-1/2 flex items-center justify-center p-8">
        {!ready ? (
          <UploadForm onUploaded={() => setReady(true)} />
        ) : (
          <p className="text-lg text-gray-700 dark:text-gray-300">
            ✅ Document ingested! Ask away →
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="w-1/2 p-8">
        <ChatBox disabled={!ready} />
      </div>
    </div>
  );
}