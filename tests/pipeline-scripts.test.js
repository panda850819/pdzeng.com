import { describe, expect, test } from "bun:test";
import { allowed, commentsIn } from "../scripts/check-comments.ts";
import { select } from "../scripts/select-tests.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const flagged = (path, source) => commentsIn(path, source).filter((c) => !allowed(c)).map((c) => c.text);

describe("check-comments", () => {
  test("finds line, block and JSX comments", () => {
    const src = 'const a = 1; // note\n/* block */\nexport const X = () => <div>{/* jsx */}</div>;\n';
    expect(flagged("x.tsx", src)).toEqual(["// note", "/* block */", "/* jsx */"]);
  });

  test("ignores URLs and slashes inside strings, templates, regex and JSX text", () => {
    const src = 'const u = "https://x.y"; const t = `//${u}`; const r = /a\\/\\/b/;\nexport const Y = () => <p>don\'t // stop</p>;\n';
    expect(flagged("y.tsx", src)).toEqual([]);
  });

  test("allows tool directives", () => {
    const src = "// @ts-expect-error\nconst a: number = 'x';\n// eslint-disable-next-line no-console\n/* prettier-ignore */\nconst b = 1;\n";
    expect(flagged("z.ts", src)).toEqual([]);
  });

  test("shell: shebang and shellcheck allowed, quoted hash and heredoc ignored", () => {
    const src = "#!/bin/bash\n# shellcheck disable=SC2086\necho \"#x\" '#y' a#b\ncat <<EOF\n# inside\nEOF\nls # trailing\n";
    expect(flagged("a.sh", src)).toEqual(["# trailing"]);
  });
});

describe("select-tests", () => {
  test("docs only runs nothing", () => {
    expect(select(["README.md", "docs/x.md"], ROOT).targets).toEqual([]);
  });

  test("workflow change runs the full suite", () => {
    expect(select([".github/workflows/ci.yml"], ROOT).targets).toEqual(["tests"]);
  });

  test("a worker maps to its test through imports", () => {
    expect(select(["workers/site/index.js"], ROOT).targets).toContain("tests/site-worker.test.js");
  });

  test("site inputs pick the tests that read out/", () => {
    expect(select(["components/header.tsx"], ROOT).targets).toContain("tests/e2e-home.test.js");
  });

  test("pipeline shell scripts are left to the rules job", () => {
    expect(select([".pipeline/deploy.sh"], ROOT).targets).toEqual([]);
  });
});
