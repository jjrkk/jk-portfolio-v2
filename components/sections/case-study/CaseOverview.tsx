import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TwoColumn } from "@/components/ui/TwoColumn";
import { MetaList } from "@/components/ui/MetaList";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Overview (grammar #5): two columns — narrative left, metadata aside right
 * (Role / Users / Methods / Subject / Timeframe). The first white section after
 * the accent hero; sets the calm, light-first content rhythm.
 */
export function CaseOverview({ study }: { study: CaseStudy }) {
  return (
    <Section>
      <Container>
        <TwoColumn
          narrative={
            <Reveal>
              <div className="flex flex-col gap-6">
                {study.overview.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-serif text-heading leading-snug text-foreground"
                        : "font-sans text-body-lg text-muted"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          }
          aside={
            <Reveal delay={0.08}>
              <MetaList items={study.meta} />
            </Reveal>
          }
        />
      </Container>
    </Section>
  );
}
