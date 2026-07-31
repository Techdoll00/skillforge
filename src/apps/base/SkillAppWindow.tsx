import { useState, useEffect, type ReactNode } from "react";
import { lazy, Suspense } from "react";
import { AppWindowShell } from "@/components/shared/AppWindowShell";
import { AppHelpAboutDialogs } from "@/components/shared/AppHelpAboutDialogs";
import { useAppHelpAboutDialogs } from "@/hooks/useAppHelpAboutDialogs";
import { useThemeFlags } from "@/hooks/useThemeFlags";
import { useTranslatedHelpItems } from "@/hooks/useTranslatedHelpItems";
import { getTranslatedAppName } from "@/utils/i18n";
import type { AppProps } from "@/apps/base/types";
import type { AppId } from "@/config/appRegistry";
import type { AppMetadata, SkillSlug } from "./skillAppTypes";

interface SkillAppWindowProps extends AppProps {
  skillSlug: SkillSlug;
  skillTagline: string;
  metadata: AppMetadata;
  helpItems: Array<{ icon: string; title: string; description: string }>;
  children?: ReactNode;
}

interface ParsedSkillDoc {
  description: string;
  install: string | null;
  body: string;
}

const LazyMarkdown = lazy(() =>
  Promise.all([import("react-markdown"), import("remark-gfm")]).then(
    ([{ default: ReactMarkdown }, { default: remarkGfm }]) => ({
      default: ({ children }: { children: string }) => (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
      ),
    })
  )
);

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function parseSkillDoc(markdown: string): ParsedSkillDoc {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(markdown.trimStart());
  if (!m) {
    return {
      description: "",
      install: null,
      body: markdown,
    };
  }
  const frontmatter: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    frontmatter[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  return {
    description: frontmatter.description ?? "",
    install: frontmatter.install ?? null,
    body: m[2].trim(),
  };
}

export function SkillAppWindow({
  isWindowOpen,
  onClose,
  isForeground,
  skipInitialSound,
  instanceId,
  onNavigateNext,
  onNavigatePrevious,
  skillSlug,
  skillTagline,
  metadata,
  helpItems,
  children,
}: SkillAppWindowProps) {
  const { isWindowsTheme, isMacOSTheme } = useThemeFlags();
  const { isHelpDialogOpen, setIsHelpDialogOpen, isAboutDialogOpen, setIsAboutDialogOpen } =
    useAppHelpAboutDialogs();
  const translatedHelpItems = useTranslatedHelpItems(
    skillSlug as AppId,
    helpItems
  );
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [doc, setDoc] = useState<ParsedSkillDoc | null>(null);
  const [loadError, setLoadError] = useState(false);

  const appId = skillSlug as AppId;
  const installCommand =
    doc?.install ?? `hermes skill install Techdoll00/skillforge --skill ${skillSlug}`;
  const tagline = doc?.description || skillTagline;
  const downloadUrl = `/skills/${skillSlug}.md`;

  useEffect(() => {
    if (!isWindowOpen) return;
    let cancelled = false;
    setDoc(null);
    setLoadError(false);
    fetch(`/skills/${skillSlug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelled) setDoc(parseSkillDoc(text));
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [isWindowOpen, skillSlug]);

  const handleCopy = async () => {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(installCommand);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) ok = fallbackCopy(installCommand);
    if (ok) {
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1600);
    }
  };

  return (
    <AppWindowShell
      isWindowOpen={isWindowOpen}
      isWindowsTheme={isWindowsTheme}
      isForeground={isForeground}
      menuBar={<></>}
      windowFrameProps={{
        title: getTranslatedAppName(appId),
        onClose,
        isForeground,
        appId: skillSlug,
        material: isMacOSTheme ? "brushedmetal" : "default",
        skipInitialSound,
        instanceId,
        onNavigateNext,
        onNavigatePrevious,
        windowConstraints: { minWidth: 400, minHeight: 280 },
      }}
      trailing={
        <AppHelpAboutDialogs
          appId={skillSlug}
          metadata={metadata}
          helpItems={translatedHelpItems}
          isHelpOpen={isHelpDialogOpen}
          onHelpOpenChange={setIsHelpDialogOpen}
          isAboutOpen={isAboutDialogOpen}
          onAboutOpenChange={setIsAboutDialogOpen}
        />
      }
    >
      <div className="flex flex-col size-full font-os-ui overflow-hidden bg-white dark:bg-neutral-900">
        <div className="flex items-start gap-3 px-4 pt-4 pb-2">
          <img
            src={metadata.icon}
            alt=""
            className="size-9 shrink-0 object-contain"
          />
          <div className="min-w-0">
            <h2 className="text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              {getTranslatedAppName(appId)}
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {tagline}
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-3">
          {loadError ? (
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Could not load this skill document.
            </p>
          ) : doc ? (
            <div className="prose prose-sm max-w-none prose-p:text-neutral-700 prose-headings:text-neutral-900 prose-code:text-neutral-800 prose-strong:text-neutral-900 prose-li:text-neutral-700 prose-blockquote:text-neutral-600 prose-a:text-os-link dark:prose-invert">
              <Suspense
                fallback={
                  <div className="space-y-2">
                    <div className="h-3 rounded bg-neutral-200/70 dark:bg-neutral-700/60 animate-pulse" />
                    <div className="h-3 rounded bg-neutral-200/70 dark:bg-neutral-700/60 animate-pulse w-4/5" />
                  </div>
                }
              >
                <LazyMarkdown>{doc.body}</LazyMarkdown>
              </Suspense>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="h-3 rounded bg-neutral-200/70 dark:bg-neutral-700/60 animate-pulse" />
              <div className="h-3 rounded bg-neutral-200/70 dark:bg-neutral-700/60 animate-pulse w-4/5" />
              <div className="h-3 rounded bg-neutral-200/70 dark:bg-neutral-700/60 animate-pulse w-3/5" />
            </div>
          )}
          {children}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-neutral-700 px-4 py-2.5">
          <button
            onClick={handleCopy}
            className="h-7 px-3 rounded-md text-[12px] font-medium bg-neutral-800 hover:bg-neutral-700 text-white dark:bg-neutral-200 dark:hover:bg-white dark:text-neutral-900 transition-colors"
          >
            {copyState === "copied" ? "Copied" : "Copy Install Cmd"}
          </button>
          <a
            href={downloadUrl}
            download
            className="h-7 px-3 rounded-md text-[12px] font-medium bg-neutral-200 hover:bg-neutral-300 text-neutral-800 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 transition-colors"
          >
            Download .md
          </a>
        </div>
      </div>
    </AppWindowShell>
  );
}
