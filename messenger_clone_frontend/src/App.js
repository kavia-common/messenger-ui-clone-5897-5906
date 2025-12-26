import React, { useState, useMemo } from "react";
import "./App.css";
import "./index.css";
import SidebarContacts from "./components/SidebarContacts";
import ChatThreadList from "./components/ChatThreadList";
import MessageView from "./components/MessageView";
import MessageComposer from "./components/MessageComposer";
import RightPanelSettings from "./components/RightPanelSettings";
import TopBar from "./components/TopBar";
import {
  generateDummyContacts,
  generateDummyChats,
  getInitialProfile,
} from "./data/dummyData";

// Core Messenger App
// PUBLIC_INTERFACE
function App() {
  // Dummy seeded data: contacts, chats, messages, user profile
  const [contacts] = useState(generateDummyContacts());
  const [chatsSeed] = useState(generateDummyChats(contacts));
  const [profile, setProfile] = useState(getInitialProfile());
  // in-memory mutable state for chats/messages
  const [chats, setChats] = useState(() => chatsSeed);
  const [selectedTab, setSelectedTab] = useState("chats"); // for mobile view
  const [selectedChatId, setSelectedChatId] = useState(
    chats.length > 0 ? chats[0].id : null
  );
  const [searchValue, setSearchValue] = useState("");
  const [theme, setTheme] = useState("light");

  // Responsive: is mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 900 // tweakable
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Handle sending a message (UI only)
  // PUBLIC_INTERFACE
  const handleSendMessage = (chatId, content) => {
    if (!content.trim()) return;
    setChats((prevChats) =>
      prevChats.map((ch) =>
        ch.id === chatId
          ? {
              ...ch,
              messages: [
                ...ch.messages,
                {
                  id: `msg-${Date.now()}`,
                  senderId: profile.id,
                  timestamp: new Date(),
                  content,
                  seen: false,
                },
              ],
              unreadCount: 0,
              lastMessageTime: new Date(),
            }
          : ch
      )
    );
  };

  // Mark all messages in chat as read (when chat is opened)
  // PUBLIC_INTERFACE
  const handleViewChat = (chatId) => {
    setSelectedChatId(chatId);
    setChats((prevChats) =>
      prevChats.map((ch) =>
        ch.id === chatId ? { ...ch, unreadCount: 0 } : ch
      )
    );
    // Switch to "chats" tab on mobile if not there
    if (isMobile) {
      setSelectedTab("chats");
    }
  };

  // Profile update (display name and status)
  // PUBLIC_INTERFACE
  const handleProfileUpdate = (fields) => {
    setProfile((p) => ({ ...p, ...fields }));
  };

  // Search
  // PUBLIC_INTERFACE
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  // Filter contacts and chats for search
  const filteredContacts = useMemo(() => {
    const val = searchValue.trim().toLowerCase();
    if (!val) return contacts;
    return contacts.filter(
      (u) =>
        u.displayName.toLowerCase().includes(val) ||
        u.status.toLowerCase().includes(val)
    );
  }, [contacts, searchValue]);
  const filteredChats = useMemo(() => {
    const val = searchValue.trim().toLowerCase();
    if (!val) return chats;
    return chats.filter((chat) => {
      // Find contact for chat
      const c = contacts.find((u) => u.id === chat.contactId);
      if (!c) return false;
      return (
        c.displayName.toLowerCase().includes(val) ||
        chat.messages.some((msg) =>
          msg.content.toLowerCase().includes(val)
        )
      );
    });
  }, [chats, contacts, searchValue]);

  // Find selected chat
  const selectedChat = chats.find((ch) => ch.id === selectedChatId);

  // UI Structure
  return (
    <div className="messenger-root">
      <TopBar
        isMobile={isMobile}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        theme={theme}
        setTheme={setTheme}
      />
      <div
        className={`messenger-layout ${
          isMobile ? "messenger-mobile" : "messenger-desktop"
        }`}
      >
        {/* Sidebar / Contacts */}
        <aside
          className={`sidebar-left ${
            isMobile ? (selectedTab === "contacts" ? "active" : "") : ""
          }`}
        >
          <SidebarContacts
            contacts={filteredContacts}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            openChatWithContact={(contactId) => {
              // Open the chat for the given contact, if exists; else create one
              let chat = chats.find((ch) => ch.contactId === contactId);
              if (!chat) {
                // Create new chat thread
                const newChat = {
                  id: `chat-${Date.now()}`,
                  contactId,
                  messages: [],
                  unreadCount: 0,
                  lastMessageTime: null,
                };
                setChats((prev) => [newChat, ...prev]);
                chat = newChat;
              }
              handleViewChat(chat.id);
              if (isMobile) setSelectedTab("chats");
            }}
            isMobile={isMobile}
            selectedTab={selectedTab}
          />
        </aside>
        {/* Main/center: chat thread and message view */}
        <main
          className={`main-center ${
            isMobile ? (selectedTab === "chats" ? "active" : "") : ""
          }`}
        >
          <ChatThreadList
            chats={filteredChats}
            contacts={contacts}
            currentUserId={profile.id}
            selectedChatId={selectedChatId}
            onSelectChat={handleViewChat}
            isMobile={isMobile}
          />
          {selectedChat ? (
            <>
              <MessageView
                messages={selectedChat.messages}
                contact={
                  contacts.find((u) => u.id === selectedChat.contactId) || {}
                }
                currentUserId={profile.id}
              />
              <MessageComposer
                onSend={(content) => handleSendMessage(selectedChat.id, content)}
                contact={
                  contacts.find((u) => u.id === selectedChat.contactId) || {}
                }
              />
            </>
          ) : (
            <div className="empty-chat-banner">
              Select a chat to start messaging!
            </div>
          )}
        </main>
        {/* Right panel: settings/profile */}
        <aside
          className={`sidebar-right ${
            isMobile ? (selectedTab === "settings" ? "active" : "") : ""
          }`}
        >
          <RightPanelSettings
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
            theme={theme}
            setTheme={setTheme}
            isMobile={isMobile}
          />
        </aside>
      </div>
    </div>
  );
}
export default App;
