/**
 * Refresh public writing sources into content/writing-sources.json.
 *
 * Substack and Telegram need no credentials and run in CI. X uses the local
 * read-only `bird` session when available; CI preserves the last X snapshot.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "content", "writing-sources.json");
const SUBSTACK_FEED = "https://pdzeng.substack.com/feed";
const TELEGRAM_CHANNEL = "pdzeng_talk";
const X_HANDLE = "PandaZeng1";
const REQUIRE_X = Bun.argv.includes("--require-x");

type Preview = {
  targetUrl: string;
  siteName: string;
  title: string;
  description: string;
  imageUrl?: string;
};

type SourceItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  preview?: Preview;
};

type XItem = SourceItem & {
  replies: number;
  reposts: number;
  likes: number;
};

type Snapshot = {
  updatedAt: string;
  substack: SourceItem[];
  telegram: SourceItem[];
  x: XItem[];
};

const decodeHtml = (input: string) =>
  input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, value: string) => String.fromCodePoint(Number(value)))
    .replace(/&#x([\da-f]+);/gi, (_, value: string) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const extractTag = (input: string, tag: string) => {
  const match = input.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeHtml(match[1]) : "";
};

const extractAttribute = (input: string, tag: string, attribute: string) => {
  const match = input.match(new RegExp(`<${tag}\\b[^>]*\\b${attribute}="([^"]+)"`, "i"));
  return match ? decodeHtml(match[1]) : "";
};

const extractClassText = (input: string, className: string) => {
  const match = input.match(
    new RegExp(`<[^>]+class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/[^>]+>`, "i"),
  );
  return match ? decodeHtml(match[1]) : "";
};

const normalizePreviewImage = (value: string) => {
  if (!value) return undefined;
  try {
    const parsed = new URL(value.startsWith("//") ? `https:${value}` : value);
    const allowed =
      parsed.protocol === "https:" &&
      (parsed.hostname === "substackcdn.com" ||
        parsed.hostname === "pbs.twimg.com" ||
        parsed.hostname.endsWith(".telesco.pe"));
    return allowed ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
};

const extractPreviewImage = (input: string) =>
  [...input.matchAll(/background-image:url\(['"]?([^'")]+)['"]?\)/gi)]
    .map((match) => normalizePreviewImage(match[1]))
    .find(Boolean);

const summarize = (text: string, length = 180) =>
  text.length <= length ? text : `${text.slice(0, length).trimEnd()}…`;

const validateSourceUrl = (value: string, hostname: string) => {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname !== hostname) {
    throw new Error(`Unexpected source URL: ${value}`);
  }
  return value;
};

const mergeArchive = <T extends SourceItem>(source: string, fresh: T[], previous: T[]) => {
  if (fresh.length === 0 && previous.length > 0) {
    throw new Error(`${source} returned no entries; refusing to replace the archive`);
  }
  const merged = new Map(previous.map((item) => [item.id, item]));
  for (const item of fresh) merged.set(item.id, item);
  return [...merged.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
};

const fetchText = async (url: string) => {
  const response = await fetch(url, { headers: { "User-Agent": "pdzeng.com writing sync" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
};

const syncSubstack = async (): Promise<SourceItem[]> => {
  const xml = await fetchText(SUBSTACK_FEED);
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map(([, item]) => {
      const title = extractTag(item, "title");
      const rawUrl = extractTag(item, "link");
      const url = rawUrl ? validateSourceUrl(rawUrl, "pdzeng.substack.com") : "";
      const publishedAt = new Date(extractTag(item, "pubDate")).toISOString();
      const body = extractTag(item, "description") || extractTag(item, "content:encoded");
      const imageUrl = normalizePreviewImage(extractAttribute(item, "enclosure", "url"));
      return {
        id: extractTag(item, "guid") || url,
        title,
        description: summarize(body),
        url,
        publishedAt,
        preview: {
          targetUrl: url,
          siteName: "Substack",
          title,
          description: summarize(body),
          ...(imageUrl ? { imageUrl } : {}),
        },
      };
    })
    .filter((item) => item.title && item.url && item.publishedAt)
    .slice(0, 50);
};

const syncTelegram = async (): Promise<SourceItem[]> => {
  const html = await fetchText(`https://t.me/s/${TELEGRAM_CHANNEL}`);
  return html
    .split('<div class="tgme_widget_message_wrap')
    .slice(1)
    .flatMap((chunk) => {
      const id = chunk.match(new RegExp(`data-post="${TELEGRAM_CHANNEL}/(\\d+)"`))?.[1];
      const date = chunk.match(/<time datetime="([^"]+)"/)?.[1];
      const textMatches = [
        ...chunk.matchAll(/<div class="tgme_widget_message_text js-message_text"[^>]*>([\s\S]*?)<\/div>/g),
      ];
      const text = decodeHtml(textMatches.at(-1)?.[1] ?? "");
      if (!id || !date || !text) return [];
      const url = `https://t.me/${TELEGRAM_CHANNEL}/${id}`;
      const linkPreview = chunk.match(
        /<a class="tgme_widget_message_link_preview" href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i,
      );
      const previewBody = linkPreview?.[2] ?? "";
      const previewTarget = linkPreview?.[1] ? decodeHtml(linkPreview[1]) : url;
      const imageUrl = extractPreviewImage(previewBody || chunk);
      const previewTitle = extractClassText(previewBody, "link_preview_title");
      const previewDescription = extractClassText(previewBody, "link_preview_description");
      const previewSite = extractClassText(previewBody, "link_preview_site_name");
      const preview = linkPreview || imageUrl
        ? {
            targetUrl: previewTarget,
            siteName: previewSite || "Telegram",
            title: previewTitle || summarize(text, 96),
            description: previewDescription,
            ...(imageUrl ? { imageUrl } : {}),
          }
        : undefined;
      return [
        {
          id,
          title: summarize(text, 96),
          description: summarize(text),
          url,
          publishedAt: new Date(date).toISOString(),
          ...(preview ? { preview } : {}),
        },
      ];
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
};

const readPrevious = (): Snapshot | undefined => {
  if (!existsSync(OUT)) return undefined;
  return JSON.parse(readFileSync(OUT, "utf8")) as Snapshot;
};

const syncX = (previous: XItem[]): XItem[] => {
  try {
    const result = Bun.spawnSync(
      ["bird", "user-tweets", X_HANDLE, "-n", "100", "--max-pages", "5", "--json"],
      { stdout: "pipe", stderr: "pipe" },
    );
    if (result.exitCode !== 0) {
      if (REQUIRE_X) {
        throw new Error(`bird exited ${result.exitCode}: ${result.stderr.toString().trim()}`);
      }
      return previous;
    }

    const payload = JSON.parse(result.stdout.toString()) as {
      tweets: Array<{
        id: string;
        text: string;
        createdAt: string;
        conversationId: string;
        author: {
          username: string;
        };
        media?: Array<{
          type: string;
          url: string;
          previewUrl?: string;
        }>;
        quotedTweet?: {
          id: string;
          text: string;
          author: {
            username: string;
            name: string;
          };
          media?: Array<{
            type: string;
            url: string;
            previewUrl?: string;
          }>;
        };
        replyCount?: number;
        retweetCount?: number;
        likeCount?: number;
      }>;
    };

    return payload.tweets
      .filter(
        (tweet) =>
          tweet.author.username.toLowerCase() === X_HANDLE.toLowerCase() &&
          tweet.id === tweet.conversationId &&
          tweet.text.trim() &&
          !tweet.text.trimStart().startsWith("RT @"),
      )
      .map((tweet) => {
        const url = `https://x.com/${X_HANDLE}/status/${tweet.id}`;
        const ownImage = tweet.media
          ?.filter((item) => item.type === "photo")
          .map((item) => normalizePreviewImage(item.previewUrl || item.url))
          .find(Boolean);
        const quote = tweet.quotedTweet;
        const quoteImage = quote?.media
          ?.filter((item) => item.type === "photo")
          .map((item) => normalizePreviewImage(item.previewUrl || item.url))
          .find(Boolean);
        const preview = ownImage || quote
          ? {
              targetUrl: quote ? `https://x.com/${quote.author.username}/status/${quote.id}` : url,
              siteName: quote ? `X · @${quote.author.username}` : "X",
              title: quote?.author.name ?? "",
              description: quote ? summarize(quote.text) : "",
              ...(ownImage || quoteImage ? { imageUrl: ownImage || quoteImage } : {}),
            }
          : undefined;
        return {
          id: tweet.id,
          title: summarize(tweet.text, 96),
          description: tweet.text.trim(),
          url,
          publishedAt: new Date(tweet.createdAt).toISOString(),
          replies: tweet.replyCount ?? 0,
          reposts: tweet.retweetCount ?? 0,
          likes: tweet.likeCount ?? 0,
          ...(preview ? { preview } : {}),
        };
      })
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (error) {
    if (REQUIRE_X) throw error;
    return previous;
  }
};

const previous = readPrevious();
const [freshSubstack, freshTelegram] = await Promise.all([syncSubstack(), syncTelegram()]);
const previousX = previous?.x ?? [];
const freshX = syncX(previousX);
const substack = mergeArchive("Substack", freshSubstack, previous?.substack ?? []);
const telegram = mergeArchive("Telegram", freshTelegram, previous?.telegram ?? []);
const x = mergeArchive("X", freshX, previousX);
const dates = [...substack, ...telegram, ...x].map((item) => item.publishedAt).sort();
const snapshot: Snapshot = {
  updatedAt: dates.at(-1) ?? previous?.updatedAt ?? new Date(0).toISOString(),
  substack,
  telegram,
  x,
};

writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
const xStatus = freshX === previousX ? "preserved" : "refreshed";
console.log(
  `synced ${substack.length} Substack posts, ${telegram.length} Telegram posts, ${x.length} X posts (${xStatus})`,
);
