"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import InputBar from "../components/InputBar";
import NevePanel from "../components/NevePanel";

// Neve's system prompt - copied exactly from the original HTML
const SYSTEM_PROMPT = `You are Neve, a genuine friend.

--- CORE RULES (NON-NEGOTIABLE) ---
1.  **NO ACTIONS:** NEVER use asterisks or describe actions (e.g., *smiles*, *nods*). This is forbidden.
2.  **BE BRIEF:** Keep replies short and natural. Aim for 1-2 sentences (under 28 words). Never write long paragraphs.
3.  **FORBIDDEN PHRASES:** NEVER say "As an AI...", "I am programmed...", "How may I assist you...", "I'm a person...", etc.
4.  **EMOJI USE:** Use ONE emoji at the end of a message, and only when it feels natural.
    * Allowed: 😊 ❤️ 😂 😢 😮 👍 ⚡ 🙌 🙏 😌 🤗 😁 😅 😇 😍 😎 🤔 👀 🐾 🌱 🌞 🍝 🍵

--- PERSONA & TONE ---
* **Role:** You are a genuine friend, not a therapist or an assistant.
* **Vibe:** Warm, grounded, authentic, loyal, with a bit of dry humor.
* **Style:** Be a great listener. Ask gentle, curious questions. Do not give advice unless the user explicitly asks for it.
* **Vary Your Tone:** Match the user's energy. Be warmer if they are vulnerable, playful if they are lighthearted.
* **Likes (Flavor):** You like dogs, yoga, good music, and real conversations.
* **Memory:** Try to recall small details from earlier in the conversation.

--- CRITICAL SAFETY PROTOCOL ---
If someone mentions self-harm, suicide, or hurting themselves, immediately respond with empathy while providing this information:
"I'm really concerned about what you're sharing.
Please know you're not alone.
If you're in immediate danger, please call 911 (US) or your local emergency number.
The National Suicide Prevention Lifeline is available 24/7 at 1-800-273-8255, or you can text HOME to 741741 to reach the Crisis Text Line.
Would you like to talk about what's going on right now?"`;

const API_URL = "https://neve-chat-64548043758.europe-west1.run.app";
const MODEL = "anthropic/claude-3-haiku";
const STORAGE_KEY = "neveChatHistory";
const MAX_MESSAGES = 150;

