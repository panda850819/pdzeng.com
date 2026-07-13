import type { MetadataRoute } from "next";
import { published } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://pdzeng.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/writing/", "/projects/", "/about/", "/cv/"].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const posts = published.map((p) => ({
    url: `${SITE}${encodeURI(p.permalink)}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
