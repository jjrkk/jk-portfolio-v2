# FF Cloud Flagship Case Study — Outline & Content Plan
**Justin Kirkey · June 14, 2026**

The build-ready outline for the headline case study: an AI-native design-systems modernization of a clinical SaaS platform, built via a deliberate human-AI workflow. This is the portfolio's #1 differentiator — it's the only artifact that proves the whole thesis (design leadership + judgment + hands-on AI building + healthcare depth) in one place.

**Abstraction level (per your call):** before/after screenshots and highlights are fine; no real colleague names; soften unreleased-roadmap specifics and internal financials/dev-hour figures. Use a tasteful "Confidential / NDA" pill where you show product UI. Frame to *what you delivered* (validated, approved, handed-off high-fidelity prototype + codified design system), never to a shipped user outcome you can't claim.

---

## Positioning / one-liner options (for the hero)

- "Modernizing a clinical AI platform — and pioneering the human-AI workflow that built it."
- "How I led the redesign of a fertility-AI platform while building the production-grade prototype myself, with agentic AI."
- Pick one; it must telegraph BOTH the design leadership AND the build-with-AI angle in a single breath.

**Meta-row (your standard template):**
- **Role:** Product Design Lead — design direction, design-system architecture, hands-on prototype build
- **Users:** Embryologists, lab directors, clinical & internal admin roles
- **Methods:** Design-system architecture, research synthesis, high-fidelity prototyping, human-AI build workflow, design-to-dev handoff
- **Subject:** AI healthtech / clinical SaaS / regulated medical UI
- **Timeframe:** 2025–2026

---

## Narrative shape (why this one breaks your usual template)

Your other case studies are Background → Approach → Impact. This one keeps that spine but adds a dedicated, prominent **"How I worked with AI"** section — because that's the part no other senior designer's portfolio can show. Recommended section order below.

---

## Section 1 — Background / The Problem

**The setup (abstracted):** A Canadian healthtech company uses AI to assess egg and embryo quality from microscope images, generating predictive reports clinicians use to counsel fertility patients. Its primary web platform — used daily by embryologists and lab directors to review image QC, approve reports, and share them — had grown into a functional but dated, cluttered tool. Internally described as a competitive liability: "Excel-like," accreted feature-by-feature, visually behind the AI sophistication it was supposed to express.

**The strategic frame (this is the senior hook):** This wasn't a cosmetic refresh. The business was trying to evolve from a per-report point solution into a sticky, multi-role **SaaS intelligence platform**. The redesign was the first concrete step in that shift — modernization in service of a platform strategy, not a reskin.

**What made it hard:**
- Regulated medical context — clinical credibility and traceability are non-negotiable.
- Dense, high-frequency professional use — density is a *feature* here, not a problem to design away.
- A real research-confidence gap (honest framing: much of the platform insight was internally proxied; a key open question was validating navigation defaults with external users — name this as a known limitation you designed around, not a thing you hid).
- A multi-role platform (embryologists vs. lab directors vs. clinicians vs. internal admins) with genuinely different needs and asymmetric satisfaction.

North-star words (from the PRD): **modernization, delight, coherence, scalability.** What it should feel like: a refined clinical operating system — premium, calm, clinically credible, warm-but-not-decorative. What it must NOT feel like: generic admin software, an Excel-like list wrapper, or a decorative dashboard.

---

## Section 2 — Approach / How I Framed the Work

**Research-grounded, not cosmetic.** Synthesized existing qualitative research into themes and a set of evidence-backed design decisions. Show 2-3 of the strongest, abstracted — e.g.:
- A dual default-view model (a fast, task-oriented list as the default, with a role-appropriate alternate view) — the most load-bearing IA decision, and honestly flagged as needing external validation.
- A decoupling of product-identity color from platform UI color, so product meaning stays meaningful and the chrome stays neutral.
- An AI-positioning principle: the product frames AI as decision-*support* for clinicians, never autonomous — reinforced in copy and empty states.

**A "what to preserve" discipline (great judgment signal).** Before removing anything, you catalogued the platform's quiet strengths (the things satisfied users never file tickets about) and protected them — cumulative reporting, the scannable product color-badges, the home-page filters as a QC tool, the three-panel detail layout trainers rely on. *This is exactly the "judgment over artifacts" the market rewards — lead with it.*

**Craft reference:** a warm-clinical aesthetic (soft, generous, restrained — "borders before shadows") rather than enterprise-heavy or consumer-playful.

---

## Section 3 — How I Worked With AI ⭐ (the differentiator — give it prominence)

This is the section that makes the case study uncopyable. Be concrete and specific — vague "I used AI" claims are worthless; the *system of judgment* is the value.

**The dual-thread model:**
- A **strategy/judgment thread** (Claude.ai) for design reasoning, context preservation, prompt drafting, triage, and A/B framing — where the thinking happened.
- An **implementation thread** (Claude Code / agentic coding) for actual prototype edits — fed by prompts from the strategy thread, with results brought back for assessment before greenlighting the next step.
- The human stays the spine; AI is the implementation muscle. *You decide; the AI executes; you evaluate.*

