# Page transitions — plan & status

> Working doc for the "premium microanimation" effort: thoughtful transitions
> when navigating between pages, to lift the site from "nice, mostly static" to
> "this person obsesses over craft." Read this + `docs/README.md` first.

## Guiding principle (canon)

**The surface is continuous.** Anything present on both sides of a navigation
should *move*, never pop. The **accent colour is the connective tissue**. Motion
is **expo-out** (`cubic-bezier(0.16, 1, 0.3, 1)`), ~0.5–0.7s, never bouncy, and
**always reduced-motion-gated** (transition becomes a plain navigation).

## DONE — the shared-element "conduit" morph (landing → case study)

Shipped in commit `6ec0a37`. A reusable cross-route shared-element system:

- **`components/morph/MorphProvider.tsx`** — mounted in `app/layout.tsx` *outside*
  the route tree (sibling to `{children}`, alongside `PageFrame`), so its clone
  overlay survives navigation. Renders a `position: fixed` clone at `z-[200]`.
  - `useMorphBegin()` — **source** trigger. Captures the clicked element's image
    rect + src, spawns the clone exactly over it (seamless hand-off), navigates.
  - `useMorphTarget(id)` — **destination**. Registers its rect on mount (via
    `useLayoutEffect`), holds itself invisible (`opacity: 0`) until the clone
    lands, then reveals. Matched to the source by a shared `id` (the slug).
  - FLIP animation: clone animates `top/left/width/height/borderRadius` from the
    source rect → target rect. `object-cover` handles the aspect-ratio change
    (card 4:3 → hero 16:11). Expo-out, 620ms.
  - Guards: reduced-motion + modifier-clicks (cmd/ctrl/shift/middle) → plain
    `router.push`. Safety bail (~900ms) clears the clone if no target registers
    (e.g. an unbuilt case-study route).
- **Wired:** `Work.tsx` `WorkStage` project cards (source, `onClick` on the
  full-card Link, gated to `kind === "project"`) → `CaseHero` →
  `HeroImageTilt morphId={study.slug}` (target). The hero img is held invisible
  by `HeroImageTilt`'s `opacity: hidden ? 0 : 1`.
- **Why it reads as continuous here:** the landing card image
  (`ff-reports-card.webp`, 4:3) and the case-study hero (`ff-reports-hero.png`,
  16:11) are the *same artwork at different crops*, so the morph looks like the
  image repositioning, not swapping.

### Known rough edge to verify/fix
- **Dev "hang" (~400ms) before the clone flies** — the clone sits at the source
  position while the destination route compiles/mounts in dev. In the
  **production static build** the destination is prebuilt + prefetched, so this
  should collapse to ~1 frame. **First task in the new thread: verify on the
  deployed build (or a local `next build && next start`).** If it still lags,
  hold the clone in a subtle "lifted"/scaled state while `target` is null so the
  wait feels intentional rather than frozen.

### Bug fixed along the way (don't reintroduce)
- `useMorphTarget`'s `useLayoutEffect` must depend on the **stable**
  `reportTarget` (useCallback `[]`), NOT the whole `ctx` object — `ctx` is
  recreated each render, so depending on it causes an infinite
  setState→render→effect loop ("Maximum update depth exceeded"). Provider's
  context value is `useMemo`'d.

---

## NEXT — to do (in priority order)

> **Status (2026-06-24):** items 1–3 below are **DONE and deployed** (commits
> `6b2b9bf` morph timing, `595836e` About fade, `3509c82` initial-load aperture).
> Only item 4's **back-transition** remains, and it's **deliberately deferred**
> until more case studies exist. Kept below for the rationale/history.

### 1. ✅ DONE — Verify + polish the case-study morph
- Verified on the prod build (dev hang gone). Morph duration tuned **620ms →
  780ms** (`6b2b9bf`). Kept the restrained / present-on-land accent (no flood).
- *Still optional, deferred:* the background hard-cuts landing-pink →
  case-study-magenta at the nav instant; a cross-dissolve of the two surfaces
  would be the next level if it ever feels abrupt. Both in-family, so low priority.

### 2. ✅ DONE — About page surface transition (`595836e`)
- Shipped as a **pure-opacity surface-enter fade**: a reusable
  [`PageTransition`](../components/PageTransition.tsx) wraps the content inside
  `<main>`, so the fuchsia accent canvas shows instantly (continuous from the
  landing) while the content blooms in (500ms expo-out). Pure opacity (no
  y-translate) to avoid any transform/sticky interaction. Reduced-motion → instant.
- Note: the landing intro card ("Justin 101") links to `/about` and is
  deliberately **excluded** from the morph (`kind === "project"` gate). If we
  ever want the portrait to be a conduit from somewhere, the primitive supports
  it — just give a source a matching `useMorphTarget` id.

### 3. ✅ DONE — Initial page load aperture (`3509c82`)
- Shipped: the accent frame opens from **full-bleed fuchsia → the 12px rails**
  center-out on first paint, reusing PageFrame's box-shadow-flood mechanism
  ([`IntroAperture`](../components/IntroAperture.tsx) + `@keyframes
  intro-aperture-open` in `globals.css`). **Once per session** (sessionStorage
  gate via a pre-paint inline script in `layout.tsx`), landing-only, 0.95s
  expo-out, reduced-motion → instant.
- *Tuning levers if revisited:* the expo-out is very front-loaded (the full-
  fuchsia beat is a brief flash) — add a tiny `0%`/`~8%` hold to dwell longer; and
  the card/title "bloom on the tail" (a mount-stagger on the intro slide) was left
  out of v1 since the aperture reveal is already the entrance.
- *Dev note:* React logs a `__DEV__`-only "script tag in component tree" warning
  for the blocking pre-paint script (same as any Next.js theme script). **Absent
  from the production static export** — verified clean.

### 4. Canonize / propagate
- The morph primitive already generalises to **all six case studies** (matched
  by slug) — it'll "just work" as each case study is built with a `CaseHero`.
- Consider a **back transition** (case study → landing): harder, because it must
  restore the carousel's scroll position *and* the card's on-screen location.
  Currently plain nav. Worth doing right eventually; don't let it block.
- If `View Transitions API` integration in Next stabilises for static export, it
  could *replace* the clone-overlay mechanism with less code — but the current
  FLIP approach is deterministic and owned by us, so only switch if it's a clear
  win.

## Files map (for the conduit system)
- `components/morph/MorphProvider.tsx` — provider, clone overlay, `useMorphBegin`,
  `useMorphTarget`.
- `app/layout.tsx` — `<MorphProvider>{children}</MorphProvider>`.
- `components/sections/Work.tsx` — `WorkStage` = source (imgRef + handleMorphClick).
- `components/sections/case-study/CaseHero.tsx` — passes `morphId={study.slug}`.
- `components/sections/case-study/HeroImageTilt.tsx` — target (`useMorphTarget`,
  `opacity` hide/reveal) + the existing scroll-rotation tilt.
