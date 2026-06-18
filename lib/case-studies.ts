/**
 * Case-study content (Phase 3). One entry per /work/<slug> page.
 *
 * The shape is the repeatable template's contract: an accent hero, a two-column
 * overview (narrative + metadata), narrative beats with light-stage imagery, a
 * judgment / trade-offs section (the senior differentiator), and an impact
 * section with numbers. FF Cloud (Phase 4) adds a "How I worked with AI" block
 * on top of this same shape.
 *
 * ⚠️ COPY IS DRAFT. Violet & Magenta is the reference port — content is drawn
 * from the FF context pack + Justin's basics, written to be replaced/refined.
 * Metrics marked `placeholder` are stand-ins until Justin sources real figures.
 *
 * Confidentiality (Future Fertility): no real colleague names; VIOLET/MAGENTA
 * are public product names; framed to what shipped (global launch, Jan 2025).
 */

import type { MetaItem } from "@/components/ui/MetaList";

export type CaseFigure = {
  src: string;
  alt: string;
  caption?: string;
  /** Render on a wide, near-full-measure light stage vs. the default centered. */
  wide?: boolean;
};

export type CaseNarrativeBlock = {
  eyebrow: string;
  title: string;
  body: string[];
  figure?: CaseFigure;
};

export type CaseTradeoff = {
  decision: string;
  rationale: string;
};

export type CaseMetric = {
  value: string;
  label: string;
  note?: string;
  /** True while the number is a stand-in awaiting real data. */
  placeholder?: boolean;
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  hero: CaseFigure;
  confidential?: boolean;

  /** Left column of the overview — the narrative paragraphs. */
  overview: string[];
  /** Right aside of the overview — Role / Users / Methods / Subject / Timeframe. */
  meta: MetaItem[];

  /** Narrative beats, each an eyebrow + title + body with optional figure. */
  body: CaseNarrativeBlock[];

  judgment: {
    eyebrow: string;
    title: string;
    intro?: string;
    tradeoffs: CaseTradeoff[];
  };

  impact: {
    eyebrow: string;
    title: string;
    body: string[];
    metrics: CaseMetric[];
  };

  /** The next case study to send the reader to (color-journey order). */
  next?: { slug: string; title: string; eyebrow: string };
};

const VIOLET_MAGENTA: CaseStudy = {
  slug: "ff-reports",
  eyebrow: "Clinical reporting · Future Fertility",
  title: "Violet & Magenta",
  subtitle:
    "Redesigning the egg- and embryo-quality reports clinicians use to counsel fertility patients.",
  hero: {
    src: "/work/violet-magenta.png",
    alt: "VIOLET and MAGENTA predictive fertility reports, redesigned",
  },

  overview: [
    "Future Fertility uses AI to assess egg and embryo quality from microscope images taken in IVF and egg-freezing labs. The output is a predictive report — VIOLET for egg-freezing counselling, MAGENTA for embryo-selection decisions — that a clinician walks a patient through at one of the most emotionally charged moments in their care.",
    "The reports worked, but they read like clinical printouts: comparative framing, a buried headline number, and language that could distress a patient rather than inform a decision. I led the redesign that reframed them around the question patients actually ask — what does this mean for me? — and shipped it as the global default.",
  ],
  meta: [
    { label: "Role", value: "Product Design Lead" },
    { label: "Users", value: "Embryologists, fertility clinicians & their patients" },
    {
      label: "Methods",
      value: "Research synthesis · report-framing audit · prototype iteration · clinical review",
    },
    { label: "Subject", value: "VIOLET (egg freezing) & MAGENTA (IVF) predictive reports" },
    { label: "Timeframe", value: "Summer 2024 – Jan 2025 (global launch)" },
  ],

  body: [
    {
      eyebrow: "The problem",
      title: "A clinical tool that read like a printout",
      body: [
        "A report's real job is to turn an AI prediction into a decision a patient can make. But the existing layout led with comparative language — telling someone their result sat below a benchmark at exactly the wrong moment — and made the single most important number, an absolute probability of a live birth, hard to find.",
        "The downstream effect was telling: clinicians were softening, narrating around, or quietly setting aside the report rather than handing it to a patient. A tool meant to build confidence in the science was undercutting it.",
      ],
    },
    {
      eyebrow: "Approach",
      title: "Design for the conversation, not the database",
      body: [
        "I reframed the report around the patient-facing question — what does this mean for me? — and led with a plain-language, absolute outcome instead of a comparative percentile. Tone became a design surface: in a regulated clinical product, the words are part of the interface.",
        "Crucially, the redesign preserved what already worked. Before removing anything, I catalogued the quiet strengths users never file tickets about — the cumulative, multi-cycle view patients valued most, and the at-a-glance VIOLET/MAGENTA colour signal — and protected them while stripping the chart-junk that made the report feel dated.",
      ],
      figure: {
        src: "/work/violet-magenta.png",
        alt: "Redesigned VIOLET and MAGENTA report layouts on a light stage",
        caption:
          "The redesigned report system — VIOLET and MAGENTA unified under one patient-first layout. (Interim asset; final exports in progress.)",
        wide: true,
      },
    },
  ],

  judgment: {
    eyebrow: "Judgment",
    title: "The decisions that mattered",
    intro:
      "The redesign came down to a few load-bearing calls — each a trade-off, not a default.",
    tradeoffs: [
      {
        decision: "Absolute framing over comparative framing",
        rationale:
          "Leading with a live-birth probability instead of a percentile risked feeling blunt. But comparative language was actively distressing patients and eroding clinician trust. I chose the framing that served the counselling conversation, then softened the tone in the wording — not in the data.",
      },
      {
        decision: "Preserve before you simplify",
        rationale:
          "The easy win would have been a dramatic reinvention. Instead I protected the features users quietly relied on — cumulative reporting, the scannable first page, the colour-coded product badges. The result is restrained on purpose: the goal was clarity, not novelty.",
      },
      {
        decision: "Empathy as a constraint, not a polish pass",
        rationale:
          "In a regulated clinical product, language is a safety surface. Wording went through the same clinical review as layout, so the report could be handed to a patient — not just read by a specialist.",
      },
    ],
  },

  impact: {
    eyebrow: "Impact",
    title: "Shipped as the global default",
    body: [
      "The redesigned reports entered development in fall 2024 and launched globally in January 2025 as the standard VIOLET and MAGENTA output — unifying two products under one patient-first system.",
    ],
    metrics: [
      // PLACEHOLDER — Justin to source final figures.
      { value: "+18", label: "Customer NPS lift", note: "Post-launch; placeholder figure", placeholder: true },
      { value: "Global", label: "Rollout", note: "Default report for all clinics, Jan 2025" },
      { value: "2", label: "Products unified", note: "VIOLET & MAGENTA on one report system" },
    ],
  },

  next: { slug: "modus-v", title: "Modus V", eyebrow: "Surgical navigation · Synaptive Medical" },
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  [VIOLET_MAGENTA.slug]: VIOLET_MAGENTA,
};

/** Slugs that have full case-study content (drives static params + sitemap). */
export function getCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
