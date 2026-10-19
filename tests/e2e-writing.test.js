import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const OUT = join(ROOT, "out");
const sources = JSON.parse(readFileSync(join(ROOT, "content/writing-sources.json"), "utf8"));

function read(rel) {
  const file = join(OUT, rel);
  if (!existsSync(file)) {
    throw new Error(`${file} is missing — run \`bun run build\` before \`bun test\`.`);
  }
  return readFileSync(file, "utf8");
}

const MOVED = {
  "harness-2026-04": "https://pdzeng.substack.com/p/ai-harness",
  "busy-but-nothing-done-2026-feb-mar": "https://pdzeng.substack.com/p/fd5",
  "2026-01-monthly": "https://pdzeng.substack.com/p/01",
  "2025-year-in-review": "https://pdzeng.substack.com/p/2025",
};

describe("local copies of Substack essays", () => {
  for (const [slug, url] of Object.entries(MOVED)) {
    test(`/writing/${slug}/ forwards to ${url}`, () => {
      expect(sources.substack.map((post) => post.url)).toContain(url);
      expect(existsSync(join(ROOT, "content/writing", `${slug}.md`))).toBe(true);

      const html = read(`writing/${slug}/index.html`);
      const head = html.slice(0, html.indexOf("</head>"));
      expect(head).toContain(`<meta http-equiv="refresh" content="0; url=${url}"/>`);
      expect(head).toContain(`<link rel="canonical" href="${url}"/>`);
      expect(html).toContain(`<a class="text-ink underline decoration-line underline-offset-4" href="${url}">到 Substack 閱讀</a>`);
      expect(html).not.toContain('class="article"');
      expect(html).not.toContain("BlogPosting");
    });
  }
});

describe("feeds follow Substack", () => {
  test("rss.xml lists the Substack essays and no local copies", () => {
    const xml = read("rss.xml");
    const links = [...xml.matchAll(/<item>[\s\S]*?<link>([^<]+)<\/link>/g)].map((m) => m[1]);
    expect(links.toSorted()).toEqual(sources.substack.map((post) => post.url).toSorted());
    expect(xml).not.toContain("pdzeng.com/writing/");
  });

  test("sitemap.xml drops the forwarded pages", () => {
    const xml = read("sitemap.xml");
    expect(xml).toContain("<loc>https://pdzeng.com/writing/</loc>");
    for (const slug of Object.keys(MOVED)) expect(xml).not.toContain(`/writing/${slug}/`);
  });
});
