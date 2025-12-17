"use client";

export default function Sidebar({ isOpen, onToggle, onClear }) {
  return (
    <aside
      id="sidebar"
      className={`sidebar-wrapper bg-white border-r border-gray-200 ${isOpen ? 'mobile-open' : ''}`}
    >
      <div>
        <div className="logo-container flex items-center space-x-3 mb-8">
          <img
            className="w-11 h-11"
            src="https://antiparty.co/wp-content/uploads/2025/08/0neve.png"
            alt="Neve logo"
          />
          <span className="neve-text text-xl font-bold sidebar-text">Neve™</span>
        </div>
        <nav>
          <a
            href="#"
            id="current-chat-button"
            className="nav-link flex items-center p-3 rounded-lg text-sm font-medium text-gray-900 bg-gray-100"
            title="Have fun talking to Neve."
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="sidebar-text">Current chat</span>
          </a>
          <a
            href="#"
            id="new-chat-button"
            className="nav-link flex items-center p-3 mt-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
            title="New chat (coming soon)"
            onClick={(e) => e.preventDefault()}
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="sidebar-text">New chat</span>
          </a>
          <a
            href="#"
            id="clear-button"
            className="nav-link flex items-center p-3 mt-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            title="Clear current chat history."
            onClick={(e) => {
              e.preventDefault();
              onClear();
            }}
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="sidebar-text">Clear chat</span>
          </a>
          <a
            href="#"
            className="nav-link flex items-center p-3 mt-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
            title="Saved chats (coming soon)"
            onClick={(e) => e.preventDefault()}
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span className="sidebar-text">Saved chats</span>
          </a>
          <a
            href="#"
            className="nav-link flex items-center p-3 mt-2 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed"
            title="Account (coming soon)"
            onClick={(e) => e.preventDefault()}
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="sidebar-text">Account</span>
          </a>
          <a
            href="https://neve.digital/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link flex items-center p-3 mt-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            title="Presence Engine by Antiparty"
          >
            <svg
              className="h-5 w-5 sidebar-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="sidebar-text">About</span>
          </a>
        </nav>
      </div>
      <button className="user-profile flex items-center w-full text-left space-x-5 p-3 rounded-lg hover:bg-gray-100 cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="user-profile-info">
          <div className="text-sm font-medium">Wyatt Donnelly</div>
          <div className="text-xs text-gray-500">View Profile</div>
        </div>
      </button>
    </aside>
  );
}
