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
 * from Justin's project knowledge, written to be refined with real metrics and
 * final assets. Metrics marked `placeholder` are stand-ins.
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

export type CaseGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
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

  /**
   * Optional image grid rendered between the narrative body and Judgment.
   * Use for individual product shots, detail views, or process artifacts.
   * Placeholder items are replaced in-place when Figma exports arrive.
   */
  gallery?: CaseGalleryItem[];

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
    "Reframing a clinical AI report around the question patients actually ask — so clinicians could hand it across the table, not narrate around it.",
  hero: {
    src: "/work/violet-magenta.png",
    alt: "VIOLET and MAGENTA predictive fertility reports, redesigned",
  },

  overview: [
    "Future Fertility uses AI to assess egg and embryo quality from microscope images taken in IVF and egg-freezing labs. The output is a predictive report — VIOLET for egg-freezing counselling, MAGENTA for embryo-selection decisions — that a clinician walks a patient through at one of the most emotionally charged moments in their care.",
    "The reports worked, but they read like clinical printouts: comparative framing, a buried headline number, and language that was distressing patients rather than informing decisions. I led the redesign across both VIOLET and MAGENTA — working with clinical, engineering, and product — to ship a unified report system a clinician could hand to a patient. It launched as the global default in January 2025.",
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
      title: "A report designed for the database, not the decision",
      body: [
        "VIOLET and MAGENTA each produced a numerical prediction of fertility outcomes — the result of a computer-vision model trained on thousands of IVF cycles. That prediction had real clinical value. But the reports reading it out led with comparative language: where a patient's result ranked against a reference population, at a moment when ranking was the last thing they needed.",
        "The downstream signal was hard to ignore. Clinicians were softening, narrating around, or quietly setting aside the report rather than handing it to a patient. A tool built to build confidence in the science was instead creating a moment of dread — and the workaround was the clinician's voice, not the design.",
      ],
      figure: {
        src: "/work/ff-reports-before.png",
        alt: "The original VIOLET report — dense comparative layout with buried headline number",
        caption: "The original VIOLET report. Comparative framing, buried live-birth probability, language that required clinician narration to soften.",
      },
    },
    {
      eyebrow: "Discovery",
      title: "Two failure modes, one root cause",
      body: [
        "I started with a structured audit of both reports: layout, language, information hierarchy, and the sequences clinicians were actually using them in. Two failure modes emerged. The first was comparative framing: leading with a percentile positioned patients against a benchmark rather than toward an outcome. The second was information hierarchy: the single number that mattered most — an absolute live-birth probability — was buried in the detail rows.",
        "Both had the same root: the reports were organised around what the AI knew, not around what a clinician needed to say. Before removing anything, I mapped what was working quietly — the things users never filed tickets about: a cumulative multi-cycle view patients had come to rely on across appointments, and the VIOLET/MAGENTA colour signal that gave specialists an at-a-glance read. The redesign would protect both.",
      ],
    },
    {
      eyebrow: "Approach",
      title: "Design for the conversation, not the database",
      body: [
        "I redesigned VIOLET and MAGENTA together for the first time — as one report system with shared information architecture. The lead changed from a percentile to a plain-language, absolute outcome: what a patient's result means for their specific treatment path, not where it ranks. The structure that followed built toward the counselling conversation, not the raw data.",
        "Tone was a live design surface. In a regulated clinical product, the words are as much the interface as the layout — so every sentence went through the same clinical review cycle as the visual structure. What emerged was a report a clinician could hand across the table. The cumulative view and the VIOLET/MAGENTA signal stayed intact; the comparative framing and chart-junk that made the reports feel dated were stripped.",
      ],
      figure: {
        src: "/work/violet-magenta.png",
        alt: "Redesigned VIOLET and MAGENTA report layouts on a light stage",
        caption:
          "The redesigned report system — VIOLET and MAGENTA unified under one patient-first layout.",
        wide: true,
      },
    },
  ],

  judgment: {
    eyebrow: "Judgment",
    title: "The decisions that mattered",
    intro:
      "The redesign came down to three load-bearing calls — each a deliberate trade-off, not a default.",
    tradeoffs: [
      {
        decision: "Absolute framing over comparative framing",
        rationale:
          "Leading with a live-birth probability instead of a percentile risked feeling blunt or clinically imprecise. But comparative language was actively distressing patients before the conversation had a chance to begin. I chose the framing that served the counselling moment, then worked with the clinical team to make the wording humane — not by softening the data, but by contextualising it.",
      },
      {
        decision: "Protect the quiet features before simplifying anything",
        rationale:
          "The obvious redesign move would have been a clean-slate reinvention. Instead I mapped what users never complained about before touching anything: the cumulative multi-cycle view patients had come to rely on across appointments, and the scannable first-page structure. Both stayed. What came out was the comparative framing, the buried hierarchy, and the chart elements that added visual complexity without adding meaning.",
      },
      {
        decision: "Clinical review as a design constraint, not a sign-off step",
        rationale:
          "In a regulated product used at an emotionally charged moment, language is a safety surface. Every rewritten sentence — not just the layout — went through clinical review. A phrase like 'your result falls below the average' became 'here is what this means for your next steps.' That shift changed the register of the entire report: from a printout to a tool a clinician could hand a patient.",
      },
    ],
  },

  impact: {
    eyebrow: "Impact",
    title: "Shipped as the global default",
    body: [
      "The redesigned reports entered development in fall 2024 and launched in January 2025 — becoming the standard output for every fertility clinic using Future Fertility from day one.",
    ],
    metrics: [
      { value: "+18", label: "Customer NPS lift", note: "Post-launch; placeholder — final figure in progress", placeholder: true },
      { value: "Global", label: "Default from day one", note: "Every clinic using Future Fertility received the redesign at launch, Jan 2025" },
      { value: "One", label: "Unified report system", note: "VIOLET and MAGENTA redesigned together for the first time, under one information architecture" },
    ],
  },

  // Placeholder assets — replace src values with Figma re-exports on light stages.
  // Intended slots: VIOLET individual, MAGENTA individual, oocyte AI imagery,
  // localization spread (Spanish / Portuguese / Italian), A/B iteration concepts.
  gallery: [
    {
      src: "/work/ff-reports-violet.png",
      alt: "Redesigned VIOLET report — egg-freezing counselling layout",
      caption: "VIOLET — Egg Freezing Insights. Patient-first layout for egg-freezing counselling.",
    },
    {
      src: "/work/ff-reports-magenta.png",
      alt: "Redesigned MAGENTA report — IVF embryo-selection layout",
      caption: "MAGENTA — IVF Insights. The parallel redesign for embryo-selection decisions.",
    },
  ],

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
