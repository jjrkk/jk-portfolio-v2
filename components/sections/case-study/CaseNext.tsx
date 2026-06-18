import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getProjectTheme } from "@/lib/theme";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Closing "next case study" link — keeps the reader moving through the work.
 * Themed to the *next* project's accent so it previews where it leads.
 */
export function CaseNext({ next }: { next: NonNullable<CaseStudy["next"]> }) {
  const theme = getProjectTheme(next.slug);
  return (
    <section className="border-t border-border bg-background">
      <Container>
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-4 py-16 sm:py-20"
          style={theme ? ({ "--accent": theme.accent } as React.CSSProperties) : undefined}
        >
          <Eyebrow>Next case study</Eyebrow>
          <div className="flex items-baseline justify-between gap-6">
            <span className="font-serif text-display-sm font-semibold text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
            <span
              aria-hidden
              className="font-serif text-display-sm text-accent transition-transform duration-300 ease-out group-hover:translate-x-2"
            >
              →
            </span>
          </div>
          <span className="font-mono text-eyebrow uppercase tracking-[0.14em] text-faint">
            {next.eyebrow}
          </span>
        </Link>
      </Container>
    </section>
  );
}
