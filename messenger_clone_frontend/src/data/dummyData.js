//
// Utility helpers to generate dummy data for Messenger-like UI
//
const AVATAR_COLORS = [
  "#3b82f6",
  "#06b6d4",
  "#f59e42",
  "#64748b",
  "#10b981",
  "#f43f5e",
  "#7c3aed"
];

// PUBLIC_INTERFACE
export function generateDummyContacts() {
  return [
    {
      id: "u1",
      displayName: "Aria Lane",
      status: "Online",
      avatar: initialsAvatar("Aria Lane", 0)
    },
    {
      id: "u2",
      displayName: "Leo Marsh",
      status: "Busy • Mobile",
      avatar: initialsAvatar("Leo Marsh", 1)
    },
    {
      id: "u3",
      displayName: "Michelle Joy",
      status: "At work",
      avatar: initialsAvatar("Michelle Joy", 2)
    },
    {
      id: "u4",
      displayName: "Sky Matthews",
      status: "Offline",
      avatar: initialsAvatar("Sky Matthews", 3)
    },
    {
      id: "u5",
      displayName: "Devon King",
      status: "Online",
      avatar: initialsAvatar("Devon King", 4)
    },
    {
      id: "u6",
      displayName: "Yara Lin",
      status: "Online",
      avatar: initialsAvatar("Yara Lin", 5)
    }
    // Add more if desired
  ];
}

// PUBLIC_INTERFACE
export function generateDummyChats(contacts) {
  // For demo, create threads for 3 contacts each with varying last message, unread count, and timestamps
  return [
    {
      id: "chat-1",
      contactId: "u1",
      unreadCount: 2,
      lastMessageTime: minusMinutes(3),
      messages: [
        {
          id: "msg-1",
          senderId: "u1",
          content: "Hey there! How are you? 😊",
          seen: true,
          timestamp: minusMinutes(27)
        },
        {
          id: "msg-2",
          senderId: "me",
          content: "I'm great, thanks! How about you?",
          seen: true,
          timestamp: minusMinutes(25)
        },
        {
          id: "msg-3",
          senderId: "u1",
          content: "Almost off work! 🏃‍♂️",
          seen: false,
          timestamp: minusMinutes(3)
        }
      ]
    },
    {
      id: "chat-2",
      contactId: "u2",
      unreadCount: 0,
      lastMessageTime: minusMinutes(70),
      messages: [
        {
          id: "msg-4",
          senderId: "u2",
          content: "Let's meet at 6?",
          seen: true,
          timestamp: minusMinutes(80)
        },
        {
          id: "msg-5",
          senderId: "me",
          content: "Works for me!",
          seen: true,
          timestamp: minusMinutes(70)
        }
      ]
    },
    {
      id: "chat-3",
      contactId: "u3",
      unreadCount: 1,
      lastMessageTime: minusMinutes(1),
      messages: [
        {
          id: "msg-6",
          senderId: "u3",
          content: "Sent the doc to your inbox.",
          seen: false,
          timestamp: minusMinutes(1)
        }
      ]
    }
  ];
};
// PUBLIC_INTERFACE
export function getInitialProfile() {
  return {
    id: "me",
    displayName: "You",
    status: "Available",
    avatar: initialsAvatar("You", 6)
  };
}

// Helpers
function minusMinutes(num) {
  const d = new Date();
  d.setMinutes(d.getMinutes() - num);
  return new Date(d);
}

// Generates a renderable fallback avatar with color
// PUBLIC_INTERFACE
export function initialsAvatar(name, colorIdx) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const bg = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length];
  return { initials, bg };
}

// PUBLIC_INTERFACE
export function getContactById(contacts, id) {
  return contacts.find((c) => c.id === id);
}
