import React from "react";
import { getContactById } from "../data/dummyData";

function timeAgo(ts) {
  if (!ts) return "";
  const now = new Date();
  const diffMs = now - new Date(ts);
  const min = Math.floor(diffMs / 60000);
  // Show "now", "X min ago", or "h:mm AM/PM"
  if (min < 1) return "now";
  if (min < 60) return `${min}m ago`;
  const d = new Date(ts);
  const hour = d.getHours();
  const minsPad = `${d.getMinutes()}`.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minsPad} ${ampm}`;
}

// PUBLIC_INTERFACE
function ChatThreadList({
  chats,
  contacts,
  currentUserId,
  selectedChatId,
  onSelectChat,
  isMobile
}) {
  return (
    <aside className="chat-thread-list">
      <h3 className="threadlist-title">Chats</h3>
      <ul className="threadlist-ul">
        {chats.length === 0 ? (
          <li className="threadlist-empty">No chat threads.</li>
        ) : (
          chats
            .sort(
              (a, b) =>
                (b.lastMessageTime?.getTime?.() || 0) -
                (a.lastMessageTime?.getTime?.() || 0)
            )
            .map((chat) => {
              const contact = getContactById(contacts, chat.contactId);
              const lastMsg =
                chat.messages.length > 0
                  ? chat.messages[chat.messages.length - 1]
                  : null;
              return (
                <li
                  key={chat.id}
                  className={`threadlist-item ${
                    chat.id === selectedChatId ? "selected" : ""
                  }`}
                  onClick={() => onSelectChat(chat.id)}
                  tabIndex={0}
                  aria-label={
                    contact
                      ? `View chat with ${contact.displayName}`
                      : "Chat thread"
                  }
                >
                  <span
                    className="avatar"
                    style={
                      contact && contact.avatar
                        ? {
                            background: contact.avatar.bg,
                            color: "#fff",
                            marginRight: 12
                          }
                        : {}
                    }
                  >
                    {contact && contact.avatar.initials}
                  </span>
                  <span className="thread-content">
                    <span className="thread-title">
                      {contact ? contact.displayName : "Unknown"}
                      {chat.unreadCount > 0 && (
                        <span className="unread-dot" title="Unread messages" />
                      )}
                    </span>
                    <span className="thread-preview">
                      {lastMsg && (lastMsg.content.length > 24
                        ? lastMsg.content.slice(0, 24) + "…"
                        : lastMsg.content)}
                    </span>
                  </span>
                  <span className="thread-meta">
                    <span className="msg-time">
                      {lastMsg && timeAgo(lastMsg.timestamp)}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="unread-badge">{chat.unreadCount}</span>
                    )}
                  </span>
                </li>
              );
            })
        )}
      </ul>
    </aside>
  );
}

export default ChatThreadList;
