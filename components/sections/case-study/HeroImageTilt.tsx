"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMorphTarget } from "@/components/morph/MorphProvider";

/**
 * Scroll-linked flat rotation for the case-study hero image. Square-on at the
 * top of the page (the default "main view"), then rotates counter-clockwise on
 * a flat plane as the reader scrolls — the image-card swings up and can drift
 * over the text above it (intentional). Premium kinetic flourish.
 *
 * Also the landing→case-study morph TARGET: when arriving via a card click the
 * real image is held invisible while the shared-element clone lands on it
 * (useMorphTarget), then revealed. `morphId` matches the source card's slug.
 *
 * The <h1> stays server-rendered in CaseHero; only the image lives here.
 * Reduced-motion → static, square-on.
 */
export function HeroImageTilt({
  children,
  scrollRange = 1150,
  maxDeg = -42,
  morphId,
}: {
  children: React.ReactNode;
  /** ScrollY value (px) at which `maxDeg` is reached. Defaults to case-study value. */
  scrollRange?: number;
  /** Maximum rotation in degrees (negative = counter-clockwise). */
  maxDeg?: number;
  /** Shared id for the landing→case-study morph (the slug). */
  morphId?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const { ref: morphRef, hidden } = useMorphTarget(morphId);

  const rotate = useTransform(scrollY, [0, scrollRange], [0, maxDeg]);

  if (reduce) {
    return (
      <div
        ref={morphRef}
        className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)]"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={morphRef}
      className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] will-change-transform"
      style={{ rotate, transformOrigin: "center center", opacity: hidden ? 0 : 1 }}
    >
      {children}
    </motion.div>
  );
}
