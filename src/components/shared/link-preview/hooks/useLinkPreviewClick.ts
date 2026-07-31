import type { MouseEvent, TouchEvent } from "react";
import { useLaunchApp } from "@/hooks/useLaunchApp";
import { isTouchDevice, isYouTubeUrl } from "../utils";

export function useLinkPreviewClick(url: string) {
  const launchApp = useLaunchApp();

  const handleClick = (e?: MouseEvent | TouchEvent) => {
    if (e && "touches" in e && isTouchDevice()) {
      e.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (isYouTubeUrl(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      const urlObj = new URL(url);
      const domain = urlObj.hostname.replace(/^www\./, "");
      const path = urlObj.pathname + urlObj.search;
      const cleanUrl = domain + path;

      launchApp("internet-explorer", {
        initialData: { url: cleanUrl, year: "current" },
      });
    }
  };

  return handleClick;
}
