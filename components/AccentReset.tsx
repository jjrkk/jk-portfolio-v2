"use client";

import { useEffect } from "react";
import { SITE_ACCENT } from "@/lib/theme";

/**
 * The landing carousel animates --accent / --panel-bg on the root element and
 * doesn't reset them on unmount. On a client-side nav into a page without the
 * carousel (About, case studies), those vars would otherwise stay frozen at the
 * last project color. This restores the site brand accent so the PageFrame and
 * accent text read correctly. Renders nothing.
 */
export function AccentReset() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", SITE_ACCENT);
    root.style.removeProperty("--panel-bg");
    return () => {
      // Leave it at brand on the way out; the carousel re-takes ownership on /.
      root.style.removeProperty("--accent");
    };
  }, []);
  return null;
}
