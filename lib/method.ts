/**
 * "Range" section (About page) — the spectrum-of-tactics claim, backed by
 * real methods pulled from lib/case-studies.ts rather than invented for the
 * section. Five stages (Strategy → Discovery → Definition → UX/UI →
 * Build & launch) drive BOTH the top overview strip and the depth ladder
 * below it, so the two halves of the section describe the same taxonomy at
 * two zoom levels instead of introducing a second one.
 *
 * The AI-native thread (CLAUDE.md: "AI is the newest layer woven
 * throughout") isn't a separate diagram — a tactic can be flagged `ai: true`
 * and renders in accent color inline with its stage's other tactics. The
 * throughline is visible in which chips light up across all five stages,
 * not asserted in a caption next to them.
 */

export type MethodTactic = { label: string; ai?: boolean };

export type MethodProof = { slug: string; title: string; eyebrow: string };

export type MethodStage = {
  id: string; // anchor id — also used by the overview strip to link into the ladder
  number: string; // "01"–"05"
  stage: string; // short label for the overview strip
  claim: string; // judgment-forward headline for the ladder row
  body: string;
  tactics: MethodTactic[];
  proof: MethodProof[];
};

export const METHOD_STAGES: MethodStage[] = [
  {
    id: "strategy",
    number: "01",
    stage: "Strategy",
    claim: "Framing the right problem before designing a solution",
    body: "Reframing the ask, mapping the system, and scoping what's actually worth building — before a single screen exists.",
    tactics: [
      { label: "Service blueprinting" },
      { label: "0→1 product strategy" },
      { label: "Roadmapping & scoping" },
    ],
    proof: [
      { slug: "metrolinx-presto", title: "PRESTO", eyebrow: "Transit service design · Metrolinx" },
      { slug: "experiencepoint-impact", title: "Impact", eyebrow: "Learning platform · ExperiencePoint" },
    ],
  },
  {
    id: "discovery",
    number: "02",
    stage: "Discovery",
    claim: "Getting to real users, even in a locked-down OR",
    body: "Ethnography and clinician interviews under real constraints — a live operating room, a fertility lab, a transit platform — not a usability lab.",
    tactics: [
      { label: "Ethnographic field research" },
      { label: "Clinician & OR interviews" },
      { label: "Workflow mapping" },
    ],
    proof: [
      { slug: "modus-v", title: "Modus X", eyebrow: "Surgical navigation · Synaptive Medical" },
      { slug: "cap-app-redesign", title: "Image Capture", eyebrow: "Clinical imaging · Future Fertility" },
    ],
  },
  {
    id: "definition",
    number: "03",
    stage: "Definition",
    claim: "Turning ambiguity into a system",
    body: "Scoping what to build and how it holds together — information architecture, a design system, a report-framing model a clinician can actually use.",
    tactics: [
      { label: "Design-system architecture", ai: true },
      { label: "Report-framing audits" },
      { label: "Requirements & scoping docs" },
    ],
    proof: [
      { slug: "ff-cloud", title: "Cloud", eyebrow: "AI healthtech · Future Fertility" },
      { slug: "ff-reports", title: "Violet & Magenta", eyebrow: "Clinical reporting · Future Fertility" },
    ],
  },
  {
    id: "ux-ui",
    number: "04",
    stage: "UX / UI",
    claim: "Designing the interface — and the parts kit behind it",
    body: "High-fidelity UI, voice control, a touchscreen, a virtual whiteboard: the same craft discipline whether the surface is a screen, a foot pedal, or a browser.",
    tactics: [
      { label: "High-fidelity prototyping", ai: true },
      { label: "Voice-UI design" },
      { label: "Virtual workshop design" },
    ],
    proof: [
      { slug: "modus-v", title: "Modus X", eyebrow: "Surgical navigation · Synaptive Medical" },
      { slug: "experiencepoint-impact", title: "Impact", eyebrow: "Learning platform · ExperiencePoint" },
    ],
  },
  {
    id: "build-launch",
    number: "05",
    stage: "Build & launch",
    claim: "Shipping it — increasingly, myself",
    body: "Design-to-dev handoff and clinical validation for regulated devices; on FF Cloud, I built the production-grade prototype myself, with agentic AI as the handoff vehicle.",
    tactics: [
      { label: "Human-AI build workflow", ai: true },
      { label: "FDA formative/summative testing" },
      { label: "Design-to-dev handoff" },
    ],
    proof: [
      { slug: "ff-cloud", title: "Cloud", eyebrow: "AI healthtech · Future Fertility" },
      { slug: "modus-v", title: "Modus X", eyebrow: "Surgical navigation · Synaptive Medical" },
    ],
  },
];
