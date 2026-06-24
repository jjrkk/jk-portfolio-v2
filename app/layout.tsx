import type { Metadata } from "next";
import { serif, sans, mono } from "./fonts";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import { PageFrame } from "@/components/PageFrame";
import { MorphProvider } from "@/components/morph/MorphProvider";
import { SkipLink } from "@/components/SkipLink";
import TypeLab from "@/components/TypeLab"; // TYPE LAB (dev) — remove when pairing chosen
import "./globals.css";
import "./type-lab.css"; // TYPE LAB (dev) — @font-face candidates; remove when pairing chosen

// Per-page <title>/meta via the Next Metadata API (CLAUDE.md SEO build-in).
// Pages override `title` through the template; everything else inherits.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    images: [
      { url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.role}` },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
};

// JSON-LD Person — helps Google name-search resolve "Justin Kirkey" to this
// site (CLAUDE.md SEO build-in). Kept in the single source of truth (SITE).
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  jobTitle: SITE.role,
  email: `mailto:${SITE.socials.email}`,
  sameAs: [SITE.socials.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-full`}
      // The IntroAperture pre-paint script may add `intro-play` to <html> before
      // hydration (once-per-session, landing only) — expected, so suppress the
      // class-mismatch warning here (standard theme-script pattern).
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input, safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* Pre-paint gate for the landing's initial aperture animation.
            Sets html.intro-play synchronously during parse on a fresh session
            (reduced-motion-gated). Must be a blocking inline script so the
            aperture covers the viewport before first paint — no async approach
            can guarantee this. React logs a dev-only __DEV__ warning about
            script tags in component trees; this does not appear in the
            production static export. Same tradeoff as every Next.js theme
            script (dark-mode, etc.). */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var k='jk-intro-played';var seen=sessionStorage.getItem(k);var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(!seen&&!reduce){document.documentElement.classList.add('intro-play');}sessionStorage.setItem(k,'1');}catch(e){}})();` }} />
        <SkipLink />
        <SmoothScroll />
        <PageFrame />
        <MorphProvider>{children}</MorphProvider>
        <TypeLab />{/* TYPE LAB (dev) — remove when pairing chosen */}
      </body>
    </html>
  );
}
