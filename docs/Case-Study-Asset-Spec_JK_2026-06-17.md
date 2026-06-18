# Case-study asset spec — light-first stages

> Companion to the Phase 3 case-study template. This tells Justin exactly what
> to export so screenshots read as **heroes on light stages** (CLAUDE.md), not
> the old site's small, dark, low-contrast work. Derived from the real template
> code in `components/sections/case-study/*` — if the template changes, update
> this. **Source originals:** `assets/case-studies/<slug>/`. **Web-ready exports:**
> `public/work/`.

---

## The one rule that fixes the old-site sin

**Every screenshot lands on a WHITE stage (`--surface` `#ffffff`) sitting on the
warm canvas (`--background` `#f7f5f2`).** Two consequences drive everything below:

1. **No dark/navy backplates.** The old assets composite the work onto Justin's
   previous dark palette — those will look like holes punched in a light page.
   Re-export on **white, light-neutral, or transparent**.
2. **Pure-white app UI will float.** A screenshot whose own background is white
   dissolves into the white stage. Give it containment — **browser/device
   framing, a hairline edge, or an angled composition on a light-neutral
   backdrop** (the current `violet-magenta.png` 3D-angled report layout is a good
   model of self-contained composition).

---

## Slots, treatment & export targets

The template renders four distinct image roles. Each has a fixed treatment in
code and a corresponding export target. **All targets are @2x** (retina); export
PNG for UI/screens, JPG only for photography.

| Slot | Where | Rendered treatment (from code) | Export target |
|---|---|---|---|
| **Hero** | `CaseHero` | Cropped **16:11**, `object-cover`, rounded, big drop shadow. Title letterforms cross it. | **≥ 1800 × 1238px**, 16:11. Keep the focal content away from the **lower-left third** (the title overlaps there on desktop). |
| **Light-stage figure (wide)** | `CaseNarrative` → `CaseFigure` `wide` | Full content measure on a white card, padding `lg:p-10` (40px), inner `rounded-lg`. No forced aspect — shown at natural ratio. | **≥ 2400px wide**. Any height. This is the "big screenshot" slot — use it for the money shots. |
| **Light-stage figure (default)** | `CaseFigure` (no `wide`) | Centered, `max-w-4xl` (896px) white card, same padding. | **≥ 1700px wide**. For detail/secondary shots. |
| **Carousel card** | landing `Work.tsx` | **4:3**, `object-cover`, rounded `1.5rem`. | **1600 × 1200px**, 4:3. (V&M's `violet-magenta.png` already matches.) |

**Padding note:** the white card already supplies generous padding (12 / 24 / 40px
responsive). **Do not bake additional whitespace** into the export or the work
shrinks — trim to the artwork, let the stage breathe around it.

---

## Format, color & performance

- **Format:** PNG-24 for UI/screens & anything with text or hard edges; JPG (q≈82)
  only for full-bleed photography. Prefer transparent PNG where the art should
  blend onto the stage; otherwise a white/light-neutral matte.
- **Color:** sRGB, embedded profile. Avoid pure `#000` text on screenshots — it
  fights the warm canvas; the source UIs are fine as-is.
- **Resolution:** export @2x against the targets above. Don't exceed ~2600px wide;
  there's no visible gain and it bloats the page.
- **Weight budget:** **≤ ~400KB per image** after compression (run exports through
  TinyPNG / ImageOptim / `squoosh`). Page-weight is a known Phase-7 perf TODO —
  the current `public/work/*.png` are 1–1.3MB and need shrinking. Don't add to the
  debt. (A Phase-7 task may convert these to `next/image` + WebP/AVIF; exporting
  clean PNGs now keeps that path open.)

---

## Naming & workflow

1. Drop source originals in `assets/case-studies/<slug>/` (already the convention).
2. Export web-ready, compressed files to **`public/work/`** with a descriptive,
   kebab-case name: `<slug>-<role>.png` →
   e.g. `ff-reports-hero.png`, `ff-reports-before-after.png`, `ff-reports-magenta-detail.png`.
3. Reference them in `lib/case-studies.ts` (the `CaseStudy` `hero` / `figure`
   `src` fields). Update the `alt` text to describe the actual frame.

---

## Violet & Magenta — concrete shot list (source already exists)

`assets/case-studies/ff-reports/` already holds strong source. Suggested mapping
into the template slots — re-export each on a light/transparent stage per the rule
above:

| Template slot | Use | Source candidate(s) |
|---|---|---|
| **Hero (16:11)** | The redesigned report, hero crop | `hero-image.png` (or an angled `violet.png` / `magenta.png` comp like today's) |
| **Wide figure — "Approach"** | The unified report system, big | `violet.png` + `magenta.png` (the current composite works) |
| **Default figure — before/after** | The reframing, made legible | `violet-before.png` → `violet.png` paired |
| **Default figure — detail** | Oocyte imagery / product distinction | `violet-oocytes.png`, `magenta-oocytes.png`, `oocyte-images.png` |
| **(optional) localization / sharing** | Range/craft signals | `localization.png`, `download.png`, `patient-resources.png` |

When these land, `lib/case-studies.ts` grows from one body figure to a few — the
`body[].figure` and a future `gallery` array already support it. Replace the
interim duplicate (hero + body both point at `violet-magenta.png`) at that time.

---

## FF Cloud (Phase 4) — same spec, plus

- Tasteful **Confidential / NDA pill** on product screenshots (the hero already
  renders a `confidential` pill; figure-level pills can be added in Phase 4).
- Frame to **delivered/approved**, never shipped-to-users. No real colleague
  names in any visible UI text. (See CLAUDE.md confidentiality guardrails.)
- Design figure slots to also accept **interactive/motion embeds** from the real
  prototype, not just static PNGs.
