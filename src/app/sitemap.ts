import type { MetadataRoute } from "next";
import { getArticleSlugs, getAllTags } from "@/lib/articles";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ["", "/about", "/portfolio", "/articles", "/tags", "/faq", "/privacy-policy"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes: MetadataRoute.Sitemap = getArticleSlugs().map((slug) => ({
    url: `${SITE_URL}/articles/${slug}`,
    lastModified: new Date(),
  }));

  const tagRoutes: MetadataRoute.Sitemap = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...tagRoutes];
}
