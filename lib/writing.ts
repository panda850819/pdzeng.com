import sources from "../content/writing-sources.json";

export type WritingSource = "substack" | "telegram" | "x";
export type WritingCategory = "blog" | "telegram" | "x";

export type UnifiedWritingItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  locale: string;
  source: WritingSource;
  category: WritingCategory;
  external: boolean;
  metrics?: {
    replies: number;
    reposts: number;
    likes: number;
  };
};

const canonicalUrl = (url: string) => {
  if (url.startsWith("/")) return url.replace(/\/$/, "");
  const parsed = new URL(url);
  parsed.hash = "";
  parsed.search = "";
  return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname}`.replace(/\/$/, "").toLowerCase();
};

const substackItems: UnifiedWritingItem[] = sources.substack.map((item) => ({
    id: `substack:${item.id}`,
    title: item.title,
    description: item.description,
    url: item.url,
    publishedAt: item.publishedAt,
    locale: "zh-TW",
    source: "substack" as const,
    category: "blog" as const,
    external: true,
  }));

const telegramItems: UnifiedWritingItem[] = sources.telegram.map((item) => ({
    id: `telegram:${item.id}`,
    title: item.description || item.title,
    description: "",
    url: item.url,
    publishedAt: item.publishedAt,
    locale: "zh-TW",
    source: "telegram" as const,
    category: "telegram" as const,
    external: true,
  }));

const xItems: UnifiedWritingItem[] = sources.x.map((item) => ({
    id: `x:${item.id}`,
    title: item.description || item.title,
    description: "",
    url: item.url,
    publishedAt: item.publishedAt,
    locale: "zh-TW",
    source: "x" as const,
    category: "x" as const,
    external: true,
    metrics: {
      replies: item.replies,
      reposts: item.reposts,
      likes: item.likes,
    },
  }));

const deduplicateByUrl = (items: UnifiedWritingItem[]) => {
  const seenUrls = new Set<string>();
  return items.filter((item) => {
    const urlKey = canonicalUrl(item.url);
    if (seenUrls.has(urlKey)) return false;
    seenUrls.add(urlKey);
    return true;
  });
};

const sourceItems = [
  ...deduplicateByUrl(substackItems),
  ...deduplicateByUrl(telegramItems),
  ...deduplicateByUrl(xItems),
];

export const unifiedWriting = (): UnifiedWritingItem[] =>
  [...sourceItems].sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.id.localeCompare(b.id),
  );
