/**
 * Single source of truth for site-wide constants.
 * Imported by metadata (layout), sitemap, robots, and JSON-LD so positioning
 * language stays consistent across every surface (a CLAUDE.md guardrail).
 */

export const SITE = {
  name: "Justin Kirkey",
  // Positioning spine — keep in sync with resume + LinkedIn (CLAUDE.md).
  role: "AI-native Product Design Leader",
  url: "https://www.justinkirkey.com",
  // First-breath proof: design leadership AND hands-on building with agentic AI.
  description:
    "AI-native Product Design Leader who builds. 15+ years across healthcare and regulated products — and ships production-grade work with agentic AI, not just designs for it.",
  // Used for OG/Twitter cards; replaced with the finalized art in Phase 7.
  ogImage: "/og-image.png",
  // TODO(phase-7): confirm exact handles before launch; feeds JSON-LD `sameAs`.
  socials: {
    linkedin: "https://www.linkedin.com/in/justinkirkey/",
    email: "justin.kirkey@gmail.com",
  },
} as const;

/**
 * Top-level routes. Drives the sitemap today; will drive primary nav later.
 * Case-study slugs get appended here in Phase 3+ as they come online.
 */
export const ROUTES = [
  { path: "/", label: "Work", priority: 1.0 },
  { path: "/about", label: "About", priority: 0.8 },
] as const;
