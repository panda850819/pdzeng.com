---
slug: pdzeng-rebuild
date: 2026-07-13
type: plan
source: grill
brief: docs/briefs/2026-07-13-pdzeng-rebuild.md
execution: code
status: todo
---

# pdzeng.com rebuild — executable plan

> WHAT only. WHY is in the brief (`brief:` above). Agents read this file; per-task `status:` is DERIVED from git at execute time, never hand-edited mid-sprint.
>
> 執行 repo:`~/site/apps/pdzeng.com`(remote: https://github.com/panda850819/pdzeng.com.git,已建)。本檔同步存於新 repo `docs/plans/pdzeng-rebuild.md`,後續 sprint 在新 repo 跑。內容源:`~/site/apps/blog`。

## Tasks

### pdzeng-rebuild-T01 — Scaffold + deploy pipeline
- scope: repo `~/site/apps/pdzeng.com`(已 clone,tracking issue 已開);Next 15 App Router + TypeScript + Tailwind 4 + Motion + Velite;wrangler 設定 CF Workers Static Assets;`output: 'export'`
- acceptance: `cd ~/site/apps/pdzeng.com && bun run build` exit 0;`bunx wrangler deploy` 部署出 preview URL 且回 200
- depends-on: none
- status: todo

### pdzeng-rebuild-T02 — Content migration (blog 64 + notes 2)
- scope: `scripts/migrate.ts` 讀 `~/site/apps/blog/src/content/{blog,notes}`,正規化 frontmatter(加 `locale: zh-TW`、`type: blog|note`),輸出到 `content/writing/`;Velite schema 定義 locale/type 為必填
- acceptance: `bun run build` 時 Velite 報 66 entries 零 schema error;`grep -rL "locale:" content/writing | wc -l` 為 0;script 重跑兩次結果 diff 為空
- depends-on: pdzeng-rebuild-T01
- status: todo

### pdzeng-rebuild-T03 — Design system foundation
- scope: design tokens(色彩/圓角/blur/motion 曲線)、字體(英文 display + 中文內文 fallback stack)、glass 基礎元件(GlassCard / GlassNav / Button)、dark mode;`app/styleguide/page.tsx`
- acceptance: `/styleguide` route 在 build 輸出中存在且渲染全部基礎元件;tokens 檔存在(`grep -l "backdrop-blur" app/ -r` 非空);dark/light 兩態截圖人工過目
- depends-on: pdzeng-rebuild-T01
- status: todo

### pdzeng-rebuild-T04 — Home + navigation + page transitions
- scope: `app/page.tsx` 展演 hero、全站導航(home / about / projects / writing / cv)、Motion page transitions
- acceptance: `/` 在 build 輸出中存在;導航五連結可達;`grep -r "AnimatePresence\|motion\." app/` 命中 transition 實作;桌面/行動兩檔寬度人工過目
- depends-on: pdzeng-rebuild-T03
- status: todo

### pdzeng-rebuild-T05 — Writing section + RSS
- scope: `/writing` 列表(blogs / notes 分類過濾)、`/writing/[slug]` 文章內頁(可讀極簡,無重動效)、`/rss.xml`
- acceptance: 列表渲染 66 篇且分類過濾正確(blog 64 / note 2);任選一篇繁中長文內頁渲染正常(圖片、code block、embed);`/rss.xml` 通過 `bunx rss-validator` 或等效檢查
- depends-on: pdzeng-rebuild-T02, pdzeng-rebuild-T03
- status: todo

### pdzeng-rebuild-T06 — Projects + About + CV pages
- scope: `/projects`(遷移舊站 projects collection)、`/about`、`/cv`(內容從 CV repo 拿,路徑待 Panda 提供);三頁英文文案
- acceptance: 三個 route 在 build 輸出中存在且有真實內容(非 placeholder,`grep -ri "lorem\|TODO" app/{projects,about,cv}` 為空)
- depends-on: pdzeng-rebuild-T03
- status: todo

### pdzeng-rebuild-T07 — SEO/GEO port
- scope: metadata API(title/description/canonical)、`sitemap.xml`、OG 圖生成、舊站 GEO 優化項(llms.txt 等,依舊 repo commit 3ca027d 清單)搬遷
- acceptance: build 輸出含 sitemap.xml 與每頁 OG 圖;`bunx lighthouse <preview-url> --only-categories=seo` 分數 ≥ 95
- depends-on: pdzeng-rebuild-T04, pdzeng-rebuild-T05
- status: todo

<!-- T08 (301 redirect worker + DNS cutover) deferred — see brief OPEN_QUESTIONS. 另開 session 走 careful。 -->
