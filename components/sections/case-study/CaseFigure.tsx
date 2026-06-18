import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseFigure as CaseFigureData } from "@/lib/case-studies";

/**
 * The template's signature move (CLAUDE.md): screenshots are heroes, on LIGHT
 * stages — a bright surface with generous padding so the work is the brightest,
 * largest thing on the page. Fixes the old site's small/low-contrast sin.
 *
 * wide=true breaks OUT of the Container — the card runs near-full-viewport so
 * the "money shot" has genuine visual mass. Default stays contained at max-w-4xl.
 */
export function CaseFigure({ figure }: { figure: CaseFigureData }) {
  const card = (
    <figure className={cn("mx-auto", !figure.wide && "max-w-4xl")}>
      <div className="rounded-2xl border border-border bg-surface p-3 shadow-[0_30px_80px_-50px_rgba(21,19,15,0.4)] sm:p-6 lg:p-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={figure.src} alt={figure.alt} className="w-full rounded-lg" />
      </div>
      {figure.caption && (
        <figcaption className="mt-4 font-sans text-caption text-faint">
          {figure.caption}
        </figcaption>
      )}
    </figure>
  );

  if (figure.wide) {
    return (
      <Reveal>
        <div className="px-4 sm:px-6 lg:px-10">{card}</div>
      </Reveal>
    );
  }

  return (
    <Container>
      <Reveal>{card}</Reveal>
    </Container>
  );
}
