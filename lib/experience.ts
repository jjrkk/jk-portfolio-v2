/**
 * Experience timeline for the About page. Curated from Justin's LinkedIn into
 * Director-scale, one-line-impact framing — the senior read, not a duty list.
 * Most recent first. Keep entries tight; the case studies carry the depth.
 */

export type Role = {
  company: string;
  title: string;
  period: string;
  blurb: string;
};

export const EXPERIENCE: Role[] = [
  {
    company: "Future Fertility",
    title: "Product Design Lead",
    period: "2024 — Present",
    blurb:
      "Leading product design & UX research for an AI-powered fertility platform. Redesigned the flagship oocyte-evaluation reports (VIOLET™ & MAGENTA™) into five languages for a global clinical audience.",
  },
  {
    company: "ExperiencePoint",
    title: "Director, Product → Product Design Lead",
    period: "2020 — 2023",
    blurb:
      "Directed strategy for a 10+ product portfolio serving 25,000+ users a year. Led the 0→1 build of Impact, a virtual design sprint now used across 8 countries; clients included half the Fortune 100.",
  },
  {
    company: "Fjord · Accenture",
    title: "Service & Interaction Design Lead",
    period: "2019",
    blurb:
      "Led a design team for TD Bank's international money-transfer product (millions of users) and co-led the Metrolinx / PRESTO service design now used by 50M+ monthly transit riders across Ontario.",
  },
  {
    company: "Synaptive Medical",
    title: "Manager, Product Design → UX Lead",
    period: "2017 — 2018",
    blurb:
      "Led the software (UX) and hardware (ID) design team for a neurosurgical suite. Redesigned the UI for Modus V, a $1M+ surgical robotic microscope, plus a surgeon voice-control UI — under FDA submission protocol.",
  },
  {
    company: "Healthcare Human Factors · UHN",
    title: "Associate Director, Experience Design",
    period: "2013 — 2017",
    blurb:
      "Helped lead the largest healthcare-dedicated human-factors & UX team internationally (23 designers and specialists) across 20+ medical-device and digital-health projects for public and private clients.",
  },
  {
    company: "Publicis Sapient",
    title: "Information Architect, Experience Design",
    period: "2011 — 2013",
    blurb:
      "UX for large-scale cross-channel platforms — Jeep Badge of Honor (100k+ downloads), Chrysler International's 60+ market sites, plus work for Intel and Unilever.",
  },
];

export const EDUCATION = [
  {
    school: "University of Toronto",
    detail: "BASc, Industrial Engineering · P.Eng.",
  },
  {
    school: "Product School",
    detail: "Product Management Certificate",
  },
];
