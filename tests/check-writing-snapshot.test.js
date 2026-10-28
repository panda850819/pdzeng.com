import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { assertWellFormedSnapshot } from "../scripts/check-writing-snapshot";
import { summarize } from "../scripts/sync-writing";

describe("summarize", () => {
  test("never splits an emoji into a lone surrogate", () => {
    const result = summarize("ab👋cd", 3);
    expect(result).toBe("ab👋…");
    expect(result.isWellFormed()).toBe(true);
  });

  test("returns short text unchanged", () => {
    expect(summarize("hi 👋", 4)).toBe("hi 👋");
  });
});

describe("assertWellFormedSnapshot", () => {
  test("rejects lone surrogate escapes that JSON.parse accepts", () => {
    const raw = '{"x":[{"title":"goodbye \\ud83d…"}]}';
    expect(() => JSON.parse(raw)).not.toThrow();
    expect(() => assertWellFormedSnapshot(raw)).toThrow("$.x[0].title");
  });

  test("accepts the committed snapshot", () => {
    expect(() => assertWellFormedSnapshot(readFileSync("content/writing-sources.json", "utf8"))).not.toThrow();
  });
});
