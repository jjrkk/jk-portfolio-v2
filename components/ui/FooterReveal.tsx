/**
 * Footer reveal — normal-flow wrapper.
 *
 * The footer sits in normal document flow below the cream content. As the last
 * content section (CaseNext / Work) scrolls off the top, the footer naturally
 * comes into view. No sticky or z-index tricks needed — and no risk of the
 * footer appearing at the top of the page before the user has scrolled there.
 */
export function FooterReveal({ children }: { children: React.ReactNode }) {
  // relative + z-[2] matches the cream content layer so the footer paints over
  // the sticky hero (z-[1]) when both are visible at the bottom of the page.
  // No sticky — the footer stays in normal document flow so it never bleeds
  // into the top of the page.
  return <div className="relative z-[2]">{children}</div>;
}
