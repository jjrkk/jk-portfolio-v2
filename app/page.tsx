import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

// Landing: the pinned carousel (intro + work) is the page. As you scroll past
// the last slide, the carousel surface peels away and the Contact section
// (sitting on the accent-color page background) is revealed naturally below.
export default function Home() {
  return (
    <main>
      <Work />
      <Contact dark />
    </main>
  );
}
