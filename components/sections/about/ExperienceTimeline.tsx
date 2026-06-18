import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { EXPERIENCE, EDUCATION } from "@/lib/experience";

/** Experience timeline (CLAUDE.md About IA) — Director-scale roles as a clean
 *  two-column list: period on the left rail, role + one-line impact on the
 *  right. Hairline rules keep it editorial and calm. */
export function ExperienceTimeline() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>Experience</Eyebrow>
        </Reveal>

        <ul className="mt-12">
          {EXPERIENCE.map((role, i) => (
            <Reveal as="li" key={role.company} delay={Math.min(i * 0.04, 0.2)}>
              <div className="grid grid-cols-1 gap-2 border-t border-border py-8 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3">
                  <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-faint">
                    {role.period}
                  </span>
                </div>
                <div className="sm:col-span-9">
                  <h3 className="font-serif text-heading text-foreground">
                    {role.company}
                  </h3>
                  <p className="mt-1 font-sans text-caption font-medium uppercase tracking-[0.1em] text-accent">
                    {role.title}
                  </p>
                  <p className="mt-3 max-w-2xl font-sans text-body text-muted">
                    {role.blurb}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Education + credentials — compact coda under the timeline */}
        <Reveal delay={0.1}>
          <div className="mt-12 border-t border-border pt-10">
            <Eyebrow mark={false} className="text-faint">
              Education
            </Eyebrow>
            <ul className="mt-6 flex flex-col gap-5 sm:flex-row sm:gap-16">
              {EDUCATION.map((e) => (
                <li key={e.school}>
                  <h3 className="font-serif text-heading text-foreground">
                    {e.school}
                  </h3>
                  <p className="mt-1 font-sans text-body text-muted">
                    {e.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
