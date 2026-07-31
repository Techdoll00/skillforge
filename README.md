# Skillforge OS — A desktop-style agent skill browser

A web-based desktop operating system for browsing, installing, and running **agent skills** — forked from [ryOS](https://github.com/ryokun6/ryos). Double-click a skill on the desktop to open its window, copy the one-line install command, and download the skill as a Markdown file.

Built with React, TypeScript, and Tailwind, reimagining classic Mac OS and Windows. Works on desktop, tablet, and mobile.

**Author**: Kin (廖乃环) · [GitHub](https://github.com/Techdoll00) · live demo at `http://101.35.254.22:8080/`

## Why Skillforge OS?

Instead of yet another command-line skill manager, Skillforge OS presents agent skills as **desktop applications**. Each skill lives in a themed window with two actions:

- **[Copy Install Cmd]** — copies `hermes skill install Techdoll00/skillforge --skill <skill-name>`
- **[Download .md]** — downloads `/skills/<skill-name>.md`

## Screenshots

The 10 built-in skill apps ship as desktop applications:

| | | |
|---|---|---|
| ![Book to Skill](public/icons/default/book-to-skill.svg) | ![Grill Me](public/icons/default/grill-me.svg) | ![First Principles](public/icons/default/first-principles.svg) |
| ![Pre-Mortem](public/icons/default/pre-mortem.svg) | ![Via Negativa](public/icons/default/via-negativa.svg) | ![Hermes Agent](public/icons/default/hermes-agent.svg) |
| ![Daily Briefing](public/icons/default/daily-briefing.svg) | ![Agent Eval](public/icons/default/agent-eval.svg) | ![Claude Code](public/icons/default/claude-code.svg) |
| ![Obsidian](public/icons/default/obsidian.svg) | | |

## Features

### Desktop Environment

- Authentic macOS and Windows-style desktop interactions
- Multi-instance window manager with drag, resize, and minimize
- Customizable wallpapers (photos, patterns, or videos)
- Virtual file system with local storage persistence and backup/restore
- Desktop footer tagline for the curated skill collection

### Themes

- **System 7** — Classic Mac OS look with top menubar and traffic-light controls *(default)*
- **Aqua** — Mac OS X style with modern aesthetics
- **Windows XP** — Bottom taskbar, Start menu, and classic window controls
- **Windows 98** — Retro Windows experience with mobile-safe controls

### Agent Skill Apps

- **Book to Skill** — Turn any book into a reusable agent skill
- **Grill Me** — Relentlessly stress-test your plan or design
- **First Principles** — Reason from fundamental truths, not analogies
- **Pre-Mortem** — Assume your plan already failed — find out why
- **Via Negativa** — Improve systems by subtracting, not adding
- **Hermes Agent** — A drop-in agent that runs your installed skills
- **Daily Briefing** — A morning briefing synthesized from your sources
- **Agent Eval** — Score and compare agent runs against rubrics
- **Claude Code** — Claude Code integration conventions and hooks
- **Obsidian** — Search and manage notes in an Obsidian vault

### Built-in Applications

- **Finder** — File manager with Quick Access, storage info, and smart file detection
- **TextEdit** — Rich text editor with markdown, slash commands, and multi-window support
- **MacPaint** — Bitmap graphics editor with drawing tools, patterns, and import/export
- **Internet Explorer** — Time Machine that explores web history via Wayback Machine; AI generates sites for years before 1996 or in the future
- **Chats** — AI chat, public/private chat rooms, voice messages, and tool calling
- **Control Panels** — System preferences: appearance, sounds, backup/restore, and file system management
- **Virtual PC** — DOS emulator for classic games (Doom, SimCity, etc.)
- **Terminal** — Unix-like CLI with AI integration
- **Calendar** — iCal-style events, todos, and sync
- **Contacts** — Address book with vCard import and sync
- **Dashboard** — Tiger-style widgets for weather, stocks, translation, dictionary, aquarium, and more
- **Maps** — Apple MapKit place search with chat integration
- **Books** — EPUB reader with synced reading progress and Finder import
- **Calculator** — Theme-aware calculator with basic, scientific, and conversion modes
- **Admin** — Restricted analytics and system administration
- **Applet Store** — Browse, install, and share community-created HTML applets
- **Stickies** — Sticky notes for quick reminders

## Installation

### Prerequisites

- [Bun](https://bun.sh) 1.3.5+ (or Node.js 20+ with npm)

### Clone and run

```bash
git clone https://github.com/Techdoll00/skillforge.git
cd skillforge
bun install
bun run dev
```

Open `http://localhost:5173` and double-click any skill app on the desktop.

For frontend-only development (no API backend):

```bash
bun run dev:vite
```

## Quick Start

1. Double-click a skill app on the Desktop to open its window
2. Click **Copy Install Cmd** to grab the `hermes skill install` command
3. Click **Download .md** to save the skill as a Markdown file
4. Launch other apps from the Finder, Desktop, or Apple/Start menu
5. Files auto-save to browser storage

## Project Structure

```
├── api/              # API route handlers (Node-style, served by the standalone Bun server)
├── electron/         # Electron shell, menu, preload, and updater
├── public/           # Static assets (icons, wallpapers, sounds, fonts, skills/)
├── scripts/          # Build + maintenance + standalone API runner
├── tests/            # Bun test suites (unit/<domain>, integration/api, helpers)
├── src/
│   ├── api/          # Frontend API clients
│   ├── apps/         # Individual app modules (including the 10 skill apps)
│   ├── components/   # Shared React components (ui, dialogs, layout)
│   ├── config/       # App registry and configuration
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Libraries and utilities
│   ├── services/     # VFS and realtime service facades
│   ├── shared/       # Shared contracts and domain types
│   ├── stores/       # Zustand state management
│   ├── styles/       # CSS and styling
│   ├── sync/         # Cloud Sync v2 client engine
│   ├── themes/       # OS theme definitions
│   ├── types/        # TypeScript definitions
│   ├── utils/        # Utilities
│   └── workers/      # Web workers
```

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Motion
- **Audio:** Tone.js, WaveSurfer.js
- **3D:** Three.js (shaders)
- **Text Editor:** TipTap
- **State:** Zustand
- **Storage:** IndexedDB, LocalStorage, Redis (Upstash REST or `REDIS_URL`)
- **AI:** OpenAI, Anthropic, Google via Vercel AI SDK
- **Real-time:** Pusher or local WebSocket
- **API Runtime:** Standalone Bun server (Node-style handlers)
- **Build:** Vite, Bun
- **Desktop:** Electron + electron-updater
- **Deployment:** Docker/GHCR + Coolify, Electron desktop releases

## Scripts

```bash
bun run dev          # Start full stack (API + Vite with proxy) — the default
bun run dev:vite     # Start Vite dev server only (frontend-only, no API)
bun run dev:api      # Start standalone Bun API server only (port 3000)
bun run build        # Build for production
bun run start        # Start the self-host/Coolify production server
bun run lint         # Run ESLint
bun run typecheck    # Run TypeScript type checking
bun run preview      # Preview production build
```

## Self-hosting

Skillforge OS supports a **single Bun production server** for self-hosting and container platforms like Coolify:

```bash
bun install
bun run build
APP_PUBLIC_ORIGIN="https://your-domain.com" \
API_ALLOWED_ORIGINS="https://your-domain.com" \
bun run start
```

Redis backend: set `REDIS_URL` (Redis/Valkey) or `REDIS_KV_REST_API_URL` + `REDIS_KV_REST_API_TOKEN` (Upstash REST). Realtime: `REALTIME_PROVIDER="pusher"` or `"local"` (best paired with `REDIS_URL`).

## Contributing

Contributions welcome! Please submit a Pull Request.

## License

AGPL-3.0 — See [LICENSE](LICENSE) for details.
