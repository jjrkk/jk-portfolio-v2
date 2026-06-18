import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";
import { FooterReveal } from "@/components/ui/FooterReveal";

// Landing: the pinned carousel (intro + work) is the page. As you scroll past
// the last slide, the carousel surface peels away and the Contact section
// (sitting on the accent-color page background) is revealed naturally below.
export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      {/* accent background so corner-hole cutouts of the carousel always match
          the current slide's colour rather than showing the body cream behind */}
      <div className="relative z-[1]" style={{ background: "var(--accent)" }}>
        <Work />
      </div>
      <FooterReveal>
        <Contact dark />
      </FooterReveal>
    </main>
  );
}
