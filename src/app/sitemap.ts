import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";

const BASE_URL = "https://www.acwise.au";

// Static marketing pages only, "/app" and "/login" are excluded on purpose:
// one's an authenticated area with nothing for a search crawler to index,
// the other is a utility page not worth ranking for its own sake.
const STATIC_ROUTES = [
  "",
  "/about",
  "/for-businesses",
  "/find-a-professional",
  "/become-a-partner/short-form",
  "/learn",
  "/faqs",
  "/contact",
  "/without-the-guesswork",
  "/without-the-headaches",
  "/without-the-risk",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/learn/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
