"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start" id="typing-indicator">
      <div className="typing-indicator">
        <span className="text-sm text-gray-500 typing-text">Neve is typing</span>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
      </div>
    </div>
  );
}
