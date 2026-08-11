/**
 * Per-project accent palette — the fuel for scroll-color theming (grammar #1).
 *
 * Direction A (LOCKED): "branded & harmonized." Each accent is derived from the
 * project's real brand / case-study imagery, then normalized to one saturation
 * band so the scroll journey reads as a single curated palette, not five logos.
 * The journey runs magenta → violet → teal → green → amber.
 *
 * Light-first application: `accent` is full strength (titles, links, eyebrow
 * mark); `panelBg` is a light tint used behind a work panel so the screenshots
 * stay the brightest layer. Phase 2 interpolates --accent / --panel-bg between
 * these as the viewer scrolls.
 *
 * NOTE: this is the seed set Justin approved (5 panels). Adding case studies
 * later means slotting new accents into the same saturation band — be selective
 * so the harmony holds. The Future Fertility studies form a magenta→violet
 * family; the FF Cloud flagship owns the magenta anchor.
 */

export type ProjectTheme = {
  slug: string;
  label: string;
  accent: string; // full-strength accent
  panelBg: string; // light tint for the section panel background
  panelFg: string; // readable ink on the panel
  /** Text/icon colour rendered on the accent fill. Defaults to near-white
   *  (globals.css --accent-contrast). Set to dark ink for light-value accents
   *  (e.g. bright yellows) that can't hold white text at WCAG 3:1+. */
  accentContrast?: string;
};

/** The site's brand "home" accent (not tied to any one project). */
export const SITE_ACCENT = "#D7355D";

/** The brand-default "wall"/page-surface color (landing intro + post-carousel
 *  rest state, About, PageFrame, Contact). Re-darkened a step per Justin's
 *  steer (2026-08-07) — once the intro card (INTRO_PANEL_BG) went almost
 *  white, the wall needed to sit a bit deeper again to keep the two surfaces
 *  legibly distinct; still nowhere near the original "too grey" value.
 *  Deepened again (2026-08-10) within the same blue-grey hue family so the
 *  wall→card boundary carries real contrast — settled on a light/wispy step
 *  (not the bolder first attempt) per Justin's steer to keep the resting
 *  wall atmospheric and save saturated color for the case-study accent
 *  walls (see globals.css's --wall comment for the full history). Must
 *  stay in sync with --wall's :root default in globals.css — same
 *  manual-sync convention as SITE_ACCENT / --accent. */
export const WALL_LIGHT = "#dde0ee";

/** Intro slide's own card surface — almost white, just a whisper cool, so the
 *  INTRO_BLOB glow (kept at full strength, unchanged) does the work of
 *  reading as "cool/blue" rather than the flat surface itself. Iterated twice
 *  lighter per Justin's steer (2026-08-07): full tint felt "too blue" as a
 *  dominant surface, then a lighter tint still read as a distinct surface
 *  color rather than a near-white one. Must stay in sync with --panel-bg's
 *  :root default in globals.css (first paint, before Work.tsx hydrates). */
export const INTRO_PANEL_BG = "#fbfcfe";

/** Intro card's decorative color-burst blob — a paler tint from FF Cloud's
 *  own blue family (see PROJECT_THEMES's ff-cloud accent) rather than its
 *  full-strength value, so the coordinated-palette tie-in stays but the blob
 *  reads as a soft wash instead of a saturated pigment (lightened alongside
 *  INTRO_PANEL_BG for the same reason). Decoupled from --accent (which stays
 *  brand fuchsia on the intro for the headline/CTA/eyebrow) via its own
 *  --blob channel — see Work.tsx. Must stay in sync with --blob's :root
 *  default in globals.css. */
export const INTRO_BLOB = "#93a4d9";

/** The brand-default "background" canvas color (About's content card, case-
 *  study neutral narrative sections, the post-carousel panel-bg hand-off in
 *  Work.tsx). Re-tinted cool (2026-08-08) to join --wall's hue family instead
 *  of the old warm-paper scale — same manual-sync convention as SITE_ACCENT /
 *  WALL_LIGHT: must stay in sync with --background's :root default in
 *  globals.css. */
export const BACKGROUND_LIGHT = "#f4f5fa";

export const PROJECT_THEMES: ProjectTheme[] = [
  { slug: "ff-cloud", label: "Cloud", accent: "#40539e", panelBg: "#ebedf6", panelFg: "#15130f" },
  { slug: "cap-app-redesign", label: "Image Capture", accent: "#6d54c9", panelBg: "#ece9f8", panelFg: "#15130f" },
  { slug: "ff-reports", label: "Violet & Magenta", accent: "#b1309a", panelBg: "#f6e7f3", panelFg: "#15130f" },
  { slug: "modus-v", label: "Modus X", accent: "#0e8c9c", panelBg: "#e2f2f4", panelFg: "#15130f" },
  { slug: "metrolinx-presto", label: "PRESTO", accent: "#3e8e57", panelBg: "#e8f2eb", panelFg: "#15130f" },
  { slug: "experiencepoint-impact", label: "Impact", accent: "#F2CA3F", panelBg: "#fdf6d8", panelFg: "#15130f", accentContrast: "#15130f" },
];

/** Look up a project's theme by slug (falls back to undefined). */
export function getProjectTheme(slug: string): ProjectTheme | undefined {
  return PROJECT_THEMES.find((t) => t.slug === slug);
}
