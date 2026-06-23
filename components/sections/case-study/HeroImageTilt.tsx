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
export function HeroImageTilt({
  children,
  scrollRange = 1150,
  maxDeg = -42,
}: {
  children: React.ReactNode;
  /** ScrollY value (px) at which `maxDeg` is reached. Defaults to case-study value. */
  scrollRange?: number;
  /** Maximum rotation in degrees (negative = counter-clockwise). */
  maxDeg?: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  const rotate = useTransform(scrollY, [0, scrollRange], [0, maxDeg]);

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
