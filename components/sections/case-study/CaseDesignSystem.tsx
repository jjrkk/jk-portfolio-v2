import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { CaseDesignSystem as CaseDesignSystemData } from "@/lib/case-studies";

/**
 * Flagship-only: the design-system showcase, rendered live from the real tokens
 * (three-tier colour model + status vocabulary) rather than a static export —
 * the case study shows the system by being built on the same discipline.
 */
export function CaseDesignSystem({ data }: { data: CaseDesignSystemData }) {
  const { eyebrow, title, intro, principles, colorTiers, statuses } = data;

  return (
    <section className="bg-[#edeae6] py-24 sm:py-32">
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
          {intro.map((p, i) => (
            <Reveal key={i} delay={0.1}>
              <p className="mt-6 font-sans text-body-lg text-muted">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* Principles — the durable rules, as a quiet wrapped row of mono chips */}
        {principles.length > 0 && (
          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {principles.map((p) => (
                <li
                  key={p}
                  className="inline-flex items-center rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {/* Three-tier colour model */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            {colorTiers.map((tier) => (
              <div
                key={tier.tier}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <span className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
                  {tier.tier}
                </span>
                <p className="mt-3 font-sans text-caption text-muted">{tier.rule}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {tier.swatches.map((s) => (
                    <li key={s.name} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-7 w-7 shrink-0 rounded-lg border border-black/5"
                        style={{ background: s.hex }}
                      />
                      <span className="flex flex-col">
                        <span className="font-sans text-caption font-medium text-foreground">
                          {s.name}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-faint">
                          {s.hex}
                          {s.sub ? ` · ${s.sub}` : ""}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Status vocabulary — small, honest, each with its action-gating */}
        {statuses.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-4 rounded-2xl border border-border bg-surface p-6 lg:p-8">
              <span className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
                Status vocabulary
              </span>
              <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {statuses.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: s.hex }}
                      />
                      <span className="font-sans text-body font-medium text-foreground">
                        {s.label}
                      </span>
                    </dt>
                    <dd className="mt-2 font-sans text-caption text-muted">{s.gating}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
