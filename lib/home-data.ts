export type Job = {
  company: string;
  href?: string;
  role: string;
  period: string;
};

export type OffWork = {
  title: string;
  detail: string;
};

// Panda's own line, chosen in the 2026-10 content interview.
export const quote = "營運的本質就是讓公司活下來。";

export const message = [
  "我做公司營運。大到營運方針，小到公司裡大大小小的文書。",
  "資管出身，碩士念到一半，不想把時間花在論文上，就回北部學區塊鏈，一邊經營社群一邊投資。社群讓我進了 WOO Network 做 Go-To-Market；後來在發動科技當唯一的營運，薪資、客戶、人資都落到我身上，從那時起就一直做營運。在 TONX 遇上公司擴張，花了很多時間招人；在 Yei Finance，和團隊一起搭配 AI，把公司的流程從零磨出來。",
  "30 歲這年，我想把一些時間從工作裡拿回來，先找回健康和運動。",
];

export const jobs: Job[] = [
  { company: "Yei Finance", href: "http://yei.finance/", role: "Ops Manager", period: "2026" },
  { company: "TONX", href: "https://tonx.ai/", role: "People & Ops Lead", period: "2025" },
  { company: "TONX", href: "https://tonx.ai/", role: "Operations", period: "2023–2025" },
  { company: "發動科技 FDC", role: "COO", period: "2022–2023" },
  { company: "WOO Network", href: "https://woo.org/", role: "Marketing Associate", period: "2021–2022" },
  { company: "WalkinCat", href: "http://instagram.com/walkincat2020", role: "Co-Founder", period: "2020–" },
  { company: "YuStar", role: "Full-Stack Engineer", period: "2018–2020" },
];

export const offWork: OffWork[] = [
  { title: "跑步", detail: "一週一次長距離、一次 tempo 或間歇，再加 1–2 天 zone 2" },
  { title: "重訓", detail: "一週兩練，2026 年 9 月開始規律訓練" },
  { title: "AI", detail: "用 Grok Bot 依 function 處理個人事務：mail ops、PR ops" },
  { title: "投資", detail: "寫給自己的筆記：長期持有、複利，也研究 DeFi 收益" },
];
