import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "out");

function read(rel) {
  const file = join(OUT, rel);
  if (!existsSync(file)) {
    throw new Error(`${file} is missing — run \`bun run build\` before \`bun test\`.`);
  }
  return readFileSync(file, "utf8");
}

// The exported HTML of <main>, so header and footer links don't leak into home assertions
const mainOf = (html) => html.slice(html.indexOf('<main id="main-content"'), html.indexOf("</main>"));

describe("static export of the home page", () => {
  const html = read("index.html");
  const main = mainOf(html);

  test("the hero carries the signature SVG and the Now card", () => {
    expect(main).toMatch(/<svg class="sig[^"]*" viewBox="-80 30 650 270" role="img" aria-label="Panda 的簽名">/);
    expect(main).toContain('clip-path="url(#sig-hero)"');
    expect(main).toContain("轉換期：跑步、重訓、學 AI、寫投資筆記");
    expect(main).toContain('href="/now/"');
  });

  test("the message opens with Panda's own line", () => {
    expect(main).toContain('<blockquote class="quote">營運的本質就是讓公司活下來。</blockquote>');
    expect(html).toContain("工作、合作，或只是想聊聊，都歡迎。");
  });

  test("work vs. off work renders from the typed data", () => {
    expect(main).toContain("vs.");
    for (const s of ["Yei Finance", "People &amp; Ops Lead", "WOO Network", "YuStar", "2018–2020", "發動科技 FDC", "COO", "zone 2"]) {
      expect(main).toContain(s);
    }
  });

  test("contact links point at the new handles", () => {
    expect(html).toContain('href="https://t.me/pdzeng"');
    expect(html).toContain('href="https://www.linkedin.com/in/pdzeng/"');
    expect(html).not.toContain("pdzeng_talk");
    expect(html).not.toContain("wei-chieh-tseng");
  });

  test("no photos on the home page", () => {
    expect(html).not.toContain("<img");
  });

  test("最近寫的 lists four posts", () => {
    const lately = main.slice(main.indexOf('aria-labelledby="wr-h"'));
    const list = lately.slice(lately.indexOf("<ol"), lately.indexOf("</ol>"));
    expect(list.match(/<li>/g)?.length).toBe(4);
  });

  test("JSON-LD and description are updated", () => {
    expect(html).toContain('"alternateName":["熊貓隨口說","Panda Tseng"]');
    expect(html).toContain("Panda Zeng — operator, runner, writing about operations and AI.");
  });
});

describe("every page shares the new header and footer", () => {
  const pages = ["index.html", "now/index.html", "work/index.html", "about/index.html", "writing/index.html", "cv/index.html"];

  for (const rel of pages) {
    test(rel, () => {
      const html = read(rel);
      // header
      expect(html).toContain('class="lockup"');
      expect(html).toContain('aria-label="主選單"');
      for (const href of ["/work/", "/writing/", "/about/"]) expect(html).toContain(`href="${href}"`);
      expect(html).toContain('id="mnav"');
      expect(html).toContain('class="theme-btn"');
      // footer
      expect(html).toContain('<footer class="foot"');
      expect(html).toContain('clip-path="url(#sig-foot)"');
      for (const href of ["https://x.com/pandazeng1", "https://www.linkedin.com/in/pdzeng/", "https://t.me/pdzeng", "/rss.xml", "https://pdzeng.substack.com/subscribe"]) {
        expect(html).toContain(`href="${href}"`);
      }
    });
  }

  test("the current page is marked in the header", () => {
    expect(read("work/index.html")).toMatch(/<a aria-current="page" href="\/work\/"|<a href="\/work\/" aria-current="page"/);
    expect(read("about/index.html")).toMatch(/aria-current="page" href="\/about\/"|href="\/about\/" aria-current="page"/);
  });
});

describe("about and OG image", () => {
  test("/about/ drops the tooling framing and links /now/", () => {
    const html = readFileSync(join(OUT, "about/index.html"), "utf8");
    expect(html).not.toContain("agent systems");
    expect(html).not.toContain("CLI tools");
    expect(html).not.toContain("Operations ×");
    expect(html).toContain('href="/now/"');
    expect(html).toContain('href="/work/yei-ops-with-ai/"');
    expect(html).toContain("龐龐");
    expect(html).toContain("https://www.linkedin.com/in/pdzeng/");
  });

  test("the OG image is a 1200×630 PNG", () => {
    const png = readFileSync(join(OUT, "opengraph-image"));
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});
