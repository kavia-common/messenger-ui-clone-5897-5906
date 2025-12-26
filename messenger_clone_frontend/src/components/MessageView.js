import React, { useRef, useEffect } from "react";
import { initialsAvatar } from "../data/dummyData";

// PUBLIC_INTERFACE
function MessageView({ messages, contact, currentUserId }) {
  const scrollBottomRef = useRef();

  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <div className="message-view">
      {messages.length === 0 ? (
        <div className="empty-messages-banner">No messages yet.</div>
      ) : (
        messages.map((msg) => {
          const isMe = msg.senderId === currentUserId || msg.senderId === "me";
          const avatar = isMe
            ? null
            : contact.avatar || initialsAvatar(contact.displayName, 0);
          return (
            <div
              className={`msg-row ${isMe ? "from-me" : "from-them"}`}
              key={msg.id}
            >
              {!isMe && (
                <span
                  className="avatar msg-avatar"
                  style={
                    avatar
                      ? {
                          background: avatar.bg,
                          color: "#fff",
                          marginRight: 8
                        }
                      : {}
                  }
                >
                  {avatar && avatar.initials}
                </span>
              )}
              <span className="msg-bubble">
                {msg.content}
                <span className="msg-time-inside">
                  {formatMsgTime(msg.timestamp)}
                </span>
              </span>
              {isMe && <span className="avatar msg-spacer" />}
            </div>
          );
        })
      )}
      <div ref={scrollBottomRef} />
    </div>
  );
}

function formatMsgTime(ts) {
  if (!ts) return "";
  const d = new Date(ts);
  const hour = d.getHours();
  const minsPad = `${d.getMinutes()}`.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minsPad} ${ampm}`;
}

export default MessageView;
