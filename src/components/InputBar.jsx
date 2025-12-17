"use client";

export default function InputBar({ input, onChange, onSend }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <footer className="bg-white border-0 border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          id="user-input"
          placeholder="Send a message..."
          className="flex-1 p-3 rounded-2xl w-[800px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          id="send-button"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600"
          aria-label="Send"
          onClick={onSend}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
