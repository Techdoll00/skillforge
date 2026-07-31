import type { AppId } from "@/config/appRegistry";

export const DEFAULT_SHORTCUT_ORDER: AppId[] = [
  "chats",
  "internet-explorer",
  "applet-viewer",
  "textedit",
  "paint",
  "calendar",
  "maps",
  "terminal",
  "pc",
  "dashboard",
];

export const getDesktopAppItemId = (appId: string) => `app:${appId}`;
export const getDesktopShortcutItemId = (path: string) => `shortcut:${path}`;
