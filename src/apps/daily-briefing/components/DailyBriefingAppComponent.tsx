import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function DailyBriefingAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="daily-briefing"
      skillTagline="A morning briefing synthesized from your sources"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}