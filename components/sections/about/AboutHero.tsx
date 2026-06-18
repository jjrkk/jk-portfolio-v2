import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";

/** About split-hero (CLAUDE.md): portrait + serif greeting + intro + socials.
 *  Takes the grammar of Robin's "Bonjour, I'm Robin" — large serif greeting set
 *  against the photo — in Justin's own light-first palette and voice. */
export function AboutHero() {
  return (
    <header className="pt-28 sm:pt-32">
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Portrait — bleeds onto an accent stage, the brightest element */}
          <Reveal className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/portrait.jpg"
                alt="Justin Kirkey"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <h1 className="font-serif text-display font-semibold leading-[0.92] text-foreground">
                Hi, I&rsquo;m
                <br />
                <span className="text-accent">Justin.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl font-sans text-body-lg text-muted">
                I&rsquo;m a product design leader based in Toronto — 15+ years
                across healthcare and other high-stakes, regulated products, and
                a hands-on builder who ships with agentic AI. Open to Lead,
                Staff, and Director roles, and AI-first teams.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-eyebrow uppercase tracking-[0.14em]">
                <a
                  href={SITE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${SITE.socials.email}`}
                  className="text-foreground transition-colors hover:text-accent"
                >
                  Email
                </a>
                <a
                  href="/resume.pdf"
                  className="text-foreground transition-colors hover:text-accent"
                >
                  Résumé
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </header>
  );
}
