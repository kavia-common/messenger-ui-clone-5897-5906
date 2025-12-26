import React, { useState, useRef } from "react";

// PUBLIC_INTERFACE
function MessageComposer({ onSend, contact }) {
  const [value, setValue] = useState("");
  const inputRef = useRef();

  // Send handler
  const doSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
      inputRef.current?.focus();
    }
  };
  return (
    <div className="message-composer">
      <input
        ref={inputRef}
        className="composer-input"
        type="text"
        value={value}
        placeholder={
          contact && contact.displayName
            ? `Message ${contact.displayName}...`
            : "Type a message..."
        }
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") doSend();
        }}
        aria-label="Type a message"
      />
      <button
        className="send-btn"
        onClick={doSend}
        disabled={!value.trim()}
        aria-label="Send message"
        tabIndex={0}
      >
        Send
      </button>
    </div>
  );
}

export default MessageComposer;
