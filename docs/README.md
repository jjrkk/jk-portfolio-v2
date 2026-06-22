# Build log & current state — justinkirkey.com

> **Living doc — the single source of truth for "where we are."** `/CLAUDE.md`
> is the vision/north-star (and wins conflicts); this file is the running state.
> Keep it updated as the build progresses. A fresh Claude Code session should
> read this first.

## Quick status (updated 2026-06-17)

- **Phases 0, 1, 2: DONE.** The landing (homepage) is fully built.
- **About page (`/about`): DONE.** Split hero → big statement → "At work"
  philosophy → experience timeline → clients & recognition → off-the-clock →
  contact. Persistent top nav (name ↔ ABOUT/CONTACT) on both pages + breakpoints.
- **Phase 3 — case-study template: BUILT (reference port done).** Repeatable
  `/work/[slug]` template + **Violet & Magenta** (`ff-reports`) ported as the
  reference. Sections: accent hero w/ overlapping title-crossing → overview
  (narrative + meta) → narrative beats w/ light-stage figures → judgment/
  trade-offs → impact metrics → next-study → contact. Static-export verified
  (`/work/ff-reports` prerenders; unknown slugs 404 until ported). Copy is DRAFT;
  NPS metric is a placeholder pending Justin's real figure.
- **Deliberate IA change (2026-06-17):** the landing is now **cases-only** —
  carousel + contact footer. Everything biographical (how-I-work thesis, logo
  wall, about teaser, personality) **moved to `/about`**. This supersedes the
  multi-section landing in `/CLAUDE.md`'s IA (CLAUDE.md updated to match).
- **Next: Phase 4 — FF Cloud flagship** (template + "How I worked with AI"
  section + dual-thread diagram), then Phase 5 ports the remaining 4 studies.
- **Stack:** Next.js 16 static export · Tailwind v4 · Lenis · Framer Motion ·
  Fraunces + Geist. Target host: Cloudflare Pages.
