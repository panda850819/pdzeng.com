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
  { title: "AI", detail: "用 Grok Bot 依 function 處理個人事務：Mail Ops、PR Ops" },
  { title: "投資", detail: "寫給自己的筆記：長期持有、複利，也研究 DeFi 收益" },
];
