/**
 * The landing carousel slides. The WHOLE homepage is one carousel: an intro
 * slide ("Justin 101") followed by the selected work, in this fixed order
 * (color journey runs through the per-project palette in lib/theme.ts):
 *
 *   intro → FF Cloud → Image Capture → Violet & Magenta → Modus V → PRESTO → Impact
 *
 * Copy is DRAFT — strong placeholders for Justin to wordsmith. Case-study
 * routes (/work/<slug>) are built in Phase 3; FF Cloud imagery arrives Phase 4.
 */

/** One run of a rich blurb: plain text, or a linked company name (renders as
 *  an underlined external link — see BlurbText in Work.tsx). */
export type BlurbSegment = { text: string; href?: string };

export type WorkItem = {
  slug: string;
  kind: "intro" | "project";
  eyebrow: string;
  title: string;
  titleLines?: string[]; // if set, each string renders on its own line (desktop hero)
  blurb: string;
  // Intro only: the same copy as `blurb`, broken into segments so specific
  // company names render as links. `blurb` stays the plain-text source of
  // truth (used wherever segments aren't rendered); keep the two in sync.
  blurbSegments?: BlurbSegment[];
  image?: string; // path under /public; absent → placeholder stage
  href?: string;
  confidential?: boolean;
  flagship?: boolean;
};

/** Slide 0 — the intro ("Justin 101"), in carousel-friendly format.
 *  `title` stays short — it's the fallback read by the filmstrip hover
 *  tooltip, the pagination aria-label, and the reduced-motion stacked list. */
export const INTRO: WorkItem = {
  slug: "intro",
  kind: "intro",
  eyebrow: "AI-Native Product Design Leader",
  title: "Hello! I'm Justin",
  // Single-line greeting, joined with a space at render time (see the isIntro
  // branches in CarouselText / HorizontalCarousel / IntroBlock): the LAST
  // segment renders in --accent, the rest in ink.
  titleLines: ["Hello! I'm", "Justin"],
  blurb:
    "Toronto-based product design leader. Most recently I led product design + UX research at Future Fertility, an AI platform used by fertility doctors & patients worldwide. Before that, design leadership at ExperiencePoint, Fjord/Accenture, Synaptive Medical, and University Health Network. These days I design and build with agentic AI — from strategy through to code.",
  blurbSegments: [
    { text: "Toronto-based product design leader. Most recently I led product design + UX research at " },
    { text: "Future Fertility", href: "https://futurefertility.com/" },
    { text: ", an AI platform used by fertility doctors & patients worldwide. Before that, design leadership at " },
    { text: "ExperiencePoint", href: "https://www.experiencepoint.com/" },
    { text: ", " },
    { text: "Fjord/Accenture", href: "https://www.accenture.com/us-en/about/accenture-song-index" },
    { text: ", " },
    { text: "Synaptive Medical", href: "https://www.synaptivemedical.com/" },
    { text: ", and " },
    { text: "University Health Network", href: "https://humanfactors.ca/" },
    { text: ". These days I design and build with agentic AI — from strategy through to code." },
  ],
  image: "/about/justin-with-arms-outstretched-arrow.webp",
  href: "/about/",
};

export const WORK: WorkItem[] = [
  {
    slug: "ff-cloud",
    kind: "project",
    eyebrow: "AI healthtech · Future Fertility",
    title: "Cloud",
    blurb:
      "Modernizing a clinical AI platform — and pioneering the human-AI workflow that built it.",
    image: "/work/cloud/ff-cloud.webp",
    flagship: true,
    href: "/work/ff-cloud/",
  },
  {
    slug: "cap-app-redesign",
    kind: "project",
    eyebrow: "Clinical imaging · Future Fertility",
    title: "Image Capture",
    blurb:
      "Rethinking the embryologist's image-capture workflow for speed, clarity, and clinical trust.",
    image: "/work/image-capture/cap-app-after-2x.webp",
    href: "/work/cap-app-redesign/",
  },
  {
    slug: "ff-reports",
    kind: "project",
    eyebrow: "Clinical reporting · Future Fertility",
    title: "Violet & Magenta",
    blurb:
      "Designing the egg- and embryo-quality reports clinicians use to counsel fertility patients.",
    image: "/work/egg-reports/ff-reports-card.webp",
    href: "/work/ff-reports/",
  },
  {
    slug: "modus-v",
    kind: "project",
    eyebrow: "Surgical navigation · Synaptive Medical",
    title: "Modus X",
    blurb:
      "UX for a robotic digital microscope used by surgeons in live neurosurgery.",
    image: "/work/synaptive/modus-v-hero-image.webp",
    href: "/work/modus-v/",
  },
  {
    slug: "metrolinx-presto",
    kind: "project",
    eyebrow: "Transit service design · Metrolinx",
    title: "PRESTO",
    blurb:
      "Field research and service blueprinting across a transit network serving 50M+ riders.",
    image: "/work/presto/presto-ticketing-machines.webp",
    href: "/work/metrolinx-presto/",
  },
  {
    slug: "experiencepoint-impact",
    kind: "project",
    eyebrow: "Learning platform · ExperiencePoint",
    title: "Impact",
    blurb:
      "A modular design-sprint simulation delivered to Fortune 100 teams worldwide.",
    image: "/work/experiencepoint/impact.webp",
    href: "/work/experiencepoint-impact/",
  },
];

/** The full carousel: intro first, then the work. */
export const SLIDES: WorkItem[] = [INTRO, ...WORK];
