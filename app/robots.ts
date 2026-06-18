import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Required by Next 16 under output: "export" — emit a static robots.txt.
export const dynamic = "force-static";

// Generates a static robots.txt at build time (works under output: "export").
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
