import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function ViaNegativaAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="via-negativa"
      skillTagline="Improve systems by subtracting, not adding"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}