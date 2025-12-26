import React from "react";

// PUBLIC_INTERFACE
function TopBar({ isMobile, selectedTab, setSelectedTab, theme, setTheme }) {
  return (
    <header className="messenger-topbar">
      <div className="messenger-brand">
        <span role="img" aria-label="bolt" className="app-accent">
          ⚡
        </span>
        Messenger Lite
      </div>
      <div style={{ flex: 1 }} />
      {isMobile ? (
        <nav className="topbar-tabs">
          <button
            className={`tab-btn ${selectedTab === "contacts" ? "active" : ""}`}
            onClick={() => setSelectedTab("contacts")}
            aria-label="Contacts"
          >
            <span>Contacts</span>
          </button>
          <button
            className={`tab-btn ${selectedTab === "chats" ? "active" : ""}`}
            onClick={() => setSelectedTab("chats")}
            aria-label="Chats"
          >
            <span>Chats</span>
          </button>
          <button
            className={`tab-btn ${selectedTab === "settings" ? "active" : ""}`}
            onClick={() => setSelectedTab("settings")}
            aria-label="Settings"
          >
            <span>Settings</span>
          </button>
        </nav>
      ) : (
        <div className="desktop-spacer" />
      )}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        style={{ marginLeft: "16px" }}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

export default TopBar;
