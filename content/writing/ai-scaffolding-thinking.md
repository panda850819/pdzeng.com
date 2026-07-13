---
title: "AI Scaffolding 與清晰思考"
description: "關於如何更有效地使用 AI 的心得筆記，包含支架概念、紅隊思維與技能系統設計"
slug: "ai-scaffolding-thinking"
publishedAt: 2024-12-30
type: note
locale: zh-TW
draft: true
tags: ["ai"]
---

## 來源

[YouTube ↗](https://www.youtube.com/watch?v=Le0DLrn7ta0)

## 核心觀點

### Clear Thinking 清晰思考

如果你連自己想要說的東西都沒辦法講清楚，那麼 AI 也不可能完全理解。

這是使用 AI 的根本前提——先釐清自己的想法。

### AI Models 與 Scaffolding 的關係

**支架 (Scaffolding) 的四個層次：**

1. **Prompt Engineering** - 提示工程
2. **Workflow Structure** - 工作流程結構
3. **Context Systems** - 上下文系統
4. **Cognitive Architecture** - 認知架構

更完整的支架能讓 AI Models 發揮更好的效能。模型本身的能力是基礎，但支架決定了能發揮多少。

### Code before Prompts

先寫程式碼，再寫提示詞。實作優先於描述。

### Red Team 思維

透過紅隊概念去攻擊自己的想法。主動找出自己思路的漏洞和盲點。

### 單一職責容器

讓每一個 container 只做一件事。建置多個技能讓他們互相呼應，而非一個龐大的萬能系統。

### 自我更新、自我修復系統

- Running upgrade
- Review skills and memory
- 持續找尋更新機會

例如：從 Claude Code engineering 內容中尋找可以整合的新概念。

## 我的系統現狀自評

### Scaffolding 四層次盤點

| 層次 | 現狀 | 評估 |
|------|------|------|
| Prompt Engineering | 沒有特別模板，但重視「把話講清楚」 | ✓ 這本身就是最重要的 PE |
| Workflow Structure | 用 n8n + skills 打造穩定流程 | ✓ 已有基礎架構 |
| Context Systems | claude-mem 記憶系統 | ✓ 運作中 |
| Cognitive Architecture | 不知道怎麼做 | ⚠️ 待探索 |

### Skills 現狀

- 大多是垂直領域：寫作、健康教練、Pine Script
- 各自獨立，**較少互相呼應**
- 有 20 sessions 自動總結機制，但屬於被動更新

## Red Team：系統弱點

**核心問題：需要我先行**

- 很多部分都要我主動去學習、去整理
- 網路上有很多好資源（Anthropic、Google 官方內容），但系統不會主動去「巡邏」
- Skills 更新依賴我發現問題

**潛在解法：外部學習機制**

- 可以設計一個 skill 主動巡邏外部資源
- 搭配 sessions 總結 + 好的內容文獻
- 讓 skills 可以自己進化

## 關於「裝備」的願景

Skills 最終會成為我的「裝備」——

**目的不是放大已經會的事，而是補足不會的事。**

例如營養學：
- 自己重新閱讀要花很多時間
- 不一定學得會
- 但透過裝備可以快速理解這個垂直領域
- 還能加深對單一知識點的延伸

生活中有很多垂直領域（健康、營養、財務）是需要的，但人沒精力全部學。裝備的價值就在這裡。

## Cognitive Architecture 的洞察

**不是只有「我說什麼」，還有「AI 怎麼處理」**

| 層次 | 責任 | 可系統化程度 |
|------|------|-------------|
| Prompt 清晰度 | 我負責 | 低，需要我想清楚 |
| AI 思考框架 | 可以設計 | 高，透過 skill 強制 |

**關鍵洞察：要分應用場景**

- 如果已經討論一陣子 → 不需要再確認方向
- 如果內容不夠清晰 → AI 應該主動提問
- **設計階段（PRD/MRD）→ 每次詢問都比執行時更重要**

這形成一個層次：

```
Questions before Code before Prompts
```

在設計階段多問一個問題，比在執行階段發現方向錯誤更有價值。

## 下一步行動

1. **探索 Cognitive Architecture**：設計讓 AI 在特定場景下「先做某件事」的機制
2. **外部學習機制**：建立可以巡邏外部資源的 skill
3. **Skills 連結**：思考現有 skills 如何互相呼應
4. **持續一 part 一 part 進行**：接受這是一個漸進過程

---

## 參考架構：PAI (Personal AI Infrastructure)

來源：

[https://github.com/danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)

### PAI 14 原則（與我的反思對照）

| PAI 原則 | 我的理解 |
|---------|---------|
| Clear thinking precedes prompting | 把話講清楚比 prompt engineering 更重要 |
| Architecture surpasses model selection | Scaffolding 決定模型發揮多少 |
| Code before AI requests | 能用程式解決的就用程式 |
| Modular Unix-like tooling | 單一職責容器 |
| Self-modifying systems | 自我更新系統 |
| Hierarchical decision-making | goals → code → CLI → prompts → agents |

### PAI Packs 分類法

| 類型 | 定義 | 我的對應 |
|------|------|---------|
| **Skills** | 執行任務（action-oriented） | pine-*, n8n-*, taiwan-health-coach |
| **Features** | 系統基礎（architectural infrastructure） | prompt-router, skill-reviewer, triage |

**洞察**：需要更多 Features 類的能力：
- 外部資源巡邏 (external-learner)
- Skill orchestration（讓 skills 互相呼應）
- Pre-flight checklist（Cognitive Architecture）

### Hook System 概念

PAI 用 hooks 追蹤事件（session start, tool output）實現持續學習。

我的 20 sessions 總結是類似概念，但可以更細緻：
- 每次 bugfix 後評估是否需要新 skill
- 每次使用外部資源後考慮是否內化

## 原始反思

這些概念呼應了軟體工程的基本原則：
- 單一職責原則 (SRP)
- 清晰的介面設計
- 持續迭代與改進

AI 工具的使用，本質上也是一種系統設計。
