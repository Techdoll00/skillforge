import type { MouseEvent, TouchEvent } from "react";

export function useLinkPreviewHandlers(url: string) {
  const handleOpenYouTube = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleOpenExternally = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return {
    handleOpenYouTube,
    handleOpenExternally,
  };
}
