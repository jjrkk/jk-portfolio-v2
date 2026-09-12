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
 * not asserted in a caption next to them. `emphasis: true` renders the same
 * accent color for a tactic that isn't AI-specific but is each stage's
 * single strongest/lead proof point — a distinct field so that visual
 * weight never overstates what's actually AI-related.
 */

export type MethodTactic = { label: string; ai?: boolean; emphasis?: boolean };

export type MethodProof = { slug: string; title: string; eyebrow: string };

export type MethodStage = {
  id: string; // anchor id — also used by the overview strip to link into the ladder
  stage: string; // short label for the overview strip
  claim: string; // judgment-forward headline for the ladder row
  body: string;
  tactics: MethodTactic[];
  proof: MethodProof[];
  /** Icon-tile color for this row. Deliberately curated (not auto-derived
   *  from proof[0]'s project theme) so adjacent rows stay visually distinct
   *  even when two rows cite the same case as their strongest evidence.
   *  Build & launch uses the brand accent rather than a case color — it's
   *  the AI-native/build stage, and that also happens to match its own
   *  AI-flagged tactic color, which reads as intentional rather than a
   *  coincidence. Picked from lib/theme.ts's PROJECT_THEMES + SITE_ACCENT,
   *  spaced for max hue separation front to back: green → teal → blue →
   *  yellow → brand fuchsia. */
  color: string;
};

export const METHOD_STAGES: MethodStage[] = [
  {
    id: "strategy",
    stage: "Strategy",
    claim: "Framing the right problem before designing a solution",
    body: "Reframing the ask, mapping the system, and scoping what's actually worth building — before a single screen exists.",
    tactics: [
      { label: "0→1 product strategy", emphasis: true },
      { label: "Service blueprinting" },
      { label: "Roadmapping & scoping" },
    ],
    proof: [
      { slug: "metrolinx-presto", title: "PRESTO", eyebrow: "Transit service design · Metrolinx" },
      { slug: "experiencepoint-impact", title: "Impact", eyebrow: "Learning platform · ExperiencePoint" },
    ],
    color: "#3e8e57", // PRESTO green
  },
  {
    id: "discovery",
    stage: "Discovery",
    claim: "Getting to real users, even in an operating room",
    body: "Ethnography and clinician interviews under real constraints — a live operating room, a fertility lab, a transit platform — not a usability lab.",
    tactics: [
      { label: "Ethnographic field research", emphasis: true },
      { label: "Clinician & interviews" },
      { label: "Workflow mapping" },
    ],
    proof: [
      { slug: "modus-v", title: "Modus X", eyebrow: "Surgical navigation · Synaptive Medical" },
      { slug: "cap-app-redesign", title: "Image Capture", eyebrow: "Clinical imaging · Future Fertility" },
    ],
    color: "#0e8c9c", // Modus X teal
  },
  {
    id: "definition",
    stage: "Definition",
    claim: "Turning ambiguity into a system",
    body: "Scoping what to build and how it holds together — information architecture, a design system, a report-framing model a clinician can actually use.",
    tactics: [
      { label: "Design-system architecture", ai: true },
      { label: "Report-framing audits" },
      { label: "Requirements & scoping docs" },
    ],
    proof: [
      { slug: "ff-reports", title: "Egg Quality Reports", eyebrow: "Clinical reporting · Future Fertility" },
      { slug: "ff-cloud", title: "Cloud", eyebrow: "AI healthtech · Future Fertility" },
    ],
    color: "#40539e", // FF Cloud blue
  },
  {
    id: "ux-ui",
    stage: "UX / UI",
    claim: "Designing the interface — and the parts kit behind it",
    body: "High-fidelity UI, voice control, a touchscreen, a virtual whiteboard: the same craft discipline whether the surface is a screen, a foot pedal, or a browser.",
    tactics: [
      { label: "High-fidelity prototyping", ai: true },
      { label: "Voice-UI design" },
      { label: "Virtual workshop design" },
    ],
    proof: [
      { slug: "cap-app-redesign", title: "Image Capture App", eyebrow: "Clinical imaging · Future Fertility" },
      { slug: "experiencepoint-impact", title: "Impact", eyebrow: "Learning platform · ExperiencePoint" },
    ],
    color: "#F2CA3F", // Impact yellow
  },
  {
    id: "build-launch",
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
    color: "#D7355D", // brand accent — the AI-native/build stage, not FF Cloud's blue (already used above)
  },
];
