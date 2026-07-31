import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function HermesAgentAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="hermes-agent"
      skillTagline="A drop-in agent that runs your installed skills"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}