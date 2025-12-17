"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow({ messages, isTyping }) {
  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when messages change or typing indicator appears
  useEffect(() => {
    if (chatBoxRef.current) {
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 60);
    }
  }, [messages, isTyping]);

  return (
    <div
      ref={chatBoxRef}
      id="chat-box"
      className="flex-1 overflow-y-auto chat-scroll p-6 pt-[120px] space-y-4 chat-box-mobile"
    >
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          role={msg.role === "assistant" ? "neve" : msg.role}
          content={msg.content}
          isLoaded={msg.isLoaded}
        />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
}
