export type SkillSlug =
  | "book-to-skill"
  | "grill-me"
  | "first-principles"
  | "pre-mortem"
  | "via-negativa"
  | "hermes-agent"
  | "daily-briefing"
  | "agent-eval"
  | "claude-code"
  | "obsidian";

export interface AppMetadata {
  name: string;
  version: string;
  creator: {
    name: string;
    url: string;
  };
  github: string;
  icon: string;
}
