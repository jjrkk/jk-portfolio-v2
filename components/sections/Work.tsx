"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { SLIDES, type WorkItem } from "@/lib/work";
import { PROJECT_THEMES, SITE_ACCENT, getProjectTheme } from "@/lib/theme";
import { cn } from "@/lib/cn";
import { hexLerp } from "@/lib/color";
import { SITE } from "@/lib/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { EmailCopyButton } from "@/components/ui/EmailCopyButton";
import { Reveal } from "@/components/ui/Reveal";
import { RESUME_URL, Contact } from "@/components/sections/Contact";
import { useMorphBegin } from "@/components/morph/MorphProvider";
import { track } from "@/lib/analytics";

/** Publish the four page-frame edges to the root element. Whichever scrolling
 *  surface is visible owns this; PageFrame consumes it. See PageFrame.tsx. */
function setEdges(edges: { top: boolean; bottom: boolean; left: boolean; right: boolean }) {
  const d = document.documentElement.dataset;
  d.edgeTop = edges.top ? "on" : "off";
  d.edgeBottom = edges.bottom ? "on" : "off";
  d.edgeLeft = edges.left ? "on" : "off";
  d.edgeRight = edges.right ? "on" : "off";
}

function clearEdges() {
  const d = document.documentElement.dataset;
  delete d.edgeTop;
  delete d.edgeBottom;
  delete d.edgeLeft;
  delete d.edgeRight;
}

const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1024px)").matches;

/**
 * The landing — the ENTIRE homepage is one pinned vertical card carousel:
 * an intro slide ("Justin 101") followed by the selected work. As you scroll:
 *  - right-side cards move as a "peeking deck" (active centered, neighbors
 *    peeking above/below), edge-to-edge images with no frame;
 *  - the sticky left pane crossfades its copy to the active slide;
 *  - --panel-bg / --accent interpolate across the palette (grammar #1).
 * One eased "playhead" drives all three; cards DWELL at center then hand off.
 *
 * Persistent chrome (name + counter) lives in a top bar, separate from the
 * crossfading per-slide copy. Mobile + reduced-motion fall back to a stacked list.
 */

const TOTAL = SLIDES.length;
const SPACING = 80; // % of stage height between adjacent cards (resting peek)
const SCALE_FALLOFF = 0.12;
const MIN_SCALE = 0.82;

// Shared horizontal rhythm — generous gutters, scales into widescreen, capped
// so it never sprawls on ultrawide. Top bar and content share this padding.
const PAD = "mx-auto w-full max-w-[140rem] px-6 sm:px-10 lg:px-16 xl:px-24";

// Per-slide theme: intro rides the base canvas + brand accent, then the work.
const SLIDE_THEMES = [
  // Intro rides a pale, cool magenta tint from the fuchsia family (cooler than
  // the warm base canvas; pairs with the accent; reads pink against FF Cloud's
  // blue-lavender for a clean transition).
  { panelBg: "#f8ecf2", accent: SITE_ACCENT },
  ...PROJECT_THEMES.map((t) => ({ panelBg: t.panelBg, accent: t.accent })),
];

/** Per-chip border/bg/text styling: accent for the new-school tag, a softer
 *  secondary tint for old-school, plain for everything else. */
function chipStyle(chip: string) {
  const lower = chip.toLowerCase();
  if (lower.includes("new school") || lower.includes("claude"))
    return "border-accent/40 bg-accent/10 text-accent";
  if (lower.includes("old school") || lower.includes("figma"))
    return "border-blue-400/40 bg-blue-500/[0.08] text-blue-600/80";
  return "border-foreground/20 text-foreground/80";
}


/** Scroll past the carousel to the Contact section below it. */
function scrollToContact() {
  if (typeof window === "undefined") return;
  const lenis = (
    window as unknown as {
      lenis?: { scrollTo: (t: number, o?: { duration?: number }) => void };
    }
  ).lenis;
  // The footer is a sticky-bottom reveal — its offsetTop doesn't resolve to the
  // page bottom. Always scroll to maxScroll to fully uncover it.
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (lenis?.scrollTo) lenis.scrollTo(maxScroll, { duration: 0.85 });
  else window.scrollTo({ top: maxScroll, behavior: "smooth" });
}

/** Smooth-scroll the carousel to a given slide index (clamped, Lenis-aware).
 *  Used by the keyboard control, pagination pills, the name link, and the
 *  intro "WORK" CTA — one source of truth for "go to slide N". */
function scrollToSlideIndex(index: number, duration = 0.85) {
  if (typeof window === "undefined") return;
  const el = document.getElementById("work");
  if (!el) return;
  const rect = el.getBoundingClientRect();
  // Guard: on mobile the carousel is display:none — bail to native scroll.
  if (rect.height <= window.innerHeight) return;
  const top = rect.top + window.scrollY;
  const i = Math.max(0, Math.min(TOTAL - 1, index));
  const target = top + (i / (TOTAL - 1)) * (rect.height - window.innerHeight);
  const lenis = (
    window as unknown as {
      lenis?: { scrollTo: (t: number, o?: { duration?: number }) => void };
    }
  ).lenis;
  if (lenis?.scrollTo) lenis.scrollTo(target, { duration });
  else window.scrollTo({ top: target, behavior: "smooth" });
}

/** Raw scroll progress (0–1) → playhead (0…TOTAL-1) with a dwell at each slide
 *  (smootherstep per segment: flat ends = hold, steep middle = hand-off). */
function easedPos(p: number) {
  if (TOTAL <= 1) return 0;
  const seg = 1 / (TOTAL - 1);
  const i = Math.min(TOTAL - 2, Math.max(0, Math.floor(p / seg)));
  const t = Math.min(1, Math.max(0, (p - i * seg) / seg));
  const e = t * t * t * (t * (t * 6 - 15) + 10);
  return i + e;
}

export function Work() {
  const reduce = useReducedMotion();
  if (reduce) return <StackedList className="" />;
  return (
    <>
      <Carousel />
      <HorizontalCarousel className="min-[1024px]:hidden" />
    </>
  );
}