**Model-selection discipline:** lighter/faster model for execution-heavy work with resolved decisions; heavier/reasoning model for judgment-under-ambiguity, reframing, and visual-judgment passes with multiple A/Bs. Escalate mid-session when a tension surfaces that needs reframing.

**A working principle worth showing — iteration vs. spec calibration:** when feedback arrived mid-build, you distinguished "the spec was wrong (amend + implement together)" from "this is a new direction arriving after codification (separate pass against the baseline)." Codification lands first. This demonstrates systems thinking about an AI-assisted process, not just tool use.

**The output:** a high-fidelity, genuinely interactive React/Vite prototype that served as the **source of truth and handoff vehicle** — not throwaway mockups. The design intent lived in working code; production (a different stack) translates that intent rather than copying it.

**Optional diagram:** a simple visual of the dual-thread loop (strategy ⇄ implementation, human-in-the-loop). This would be a memorable, ownable graphic — and a nice "make it your own" flourish distinct from Robin's site.

---

## Section 4 — The Design System (depth / rigor signal)

Show that this was systems work, not screen decoration. Abstracted highlights:

- **A framework-agnostic, AI-readable design system** — tokens and rules documented so both humans and AI agents could build against them consistently. (The "AI-readable by design" principle is itself a 2026-forward idea worth naming.)
- **A three-tier color model:** platform (a single neutral-first accent), product (identity markers only, never generic accents), semantic (status, always paired with a non-color cue). Show the product palette and the single platform accent.
- **A status system** with a small, honest vocabulary (e.g., Needs Attention / In Review / Ready / Delivered), each with defined action-gating and calm, decisive (not alarming) visual treatment.
- **Principles worth quoting:** Calm Precision; Premium Restraint; Dense Clarity (density as a feature); Borders Before Shadows; System Over One-Offs; parallel hand-tuned light/dark theming (never auto-inverted); Build Through Validation (lock what's stable, mark what's provisional).

This section is where before/after screenshots of the dashboard (the hero surface) and the assessment detail view land hardest. Present them LARGE on light stages.

---

## Section 5 — Selected Surfaces / Before & After

Lead with the dashboard (the hero surface, most mature). For each: a tight problem → decision → result caption.
- **Dashboard / "Clinic Snapshot":** from an Excel-like list toward a calm, scannable, role-aware overview with clinically-meaningful KPIs (not vanity/volume counts — a real insight from the research worth calling out).
- **Assessment detail view:** preserved the three-panel training anchor while modernizing density and clarity.
- **Report sharing / quick actions:** addressed the highest-leverage workflow friction (e.g., quick actions from the list view).
- Link to the **live prototype** (the ~90%-complete artifact) — this is your proof, and it resolves "is it real?" instantly.

---

## Section 6 — Impact / Outcome (frame honestly)

Because this didn't reach end users on your watch, the impact is about *what you delivered and de-risked*, not user metrics. Strong, true framings:
- Delivered a validated, high-fidelity prototype + codified design system, **approved at leadership level for rollout.**
- Reframed the platform's direction from point-solution to SaaS-platform — the design made the strategy tangible.
- Created a reusable, AI-readable design-system foundation that de-risks all downstream build work.
- Pioneered a repeatable human-AI build workflow now documented for the team.
- **Honest forward-look:** name what you'd validate next (the navigation-default question with external users) — showing you know the difference between "designed" and "proven" is itself a senior signal.

⚠️ Do NOT claim shipped-to-users outcomes, adoption numbers, or NPS changes for the redesign — it hadn't reached users. Claim the delivery, the approval, and the system.

---

## Section 7 — Reflection (short, optional)

One or two honest sentences: what you learned about leading design *and* building with AI at the same time; the judgment of protecting quiet strengths while modernizing; what working in production-grade code (vs. static mockups) changed about handoff. Keep it human and brief.

---

## Asset checklist for this case study

- [ ] Dashboard before/after (large, light stage, NDA pill)
- [ ] Assessment detail before/after
- [ ] Design-system highlights: color tiers, status vocabulary, a few core components
- [ ] The dual-thread AI workflow diagram (custom graphic — ownable flourish)
- [ ] Live prototype link (verify it's publicly reachable / consider a guided read-only path)
- [ ] 1-2 abstracted research-insight callouts
- [ ] Per-project accent palette for the case-study panel (suggest the platform blue / a violet-magenta family — distinct from Robin's reds, helps "make it your own")

---

## Confidentiality reminders

- No real colleague names anywhere.
- Soften/omit: unreleased roadmap timing, dev-hour estimates, internal financials, internal "competitive liability"-type quotes (paraphrase the *idea* without the internal voice).
- Product names/screenshots: you're comfortable showing — use the NDA pill and keep it tasteful.
- Optional courtesy: a short note to your FF contact confirming they're fine with an abstracted case study. Low cost, removes future ambiguity.

---

*Last artifact of the planning thread. Companion docs: Career-Materials-Audit_JK_2026-06-13 and Portfolio-Rebuild-Plan_JK_2026-06-14. For the build, start a fresh thread with these three files + the FF context pack + PRD as project files.*
