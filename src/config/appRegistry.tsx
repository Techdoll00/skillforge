import { resolveAppId, type AppId } from "./appRegistryData";
import type {
  BaseApp,
  ControlPanelsInitialData,
  FinderInitialData,
  InternetExplorerInitialData,
  PaintInitialData,
  PreviewInitialData,
  BooksInitialData,
} from "@/apps/base/types";
import type { AppletViewerInitialData } from "@/apps/applet-viewer";
import { createLazyComponent } from "./lazyAppComponent";

export type { AppId };

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowConstraints {
  minSize?: WindowSize;
  maxSize?: WindowSize;
  defaultSize: WindowSize;
  mobileDefaultSize?: WindowSize;
  /** If true, mobile height will be set to window.innerWidth (square) */
  mobileSquare?: boolean;
}

// Default window constraints for any app not specified
const defaultWindowConstraints: WindowConstraints = {
  defaultSize: { width: 730, height: 475 },
  minSize: { width: 300, height: 200 },
};

// ============================================================================
// LAZY-LOADED APP COMPONENTS
// ============================================================================

// Lazy-loaded apps (loaded on-demand when opened)
// Each uses a cache key to maintain stable references across HMR
const LazyFinderApp = createLazyComponent<FinderInitialData>(
  () => import("@/apps/finder/components/finder-app/FinderAppComponent").then(m => ({ default: m.FinderAppComponent })),
  "finder"
);

const LazyTextEditApp = createLazyComponent<unknown>(
  () => import("@/apps/textedit/components/TextEditAppComponent").then(m => ({ default: m.TextEditAppComponent })),
  "textedit"
);

const LazyInternetExplorerApp = createLazyComponent<InternetExplorerInitialData>(
  () => import("@/apps/internet-explorer/components/internet-explorer-app/InternetExplorerAppComponent").then(m => ({ default: m.InternetExplorerAppComponent })),
  "internet-explorer"
);

const LazyChatsApp = createLazyComponent<unknown>(
  () => import("@/apps/chats/components/chats-app/ChatsAppComponent").then(m => ({ default: m.ChatsAppComponent })),
  "chats"
);

const LazyControlPanelsApp = createLazyComponent<ControlPanelsInitialData>(
  () => import("@/apps/control-panels/components/control-panels-app/ControlPanelsAppComponent").then(m => ({ default: m.ControlPanelsAppComponent })),
  "control-panels"
);

const LazyPaintApp = createLazyComponent<PaintInitialData>(
  () => import("@/apps/paint/components/PaintAppComponent").then(m => ({ default: m.PaintAppComponent })),
  "paint"
);

const LazyPreviewApp = createLazyComponent<PreviewInitialData>(
  () => import("@/apps/preview/components/PreviewAppComponent").then(m => ({ default: m.PreviewAppComponent })),
  "preview"
);

const LazyTerminalApp = createLazyComponent<unknown>(
  () => import("@/apps/terminal/components/TerminalAppComponent").then(m => ({ default: m.TerminalAppComponent })),
  "terminal"
);

const LazyAppletViewerApp = createLazyComponent<AppletViewerInitialData>(
  () => import("@/apps/applet-viewer/components/AppletViewerAppComponent").then(m => ({ default: m.AppletViewerAppComponent })),
  "applet-viewer"
);

const LazyPcApp = createLazyComponent<unknown>(
  () => import("@/apps/pc/components/InfinitePcAppComponent").then(m => ({ default: m.InfinitePcAppComponent })),
  "pc"
);

const LazyAdminApp = createLazyComponent<unknown>(
  () => import("@/apps/admin/components/admin-app/AdminAppComponent").then(m => ({ default: m.AdminAppComponent })),
  "admin"
);

const LazyStickiesApp = createLazyComponent<unknown>(
  () => import("@/apps/stickies/components/StickiesAppComponent").then(m => ({ default: m.StickiesAppComponent })),
  "stickies"
);

const LazyCalendarApp = createLazyComponent<unknown>(
  () => import("@/apps/calendar/components/calendar-app/CalendarAppComponent").then(m => ({ default: m.CalendarAppComponent })),
  "calendar"
);

const LazyContactsApp = createLazyComponent<unknown>(
  () => import("@/apps/contacts/components/contacts-app/ContactsAppComponent").then(m => ({ default: m.ContactsAppComponent })),
  "contacts"
);

const LazyDashboardApp = createLazyComponent<unknown>(
  () => import("@/apps/dashboard/components/DashboardAppComponent").then(m => ({ default: m.DashboardAppComponent })),
  "dashboard"
);

