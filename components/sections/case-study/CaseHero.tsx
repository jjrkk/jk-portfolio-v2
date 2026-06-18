import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Case-study hero (grammar #4): accent-color stage with the title overlapping
 * the hero image — white letterforms over the accent, outlined where they cross
 * the image.
 *
 * The crossing effect is a two-layer trick that's robust across breakpoints: a
 * FILL copy of the title sits *behind* the image (white, visible only where it
 * doesn't overlap), and an identical STROKE copy sits *above* the image
 * (transparent fill + white stroke, visible only over the image). Because both
 * copies share the same position, the switch from filled to outlined happens
 * exactly along the image's edge — no manual masking.
 */
export function CaseHero({ study }: { study: CaseStudy }) {
  const { eyebrow, title, subtitle, hero, confidential } = study;

  return (
    <header
      className="relative isolate"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      <Container className="pb-12 pt-32 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44">
        <div className="flex items-center gap-4">
          <Eyebrow mark={false} className="text-[color:var(--accent-contrast)]/80">
            {eyebrow}
          </Eyebrow>
          {confidential && (
            <span className="inline-flex items-center rounded-full border border-[color:var(--accent-contrast)]/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--accent-contrast)]/80">
              Confidential
            </span>
          )}
        </div>

        {/* ---- Desktop: overlapping title-on-image ---- */}
        <div className="relative mt-8 hidden lg:block">
          <div className="relative min-h-[clamp(28rem,42vw,40rem)]">
            {/* FILL title — white, behind the image */}
            <h1
              className="absolute bottom-0 left-0 z-0 max-w-[14ch] font-serif text-hero font-semibold"
              style={{ color: "var(--accent-contrast)" }}
            >
              {title}
            </h1>

            {/* Hero image — overlaps the title's right/tail */}
            <div className="relative z-10 ml-[34%] w-[66%] overflow-hidden rounded-2xl shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.src} alt={hero.alt} className="aspect-[16/11] w-full object-cover" />
            </div>

            {/* STROKE title — outline, above the image (identical position to FILL) */}
            <h1
              aria-hidden
              className="absolute bottom-0 left-0 z-20 max-w-[14ch] font-serif text-hero font-semibold"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px var(--accent-contrast)",
                paintOrder: "stroke",
              }}
            >
              {title}
            </h1>
          </div>

          <p className="mt-10 max-w-2xl font-sans text-body-lg text-[color:var(--accent-contrast)]/85">
            {subtitle}
          </p>
        </div>

        {/* ---- Mobile / tablet: clean stack (no overlap) ---- */}
        <div className="mt-8 lg:hidden">
          <h1
            className="font-serif text-display-sm font-semibold"
            style={{ color: "var(--accent-contrast)" }}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-xl font-sans text-body-lg text-[color:var(--accent-contrast)]/85">
            {subtitle}
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl shadow-[0_30px_70px_-40px_rgba(0,0,0,0.5)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.src} alt={hero.alt} className="aspect-[16/11] w-full object-cover" />
          </div>
        </div>
      </Container>
    </header>
  );
}
