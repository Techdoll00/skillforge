/**
 * Lightweight app registry data - only IDs and names
 * This file can be imported without triggering heavy component loads
 * Used by stores that need basic app info during initialization
 */

export const appIds = [
  "finder",
  "internet-explorer",
  "chats",
  "textedit",
  "preview",
  "paint",
  "terminal",
  "applet-viewer",
  "control-panels",
  "admin",
  "stickies",
  "pc",
  "calendar",
  "contacts",
  "dashboard",
  "maps",
  "books",
  "calculator",
  "book-to-skill",
  "grill-me",
  "first-principles",
  "pre-mortem",
  "via-negativa",
  "hermes-agent",
  "daily-briefing",
  "agent-eval",
  "claude-code",
  "obsidian",
] as const;

export type AppId = (typeof appIds)[number];

const APP_ID_SET = new Set<string>(appIds);

export function resolveAppId(id: string): AppId | undefined {
  return APP_ID_SET.has(id) ? (id as AppId) : undefined;
}

/** Minimal app data for stores that don't need full registry */
export interface AppBasicInfo {
  id: AppId;
  name: string;
}

/** App ID to name mapping - matches appRegistry names exactly */
export const appNames: Record<AppId, string> = {
  "finder": "Finder",
  "internet-explorer": "Internet Explorer",
  "chats": "Chats",
  "textedit": "TextEdit",
  "preview": "Preview",
  "paint": "Paint",
  "terminal": "Terminal",
  "applet-viewer": "Applet Store",
  "control-panels": "Control Panels",
  "admin": "Admin",
  "stickies": "Stickies",
  pc: "Virtual PC",
  "calendar": "Calendar",
  "contacts": "Contacts",
  "dashboard": "Dashboard",
  "maps": "Maps",
  "books": "Books",
  "calculator": "Calculator",
  "book-to-skill": "Book to Skill",
  "grill-me": "Grill Me",
  "first-principles": "First Principles",
  "pre-mortem": "Pre-Mortem",
  "via-negativa": "Via Negativa",
  "hermes-agent": "Hermes Agent",
  "daily-briefing": "Daily Briefing",
  "agent-eval": "Agent Eval",
  "claude-code": "Claude Code",
  "obsidian": "Obsidian",
};

/** Get list of apps with basic info for stores */
export function getAppBasicInfoList(): AppBasicInfo[] {
  return appIds.map(id => ({ id, name: appNames[id] }));
}
