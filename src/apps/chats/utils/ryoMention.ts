export function parseRyoMention(
  input: string,
  nudgeText: string
): { isMention: boolean; messageContent: string } {
  if (input.startsWith("@kin ")) {
    return { isMention: true, messageContent: input.substring(4).trim() };
  }

  if (input === "@kin") {
    return { isMention: true, messageContent: nudgeText };
  }

  return { isMention: false, messageContent: "" };
}
