# FF Cloud — Assets to Create (background Figma task)

> A pre-staged checklist of the visual assets the FF Cloud flagship case study
> will need, so Justin can build them in Figma in the background ahead of the
> build (FF Cloud is deliberately **built last** — see `README.md`). Derived from
> [`FF-Cloud-Case-Study-Outline_JK_2026-06-14.md`](./FF-Cloud-Case-Study-Outline_JK_2026-06-14.md)
> (section/content plan) + [`Case-Study-Asset-Spec_JK_2026-06-17.md`](./Case-Study-Asset-Spec_JK_2026-06-17.md)
> (treatment + export targets). Justin has lots of source screenshots; raw exports
> are already staged under `public/work/cloud/`.
>
> **Scope note:** MVP-first. Not every item below is needed for a launch-able
> "decent" version — the **must-haves** are marked ⭐; the rest elevate it on a
> later iteration pass.

---

## ⚠️ Before you start — three constraints that shape every asset

1. **Confidentiality (non-negotiable).** Tasteful **Confidential / NDA pill** on any
   product UI. **No real colleague names** in any visible screen text. Frame to
   **delivered / approved**, never shipped-to-users. Paraphrase internal
   "competitive liability"-type language — don't show the internal voice. Soften /
   omit unreleased roadmap timing, dev-hours, internal financials.
2. **Light-stage rule.** Every screenshot lands on a **white stage** over the warm
   canvas — **no dark/navy backplates** (they read as holes in a light page). Pure-
   white app UI needs containment: browser/device framing, a hairline edge, or an
   angled composition on a light-neutral backdrop.
3. **Accent palette for this case.** Panel accent **`#40539e`** (future-blue),
   panel tint **`#ebedf6`**. Distinct from V&M's magenta — keeps the case ownable.

**Export targets (quick ref, all @2x, ≤ ~400KB each after compression):**

| Slot | Aspect / size | Notes |
|---|---|---|
| Carousel card | **1600 × 1200** (4:3) | landing entry |
| Hero | **≥ 1800 × 1238** (16:11) | keep focal content out of the **lower-left third** (title crosses it) |
| Wide figure | **≥ 2400px** wide, any height | the "money shot" slot |
| Default figure | **≥ 1700px** wide | detail / secondary shots |

PNG-24 for UI/screens & graphics with text; JPG (q≈82) only for photography. sRGB.
Trim to the artwork — the template card already supplies generous padding.

---

## The checklist

### 1. Carousel card ⭐ — `ff-cloud` landing entry
- **What:** the single most representative surface (the redesigned dashboard /
  "Clinic Snapshot"), composed to read at small size. 4:3.
- **Source:** dashboard screenshots in `public/work/cloud/`.
- **Target:** 1600 × 1200. NDA pill if product UI is legible.

### 2. Hero ⭐ — the dashboard, hero crop (16:11)
- **What:** the most mature surface (the dashboard) as the title-crossing hero.
- **Watch:** keep the busy/legible content **out of the lower-left third** — the
  case title letterforms cross there on desktop.
- **Target:** ≥ 1800 × 1238. NDA pill.

### 3. Before/after surfaces (Section 5) — the proof
Each as a tight problem → decision → result. Before/after can be one composed
figure (side-by-side or angled) or a paired before + after.
- ⭐ **Dashboard / "Clinic Snapshot" before → after** — *the* money shot. Excel-like
  list → calm, scannable, role-aware overview with clinically-meaningful KPIs.
  **Wide figure**, ≥ 2400px. NDA pill.
- ⭐ **Assessment detail view before → after** — preserved the three-panel training
  anchor while modernizing density/clarity. Wide or default figure. NDA pill.
- **Report sharing / quick actions** — the highest-leverage workflow friction (e.g.
  quick actions from the list view). Default figure. NDA pill.

### 4. Design-system highlights (Section 4) — bespoke Figma graphics
These are **custom graphics**, not screenshots — they signal systems rigor.
- ⭐ **Three-tier color model** — one clean graphic: **platform** (single neutral-
  first accent), **product** (identity markers only), **semantic** (status, always
  paired with a non-color cue). Show the product palette + the single platform accent.
- **Status vocabulary** — the small honest set (e.g. Needs Attention / In Review /
  Ready / Delivered) as calm, decisive chips with their action-gating.
- **Core components** — a tight sheet of a few signature components showing the
  "AI-readable design system" (tokens/rules). Don't over-build; 3–5 components.

### 5. ⭐ The dual-thread AI workflow diagram (Section 3) — the ownable flourish
- **What:** a simple, memorable graphic of the **strategy/judgment thread (Claude.ai)
  ⇄ implementation thread (Claude Code)**, human-in-the-loop: *you decide → AI
  executes → you evaluate → next step.* Include the model-selection idea (lighter
  model for resolved execution; heavier for judgment-under-ambiguity).
- **Why it matters:** this is the uncopyable part of the whole portfolio — give it a
  distinct, branded vector treatment (future-blue family). Likely a default or wide
  figure depending on final composition.
- **Build note:** the case-study template currently renders **static PNG figures
  only**. If you want this (or any surface) as an **interactive/motion embed**, flag
  it — that's a small template extension to wire up when FF Cloud is built.

### 6. Research-insight callouts (1–2, optional) — Section 2
- **What:** styled pull-quote / callout graphics for the strongest abstracted
  insights (e.g. the dual default-view model; KPIs that are clinically meaningful vs.
  vanity counts). Could also be done in-template as text — **decide at build time**;
  not a hard asset dependency.

### 7. Live prototype link (not an asset, but a to-do) ⭐
- Verify the ~90%-complete React/Vite prototype is **publicly reachable** (or set up
  a guided, read-only path). This is the "is it real?" proof — confirm the URL before
  build.

---

## Naming & handoff
- Export web-ready, compressed files to **`public/work/`** per the spec, kebab-case:
  `ff-cloud-hero.png`, `ff-cloud-dashboard-before-after.png`,
  `ff-cloud-color-tiers.png`, `ff-cloud-dual-thread-diagram.png`, etc.
- They get referenced in `lib/case-studies.ts` (`hero` / `figure` `src` + real `alt`).
- Run everything through TinyPNG / ImageOptim / squoosh to hit the ≤ ~400KB budget.

## Open decisions for Justin (resolve before/early in the build)
- [ ] Confirm the **live prototype URL** (public or guided read-only).
- [ ] Pick the **hero one-liner** (telegraphs design leadership **and** build-with-AI
      in one breath — options in the outline §"Positioning").
- [ ] Decide which surfaces are **before/after composites vs. paired** images.
- [ ] Want the **dual-thread diagram** (and/or any surface) as an **interactive/motion
      embed** rather than static? If so, that's a template extension to schedule.
- [ ] Optional courtesy: a short note to the FF contact confirming they're fine with
      an abstracted case study (removes future ambiguity).
