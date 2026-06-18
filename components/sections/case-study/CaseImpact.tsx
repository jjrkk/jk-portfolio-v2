import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * Impact — hard or directional numbers on the project accent. The accent
 * background makes this the page's climactic chapter break: everything before
 * was process; this is what it produced.
 */
export function CaseImpact({ study }: { study: CaseStudy }) {
  const { eyebrow, title, body, metrics } = study.impact;
  return (
    <section
      className="py-16 sm:py-24"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <span className="font-mono text-eyebrow uppercase tracking-[0.18em] text-accent-contrast/60">
              {eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-display-sm font-semibold text-accent-contrast">
              {title}
            </h2>
          </Reveal>
          {body.map((p, i) => (
            <Reveal key={i} delay={0.1}>
              <p className="mt-6 font-sans text-body-lg text-accent-contrast/70">{p}</p>
            </Reveal>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-accent-contrast/20 pt-12 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div>
                <dt className="font-serif text-display-sm font-semibold leading-none text-accent-contrast">
                  {m.value}
                </dt>
                <dd className="mt-4">
                  <span className="block font-sans text-body font-medium text-accent-contrast">
                    {m.label}
                  </span>
                  {m.note && (
                    <span className="mt-1 block font-sans text-caption text-accent-contrast/50">
                      {m.note}
                    </span>
                  )}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