- **Repo:** [github.com/jjrkk/jk-portfolio-v2](https://github.com/jjrkk/jk-portfolio-v2) (public). Branch → preview URL; merge to `main` → auto-deploys.
- **Cloudflare Pages:** `jk-portfolio-v2.pages.dev`. Build: `npm run build` → `out/`, `NODE_VERSION=20`.

## How to run / verify

- `npm run dev` → `localhost:3000`. `npm run build` → static export to `out/`.
- Desktop **≥1024px** shows the carousel; narrower shows a stacked fallback.
- Living design-system reference: **`/styleguide`** (noindex).

## Companion docs (vision / source material)

| File | What it is |
|---|---|
| `/CLAUDE.md` | North-star: positioning, aesthetic, locked stack, IA, guardrails. |
| [`Portfolio-Rebuild-Plan_JK_2026-06-14.md`](./Portfolio-Rebuild-Plan_JK_2026-06-14.md) | Build sequence + robin-noguier.com grammar deconstruction. |
| [`Career-Materials-Audit_JK_2026-06-13.md`](./Career-Materials-Audit_JK_2026-06-13.md) | Positioning + market context + what the site must fix. |
| [`Case-Study-Asset-Spec_JK_2026-06-17.md`](./Case-Study-Asset-Spec_JK_2026-06-17.md) | Light-stage asset spec — export targets, lighting rule, V&M shot list. |
| [`FF-Cloud-Case-Study-Outline_JK_2026-06-14.md`](./FF-Cloud-Case-Study-Outline_JK_2026-06-14.md) | Flagship case-study plan (Phase 4). |
| [`FF-Cloud-Context-Pack-12-June-2026.md`](./FF-Cloud-Context-Pack-12-June-2026.md) + PRD | Flagship source — abstract per confidentiality rules. |

> ⚠️ **FF Cloud confidentiality:** no real colleague names; soften roadmap /
> dev-hours / internal financials; NDA pill on UI; frame to *delivered/approved*,
> never shipped-to-users.

## Locked decisions

- **Stack:** Next.js static export (`output: "export"`) → Cloudflare Pages. SEO is
  why (full per-page HTML at build).
- **Fonts:** Fraunces (display serif) + Geist (sans) + Geist Mono, self-hosted via
  `next/font` ([`app/fonts.ts`](../app/fonts.ts)). Display tiers are weight **600**.
- **Palette (Direction A — branded & harmonized)**, in [`lib/theme.ts`](../lib/theme.ts):
  - Site brand accent: **fuchsia `#D7355D`** (intro slide, frame, default `--accent`).
  - Per-project: FF Cloud `#40539e` (future-blue) · Image Capture `#6d54c9` ·
    Violet & Magenta `#b1309a` · Modus V `#0e8c9c` · PRESTO `#3e8e57` · Impact `#c8860e`.
  - Intro panel tint `#f8ecf2`; light-first base canvas `#f7f5f2`.
- **The entire homepage is one pinned carousel** (intro "Justin 101" + 6 case
  studies), followed by post-carousel sections.

## Landing architecture (the non-obvious bits)

- **[`components/sections/Work.tsx`](../components/sections/Work.tsx)** — the carousel (client component).
  - Pinned section: `height = SLIDES.length × 100vh`, with a `sticky` inner stage.
  - One eased "playhead" (`easedPos`, smootherstep dwell) drives **all** of: the
    peeking-deck card transforms, the left-pane copy crossfade, and `--panel-bg` /
    `--accent` (written to **`document.documentElement`** so the page frame follows).
  - Cards: **4:3**, `object-cover`, **rounded directly on the `<img>`** (the 3D-tilt
    shell uses `transform-style: preserve-3d`, which breaks `overflow:hidden` clipping).
    Cards also have a 3D cursor tilt + specular gloss + morphing color blobs (Justin's add).
  - Navigation, all via `scrollToSlideIndex()` (Lenis-aware): arrow keys, **wheel/touch
    one-card-per-gesture snapping** (capture-phase listener that blocks Lenis), pagination
    pills, the name link, and the WORK CTA.
  - **Mobile = fully horizontal, no vertical scroll** (`HorizontalCarousel`, `< 1024px`):
    the landing locks to one `100svh`. **Surface model mirrors desktop:** the section bg is the
    **accent base canvas**; a single rounded **`bg-panel-bg` "page card" wraps the intro +
    projects** (a flex container; slides stay individual snap targets inside it, statically
    positioned so the scroll math keeps the track as their offsetParent). The card fills the
    viewport height (chrome rides on it) and **ends with a rounded right edge**; the **Contact
    is the final snap sibling, on the bare base canvas beyond that edge** (white-on-accent,
    fixed fuchsia). So you scroll *past* the card's right edge to the contact and still see the
    card peeking left — exactly like the desktop reveal shows the card above the footer.
    Chrome adapts: name stays dark (always over the card peek), ABOUT + dots flip white over
    the accent. The desktop vertical `FooterReveal`/`Contact` reveal is `hidden min-[1024px]:block`
    in `app/page.tsx`.
  - Reduced-motion → `StackedList` fallback.
- **Page-surface "edge" paradigm (the border logic).** Three stacked surfaces: base
  canvas (full-bleed `--accent`) → lighter card surface (`--panel-bg`) → content. A frame
  edge shows on a side **only when there's no more content to scroll to in that direction**
  (physical "keep going" cue); the scroll axis differs by layout, so the *cross-axis* rails
  are always on:
  - **Desktop (vertical):** top at the very top; bottom once the **last slide settles**
    (stays on through the contact reveal); left/right rails always on.
  - **Mobile (horizontal):** left only on the first panel; right only on the contact panel;
    top/bottom rails always on.
  - **Mechanism:** whichever scrolling surface is visible publishes
    `data-edge-{top,bottom,left,right} = "on"|"off"` on `documentElement` (`setEdges`/
    `clearEdges` in `Work.tsx`, breakpoint-guarded by `isDesktop()`); **[`PageFrame.tsx`](../components/PageFrame.tsx)**
    is a pure consumer mapping those to its `±10px` insets. Static pages publish nothing →
    PageFrame falls back to a vertical default (top-at-top, bottom-at-bottom, side rails on).
    *This paradigm is meant to propagate to About + case studies later.*
- **[`components/PageFrame.tsx`](../components/PageFrame.tsx)** — fixed box-shadow flood reading
  `var(--accent)`; fills the viewport corners. `--accent` is themed per slide, then **eases to
  fuchsia past the carousel** (scroll listener in `Work.tsx` + `hexLerp` in [`lib/color.ts`](../lib/color.ts)).
- **[`components/SmoothScroll.tsx`](../components/SmoothScroll.tsx)** — Lenis; exposes `window.lenis`
  for programmatic smooth scroll; disabled under reduced-motion.
- **Post-carousel sections** (in [`app/page.tsx`](../app/page.tsx)): `LogoWall` · `BuildThesis`
  (how-I-work) · `AboutTeaser` · `Personality` · `Contact` — light-first, parts kit.
- **Data:** `lib/work.ts` (`SLIDES = INTRO + WORK`), `lib/theme.ts` (palette), `lib/site.ts`
  (metadata + socials). **Parts kit:** `components/ui/*`. Tokens: `app/globals.css`.

## Case-study template (Phase 3)

- **Route:** [`app/work/[slug]/page.tsx`](../app/work/[slug]/page.tsx) — server component;
  `generateStaticParams()` emits one static page per slug in `CASE_STUDIES` (others 404),
  `generateMetadata()` per study. Static-export safe (`params` awaited).
- **Content:** [`lib/case-studies.ts`](../lib/case-studies.ts) — the `CaseStudy` shape is the
  template's contract (hero · overview + meta · narrative beats w/ figures · judgment/
  trade-offs · impact metrics · next). **Copy DRAFT; metrics flagged `placeholder`.**
- **Template:** [`components/sections/case-study/*`](../components/sections/case-study/) —
  `CaseStudyTemplate` assembles `CaseHero` (the title-on-image **crossing** effect: a white
  FILL title behind the image + an identical stroked-outline copy above it, so the switch
  happens exactly on the image edge — robust across breakpoints, desktop-only; mobile stacks),
  `CaseOverview` (TwoColumn + MetaList), `CaseNarrative` (+ `CaseFigure` light stage),
  `CaseJudgment` (numbered trade-offs on `--panel-bg`), `CaseImpact` (big accent metrics),
  `CaseNext` (themed to the *next* project's accent), then the dark `Contact`.
- **Per-project theming:** the wrapper sets `--accent`/`--panel-bg` inline (SSR, no flash) for
  page content; `ProjectAccent` (client) mirrors `--accent` onto documentElement for the fixed
  PageFrame and restores brand on unmount. **Don't also render `AccentReset` here** — its parent
  effect would override the project accent back to fuchsia.
- **Nav:** `PageNav` gained a `tone="light"` prop (white over the accent hero).

## Dev gotchas (save yourself time)

- **Turbopack dev caches CSS hard.** After editing `globals.css` tokens, if colors/
  utilities look stale: `rm -rf .next` and restart. `next build` is always correct.
- **The headless preview tools desync scroll/screenshots** (Lenis + window sizing):
  blank scrolled screenshots and one-frame-stale reads are *tooling artifacts, not bugs*.
  Verify via DOM `eval`; a fresh server / hard refresh fixes the live page. If the
  carousel ever looks frozen on slide 1, that's the same scroll-measurement quirk — hard refresh.
- `npm audit` shows 2 moderate advisories from a `postcss` copy inside Next's own
  tooling — **ignore** (don't `--force`; it tries to downgrade Next to 9.x).

## Asset & content TODO (needs Justin)

- **Logo wall:** export brand wordmark **SVGs** (it's typographic now). Confirm the
  client list + recognition items (`components/sections/LogoWall.tsx`).
- **FF Cloud:** real flagship hero assets (Phase 4); the current sign-in PNG is interim.
- **Case-study imagery:** re-export to **4:3** on light stages (old assets sit on dark
  bg). Define the spec in Phase 3.
- **Personality:** cats/music photos from the old site if wanted (interim photos in
  place; the last candid is the cats — matches the copy).
- **Résumé:** add `public/resume.pdf` (Contact links to it; 404 until added).
- **Copy** across intro / thesis / about / personality / contact is **DRAFT** — wordsmith.

## Build sequence — remaining

- **Phase 3 — case-study template** ✅ DONE: repeatable template built + Violet & Magenta
  ported as the reference. Asset spec written →
  [`Case-Study-Asset-Spec_JK_2026-06-17.md`](./Case-Study-Asset-Spec_JK_2026-06-17.md).
  **Still open (needs Justin):** re-export V&M imagery per the spec (source already in
  `assets/case-studies/ff-reports/`, incl. real before/afters); real NPS figure; copy refinement.
- **Phase 4 — FF Cloud flagship** [NEXT]: template + the "How I worked with AI" section +
  dual-thread diagram. Confidentiality rules. Opus.
- **Phase 5 — About page** (`/about`) + a global nav + port the remaining case studies.
- **Phase 6 — signature motion** spike (optional; the card tilt/blobs already lean signature).
- **Phase 7 — polish**: responsive/mobile, a11y/contrast, **perf (images are large PNGs)**,
  motion-restraint, copy proofing, OG/SEO finalize (sitemap/robots/JSON-LD done; OG art),
  analytics, base-canvas tone exploration, DNS cutover.
- **Infra: DONE** — repo live at github.com/jjrkk/jk-portfolio-v2; Cloudflare Pages at jk-portfolio-v2.pages.dev. DNS cutover (justinkirkey.com → Cloudflare) happens in Phase 7.

## Model plan (per phase)

Opus for taste-setting / the flagship / judgment work; Sonnet for deterministic
execution. Switch with `/model` at phase boundaries.

---

### Decision log (chronological highlights)

- **Phase 0:** scaffolded Next static export + Tailwind v4 + Lenis; SEO build-ins
  (metadata, JSON-LD Person, sitemap, robots, OG placeholder); fonts locked.
- **Phase 1:** type scale, color-variable system, parts kit (`components/ui`), styleguide.
- **Phase 2:** landing. Evolved from stacked panels → **pinned peeking-deck carousel**
  (whole homepage), then the post-carousel sections. Many refinements: palette tweaks
  (fuchsia brand, future-blue FF Cloud, cooler intro tint), bolder display weight, the
  rich card treatment (tilt/gloss/blobs), 4:3 IMAX-ish cards, snap scrolling, pagination
  pills, keyboard nav, the accent page-frame + fuchsia hand-off.
