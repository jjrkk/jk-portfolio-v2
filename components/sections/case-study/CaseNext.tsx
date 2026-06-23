import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getProjectTheme } from "@/lib/theme";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Closing "next case study" link — keeps the reader moving through the work.
 * The section floods with the *next* project's accent so it previews where it
 * leads and gives the page a strong visual close before Contact.
 */
export function CaseNext({ next }: { next: NonNullable<CaseStudy["next"]> }) {
  const theme = getProjectTheme(next.slug);
  return (
    <section
      className="mx-[12px] overflow-hidden rounded-b-[2rem] bg-accent"
      style={theme ? ({ "--accent": theme.accent } as React.CSSProperties) : undefined}
    >
      <Container>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-4 py-20 sm:py-28"
        >
          <Eyebrow mark={false} className="text-[color:var(--accent-contrast)]/70">
            Next case study
          </Eyebrow>
          <div className="flex items-end justify-between gap-8">
            <span
              className="font-serif text-display-sm font-semibold leading-none transition-opacity duration-300 group-hover:opacity-75"
              style={{ color: "var(--accent-contrast)" }}
            >
              {next.title}
            </span>
            <span
              aria-hidden
              className="shrink-0 font-serif text-display-sm font-semibold transition-transform duration-300 ease-out group-hover:translate-x-3"
              style={{ color: "var(--accent-contrast)" }}
            >
              →
            </span>
          </div>
          <span
            className="font-mono text-eyebrow uppercase tracking-[0.14em] opacity-70"
            style={{ color: "var(--accent-contrast)" }}
          >
            {next.eyebrow}
          </span>
        </Link>
      </Container>
    </section>
  );
}