const LazyMapsApp = createLazyComponent<unknown>(
  () => import("@/apps/maps/components/maps-app/MapsAppComponent").then(m => ({ default: m.MapsAppComponent })),
  "maps"
);

const LazyBooksApp = createLazyComponent<BooksInitialData>(
  () => import("@/apps/books/components/books-app/BooksAppComponent").then(m => ({ default: m.BooksAppComponent })),
  "books"
);

const LazyCalculatorApp = createLazyComponent<unknown>(
  () => import("@/apps/calculator/components/CalculatorAppComponent").then(m => ({ default: m.CalculatorAppComponent })),
  "calculator"
);

const LazyBookToSkillApp = createLazyComponent<unknown>(
  () => import("@/apps/book-to-skill/components/BookToSkillAppComponent").then(m => ({ default: m.BookToSkillAppComponent })),
  "book-to-skill"
);

const LazyGrillMeApp = createLazyComponent<unknown>(
  () => import("@/apps/grill-me/components/GrillMeAppComponent").then(m => ({ default: m.GrillMeAppComponent })),
  "grill-me"
);

const LazyFirstPrinciplesApp = createLazyComponent<unknown>(
  () => import("@/apps/first-principles/components/FirstPrinciplesAppComponent").then(m => ({ default: m.FirstPrinciplesAppComponent })),
  "first-principles"
);

const LazyPreMortemApp = createLazyComponent<unknown>(
  () => import("@/apps/pre-mortem/components/PreMortemAppComponent").then(m => ({ default: m.PreMortemAppComponent })),
  "pre-mortem"
);

const LazyViaNegativaApp = createLazyComponent<unknown>(
  () => import("@/apps/via-negativa/components/ViaNegativaAppComponent").then(m => ({ default: m.ViaNegativaAppComponent })),
  "via-negativa"
);

const LazyHermesAgentApp = createLazyComponent<unknown>(
  () => import("@/apps/hermes-agent/components/HermesAgentAppComponent").then(m => ({ default: m.HermesAgentAppComponent })),
  "hermes-agent"
);

const LazyDailyBriefingApp = createLazyComponent<unknown>(
  () => import("@/apps/daily-briefing/components/DailyBriefingAppComponent").then(m => ({ default: m.DailyBriefingAppComponent })),
  "daily-briefing"
);

const LazyAgentEvalApp = createLazyComponent<unknown>(
  () => import("@/apps/agent-eval/components/AgentEvalAppComponent").then(m => ({ default: m.AgentEvalAppComponent })),
  "agent-eval"
);

const LazyClaudeCodeApp = createLazyComponent<unknown>(
  () => import("@/apps/claude-code/components/ClaudeCodeAppComponent").then(m => ({ default: m.ClaudeCodeAppComponent })),
  "claude-code"
);

const LazyObsidianApp = createLazyComponent<unknown>(
  () => import("@/apps/obsidian/components/ObsidianAppComponent").then(m => ({ default: m.ObsidianAppComponent })),
  "obsidian"
);

// ============================================================================
// APP METADATA (loaded eagerly - small, isolated from components)
// Import from metadata.ts files to avoid eager loading of components
// ============================================================================

