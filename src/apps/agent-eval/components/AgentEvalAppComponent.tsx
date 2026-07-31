import { SkillAppWindow } from "@/apps/base/SkillAppWindow";
import type { AppProps } from "@/apps/base/types";
import { appMetadata, helpItems } from "../metadata";

export function AgentEvalAppComponent(props: AppProps) {
  return (
    <SkillAppWindow
      {...props}
      skillSlug="agent-eval"
      skillTagline="Score and compare agent runs against rubrics"
      metadata={appMetadata}
      helpItems={helpItems}
    />
  );
}