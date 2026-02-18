/**
 * robots.txt dynamique (W-2) — SEO, indexation.
 */
import type { MetadataRoute } from "next";

const baseUrl = "https://florent-le-bot.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/login", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
