import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function ClaudeCodeAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="claude-code"
      skillTagline="Claude Code integration conventions and hooks"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}