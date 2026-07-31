import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function PreMortemAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="pre-mortem"
      skillTagline="Assume your plan already failed - find out why"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}