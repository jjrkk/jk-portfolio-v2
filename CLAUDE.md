# CLAUDE.md — justinkirkey.com portfolio rebuild

> Project north-star for Claude Code. This file auto-loads each session. It encodes the decisions so the build doesn't drift across days. If something here conflicts with an in-the-moment idea, this file wins unless we deliberately change it here first.

> 📍 **NEW SESSION? READ [`docs/README.md`](docs/README.md) FIRST** — it's the living build log: current status, locked decisions made during the build, the landing architecture, dev gotchas, asset/content TODOs, and what's next. This CLAUDE.md is the *vision*; that file is *where we actually are*. **As of 2026-06-17: Phases 0–2 + About + Phase 3 done (landing, About, and the repeatable case-study template with Violet & Magenta ported); next is Phase 4 (FF Cloud flagship).**

---

## What this is

A from-scratch rebuild of Justin Kirkey's design portfolio (justinkirkey.com). The previous Framer site and an earlier abandoned CC rebuild are **reference only** — we are not extending them. We are building toward a new vision, not renovating the old one.

**The person:** Justin Kirkey — AI-native Product Design Leader. 15+ yrs, healthcare/regulated depth, director-level people leadership, and — the key differentiator — he *builds and ships* with agentic AI (Claude Code), not just designs for AI products.

**The goal:** a top-tier 2026 design-leader portfolio that gets Justin into Lead/Staff/Director Product Design roles (and design-engineer-flavored AI-first roles). The site itself is craft evidence — it must read as the work of someone with real taste, and it must demonstrate the build-with-AI capability by existing.

---

## Positioning (must be consistent across the whole site)

- **Primary identity:** AI-native Product Design Leader who builds.
- **Hero must, in the first breath, convey BOTH** design leadership AND hands-on AI building — with immediate proof. (Reference model hero structure — name + AI-native identity + one-line current proof + a line of personality. Justin has a *better* proof point: he builds with agentic tools, not just designs AI products. Say it first.)
- Keep PM range as a differentiator, not the headline.
- Tone: confident, warm, judgment-forward. Not flashy-for-its-own-sake.

---

## Aesthetic direction

**Light-first, work-dominant.** This is the single biggest change from the old dark site. The canvas recedes; the work is the largest, brightest thing on the page. (The old site's sin was navy-on-navy with small, low-contrast screenshots — do not repeat it.)

**Take the GRAMMAR of robin-noguier.com, never clone it.** His site is famous; a 1:1 copy is a credibility liability and reads as derivative. Justin will bring his own palette, content, and at least one signature flourish. The grammar worth taking:
1. Scroll-synced color theming (background + big title + accent interpolate per project). **Highest reward-to-effort — build early.**
2. A two-typeface system used fearlessly at large scale (high-contrast display serif + clean geometric sans; titles 120px+).
3. Scroll-reveal on text (subtle, as content enters viewport).
4. Overlapping title-on-image on case-study heroes (white + outlined letterforms where crossing).
5. Work-on-color-panels + a tiny, consistent parts kit (eyebrow label + content; two-col narrative/metadata; all-caps arrow links). **Restraint is why it reads as expensive.**
6. (Optional, time-boxed) A signature motion. Do NOT clone Robin's curved-plane WebGL — design Justin's own, ideally tied to the AI-native story. This is the one thing that can eat the whole week; time-box hard and ship without it if needed.

**Feel:** premium, calm, confident, generous whitespace, restrained motion. Borders/structure over heavy shadow. Personality present but controlled (the cats, music, etc. stay).

---

## Tech stack

- **LOCKED — Next.js, static export (SSG), deployed to Cloudflare Pages.** Chosen because SEO is a stated priority: Next renders full per-page HTML at build time, so crawlers and link-preview bots (Google name-search, LinkedIn/Slack/email unfurls) get complete content + meta tags + OG image on first load — without bolting on a prerender plugin. Craft/polish ceiling is identical to Vite (all the animation libs below are framework-agnostic React), so nothing is sacrificed on the visual side. **Fallback:** if Next's static-export constraints cause friction mid-build (a few SSR-only features don't work in pure static export), drop to Vite + React + a prerender plugin (`vite-plugin-ssg` / `react-snap`) — same craft, ~80% of the SEO benefit. Don't switch hosts; Cloudflare stays either way.
- **SEO build-ins to wire up (Phase 0/7):** per-page `<title>`/meta via Next metadata API, an OG/social share image, `sitemap.xml` + `robots.txt`, structured data (JSON-LD `Person`) for name-search, semantic HTML headings.
- **Styling:** Tailwind + CSS custom properties (CSS vars are what make the scroll-color-theming cheap).
- **Animation:** Framer Motion (scroll-reveal, transitions) + Lenis (smooth scroll). These two deliver most of the "polish" feel cheaply.
- **Any WebGL (only if pursuing the signature motion):** react-three-fiber / OGL.
- **Analytics:** stack-agnostic — pick one (Cloudflare Web Analytics is free + privacy-friendly + zero-config on Pages; Plausible/Fathom paid but nice; GA4 if you want the full funnel). Wire in Phase 7.
- **Hosting:** **Cloudflare Pages** — Justin knows it (FF prototype host), no commercial-use restriction (matters for a job-hunt site), effectively unlimited bandwidth, free custom-domain + SSL, preview URL per branch. Hosts Next static export fine.
- **Domain:** www.justinkirkey.com (custom domain on the host above).

