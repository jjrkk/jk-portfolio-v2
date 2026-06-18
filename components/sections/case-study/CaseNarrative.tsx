import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { CaseFigure } from "./CaseFigure";
import type { CaseNarrativeBlock } from "@/lib/case-studies";

/**
 * A narrative beat: eyebrow + title + body, with an optional light-stage figure
 * below. The repeatable middle of a case study — sequence as many as the story
 * needs. Narrow text measure keeps it readable; figures break wide.
 */
export function CaseNarrative({ block }: { block: CaseNarrativeBlock }) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>{block.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-title font-semibold text-foreground">
              {block.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-col gap-5">
              {block.body.map((p, i) => (
                <p key={i} className="font-sans text-body-lg text-muted">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      {block.figure && (
        <div className="mt-12 sm:mt-16">
          <CaseFigure figure={block.figure} />
        </div>
      )}
    </section>
  );
}
