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

export const message = [
  "我寫過全端，也做過行銷，後來一路做營運，再走到 People & Ops。2018 年進 Web3，之後一直待在這個產業裡。",
  "8 月底我離開了 Yei Finance，現在是轉換期：跑步、重訓、學 AI，也把投資筆記寫下來。",
];

export const jobs: Job[] = [
  { company: "Yei Finance", href: "http://yei.finance/", role: "Ops Manager", period: "2026" },
  { company: "TONX", href: "https://tonx.ai/", role: "People & Ops Lead", period: "2025" },
  { company: "TONX", href: "https://tonx.ai/", role: "Operations", period: "2023–2025" },
  { company: "WalkinCat", href: "http://instagram.com/walkincat2020", role: "Co-Founder", period: "2020–" },
  { company: "WOO Network", href: "https://woo.org/", role: "Marketing Associate", period: "2021–2022" },
  { company: "YuStar", role: "Full-Stack Engineer", period: "2018–2020" },
];

export const offWork: OffWork[] = [
  { title: "跑步", detail: "開始跑步，練的是自律" },
  { title: "重訓", detail: "搭配重訓與健身營養學" },
  { title: "AI", detail: "研究 AI 怎麼改變工作方式" },
  { title: "投資", detail: "把槓桿、借貸這類知識寫成筆記" },
];
