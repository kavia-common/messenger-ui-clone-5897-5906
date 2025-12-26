import React, { useState } from "react";

// PUBLIC_INTERFACE
function RightPanelSettings({
  profile,
  onProfileUpdate,
  theme,
  setTheme,
  isMobile
}) {
  const [edit, setEdit] = useState(false);
  const [local, setLocal] = useState({
    displayName: profile.displayName,
    status: profile.status
  });

  // Commit edits
  const handleSave = () => {
    onProfileUpdate(local);
    setEdit(false);
  };

  return (
    <section className="rightpanel-settings">
      <h3>Profile &amp; Settings</h3>
      <div className="profile-avatar-wrap">
        <span
          className="avatar big"
          style={{
            background: profile.avatar?.bg || "#3b82f6",
            color: "#fff"
          }}
        >
          {profile.avatar.initials}
        </span>
      </div>
      {edit ? (
        <div className="profile-form">
          <input
            type="text"
            value={local.displayName}
            onChange={(e) =>
              setLocal((d) => ({ ...d, displayName: e.target.value }))
            }
            className="profile-input"
            aria-label="Your display name"
          />
          <input
            type="text"
            value={local.status}
            onChange={(e) =>
              setLocal((d) => ({ ...d, status: e.target.value }))
            }
            className="profile-input"
            aria-label="Your status"
          />
          <button className="profile-btn" onClick={handleSave}>
            Save
          </button>
          <button className="profile-btn secondary" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="profile-info-view">
            <span className="profile-name">{profile.displayName}</span>
            <span className="profile-status">{profile.status}</span>
          </div>
          <button className="profile-btn" onClick={() => setEdit(true)}>
            Edit Profile
          </button>
        </>
      )}
      <hr style={{ width: "100%", margin: "1.5em 0" }} />
      <div className="theme-section">
        <span>Theme: </span>
        <button
          className="profile-btn"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "Switch to 🌙 Dark mode" : "Switch to ☀️ Light mode"}
        </button>
      </div>
      <div className="app-info" style={{ marginTop: 24, fontSize: 12, color: "#64748b" }}>
        Messenger Lite UI, all data is local only.
      </div>
    </section>
  );
}

export default RightPanelSettings;
