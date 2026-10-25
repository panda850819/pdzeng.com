// 熊貓隨口說 on Substack, copied word for word from the design's ARTICLES.md (dates in Taipei time)
export type SubstackArticle = {
  title: string;
  subtitle: string;
  date: string;
  url: string;
};

export const substackArticles: SubstackArticle[] = [
  {
    title: "一樣的午後",
    subtitle: "離職兩個月，那個「到時候」好像來了",
    date: "2026-10-20",
    url: "https://pdzeng.substack.com/p/ba5",
  },
  {
    title: "29.999",
    subtitle: "你有想過 30 歲的你是什麼模樣嗎？是什麼狀態？",
    date: "2026-08-18",
    url: "https://pdzeng.substack.com/p/29999",
  },
  {
    title: "龐龐 - 我們永遠的可愛寶貝",
    subtitle: "原來四年這麼快，還以為是五年甚至更久。經歷了你的 1/3，我們都很開心。謝謝祢最後選擇我們。",
    date: "2026-05-23",
    url: "https://pdzeng.substack.com/p/0af",
  },
  {
    title: "我的 AI 架構真的 Harness 嗎？",
    subtitle: "從 pandastack v1.0、Obsidian vault 清理到 gbrain 遷移 Postgres，記錄我如何重建個人 AI agent harness 與知識庫。",
    date: "2026-05-03",
    url: "https://pdzeng.substack.com/p/ai-harness",
  },
  {
    title: "很忙，但好像什麼都還沒做",
    subtitle: "做了開源語音工具 Murmur Voice、創建了 pstack、跑通宵研究循環、去了釜山,但回頭看好像什麼都還沒完成。",
    date: "2026-04-06",
    url: "https://pdzeng.substack.com/p/fd5",
  },
  {
    title: "月報 #01 - 閒不下來的一月",
    subtitle: "科技始終源自於人性。所以在 AI 時代，越懶的人越能發揮出 AI 真正的價值。",
    date: "2026-02-01",
    url: "https://pdzeng.substack.com/p/01",
  },
  {
    title: "2025 年報 - 決策之年",
    subtitle: "今年是我體感最快的一年，關於結婚、離職、健康，每一個決定都在塑造未來的自己。",
    date: "2026-01-01",
    url: "https://pdzeng.substack.com/p/2025",
  },
  {
    title: "錯！你認識的敏捷開發根本不敏捷！",
    subtitle: "什麼是敏捷開發？如果你是一個剛接觸敏捷開發的新手，你一定會有很多疑問。",
    date: "2023-06-24",
    url: "https://pdzeng.substack.com/p/6cd",
  },
  {
    title: "忙碌不代表有生產力",
    subtitle: "如何透過子彈筆記及四象限管理法找回自己的時間",
    date: "2023-02-21",
    url: "https://pdzeng.substack.com/p/478",
  },
];
