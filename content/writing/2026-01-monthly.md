---
title: "月報 #01 - 閒不下來的一月"
description: "2026 年第一份月報，記錄 AI 工具探索、深度學習與系統建設的歷程"
slug: "2026-01-monthly"
publishedAt: 2026-01-31
type: blog
locale: zh-TW
draft: false
tags: ["月報", "反思"]
---

> 「科技始終源自於人性。所以在 AI 時代，越懶的人越能發揮出 AI 真正的價值。」

這是 2026 年的第一份月報也是目前唯一的一篇月報，記錄了 01-01 至 01-31 期間的生活與思考。

![](https://raw.githubusercontent.com/panda850819/image-hosting/main/6AFDCA9B-54FF-4407-A449-1B96DBAD9C85_1_201_a.jpeg)

---

## 閒不下來

月底寫下這句話時，我停下來想了很久：

> 「我感覺我還是挺可悲的，閒不下來。」

還記得我在去年提離職的時候，我希望我好好的讓自己休息。主要是讓自己的睡眠、作息以及大腦可以更多地減壓，原先以為加密寒冬可以讓我好過一點，殊不知遇到 AI 牛市，讓我的注意力又重新回歸到這裡。

我在過程中做了很多的嘗試，因為用 Opus 模型太容易耗光額度，我就將 Opus 換成 Sonnet，光終端機就從 Warp 換到 iTerm2 再換到 Ghostty，然後因為想要保留 Claude Session 我就從 tmux 到 zellij。

現在的 AI 時代滿足了我在幾年前沒有寫 Code 的快感（雖然不是完全的手寫），但每一個行為又提供了我「找到可以持續優化內容」的興奮感。

https://ghostty.org/

https://github.com/zellij-org/zellij

---

## 關於決策與委派

在休息的途中，我仍然在思考創辦人應該管多少細節，像是現在的很多一人公司或是所謂的超級個體，他們基本上 Own 所有的 Context，那麼他們做的決策以及能夠委派的對象跟窗口都很統一是 AI，這也能夠確保資訊鏈跟 Context 的收集都被歸類在一個不太容易失真的空間。

曾經我待在前司的時候，我的角色基本上就是做 Operations Manager 但我的位置說到底還是一個 Mid Level Manager，許多的決策仍然需要等待 CEO 的確認，如果完全委派會失控，如果每一件事情都去詢問 CEO 就會導致 Bottle Neck，且每一次的資訊同步都有可能會有資訊掉幀。

後來讀了 PostHog 的 [Handbook](https://posthog.com/handbook)，發現他們的做法是「Context not Permission」——給足夠的背景資訊，讓人自己判斷。而 AI 時代，如果成員是沒辦法獨立思考，儘管團隊不淘汰他，他也會在一段時間後被 AI 或者是世代淘汰。

營運不單單只是創建流程、SOP 以及確保流程執行順暢，而我們最核心的是作為團隊的橋樑消除他們心中的溝通恐懼，打造一個團隊成員敢主動發話且願意分享的空間。

這些思考還沒有答案，但至少問題變得更清晰了。

https://posthog.com/handbook

---

## 學習與輸入

這個月有 8 場正式的學習記錄，幾個特別有收穫的：

### Agent 四支柱

深入學了 AI Agent 的架構：Memory、Reasoning、Tool Use、Planning。最大的收穫是理解「Agent 思維」不只是技術選擇，而是整個認知體系的轉變。

決定用混合式記憶方案：claude-mem + Obsidian + _memories/ 目錄。

https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read

### Naval Ravikant

建立了 Naval 的知識庫。印象最深的是：

> 「欲望是你和自己簽訂的不快樂合約。」

他對槓桿的分類——舊槓桿（勞動、資本）vs 新槓桿（程式碼、媒體）。後者沒有邊際成本，這是這個時代最大的機會，有機會的話可以看 Neval 的 Blog 以及他的納瓦爾寶典。

https://nav.al/

### Peter Steinberger 的 AI 工程

學了這位創業者的工作方式。他說現在不再讀代碼了，而是「看推理流畫過」。還有「爆炸半徑思維」——評估每次改動的影響範圍，決定是用很多小炸彈還是一個大炸彈。

他一週工作 80+ 小時，陷入「one more prompt」的循環

https://github.com/steipete

---

## 生活與日常

### 工具環境

- 從 iTerm2 換到 **Ghostty**，解決了終端截圖粘貼的問題
- 配置了 **mosh + tmux**，遠端開發體驗提升很多
- 買了 **AOC AM500 顯示支架**，桌面終於清爽了
- 開始用 **Typeless** 語音輸入，發現「說」比「打」更能整理思路

### 運動

- 01-08 跑步訓練有改善，心率下降
- 01-21 第二次每週跑，體感進步明顯
- 01-31 這次能夠用 7 分速一口氣跑滿 7km，最後分兩次跑滿了 11km

---

## 有趣的事與物

### 輸入

這個月的學習記錄：

- [Agent 四支柱架構](https://www.aihero.dev/my-agents-md-file-for-building-plans-you-actually-read) - Matt Pocock 的 AGENTS.md 設計
- [200 行重建 Claude Code](https://www.mihaileric.com/The-Emperor-Has-No-Clothes/) - Agent 本質：LLM + 3 個工具 + 循環
- [Naval Ravikant 財富與幸福](https://nav.al/archive) - How to Get Rich、Happiness 系列
- [Claude.md 指令設計最佳實踐](https://www.humanlayer.dev/blog/writing-a-good-claude-md) - 100-150 條指令上限
- [Peter Steinberger AI 工程實戰](https://steipete.me) - Blast Radius 思維、並行 agents
- [Pickle Cat 加密投資哲學](https://x.com/0xPickleCati/status/2016059049729458207) - 共識 vs 叙事、激勵衰減測試
- [PostHog Handbook 組織管理](https://posthog.com/handbook) - 透明文化、Context Not Permission

### 工具

- **Ghostty** - 新一代終端，截圖粘貼終於正常了
- Tailscale - 解決了 Mac 端的遠端連線問題
- **Typeless** - 語音轉文字服務

---

## 數據

透過 AI 記錄我在公開以及非公開的地方都在幹嘛 lol

| 指標 | 數值 |
|------|------|
| 每日筆記 | 195 則 |
| 平均每天 | 6.3 則 |
| 最活躍日 | 01-22（24 則）|
| 學習會話 | 8 場 |
| AI 主題佔比 | 48% |

---

## 下個月

幾件想推進的事：

1. **記憶和學習系統** - 讓 AI 可以更了解我自己，也讓他能夠針對我去提問更犀利的問題
2. **投資哲學** - 寫出自己的「Why」
3. **長文** - 解決拖了好幾週的脫稿問題

還有一些開放的問題：

- 創辦人應該微管理到什麼程度？
- 如何衡量「團隊溝通健康度」？
- 「長文脫稿」的寫作堵塞，根本原因是什麼？

---

## 結語

回看這個月，主線大概是：

**AI 工具探索 → 深度學習 → 系統建設**

從追著新工具跑，到開始理解背後的架構和哲學，再到試著把這些理解變成可持續的系統。

閒不下來或許不是壞事，重要的是閒不下來的方向對不對。

下個月見。
