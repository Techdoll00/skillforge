import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function FirstPrinciplesAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="first-principles"
      skillTagline="Reason from fundamental truths, not analogies"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}