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
const DEFAULT_ACCENT_CONTRAST = "#fdfcfb";

export function ProjectAccent({ accent, accentContrast }: { accent: string; accentContrast?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent);
    if (accentContrast) root.style.setProperty("--accent-contrast", accentContrast);
    return () => {
      // Skip the brand-accent reset when returning to the landing carousel
      // (PageNav's "ALL PROJECTS" sets this flag): the carousel restores the
      // origin slide's own accent, and resetting here would flash fuchsia for a
      // frame behind the morph clone. Other exits (About, browser nav) reset as
      // usual so a non-carousel page never inherits the project accent.
      const w = window as unknown as { __jkSuppressAccentReset?: boolean };
      if (w.__jkSuppressAccentReset) {
        w.__jkSuppressAccentReset = false;
        return;
      }
      root.style.setProperty("--accent", SITE_ACCENT);
      root.style.setProperty("--accent-contrast", DEFAULT_ACCENT_CONTRAST);
    };
  }, [accent, accentContrast]);
  return null;
}
