import { published } from "@/lib/content";

export const dynamic = "force-static";

const SITE = "https://pdzeng.com";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = published
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}${encodeURI(p.permalink)}</link>
      <guid>${SITE}${encodeURI(p.permalink)}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Panda Zeng — Writing</title>
    <link>${SITE}</link>
    <description>Blog posts and notes on DeFi operations, AI tooling, and systems.</description>
    <language>zh-TW</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