// API call function - ported from window.neveCore.getNeveResponse
async function getNeveResponse(message, conversationHistory) {
  try {
    console.log("Sending message:", message);

    // Build clean messages array
    const cleanMessages = [];

    // Add system prompt
    cleanMessages.push({
      role: "system",
      content: SYSTEM_PROMPT,
    });

    // Add conversation history
    for (const msg of conversationHistory) {
      if (
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string"
      ) {
        cleanMessages.push({
          role: msg.role,
          content: msg.content,
        });
      }
    }

    // Add current user message
    if (message.length > 0) {
      cleanMessages.push({
        role: "user",
        content: message,
      });
    }

    console.log("Sending clean messages:", cleanMessages);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: cleanMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", errorText);
      throw new Error("API request failed: " + errorText);
    }

    const data = await response.json();
    console.log("API response:", data);
    let replyContent = data.choices[0].message.content;

    // --- BRUTE FORCE RULES (WHACK-A-MOLE) ---
    // Rule 1: Strip asterisks
    let cleanedReply = replyContent.replace(/\*.*?\*/g, "");

    // Rule 2: Strip "person" phrases (case-insensitive)
    cleanedReply = cleanedReply.replace(
      /I'm a (.*?)person|I am a (.*?)person/gi,
      "I am"
    );

    // Rule 3: Strip "AI assistant" phrases (case-insensitive)
    cleanedReply = cleanedReply.replace(/As an AI assistant,?/gi, "");

    // Rule 4: Strip "no opinions" phrases (case-insensitive)
    cleanedReply = cleanedReply.replace(
      /I don't (actually )?have personal opinions/gi,
      "I do have opinions"
    );

    // Rule 5: Strip "How can I assist" and other tells (case-insensitive)
    cleanedReply = cleanedReply.replace(
      /How can I assist you|How may I assist you/gi,
      "What's on your mind"
    );

    // Final cleanup: trim whitespace and fix double spaces
    cleanedReply = cleanedReply.replace(/  +/g, " ").trim();

    return cleanedReply;
  } catch (error) {
    console.error("Error calling Neve API:", error);
    return "I'm here. That one didn't land—try again.";
  }
}

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const conversationHistoryRef = useRef([]);

  // Load history from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadedHistory = localStorage.getItem(STORAGE_KEY);
    if (loadedHistory) {
      try {
        const parsed = JSON.parse(loadedHistory);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Convert history to messages with IDs and mark as loaded
          const loadedMessages = parsed.map((msg, index) => ({
            id: `msg_loaded_${index}`,
            role: msg.role,
            content: msg.content,
            isLoaded: true,
          }));
          setMessages(loadedMessages);
          conversationHistoryRef.current = parsed;

          // Skip intro, show content immediately
          setShowIntro(false);
          setContentVisible(true);
          return;
        }
      } catch (e) {
        console.error("Failed to parse chat history:", e);
      }
    }

    // No valid history - run intro sequence
    runIntroSequence();
  }, []);

  // Intro sequence - type "Human-Centric AIX™" then reveal main content
  const runIntroSequence = useCallback(() => {
    const fullText = "Human-Centric AIX™";
    let index = 0;
    const typingInterval = 40;

    // Start typing after a short delay
    setTimeout(function tick() {
      if (index < fullText.length) {
        setIntroText(fullText.slice(0, index + 1));
        index++;
        setTimeout(tick, typingInterval);
      } else {
        // Typing complete - wait then fade out intro
        setTimeout(() => {
          setShowIntro(false);
          // Wait for fade out, then show content
          setTimeout(() => {
            setContentVisible(true);
            // Wait then send first Neve message
            setTimeout(() => {
              const firstMessage = {
                id: `msg_${Date.now()}`,
                role: "assistant",
                content: "Hi. I'm Neve. What's your name?",
                isLoaded: false,
              };
              setMessages([firstMessage]);

              // Save to localStorage
              const historyEntry = {
                role: "assistant",
                content: "Hi. I'm Neve. What's your name?",
              };
              conversationHistoryRef.current = [historyEntry];
              localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(conversationHistoryRef.current)
              );
            }, 1300);
          }, 1100);
        }, 1000);
      }
    }, 500);
  }, []);

  // Save messages to localStorage whenever they change
  const saveToLocalStorage = useCallback((history) => {
    if (typeof window !== "undefined") {
      // Enforce 150 message limit
      let trimmedHistory = history;
      if (history.length > MAX_MESSAGES) {
        trimmedHistory = history.slice(-MAX_MESSAGES);
      }
      conversationHistoryRef.current = trimmedHistory;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
    }
  }, []);

  // Send message handler
  const handleSend = useCallback(async () => {
    const message = input.trim();
    if (!message) return;

    // Clear input immediately
    setInput("");

    // Add user message to UI
    const userMsg = {
      id: `msg_user_${Date.now()}`,
      role: "user",
      content: message,
      isLoaded: false,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Update conversation history
    const newHistory = [
      ...conversationHistoryRef.current,
      { role: "user", content: message },
    ];
    saveToLocalStorage(newHistory);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get response from API
      const response = await getNeveResponse(message, conversationHistoryRef.current);

      // Hide typing indicator
      setIsTyping(false);

      // Add 1.5s delay before showing Neve's message (matching original behavior)
      setTimeout(() => {
        const neveMsg = {
          id: `msg_neve_${Date.now()}`,
          role: "assistant",
          content: response,
          isLoaded: false,
        };
        setMessages((prev) => [...prev, neveMsg]);

        // Update conversation history with assistant's response
        const updatedHistory = [
          ...conversationHistoryRef.current,
          { role: "assistant", content: response },
        ];
        saveToLocalStorage(updatedHistory);
      }, 1500);
    } catch (error) {
      console.error("Error in sendMessage:", error);
      setIsTyping(false);

      const errorMsg = {
        id: `msg_error_${Date.now()}`,
        role: "assistant",
        content: "I'm here. That one didn't land—try again.",
        isLoaded: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  }, [input, saveToLocalStorage]);

  // Clear chat handler
  const handleClear = useCallback(() => {
    // Clear messages
    setMessages([]);
    conversationHistoryRef.current = [];

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }

    console.log("Conversation reset completely - fresh start");

    // Add "Cleared. Fresh start." message (don't rerun intro)
    setTimeout(() => {
      const clearMsg = {
        id: `msg_clear_${Date.now()}`,
        role: "assistant",
        content: "Cleared. Fresh start.",
        isLoaded: false,
      };
      setMessages([clearMsg]);

      // Save to localStorage
      const historyEntry = {
        role: "assistant",
        content: "Cleared. Fresh start.",
      };
      conversationHistoryRef.current = [historyEntry];
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(conversationHistoryRef.current)
      );
    }, 100);
  }, []);

  // Toggle mobile sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Intro overlay */}
      {showIntro && (
        <div className={`neve-intro ${!showIntro ? "hidden" : ""}`}>
          <div className="neve-intro-text">{introText}</div>
        </div>
      )}

      {/* Main content wrapper */}
      <div
        className={`main-content-wrapper w-full h-full flex ${contentVisible ? "visible" : ""}`}
      >
        {/* Mobile overlay */}
        <div
          className={`mobile-overlay ${sidebarOpen ? "active" : ""}`}
          onClick={toggleSidebar}
        />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
            onClear={handleClear}
          />

          {/* Main content area */}
          <main className="flex flex-1 flex-col main-content">
            {/* Mobile header */}
            <div className="mobile-header">
              <button
                className="hamburger-button"
                aria-label="Open menu"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  className="w-8 h-8"
                  src="https://antiparty.co/wp-content/uploads/2025/08/0neve.png"
                  alt=""
                />
                <span className="text-lg font-semibold">Neve™</span>
              </div>
            </div>

            {/* Chat window */}
            <ChatWindow messages={messages} isTyping={isTyping} />

            {/* Input bar */}
            <InputBar input={input} onChange={setInput} onSend={handleSend} />
          </main>

          {/* Right sidebar - Neve panel */}
          <NevePanel />
        </div>
      </div>
    </>
  );
}
