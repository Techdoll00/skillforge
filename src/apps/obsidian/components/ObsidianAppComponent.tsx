import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function ObsidianAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="obsidian"
      skillTagline="Search and manage notes in an Obsidian vault"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}