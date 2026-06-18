/**
 * Skip-to-main link — visually hidden until focused via keyboard Tab.
 * Jumps to #main-content, allowing keyboard users to bypass the persistent nav.
 *
 * Usage: place first inside <body> in layout.tsx. Every page gets it for free.
 * Every <main> must have id="main-content" tabIndex={-1} for this to work.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:uppercase focus:tracking-[0.1em] focus:text-accent-contrast focus:shadow-lg focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
