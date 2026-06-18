/**
 * Type system — the "two-typeface system used fearlessly" (CLAUDE.md grammar #2).
 *
 *  - Display serif: Fraunces — high-contrast, optical-sized, Canela-adjacent.
 *    Carries the 120px+ titles. Self-hosted: next/font downloads it at build
 *    time and serves it from our origin (no runtime Google request → no FOUT,
 *    fast LCP). Swap-to-licensed-Canela later is a single change here.
 *  - Geometric sans: Geist — shipped by the `geist` package fully offline
 *    (no build-time network), so reproducible builds on Cloudflare. Neutral,
 *    precise; lets the serif be the star. (General Sans is a drop-in swap if
 *    we want a warmer geometric voice.)
 *  - Mono: Geist Mono — reserved for code/diagram captions (the AI-build story).
 *
 * Each exposes a CSS variable consumed by Tailwind's @theme in globals.css.
 */
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const serif = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  // Expose Fraunces' expressive display axes so large titles can push optical
  // size + softness in CSS (font-variation-settings) during Phase 1 type work.
  axes: ["opsz", "SOFT", "WONK"],
});

export const sans = GeistSans; // .variable === "--font-geist-sans"
export const mono = GeistMono; // .variable === "--font-geist-mono"
