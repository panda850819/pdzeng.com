---
date: 2026-07-13
type: brief
source: grill
topic: pdzeng.com personal site rebuild
tags: [brief, grill]
---

# pdzeng.com personal site rebuild

## Problem

現有個人網站分裂在兩個域名(blog.pdzeng.com 的 Astro blog、pdzeng.com 的獨立 CV 站),視覺是內容型極簡,Panda 要的是展演型(glass liquid、大動效)的單一個人站,涵蓋 home / about / projects / writing / cv。

## Original premise

「重新打造個人網站,包含 home / about / projects / blog / cv,兩個域名並存。」

## Revised premise (after grill)

骨架其實已存在(Astro 站有 index / projects / experience / blog / notes / bookmarks / RSS / OG)。真正要買的是:平台換成 React 全應用、氣質換成展演型、域名整併成 pdzeng.com 單域。內容(blog 64 + notes 2 = 66 篇)是資產無損搬遷;未來文章 i18n 只留 schema 鉤子不付框架成本。

## Alternatives considered

- A: Next.js 靜態輸出(minimal-viable) — Next 15 App Router + Tailwind 4 + Motion + Velite,`output: 'export'` 部署 CF Workers Static Assets;i18n 不裝路由只留 locale 欄位 — **Add**
- B: Next.js 全裝(ideal) — 同 A 加 day-one next-intl 雙語路由 + 全套 pipeline — **Defer**(文章 i18n 需求落定時再補)
- C: Astro 新建 + React islands(lateral) — 遷移最便宜但與展演型主氣質對沖 — **Reject**

## Chosen approach

A — 展演型鎖定 React 全應用;i18n 是未定需求只留鉤子;靜態輸出讓部署跟現在一樣便宜。

Executable plan: docs/plans/pdzeng-rebuild.md

## Scope

In:
- 新 repo `~/site/apps/pdzeng`(先 private),Next 15 + TS + Tailwind 4 + Motion + Velite
- 五區:home / about / projects / writing / cv;writing 收 blogs + notes 分類
- 內容遷移 66 篇,frontmatter 正規化(locale、type 欄位)
- 站框架(home / about / cv / UI)英文,文章維持原文繁中
- Design system:glass liquid 主氣質,文章內頁回歸可讀極簡
- SEO/GEO 移植(metadata / sitemap / OG / 舊站 GEO 優化)
- RSS 保留

Out:
- 文章 i18n 雙語路由(future;schema 已留 locale)
- bookmarks(不遷,之後想要再加回)
- CV PDF 輸出(先網頁版)
- T08 上線切換(301 redirect worker + DNS)— deferred,另開 session 走 careful

## Seams

新專案無既有 test seams。新 seams 放最高處:
- content pipeline seam:Velite schema 驗證(build 即測試,66 entries 全過)
- migration script seam:`scripts/migrate.ts` 可重跑、可 diff 驗證
- route seam:每頁一個 route,build 靜態輸出存在性即煙測

## Next skill (recommended)

```
Shape: single-target-iterative
Reasoning: 視覺/taste 判斷貫穿全程(glass liquid 方向鎖定、字體搭配),iteration 必須在前景 session。

Recommended skill:
  → /sprint --plan pdzeng-rebuild    # 依序跑,每個 sprint 吃 1-2 個 task;T03/T04 進行中搭配 ui skill 鎖方向
```

## Gotchas surfaced

- 兩批參考站氣質互斥,已鎖展演型為主、內文頁極簡 — 別在文章內頁堆動效
- 中文字重 × glass liquid 大標題排版是設計最難的一塊;標題偏英文緩解
- blog.pdzeng.com 有 GEO/SEO 累積權重,整域 301 會有數週排名波動(已接受)
- MengTo/Skills 外部 skill,安裝前過 gatekeeper
- 舊 repo 在重建期間保持可部署,hotfix 不受影響(新 repo 的理由)

## Gate Log

- Stage 1 (load context): 現況查明 — Astro 5 + CF Pages,4 collections,66 篇可遷內容,CV 源碼在另一 repo(本機未找到)
- Stage 2 (premise challenge): 7 questions,1 contradiction surfaced(繁中為主 vs 站框架英文 → 解讀為框架英文、內容繁中),escape-hatch fired? N
- Stage 3 (alternatives): chose A(B defer, C reject)
- Stage 4 (premise refresh): premise still load-bearing — Y
- Stage 5 (output): brief saved to docs/briefs/2026-07-13-pdzeng-rebuild.md

## OPEN_QUESTIONS

- T08 上線切換:301 對映表(blog/notes/experience/projects/bookmarks 舊路徑 → 新路徑)+ redirect worker + DNS,另開 session
- CV repo 位置:動工 T06 前要拿到 repo 連結
- MengTo/Skills:確定要用哪些畫面 skill 時先過 gatekeeper
- 新 repo 上線後是否轉 public
- 文章 i18n:未來需求落定時補 next-intl(Approach B 的 defer 項)
