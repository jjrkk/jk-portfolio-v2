import type { Metadata } from "next";
import { serif, sans, mono } from "./fonts";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import { PageFrame } from "@/components/PageFrame";
import "./globals.css";

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
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input, safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SmoothScroll />
        <PageFrame />
        {children}
      </body>
    </html>
  );
}
