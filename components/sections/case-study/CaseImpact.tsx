import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Impact — hard or directional numbers (CLAUDE.md). Big serif metric values on
 * the accent, with a label and a quiet note for provenance/caveats.
 */
export function CaseImpact({ study }: { study: CaseStudy }) {
  const { eyebrow, title, body, metrics } = study.impact;
  return (
    <Section>
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
          {body.map((p, i) => (
            <Reveal key={i} delay={0.1}>
              <p className="mt-6 font-sans text-body-lg text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-border pt-12 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div>
                <dt className="font-serif text-display-sm font-semibold leading-none text-accent">
                  {m.value}
                </dt>
                <dd className="mt-4">
                  <span className="block font-sans text-body font-medium text-foreground">
                    {m.label}
                  </span>
                  {m.note && (
                    <span className="mt-1 block font-sans text-caption text-faint">
                      {m.note}
                    </span>
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
