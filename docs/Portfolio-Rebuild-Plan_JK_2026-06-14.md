# Portfolio Rebuild Plan — Claude Code
**Justin Kirkey · June 14, 2026**

A build plan for rebuilding justinkirkey.com in Claude Code, taking the *grammar* (not a clone) of robin-noguier.com, elevated to a light/confident aesthetic and anchored to the AI-native-design-leader positioning. Scoped to ~1 week of focused effort, reusing existing case-study assets.

---

## Guiding decisions

- **Take Robin's grammar, not his signature effect.** Confident type scale, scroll-synced color theming, work-on-color-panels, tiny consistent parts kit, overlapping title-on-image, scroll-reveal text. Find ONE signature motion that is *yours* and ties to the AI-native story — don't clone the curved-plane WebGL (it reads as derivative of a famous site, and it's the one thing that can eat the whole week).
- **Positioning leads.** Hero states the AI-native-design-leader-who-builds identity in the first sentence, with immediate proof (Marcos Rezende model). This is the single biggest content change vs. the current site.
- **Work dominates; canvas recedes.** Reverse the current dark-on-dark problem — product screenshots are the largest, brightest things on the page.
- **FF Cloud flagship is case study #1**, presented on its own large stage with a tasteful "Confidential / NDA" treatment where needed.
- **Reuse the dual-thread method:** Sonnet for deterministic execution (layout, type, color theming, scroll reveals); Opus for judgment/visual-spike work (the signature motion, the hero).

---

## The six moves to steal (ranked by reward-to-effort)

| # | Move | Effort | Reward | Take it? |
|---|---|---|---|---|
| 1 | Scroll-synced color theming (bg + title + accent interpolate per project) | Low | High | **Yes — first** |
| 2 | Two-typeface system at fearless scale (display serif + geometric sans, 120px+ titles) | Low | High | **Yes** |
| 3 | Scroll-reveal text (grey→full as it enters viewport) | Low | Med | **Yes** |
| 4 | Overlapping title-on-image hero (white + outlined letterforms where crossing) | Low | High | **Yes** |
| 5 | Work-on-color-panels + tiny consistent parts kit (eyebrow label + content; two-col narrative/metadata; all-caps arrow links) | Med | High | **Yes** |
| 6 | Curved WebGL image planes (three.js shader, scroll-driven warp) | High | High | **Defer / optional** — only if days remain; or design your own simpler signature motion |

---

## Tech stack (proposed)

- **Framework:** React + Vite (matches your FF prototype stack — reuse muscle memory) OR Next.js if you want static export + better SEO for findability. Lean Vite for speed unless SEO weighs heavily.
- **Styling:** Tailwind + CSS variables for the theming system (CSS vars are what make move #1 cheap).
- **Animation:** Framer Motion for scroll-reveal + transitions; Lenis for smooth scroll. These two get you 80% of the "polish" feel cheaply.
- **Signature motion (if pursued):** react-three-fiber / OGL for any WebGL; otherwise a CSS/Framer custom effect.
- **Hosting:** Cloudflare Pages (you already know it from FF) or Vercel. Auto-deploy from main; preview URLs per branch.
- **Type:** license/​self-host a high-contrast display serif (Canela, Fraunces — Fraunces is free) + a clean geometric sans (consider your existing Plus Jakarta Sans for continuity, or Söhne/Aeonik-style).

---

## Information architecture

Keep the strong bones; elevate presentation.

**Landing (one page):**
1. Hero — AI-native identity + proof + signature motion. Keep your distinctive concept (hexagon / red-slash) only if it survives the light-first redesign; otherwise redesign.
2. Selected work — each case study on its own large color panel (FF Cloud first), with a "Confidential" pill where needed.
3. Brief "how I work" / AI-native build thesis — short, judgment-forward, NOT a textbook process section (tighten the current long one).
4. Logo wall — two tiers: clients/employers + featured-on/recognition (Marcos model).
5. About teaser → links to fuller About.
6. Personality (keep the cats, music, etc.).
7. Contact.

**Case study template (repeatable):**
- Accent-color hero, overlapping title on hero image.
- White content section: two columns — narrative left, metadata right (Role / Users / Methods / Subject / Timeframe — your existing meta-row, relaid out).
- Large before/after and product shots on light stages (device framing, generous padding).
- A dedicated section for judgment/trade-offs (the senior differentiator), not just process.
- Impact section with hard or directional numbers.
- For FF Cloud specifically: a prominent **"How I worked with AI"** section (dual-thread model, model-selection discipline, prototype-as-handoff-vehicle) — the part no one else can show.

**About page:**
- Split hero (photo + serif greeting + intro + socials) — Robin model.
- Big statement line.
- "AT WORK" philosophy block (eyebrow + narrative).
- Experience timeline (pull richer Director-scale language from LinkedIn).
- Optional candid-photo horizontal gallery.

---

## Asset inventory (gather before/during build)

Existing (reuse):
- 5 live case studies' imagery (already have).
- Brand logo wall assets.
- Personality photos (cats etc.).
- Portrait.

New / to create:
- **FF Cloud flagship assets:** before/after screenshots (abstracted — no real names), dashboard hero shot, design-system/token highlights, prototype walkthrough stills or short screen-capture clips, the "how I worked with AI" diagram (dual-thread model visual).
- **Per-project accent palettes** (for the color-theming system).
- **Confidential/NDA pill** treatment.
- Display + sans **font files** (licensed/self-hosted).
- Any **signature-motion** asset (if WebGL: curved-plane texture handling; if custom: design the effect).
- Updated **résumé PDF** (link target — keep in sync with the resume workstream).
- OG/social share image + favicon.

---

## Phased build sequence (~1 week)

**Day 1 — Skeleton + design system.** Scaffold Vite/Next + Tailwind + Lenis. Establish type scale (fearless display sizes), color-variable system, the tiny parts kit (eyebrow label, two-col block, arrow link). Get the light-first canvas right. *(Sonnet execution.)*

**Day 2 — Landing + scroll-color theming (move #1).** Build the work section with per-project color panels and scroll-synced theming. Logo wall. This alone should already feel top-tier. *(Sonnet, with an Opus pass on the theming feel.)*

**Day 3 — Case study template + scroll-reveal + overlapping title (moves #3, #4, #5).** Build the repeatable template; port one existing case study into it end-to-end as the reference implementation.

**Day 4 — FF Cloud flagship case study.** Build the new flagship using the template + the dedicated "how I worked with AI" section. (Content drawn from the separate FF Cloud case-study outline.)

**Day 5 — About page + port remaining case studies.** Split hero, philosophy block, experience timeline, gallery. Migrate the other 4 case studies into the new template.

**Day 6 — Signature motion spike (move #6, optional) + polish.** Time-boxed: attempt the WebGL/custom hero motion. If it's not singing by end of day, ship without it — the site is already strong. *(Opus judgment work.)*

**Day 7 — Polish, polish, polish.** Responsive/mobile, contrast/accessibility pass (fix the old site's sin), performance, motion restraint review, copy proofing, OG image, analytics. Cross-check positioning consistency vs. resume + LinkedIn.

---

## Risks / honest cautions

- **The WebGL hero is the week-killer.** Time-box it hard (Day 6 only). Don't let it block a shippable site.
- **Rebuilding a *design* portfolio with AI is meta-scrutinized** — "good enough" code that yields slightly-off visuals reads worse here than anywhere. The bar is "demonstrably better than the Framer version," and polish is the whole game. Budget Day 7 accordingly.
- **Don't clone Robin** — his site is famous; a 1:1 copy is a liability. Take grammar, add your own signature.
- **Keep positioning in sync** across site/resume/LinkedIn as you go.
- **FF Cloud confidentiality:** abstract per your comfort level; the "Confidential" pill is the idiom. (Optional: a quick courtesy note to your FF contact.)

---

*Companion docs: Career-Materials-Audit_JK_2026-06-13 (the cross-artifact audit) and the forthcoming FF Cloud flagship case-study outline. If we move into the actual build, a fresh thread with these as project files is the clean way to work.*
