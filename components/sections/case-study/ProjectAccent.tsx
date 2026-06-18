"use client";

import { useEffect } from "react";
import { SITE_ACCENT } from "@/lib/theme";

/**
 * Case-study pages aren't driven by the landing carousel, so nothing themes the
 * fixed PageFrame (which reads --accent off documentElement). This sets the
 * project accent on mount so the frame matches the page, then restores the site
 * brand accent on the way out. Page *content* is themed via an inline style on
 * the page wrapper (SSR-correct, no flash); this only handles the fixed frame.
 */
export function ProjectAccent({ accent }: { accent: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    return () => {
      root.style.setProperty("--accent", SITE_ACCENT);
    };
  }, [accent]);
  return null;
}
