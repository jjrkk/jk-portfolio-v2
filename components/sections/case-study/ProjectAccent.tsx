"use client";

import { useEffect } from "react";
import { SITE_ACCENT } from "@/lib/theme";

/**
 * Case-study pages aren't driven by the landing carousel, so nothing themes the
 * fixed PageFrame (which reads --wall off documentElement). This sets --wall to
 * the project accent on mount — case-study pages keep their full-saturation
 * per-project frame, unchanged — then clears it back to the light :root
 * default on the way out. Page *content* is themed via an inline style on the
 * page wrapper (SSR-correct, no flash); this only handles the fixed frame.
 */
const DEFAULT_ACCENT_CONTRAST = "#fdfcfb";

export function ProjectAccent({ accent, accentContrast }: { accent: string; accentContrast?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--wall", accent);
    if (accentContrast) root.style.setProperty("--accent-contrast", accentContrast);
    return () => {
      // Skip the brand-accent reset when returning to the landing carousel
      // (PageNav's "ALL PROJECTS" sets this flag): the carousel restores the
      // origin slide's own accent/wall, and resetting here would flash fuchsia
      // for a frame behind the morph clone. Other exits (About, browser nav)
      // reset as usual so a non-carousel page never inherits the project accent.
      const w = window as unknown as { __jkSuppressAccentReset?: boolean };
      if (w.__jkSuppressAccentReset) {
        w.__jkSuppressAccentReset = false;
        return;
      }
      root.style.setProperty("--accent", SITE_ACCENT);
      root.style.setProperty("--accent-contrast", DEFAULT_ACCENT_CONTRAST);
      root.style.removeProperty("--wall");
    };
  }, [accent, accentContrast]);
  return null;
}
