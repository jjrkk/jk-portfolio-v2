import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // LOCKED (see CLAUDE.md): static export (SSG) → Cloudflare Pages.
  // `output: "export"` emits a fully static `out/` dir: per-page HTML + meta
  // tags at build time, which is the whole reason we chose Next over Vite
  // (SEO / link-unfurl crawlers get complete content on first load).
  output: "export",

  // Static export can't use the Next Image Optimization server, so images are
  // served as-authored. We deliver our own correctly-sized assets instead.
  images: { unoptimized: true },

  // Emit `about/index.html` rather than `about.html` — Cloudflare Pages serves
  // clean trailing-slash URLs from this layout without extra redirect rules.
  trailingSlash: true,
};

export default nextConfig;
