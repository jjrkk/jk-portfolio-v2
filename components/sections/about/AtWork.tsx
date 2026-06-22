import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

// The AI-native build thesis, reframed from the old landing section into an
// "AT WORK" philosophy block (CLAUDE.md About IA). Short, judgment-forward —
// the full method lives in the FF Cloud "How I worked with AI" section.
const POINTS = [
  {
    title: "Two threads, human in the loop",
    body: "A strategy thread for the thinking; an implementation thread — Claude Code — for the build. I decide, the AI executes, I evaluate.",
  },
  {
    title: "Model-selection discipline",
    body: "Lighter models for resolved, execution-heavy work; heavier reasoning models for judgment under ambiguity and visual A/Bs.",
  },
  {
    title: "The prototype is the handoff",
    body: "Design intent lives in working, production-grade code — a source of truth for engineering, not throwaway mockups.",
  },
];

export function AtWork() {
  return (
    <Section tone="tinted">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>At work</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-title text-foreground">
                Design leadership with my hands on the tools — directing agentic
                AI like a team, and owning the judgment myself.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md font-sans text-body text-muted">
                I came up through engineering, fell for the craft, and never
                stopped building. I ask a lot of questions to get at the real
                problem, then move fast in working code — so the thing we&rsquo;re
                deciding on is the thing we&rsquo;ll ship.
              </p>
            </Reveal>
          </div>

          <ul className="lg:col-span-6 lg:col-start-7">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.05 * i}>
                <div className="border-t border-border py-7">
                  <h3 className="font-sans text-heading font-medium text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-md font-sans text-body text-muted">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
