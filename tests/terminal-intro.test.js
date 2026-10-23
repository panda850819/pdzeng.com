import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { INTRO_KEY, lastLoginLine, shouldPlayIntro } from "@/lib/terminal-intro";

const OUT = join(import.meta.dir, "..", "out");

describe("terminal intro rules", () => {
  test("plays once per session and never for reduced motion", () => {
    expect(shouldPlayIntro({ seen: false, reduced: false })).toBe(true);
    expect(shouldPlayIntro({ seen: true, reduced: false })).toBe(false);
    expect(shouldPlayIntro({ seen: false, reduced: true })).toBe(false);
    expect(INTRO_KEY).toBe("pdzeng:terminal-intro");
  });

  test("the login line reads like login(1), in local time", () => {
    expect(lastLoginLine(new Date(2026, 9, 23, 9, 5, 7))).toBe("Last login: Fri Oct 23 09:05:07 on ttys001");
    expect(lastLoginLine(new Date(2026, 0, 4, 23, 0, 0))).toBe("Last login: Sun Jan  4 23:00:00 on ttys001");
  });
});

describe("terminal intro in the static export", () => {
  const file = join(OUT, "index.html");
  if (!existsSync(file)) throw new Error(`${file} is missing — run \`bun run build\` before \`bun test\`.`);
  const html = readFileSync(file, "utf8");

  test("the overlay is not server-rendered; the hero is", () => {
    expect(html).not.toContain("data-terminal-intro");
    expect(html).not.toContain("Last login:");
    expect(html).toContain('clip-path="url(#sig-hero)"');
  });

  test("the overlay code is not in any script the homepage loads up front", () => {
    const scripts = [...new Set(html.match(/\/_next\/static\/chunks\/[^"']+\.js/g) ?? [])];
    expect(scripts.length).toBeGreaterThan(0);
    for (const src of scripts) {
      expect(readFileSync(join(OUT, src), "utf8")).not.toContain("ti-sig");
    }
    // ...but it does exist as its own lazy chunk
    const chunks = readdirSync(join(OUT, "_next/static/chunks")).filter((f) => f.endsWith(".js"));
    const lazy = chunks.filter((f) => readFileSync(join(OUT, "_next/static/chunks", f), "utf8").includes("ti-sig"));
    expect(lazy.length).toBe(1);
  });
});
