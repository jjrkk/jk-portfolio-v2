import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Judgment / trade-offs — the senior differentiator (CLAUDE.md). Not process:
 * the load-bearing decisions and *why*, each framed as a deliberate trade-off.
 * Set on a tinted panel (--panel-bg) so it reads as the section that matters.
 */
export function CaseJudgment({ study }: { study: CaseStudy }) {
  const { eyebrow, title, intro, tradeoffs } = study.judgment;
  return (
    <section className="bg-panel-bg py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-display-sm font-semibold text-foreground">
              {title}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={0.1}>
              <p className="mt-6 font-sans text-body-lg text-muted">{intro}</p>
            </Reveal>
          )}
        </div>

        <ol className="mt-14 flex flex-col">
          {tradeoffs.map((t, i) => (
            <Reveal as="li" key={i} delay={0.05 * i}>
              <div className="grid grid-cols-1 gap-4 border-t border-border py-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-1">
                  <span className="font-mono text-caption text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-serif text-heading font-semibold text-foreground lg:col-span-4">
                  {t.decision}
                </h3>
                <p className="font-sans text-body text-muted lg:col-span-7">
                  {t.rationale}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
