"use client";

import { useEffect, useState } from "react";

/**
 * Accent frame around the whole viewport — the BASE CANVAS peeking out from
 * behind the lighter card surface, colored with the live --accent.
 *
 * "Page-surface paradigm": a frame edge is visible on a side only when there is
 * no more content to scroll to in that direction. When content remains, the card
 * bleeds off that edge (no border) as a physical "keep going" cue. The scroll
 * axis differs by layout, so the *surface that owns scrolling* publishes its four
 * edges to the root element as `data-edge-{top,bottom,left,right} = "on" | "off"`,
 * and this component is a dumb consumer that maps them to the ±10px insets.
 *
 * Static pages (About, case studies) publish nothing — they fall back to the
 * default below: vertical scroll, so top shows at the top, bottom shows at the
 * bottom, and the side rails are always on.
 */
const EDGE_ATTRS = [
  "data-edge-top",
  "data-edge-bottom",
  "data-edge-left",
  "data-edge-right",
] as const;

type Edges = { top: boolean; bottom: boolean; left: boolean; right: boolean };

export function PageFrame() {
  const [edges, setEdges] = useState<Edges>({
    top: true,
    bottom: false,
    left: true,
    right: true,
  });

  // Top inset is larger on desktop (28px) to give the landing intro strip more
  // breathing room. Mobile uses the standard 12px rail to keep the nav tight.
  // Start at 12 to match SSR output; useEffect corrects to 28 on desktop after hydration.
  const [topInset, setTopInset] = useState(12);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setTopInset(mq.matches ? 28 : 12);
    const handler = (e: MediaQueryListEvent) => setTopInset(e.matches ? 28 : 12);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const d = root.dataset;
      const controlled =
        d.edgeTop != null ||
        d.edgeBottom != null ||
        d.edgeLeft != null ||
        d.edgeRight != null;

      if (controlled) {
        // A scrolling surface is driving the frame — read its published edges.
        // Missing attribute defaults to "on" for the rails, "off" for bottom.
        setEdges({
          top: d.edgeTop !== "off",
          bottom: d.edgeBottom === "on",
          left: d.edgeLeft !== "off",
          right: d.edgeRight !== "off",
        });
        return;
      }

      // Default: vertical-scroll static page. Top at top, bottom at bottom,
      // side rails always on.
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      setEdges({
        top: scrollY <= 24,
        bottom: maxScroll <= 0 || scrollY >= maxScroll - 24,
        left: true,
        right: true,
      });
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    // Picks up edge changes published outside a scroll event (e.g. the carousel
    // settling onto its last slide, or a breakpoint hand-off on resize).
    const mo = new MutationObserver(apply);
    mo.observe(root, { attributes: true, attributeFilter: [...EDGE_ATTRS] });

    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      mo.disconnect();
    };
  }, []);

  const top = edges.top ? topInset : -topInset;
  const bottom = edges.bottom ? 12 : -12;
  const left = edges.left ? 12 : -12;
  const right = edges.right ? 12 : -12;

  // A corner rounds only when BOTH its adjacent edges are "on" (capped). If
  // either is bleeding (off), the corner stays square so the rail runs perfectly
  // straight. R matches the content sections' rounded-[2rem] = 32px so the
  // frame arc and content arc are flush — no visible gap in the corner zone.
  // Safe at 12px inset: the condition already sets R=0 when an edge is off,
  // so the arc never bleeds from a hidden edge back into the viewport.
  const R = 32;
  const topLeft = edges.top && edges.left ? R : 0;
  const topRight = edges.top && edges.right ? R : 0;
  const bottomRight = edges.bottom && edges.right ? R : 0;
  const bottomLeft = edges.bottom && edges.left ? R : 0;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[90]"
      style={{
        top,
        right,
        bottom,
        left,
        borderTopLeftRadius: topLeft,
        borderTopRightRadius: topRight,
        borderBottomRightRadius: bottomRight,
        borderBottomLeftRadius: bottomLeft,
        boxShadow: "0 0 0 100vmax var(--accent)",
        transition:
          "top 0.45s ease, right 0.45s ease, bottom 0.45s ease, left 0.45s ease, border-radius 0.45s ease",
      }}
    />
  );
}
