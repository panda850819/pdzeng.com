---
title: "很忙，但好像什麼都還沒做"
description: "做了開源語音工具 Murmur Voice、創建了 pstack、跑通宵研究循環、去了釜山,但回頭看好像什麼都還沒完成。"
slug: "busy-but-nothing-done-2026-feb-mar"
publishedAt: 2026-04-06
type: blog
locale: zh-TW
draft: false
tags: ["月報", "反思"]
---

四月的目標就是重新回歸寫作，在過程中我嘗試很多方式讓我自己回歸，除了工作上講了一堆話以外，我發現我打文章的能力很明顯的變弱了，我現在主要都是在自己的 Telegram 頻道上面自己 Murmur 偶爾把一些有趣的東西發佈到 X 上，算是滿足自己的一部分分享欲了，拖更了好久那就來久違的月度總結了。

回顧這兩個月我做了一個開源的語音工具、建了一套自己的開發流程、每天讓 AI 自主去進行深度研究並每天提供我報告讓我學習、去了釜山。但回頭看的時候，總覺得好像什麼都還沒真正完成。

大概就是那種吃了很多但沒消化的感覺，與此同時可能更羨慕卡比或是百變怪了 :3

![](https://raw.githubusercontent.com/panda850819/image-hosting/main/6A3E95C3-CCF1-4EE3-94E1-D7A56DB23B07_1_102_o.jpeg)

## 從 Typeless 到 Murmur Voice

二月最大的意外，是我自己做了一個語音轉文字工具。

一月月報裡我還在推薦 Typeless，結果二月中發現它有全域監聽和剪貼簿存取的資安問題。當天晚上就開始寫，兩天後上了 GitHub，一週內 Windows 版也有了。

一路迭代到三月底的 v0.5.1，加了翻譯功能、內建術語辭典、多組合鍵、防幻覺過濾。Apple Developer 帳號也通過驗證，終於可以正式簽名發布。

整個過程最爽的是「從發現問題到解決問題」只花了一個晚上。功能反而是其次。以前做一個工具可能得先從架構出發，現在有太多可以參照的輪子，釐清想法就能把需求跟規格定義好。這大概是全面 AI 化之後最直接的改變：工具變強了，我們敢動手的範圍也跟著變大了。

https://github.com/panda850819/murmur-voice

## 從 Skill 到系統

做完 Murmur Voice 之後，我開始在思考我是不是能夠系統化這些流程跟架構？

三月初翻譯了一篇律師事務所用 Claude 的實戰文章，裡面有一句話打到我：**Skill as a Service** 正在取代 Model as a Service。模型會一直變強，但你的 skill 是你自己的。

從那之後我開始認真整理自己的 skills 體系，把 Obsidian plugin 的邏輯拆成 skill + skill chain，移除 plugin 依賴，做了幾輪瘦身，94 個 skills 砍到 83 個再砍到 23 個，14 條 rules 精簡到 7 條。

精簡的過程中，Boris Cherny（Claude Code 創造者）的訪談給了我三條判斷標準：Build for the model 6 months from now、Scaffolding 會過期但 Preference 不會、SOP 要從觀察現有行為設計不要憑空想像。第三條我把它叫做 latent demand design，先觀察自己實際怎麼用，再決定要自動化什麼。少即是多，但前提是你真的知道你需要什麼。

Skills 整理到一個段落之後，接下來自然就是 agent team 該怎麼組的問題。

當時研究了一陣子 Paperclip 那種全自動拆分架構，也自己建了一套叫 Diamond Flow 的 agent team。CEO Agent 拆需求，Product Lead 跟 Design Lead 並行設計，Eng Lead 實作，驗證完自己收尾。聽起來很完美，理論上我只要按 enter 然後去睡覺。

但跑了幾輪之後我選了半自動。因為我不是 100% 相信 AI 的產出。每個關鍵節點我還是想自己看一眼。這讓我的判斷時間變成整個系統的瓶頸，但在正確性跟安全性面前，這個瓶頸我願意留著。

後續基於 Gary Tan 創建的 gstack 將一些好的想法並且融合當前的開發模式，將之收斂成屬於我自己的開發架構 pstack v0.1.0，核心是 learning loop（參考了 EC）：每次 review 產出 learnings，下次先讀上次的教訓。不是讓 agent 取代你思考，是讓 agent 幫你記住你上次思考了什麼。這個選擇對不對，可能要等模型再強兩代才知道。

https://github.com/panda850819/pstack

## 通宵研究與知識爆炸

選了半自動不代表不自動。

三月 Karpathy 開源了 autoresearch，我看到之後馬上接進自己的系統，開始嘗試跑通宵循環，一開始拿來做 skill 嘗試後續根據這樣的 eval 機制用作現在的自動補齊視野盲區的工具。

具體案例大概是這樣：輸入 /auto-research，醒來多了 31 份完整的 MOC 以及參考筆記。之後幾天又跑了幾輪，最誇張的一晚，一覺起來 165 篇，七個領域。

兩個月的時間我總共累計了 954 篇筆記，如果印出來的話大概是三本《人類大歷史》的厚度。光 AI 相關就 420 篇，比我大學四年讀的論文還多。

然而我的產出則是 0 篇貼文，可能有好幾篇零散的 Tg 分享，但始終沒達到我的目標。

https://github.com/karpathy/autoresearch

## 工作跟交易

工作上的事也在同步推進。三月在公司推了一次團隊 AI 使用情境分享會，六個人各自分享 Claude Code 和 OpenClaw 的使用經驗，產出了完整的 Skill 教學 SOP。

5 小時結構化訓練建立基礎，然後在日常工作中用，30 天後才能真正內化。急不來。

交易那邊，這兩個月的操作一言難盡。二月先買了 AMD 跟 PLTR，AMD 小賺就跑了，換進 SNDK。SNDK 兩天漲 12%，我覺得差不多了，結果換走之後它一路到 700。三月買了美光 MU，漲了一段之後賣掉，結果賣完繼續飛。換進 PLTR 想追回來，沒跑贏，回本收工。月底不死心又買了 MU 跟 BE，隔天大跌，各虧 10%。

回頭看八筆交易紀錄，過程中有太多內心搏鬥的部分，最終要怎麼做到看對並且做對且達到知行合一，就是未來的作業。

不過三月底有一個轉折，產出了一份量化退場策略筆記（ATR trailing, partial ladder, Kelly exit），至少開始用系統化的方式思考出場。Crypto 那邊也在研究 BTC 的 funding rate 和 OI 去槓桿信號，慢慢從「感覺」走向「數據」。

## 生活

這邊記錄了一些零散的雜記。

- 二月農曆新年去了恆春，算是第一次和老婆一起回老家，整趟行程不是特別順利，但到恆春後的所有行為都十分順利，算是萬幸。
- 三月初和老婆以及老婆妹妹一起去了韓國釜山，算是慶祝我和老婆滿一週年的小旅行。第一次入境韓國，第一次在海景房眺望遠方美美的海以及一堆消波塊（是的，你沒聽錯，他們連消波塊都可以用做紀念品），也有很多值得紀念的地方，想快速記錄下
	- 第一次在國外跑步（接近零度）
	- 第一次吃水牛乳酪，目前心中第一名
	- 韓牛 > 五花肉
	- 很多酷酷的扭蛋店
	- 海景房眺望出去真的很美
	- 大家都不睡覺，晚上仍然一堆人
	- 咖啡廳超級多，而且都很拼開到很晚，一定要一杯冰美式
- 三月初貓咪美容受傷，體重也隨之下降成為了這近三個月最輕的一次，不但腳受傷還不吃飯不喝水，直到最近才開始比較好 ...
![](https://raw.githubusercontent.com/panda850819/image-hosting/main/21773B54-0E48-4C91-B9A8-277D23DD41C9_1_102_o.jpeg)

![](https://raw.githubusercontent.com/panda850819/image-hosting/main/7951C158-AC36-4B29-B49E-83F59110D989_1_102_o.jpeg)

## 四月

四月想推的事：把知識庫裡的筆記變成至少兩三篇真正的文章，量化交易從筆記走到 backtest。

但寫下這些的時候，我開始想一些更底層的事。

這兩個月我花了很多精力在研究怎麼讓 agent 自己跑，怎麼讓 skill 跟 agent 更好地搭配，怎麼建一個不需要我介入的 auto pilot 系統。動機很單純，想要更解放自己的時間並且在有限的額度中最大化自己的產出，所以我一直在想辦法讓它們產出更多東西。

但這個焦慮本身可能就是問題。

因為害怕 token 消耗不完，所以我一直在找事情讓 agent 去跑，而不是想清楚什麼才值得跑。因為擔心自己跟不上，所以讓 agent 替我讀，但讀完的東西沒有經過我的腦子。

最近的體感是這樣的，系統越來越自動，我離知識反而越來越遠，所以在過程中得透過一些方式反問自己，有點像是費曼學習法，將裡頭的內容再反問一次，讓我判斷是否真的學會這門領域。

> 很忙，但好像什麼都還沒做。

## 有趣的事與物

雖然大部分有趣的輸入都會在 Telegram 頻道同步，這裡挑一些二三月印象比較深的。

可以在 https://t.me/pdzeng_talk 以及 https://daily.pdzeng.com/ 上查看。

### 文章

- [Shipping at Inference Speed](https://steipete.me/posts/2025/shipping-at-inference-speed)，推薦給每個正在用 coding agent 開發的人，不知不覺就讀完了。
- [Recoverable and Irrecoverable Decisions](https://herbertlui.net/recoverable-and-irrecoverable-decisions/)，簡單但實用的決策框架，可逆的決定不需要糾結太久。
- [Competition Is Not Validation](https://www.ablg.io/blog/competition-is-not-validation)，有競爭對手不代表市場存在。
- [Vibe Coding Apocalypse Guide](https://github.com/ShishirPatil/gorilla)，看似搞笑但很認真的 prompt-first 開發批判，documentation-first workflow 的觀點值得參考。
- [Information Stales Fast in the Vibe Coding Era](https://reorx.com/)，Reorx 的觀察：當資訊每週過期，傳統的書籤分類系統就壞了。深有同感。

### 工具

- [Pencil](https://www.pencil.dev/downloads)，Design on canvas, land in code。設計工具新形態。
- [mac-health](https://github.com/reorx/scripts/blob/master/mac-health)，跑 24/7 agent 的必備腳本，監控系統溫度跟頻寬。
- [Context7 Skills](https://context7.com/docs/skills)，Claude Skills 的平行宇宙，不同的 domain knowledge 編碼方式。
- [PayKit](https://paykit.sh/)，支付自動化工具，介面乾淨。
- [Skeleton Screen Generator](https://skeletongenerator.com/)，讀真實 DOM layout 自動生成 skeleton screen，省掉手刻的時間。

### 影片 / Podcast

- [Boris Cherny on Lightcone Podcast](https://www.youtube.com/watch?v=YdE4jBxCYJo)，Claude Code 創造者的完整訪談，從 genesis 到 subagents 到 terminal 設計哲學。這集直接影響了我的 skill 設計方向。
- [François Chollet: Why Scaling Alone Isn't Enough for AGI](https://www.youtube.com/watch?v=example)，反主流敘事：scaling 不等於 AGI，需要新的抽象跟推理架構。
- [Vibe Coding SwiftUI Apps](https://simonwillison.net/2026/Mar/27/vibe-coding-swiftui/)，Simon Willison 用 AI 寫 SwiftUI app 的實測，看工具邊界在哪。

### Crypto / 金融

- [Kaito x Polymarket: Attention Markets](https://thedefiant.io/news/defi/kaito-and-polymarket-unveil-attention-markets)，為市場注意力本身做價格發現，概念很有趣。
- [Google Quantum AI 重寫 BTC/ETH 安全時間表](https://thedefiant.io/news/research-and-opinion/google-quantum-ai-paper-rewrites-threat-timeline-for-bitcoin-ethereum-security)，量子計算對加密貨幣的威脅時間線更新。
- [ECB DAO 治理研究](https://www.ecb.europa.eu/)，DeFi DAO 沒有想像中去中心化：top 100 holders 控制 80%+ 供給。MiCA 影響值得關注。
- [Finding Alphas 量化交易手冊](https://hackmd.io/)，讀起來很舒服的量化入門，workflow 拆解清楚。

### 值得關注的人

- [Reorx](https://reorx.com/)，專注在開發者工具的研究跟分享，mac-health / Pinboard workflow / agent sessions 公開化，每次都能學到東西。
- [Simon Willison](https://simonwillison.net/)，AI 工具生態的最佳記錄者，他的 blog 是我 feed 裡品質最穩定的來源。
