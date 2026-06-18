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
};

/** The site's brand "home" accent (not tied to any one project). */
export const SITE_ACCENT = "#D7355D";

export const PROJECT_THEMES: ProjectTheme[] = [
  { slug: "ff-cloud", label: "Cloud", accent: "#40539e", panelBg: "#ebedf6", panelFg: "#15130f" },
  { slug: "cap-app-redesign", label: "Image Capture", accent: "#6d54c9", panelBg: "#ece9f8", panelFg: "#15130f" },
  { slug: "ff-reports", label: "Violet & Magenta", accent: "#b1309a", panelBg: "#f6e7f3", panelFg: "#15130f" },
  { slug: "modus-v", label: "Modus X", accent: "#0e8c9c", panelBg: "#e2f2f4", panelFg: "#15130f" },
  { slug: "metrolinx-presto", label: "PRESTO", accent: "#3e8e57", panelBg: "#e8f2eb", panelFg: "#15130f" },
  { slug: "experiencepoint-impact", label: "Impact", accent: "#c8860e", panelBg: "#f8efdd", panelFg: "#15130f" },
];

/** Look up a project's theme by slug (falls back to undefined). */
export function getProjectTheme(slug: string): ProjectTheme | undefined {
  return PROJECT_THEMES.find((t) => t.slug === slug);
}
