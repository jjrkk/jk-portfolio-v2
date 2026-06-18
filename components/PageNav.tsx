"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";

/**
 * Persistent top nav for inner pages (About, case studies).
 *
 * When tone="light" (case studies), an IntersectionObserver watches the page's
 * <header> (the accent hero). While the hero is in view: white text, transparent
 * nav. Once the hero scrolls out: text switches to dark ink + a frosted-glass
 * backdrop fades in so the nav stays legible over any content below.
 *
 * tone="dark" (About) is always ink-on-canvas — no backdrop needed.
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

  useEffect(() => {
    if (tone !== "light") return;
    const header = document.querySelector("main header, header");
    if (!header) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(header);
    return () => obs.disconnect();
  }, [tone]);

  const showBackdrop = tone === "light" && !overHero;
  const effectiveTone = showBackdrop ? "dark" : tone;

  const linkColor =
    effectiveTone === "light"
      ? "text-[color:var(--accent-contrast)] hover:text-[color:var(--accent-contrast)]/70"
      : "text-foreground hover:text-accent";

  return (
    <div className="fixed inset-x-0 top-0 z-[95]">
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

        {isExternal ? (
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
