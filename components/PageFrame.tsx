"use client";

import { useEffect, useState } from "react";

/**
 * Accent frame around the whole viewport — colored with the live --accent.
 *
 * Top edge: visible only when at the top of the page.
 * Bottom edge: visible when at the very bottom of the page OR when the
 *   Contact section starts entering the viewport (i.e. on the last carousel
 *   slide / during the footer reveal). This makes the bottom corners match the
 *   top exactly — same 10px inset + 16px radius.
 * Left/right bars: always visible, creating a continuous side frame.
 */
export function PageFrame() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      setAtTop(scrollY <= 24);
      setAtBottom(maxScroll <= 0 || scrollY >= maxScroll - 24);

      // Show bottom frame as soon as the Contact section reaches the viewport
      // bottom — this fires on the last carousel slide and during the reveal.
      const contactEl = document.getElementById("contact");
      setContactVisible(
        contactEl
          ? contactEl.getBoundingClientRect().top <= window.innerHeight
          : false,
      );
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const top = atTop ? 10 : -10;
  const bottom = atBottom || contactVisible ? 10 : -10;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[90] rounded-[16px]"
      style={{
        inset: `${top}px 10px ${bottom}px 10px`,
        boxShadow: "0 0 0 100vmax var(--accent)",
        transition: "top 0.45s ease, bottom 0.45s ease",
      }}
    />
  );
}
