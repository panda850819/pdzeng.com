# pdzeng.com

Personal site — home / about / projects / writing / cv. Glass-liquid showcase shell, readable article pages, bilingual frame (English UI, Traditional Chinese content).

**Stack**: Next 16 (App Router, `output: 'export'`) · Tailwind 4 · Motion · Velite · Bun · Cloudflare Workers Static Assets.

## Development

```bash
bun install
bun run dev        # local dev server
bun run build      # velite + next build → out/
bun run preview    # build + wrangler dev (serves out/ locally)
bun run deploy     # build + wrangler deploy (manual deploy)
bun run typecheck
```

Bun is the package manager and script runner everywhere — local and CI. Do not mix in npm/pnpm lockfiles.

## Writing content

`/writing/` is a unified visual index. Essays come only from Substack, short
notes come from `@pdzeng_talk`, and top-level public X posts authored by
`@PandaZeng1` are archived without replies or retweets. Legacy Markdown posts
remain reachable on-site but do not appear in the Writing index.

Refresh the versioned source snapshot with `bun run sync:writing`. X refreshes
through Panda's local read-only `bird` session. GitHub Actions does not run this
sync because it has no X login state.

Production scheduling is managed outside this repository on Panda's VPS. The
host runs `bun run publish:writing` every 30 minutes from the canonical `main`
checkout. The publisher requires a clean worktree and a successful `bird`
refresh, runs the production build, then commits and pushes only
`content/writing-sources.json` when it changed.

Posts live in `content/writing/*.md`. One file per post:

```markdown
---
title: "文章標題"
description: "一兩句摘要,列表頁和 SEO 都用它"
slug: "english-slug-for-url"
publishedAt: 2026-07-13
type: blog        # blog | note
locale: zh-TW     # zh-TW | en
draft: true       # true = 不公開(不出現在列表、RSS、sitemap)
tags: [ai, ops]
---

內文 Markdown。
```

Workflow:

1. Add the file with `draft: true`, check it with `bun run dev`.
2. Flip `draft: false`, commit on a branch, open a PR — merging to `main` auto-deploys.
3. URL becomes `/writing/<slug>/`. Slug is permanent once published; don't rename it (breaks links and the 301 map).

Projects live in `content/projects/*.md` (frontmatter only: title, description, url, featured, techs) — these are the curated "Featured" cards.

The "Open source activity" list on /projects is auto-synced: `.github/workflows/sync-github.yml` runs daily (01:00 Taipei), regenerates `content/github-repos.json` via `scripts/sync-github.ts`, and commits only when something changed — the commit triggers a redeploy. Repos already covered by a Featured card (matched by URL), forks, and archived repos are excluded. Manual refresh: `bun scripts/sync-github.ts` or trigger the workflow from the Actions tab.

CV data is maintained in `lib/cv-data.ts`. The older [personal-cv](https://github.com/panda850819/personal-cv) repo is historical and should not be synced into this site without re-verifying its facts.

`scripts/migrate.ts` was the one-shot import from the old Astro blog; it stays for reference and regenerates `docs/redirect-map.json` (old URL → new URL, consumed by the domain-cutover worker).

## Deploy

- **CI (normal path)**: merge PR to `main` → `.github/workflows/deploy.yml` builds with Bun and deploys via wrangler.
  One-time setup: repo Settings → Secrets → Actions → add `CLOUDFLARE_API_TOKEN` (Cloudflare dashboard → My Profile → API Tokens → "Edit Cloudflare Workers" template). `account_id` is already in `wrangler.jsonc`.
- **Manual**: `bun run deploy` (needs `wrangler login` once per machine).
- PRs run `.github/workflows/ci.yml` (typecheck + build) as a merge gate.

Current worker URL: https://pdzeng-com.pandap-d819.workers.dev — the pdzeng.com custom domain switches over at cutover (see `docs/plans/pdzeng-rebuild.md`, deferred T08: 301 worker on blog.pdzeng.com + DNS).

## SEO / GEO

Already in place: `sitemap.xml`, `robots.txt` (explicit allows for 14 AI crawlers), `llms.txt`, JSON-LD (WebSite/Person + BlogPosting per article), per-page canonicals, OG image, RSS.

Tracking — set up once after cutover, then check monthly:

1. **Google Search Console** — add the `pdzeng.com` domain property (DNS TXT verification), submit `sitemap.xml`. Watch: coverage, queries, and the ranking dip during the 301 migration (expect a few weeks).
2. **Bing Webmaster Tools** — import from GSC. Bing feeds ChatGPT/Copilot search, so it matters for GEO.
3. **Cloudflare Web Analytics** — dashboard → Analytics & Logs → Web Analytics → add site → paste the beacon `<script>` into `app/layout.tsx`. Free, no cookies. (Not added yet — needs the site token from the dashboard.)
4. **AI crawler traffic** — Cloudflare dashboard → Analytics → Traffic; filter user-agents for GPTBot / ClaudeBot / PerplexityBot to confirm the robots.txt allows are being used.
5. **GEO spot-check** — periodically ask ChatGPT/Perplexity/Claude "Panda Zeng" or a topic you've written about, and see whether pdzeng.com gets cited. `llms.txt` and JSON-LD are what make that likely.

## Architecture notes

- Theme: dark is default; light mode via `data-theme` on `<html>`, tokens are CSS variables in `app/globals.css`, persisted in `localStorage`. No FOUC (inline script in layout).
- Content schema keeps `locale` as a first-class field — future per-post i18n slots in without re-architecture (that's the deferred next-intl plan).
- Glass (`backdrop-filter`) is progressive: `@supports` fallback renders a near-solid bar. `browserslist` in `package.json` keeps LightningCSS from stripping the standard property — don't remove it.
