"use client";

import { useCallback, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMorphBegin, useMorphTarget, useRegisterBackTrigger } from "@/components/morph/MorphProvider";
import { SpecularBorder } from "@/components/ui/SpecularBorder";

/** Rotation (deg) below which the hero reads as "square-on enough" to serve as
 *  a clean FLIP source for the reverse conduit — see the back-trigger below. */
const REVERSE_ROTATE_TOLERANCE_DEG = 3;

/**
 * Scroll-linked flat rotation for the case-study hero image. Square-on at the
 * top of the page (the default "main view"), then rotates counter-clockwise on
 * a flat plane as the reader scrolls — the image-card swings up and can drift
 * over the text above it (intentional). Premium kinetic flourish.
 *
 * Also the landing↔case-study morph target AND (conditionally) source:
 *  - Arriving via a card click: the real image is held invisible while the
 *    shared-element clone lands on it (useMorphTarget), then revealed.
 *    `morphId` matches the source card's slug.
 *  - Leaving via "ALL PROJECTS": if the hero is at rest (near the top of the
 *    page, effectively unrotated) this registers a reverse trigger (keyed by
 *    the same morphId, via useRegisterBackTrigger) that PageNav's back link
 *    looks up and fires — flying the hero image back down into its origin
 *    card. Deep-scrolled or rotated, the hero can't credibly fly anywhere
 *    sensible (it may be off-screen or visually tilted), so the trigger
 *    declines and PageNav falls back to a plain, still-corrected navigation
 *    (see Work.tsx's return-restore effect).
 *
 * The <h1> stays server-rendered in CaseHero; only the image lives here.
 * Reduced-motion → static, square-on, never offers the reverse trigger.
 */
export function HeroImageTilt({
  children,
  scrollRange = 1150,
  maxDeg = -42,
  morphId,
  heroSrc,
}: {
  children: React.ReactNode;
  /** ScrollY value (px) at which `maxDeg` is reached. Defaults to case-study value. */
  scrollRange?: number;
  /** Maximum rotation in degrees (negative = counter-clockwise). */
  maxDeg?: number;
  /** Shared id for the landing↔case-study morph (the slug). */
  morphId?: string;
  /** The hero image src — needed to spawn the reverse-conduit clone. */
  heroSrc?: string;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const beginMorph = useMorphBegin();
  // True once THIS hero has begun its own reverse morph. Without this, the
  // still-mounted hero's own useMorphTarget(morphId) call below would see
  // `active.id === morphId` (it IS morphId — it just began the morph with its
  // own slug) and immediately report ITS OWN rect back as "the target" —
  // self-colliding with zero travel distance instead of letting the clone
  // reach the landing card. No cleanup needed: this page unmounts right after
  // navigating away. State (not a ref) because useMorphTarget's `isTarget`
  // check needs this to be current on the SAME re-render the morph begins —
  // setSelfTriggered batches with MorphProvider's own setActive call, so
  // both land together before the next paint.
  const [selfTriggered, setSelfTriggered] = useState(false);
  const { ref: morphRef, hidden } = useMorphTarget(selfTriggered ? undefined : morphId);

  const rotate = useTransform(scrollY, [0, scrollRange], [0, maxDeg]);

  const triggerBack = useCallback((): boolean => {
    if (reduce || !morphId || !heroSrc || !morphRef.current) return false;
    // Rotation is a linear function of scrollY, so bound scrollY directly
    // rather than reading the live (possibly-stale-until-next-frame) motion
    // value — this keeps the check synchronous with the click.
    const currentDeg = Math.abs((scrollY.get() / scrollRange) * maxDeg);
    if (currentDeg > REVERSE_ROTATE_TOLERANCE_DEG) return false;
    const r = morphRef.current.getBoundingClientRect();
    setSelfTriggered(true);
    beginMorph({
      id: morphId,
      src: heroSrc,
      from: { top: r.top, left: r.left, width: r.width, height: r.height },
      fromRadius: 16,
      href: "/",
    });
    return true;
  }, [reduce, morphId, heroSrc, morphRef, scrollY, scrollRange, maxDeg, beginMorph]);

  useRegisterBackTrigger(morphId, reduce ? null : triggerBack);

  if (reduce) {
    return (
      <div
        ref={morphRef}
        className="relative overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)]"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {children}
        <SpecularBorder radius="rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div
      ref={morphRef}
      className="relative overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)] will-change-transform"
      style={{ rotate, transformOrigin: "center center", opacity: hidden ? 0 : 1 }}
    >
      {children}
      <SpecularBorder radius="rounded-2xl" />
    </motion.div>
  );
}
