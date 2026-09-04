import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The authenticated area has nothing for a crawler to usefully index,
      // and login is a utility page, not a landing page worth ranking.
      disallow: ["/app", "/login"],
    },
    sitemap: "https://www.acwise.au/sitemap.xml",
  };
}
