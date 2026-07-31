import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function GrillMeAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="grill-me"
      skillTagline="Relentlessly stress-test your plan or design"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}