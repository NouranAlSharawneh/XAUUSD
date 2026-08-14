import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/** One route. Listed anyway so the sitemap reference in robots.txt resolves. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
