"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

/**
 * Persistent top nav for inner pages (About, case studies).
 *
 * When tone="light" (case studies), a scroll listener watches whether the
 * [data-nav-sentinel] marker (placed at the hero/content boundary) has been
 * scrolled past the nav bar. While above the sentinel: white text on the
 * accent hero. Once past it: text switches to dark ink.
 *
 * Scroll listener beats IntersectionObserver here because IO only fires on
 * entry/exit — it misses the current state on initial mount, after client-side
 * navigation, and at rootMargin edge cases, leading to stale overHero state.
 * A scroll listener re-evaluates synchronously on every scroll tick and once
 * on mount, so it's always correct regardless of how the page arrived.
 *
 * tone="dark" (About) is always ink-on-canvas — no listener needed.
 */
export function PageNav({
  rightLabel,
  rightHref,
  rightExternal,
  tone = "dark",
}: {
  rightLabel: string;
  rightHref: string;
  rightExternal?: boolean;
  /** "dark" = ink on a light canvas (default). "light" = white over an accent
   *  hero (case studies); auto-switches to dark + backdrop once hero scrolls out. */
  tone?: "dark" | "light";
}) {
  const [hovered, setHovered] = useState(false);
  // Starts true so we render white-on-accent immediately (no flash of dark text).
  const [overHero, setOverHero] = useState(true);
  const isExternal = rightExternal ?? /^(https?:|mailto:)/.test(rightHref);
  const isAnchor = rightHref.startsWith("#");

  const handleAnchorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(rightHref.slice(1));
    if (!target) return;
    // The Contact footer uses `sticky bottom-0` — its element position never
    // changes, so scrollTo(element) barely moves. Scroll to page bottom instead
    // so the sticky footer is fully revealed by scrolling past all content above.
    const isSticky = getComputedStyle(target).position === "sticky"
      || getComputedStyle(target.parentElement ?? target).position === "sticky";
    const dest = isSticky
      ? document.documentElement.scrollHeight - window.innerHeight
      : target;
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement | number, o?: { duration?: number }) => void } }).lenis;
    if (lenis?.scrollTo) lenis.scrollTo(dest as number, { duration: 1.1 });
    else window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    if (tone !== "light") return;

    // Lenis only fires ~1 native `scroll` event per programmatic scroll animation
    // (it updates scrollY via RAF, not via repeated native events). So we can't
    // rely on `window.addEventListener("scroll")` — it fires once at the start
    // of the animation, not at the end. Instead:
    //   1. Try Lenis's own per-frame scroll event (fires on every RAF tick).
    //   2. Fall back to a plain RAF loop (same cadence, zero Lenis dependency).
    // Both call check() ~60fps, React bails out when overHero value doesn't change.

    const NAV_HEIGHT = 90;
    const check = () => {
      const sentinel =
        document.querySelector("[data-nav-sentinel]") ??
        document.querySelector("main header, header");
      if (!sentinel) { setOverHero(true); return; }
      setOverHero(sentinel.getBoundingClientRect().top > NAV_HEIGHT);
    };

    check(); // initial state before first frame

    // RAF loop: runs every frame regardless of what manages scroll (Lenis,
    // native, programmatic). Lenis and native window scroll events both fire
    // only once per programmatic scroll call — not per animation frame — so
    // they miss the intermediate positions during a smooth scroll animation.
    // The RAF loop reads getBoundingClientRect() on every frame, which always
    // has the correct scrollY. React bails out silently when overHero doesn't
    // change, so this is cheaper than it looks.
    let rafId: ReturnType<typeof requestAnimationFrame>;
    const loop = () => { check(); rafId = requestAnimationFrame(loop); };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [tone]);

  const showBackdrop = false; // backdrop removed — text colour flips but no surface fill
  const effectiveTone = (tone === "light" && !overHero) ? "dark" : tone;

  const linkColor =
    effectiveTone === "light"
      ? "text-[color:var(--accent-contrast)] hover:text-[color:var(--accent-contrast)]/70"
      : "text-foreground hover:text-accent";

  return (
    <div className="fixed inset-x-[12px] top-0 z-[95]">
      {/* Frosted backdrop — opacity-transitions in once the hero is gone */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          showBackdrop ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{
          background: "rgba(247,245,242,0.72)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 1px 0 0 rgba(21,19,15,0.06)",
        }}
      />

      <div className="relative flex items-center justify-between px-6 pb-5 pt-12 sm:px-10 lg:px-16 lg:pt-14 xl:px-24">
        <Link
          href="/"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`relative font-mono text-eyebrow uppercase transition-colors duration-300 ${linkColor}`}
        >
          <AnimatePresence>
            {hovered && (
              <motion.span
                key="back-arrow"
                aria-hidden
                className="pointer-events-none absolute right-full pr-2"
                initial={{ x: -14, opacity: 0, scale: 0.5 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -10, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
              >
                ←
              </motion.span>
            )}
          </AnimatePresence>
          {SITE.name}
        </Link>

        {isAnchor ? (
          // Anchor: smooth-scroll to section via Lenis. Arrow points down on
          // desktop (indicates direction), right on mobile.
          <a
            href={rightHref}
            onClick={handleAnchorClick}
            className={`group inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
          >
            {rightLabel}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0.5">
              <span className="lg:hidden">→</span>
              <span className="hidden lg:inline">↓</span>
            </span>
          </a>
        ) : isExternal ? (
          <a
            href={rightHref}
            target={rightHref.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
          >
            {rightLabel}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        ) : (
          <Link
            href={rightHref}
            className={`group inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-colors duration-300 ${linkColor}`}
          >
            {rightLabel}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