import { appMetadata as finderMetadata, helpItems as finderHelpItems } from "@/apps/finder/metadata";
import { appMetadata as internetExplorerMetadata, helpItems as internetExplorerHelpItems } from "@/apps/internet-explorer/metadata";
import { appMetadata as chatsMetadata, helpItems as chatsHelpItems } from "@/apps/chats/metadata";
import { appMetadata as texteditMetadata, helpItems as texteditHelpItems } from "@/apps/textedit/metadata";
import { appMetadata as paintMetadata, helpItems as paintHelpItems } from "@/apps/paint";
import { appMetadata as previewMetadata, helpItems as previewHelpItems } from "@/apps/preview/metadata";
import { appMetadata as terminalMetadata, helpItems as terminalHelpItems } from "@/apps/terminal";
import { appMetadata as appletViewerMetadata, helpItems as appletViewerHelpItems } from "@/apps/applet-viewer";
import { appMetadata as controlPanelsMetadata, helpItems as controlPanelsHelpItems } from "@/apps/control-panels";
import { appMetadata as adminMetadata, helpItems as adminHelpItems } from "@/apps/admin/metadata";
import { appMetadata as stickiesMetadata, helpItems as stickiesHelpItems } from "@/apps/stickies";
import {
  appMetadata as pcMetadata,
  helpItems as pcHelpItems,
} from "@/apps/pc/metadata";
import { appMetadata as calendarMetadata, helpItems as calendarHelpItems } from "@/apps/calendar/metadata";
import { appMetadata as contactsMetadata, helpItems as contactsHelpItems } from "@/apps/contacts";
import { appMetadata as dashboardMetadata, helpItems as dashboardHelpItems } from "@/apps/dashboard/metadata";
import { appMetadata as mapsMetadata, helpItems as mapsHelpItems } from "@/apps/maps";
import { appMetadata as booksMetadata, helpItems as booksHelpItems } from "@/apps/books/metadata";
import { appMetadata as calculatorMetadata, helpItems as calculatorHelpItems } from "@/apps/calculator/metadata";
import {
  appMetadata as bookToSkillMetadata,
  helpItems as bookToSkillHelpItems,
} from "@/apps/book-to-skill/metadata";
import {
  appMetadata as grillMeMetadata,
  helpItems as grillMeHelpItems,
} from "@/apps/grill-me/metadata";
import {
  appMetadata as firstPrinciplesMetadata,
  helpItems as firstPrinciplesHelpItems,
} from "@/apps/first-principles/metadata";
import {
  appMetadata as preMortemMetadata,
  helpItems as preMortemHelpItems,
} from "@/apps/pre-mortem/metadata";
import {
  appMetadata as viaNegativaMetadata,
  helpItems as viaNegativaHelpItems,
} from "@/apps/via-negativa/metadata";
import {
  appMetadata as hermesAgentMetadata,
  helpItems as hermesAgentHelpItems,
} from "@/apps/hermes-agent/metadata";
import {
  appMetadata as dailyBriefingMetadata,
  helpItems as dailyBriefingHelpItems,
} from "@/apps/daily-briefing/metadata";
import {
  appMetadata as agentEvalMetadata,
  helpItems as agentEvalHelpItems,
} from "@/apps/agent-eval/metadata";
import {
  appMetadata as claudeCodeMetadata,
  helpItems as claudeCodeHelpItems,
} from "@/apps/claude-code/metadata";
import {
  appMetadata as obsidianMetadata,
  helpItems as obsidianHelpItems,
} from "@/apps/obsidian/metadata";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as pcDefaultSize } from "@/apps/pc/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as bookToSkillDefaultSize } from "@/apps/book-to-skill/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as grillMeDefaultSize } from "@/apps/grill-me/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as firstPrinciplesDefaultSize } from "@/apps/first-principles/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as preMortemDefaultSize } from "@/apps/pre-mortem/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as viaNegativaDefaultSize } from "@/apps/via-negativa/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as hermesAgentDefaultSize } from "@/apps/hermes-agent/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as dailyBriefingDefaultSize } from "@/apps/daily-briefing/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as agentEvalDefaultSize } from "@/apps/agent-eval/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as claudeCodeDefaultSize } from "@/apps/claude-code/windowConfig";
import { DEFAULT_WINDOW_SIZE_WITH_TITLEBAR as obsidianDefaultSize } from "@/apps/obsidian/windowConfig";

// ============================================================================
// APP REGISTRY
// ============================================================================

