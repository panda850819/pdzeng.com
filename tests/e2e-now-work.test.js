import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "out");
const PAGES = {
  now: "now/index.html",
  work: "work/index.html",
  tonx: "work/tonx-ops-from-zero/index.html",
};

function read(rel) {
  const file = join(OUT, rel);
  if (!existsSync(file)) {
    throw new Error(`${file} is missing — run \`bun run build\` before \`bun test\`.`);
  }
  return readFileSync(file, "utf8");
}

describe("static export of /now and /work", () => {
  test("every page links to /work/ from the header, and home links /now/", () => {
    for (const rel of Object.values(PAGES)) {
      expect(read(rel)).toContain('href="/work/"');
    }
    expect(read("index.html")).toContain('href="/now/"');
  });

  test("/now/ shows its update date and links the TONX case", () => {
    const html = read(PAGES.now);
    expect(html).toContain("更新於 2026-10");
    expect(html).toContain('href="/work/tonx-ops-from-zero/"');
    expect(html).toContain("https://x.com/pandazeng1");
    expect(html).toContain("https://t.me/pdzeng\"");
  });

  test("/work/ lists the TONX case with its headline metric", () => {
    const html = read(PAGES.work);
    expect(html).toContain("10 → 50");
    expect(html).toContain('href="/work/tonx-ops-from-zero/"');
  });

  test("the TONX case page renders metrics, body, and links", () => {
    const html = read(PAGES.tonx);
    for (const s of ["10 → 50", "5+", "400M+", "https://kton.io", "kton.io", "https://tons.tg", "https://tons.ai"]) {
      expect(html).toContain(s);
    }
    expect(html).toContain('lang="zh"');
  });

  test("400M+ is never attributed to Panda personally", () => {
    for (const rel of Object.values(PAGES)) {
      expect(read(rel)).not.toMatch(/我(個人)?管理\s*400M/);
    }
  });
});