/** "Justin Kirkey" chrome button with a maple leaf SVG that bounces in from the left on hover. */
function NameButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={() => scrollToSlideIndex(0)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative cursor-pointer font-mono text-eyebrow uppercase text-[color:inherit] transition-opacity hover:opacity-70"
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="flag"
            aria-hidden
            className="pointer-events-none absolute right-full flex items-center pr-1.5"
            initial={{ x: -14, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -10, opacity: 0, transition: { duration: 0.14, ease: "easeIn" } }}
            transition={{ type: "spring", stiffness: 380, damping: 18 }}
          >
            <svg aria-hidden width="88" height="96" viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-auto -translate-y-0.5">
              <path d="M87.2076 48.3938L83.606 46.9954C80.5044 44.597 84.8052 35.7964 85.5044 30.3934C85.5044 30.3934 73.4024 34.6942 72.4024 32.2918L69.3008 26.3934L58.1018 38.4954C56.9026 38.6946 56.4026 38.4954 56.2034 37.2962L61.4026 11.8982L53.301 16.3982C52.6018 16.5974 51.9026 16.3982 51.6018 15.699L43.801 0L35.6994 16.398C35.0002 16.898 34.5002 17.0972 34.0002 16.5972L26.1994 12.2964L30.8986 37.4954C30.3986 38.3939 29.6994 38.6946 28.5002 38.1946L17.8012 26.0926C16.4028 28.1942 15.4028 31.991 13.5004 32.6942C11.602 33.3935 5.3988 31.2958 1.3984 30.2958C2.7968 35.2958 7.0976 43.7958 4.5 46.6938L0 48.0922L20.898 66.5922C22.5972 71.2914 20.398 72.7914 18.9996 75.0922L41.8006 72.2914L41.3006 95.0924H45.9998L45.1014 72.2914L67.9024 74.893C66.504 71.7914 65.3008 70.393 66.504 65.5922L87.402 48.2912H86.902L87.2076 48.3938Z" fill="var(--nav-leaf-color, currentColor)"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
      Justin Kirkey
    </button>
  );
}

