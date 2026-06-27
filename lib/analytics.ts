/**
 * Typed GA4 event tracking helper.
 *
 * All custom event names and parameter shapes live here so naming never drifts.
 * No-ops in development and when gtag is not available (SSR, blocked by browser).
 *
 * Usage:
 *   import { track } from "@/lib/analytics";
 *   track("resume_click", { location: "contact_footer" });
 */

// ── Event catalogue ──────────────────────────────────────────────────────────

/** High-intent conversion events — marked as Key Events in GA4. */
type ConversionEvents = {
  /** Résumé PDF opened. */
  resume_click: { location: "contact_footer" | "about_hero" | "work_intro" };
  /** Email address copied to clipboard. */
  email_copy: { location: "contact_footer" | "about_hero" };
  /** LinkedIn profile opened. */
  linkedin_click: { location: "contact_footer" | "about_hero" };
  /** Live prototype / external demo opened (FF Cloud flagship). */
  live_prototype_click: { slug: string };
};

/** Engagement events — reveal which work attracts attention. */
type EngagementEvents = {
  /** A carousel slide became active (desktop peeking-deck). */
  carousel_slide_view: { slug: string; index: number };
  /** "Case study" morph link or carousel text link clicked. */
  case_study_open: { slug: string; source: "carousel" | "case_next" };
  /** WORK ↓ CTA on the intro slide clicked. */
  work_cta_click: Record<string, never>;
  /** Bottom "Next case study" panel clicked. */
  case_next_click: { from_slug: string; to_slug: string };
};

type EventMap = ConversionEvents & EngagementEvents;

// ── Tracker ──────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a typed GA4 custom event. Safe to call unconditionally — no-ops in dev
 * and whenever gtag is not loaded.
 */
export function track<E extends keyof EventMap>(
  event: E,
  params: EventMap[E],
): void {
  if (process.env.NODE_ENV !== "production") return;
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}
