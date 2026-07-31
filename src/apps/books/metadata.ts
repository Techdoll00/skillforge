export const helpItems = [
  {
    icon: "📚",
    title: "Your Bookshelf",
    description:
      "Imported EPUBs line the wooden shelf. Click a book to open and start reading.",
  },
  {
    icon: "📥",
    title: "Import EPUBs",
    description:
      "Use File ▸ Import to add .epub files. Books are saved to /Books and synced to the cloud.",
  },
  {
    icon: "📖",
    title: "Turn Pages",
    description:
      "Click the page edges, use the arrow keys, or swipe to flip through the book.",
  },
  {
    icon: "🔖",
    title: "Reading Progress",
    description:
      "Your place is saved automatically. Reopening Books resumes the book and page you left on, or the shelf if you closed it.",
  },
  {
    icon: "📱",
    title: "KOReader Sync",
    description:
      "Sync reading progress with KOReader on other devices. Sign in to Skillforge OS once, then in KOReader Progress Sync set the custom server to this host’s /api/kosync URL and use your Skillforge OS username and password (prefer filename document matching for EPUBs in /Books).",
  },
  {
    icon: "🅰️",
    title: "Fonts & Layout",
    description:
      "Pick a reading font (including Garamond), text size, and single or double columns from the View menu.",
  },
  {
    icon: "🌙",
    title: "Dark Mode",
    description:
      "The reader follows the system theme, or set a light, sepia, or dark page from View ▸ Theme.",
  },
];

export const appMetadata = {
  name: "Books",
  version: "1.0",
  creator: {
    name: "Kin (廖乃环)",
    url: "https://github.com/Techdoll00/skillforge",
  },
  github: "https://github.com/Techdoll00/skillforge",
  icon: "/icons/default/books.png",
};
