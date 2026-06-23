import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** The big serif statement line — the "I design digital products…" beat.
 *  On desktop the statement shares the row with a candid photo on the right. */
export function AboutStatement() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="font-serif text-display-sm font-semibold leading-[1.02] text-foreground">
              I design digital products for healthcare, high-stakes, and AI-first
              teams — then <span className="text-accent">build them</span> with
              agentic AI.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="hidden lg:block lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about/whiteboard-justin.webp"
              alt="Justin sketching at the whiteboard"
              width={683}
              height={683}
              className="w-full rounded-2xl object-cover shadow-[0_24px_60px_-20px_rgba(0,0,0,0.22)]"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
