import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function BookToSkillAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="book-to-skill"
      skillTagline="Turn any book into a reusable agent skill"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}