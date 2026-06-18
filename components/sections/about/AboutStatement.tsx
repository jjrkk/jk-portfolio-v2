import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/** The big serif statement line — the "I design digital products…" beat from
 *  Robin's about, rewritten to Justin's design-and-build positioning. Set huge,
 *  fearless scale (CLAUDE.md grammar #2). */
export function AboutStatement() {
  return (
    <Section>
      <Container>
        <Reveal>
          <p className="max-w-[18ch] font-serif text-display-sm font-semibold leading-[1.02] text-foreground">
            I design digital products for healthcare, high-stakes, and AI-first
            teams — then <span className="text-accent">build them</span> with
            agentic AI.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
