import { useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { CALCULATOR_HELP_I18N_KEYS } from "@/apps/calculator/helpKeys";
import { INTERNET_EXPLORER_HELP_I18N_KEYS } from "@/apps/internet-explorer/helpKeys";
import { MAPS_HELP_I18N_KEYS } from "@/apps/maps/helpKeys";
import type { AppId } from "@/utils/i18n";

export const APP_HELP_I18N_KEYS: Record<AppId, readonly string[]> = {
  finder: [
    "browseNavigate",
    "fileManagement",
    "quickAccess",
    "airdropSharing",
    "dropToImport",
    "trashUndo",
  ],
  "internet-explorer": [...INTERNET_EXPLORER_HELP_I18N_KEYS],
  chats: [
    "chatWithRyo",
    "createEditFiles",
    "controlApps",
    "joinChatRooms",
    "pushToTalk",
    "nudgeDjMode",
  ],
  textedit: [
    "slashCommands",
    "formatting",
    "listsTasks",
    "aiCoEditor",
    "voiceDictation",
    "fileManagement",
  ],
  preview: [
    "images",
    "pdfs",
    "zoom",
    "openFiles",
    "openWith",
    "safeHtml",
  ],
  paint: [
    "drawingTools",
    "strokeWidth",
    "patterns",
    "cutCopyPaste",
    "filters",
    "autoSaveExport",
  ],
  terminal: [
    "basicCommands",
    "navigation",
    "aiAssistant",
    "fileEditing",
    "commandHistory",
    "terminalSounds",
  ],
  "applet-viewer": [
    "appletStore",
    "createWithRyosChat",
    "viewApplets",
    "shareApplets",
    "openFromFinder",
    "keepUpdated",
  ],
  "control-panels": [
    "appearance",
    "shaderEffects",
    "sounds",
    "aiModel",
    "sync",
    "backupRestore",
  ],
  admin: [
    "adminAccess",
    "userManagement",
    "roomManagement",
    "songLibrary",
    "searchFilter",
    "statistics",
  ],
  stickies: [
    "createNote",
    "colors",
    "moveResize",
    "ryoCanEdit",
    "clearAll",
    "autoSave",
  ],
  pc: [
    "pcEmulator",
    "dosGames",
    "mouseCapture",
    "keyboardInput",
    "screenshotFullscreen",
    "backToSystems",
  ],
  calendar: [
    "navigateMonths",
    "createEvents",
    "todosSidebar",
    "icalImportExport",
    "ryoSchedules",
    "undoAutoSave",
  ],
  contacts: [
    "browseContacts",
    "createContacts",
    "importVCards",
    "smartGroups",
    "useWithRyo",
    "cloudSync",
  ],
  dashboard: [
    "openDashboard",
    "widgetLibrary",
    "weatherWidget",
    "moveWidgets",
    "layoutPersists",
    "closeDashboard",
  ],
  maps: [...MAPS_HELP_I18N_KEYS],
  books: [
    "bookshelf",
    "import",
    "pageTurn",
    "progress",
    "kosync",
    "fonts",
    "darkMode",
  ],
  calculator: [...CALCULATOR_HELP_I18N_KEYS],
  "book-to-skill": [],
  "grill-me": [],
  "first-principles": [],
  "pre-mortem": [],
  "via-negativa": [],
  "hermes-agent": [],
  "daily-briefing": [],
  "agent-eval": [],
  "claude-code": [],
  obsidian: [],
};

/**
 * Hook to get translated help items for an app
 * Merges translated text with original icons
 */
export function useTranslatedHelpItems<TIcon extends ReactNode = string>(
  appId: AppId,
  originalHelpItems: Array<{ icon: TIcon; title: string; description: string }>
) {
  const { t } = useTranslation();

  return useMemo(() => {
    const keys = APP_HELP_I18N_KEYS[appId] || [];
    return originalHelpItems.map((item, index) => {
      const key = keys[index];
      if (!key) return item; // Fallback to original if no key

      const titleKey = `apps.${appId}.help.${key}.title`;
      const descKey = `apps.${appId}.help.${key}.description`;

      return {
        icon: item.icon, // Keep original icon
        title: t(titleKey, { defaultValue: item.title }),
        description: t(descKey, { defaultValue: item.description }),
      };
    });
  }, [appId, originalHelpItems, t]);
}

