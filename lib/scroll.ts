/**
 * Smooth-scroll to an in-page anchor by id, routed through Lenis when it's
 * running so the motion matches the rest of the site's scroll feel. Shared
 * by PageNav's Contact link and AboutSectionNav's jump links — one place
 * for the "how do we scroll to an anchor here" logic instead of two copies
 * drifting apart.
 *
 * Sticky targets (Contact's footer uses `sticky bottom-0`) never actually
 * move on screen, so scrollTo(element) barely scrolls at all — scroll to
 * the page bottom instead so the sticky element is fully revealed.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const isSticky =
    getComputedStyle(target).position === "sticky" ||
    getComputedStyle(target.parentElement ?? target).position === "sticky";

  const lenis = (
    window as unknown as {
      lenis?: { scrollTo: (t: HTMLElement | number, o?: { duration?: number }) => void };
    }
  ).lenis;

  if (isSticky) {
    const dest = document.documentElement.scrollHeight - window.innerHeight;
    if (lenis?.scrollTo) lenis.scrollTo(dest, { duration: 1.1 });
    else window.scrollTo({ top: dest, behavior: "smooth" });
    return;
  }

  if (lenis?.scrollTo) lenis.scrollTo(target, { duration: 1.1 });
  else target.scrollIntoView({ behavior: "smooth", block: "start" });
}
