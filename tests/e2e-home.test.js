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

// Split in two so the removed About line never sits in the repo as one literal, yet stays guarded
const DROPPED_LINE = "營運的" + "本質就是讓公司活下來";

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

  test("the hero shows the Operations Manager positioning under the signature, server-rendered", () => {
    expect(main).toContain('<p class="hero-role" lang="en">Operations Manager</p>');
    expect(main.indexOf('class="hero-role"')).toBeGreaterThan(main.indexOf('clip-path="url(#sig-hero)"'));
    expect(main).toContain('<h1 class="vh">Panda Zeng</h1>');
  });

  test("home head carries the zh positioning title, description, OG and Twitter tags", () => {
    const head = html.slice(0, html.indexOf("</head>"));
    expect(head).toContain("<title>Panda Zeng｜營運經理 Operations Manager（Ops・HR）</title>");
    expect(head).toMatch(/<meta name="description" content="[^"]*營運經理（Operations Manager）[^"]*人資（HR）/);
    expect(head).toContain('<meta property="og:title" content="Panda Zeng｜營運經理 Operations Manager（Ops・HR）"/>');
    expect(head).toContain('<meta property="og:locale" content="zh_TW"/>');
    expect(head).toContain('<meta name="twitter:title" content="Panda Zeng｜營運經理 Operations Manager（Ops・HR）"/>');
  });

  test("the message section is gone", () => {
    expect(main).not.toContain(DROPPED_LINE);
    expect(main).not.toContain("我做公司營運");
    expect(main).not.toContain('class="message');
    expect(main).not.toContain('class="name-row');
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

  test("最近寫的 is down to one 熊貓隨口說 link to /substack/", () => {
    expect(main).not.toContain('aria-labelledby="wr-h"');
    expect(main).not.toContain("最近寫的");
    const lately = main.slice(main.indexOf('class="lately'));
    expect(lately.match(/<a /g)?.length).toBe(1);
    expect(lately).toMatch(/href="\/substack\/"[^>]*>熊貓隨口說 →<\/a>/);
  });

  test("JSON-LD and description are updated", () => {
    expect(html).toContain('"alternateName":["熊貓隨口說","Panda Tseng"]');
    expect(html).toContain("Panda Zeng，營運經理（Operations Manager），做公司營運（Ops）與人資（HR）");
    expect(html).not.toContain("operator, runner, writing about operations and AI");
  });
});

describe("every page shares the new header and footer", () => {
  const pages = ["index.html", "now/index.html", "work/index.html", "about/index.html", "writing/index.html", "substack/index.html", "cv/index.html"];

  for (const rel of pages) {
    test(rel, () => {
      const html = read(rel);
      // header
      expect(html).toContain('class="lockup"');
      expect(html).toContain('aria-label="主選單"');
      for (const href of ["/work/", "/writing/", "/substack/", "/about/"]) expect(html).toContain(`href="${href}"`);
      expect(html).toContain('id="mnav"');
      expect(html).toContain('class="theme-btn"');
      // footer
      expect(html).toContain('<footer class="foot"');
      expect(html).toContain('clip-path="url(#sig-foot)"');
      expect(html).toContain("缺個會打雜的嗎？來聊聊");
      expect(html).toContain('<p class="fcta-note">歡迎聊聊</p>');
      expect(html).toContain('href="https://calendly.com/pdzeng/meetings"');
      for (const gone of ["工作、合作，或只是想聊聊，都歡迎。", "Ops Builder"]) expect(html).not.toContain(gone);
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

describe("/writing/ categories", () => {
  test("filters are All / 寫作 Writing / 隨口說 MurmurTalk", () => {
    const html = read("writing/index.html");
    expect(html).toMatch(/<span lang="zh-Hant"[^>]*>寫作<\/span>Writing/);
    expect(html).toMatch(/<span lang="zh-Hant"[^>]*>隨口說<\/span>MurmurTalk/);
    const group = html.slice(html.indexOf('aria-label="Filter writing"'), html.indexOf('aria-label="View mode"'));
    expect(group.match(/<button/g)?.length).toBe(3);
    for (const old of ["Blog", "Telegram", "X archive"]) expect(group).not.toContain(old);
  });
});

describe("/substack/ lists 熊貓隨口說", () => {
  const html = read("substack/index.html");
  const main = mainOf(html);

  test("nine Substack posts, grouped 2026 then 2023", () => {
    expect(main.match(/<li /g)?.length).toBe(9);
    expect(main.indexOf('id="y2026"')).toBeGreaterThan(-1);
    expect(main.indexOf('id="y2023"')).toBeGreaterThan(main.indexOf('id="y2026"'));
    expect(main).toMatch(/datetime="2026-10-20"[^>]*>2026\.10\.20<\/time>/i);
    expect(main).toContain('href="https://pdzeng.substack.com/p/ba5"');
    expect(main).toContain("離職兩個月，那個「到時候」好像來了");
    expect(main).toContain('href="https://pdzeng.substack.com/p/478"');
    expect(main).toContain("到 Substack 訂閱 →");
  });

  test("no subscriber-only label", () => {
    expect(html).not.toContain("訂閱者" + "限定");
    expect(html).not.toContain("wl-tag");
  });

  test("the header marks 文章 as current", () => {
    expect(html).toMatch(/aria-current="page" href="\/substack\/"|href="\/substack\/" aria-current="page"/);
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
    expect(html).not.toContain(DROPPED_LINE);
    expect(html).toContain(
      "小到公司裡大大小小的文書。對我來說，營運就是讓公司的人朝著正確的方向，透過觀察大小事件，一步步累積、一步步解決。</p>",
    );
    expect(html).toContain("https://www.linkedin.com/in/pdzeng/");
  });

  test("child pages keep their own og:title instead of the home one", () => {
    expect(read("about/index.html")).toContain('<meta property="og:title" content="關於 · Panda Zeng"/>');
  });

  test("the OG image is a 1200×630 PNG", () => {
    const png = readFileSync(join(OUT, "opengraph-image"));
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});
