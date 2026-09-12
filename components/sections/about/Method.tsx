"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { METHOD_STAGES } from "@/lib/method";
import { track } from "@/lib/analytics";

/**
 * "Range" — the spectrum-of-tactics section (CLAUDE.md About IA addition).
 * One taxonomy — Strategy → Discovery → Definition → UX/UI → Build & launch —
 * shown at two zoom levels: an overview strip (breadth, at a glance) and a
 * depth ladder below it (each stage's judgment claim, real tactics, and the
 * case study that proves it). The AI-native thread isn't a separate diagram;
 * AI-flagged tactics simply render lit in accent across all five stages, so
 * the throughline is visible rather than asserted.
 */
export function Method() {
  return (
    <Section tone="surface">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Range</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-display-sm font-semibold text-foreground">
              Design strategy as a spectrum of tactics.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 font-sans text-body-lg text-muted">
              Fifteen-plus years across strategy, research, definition, UI, and
              build — with AI now the newest layer, woven through every stage
              rather than bolted onto one.
            </p>
          </Reveal>
        </div>

        {/* Overview strip — breadth at a glance, plus the AI rail beneath it.
            Each label anchor-links down into its matching ladder row. */}
        <Reveal delay={0.15} className="mt-16">
          <ol className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {METHOD_STAGES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {s.number}
                  </span>
                  <span className="font-sans text-caption font-medium uppercase tracking-[0.06em] text-foreground transition-colors group-hover:text-accent">
                    {s.stage}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div aria-hidden className="relative mt-6 h-px w-full bg-border">
            <motion.div
              className="absolute inset-y-0 left-0 w-full bg-accent"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            AI-accelerated, top to bottom
          </p>
        </Reveal>

        {/* Depth ladder — same five stages, one level deeper. */}
        <ol className="mt-8">
          {METHOD_STAGES.map((s, i) => (
            <Reveal as="li" key={s.id} delay={Math.min(i * 0.04, 0.2)}>
              <div
                id={s.id}
                className="grid scroll-mt-28 grid-cols-1 gap-6 border-t border-border py-10 lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                    {s.number} — {s.stage}
                  </span>
                  <h3 className="mt-3 font-serif text-heading font-semibold text-foreground lg:text-title">
                    {s.claim}
                  </h3>
                  <p className="mt-3 max-w-md font-sans text-body text-muted">{s.body}</p>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <ul className="flex flex-wrap gap-2">
                    {s.tactics.map((t) => (
                      <li
                        key={t.label}
                        className={cn(
                          "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em]",
                          t.ai
                            ? "border-accent/30 bg-accent/[0.08] text-accent"
                            : "border-border text-muted",
                        )}
                      >
                        {t.label}
                      </li>
                    ))}
                  </ul>

                  <Eyebrow mark={false} className="mt-6 text-faint">
                    Proved in
                  </Eyebrow>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {s.proof.map((p) => (
                      <ArrowLink
                        key={p.slug}
                        href={`/work/${p.slug}/`}
                        onClick={() => track("method_case_click", { slug: p.slug, stage: s.id })}
                      >
                        {p.title}
                      </ArrowLink>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1} className="flex justify-end border-t border-border pt-10">
          <ArrowLink href="/" onClick={() => track("method_see_work_click", {})}>
            See it in the work
          </ArrowLink>
        </Reveal>
      </Container>
    </Section>
  );
}
