import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, normalize } from "node:path";

export const FULL = "tests";

const FULL_TRIGGERS = [
  /^\.github\/workflows\/.*/,
  /^package\.json$/,
  /^bun\.lock$/,
  /^tsconfig\.json$/,
  /^bunfig\.toml$/,
  /^scripts\/select-tests\.ts$/,
];
const DOC_ONLY = [
  /.*\.md$/,
  /^docs\/.*/,
  /^LICENSE$/,
  /^\.gitignore$/,
  /^\.comment-baseline$/,
  /^\.github\/(ISSUE_TEMPLATE|PULL_REQUEST_TEMPLATE).*/,
];
const NO_TESTS = [/^\.pipeline\/.*\.sh$/];
const SITE_INPUTS = [
  /^app\/.*/,
  /^components\/.*/,
  /^lib\/.*/,
  /^content\/.*/,
  /^public\/.*/,
  /^assets\/.*/,
  /^velite\.config\.ts$/,
  /^next\.config\.ts$/,
  /^postcss\.config\.mjs$/,
];
const SITE_BUILD_MARK = /join\(\s*(import\.meta\.dir|ROOT)\s*,\s*("\.\."\s*,\s*)?"out"\s*\)|["']out\//;
const EXTENSIONS = ["", ".ts", ".tsx", ".js", ".jsx", ".mjs", "/index.ts", "/index.tsx", "/index.js"];
const IMPORT = /(?:import|export)\s[^"'`]*?from\s*["']([^"']+)["']|import\(\s*["']([^"']+)["']\s*\)|require\(\s*["']([^"']+)["']\s*\)|import\s*["']([^"']+)["']/g;

function resolveImport(root: string, from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = spec.slice(2);
  else if (spec.startsWith(".")) base = normalize(join(dirname(from), spec));
  else return null;
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    const full = join(root, candidate);
    if (existsSync(full) && statSync(full).isFile()) return candidate;
  }
  return null;
}

export function importClosure(root: string, entry: string): Set<string> {
  const seen = new Set<string>();
  const queue = [entry];
  while (queue.length) {
    const file = queue.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    if (!/\.(ts|tsx|js|jsx|mjs)$/.test(file)) continue;
    const source = readFileSync(join(root, file), "utf8");
    for (const m of source.matchAll(IMPORT)) {
      const target = resolveImport(root, file, m[1] ?? m[2] ?? m[3] ?? m[4]);
      if (target && !seen.has(target)) queue.push(target);
    }
  }
  return seen;
}

function testFiles(root: string): string[] {
  return readdirSync(join(root, "tests"))
    .filter((n) => /\.test\.(js|jsx|ts|tsx)$/.test(n))
    .map((n) => `tests/${n}`)
    .sort();
}

const matches = (rules: RegExp[], path: string) => rules.some((r) => r.test(path));

export function select(changed: string[] | null, root: string): { targets: string[]; reason: string } {
  if (changed === null) return { targets: [FULL], reason: "diff 算不出來，全跑" };
  const code = changed.filter((c) => !matches(DOC_ONLY, c));
  if (!code.length) return { targets: [], reason: "只改文件，跳過測試" };
  const trigger = code.find((c) => matches(FULL_TRIGGERS, c));
  if (trigger) return { targets: [FULL], reason: `改到 ${trigger}，全跑` };
  const tests = testFiles(root);
  const closures = new Map(tests.map((t) => [t, importClosure(root, t)]));
  const siteTests = tests.filter((t) => SITE_BUILD_MARK.test(readFileSync(join(root, t), "utf8")));
  const picked = new Set<string>();
  const skipped: string[] = [];
  for (const c of code) {
    if (matches(NO_TESTS, c)) {
      skipped.push(c);
      continue;
    }
    if (tests.includes(c)) {
      picked.add(c);
      continue;
    }
    const hits = tests.filter((t) => closures.get(t)!.has(c) || readFileSync(join(root, t), "utf8").includes(c));
    if (matches(SITE_INPUTS, c)) hits.push(...siteTests);
    if (!hits.length) return { targets: [FULL], reason: `${c} 對應不到測試，全跑` };
    for (const h of hits) picked.add(h);
  }
  const note = skipped.length ? `；${skipped.length} 個由 rules 檢查` : "";
  return { targets: [...picked].sort(), reason: `${code.length} 個改動檔 → ${picked.size} 個測試檔${note}` };
}

export function needsBuild(targets: string[], root: string): boolean {
  if (targets.includes(FULL)) return true;
  return targets.some((t) => SITE_BUILD_MARK.test(readFileSync(join(root, t), "utf8")));
}

function changedFiles(base: string): string[] | null {
  const diff = spawnSync("git", ["diff", "--name-only", "--no-renames", base], { encoding: "utf8" });
  const untracked = spawnSync("git", ["ls-files", "--others", "--exclude-standard"], { encoding: "utf8" });
  if (diff.status !== 0 || untracked.status !== 0) return null;
  return [...new Set(`${diff.stdout}\n${untracked.stdout}`.split("\n").filter(Boolean))].sort();
}

function main(argv: string[]): number {
  const i = argv.indexOf("--base");
  if (i < 0 || !argv[i + 1]) {
    console.error("usage: select-tests.ts --base <sha> [--build-flag FILE]");
    return 2;
  }
  const root = process.cwd();
  const { targets, reason } = select(changedFiles(argv[i + 1]), root);
  console.error(reason);
  for (const t of targets) console.log(t);
  const f = argv.indexOf("--build-flag");
  if (f >= 0 && argv[f + 1]) writeFileSync(argv[f + 1], needsBuild(targets, root) ? "1\n" : "0\n");
  return 0;
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));
