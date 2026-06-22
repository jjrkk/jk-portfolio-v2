"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-linked flat rotation for the case-study hero image. Square-on at the
 * top of the page (the default "main view"), then rotates counter-clockwise on
 * a flat plane as the reader scrolls — the image-card swings up and can drift
 * over the text above it (intentional). Premium kinetic flourish.
 *
 * Driven off raw scrollY over a fixed range: the hero is the first thing on the
 * page, so scrollY correlates directly with how far it's been revealed past —
 * robust, no measurement, no fighting the hero's sticky positioning.
 *
 * The <h1> stays server-rendered in CaseHero; only the image lives here.
 * Reduced-motion → static, square-on.
 */
export function HeroImageTilt({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  // 0 → 1150px of scroll maps to 0 → -32° (counter-clockwise). The range spans
  // roughly the full window the hero stays visible (it's covered by the rising
  // cream content by ~1000px), so the card keeps rotating the whole way down
  // rather than stopping early. Clamped beyond.
  const rotate = useTransform(scrollY, [0, 1150], [0, -42]);

  if (reduce) {
    return (
      <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] will-change-transform"
      style={{ rotate, transformOrigin: "center center" }}
    >
      {children}
    </motion.div>
  );
}
