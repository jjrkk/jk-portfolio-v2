import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { CaseAIWorkflow as CaseAIWorkflowData, AIThread } from "@/lib/case-studies";

/**
 * Flagship-only: "How I worked with AI" — the uncopyable section. A bespoke,
 * live-rendered dual-thread diagram (strategy ⇄ implementation, human-in-the-
 * loop) rather than a static export, so the case study demonstrates the build
 * capability by existing. Themed to the project accent (future-blue).
 */
export function CaseAIWorkflow({
  data,
  liveLink,
}: {
  data: CaseAIWorkflowData;
  liveLink?: { label: string; href: string };
}) {
  const { eyebrow, title, intro, threads, loop, notes } = data;
  const [strategy, implementation] = threads;

  return (
    <section className="bg-background py-24 sm:py-32">
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

        {/* The dual-thread diagram — a bordered stage with two thread cards and
            the human-in-the-loop cycle running between them. */}
        <Reveal delay={0.1}>
          <div className="mt-14 rounded-[1.75rem] border border-border bg-surface/60 p-5 shadow-[0_30px_80px_-50px_rgba(21,19,15,0.4)] sm:p-8 lg:p-10">
            <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <ThreadCard thread={strategy} accent />
              <Hinge />
              <ThreadCard thread={implementation} />
            </div>

            {/* The loop rail — the human-in-the-loop cycle, the spine of the method */}
            <div className="mt-8 border-t border-border pt-7">
              <div className="flex flex-col items-center gap-x-3 gap-y-3 sm:flex-row sm:flex-wrap sm:justify-center">
                {loop.map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="font-mono text-eyebrow uppercase tracking-[0.14em] text-foreground">
                      {step}
                    </span>
                    {i < loop.length - 1 && (
                      <span aria-hidden className="text-accent">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center font-sans text-caption text-faint">
                The human stays the spine — the AI is the implementation muscle. You decide; it executes; you evaluate.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Supporting principles — model selection, iteration-vs-spec, the output */}
        {notes.length > 0 && (
          <div className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-3">
            {notes.map((n, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="border-t border-border pt-5">
                  <h3 className="font-serif text-heading font-semibold text-foreground">
                    {n.title}
                  </h3>
                  <p className="mt-3 font-sans text-body text-muted">{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {liveLink && (
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-accent/25 bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-xl font-sans text-body text-muted">
                The prototype is live and interactive — the same artifact the build was handed off from.
              </p>
              <ArrowLink href={liveLink.href} external>
                {liveLink.label}
              </ArrowLink>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/** One thread lane. The strategy thread carries the accent top-bar; the
 *  implementation thread stays neutral — the human's judgment is the accent. */
function ThreadCard({ thread, accent = false }: { thread: AIThread; accent?: boolean }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 lg:p-7">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent ? "var(--accent)" : "color-mix(in srgb, var(--foreground) 18%, transparent)" }}
      />
      <span className="font-mono text-eyebrow uppercase tracking-[0.16em] text-faint">
        {thread.label}
      </span>
      <span className="mt-3 font-serif text-title font-semibold text-foreground">
        {thread.tool}
      </span>
      <p className="mt-3 font-sans text-body text-muted">{thread.blurb}</p>
      <span
        className="mt-5 inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em]"
        style={{
          color: accent ? "var(--accent)" : "var(--muted)",
          background: accent
            ? "color-mix(in srgb, var(--accent) 12%, transparent)"
            : "color-mix(in srgb, var(--foreground) 7%, transparent)",
        }}
      >
        {thread.model}
      </span>
    </div>
  );
}

/** The hinge between the two threads: prompts flow one way, results return the
 *  other. Horizontal on desktop, vertical on mobile. */
function Hinge() {
  return (
    <div className="flex items-center justify-center lg:w-28 lg:flex-col">
      {/* desktop: stacked directional labels with a bidirectional axis */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">prompt →</span>
        <span aria-hidden className="text-2xl text-accent">⇄</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">← report back</span>
      </div>
      {/* mobile: a compact vertical hinge */}
      <div className="flex items-center gap-2 py-1 lg:hidden">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">prompt</span>
        <span aria-hidden className="text-xl text-accent">⇅</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">report back</span>
      </div>
    </div>
  );
}
