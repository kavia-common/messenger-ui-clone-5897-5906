import React from "react";

// PUBLIC_INTERFACE
function SidebarContacts({
  contacts,
  searchValue,
  onSearchChange,
  openChatWithContact,
  isMobile,
  selectedTab
}) {
  return (
    <div className="sidebar-contacts">
      <div className="sidebar-header">
        <h3>Contacts</h3>
        <input
          type="text"
          className="contact-search"
          placeholder="Search contacts"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search contacts"
        />
      </div>
      <ul className="contact-list">
        {contacts.length === 0 ? (
          <li className="contact-empty">No contacts found.</li>
        ) : (
          contacts.map((contact) => (
            <li
              key={contact.id}
              className="contact-list-item"
              onClick={() => openChatWithContact(contact.id)}
              tabIndex={0}
              aria-label={`Open chat with ${contact.displayName}`}
            >
              <span
                className="avatar"
                style={
                  contact.avatar.bg
                    ? {
                        background: contact.avatar.bg,
                        color: "#fff",
                        marginRight: 12
                      }
                    : {}
                }
              >
                {contact.avatar.initials}
              </span>
              <span className="contact-info">
                <span className="contact-name">{contact.displayName}</span>
                <span className="contact-status">{contact.status}</span>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default SidebarContacts;
