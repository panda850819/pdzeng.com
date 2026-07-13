/**
 * Sync public GitHub repos into content/github-repos.json.
 * Run locally (`bun scripts/sync-github.ts`) or from the daily Action.
 * Deterministic output: same repo state → byte-identical file.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const USER = "panda850819";
const OUT = join(import.meta.dir, "..", "content", "github-repos.json");
const EXCLUDE = new Set([USER, "pdzeng.com", "blog"]);

const headers: Record<string, string> = { "User-Agent": USER, Accept: "application/vnd.github+json" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&type=owner&sort=pushed`, {
  headers,
});
if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
const raw = (await res.json()) as Array<Record<string, unknown>>;

const repos = raw
  .filter((r) => !r.fork && !r.archived && !r.private && !EXCLUDE.has(r.name as string))
  .map((r) => ({
    name: r.name as string,
    description: (r.description as string | null) ?? "",
    url: r.html_url as string,
    stars: r.stargazers_count as number,
    language: (r.language as string | null) ?? "",
    pushedAt: (r.pushed_at as string).slice(0, 10),
  }))
  .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt) || a.name.localeCompare(b.name));

writeFileSync(OUT, JSON.stringify(repos, null, 2) + "\n");
console.log(`synced ${repos.length} repos`);
