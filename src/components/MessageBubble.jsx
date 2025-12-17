"use client";

import { useEffect, useRef } from "react";

export default function MessageBubble({ role, content, isLoaded = false }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current && !isLoaded) {
      // Trigger animation after a small delay
      setTimeout(() => {
        contentRef.current?.classList.add("animate-in");
      }, 10);
    }
  }, [isLoaded]);

  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="message-container" data-sender={role}>
        <div
          ref={contentRef}
          className={`p-4 rounded-2xl ${
            isUser
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-[#F4F7FD] text-gray-800 rounded-bl-none"
          } message-content ${isLoaded ? "loaded" : ""}`}
        >
          {content}
        </div>
        {/* TODO: Port Lottie reaction bar from HTML when ready */}
      </div>
    </div>
  );
}
