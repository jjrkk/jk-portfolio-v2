/**
 * "In their words" section (About page) — curated LinkedIn recommendations.
 * Source: Justin's LinkedIn recommendations page (25 total, 2010–2026).
 * Quotes are lightly trimmed for card length; a mid-quote cut is marked
 * with "…" so nothing reads as more complete than it is. Titles use each
 * recommender's own LinkedIn headline — no employer is asserted unless
 * their own headline or relationship line named one.
 *
 * `relationship` is the differentiator worth surfacing: LinkedIn already
 * tells us whether each person managed Justin, reported to him, or worked
 * alongside him. Rendered as a tag per card so the set reads as "trusted
 * up, down, and across" rather than a generic praise wall.
 *
 * `role` and `company` are split (not one combined title string) so the
 * card can give the organization more visual weight than the job title —
 * the roster of companies is itself part of the credibility signal here.
 * `company` is omitted, never invented, where a recommender's own LinkedIn
 * headline didn't name one.
 *
 * `year` is the date LinkedIn shows on the recommendation itself (when it
 * was written, not when the working relationship happened). Surfaced per
 * card — spanning 2013–2026 — so the longitudinal spread reads implicitly
 * from the cards themselves rather than needing a summary stat line.
 *
 * `color` drives a low-opacity corner wash behind each card's content (see
 * Recommendations.tsx) — decorative variety, not a claimed legend like
 * Range's tile colors. Pulled from the same harmonized family already
 * established in lib/theme.ts's PROJECT_THEMES (7 of these 9 already
 * appear one section up, in Range) plus two new hues (plum, terracotta)
 * added to fill gaps in the wheel. Assigned so every pair of grid-adjacent
 * cards (3-col layout) stays well-separated in hue — Kirsten's magenta and
 * David/Andrew's ExperiencePoint yellow are the only "accurate" ties (she
 * names the Violet & Magenta reports directly; they were both there); the
 * rest are chosen for separation and variety, not claimed meaning. */

export type Recommendation = {
  id: string;
  name: string;
  role: string;
  company?: string;
  relationship: string;
  year: number;
  color: string;
  quote: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "ramzi-rahbani",
    name: "Ramzi Rahbani",
    role: "Chief Product Officer",
    company: "FortNine & Defender Marine",
    relationship: "Managed Justin",
    year: 2023,
    color: "#40539e", // blue
    quote:
      "Justin was my right hand. Whether operating at 10,000 ft or executing in sprints, Justin always delivered with the highest quality of work. He is versatile, quick thinking and kind. A unique blend for a leader.",
  },
  {
    id: "kirsten-anwender",
    name: "Kirsten Anwender",
    role: "VP of Marketing",
    company: "Future Fertility",
    relationship: "Senior to Justin",
    year: 2026,
    color: "#b1309a", // magenta — Violet & Magenta, which she names directly
    quote:
      "Justin quickly got up to speed and took the lead on redesigning our flagship products — egg quality reports used by both clinical staff and fertility patients. His design process was very thoughtful and thorough, gaining both cross-functional and external clinical/patient feedback to shape the new designs.",
  },
  {
    id: "david-haapalehto",
    name: "David Haapalehto",
    role: "Building today's systems and tomorrow's foundations",
    company: "ExperiencePoint",
    relationship: "Peer, same team",
    year: 2024,
    color: "#F2CA3F", // yellow — Impact/ExperiencePoint
    quote:
      "Justin is an incredible leader, manager and top-tier designer. He's uniquely capable of operating at any level of an opportunity, from business model to user experience… I would work with Justin again in a heartbeat.",
  },
  {
    id: "andrew-webster",
    name: "Andrew Webster",
    role: "Organizational Change & Innovation Capability",
    company: "ExperiencePoint",
    relationship: "Senior to Justin",
    year: 2024,
    color: "#D7355D", // brand fuchsia
    quote:
      "If you need someone to lead a team and tackle complex or ambiguous problems, Justin is a great option — and he's also a great option if that team needs to roll up their sleeves and design an architecture or front-end experience.",
  },
  {
    id: "donna-hidalgo",
    name: "Donna Hidalgo",
    role: "Experienced Product Professional",
    relationship: "Hired & managed Justin",
    year: 2021,
    color: "#0e8c9c", // teal
    quote:
      "It's rare that you come across a talent like Justin… Justin earns my highest recommendation. Any organization would be very lucky to have him.",
  },
  {
    id: "christine-yang",
    name: "Christine Yang",
    role: "Product Designer",
    company: "Jobber",
    relationship: "Reported to Justin",
    year: 2019,
    color: "#3e8e57", // green
    quote:
      "I was very fortunate to have worked with Justin on multiple projects, witnessing what strong design leadership truly looks like. He brings a careful balance to his management style, giving his team the confidence to solve problems independently while supporting along the way.",
  },
  {
    id: "debbie-y",
    name: "Debbie Y",
    role: "Service & Interaction Designer",
    relationship: "Reported to Justin",
    year: 2019,
    color: "#5b3a66", // plum
    quote:
      "Justin led with accountability, transparency, humility, and expertise — but best of all, he made it his priority to ensure that each team member's individual personal growth objectives were being met.",
  },
  {
    id: "johnathan-hok",
    name: "Johnathan Hok",
    role: "Staff Software Architect",
    company: "CS Disco",
    relationship: "Peer, same team",
    year: 2013,
    color: "#c1553a", // terracotta
    quote:
      "Justin has the ability to break down complex problems into something regular people can understand — and he can do it without even breaking a sweat.",
  },
  {
    id: "elina-lawrie",
    name: "Elina Lawrie",
    role: "Managing Director",
    company: "Accenture Song",
    relationship: "Peer, same team",
    year: 2016,
    color: "#6d54c9", // purple
    quote:
      "Justin's leadership style promotes great teamwork amongst colleagues and clients. During a co-creation workshop for Prostate Cancer Canada and the Movember Foundation, he tactfully brought clients, patients and caregivers into the design process, ensuring they felt heard, involved, and at ease the whole way through.",
  },
];

/** Verified against the source recommendations (2026-09-12): 25 total —
 *  4 managed Justin directly, 4 were senior without managing him, 5
 *  reported to him directly, 11 were peers (same or cross-functional
 *  teams), 1 was a client. */
export const RECOMMENDATIONS_TOTAL = 25;
export const RECOMMENDATIONS_URL =
  "https://www.linkedin.com/in/justinkirkey/details/recommendations/";
