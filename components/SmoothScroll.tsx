"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Lenis smooth-scroll, mounted once at the root. Restrained by design
 * (CLAUDE.md: "restrained motion") and disabled entirely when the user
 * prefers reduced motion — accessibility is a guardrail, not a Phase 7 bolt-on.
 *
 * Renders nothing; it just drives the scroll loop for the lifetime of the app.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis();
    // Expose for in-page smooth-scroll CTAs (e.g. the intro "WORK ↓" jump),
    // so they animate through Lenis rather than fighting it.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