## Typography

- **LOCKED (2026-06-30):** PP Pangaia (display serif) + PP Object Sans (geometric
  sans, body/UI) + PP Supply Mono (labels/eyebrows). Self-hosted via plain
  `@font-face` in `app/globals.css` (files in `public/fonts/`) — see
  `docs/README.md`'s "Locked decisions" for why not `next/font`.
  - This superseded the original Phase 0 placeholder pick (Fraunces + Geist),
    which is what the candidates below originally referred to (kept for
    historical context — no longer live options).
  - Display serif candidates considered: Fraunces (free, high-contrast,
    Canela-adjacent), or licensed Canela.
  - Sans candidates considered: Plus Jakarta Sans (continuity with FF work),
    or a Söhne/Aeonik-style face.

---

## Information architecture

**Landing (one page) — REVISED 2026-06-17: cases-only.** The landing is now the pinned work carousel + a contact footer, nothing else. All biographical/secondary sections moved to the About page to keep the landing "all about the cases." (Original multi-section plan struck below for history.)
1. Hero — AI-native identity + proof + (optional) signature motion. *(= the carousel's intro "Justin 101" slide.)*
2. Selected work — each case study on its own large color panel; **FF Cloud flagship first**; "Confidential" pill where needed.
3. ~~Brief "how I work" / AI-native build thesis~~ → **moved to About ("At work" block).**
4. ~~Logo wall~~ → **moved to About (clients & recognition).**
5. ~~About teaser~~ → **replaced by the full About hero.**
6. ~~Personality section~~ → **moved to About (off-the-clock).**
7. Contact — kept as the landing's closing footer (also repeats on About).

**Persistent nav (added 2026-06-17):** name top-left ↔ a single context link top-right (ABOUT on the landing, CONTACT on About), both breakpoints. Landing uses the carousel chrome; inner pages use `components/PageNav.tsx`.

**Case-study template (repeatable component):**
- Accent-color hero; overlapping title on hero image.
- White content section: two columns — narrative left, metadata right (Role / Users / Methods / Subject / Timeframe — the existing meta-row, relaid out vertically).
- Large before/after + product shots on LIGHT stages (device framing, generous padding). Screenshots are the hero — never small.
- A dedicated **judgment / trade-offs** section (the senior differentiator), not just process.
- Impact section with hard or directional numbers.
- **FF Cloud only:** a prominent **"How I worked with AI"** section (dual-thread model, model-selection discipline, prototype-as-handoff-vehicle). This is the uncopyable part — give it room. Consider a custom dual-thread workflow diagram (an ownable flourish).

**About page:** split hero (photo + serif greeting + intro + socials) → big statement line → "AT WORK" philosophy block (eyebrow + narrative) → experience timeline (pull richer Director-scale language from LinkedIn) → optional candid-photo gallery.

---

## Build sequence (~1 week, phase-tracked)

- **Phase 0 — Setup:** scaffold Next.js (static export) + Tailwind + Lenis; commit CLAUDE.md; lock fonts; repo + Cloudflare Pages project + preview deploys working; stub the SEO build-ins (metadata, sitemap, robots, OG image placeholder).
- **Phase 1 — Design system + parts kit:** type scale, color-variable system, eyebrow/two-col/arrow-link primitives, light-first canvas.
- **Phase 2 — Landing + scroll-color theming (grammar move #1):** work section with per-project color panels; logo wall.
- **Phase 3 — Case-study template (moves #3/#4/#5):** build the repeatable template; port ONE existing case study as reference implementation.
- **Phase 4 — FF Cloud flagship:** build using the template + the "how I worked with AI" section. (Content from the FF Cloud case-study outline doc.)
- **Phase 5 — About page + port remaining 4 case studies.**
- **Phase 6 — Signature motion spike (optional, time-boxed to one day).** Ship without it if not singing.
- **Phase 7 — Polish:** responsive/mobile, contrast/accessibility pass (fix the old site's sin), performance, motion-restraint review, copy proofing, finalize OG image + SEO build-ins (sitemap/robots/JSON-LD), analytics, DNS cutover. Cross-check positioning consistency vs. resume + LinkedIn.

---

## Content sources & assets

- **Reuse from old site (direction-neutral):** copy, image assets, case-study data structure/slug routing, portrait, logo-wall assets, personality photos.
- **Rebuild (do not inherit):** design tokens, hero, process section, case-study grid treatment.
- **New assets to create:** FF Cloud before/afters (abstracted, NDA pill), design-system highlight graphics, the dual-thread AI workflow diagram, per-project accent palettes, signature-motion asset (if pursued), updated résumé PDF (link target), OG/social image + favicon.
- **Per-case-study mining (Justin's task):** surface real impact NUMBERS/outcomes not on the old site — especially PRESTO, Synaptive/Modus V (ExperiencePoint already has strong metrics). These elevate the rewritten case studies.

---

## Keyboard & accessibility rules (global, non-negotiable)

Every page must satisfy these three things — they're wired once and maintained by convention:

1. **`<main id="main-content" tabIndex={-1}>`** on every page. The `tabIndex={-1}` lets the `<SkipLink>` move keyboard focus here programmatically without putting `<main>` in the tab order.
2. **`<SkipLink>`** is already in `layout.tsx` — first child of `<body>`. Do not remove it or add a second one.
3. **`:focus-visible` ring** is in `globals.css` — do not add per-component focus styles; the global rule covers everything and shifts with the accent token automatically.

Lenis is configured with `keyEvents: true` (explicit in `SmoothScroll.tsx`), so Home / End / arrow keys / Page Up / Page Down all work smoothly via the smooth scroller.

Future interactive components (carousels, modals, dropdowns) should additionally handle `Escape` to dismiss and arrow keys to navigate within the component — but that's per-component work, not the baseline above.

---

## Do-nots / guardrails

- Don't clone Robin Noguier — grammar only, plus Justin's own palette + signature.
- Don't go dark/work-receding — light-first, work-dominant, always.
- Don't ship small or low-contrast screenshots — the old site's failure; screenshots are heroes on light stages.
- Don't let the WebGL signature motion block a shippable site — time-box to Phase 6.
- Don't over-build the process section — short and judgment-forward.
- **FF Cloud confidentiality:** no real colleague names; soften unreleased roadmap, dev-hour figures, internal financials, internal "competitive liability"-type quotes (paraphrase the idea, not the internal voice); product screenshots OK with a tasteful Confidential/NDA pill; frame to what was *delivered/approved*, never a shipped-to-users outcome.
- Keep positioning in sync across site / resume / LinkedIn as the build progresses.

---

## Companion docs (load into the build thread as project files)

- `Career-Materials-Audit_JK_2026-06-13` — cross-artifact critique + market context + punch-list.
- `Portfolio-Rebuild-Plan_JK_2026-06-14` — Robin deconstruction + build sequence detail.
- `FF-Cloud-Case-Study-Outline_JK_2026-06-14` — flagship case-study content plan.
- `FF-Cloud-Context-Pack` + PRD — source material for the flagship (abstract per confidentiality rules above).
