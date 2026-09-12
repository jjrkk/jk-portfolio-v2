import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { SpecularBorder } from "@/components/ui/SpecularBorder";
import { RECOMMENDATIONS, RECOMMENDATIONS_TOTAL, RECOMMENDATIONS_URL } from "@/lib/recommendations";

/**
 * "In their words" — LinkedIn recommendations, placed directly under Range
 * so the altitude claims Range just made (strategy → build) get corroborated
 * in other people's words immediately, not several screens later.
 *
 * A static grid, not a carousel: carousel engagement data (NN/g, Notre Dame)
 * shows ~1% interaction and ~84% of that on slide one — anything placed past
 * the first view is effectively unseen. This is a deliberately curated
 * subset (lib/recommendations.ts); the full-25 flex is a closing outbound
 * link, not a wall of cards or a summary stat line.
 *
 * Cards use the same luminous hairline edge as the landing/case-study card
 * shells (SpecularBorder) on a whisper-off-white fill (--panel-bg, not pure
 * --surface white) instead of a flat all-sides border — and fold the
 * relationship tag into the byline instead of a bottom pill badge — one
 * fewer "SaaS testimonial" tell.
 */
export function Recommendations() {
  return (
    <Section tone="tinted">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>In their words</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-display-sm font-semibold text-foreground">
              From the people who managed me, reported to me, and shipped
              beside me.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECOMMENDATIONS.map((r, i) => (
            <Reveal as="li" key={r.id} delay={Math.min(i * 0.04, 0.2)} className="h-full">
              <div className="relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl bg-panel-bg p-6 sm:p-7">
                <SpecularBorder radius="rounded-2xl" />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-sans text-body font-medium text-foreground">{r.name}</p>
                    <span className="shrink-0 font-mono text-[11px] text-faint">{r.year}</span>
                  </div>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-faint">
                    {r.role}
                    {r.company && (
                      <>
                        {" · "}
                        <span className="text-foreground">{r.company}</span>
                      </>
                    )}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                    {r.relationship}
                  </p>
                </div>

                <p className="flex-1 font-serif text-body-lg text-foreground">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-10 border-t border-border pt-8">
          <ArrowLink href={RECOMMENDATIONS_URL} external>
            All {RECOMMENDATIONS_TOTAL} on LinkedIn
          </ArrowLink>
        </Reveal>
      </Container>
    </Section>
  );
}
