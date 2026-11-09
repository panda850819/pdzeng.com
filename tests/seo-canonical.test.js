import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "out");
const SITE = "https://pdzeng.com";

function read(rel) {
  const file = join(OUT, rel);
  if (!existsSync(file)) {
    throw new Error(`${file} is missing — run \`bun run build\` before \`bun test\`.`);
  }
  return readFileSync(file, "utf8");
}

const canonicalsOf = (html) => [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
const robotsOf = (html) => [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);

const locs = [...read("sitemap.xml").matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);

describe("sitemap URLs match their page canonical", () => {
  test("sitemap lists pages", () => {
    expect(locs.length).toBeGreaterThan(0);
  });

  test.each(locs)("%s", (loc) => {
    expect(loc.startsWith(`${SITE}/`)).toBe(true);
    expect(loc.endsWith("/")).toBe(true);
    const path = decodeURI(loc.slice(SITE.length));
    expect(canonicalsOf(read(join(path, "index.html")))).toEqual([loc]);
  });
});

describe("404 output is noindex and has no canonical", () => {
  test.each(["404.html", "404/index.html", "_not-found/index.html"])("%s", (rel) => {
    const html = read(rel);
    expect(canonicalsOf(html)).toEqual([]);
    expect(html).not.toContain('rel="canonical"');
    expect(robotsOf(html).some((c) => c.split(",").map((s) => s.trim()).includes("noindex"))).toBe(true);
  });
});