// Registry of all available apps with their window configurations
export const appRegistry = {
  ["finder"]: {
    id: "finder",
    name: "Finder",
    icon: { type: "image", src: "/icons/mac.png" },
    description: "Browse and manage files",
    component: LazyFinderApp,
    helpItems: finderHelpItems,
    metadata: finderMetadata,
    windowConfig: {
      defaultSize: { width: 680, height: 400 },
      minSize: { width: 300, height: 200 },
    } as WindowConstraints,
  },
  ["internet-explorer"]: {
    id: "internet-explorer",
    name: "Internet Explorer",
    icon: { type: "image", src: internetExplorerMetadata.icon },
    description: "Browse the web",
    component: LazyInternetExplorerApp,
    helpItems: internetExplorerHelpItems,
    metadata: internetExplorerMetadata,
    windowConfig: {
      defaultSize: { width: 730, height: 600 },
      minSize: { width: 400, height: 300 },
    } as WindowConstraints,
  } as BaseApp<InternetExplorerInitialData> & { windowConfig: WindowConstraints },
  ["chats"]: {
    id: "chats",
    name: "Chats",
    icon: { type: "image", src: chatsMetadata.icon },
    description: "Chat with AI",
    component: LazyChatsApp,
    helpItems: chatsHelpItems,
    metadata: chatsMetadata,
    windowConfig: {
      defaultSize: { width: 560, height: 360 },
      minSize: { width: 300, height: 320 },
    } as WindowConstraints,
  },
  ["textedit"]: {
    id: "textedit",
    name: "TextEdit",
    icon: { type: "image", src: texteditMetadata.icon },
    description: "A simple rich text editor",
    component: LazyTextEditApp,
    helpItems: texteditHelpItems,
    metadata: texteditMetadata,
    windowConfig: {
      defaultSize: { width: 430, height: 475 },
      minSize: { width: 430, height: 200 },
    } as WindowConstraints,
  },
  ["preview"]: {
    id: "preview",
    name: "Preview",
    icon: { type: "image", src: previewMetadata.icon },
    description: "View images, PDFs, and documents",
    component: LazyPreviewApp,
    helpItems: previewHelpItems,
    metadata: previewMetadata,
    windowConfig: {
      defaultSize: { width: 760, height: 560 },
      minSize: { width: 420, height: 320 },
    } as WindowConstraints,
  } as BaseApp<PreviewInitialData> & { windowConfig: WindowConstraints },
  ["paint"]: {
    id: "paint",
    name: "Paint",
    icon: { type: "image", src: paintMetadata.icon },
    description: "Draw and edit images",
    component: LazyPaintApp,
    helpItems: paintHelpItems,
    metadata: paintMetadata,
    windowConfig: {
      defaultSize: { width: 713, height: 480 },
      minSize: { width: 400, height: 400 },
      maxSize: { width: 713, height: 535 },
    } as WindowConstraints,
  } as BaseApp<PaintInitialData> & { windowConfig: WindowConstraints },
  ["terminal"]: {
    id: "terminal",
    name: "Terminal",
    icon: { type: "image", src: terminalMetadata!.icon },
    description: "Command line interface",
    component: LazyTerminalApp,
    helpItems: terminalHelpItems,
    metadata: terminalMetadata,
    windowConfig: {
      defaultSize: { width: 600, height: 400 },
      minSize: { width: 400, height: 300 },
    } as WindowConstraints,
  },
  ["applet-viewer"]: {
    id: "applet-viewer",
    name: "Applet Store",
    icon: { type: "image", src: appletViewerMetadata.icon },
    description: "View and run applets",
    component: LazyAppletViewerApp,
    helpItems: appletViewerHelpItems,
    metadata: appletViewerMetadata,
    windowConfig: {
      defaultSize: { width: 320, height: 450 },
      minSize: { width: 300, height: 200 },
    } as WindowConstraints,
  } as BaseApp<AppletViewerInitialData> & { windowConfig: WindowConstraints },
  ["control-panels"]: {
    id: "control-panels",
    name: "Control Panels",
    icon: { type: "image", src: controlPanelsMetadata.icon },
    description: "System settings",
    component: LazyControlPanelsApp,
    helpItems: controlPanelsHelpItems,
    metadata: controlPanelsMetadata,
    windowConfig: {
      defaultSize: { width: 400, height: 415 },
      minSize: { width: 400, height: 415 },
      maxSize: { width: 560, height: 600 },
    } as WindowConstraints,
  } as BaseApp<ControlPanelsInitialData> & { windowConfig: WindowConstraints },
  ["admin"]: {
    id: "admin",
    name: "Admin",
    icon: { type: "image", src: adminMetadata.icon },
    description: "System administration panel",
    component: LazyAdminApp,
    helpItems: adminHelpItems,
    metadata: adminMetadata,
    adminOnly: true, // Only visible to admin user (kin)
    windowConfig: {
      defaultSize: { width: 800, height: 500 },
      minSize: { width: 600, height: 400 },
    } as WindowConstraints,
  },
  ["stickies"]: {
    id: "stickies",
    name: "Stickies",
    icon: { type: "image", src: stickiesMetadata.icon },
    description: "Sticky notes for quick reminders",
    component: LazyStickiesApp,
    helpItems: stickiesHelpItems,
    metadata: stickiesMetadata,
    windowConfig: {
      defaultSize: { width: 500, height: 400 },
      minSize: { width: 300, height: 250 },
    } as WindowConstraints,
  },
  ["pc"]: {
    id: "pc",
    name: "Virtual PC",
    icon: { type: "image", src: pcMetadata.icon },
    description: "x86 OS emulation and DOS games",
    component: LazyPcApp,
    helpItems: pcHelpItems,
    metadata: pcMetadata,
    windowConfig: {
      defaultSize: pcDefaultSize,
      minSize: { width: 640, height: 400 },
      maxSize: { width: 1280, height: 1024 },
    } as WindowConstraints,
  },
  ["calendar"]: {
    id: "calendar",
    name: "Calendar",
    icon: { type: "image", src: calendarMetadata.icon },
    description: "Calendar with events",
    component: LazyCalendarApp,
    helpItems: calendarHelpItems,
    metadata: calendarMetadata,
    windowConfig: {
      defaultSize: { width: 700, height: 520 },
      minSize: { width: 300, height: 380 },
    } as WindowConstraints,
  },
  ["contacts"]: {
    id: "contacts",
    name: "Contacts",
    icon: { type: "image", src: contactsMetadata.icon },
    description: "Address book with vCard import",
    component: LazyContactsApp,
    helpItems: contactsHelpItems,
    metadata: contactsMetadata,
    windowConfig: {
      defaultSize: { width: 820, height: 560 },
      minSize: { width: 360, height: 420 },
    } as WindowConstraints,
  },
  ["dashboard"]: {
    id: "dashboard",
    name: "Dashboard",
    icon: { type: "image", src: dashboardMetadata.icon },
    description: "Widget dashboard overlay",
    component: LazyDashboardApp,
    helpItems: dashboardHelpItems,
    metadata: dashboardMetadata,
    windowConfig: {
      defaultSize: { width: 500, height: 400 },
      minSize: { width: 300, height: 250 },
    } as WindowConstraints,
  },
  ["maps"]: {
    id: "maps",
    name: "Maps",
    icon: { type: "image", src: mapsMetadata.icon },
    description: "Find places with Apple Maps",
    component: LazyMapsApp,
    helpItems: mapsHelpItems,
    metadata: mapsMetadata,
    windowConfig: {
      defaultSize: { width: 560, height: 560 },
      minSize: { width: 400, height: 300 },
    } as WindowConstraints,
  },
  ["books"]: {
    id: "books",
    name: "Books",
    icon: { type: "image", src: booksMetadata.icon },
    description: "Read EPUB books",
    component: LazyBooksApp,
    helpItems: booksHelpItems,
    metadata: booksMetadata,
    windowConfig: {
      defaultSize: { width: 720, height: 560 },
      minSize: { width: 420, height: 360 },
    } as WindowConstraints,
  } as BaseApp<BooksInitialData> & { windowConfig: WindowConstraints },
  ["calculator"]: {
    id: "calculator",
    name: "Calculator",
    icon: { type: "image", src: calculatorMetadata.icon },
    description: "Basic, scientific, and unit conversion calculator",
    component: LazyCalculatorApp,
    helpItems: calculatorHelpItems,
    metadata: calculatorMetadata,
    windowConfig: {
      defaultSize: { width: 240, height: 360 },
      minSize: { width: 240, height: 360 },
      maxSize: { width: 320, height: 520 },
    } as WindowConstraints,
  },
  ["book-to-skill"]: {
    id: "book-to-skill",
    name: "Book to Skill",
    icon: { type: "image", src: bookToSkillMetadata.icon },
    description: "Turn any book into a reusable agent skill",
    component: LazyBookToSkillApp,
    helpItems: bookToSkillHelpItems,
    metadata: bookToSkillMetadata,
    windowConfig: {
      defaultSize: bookToSkillDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["grill-me"]: {
    id: "grill-me",
    name: "Grill Me",
    icon: { type: "image", src: grillMeMetadata.icon },
    description: "Relentlessly stress-test your plan or design",
    component: LazyGrillMeApp,
    helpItems: grillMeHelpItems,
    metadata: grillMeMetadata,
    windowConfig: {
      defaultSize: grillMeDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["first-principles"]: {
    id: "first-principles",
    name: "First Principles",
    icon: { type: "image", src: firstPrinciplesMetadata.icon },
    description: "Reason from fundamental truths, not analogies",
    component: LazyFirstPrinciplesApp,
    helpItems: firstPrinciplesHelpItems,
    metadata: firstPrinciplesMetadata,
    windowConfig: {
      defaultSize: firstPrinciplesDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["pre-mortem"]: {
    id: "pre-mortem",
    name: "Pre-Mortem",
    icon: { type: "image", src: preMortemMetadata.icon },
    description: "Assume your plan already failed — find out why",
    component: LazyPreMortemApp,
    helpItems: preMortemHelpItems,
    metadata: preMortemMetadata,
    windowConfig: {
      defaultSize: preMortemDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["via-negativa"]: {
    id: "via-negativa",
    name: "Via Negativa",
    icon: { type: "image", src: viaNegativaMetadata.icon },
    description: "Improve systems by subtracting, not adding",
    component: LazyViaNegativaApp,
    helpItems: viaNegativaHelpItems,
    metadata: viaNegativaMetadata,
    windowConfig: {
      defaultSize: viaNegativaDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["hermes-agent"]: {
    id: "hermes-agent",
    name: "Hermes Agent",
    icon: { type: "image", src: hermesAgentMetadata.icon },
    description: "A drop-in agent that runs your installed skills",
    component: LazyHermesAgentApp,
    helpItems: hermesAgentHelpItems,
    metadata: hermesAgentMetadata,
    windowConfig: {
      defaultSize: hermesAgentDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["daily-briefing"]: {
    id: "daily-briefing",
    name: "Daily Briefing",
    icon: { type: "image", src: dailyBriefingMetadata.icon },
    description: "A morning briefing synthesized from your sources",
    component: LazyDailyBriefingApp,
    helpItems: dailyBriefingHelpItems,
    metadata: dailyBriefingMetadata,
    windowConfig: {
      defaultSize: dailyBriefingDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["agent-eval"]: {
    id: "agent-eval",
    name: "Agent Eval",
    icon: { type: "image", src: agentEvalMetadata.icon },
    description: "Score and compare agent runs against rubrics",
    component: LazyAgentEvalApp,
    helpItems: agentEvalHelpItems,
    metadata: agentEvalMetadata,
    windowConfig: {
      defaultSize: agentEvalDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["claude-code"]: {
    id: "claude-code",
    name: "Claude Code",
    icon: { type: "image", src: claudeCodeMetadata.icon },
    description: "Claude Code integration conventions and hooks",
    component: LazyClaudeCodeApp,
    helpItems: claudeCodeHelpItems,
    metadata: claudeCodeMetadata,
    windowConfig: {
      defaultSize: claudeCodeDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
  ["obsidian"]: {
    id: "obsidian",
    name: "Obsidian",
    icon: { type: "image", src: obsidianMetadata.icon },
    description: "Search and manage notes in an Obsidian vault",
    component: LazyObsidianApp,
    helpItems: obsidianHelpItems,
    metadata: obsidianMetadata,
    windowConfig: {
      defaultSize: obsidianDefaultSize,
      minSize: { width: 380, height: 220 },
    } as WindowConstraints,
  },
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Helper function to get app icon path
export const getAppIconPath = (appId: AppId): string => {
  const app = appRegistry[appId];
  if (typeof app.icon === "string") {
    return app.icon;
  }
  return app.icon.src;
};

// Helper function to get all apps except Finder
// Pass isAdmin=true to include admin-only apps
export const getNonFinderApps = (isAdmin: boolean = false): Array<{
  name: string;
  icon: string;
  id: AppId;
}> => {
  return Object.entries(appRegistry).reduce<
    {
      name: string;
      icon: string;
      id: AppId;
    }[]
  >((acc, [id, app]) => {
      if (id === "finder") return acc;
      // Filter out admin-only apps for non-admin users
      if ((app as { adminOnly?: boolean }).adminOnly && !isAdmin) return acc;
      acc.push({
        name: app.name,
        icon: getAppIconPath(id as AppId),
        id: id as AppId,
      });
      return acc;
    }, []);
};

function resolveRegistryAppId(appId: AppId): AppId {
  return resolveAppId(appId) ?? appId;
}

// Helper function to get app metadata
export const getAppMetadata = (appId: AppId) => {
  return appRegistry[resolveRegistryAppId(appId)].metadata;
};

// Helper function to get app component
export const getAppComponent = (appId: AppId) => {
  return appRegistry[resolveRegistryAppId(appId)].component;
};

// Helper function to get window configuration
export const getWindowConfig = (appId: AppId): WindowConstraints => {
  const resolved = resolveRegistryAppId(appId);
  return appRegistry[resolved].windowConfig || defaultWindowConstraints;
};

// Helper function to get mobile window size
export const getMobileWindowSize = (appId: AppId): WindowSize => {
  const config = getWindowConfig(appId);
  if (config.mobileDefaultSize) {
    return config.mobileDefaultSize;
  }
  // Square aspect ratio: height = width
  if (config.mobileSquare) {
    return {
      width: window.innerWidth,
      height: window.innerWidth,
    };
  }
  return {
    width: window.innerWidth,
    height: config.defaultSize.height,
  };
};
