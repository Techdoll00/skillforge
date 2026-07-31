import { useChatsStore } from "@/stores/useChatsStore";

/** True when the signed-in user is the Skillforge OS admin account (kin). */
export function useIsRyoAdmin(): boolean {
  const username = useChatsStore((state) => state.username);
  return username?.toLowerCase() === "kin";
}
