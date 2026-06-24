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
  /** Skip the card border/bg wrapper (image + shadow only). Stays within Container width. */
  frameless?: boolean;
};

export type CaseNarrativeBlock = {
  eyebrow: string;
  title: string;
  body: string[];
  figure?: CaseFigure;
  /** Desktop layout for the figure. "below" (default) stacks it under the text;
   *  "aside" places it in a right column next to the text for a more compact beat. */
  figureLayout?: "below" | "aside";
  /** Section background tone. "default" is the cream canvas; "tinted" is a
   *  warm near-white step darker, used to add rhythm between narrative beats. */
  sectionTone?: "default" | "tinted";
};

export type CaseGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  /** Span both columns — useful for a lone portrait item that would otherwise orphan. */
  colSpan2?: boolean;
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
  /** Number of columns for the gallery grid. Defaults to 2. Use 3 for three even side-by-side items. */
  galleryColumns?: 2 | 3;

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

  /**
   * Optional filmstrip outro — auto-scrolling row of product shots that runs
   * between Impact and the Next panel. Curated per-study; leave empty to omit.
   */
  filmstrip?: Array<{ src: string; alt: string }>;

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
    src: "/work/egg-reports/ff-reports-hero.png",
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
      figureLayout: "aside",
      body: [
        "VIOLET and MAGENTA each produced a numerical prediction of fertility outcomes — the result of a computer-vision model trained on thousands of IVF cycles. That prediction had real clinical value. But the reports reading it out led with comparative language: where a patient's result ranked against a reference population, at a moment when ranking was the last thing they needed.",
        "The downstream signal was hard to ignore. Clinicians were softening, narrating around, or quietly setting aside the report rather than handing it to a patient. A tool built to build confidence in the science was instead creating a moment of dread — and the workaround was the clinician's voice, not the design.",
      ],
      figure: {
        src: "/work/egg-reports/ff-reports-before.png",
        alt: "The original VIOLET report — dense comparative layout with buried headline number",
        caption: "The original VIOLET report. Comparative framing, buried live-birth probability, language that required clinician narration to soften.",
        frameless: true,
      },
    },
    {
      eyebrow: "Discovery",
      title: "Two failure modes, one root cause",
      sectionTone: "tinted",
      body: [
        "I started with a structured audit of both reports: layout, language, information hierarchy, and the sequences clinicians were actually using them in. Two failure modes emerged. The first was comparative framing: leading with a percentile positioned patients against a benchmark rather than toward an outcome. The second was information hierarchy: the single number that mattered most — an absolute live-birth probability — was buried in the detail rows.",
        "Both had the same root: the reports were organised around what the AI knew, not around what a clinician needed to say. Before removing anything, I mapped what was working quietly — the things users never filed tickets about: a cumulative multi-cycle view patients had come to rely on across appointments, and the VIOLET/MAGENTA colour signal that gave specialists an at-a-glance read. The redesign would protect both.",
      ],
      figure: {
        src: "/work/egg-reports/sketches.png",
        alt: "Synthesis of clinician feedback and redesign ideas from the discovery audit",
        caption: "Synthesised feedback from clinicians, framing failures identified in the audit, and the core redesign principles that followed.",
        frameless: true,
      },
    },
    {
      eyebrow: "Approach",
      title: "Design for the conversation, not the database",
      body: [
        "I redesigned VIOLET and MAGENTA together for the first time — as one report system with shared information architecture. The lead changed from a percentile to a plain-language, absolute outcome: what a patient's result means for their specific treatment path, not where it ranks. The structure that followed built toward the counselling conversation, not the raw data.",
        "Tone was a live design surface. In a regulated clinical product, the words are as much the interface as the layout — so every sentence went through the same clinical review cycle as the visual structure. What emerged was a report a clinician could hand across the table. The cumulative view and the VIOLET/MAGENTA signal stayed intact; the comparative framing and chart-junk that made the reports feel dated were stripped.",
      ],
      figure: {
        src: "/work/egg-reports/ff-reports-hero-2x.png",
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
      { value: "3 products", label: "One report system", note: "VIOLET, MAGENTA, and ROSE — unified information architecture, built-in localization" },
    ],
  },

  // Gallery — individual product shots showing the unified report system.
  // Next swap-ins: oocyte AI imagery, localization spread, A/B iteration concepts.
  gallery: [
    {
      src: "/work/egg-reports/ff-reports-violet.png",
      alt: "Redesigned VIOLET report — egg-freezing counselling layout",
      caption: "VIOLET™ — Egg Freezing Insights. Patient-first layout for egg-freezing counselling.",
    },
    {
      src: "/work/egg-reports/ff-reports-magenta.png",
      alt: "Redesigned MAGENTA report — IVF embryo-selection layout",
      caption: "MAGENTA™ — IVF Insights. The parallel redesign for embryo-selection decisions.",
    },
    {
      src: "/work/egg-reports/ff-reports-rose.png",
      alt: "ROSE donor lot report — egg donation clinics, Spanish localization",
      caption: "ROSE™ — Egg Donation Insights. The design system extended to donor oocyte assessment, with built-in localization.",
    },
  ],
  galleryColumns: 3,

  filmstrip: [
    { src: "/work/egg-reports/violet-1@2x.png",        alt: "VIOLET report — personalized live-birth probability predictions" },
    { src: "/work/egg-reports/violet-2@2x.png",        alt: "VIOLET egg images and AI predictions — microscopy grid with probability scores" },
    { src: "/work/egg-reports/brochure.png",            alt: "Clinician reviewing printed VIOLET report with patient" },
    { src: "/work/egg-reports/magenta-1@2x.png",       alt: "MAGENTA report — embryo quality scores and euploidy predictions" },
    { src: "/work/egg-reports/magenta-2@2x.png",       alt: "MAGENTA egg assessment grid with per-oocyte MAGENTA scores" },
    { src: "/work/egg-reports/rose-donor-lot-1@2x.png", alt: "ROSE donor lot report — aggregate oocyte quality assessment for egg donation clinics" },
    { src: "/work/egg-reports/oocyte-images-1@2x.png", alt: "Future Fertility oocyte images report — egg microscopy with AI quality assessment" },
    { src: "/work/egg-reports/download.png",            alt: "Future Fertility web app — customize and share report panel" },
  ],

  next: { slug: "modus-v", title: "Modus X", eyebrow: "Surgical navigation · Synaptive Medical" },
};

