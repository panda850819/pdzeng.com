import type { MetadataRoute } from "next";
import { published, publishedWork } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://pdzeng.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work/", "/writing/", "/substack/", "/now/", "/projects/", "/about/", "/cv/"].map((path) => ({
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

  const cases = publishedWork.map((w) => ({
    url: `${SITE}${w.permalink}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...cases, ...posts];
}
