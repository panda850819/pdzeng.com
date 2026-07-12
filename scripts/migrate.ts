/**
 * One-shot content migration from the old Astro blog (apps/blog) into
 * content/writing/. Idempotent: rerun produces byte-identical output.
 *
 * Semantics preserved from the old site:
 * - slug = frontmatter slug || filename (old URLs were /blog/<slug||id>)
 * - draft defaults to TRUE (old schema default; prod hides drafts)
 * - notes.category folds into tags
 */
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { basename, extname, join } from "node:path";
import matter from "gray-matter";

const OLD = "/Users/panda/site/apps/blog/src/content";
const OUT = join(import.meta.dir, "..", "content", "writing");
const MAP_OUT = join(import.meta.dir, "..", "docs", "redirect-map.json");

type Kind = "blog" | "note";

const cjkRatio = (s: string) => {
  const cjk = (s.match(/[一-鿿㐀-䶿]/g) ?? []).length;
  return cjk / Math.max(s.length, 1);
};

const isoDate = (v: unknown): string => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  const s = String(v);
  const m = s.match(/^\d{4}-\d{2}-\d{2}/);
  if (m) return m[0];
  const d = new Date(s);
  if (isNaN(d.getTime())) throw new Error(`bad date: ${s}`);
  return d.toISOString().slice(0, 10);
};

const yamlStr = (s: string) => JSON.stringify(s);

// Astro-specific MDX → plain markdown/HTML the new pipeline can render.
// Import-stripping is .mdx-only: plain .md never has MDX imports, but its
// code blocks can contain lines starting with `import` (e.g. Go).
const transformBody = (body: string, isMdx: boolean) => {
  let out = body;
  if (isMdx) out = out.replace(/^import\s.+$/gm, "");
  out = out.replace(/<Tweet\s+id=["']([^"']+)["']\s*\/>/g, (_, id) => `[Tweet ↗](https://x.com/i/status/${id})`);
  out = out.replace(/<YouTube\s+id=["']([^"']+)["']\s*\/>/g, (_, id) => `[YouTube ↗](https://www.youtube.com/watch?v=${id})`);
  out = out.replace(/<LinkPreview\s+id=["']([^"']+)["']\s*\/>/g, (_, url) => `[${url}](${url})`);
  return out.replace(/\n{3,}/g, "\n\n").trim();
};

const migrateDir = (dir: string, kind: Kind) => {
  const files = readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f) && f !== "CLAUDE.md")
    .sort();
  return files.map((f) => {
    const raw = readFileSync(join(dir, f), "utf8");
    const { data, content } = matter(raw);
    const slug: string = data.slug || basename(f, extname(f));
    const title: string = data.title;
    if (!title) throw new Error(`missing title: ${f}`);
    const tags: string[] = (data.tags ?? (data.category ? [String(data.category).toLowerCase()] : [])).map(
      (t: string) => t.toLowerCase()
    );
    const body = transformBody(content, extname(f) === ".mdx");
    const locale = cjkRatio(title + body.slice(0, 2000)) > 0.05 ? "zh-TW" : "en";
    const fm = [
      "---",
      `title: ${yamlStr(title)}`,
      `description: ${yamlStr(data.description ?? "")}`,
      `slug: ${yamlStr(slug)}`,
      `publishedAt: ${isoDate(data.publishedAt)}`,
      `type: ${kind}`,
      `locale: ${locale}`,
      `draft: ${data.draft ?? true}`,
      `tags: [${tags.map(yamlStr).join(", ")}]`,
      "---",
    ].join("\n");
    return { slug, kind, file: `${slug}.md`, out: `${fm}\n\n${body}\n` };
  });
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const entries = [...migrateDir(join(OLD, "blog"), "blog"), ...migrateDir(join(OLD, "notes"), "note")];

const seen = new Map<string, string>();
for (const e of entries) {
  if (seen.has(e.slug)) throw new Error(`slug collision: ${e.slug} (${seen.get(e.slug)} vs ${e.kind})`);
  seen.set(e.slug, e.kind);
  writeFileSync(join(OUT, e.file), e.out);
}

// Old URL → new URL map, consumed by the T08 redirect worker later.
const map: Record<string, string> = {};
for (const e of entries) {
  const oldBase = e.kind === "blog" ? "/blog" : "/notes";
  map[`${oldBase}/${e.slug}`] = `/writing/${e.slug}/`;
}
mkdirSync(join(import.meta.dir, "..", "docs"), { recursive: true });
writeFileSync(MAP_OUT, JSON.stringify(map, null, 2) + "\n");

const counts = entries.reduce((a, e) => ((a[e.kind] = (a[e.kind] ?? 0) + 1), a), {} as Record<string, number>);
console.log(`migrated ${entries.length} entries`, counts);
