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
  const aside = block.figureLayout === "aside" && !!block.figure;
  const sectionBg = block.sectionTone === "tinted" ? "bg-[#edeae6]" : "bg-background";

  const textBlock = (
    <div className={aside ? undefined : "max-w-3xl"}>
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
  );

  if (aside) {
    const fig = block.figure!;
    return (
      <section className={`${sectionBg} py-16 sm:py-20`}>
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
            {textBlock}
            {/* Render figure directly (no inner Container) so it fills the column cleanly.
                overflow-hidden + scale(1.015) clips any 1-2px artifact at the image edges. */}
            <Reveal delay={0.08}>
              <figure>
                <div className="overflow-hidden rounded-2xl shadow-[0_20px_60px_-16px_rgba(21,19,15,0.22)]">
                  <img
                    src={fig.src}
                    alt={fig.alt}
                    className="w-full scale-[1.015]"
                  />
                </div>
                {fig.caption && (
                  <figcaption className="mt-4 font-sans text-caption text-faint">
                    {fig.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={`${sectionBg} py-16 sm:py-20`}>
      <Container>
        {textBlock}
      </Container>

      {block.figure && (
        <div className="mt-12 sm:mt-16">
          <CaseFigure figure={block.figure} />
        </div>
      )}
    </section>
  );
}
