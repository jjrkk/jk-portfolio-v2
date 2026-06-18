"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/site";

/** Persistent top nav for inner pages (About, case studies). Mirrors the
 *  landing carousel chrome positions exactly (pt-12 lg:pt-14, PAD horizontal).
 *  The name link gets the same hover flourish as the homepage but with ← since
 *  it navigates back to the work. */
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
   *  hero (case studies), with the same accent hover on the way down. */
  tone?: "dark" | "light";
}) {
  const [hovered, setHovered] = useState(false);
  const isExternal = rightExternal ?? /^(https?:|mailto:)/.test(rightHref);

  const linkColor =
    tone === "light"
      ? "text-[color:var(--accent-contrast)] hover:text-[color:var(--accent-contrast)]/70"
      : "text-foreground hover:text-accent";

  return (
    <div className="fixed inset-x-0 top-0 z-[95] flex items-center justify-between px-6 pt-12 sm:px-10 lg:px-16 lg:pt-14 xl:px-24">
      <Link
        href="/"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`relative font-mono text-eyebrow uppercase transition-colors ${linkColor}`}
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
          className={`group inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-colors ${linkColor}`}
        >
          {rightLabel}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      ) : (
        <Link
          href={rightHref}
          className={`group inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-colors ${linkColor}`}
        >
          {rightLabel}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
      )}
    </div>
  );
}
