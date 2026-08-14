import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/**
 * Crawlers are allowed everywhere — it is a single public marketing page.
 * The AI crawlers are listed explicitly and allowed rather than left to the
 * wildcard, because this site publishes /llms.txt specifically for them: the
 * point is to be summarised accurately, not to be excluded.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
