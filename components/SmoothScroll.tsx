"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis();
    lenisRef.current = lenis;
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
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  // Reset to top on every route change so Lenis's virtual scroll position
  // doesn't bleed into the incoming page.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
