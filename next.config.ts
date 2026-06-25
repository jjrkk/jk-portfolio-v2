import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // LOCKED (see CLAUDE.md): static export (SSG) → Cloudflare Pages.
  // `output: "export"` emits a fully static `out/` dir at build time.
  // Omitted in dev: Next.js 16 enforces export mode in dev too, breaking
  // the dev server (all routes 404). Only apply for production builds.
  ...(!isDev && { output: "export" }),

  // Static export can't use the Next Image Optimization server, so images are
  // served as-authored. We deliver our own correctly-sized assets instead.
  images: { unoptimized: true },

  // Emit `about/index.html` rather than `about.html` — Cloudflare Pages serves
  // clean trailing-slash URLs from this layout without extra redirect rules.
  trailingSlash: true,
};

export default nextConfig;
