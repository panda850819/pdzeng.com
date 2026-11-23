import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import ts from "typescript";

const JS_SUFFIXES = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"];
const SH_SUFFIXES = [".sh"];
const SOURCE_SUFFIXES = [...JS_SUFFIXES, ...SH_SUFFIXES];

const JS_DIRECTIVES = [
  /^\/\/\s*eslint-(disable|enable)(-next-line|-line)?\b.*$/,
  /^\/\*\s*eslint(-disable|-enable|-env)?\b[\s\S]*\*\/$/,
  /^\/\/\s*@ts-(expect-error|ignore|nocheck|check)\b.*$/,
  /^\/\/\/\s*<reference\s.+\/>$/,
  /^\/\/\s*prettier-ignore\s*$/,
  /^\/\*\s*prettier-ignore\s*\*\/$/,
  /^\/\/\s*biome-ignore\b.+$/,
  /^\/\*\s*(istanbul|c8|v8) ignore\b[^*]*\*\/$/,
  /^\/\/\s*(istanbul|c8|v8) ignore\b.*$/,
  /^\/\*\s*[#@]__(PURE|NO_SIDE_EFFECTS)__\s*\*\/$/,
  /^\/\*\s*webpack[A-Z][A-Za-z]*:[^*]*\*\/$/,
  /^\/\/\s*SPDX-License-Identifier: .+$/,
  /^\/\/\s*Copyright .+$/,
  /^\/\*!?\s*@(license|preserve)\b[\s\S]*\*\/$/,
];
const SH_DIRECTIVES = [
  /^#\s*shellcheck (disable|source|shell)=\S+$/,
  /^#\s*SPDX-License-Identifier: .+$/,
  /^#\s*Copyright .+$/,
];
const HEREDOC = /(?<!<)<<-?(?!<)\s*(['"]?)([A-Za-z_][A-Za-z0-9_]*)\1/;

type Comment = { path: string; line: number; text: string };

const keyOf = (c: Comment) => `${c.path}\t${createHash("sha1").update(c.text.trim()).digest("hex")}`;

function allowed(c: Comment): boolean {
  const text = c.text.trim();
  if (c.line === 1 && text.startsWith("#!")) return true;
  const rules = c.path.endsWith(".sh") ? SH_DIRECTIVES : JS_DIRECTIVES;
  return rules.some((r) => r.test(text));
}

function scriptKind(path: string): ts.ScriptKind {
  if (path.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (path.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (/\.[mc]?js$/.test(path)) return ts.ScriptKind.JSX;
  return ts.ScriptKind.TS;
}

function jsComments(path: string, source: string): Comment[] {
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, scriptKind(path));
  const seen = new Map<number, Comment>();
  const collect = (ranges: ts.CommentRange[] | undefined) => {
    for (const r of ranges ?? []) {
      if (seen.has(r.pos)) continue;
      const line = file.getLineAndCharacterOfPosition(r.pos).line + 1;
      seen.set(r.pos, { path, line, text: source.slice(r.pos, r.end) });
    }
  };
  const visit = (node: ts.Node) => {
    if (node.kind === ts.SyntaxKind.JsxText) return;
    collect(ts.getLeadingCommentRanges(source, node.pos));
    collect(ts.getTrailingCommentRanges(source, node.end));
    for (const child of node.getChildren(file)) visit(child);
  };
  visit(file);
  collect(ts.getLeadingCommentRanges(source, file.endOfFileToken.pos));
  return [...seen.values()].sort((a, b) => a.line - b.line);
}

function shellComments(path: string, source: string): Comment[] {
  const found: Comment[] = [];
  const lines = source.split("\n");
  if (lines.at(-1) === "") lines.pop();
  let quote = "";
  let heredocEnd = "";
  lines.forEach((line, index) => {
    const number = index + 1;
    if (heredocEnd) {
      if (line.trim() === heredocEnd) heredocEnd = "";
      return;
    }
    let codeEnd = line.length;
    let prev = " ";
    let escaped = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (escaped) escaped = false;
      else if (ch === "\\" && quote !== "'") escaped = true;
      else if (quote) {
        if (ch === quote) quote = "";
      } else if (ch === "'" || ch === '"') quote = ch;
      else if (ch === "#" && (/\s/.test(prev) || ";|&(".includes(prev))) {
        found.push({ path, line: number, text: line.slice(i) });
        codeEnd = i;
        break;
      }
      prev = ch;
    }
    const marker = quote ? null : HEREDOC.exec(line.slice(0, codeEnd));
    if (marker) heredocEnd = marker[2];
  });
  if (quote || heredocEnd) {
    found.push({ path, line: lines.length, text: `# check-comments: unterminated ${quote ? "quote" : "heredoc"}, review by hand` });
  }
  return found;
}

function commentsIn(path: string, source: string): Comment[] {
  return path.endsWith(".sh") ? shellComments(path, source) : jsComments(path, source);
}

function git(...args: string[]): { ok: boolean; out: string } {
  const p = spawnSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return { ok: p.status === 0, out: p.stdout ?? "" };
}

const isSource = (p: string) => SOURCE_SUFFIXES.some((s) => p.endsWith(s));

function trackedSources(): string[] {
  return git("ls-files", "-z", "--cached", "--others", "--exclude-standard")
    .out.split("\0")
    .filter((p) => p && isSource(p) && existsSync(p) && statSync(p).isFile())
    .sort();
}

function violations(path: string, source: string): Comment[] {
  return commentsIn(path, source).filter((c) => !allowed(c));
}

function scanAll(): Comment[] {
  return trackedSources().flatMap((p) => violations(p, readFileSync(p, "utf8")));
}

function count(keys: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const k of keys) m.set(k, (m.get(k) ?? 0) + 1);
  return m;
}

function readBaseline(text: string): string[] {
  return text.split("\n").filter((l) => l.trim());
}

function checkDiff(base: string): string[] {
  const changed = git("diff", "--name-only", "--no-renames", "--diff-filter=AM", base).out.split("\n");
  const untracked = git("ls-files", "--others", "--exclude-standard").out.split("\n");
  const errors: string[] = [];
  for (const path of [...new Set([...changed, ...untracked])].filter((p) => p && isSource(p) && existsSync(p)).sort()) {
    const before = git("show", `${base}:${path}`);
    const old = count((before.ok ? violations(path, before.out) : []).map(keyOf));
    for (const c of violations(path, readFileSync(path, "utf8"))) {
      const k = keyOf(c);
      const left = old.get(k) ?? 0;
      if (left > 0) old.set(k, left - 1);
      else errors.push(`${path}:${c.line}: 新增註解：${c.text.trim().split("\n")[0]}`);
    }
  }
  return errors;
}

function checkBaseline(baselinePath: string, base: string | undefined): string[] {
  const baseline = count(existsSync(baselinePath) ? readBaseline(readFileSync(baselinePath, "utf8")) : []);
  const current = scanAll();
  const now = count(current.map(keyOf));
  const errors: string[] = [];
  const budget = new Map(baseline);
  for (const c of current) {
    const k = keyOf(c);
    const left = budget.get(k) ?? 0;
    if (left > 0) budget.set(k, left - 1);
    else errors.push(`${c.path}:${c.line}: 註解不在 ${baselinePath}：${c.text.trim().split("\n")[0]}`);
  }
  for (const [k, n] of baseline) {
    const extra = n - (now.get(k) ?? 0);
    if (extra > 0) errors.push(`${baselinePath}: ${extra} 行已無對應註解，請刪掉：${k}`);
  }
  if (base) {
    const before = git("show", `${base}:${baselinePath}`);
    if (before.ok) {
      const old = count(readBaseline(before.out));
      for (const [k, n] of baseline) {
        if (n > (old.get(k) ?? 0)) errors.push(`${baselinePath}: 只准變短，不能比 ${base.slice(0, 12)} 多：${k}`);
      }
    } else {
      console.log(`${baselinePath} 在 ${base.slice(0, 12)} 不存在：本次建立 baseline，略過 shrink-only 比對`);
    }
  }
  return errors;
}

function main(argv: string[]): number {
  const opts: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (!["--diff", "--baseline", "--base", "--write-baseline"].includes(flag) || i + 1 >= argv.length) {
      console.error("usage: check-comments.ts [--diff BASE] [--baseline FILE [--base BASE]] [--write-baseline FILE]");
      return 2;
    }
    opts[flag.slice(2)] = argv[++i];
  }
  if (opts["write-baseline"]) {
    const keys = scanAll().map(keyOf).sort();
    writeFileSync(opts["write-baseline"], keys.map((k) => `${k}\n`).join(""));
    console.log(`wrote ${keys.length} entries to ${opts["write-baseline"]}`);
    return 0;
  }
  if (!opts.diff && !opts.baseline) {
    console.error("需要 --diff、--baseline 或 --write-baseline");
    return 2;
  }
  const errors = [...(opts.diff ? checkDiff(opts.diff) : []), ...(opts.baseline ? checkBaseline(opts.baseline, opts.base) : [])];
  for (const e of errors) console.error(e);
  console.log(`check-comments: ${errors.length ? "FAIL" : "PASS"} (${errors.length} problems)`);
  return errors.length ? 1 : 0;
}

if (import.meta.main) process.exit(main(process.argv.slice(2)));

export { allowed, commentsIn, keyOf };
