---
title: "我的 AI 架構真的 Harness 嗎？"
description: "上個月寫「很忙但好像什麼都還沒做」，這個月把 pstack 改成 pandastack 並 ship v1.0、把 vault 砍掉重練、把 PGLite 換成 Postgres，順便接了一個副業的 Product Owner。"
slug: "harness-2026-04"
publishedAt: 2026-05-03
type: blog
locale: zh-TW
draft: false
tags: ["月報", "反思"]
---

![image.png](https://raw.githubusercontent.com/panda850819/image-hosting/main/20260503233653135.png)

如果說三月到四月是「做了很多，但感覺什麼都沒做」，那麼四月到五月對我而言就是一個設計閉環的過程。

回頭看，過去這一個月仍然做了不少事：把 pstack 改名 pandastack 並 ship 了 v1.0、把 vault 從 3535 篇筆記砍到 224 篇、把整套個人 brain 從 PGLite 換到 Postgres。

## 別人可以為什麼我不行

四月中我跑了一次自己的 deep research，主題是 Garry Tan 怎麼把私人工具一步步公開成品牌，看自己能不能比照辦理。

根據自己原本的技能（Skill）模仿 Garry Tan 把一些開發流程（像是 /ship  和 /sprint 和 /retro）給打包，並且根據我的幾個角色來創建 Agents 像是開發者、設計師、運營官、執行長等。

創建完之後，拿這套流程來跑開發，只需要簡單輸入了 /ps-sprint 就會開始從目標確認、對齊等，然後陸陸續續 Spawn 其他的 Agent 分別來進行開發和推進。

下午我就拿了四個 Agents 協助我跑了一輪自我審視，異口同聲的告訴我 pstack 的位置是個死位，「小一號 gstack」是 follow-on product 最不該站的位置。

當天最痛的不是定位錯，是我發現自己之前在做這件事的時候沒有想清楚要打哪個市場，只是因為覺得 Gary Tan 那條路看起來很爽就跟著做。

>Naval 在訪談裡講過一句話我那時候才真的聽懂：「specific knowledge 是教不來的，是你本來就會、別人學不來的東西。」我把 specific knowledge 過載到別人的劇本上，當然無法演下去（甚至還沒開始演）

那天晚上做了幾個決定：

1. 不走 Garry 路線，改走 Boris Cherny / Simon Willison 那種「工具人公開實作筆記」的路子，但最後基於自己的懶惰，還是鮮少的發佈一些跟工作或開發相關的事情。
2. 如果要重新再來，那麼 pstack 應該也要來換個名稱

## 重構之路

決定改名之後，拖延症患者我剛好遇到出差，基本上以工作為出發，鮮少去打磨和重新思考架構層面的問題。

直到這週末，遇到五一連假，才開始把名稱修改成 pandastack，並重新著墨一次 Garry Tan 在設計 GStack 和 Gbrain 等架構，在此感慨這個 AI 世代，打造一整個專屬於自己的服務都不是什麼很誇張的事。以一般軟體工程來說，大多數的情況都希望不要重複造輪，但現在重新造一個輪子的成本變得太低了（茶），也發現 Garry 不止開了一個 PGLite 用作大腦（記憶層）還創建一個瀏覽器（Chromium）用做讓自己可以更方便的調用來做 QA 和操作（像是截圖、取得資訊等）。

這次的重構，逐一降低 Skills 和 Flows，目標想打造一個整體 Harness 架構（包含 Claude Code / Codex / Hermes ）都能夠用的通用服務。

- skills 從 39 個砍到 36 個
- flows 從 9 條砍到 7 條

並且我把以前散在 `~/.claude/CLAUDE.md` 裡跟 agent 身份相關的東西全部抽出來，放到 `~/.agents/AGENTS.md`，這個檔案 Claude / Codex / Hermes 都讀得到，誰當前在執行就用同一份 substrate。

原本只是想清乾淨 Claude 的 config，結果最後變成一個三層架構：

- Tier 1 是 substrate，所有 CLI 共用
- Tier 2 是各家 CLI runtime，只放自己平台特有的東西
- Tier 3 是 scheduler，launchd / Hermes / Claude CronCreate

最後得到的就是以下的三個 Repo

- https://github.com/panda850819/pandastack
- https://github.com/panda850819/pdctx
- https://github.com/panda850819/gbrain/tree/panda/simple-tokenizer

## 知識庫管理

當我把上述架構整理完之後，結果 5/1 看到 iBlinkQ 寫的一篇 LLM Wiki 的設計筆記，他引用 Karpathy 的觀點：「raw 是 immutable，AI summary 不是知識。」這句話打到了一個我一直在迴避的問題。

我在前一段時間，跑了兩個服務，一個是以垂直領域、一個是橫向領域協助我閱讀一些我懶得看的內容，我的 vault 那時候有 3535 篇筆記，其中 3311 篇是 AI 寫的。而這些筆記乾淨、有 frontmatter、wiki-link 都接好了，但全部都不是我自己想出來的內容。我一直假裝沒看到，因為「至少資料量大」感覺很安全。

那天下午我做了一個有點極端的決定：把 vault 改成 authorship-by-location。

`knowledge/` 這個資料夾從今天起只能放我自己寫的東西，AI 只能維護結構（wiki-link、summary frontmatter、lint），不能 originate substance。

所有來源不明或 AI 寫的筆記都搬到 `Inbox/legacy-knowledge/`，要回到 `knowledge/` 必須走 `/knowledge promote`，意思是我親自重寫一遍。

執行下來，knowledge/ 從 3535 砍到 224，並且把一直以來的 AI 筆記內容服務關閉，只單純抓取 RSS 跟相關原文到 Inbox。

砍完之後，我將我的知識庫跑了我自己的 Skill - /wiki-lint 得到了 0 個 orphan、0 個 stale、0 個 superseded、224 個 frontmatter gap，相當於過去時間我一直在創建並且累積所謂的第二大腦（Second Brain），最後還是錯付了。

## 我寫的內容是給誰看

畢竟目標就是完整地完成 Harness，目前還是缺少了記憶層（原本用了很多像是 Claude-Mem 有點肥，然後只能在 Claude Code 中使用），所以開始探索 QMD 和非結構化資料庫。

![CleanShot 2026-05-03 at 22.53.41.png](https://raw.githubusercontent.com/panda850819/image-hosting/main/CleanShot%202026-05-03%20at%2022.53.41.png)

看完上述的內容後，我 Fork 了 Garry 的 gbrain（對，又是他），patch 了 tokenizer，把 SQLite FTS 的 `english` 模式換成 `simple`，因為我大量筆記是中英混雜，FTS5 的英文 stemmer 會把中文字搞壞。(這時候如果是一個外國團隊就舒服了，啥都不用動)

接著寫了 `gbq` 這個 CLI，當作所有 vault query 的單一入口。寫了 vault 的 post-commit hook，每次 commit 完自動 sync 進 brain。又要讚嘆現在 AI 重複造輪的能力真的強，一個指令就把之前 `pandastack/done` skill 裡所有 qmd 的引用改掉，跟用了三個月的 qmd 說再見了。

過程中順手把兩個 AI 寫 code 容易犯的 anti-pattern 寫進 substrate：

1. **Listener owns lifetime**：任何掛 `fs.watch` / `setInterval` 又收外部資源的 function 必須回 Promise 等到 close 才 resolve，否則 caller 的 finally cleanup 會跟 callback race。
2. **Loops 跑 running aggregate**：`for (x of list) { fn([...acc, x]) }` 是 O(N²)，AI 寫的 chunker / validator / dedup loop 很愛這樣寫，小資料看不出來，真實 vault 一跑就掛。
## PGLite 適合我嗎

那天早上我跑 `/done` 收前一天的 session，skill 裡有一個步驟是 fire-and-forget 觸發 `gbrain sync`。結果剛好那天我升級了 chunker version，sync 觸發了 full re-walk，hang 了 12 分鐘還沒結束。

我看他都遲遲沒結束，我就把這個進程殺了，有趣的事情來了 brain.pglite 竟然損毀。

我和一如往常一樣，讓 AI 去修相關的技能和資料庫，並且在這時候同時 Spawn 兩個 Agents（Claude Opus 4.7 Max + Codex 5.5 ） 來重新評估目前的設計和資料庫選用。

> PGLite 對我來說是不是根本就是錯的選擇？

答案是的。

PGLite 是 in-process SQLite over Postgres wire protocol，只能單寫、不能並行。

假設我今天會有多個平行 Agent 觸發並且同時寫入，那麼我就很有可能在遇到一次一樣的問題，不是 Hang 在那就是 Crash 影響整體記憶質量，所以後續我把整套 brain 從 PGLite 遷到 Postgres。

## 工作

這個月我的工作量從做事變成大量溝通，在公司導入了 performance review dry run 並且同步在 Train 公司的 HR 進行招募。

4 月的後兩週，一週將近 20 場會議，然後大量的和團隊成員進行 1 on 1，取得大家的資訊並且也根據取得的資訊後，和各自的 Manager 進行下一步的溝通。

### 招募

在有了 AI 之後，招募能夠玩的花樣沒有那麼多，但還是有一些內容可以分享的。

招募顧名思義就是將「人」招到團隊中，那麼「人」在哪？從哪來？怎麼來？怎麼進行判斷？

我們 HR 在內地，所以 Chatgpt 和 Codex 就是他的主力工具，作為一個純文組生，剛開始給他的目標只有告訴我，真實你的一天會怎麼運作。

他告訴我，他不懂這件事情和 AI 有什麼關係？在 AI 時代下，「人」需要清楚知道自己的動機以及為什麼而做以及做什麼，而流程化的部分我們會透過 Skill 來取代。當你能夠很完整地告訴我，你通常是什麼判斷標準以及你會怎麼做甚至怎麼看，就能夠透過 Skill 來大量節省你在做一些繁瑣事務上的時間。

那麼招募上，會有哪些事務會佔用你的時間呢？
- 撰寫 JD / 確認 JD / 發佈 JD
- 履歷篩選
- 面試準備
- 面試

那麼這幾件事情就能夠展開來個別突破，細節就不特別多說了（笑）

### 香港 & 深圳

這趟先去香港後續深圳，關於香港大會，人特別少、特別無聊，看得出來大家甚至懶得來香港卷了。而深圳面基了 Lipa 和 Luca 還有些朋友就不一一點名，而在這次也被推了 Whoop 所以回台北之前就下單了。

![C932FEB8-373E-4432-99BA-E00FF65DF08C_1_102_o.jpeg](https://raw.githubusercontent.com/panda850819/image-hosting/main/C932FEB8-373E-4432-99BA-E00FF65DF08C_1_102_o.jpeg)

## 生活

- AI 大量佔據我的時間，買了 pokopia 和人龍，之後找時間來玩
- 這次出差找了貓保母（毛小愛），讓我家的貓在每天下午都有人陪，也不會餓肚子
- 老婆跟我說最近我家貓比較不喜歡我，可能是因為我太常坐在電腦前，要找時間給他多一點注意力

## 五月想推的事

- 把自己的 Harness 架構設計得更好，目前多 dogfooding 看看成效
- 英文訓練（口語加強）、多看英文影片進行學習
- 體能訓練（重訓、慢跑）

## 有趣的事與物

可以在 https://t.me/pdzeng_talk 以及 https://daily.pdzeng.com/ 上查看。

### 文章

- [Karpathy on LLM Wiki](https://x.com/karpathy)，那篇直接引爆我這個月對 vault 架構的重新思考。raw 是 immutable，AI summary 不是知識。
- [wquguru/harness-books](https://github.com/wquguru/harness-books)，1.9k 星的 Claude Code + Codex harness 設計兩本書，我這個月 substrate 拆三層的時候大量參考。
- [iBlinkQ on llm-wiki-obsidian-blink](https://github.com/iBlinkQ/llm-wiki-obsidian-blink)，那篇是 Karpathy 觀點的 Obsidian schema 落地版，frontmatter 的 summary 欄位設計直接抄了。
- [Anthropic on Scaling Managed Agents](https://www.anthropic.com/news/scaling-managed-agents)，Anthropic 把 agent 拆成 session/harness/sandbox 三層，p95 TTFT 降 90%。對我設計 pdctx 的時候很有啟發。
- [DHH on Agent-First Coding](https://world.hey.com/dhh)，DHH 六個月從零 AI 變成 agent-first，tmux + dual model + NeoVim。CLI 是 AI 介面這個觀點 Unix 哲學的延續。

### 工具

- [gbrain](https://github.com/garrytan/gbrain)，Garry Tan fork 之後我自己也 fork 了一份。BM25 + graph + 之後接 embedding 的 personal brain stack。
- [pglite](https://pglite.dev/)，被我這個月實測證明對重度寫入的 personal brain 是錯的選擇，還是回到本機 Postgres 比較穩。但 pglite 對 demo / portable use case 還是很神。
- [Hermes](https://github.com/sst/hermes)，OpenAI subscription quota 跑 codex -p 的 cron scheduler。我把 morning briefing / evening distill / weekly retro prep 三個 cron 都掛在它上面。
- [pandastack](https://github.com/panda850819/pandastack)，自己的東西。v1.0.0 上週剛 cut，內含 5 個 persona / 7 個 lifecycle / 36 個 skill。Dogfood 中。

### 影片 / Podcast

- [Naval on Specific Knowledge](https://www.youtube.com/watch?v=naval-specific)，我 4/18 撞牆那天靠這集走出來。specific knowledge 教不來，跟在 Garry 後面只是在演別人的劇本。
- [Lenny on Reinvention](https://www.lennysnewsletter.com/p/the-product-skill-you-must-now-master)，product skill 第一條是 reinvention。對 PM 跟 founder 都有效。

### Crypto / 金融

- [DeFi United Recovery](https://defi-united.com)，4/28 主題，DeFi 主要協議今年的 recovery curve。
- [Bitwarden 供應鏈攻擊](https://www.checkmarx.com/blog/bitwarden-attack)，Checkmarx 揭露的供應鏈攻擊，提醒我自己 npm 跟 brew 安裝任何東西都該過 slowmist review skill。

### 值得關注的人

- [Boris Cherny](https://twitter.com/borisccherny)，Claude Code 創造者。我這個月設計三層架構的時候反覆讀他兩個訪談。
- [Simon Willison](https://simonwillison.net/)，繼續是我 feed 裡品質最穩定的一個來源。Affirm 一週 ship agentic workflow 那篇是這個月看完印象最深的 case study。
- [Garry Tan](https://twitter.com/garrytan)，YC Founder，雖然 gstack 很肥，但他的 personal brand playbook 還是很值得拆。