const IMAGE_CAPTURE: CaseStudy = {
  slug: "cap-app-redesign",
  eyebrow: "Clinical imaging · Future Fertility",
  title: "Image Capture",
  subtitle:
    "Rebuilding the desktop tool embryologists use to photograph eggs and embryos — so the image is the interface, capture stays fast, and quality is caught before it ever reaches the AI.",
  hero: {
    src: "/work/image-capture/cap-app-after-2x.webp",
    alt: "The redesigned Future Fertility Capture app — an image-dominant workspace for photographing oocytes and embryos",
  },

  overview: [
    "Future Fertility uses AI to assess egg and embryo quality from microscope images taken in IVF and egg-freezing labs. FF Capture is the tool at the front of that pipeline: the desktop app embryologists use at the microscope to photograph each oocyte or embryo. Those images are what the AI reads — and what later becomes the VIOLET and MAGENTA reports clinicians walk patients through. Capture the image, assess it, report it: this is the capture end.",
    "The app worked and labs trusted it, but it had been built feature-by-feature by engineers and looked a decade behind the science it served. I led the redesign as the sole designer — running discovery interviews with embryologists, mapping the real lab workflow, and prototyping a modern, image-first experience — working closely with the CTO and dev team to keep it buildable, and with the internal embryology team for fast, iterative feedback.",
  ],
  meta: [
    { label: "Role", value: "Product Design Lead — sole designer" },
    { label: "Users", value: "Embryologists & IVF lab staff" },
    {
      label: "Methods",
      value: "Discovery interviews (8+ users) · workflow mapping · prototype iteration · dev viability review",
    },
    { label: "Subject", value: "FF Capture — egg & embryo imaging desktop app" },
    { label: "Timeframe", value: "2024 – 2025" },
  ],

  body: [
    {
      eyebrow: "The problem",
      title: "The image was the smallest thing on screen",
      figureLayout: "aside",
      body: [
        "FF Capture was built by engineers, for a job it did reliably — and the labs that used it had genuine affection for it. But it had grown the way dev-built tools do: dialog by dialog, toolbar by toolbar, until the screen was a wall of controls, tables, and settings that looked a decade behind the AI it fed. The one thing the app exists to do — take a clear picture of an oocyte or embryo — was crammed into a small preview in the corner, surrounded by everything else.",
        "The clutter wasn't only cosmetic. Capture happens under real time pressure: every second an egg spends outside the incubator is a second a lab works to minimize. A dense interface taxes exactly the moment that needs to be fastest and calmest — and it made the product harder to learn for every new clinic onboarding to it.",
      ],
      figure: {
        src: "/work/image-capture/cap-app-before@2x.png",
        alt: "The original FF Capture app — a dense, dev-built Windows interface with a small image preview",
        caption: "The original Capture app — functional and trusted, but dev-built and dense. The live image sits in a small preview, boxed in by toolbars and tables.",
        frameless: true,
      },
    },
    {
      eyebrow: "Discovery",
      title: "Eight-plus conversations at the bench",
      sectionTone: "tinted",
      body: [
        "Before redrawing anything, I ran discovery interviews with 8+ representative embryologists — internal and external — to learn how capture actually happens: the sequence, the friction, the workarounds, and the things they'd never give up. I mapped the end-to-end workflow from those sessions, which made the priorities legible: the core capture loop dominated real usage, while much of the visible UI served edge cases that didn't need to live on the main screen.",
        "Two findings anchored the redesign. First, lab efficiency is the metric that matters — specifically, minimizing the time eggs spend outside the incubator — so the capture loop had to get genuinely faster, not just better-looking. Second, the existing mental model was an asset: hundreds of clinics already knew this app. The job was to streamline and modernize that model with a scalpel, not replace it with something theoretically nicer that would strand power users.",
      ],
      figure: {
        src: "/work/image-capture/user-workflow-mapping@2x.png",
        alt: "Workflow map synthesized from discovery interviews with embryologists",
        caption: "Workflow mapping synthesized from the discovery interviews — separating the core capture loop from the edge-case UI that could move off the main screen.",
        frameless: true,
      },
    },
    {
      eyebrow: "Approach",
      title: "Make the image the interface",
      body: [
        "The redesign gives the image the screen. The live oocyte or embryo fills the canvas, capture becomes a single obvious action, and everything else — settings, secondary tools, less-used controls — was regrouped semantically and moved into accessible, out-of-the-way places. It reads as calm and modern without changing the fundamental flow embryologists already had in their hands.",
        "Quality is surfaced where the decision is made. Because capture quality gates the downstream AI — there's a minimum threshold for highlights, shadow, and focus — the redesign makes quality control glanceable: a simple green / amber / red read on each image, so embryologists get it right the first time and hand a clean image to the reporting pipeline. The product identities (VIOLET, MAGENTA, ROSE) and a hand-tuned light/dark theme carry through from the report system, so the whole suite feels like one product.",
      ],
      figure: {
        src: "/work/image-capture/cap-app-magenta-light@2x.png",
        alt: "The redesigned capture workspace, MAGENTA IVF theme — image fills the canvas with a calm review rail and per-image QC",
        caption:
          "The redesigned capture workspace (MAGENTA / IVF). The image owns the canvas; review and per-image quality control sit in a calm right rail; one clear capture action anchors the flow.",
        wide: true,
      },
    },
  ],

  gallery: [
    {
      src: "/work/image-capture/cap-app-new-assessment@2x.png",
      alt: "Redesigned New Assessment intake — patient, cycle, and embryo information grouped semantically",
      caption: "Structured intake — patient, cycle, and embryo information regrouped semantically from the research, so setup is fast and legible.",
    },
    {
      src: "/work/image-capture/cap-app-rose-light@2x.png",
      alt: "Capture workspace in the ROSE donor-oocyte theme",
      caption: "ROSE — donor oocyte capture, completing the product family under one design system.",
    },
    {
      src: "/work/image-capture/cap-app-violet-dark@2x.png",
      alt: "Capture workspace in the VIOLET theme, dark mode",
      caption: "A hand-tuned dark theme, parallel to light — never an auto-inversion.",
    },
  ],
  galleryColumns: 3,

  judgment: {
    eyebrow: "Judgment",
    title: "The decisions that mattered",
    intro:
      "Three calls shaped the redesign — each a deliberate trade-off in a tool hundreds of clinics already depend on.",
    tradeoffs: [
      {
        decision: "Streamline the existing paradigm — don't reinvent it",
        rationale:
          "A guided, wizard-style flow was tempting and might have demoed beautifully. But the app's existing mental model was a hard-won asset across hundreds of clinics worldwide; re-flowing it would have stranded power users to court newcomers. I chose scalpel-precision: keep the paradigm embryologists already know and modernize it underneath — faster for experts, easier for the next clinic onboarding, jarring for no one.",
      },
      {
        decision: "Decide what earns the screen",
        rationale:
          "Modernization here was editing, not decoration. Using the discovery findings, I ranked what mattered moment-to-moment and gave it prominence — the image, the capture action, the quality read — then regrouped everything else into accessible menus. Showing less at once is a real cost for the occasional power-user task; the bet was that focus on the core loop serves the lab, and onboarding, far more than density does.",
      },
      {
        decision: "Optimize for incubator time, and catch quality at the source",
        rationale:
          "The north-star constraint isn't clicks — it's how long an egg is out of the incubator. So the capture loop was tuned to be fast and unambiguous, and image quality was made glanceable (green / amber / red on highlight, shadow, and focus) right at capture. Getting quality right upstream is what lets a clinic generate the reports they need downstream without rework — Capture and the Cloud reporting app are two ends of one pipeline.",
      },
    ],
  },

  impact: {
    eyebrow: "Impact",
    title: "A trusted tool, modernized — without breaking it",
    body: [
      "The redesign rolled out to clinics with the embryology team leading adoption, and early response has been strongly positive — the clinics love it. The modernized experience lifted the perception of the product and eased onboarding for new clinics, all while preserving the workflow labs already relied on and catching image quality at the source for a cleaner handoff into the reporting pipeline. Harder numbers (post-rollout NPS) are being gathered.",
    ],
    metrics: [
      { value: "8+", label: "Embryologists interviewed", note: "Internal & external, in discovery" },
      { value: "Hundreds", label: "Clinics served worldwide", note: "The global install base whose mental model the redesign preserved" },
      { value: "Loved", label: "Response at rollout", note: "Qualitative, per the embryology rollout team; quantitative NPS in progress", placeholder: true },
    ],
  },

  filmstrip: [
    { src: "/work/image-capture/cap-app-after-2x.png",                 alt: "Redesigned FF Capture — image-dominant capture workspace" },
    { src: "/work/image-capture/cap-app-violet-light@2x.png",          alt: "FF Capture — VIOLET egg-freezing theme, light mode" },
    { src: "/work/image-capture/cap-app-magenta-dark@2x.png",          alt: "FF Capture — MAGENTA IVF theme, dark mode" },
    { src: "/work/image-capture/cap-app-rose-light@2x.png",            alt: "FF Capture — ROSE donor-oocyte theme" },
    { src: "/work/image-capture/cap-app-new-empty@2x.png",            alt: "FF Capture — empty state before capture" },
    { src: "/work/image-capture/ui-explorations-canvas-large@2x.png",  alt: "Breadth of UI explorations from the redesign" },
    { src: "/work/image-capture/context-of-use@2x.png",               alt: "An embryologist using FF Capture at the microscope station" },
  ],

  next: { slug: "ff-reports", title: "Violet & Magenta", eyebrow: "Clinical reporting · Future Fertility" },
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  [IMAGE_CAPTURE.slug]: IMAGE_CAPTURE,
  [VIOLET_MAGENTA.slug]: VIOLET_MAGENTA,
};

/** Slugs that have full case-study content (drives static params + sitemap). */
export function getCaseStudySlugs(): string[] {
  return Object.keys(CASE_STUDIES);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