function Carousel() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const pos = useTransform(scrollYProgress, easedPos);
  // Spring-smoothed position drives the cards so they feel weighted and physical;
  // raw pos still drives color vars and the active index so theming stays snappy.
  // Near-critical (ratio ~0.97) + high stiffness: tracks the scroll tween tightly
  // with no overshoot. The old 100/26 was OVERDAMPED (crit ≈ 20) → slow, trailing
  // approach, which read as sluggish. This keeps the weight but kills the lag.
  const springPos = useSpring(pos, { stiffness: 240, damping: 30 });
  const indices = SLIDE_THEMES.map((_, i) => i);
  const bg = useTransform(pos, indices, SLIDE_THEMES.map((t) => t.panelBg));
  const accent = useTransform(pos, indices, SLIDE_THEMES.map((t) => t.accent));
  // --accent goes on :root so the fixed PageFrame sibling can read it.
  // --panel-bg is only consumed inside the carousel section, so scope it to
  // ref.current to limit the CSS cascade to that subtree (cheaper style recalc).
  useMotionValueEvent(bg, "change", (v) =>
    ref.current?.style.setProperty("--panel-bg", v),
  );
  useMotionValueEvent(accent, "change", (v) =>
    document.documentElement.style.setProperty("--accent", v),
  );

  // Intro-only top strip: the light card sits ~136px below the top at the very
  // top of the page so the nav rides directly on the accent. As you scroll off
  // the intro the card rises flush (translateY 120→0) like the rest of the deck,
  // and the nav ink crosses from on-accent white to on-card dark ink. Both are
  // tied to the first slide segment [0 → 1/(TOTAL-1)] so they complete exactly as
  // slide 1 settles. (Only the intro is ever dropped — and the intro has no top
  // peek — so the deck can never spill onto the strip.)
  const STRIP = 136;
  const firstSeg = 1 / (TOTAL - 1);
  // Animate past 0 to -40 so the rounded top corners slide above the sticky
  // container's overflow-hidden clip instead of morphing to flat.
  const stripY = useTransform(springPos, [0, 1], [STRIP, -40], { clamp: true });
  const navInk = useTransform(
    scrollYProgress,
    [0, firstSeg * 0.6],
    ["#fdfcfb", "#15130f"],
    { clamp: true },
  );
  // Leaf icon gets its own colour: white on accent, fuchsia on card.
  const navLeafColor = useTransform(
    scrollYProgress,
    [0, firstSeg * 0.6],
    ["#fdfcfb", "#D7355D"],
    { clamp: true },
  );

  // Write prev/next accent rgba vars so the directional gradient overlay can
  // bleed the incoming colour in from the top (prev) and bottom (next) edges.
  // Extracted so it can be called both on change AND on mount (useMotionValueEvent
  // only fires on changes — pos starts at 0 and doesn't change until the user
  // scrolls, so without the initial call the vars are never set on first load).
  const applyEdgeGradient = (v: number) => {
    // Scope to the carousel section element — only consumed inside it.
    const el = ref.current;
    if (!el) return;
    const prevIdx = Math.max(0, Math.floor(v));
    const nextIdx = Math.min(TOTAL - 1, Math.ceil(v));
    const toRgba = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    };
    const prevA = prevIdx === 0 ? 0 : 0.13;
    const nextA = nextIdx === TOTAL - 1 ? 0 : 0.13;
    el.style.setProperty("--accent-prev-rgba", toRgba(SLIDE_THEMES[prevIdx].accent, prevA));
    el.style.setProperty("--accent-next-rgba", toRgba(SLIDE_THEMES[nextIdx].accent, nextA));
  };
  useMotionValueEvent(pos, "change", applyEdgeGradient);
  // Apply once on mount so the gradient is correct before any scroll event fires.
  useEffect(() => { applyEdgeGradient(pos.get()); }, []);

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  // Shared morph trigger: the active WorkStage registers its triggerMorph here
  // so CarouselText's "Case study" link can fire the same conduit transition.
  const activeMorphRef = useRef<(() => void) | null>(null);
  const activeIndex = useTransform(pos, (v) => Math.round(v));
  useMotionValueEvent(activeIndex, "change", (v) => {
    setActive(v);
    activeRef.current = v;
    // Slide came into view — fire for case study slides only (skip intro at 0).
    if (v > 0 && v < SLIDES.length) {
      track("carousel_slide_view", { slug: SLIDES[v].slug, index: v });
    }
  });

  // Keyboard control: down/right → next slide (or contact footer at last slide),
  // up/left → previous slide.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        if (activeRef.current >= TOTAL - 1) scrollToContact();
        else scrollToSlideIndex(activeRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSlideIndex(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Snap navigation: a natural wheel/trackpad gesture commits to exactly ONE
  // card (next/prev) and smooth-scrolls there — no free-scrub dead zone. A
  // cooldown that refreshes while events keep arriving absorbs trackpad
  // momentum so one flick = one card. Capture-phase + stopImmediatePropagation
  // keeps Lenis from also free-scrolling while we're driving the deck.
  useEffect(() => {
    const carouselPinned = () => {
      const el = ref.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const wouldStep = (dir: number) =>
      activeRef.current + dir >= 0 && activeRef.current + dir <= TOTAL - 1;

    // Velocity-aware navigation: respond immediately on the first event, then
    // update the target slide as more delta accumulates during the same gesture.
    // gestureStartSlide anchors the target calculation so mid-gesture updates
    // are always relative to where the gesture began, not where we've scrolled to.
    let gestureStartSlide = 0;
    let accumulator = 0;
    let gesture = false;
    let committedTarget = -1;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    // ~120px per slide: one mouse click (~100-120px) = 1 slide immediately.
    // Faster/longer trackpad swipes cross thresholds to jump 2, 3, 4+ slides.
    const velocityToSlides = (delta: number) =>
      Math.min(TOTAL - 1, Math.max(1, Math.round(Math.abs(delta) / 120)));

    const settle = () => {
      gesture = false;
      accumulator = 0;
      committedTarget = -1;
      settleTimer = null;
    };

    // Snap-on-scroll-end: when scroll activity pauses while the carousel is
    // pinned, check if the position has drifted off a clean slide. If it has
    // (> 8px from ideal), apply a gentle pull back to the nearest slide.
    // The `snapping` flag suppresses the listener during the Lenis animation
    // so the snap can't cascade into a loop.
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let snapping = false;

    const snapToNearest = () => {
      if (!carouselPinned()) return;
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const nearest = activeRef.current;
      // Ideal pixel offset for this slide within the carousel scroll range.
      const idealY = top + (nearest / (TOTAL - 1)) * (el.offsetHeight - window.innerHeight);
      if (Math.abs(window.scrollY - idealY) > 8) {
        snapping = true;
        scrollToSlideIndex(nearest, 0.45);
        // Clear the flag after the animation has finished (0.45s + buffer).
        setTimeout(() => { snapping = false; }, 600);
      }
    };

    const onScrollSnap = () => {
      if (snapping) return;
      if (!carouselPinned()) return;
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(snapToNearest, 120);
    };

    const onWheel = (e: WheelEvent) => {
      // Filter sub-8px events entirely — incidental trackpad noise that shouldn't
      // move the carousel. The snap-on-scroll-end corrects any residual drift.
      if (!carouselPinned() || Math.abs(e.deltaY) < 8) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      // At a boundary and not mid-gesture, let native scroll carry on.
      if (!gesture && !wouldStep(dir)) return;
      e.preventDefault();
      (e as Event & { stopImmediatePropagation: () => void }).stopImmediatePropagation();

      if (!gesture) {
        // Capture starting slide once per gesture so accumulated delta is always
        // measured from a fixed origin, not a moving one.
        gestureStartSlide = activeRef.current;
        accumulator = 0;
        committedTarget = activeRef.current;
        gesture = true;
      }

      accumulator += e.deltaY;
      const rawDir = accumulator > 0 ? 1 : -1;
      const slides = velocityToSlides(accumulator);
      const target = Math.max(0, Math.min(TOTAL - 1, gestureStartSlide + rawDir * slides));

      // Only trigger a new scroll when the target slide actually changes —
      // keeps rapid micro-events from retriggering identical animations.
      if (target !== committedTarget) {
        committedTarget = target;
        scrollToSlideIndex(target, 0.6);
      }

      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 150);
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = carouselPinned() ? e.touches[0].clientY : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchY === null || !carouselPinned()) return;
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 28) return;
      const dir = dy > 0 ? 1 : -1;
      if (!wouldStep(dir)) return;
      e.preventDefault();
      (e as Event & { stopImmediatePropagation: () => void }).stopImmediatePropagation();
      scrollToSlideIndex(activeRef.current + dir);
      touchY = null;
    };

    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
    window.addEventListener("touchmove", onTouchMove, { capture: true, passive: false });
    window.addEventListener("scroll", onScrollSnap, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart, { capture: true });
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("scroll", onScrollSnap);
      if (settleTimer) clearTimeout(settleTimer);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, []);

  // On unmount: remove --accent from root (PageFrame needs it cleaned up so
  // later routes don't inherit the last slide's colour). --panel-bg and the
  // prev/next-rgba vars are on ref.current which is removed from DOM automatically.
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--accent");
    };
  }, []);

  // Frame hand-off: once scrolled past the pinned carousel, ease the accent and
  // panel bg from the last slide (amber) to the brand fuchsia / base canvas —
  // so the page frame and the lower sections settle on the brand color. Scroll-
  // driven, so it picks up seamlessly where the carousel's own theming leaves
  // off at the boundary. (Carousel scrollYProgress clamps at 1 past the deck, so
  // its theming doesn't fight this.)
  useEffect(() => {
    const root = document.documentElement;
    const last = SLIDE_THEMES[SLIDE_THEMES.length - 1];
    const onScroll = () => {
      const el = ref.current;
      if (!el || el.offsetHeight === 0) return; // hidden on mobile → skip
      const docTop = el.getBoundingClientRect().top + window.scrollY;
      const releaseStart = docTop + el.offsetHeight - window.innerHeight;
      const beyond = window.scrollY - releaseStart;
      if (beyond <= 0) return; // inside the carousel — its theming handles it
      const t = Math.min(1, beyond / (window.innerHeight * 0.4));
      root.style.setProperty("--accent", hexLerp(last.accent, SITE_ACCENT, t));
      el.style.setProperty("--panel-bg", hexLerp(last.panelBg, "#f7f5f2", t));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Page-frame edges (desktop / vertical layout): side rails are the cross-axis
  // → always on; the top edge shows only at the very top; the bottom edge shows
  // once the last slide has settled (active === last) and stays on through the
  // contact reveal below. Mobile owns the frame when its breakpoint is active.
  useEffect(() => {
    const publish = () => {
      if (!isDesktop()) return;
      setEdges({
        // Top edge stays off: the accent nav strip is the landing's top
        // treatment now, so the 12px top rail would be a redundant accent-on-
        // accent seam. Side rails frame the card; bottom shows on the last slide.
        top: false,
        bottom: activeRef.current >= TOTAL - 1,
        left: true,
        right: true,
      });
    };
    publish();
    window.addEventListener("scroll", publish, { passive: true });
    window.addEventListener("resize", publish, { passive: true });
    return () => {
      window.removeEventListener("scroll", publish);
      window.removeEventListener("resize", publish);
      clearEdges();
    };
  }, []);

  // Re-publish the bottom edge the instant the active slide changes (the scroll
  // listener above also covers this, but active can settle without a fresh event).
  useEffect(() => {
    if (!isDesktop()) return;
    document.documentElement.dataset.edgeBottom =
      active >= TOTAL - 1 ? "on" : "off";
  }, [active]);

  // On return from an inner page ("ALL PROJECTS" nav link), smooth-scroll to
  // the slide flagged in sessionStorage before navigation.
  //
  // The flag is consumed INSIDE the timeout, not in the effect body. Under
  // React StrictMode (dev) effects run twice (run → cleanup → run); consuming
  // it in the body would let the first run remove it + the cleanup clear the
  // timeout, leaving the second run with nothing to do — so the scroll never
  // fired. Reading in the body but removing in the timeout keeps it robust.
  //
  // We also pre-set activeRef + active to the destination so the snap-on-
  // scroll-end machine reinforces the target instead of the (lagging) origin.
  useEffect(() => {
    let flag: string | null = null;
    try { flag = sessionStorage.getItem("jk-return-slide"); } catch {}
    if (!flag) return;
    const idx = parseInt(flag, 10);
    if (!Number.isFinite(idx) || idx <= 0) return;
    // Wait for the carousel layout + Lenis to be ready, then scroll.
    const t = setTimeout(() => {
      try { sessionStorage.removeItem("jk-return-slide"); } catch {}
      activeRef.current = idx;
      setActive(idx);
      scrollToSlideIndex(idx, 1.0);
    }, 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="relative mx-[12px] hidden min-[1024px]:block overflow-clip"
      style={{ height: `${TOTAL * 100}vh` }}
    >
      {/* Pinned chrome + card group. The OUTER sticky is transparent so the
          accent base canvas (page.tsx) shows through the top nav strip — at the
          very top of the page the nav rides directly on the accent. Scrolling off
          the intro slides the card up flush (the strip closes), and the nav ink
          crosses from on-accent white to on-card dark — the same parallax the rest
          of the deck uses. */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Light card surface — the per-slide --panel-bg tint. Driven by
            stripY (136 → -40) via transform: translateY (compositor-only, no
            layout reflow per frame). The card is calc(100%+40px) tall so its
            bottom stays flush with the container even at full -40px shift;
            the extra 40px is clipped by overflow-hidden when unshifted.
            Bottom corners round only at the end of the deck (last slide). */}
        <motion.div
          style={{ y: stripY, height: "calc(100% + 40px)" }}
          className={cn(
            "absolute top-0 inset-x-0 flex flex-col overflow-hidden bg-panel-bg will-change-transform [transition:border-radius_0.45s_ease]",
            "rounded-t-[2rem]",
            active >= TOTAL - 1 ? "rounded-b-[2rem]" : "rounded-b-none",
          )}
        >
          {/* Directional accent gradient — prev colour bleeds in from the top,
              next colour from the bottom. Inert during a settled slide (prev ===
              next === current accent), most visible at the midpoint of a transition.
              Clipped by the card's overflow-hidden; sits below content. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background: `
                linear-gradient(to bottom, var(--accent-prev-rgba, transparent) 0%, transparent 32%),
                linear-gradient(to top,    var(--accent-next-rgba, transparent) 0%, transparent 32%)
              `,
            }}
          />

          {/* Pagination moved to sticky container sibling — see below */}

          {/* Centered stage — card gets the larger share; tight gap to the copy.
              pb-[176px] on the intro (= STRIP 136 + STRIP_OVER 40) compensates for
              the card being taller than its visible area, re-centering the content
              within the actual visible strip. Transitions away on slide change. */}
          <div className={cn(`${PAD} flex flex-1 items-center [transition:padding-bottom_0.45s_ease]`, active === 0 && "pb-[176px]")}>
            <div className="grid w-full grid-cols-12 items-center gap-x-12">
              <div className="relative col-span-5 min-h-[520px]">
                <AnimatePresence mode="wait">
                  <CarouselText key={SLIDES[active].slug} item={SLIDES[active]} activeMorphRef={activeMorphRef} />
                </AnimatePresence>
              </div>
              <div className={cn("relative col-span-7 h-[66vh] [transition:margin-top_0.45s_ease]", active === 0 && "-mt-[68px]")}>
                {SLIDES.map((item, i) => (
                  <CarouselCard key={item.slug} item={item} index={i} pos={springPos} active={active} activeMorphRef={activeMorphRef} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pagination lives here (not inside the card) so top-1/2 references
            the h-screen sticky container — keeping it at true viewport center
            regardless of the card's y-transform. */}
        <Pagination active={active} onJump={scrollToSlideIndex} />

        {/* Persistent nav — fixed top bar, above the card (z-60). Its colour
            crosses white→dark (navInk) as the card rises under it: on the accent
            at the very top, on the card thereafter. The card's overflow-hidden
            clips the deck off the top edge once flush, so the deck never reaches
            the nav. */}
        <motion.div
          style={{ color: navInk, "--nav-leaf-color": navLeafColor } as unknown as React.CSSProperties}
          className={`${PAD} pointer-events-none absolute inset-x-0 top-0 z-[60] flex items-center justify-between pt-14`}
        >
          <div className="pointer-events-auto">
            <NameButton />
          </div>
          <Link
            href="/about"
            className="group pointer-events-auto inline-flex items-center gap-2 font-mono text-eyebrow uppercase tracking-[0.14em] transition-opacity hover:opacity-70"
          >
            About
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/** Right-edge progress pills — a tick per slide; click to jump.
 *  Hover reveals a serif flyout label to the left for quick-nav. */
function Pagination({
  active,
  onJump,
}: {
  active: number;
  onJump: (i: number) => void;
}) {
  return (
    <div className="absolute right-6 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-end gap-3 xl:right-10">
      {SLIDES.map((s, i) => {
        const isActive = i === active;
        const flyoutLabel = s.kind === "intro" ? "Intro" : s.title;
        return (
          <button
            key={s.slug}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`Go to ${flyoutLabel}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex h-5 w-10 cursor-pointer items-center justify-end"
          >
            {/* Flyout tooltip — flies in from the right on per-bar hover */}
            <span
              aria-hidden
              className="pointer-events-none absolute right-full mr-4 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
            >
              <span className="inline-flex flex-col items-start gap-1.5 rounded-2xl border border-foreground/10 bg-panel-bg/90 px-5 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.14)] backdrop-blur-md">
                <span className="whitespace-nowrap font-serif text-[1.6rem] font-[700] leading-none text-accent">
                  {flyoutLabel}
                </span>
                <span className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.14em] leading-none text-foreground/50">
                  {s.eyebrow}
                </span>
              </span>
            </span>

            {/* Pill — 4px height */}
            <span
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                isActive
                  ? "w-8 bg-accent"
                  : "w-4 bg-foreground/25 group-hover:w-6 group-hover:bg-foreground/50",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function CarouselCard({
  item,
  index,
  pos,
  active,
  activeMorphRef,
}: {
  item: WorkItem;
  index: number;
  pos: MotionValue<number>;
  active: number;
  activeMorphRef: React.MutableRefObject<(() => void) | null>;
}) {
  // Only the active card and its immediate neighbors run their blob animation;
  // distant off-screen cards hold a static glow so the compositor stays free.
  const isNear = Math.abs(index - active) <= 1;
  const y = useTransform(pos, (p) => `${(index - p) * SPACING}%`);
  const scale = useTransform(pos, (p) =>
    Math.max(MIN_SCALE, 1 - Math.min(Math.abs(index - p), 2) * SCALE_FALLOFF),
  );
  const opacity = useTransform(pos, (p) =>
    Math.max(0, Math.min(1, 1.5 - Math.abs(index - p))),
  );
  const zIndex = useTransform(pos, (p) => Math.round(50 - Math.abs(index - p) * 10));
  // Peeking cards (within 1.5 positions) are hittable so clicking them focuses
  // the card. The focus-vs-navigate decision is made in WorkStage's Link
  // onClick (gated by isActive) — see there.
  const pointerEvents = useTransform(pos, (p) =>
    Math.abs(index - p) < 1.5 ? "auto" : "none",
  );

  const isActive = Math.abs(index - active) < 0.5;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ y, scale, opacity, zIndex, pointerEvents }}
    >
      <WorkStage
        item={item}
        animateBlobs={isNear}
        isActive={isActive}
        onRequestFocus={() => scrollToSlideIndex(index)}
        activeMorphRef={activeMorphRef}
      />
    </motion.div>
  );
}

function CarouselText({ item, activeMorphRef }: { item: WorkItem; activeMorphRef?: React.MutableRefObject<(() => void) | null> }) {
  const isIntro = item.kind === "intro";

  return (
    <motion.div
      className="absolute inset-y-0 left-0 right-0 flex flex-col justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2, ease: "easeIn" } }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>{item.eyebrow}</Eyebrow>
      </div>

      {isIntro ? (
        <h1 className="mt-7 font-serif text-hero text-accent">
          {item.titleLines
            ? item.titleLines.map((line, i) => <span key={i} className="block">{line}</span>)
            : item.title}
        </h1>
      ) : (
        <h2 className="mt-7 font-serif text-hero text-accent">{item.title}</h2>
      )}

      <p className="mt-7 max-w-xl font-sans text-body-lg text-foreground/75">
        {item.blurb}
      </p>

      {item.chips && (
        <div className="mt-8 flex flex-col gap-2.5">
          <div className="flex flex-wrap gap-2.5">
            {item.chips.map((chip) => (
              <span
                key={chip}
                className={cn(
                  "inline-flex items-center rounded-full border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em]",
                  chipStyle(chip),
                )}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        {isIntro ? (
          <>
            <button
              type="button"
              onClick={() => { track("work_cta_click", {}); scrollToSlideIndex(1); }}
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] text-accent-contrast shadow-[0_2px_10px_-4px_rgba(21,19,15,0.22)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-[0_12px_26px_-12px_var(--accent)] active:translate-y-0 active:scale-100 active:duration-100"
            >
              Work
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </button>
          </>
        ) : (
          <Link
            href={item.href ?? "#"}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              track("case_study_open", { slug: item.slug, source: "carousel" });
              const trigger = activeMorphRef?.current;
              if (trigger) { e.preventDefault(); trigger(); }
            }}
            className="group inline-flex cursor-pointer items-center gap-2 font-sans text-caption font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-accent"
          >
            Case study
            <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/** Specular hairline glass border — shared between desktop + mobile cards.
 *  Bright top-left → fades → hair of dark bottom-right. Mask-exclude keeps it
 *  strictly in the 1px border zone without touching card content. */
function SpecularBorder() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[25] rounded-[1rem]"
      style={{
        border: "1px solid transparent",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.04) 45%, rgba(0,0,0,0.10) 100%) border-box",
        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
      }}
    />
  );
}

/** The card stage — edge-to-edge image, no frame, aggressive rounded corners. */
function WorkStage({ item, animateBlobs = true, isActive = true, onRequestFocus, activeMorphRef }: { item: WorkItem; animateBlobs?: boolean; isActive?: boolean; onRequestFocus?: () => void; activeMorphRef?: React.MutableRefObject<(() => void) | null> }) {
  const isClickable = !!item.href;
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const beginMorph = useMorphBegin();

  // Core morph logic, separated from the click event so CarouselText's
  // "Case study" link can fire the same conduit transition.
  const triggerMorph = useCallback(() => {
    if (!imgRef.current || !item.href) return;
    const r = imgRef.current.getBoundingClientRect();
    beginMorph({
      id: item.slug,
      src: item.image ?? "",
      from: { top: r.top, left: r.left, width: r.width, height: r.height },
      fromRadius: 16,
      href: item.href,
    });
  }, [item, beginMorph]);

  // Register this card's trigger in the shared ref when active so the sibling
  // CarouselText can fire the same morph without needing imgRef directly.
  useEffect(() => {
    if (!activeMorphRef || !isActive || item.kind !== "project") return;
    activeMorphRef.current = triggerMorph;
    return () => { if (activeMorphRef.current === triggerMorph) activeMorphRef.current = null; };
  }, [isActive, triggerMorph, activeMorphRef, item.kind]);

  // Conduit transition: modifier-clicks fall through to default (open-in-new-tab).
  const handleMorphClick = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
    e.preventDefault();
    triggerMorph();
  };

  // Springs for 3D tilt — damping raised for a heavier, more luxurious feel;
  // stiffness lowered so the card lags behind the cursor instead of tracking it.
  const rotateX = useSpring(0, { damping: 35, stiffness: 120 });
  const rotateY = useSpring(0, { damping: 35, stiffness: 120 });

  // Springs for specular reflection/gloss (0% to 100% bounds)
  const glossX = useSpring(50, { damping: 25, stiffness: 150 });
  const glossY = useSpring(50, { damping: 25, stiffness: 150 });

  // Transform gloss coordinates into a dynamic radial gradient background style
  const glossBackground = useTransform(
    [glossX, glossY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates from card top-left
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation: maximum 2.5 degrees tilt (subtle, not carnival)
    const MAX_ROT = 2.5;
    const rY = ((mouseX / width) - 0.5) * MAX_ROT * 2; // -4 to 4
    const rX = ((mouseY / height) - 0.5) * -MAX_ROT * 2; // -4 to 4

    rotateY.set(rY);
    rotateX.set(rX);

    // Position gloss sheen under the cursor
    const gX = (mouseX / width) * 100;
    const gY = (mouseY / height) * 100;
    glossX.set(gX);
    glossY.set(gY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glossX.set(50);
    glossY.set(50);
  };

  const shell =
    "relative z-10 w-full overflow-hidden rounded-[1rem] bg-surface shadow-[0_20px_60px_-25px_rgba(0,0,0,0.35)]";

  const renderContent = () => {
    if (!item.image) {
      return (
        <div
          className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-[1rem] bg-accent/10 px-8 text-center"
        >
          <span className="font-mono text-eyebrow uppercase text-accent">
            Confidential · Flagship
          </span>
          <span className="max-w-sm font-sans text-caption text-foreground/60">
            Abstracted before/after and prototype walkthrough land here in Phase&nbsp;4.
          </span>
        </div>
      );
    }

    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        ref={imgRef}
        src={item.image}
        alt={
          item.kind === "intro"
            ? "Justin Kirkey sketching a product flow at the whiteboard"
            : `${item.title} — case study preview`
        }
        loading="lazy"
        className="block aspect-[4/3] w-full rounded-[1rem] object-cover"
      />
    );
  };

  return (
    <div
      className="group relative w-full transition-transform duration-500 hover:scale-[1.015]"
      style={{ perspective: 1000 }}
    >
      {/* Color burst glass blobs. Transform-ONLY motion (rotate + scale) on a
          static organic border-radius — never animate border-radius, which
          forces a per-frame paint + re-blur on these large blurred layers and
          competes with scroll. Only the active card + its neighbors animate
          (animateBlobs); the rest hold a static glow. */}
      {/* Horizontal inset is 2× vertical so the blob bleeds generously into the
          copy area on the left and the frame edge on the right. */}
      <div className="absolute -top-12 -bottom-12 -left-24 -right-24 overflow-visible opacity-[0.44] blur-[80px] pointer-events-none transition-all duration-700 ease-out group-hover:opacity-[0.62] group-hover:blur-[110px] group-hover:-top-16 group-hover:-bottom-16 group-hover:-left-32 group-hover:-right-32">
        {/* Blob 1 - rotating clockwise (accent color) */}
        <motion.div
          className="absolute inset-0 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] will-change-transform"
          style={{ background: "var(--accent)", opacity: 0.72 }}
          animate={animateBlobs ? { rotate: [0, 90, 180, 360], scale: [1, 1.12, 0.92, 1] } : undefined}
          transition={animateBlobs ? { duration: 14, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
        {/* Blob 2 - rotating counter-clockwise (white highlight, creating pastel blend) */}
        <motion.div
          className="absolute -inset-4 rounded-[60%_40%_50%_70%_/_50%_60%_40%_60%] will-change-transform"
          style={{ background: "#ffffff", opacity: 0.58 }}
          animate={animateBlobs ? { rotate: [360, 270, 180, 0], scale: [1, 0.9, 1.1, 1] } : undefined}
          transition={animateBlobs ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined}
        />
      </div>
      <motion.div
        ref={cardRef}
        className={cn(shell, isClickable ? "cursor-pointer" : "")}
        style={{
          rotateX,
          rotateY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {renderContent()}

        {/* Gloss sheen overlay */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay rounded-[1rem]"
          style={{ background: glossBackground }}
        />

        {/* Specular hairline glass border */}
        <SpecularBorder />


        {/* Frosted glass badge + full-card link */}
        {isClickable && (
          <>
            {/* Small badge bottom-left — only shown on the active (focused) card.
                Peeking cards suppress it so the affordance is "click to focus",
                not "click to navigate". Fades + rises 4px on hover. */}
            <div className={cn("pointer-events-none absolute bottom-4 left-4 z-30 translate-y-1 opacity-0 transition-all duration-300 ease-out", isActive && "group-hover:translate-y-0 group-hover:opacity-100")}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/28 px-3.5 py-2 backdrop-blur-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">{item.kind === "intro" ? "About" : "Case study"}</span>
                <span aria-hidden className="text-white/60 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </div>
            <Link
              href={item.href!}
              onClick={(e) => {
                // Peeking (not focused) card → don't navigate; bring it into
                // focus first. preventDefault is honored by Next's <Link>.
                if (!isActive) {
                  e.preventDefault();
                  onRequestFocus?.();
                  return;
                }
                // Focused card → navigate (morph for projects).
                if (item.kind === "project") handleMorphClick(e);
              }}
              className="absolute inset-0 z-40 cursor-pointer rounded-[1rem]"
              aria-label={`View ${item.title} case study`}
            />
          </>
        )}
      </motion.div>

    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: full-screen horizontal swipe carousel                      */
/* ------------------------------------------------------------------ */

function HorizontalCarousel({ className }: { className: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);

  // The slides now live inside the lighter "page card" wrapper (track's first
  // child); the contact is the track's second child. The card is statically
  // positioned, so a slide's offsetLeft is still relative to the track. The
  // contact sits exactly one step past the last slide (card right edge + gap),
  // so the uniform step math still resolves it as index TOTAL.
  const firstSlideEl = (el: HTMLElement): HTMLElement | null =>
    (el.firstElementChild?.firstElementChild as HTMLElement | null) ?? null;

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const firstSlide = firstSlideEl(el);
    if (!firstSlide) return;
    const slideWidth = firstSlide.offsetWidth;
    const step = slideWidth + 12; // gap-3 = 12px
    // P = leading track padding; offsetLeft already includes it.
    const P = firstSlide.offsetLeft;
    el.scrollTo({ left: P + i * step + slideWidth / 2 - el.clientWidth / 2, behavior: "smooth" });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const firstSlide = firstSlideEl(el);
    if (!firstSlide) return;
    const slideWidth = firstSlide.offsetWidth;
    const step = slideWidth + 12;
    const P = firstSlide.offsetLeft;
    const idx = Math.round((el.scrollLeft + el.clientWidth / 2 - P - slideWidth / 2) / step);
    // Upper bound is TOTAL (the appended contact panel), not TOTAL - 1.
    const clamped = Math.max(0, Math.min(idx, TOTAL));
    activeRef.current = clamped;
    setActive(clamped);
    // Publish edges synchronously here (not just in useEffect) so React batching
    // can't skip intermediate active values during fast scrolls — the frame
    // tracks scroll position in real time.
    if (!isDesktop()) {
      setEdges({
        top: true,
        bottom: true,
        left: clamped === 0,
        right: clamped >= TOTAL,
      });
    }
  };

  // Keyboard: right/down → next (or contact footer at last slide), left/up → prev.
  // Guard against firing when the lg+ desktop carousel is visible.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (window.innerWidth >= 1024) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        // The contact panel (index TOTAL) is the rightmost stop on the track.
        if (activeRef.current < TOTAL) goTo(activeRef.current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(Math.max(activeRef.current - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Vertical scroll → horizontal navigation. Lets desktop users with a small
  // viewport (or any mouse-wheel user) scroll down/up naturally and have it
  // advance/retreat the carousel instead of doing nothing (the section is
  // overflow:hidden so vertical scroll would otherwise be swallowed silently).
  //
  // Strategy: if |deltaY| > |deltaX| the gesture is "more vertical" — translate
  // it to a one-slide advance. Horizontal gestures fall through to native snap
  // scroll in the track. A cooldown prevents rapid-fire multi-slide jumps from
  // a single flick.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let cooldown = false;

    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth >= 1024) return; // desktop carousel owns this
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gesture — let native handle
      e.preventDefault();
      if (cooldown) return;
      cooldown = true;
      setTimeout(() => { cooldown = false; }, 500);
      if (e.deltaY > 0) {
        if (activeRef.current < TOTAL) goTo(activeRef.current + 1);
      } else {
        goTo(Math.max(activeRef.current - 1, 0));
      }
    };

    // Vertical touch swipe — complements horizontal native snap scrolling.
    let touchStartY: number | null = null;
    let touchStartX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      if (window.innerWidth >= 1024) return;
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (window.innerWidth >= 1024 || touchStartY === null || touchStartX === null) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      const dx = touchStartX - e.changedTouches[0].clientX;
      touchStartY = null; touchStartX = null;
      // Only intercept if swipe is more vertical than horizontal, and past threshold.
      if (Math.abs(dy) < 30 || Math.abs(dx) > Math.abs(dy)) return;
      if (dy > 0) {
        if (activeRef.current < TOTAL) goTo(activeRef.current + 1);
      } else {
        goTo(Math.max(activeRef.current - 1, 0));
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Keep root theme vars in sync with the visible panel (drives the page frame +
  // section glow). The appended contact panel (index TOTAL) rides the brand
  // fuchsia on the base canvas.
  useEffect(() => {
    // Desktop Carousel manages these vars itself (scoped to its section element
    // for --panel-bg). Skip on desktop to avoid conflicting writes.
    if (isDesktop()) return;
    const isContactPanel = active >= TOTAL;
    // The section bg is ALWAYS the accent base canvas; --panel-bg only tints the
    // lighter "page card" that wraps the slides. On the contact the card has
    // ended (peeking left) so it keeps the LAST project's tint, while the base
    // canvas / accent goes brand fuchsia (mirrors the desktop reveal).
    const { panelBg, accent } = isContactPanel
      ? { panelBg: SLIDE_THEMES[TOTAL - 1].panelBg, accent: SITE_ACCENT }
      : SLIDE_THEMES[active] ?? SLIDE_THEMES[0];
    document.documentElement.style.setProperty("--accent", accent);
    document.documentElement.style.setProperty("--panel-bg", panelBg);
    // rgba variant for the section radial-gradient glow (gradients can't use hex vars directly)
    const r = parseInt(accent.slice(1, 3), 16);
    const g = parseInt(accent.slice(3, 5), 16);
    const b = parseInt(accent.slice(5, 7), 16);
    document.documentElement.style.setProperty("--accent-glow", `rgba(${r},${g},${b},0.18)`);

    // Page-frame edges (mobile / horizontal layout): top & bottom are the
    // cross-axis → always on; the left edge shows only on the first panel; the
    // right edge shows only on the final (contact) panel. Desktop owns the frame
    // when its breakpoint is active.
    if (!isDesktop()) {
      setEdges({
        top: true,
        bottom: true,
        left: active === 0,
        right: isContactPanel,
      });
    }
  }, [active]);

  // Re-publish edges on resize so the mobile layout reclaims the frame when the
  // viewport crosses below the desktop breakpoint; clear theme + edges on unmount.
  useEffect(() => {
    const onResize = () => {
      if (isDesktop()) return;
      setEdges({
        top: true,
        bottom: true,
        left: activeRef.current === 0,
        right: activeRef.current >= TOTAL,
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--panel-bg");
      document.documentElement.style.removeProperty("--accent-glow");
      clearEdges();
    };
  }, []);

  const isContact = active >= TOTAL;
  const item = SLIDES[active];
  const theme = SLIDE_THEMES[active];
  const isIntro = item?.kind === "intro";

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-[100svh] overflow-hidden bg-accent [transition:background-color_0.45s_ease]",
        className
      )}
    >
      {/* Chrome: name/counter row + pagination — replaced by ← BACK on contact */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-col gap-5 pt-10">
        {isContact ? (
          <button
            type="button"
            onClick={() => goTo(0)}
            className="flex cursor-pointer items-center gap-1.5 pl-[3.25rem] font-mono text-eyebrow uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:text-white sm:pl-14"
          >
            <span aria-hidden>←</span>
            Back
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between px-8">
              {/* Name always sits over the lighter card (its peek on the contact),
                  so it stays dark. ABOUT + dots cross over to the accent base canvas
                  on the contact, so those adapt to white. */}
              <button
                type="button"
                onClick={() => goTo(0)}
                className="cursor-pointer font-mono text-eyebrow uppercase text-foreground transition-colors duration-300 hover:text-accent"
              >
                Justin Kirkey
              </button>
              {/* Template literal (not cn): twMerge would drop the custom
                  `text-eyebrow` size as if it conflicted with the text color, leaving
                  ABOUT at the 16px base size while the name stays 12px. */}
              <Link
                href="/about"
                className="font-mono text-eyebrow uppercase tracking-[0.14em] text-foreground transition-colors duration-300 hover:text-accent"
              >
                About
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2.5 px-8">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === active
                      ? "h-1.5 w-6 bg-accent"
                      : "h-1.5 w-1.5 bg-foreground/25",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Image scroll track — absolute inset-0 so shadow falls freely, no strip boundary */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="scrollbar-none absolute inset-0 flex snap-x snap-mandatory overflow-x-auto gap-3 p-[12px] [scroll-padding-inline:12px]"
      >
        {/* Lighter "page card" surface — fills the viewport height (chrome rides
            on it) and envelops intro + projects with rounded corners, ending
            before the contact. The contact (next sibling) sits on the bare accent
            base canvas beyond its right edge. Static position so nested slides
            keep the track as their offsetParent (scroll math). */}
        <div className="flex flex-shrink-0 gap-3 rounded-[16px] bg-panel-bg pl-5 pr-3 [transition:background-color_0.45s_ease]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.slug}
            className="relative w-[calc(100vw-3rem)] flex-shrink-0 snap-center pt-[6.25rem] sm:w-[calc(100vw-3.5rem)]"
          >
              {/* Accent glow blob — uses each slide's own accent so off-screen peeks stay correct */}
              <div className="pointer-events-none absolute -inset-8 blur-[72px] opacity-[0.22]">
                <motion.div
                  className="absolute inset-0 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] will-change-transform"
                  style={{ background: SLIDE_THEMES[i]?.accent ?? "var(--accent)", opacity: 0.65 }}
                  animate={Math.abs(i - active) <= 1 ? { rotate: [0, 90, 180, 360], scale: [1, 1.1, 0.92, 1] } : undefined}
                  transition={Math.abs(i - active) <= 1 ? { duration: 16, repeat: Infinity, ease: "easeInOut" } : undefined}
                />
              </div>

              {/* Card shell */}
              {slide.href ? (
                <Link
                  href={slide.href}
                  className="relative block overflow-hidden rounded-[1rem] bg-surface shadow-[0_24px_32px_-8px_rgba(0,0,0,0.32)]"
                  style={{ height: "min(calc((100vw - 6rem) * 0.75), 52svh)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slide.image ?? ""}
                    alt={slide.kind === "intro" ? "Justin Kirkey at the whiteboard" : `${slide.title} — case study`}
                    loading="eager"
                    className="block h-full w-full object-cover"
                  />
                  <SpecularBorder />
                </Link>
              ) : (
                <div
                  className="relative overflow-hidden rounded-[1rem] bg-surface shadow-[0_24px_32px_-8px_rgba(0,0,0,0.32)]"
                  style={{ height: "min(calc((100vw - 6rem) * 0.75), 52svh)" }}
                >
                  {slide.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.image}
                      alt="Justin Kirkey at the whiteboard"
                      loading="eager"
                      className="block h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full flex-col items-center justify-center gap-3 px-8 text-center"
                      style={{ background: "var(--accent)", opacity: 0.1 }}
                    >
                      <span
                        className="font-mono text-eyebrow uppercase"
                        style={{ color: "var(--accent)", opacity: 1 }}
                      >
                        Confidential · Flagship
                      </span>
                    </div>
                  )}
                  <SpecularBorder />
                </div>
              )}
          </div>
        ))}
        </div>

        {/* Contact — sits on the BASE CANVAS, beyond the lighter card's rounded
            right edge. Transparent so it INHERITS the section's base-canvas color
            (var(--accent)): the project accent while it peeks past the last
            project, brand fuchsia once it's the active panel. */}
        <div
          key="contact"
          className="relative w-[calc(100vw-3rem)] flex-shrink-0 snap-center pt-[6.25rem] sm:w-[calc(100vw-3.5rem)]"
        >
          <div
            className="relative flex flex-col px-7 py-9"
            style={{ height: "calc(100svh - 8.5rem)" }}
          >
            <Eyebrow mark={false} className="text-white/50">
              Contact
            </Eyebrow>
            <h2 className="mt-4 font-serif text-display-sm font-semibold leading-[0.98] text-white">
              Let&rsquo;s build something.
            </h2>
            <p className="mt-4 max-w-sm font-sans text-body text-white/70">
              Open to Lead, Staff, and Director product-design roles — and
              AI-first teams where designing and building live in the same person.
            </p>

            <div className="mt-7 flex flex-col items-start gap-5">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("resume_click", { location: "work_intro" })}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-mono text-caption uppercase tracking-[0.12em] text-[#D7355D] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.18)]"
              >
                Résumé
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <div className="flex flex-col items-start gap-3">
                <ArrowLink
                  href={SITE.socials.linkedin}
                  external
                  className="text-white/80 hover:text-white"
                >
                  LinkedIn
                </ArrowLink>
                <EmailCopyButton
                  email={SITE.socials.email}
                  dark
                />
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-1 border-t border-white/20 pt-5 font-mono text-eyebrow uppercase text-white/40">
              <span>{SITE.name}</span>
              <span>Built with agentic AI · {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Text area — starts at card bottom, no background so shadow bleeds
          naturally through it. Hidden on the contact panel (self-contained). */}
      {!isContact && (
      <div
        style={{ top: "calc(min(calc((100vw - 6rem) * 0.75), 52svh) + 7rem)" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeOut", delay: 0.1 }}
            style={{ "--accent": theme.accent } as React.CSSProperties}
            className="pointer-events-auto px-8 pt-8"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Eyebrow mark={false}>{item.eyebrow}</Eyebrow>
            </div>

            {isIntro ? (
              <h1 className="mt-3 font-serif text-display-sm text-accent">
                {item.title}
              </h1>
            ) : (
              <h2 className="mt-3 font-serif text-display-sm text-accent">
                {item.title}
              </h2>
            )}

            <p className="mt-2 line-clamp-2 font-sans text-body text-foreground/75">
              {item.blurb}
            </p>

            {isIntro && item.chips && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <span
                    key={chip}
                    className={cn(
                      "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]",
                      chipStyle(chip),
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
              {isIntro ? (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-caption uppercase tracking-[0.12em] text-accent-contrast shadow-[0_2px_10px_-4px_rgba(21,19,15,0.22)] transition-all duration-300"
                  >
                    Work
                    <span
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </button>
                </>
              ) : (
                <ArrowLink href={item.href ?? "#"}>Case study</ArrowLink>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Fallback: clean stacked list (reduced-motion only)                 */
/* ------------------------------------------------------------------ */

function StackedList({ className }: { className: string }) {
  return (
    // Reduced-motion fallback (replaces the carousel). app/page.tsx wraps <Work/>
    // in an accent-coloured div for the carousel's corner cutouts; this section
    // is otherwise transparent, so it needs its own light surface or it inherits
    // that fuchsia and the accent-coloured headings render invisibly on it.
    <section id="work" className={cn("relative bg-background", className)}>
      <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:px-10">
        <div className="mb-16 flex items-center justify-between">
          <span className="font-mono text-eyebrow uppercase text-foreground">
            Justin Kirkey
          </span>
          <Link
            href="/about"
            className="font-mono text-eyebrow uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent"
          >
            About →
          </Link>
        </div>
        {SLIDES.map((item) =>
          item.kind === "intro" ? (
            <IntroBlock key={item.slug} item={item} />
          ) : (
            <StackedItem key={item.slug} item={item} />
          ),
        )}
      </div>
      {/* The carousel hosts Contact as its final panel; the StackedList fallback
          has no such panel, so render it here or reduced-motion users (esp. on
          mobile, where the desktop FooterReveal is hidden) get no contact/résumé. */}
      <Contact dark />
    </section>
  );
}

function IntroBlock({ item }: { item: WorkItem }) {
  return (
    <div className="mb-16">
      <Eyebrow>{item.eyebrow}</Eyebrow>
      <h1 className="mt-6 font-serif text-display-sm text-accent">{item.title}</h1>
      <p className="mt-6 font-sans text-body-lg text-muted">{item.blurb}</p>
      {item.chips && (
        <div className="mt-6 flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em]",
                chipStyle(chip),
              )}
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      {item.image && (
        <div className="mt-8">
          <WorkStage item={item} />
        </div>
      )}
      <div className="mt-8">
        <ArrowLink href={item.href ?? "/about"}>About Justin</ArrowLink>
      </div>
    </div>
  );
}

function StackedItem({ item }: { item: WorkItem }) {
  const theme = getProjectTheme(item.slug);
  return (
    <Reveal as="div" className="mb-6">
      <div
        style={theme ? ({ ["--accent" as string]: theme.accent } as React.CSSProperties) : undefined}
      >
      <div className="flex flex-wrap items-center gap-3">
        <Eyebrow>{item.eyebrow}</Eyebrow>
      </div>
      <h2 className="mt-4 font-serif text-title text-accent">{item.title}</h2>
      <p className="mt-3 font-sans text-body text-foreground/75">{item.blurb}</p>
      <div className="mt-5">
        <WorkStage item={item} />
      </div>
      <div className="mt-5">
        <ArrowLink href={item.href ?? "#"}>
          {item.flagship ? "Flagship case study" : "Case study"}
        </ArrowLink>
      </div>
      </div>
    </Reveal>
  );
}
