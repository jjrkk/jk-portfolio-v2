/**
 * Initial-load aperture overlay (landing only, once per session).
 *
 * The pre-paint gate script that adds html.intro-play lives in app/layout.tsx
 * (root layout, server component) so React never encounters a <script> tag
 * inside a component tree. This component is just the overlay div — CSS in
 * globals.css does the rest under html.intro-play.
 */
export function IntroAperture() {
  return <div aria-hidden className="intro-aperture" />;
}
