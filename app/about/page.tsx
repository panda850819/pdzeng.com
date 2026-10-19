import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "關於",
  description: "Panda Zeng（Panda Tseng）：做公司營運，2018 年進 Web3。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">關於</h1>
      <div className="article mt-8" lang="zh-Hant">
        <p>
          我是 Panda，Panda Zeng，也寫作 Panda Tseng。我做公司營運，大到營運方針，小到公司裡大大小小的文書。
        </p>
        <p>
          我是資管出身，第一份工作是全端工程師，做人力資源仲介的系統，讓公司從網頁端完成上傳資料、下載資料、追蹤媒合狀態等所有流程。碩士念到一半，我不想把時間花在論文上，就回北部學區塊鏈，一邊經營社群一邊投資。2018 年進 Web3，之後一直待在這個產業。
        </p>
        <p>
          經營社群讓我有機會和 WOO Network 合作，後來進去做 Go-To-Market，從社群和 KOL 出發。之後好朋友找我一起創業，我在發動科技當唯一的營運，薪資、客戶、人資，大大小小的事都落到我身上，也是從那時開始一路做營運。
        </p>
        <p>
          到了 TONX，初期一樣做這些事。公司拿到新的投資、進入擴張期後，我花很多時間招募，最有感的是招到第一批核心工程師和產品經理，團隊從 10 人長到 50 人（<Link href="/work/tonx-ops-from-zero/">案例</Link>）。後來家裡的貓咪龐龐身體不太好，我離開 TONX，想陪牠好好走完。
        </p>
        <p>
          接著在朋友邀請下加入 Yei Finance 擔任 Ops Manager，協助團隊打造工作流程，帶 Finance Ops 和 HR Ops 兩位成員搭配 AI，從零學到能獨立完成月結與招募（<Link href="/work/yei-ops-with-ai/">案例</Link>）。
        </p>
        <p>
          8 月底離開 Yei 之後，剛好遇上 30 歲的關口。這幾年花了很多時間在工作和 AI 上，現在想好好回過頭找回自己的狀態，從健康和運動開始。最近在做什麼，寫在 <Link href="/now/">Now</Link>；筆記和文章在 <Link href="/writing/">寫作</Link>。
        </p>
        <p>
          2020 年，我和朋友一起創立了 <a href="https://www.instagram.com/walkincat2020/" target="_blank" rel="noreferrer">WalkinCat</a>，寫 AI、生產力與 Web3，目前暫停中。
        </p>
        <p>
          完整經歷在 <Link href="/cv/">CV</Link>。想找我聊聊，可以在{" "}<a href="https://x.com/pandazeng1" target="_blank" rel="noreferrer">X</a>、<a href="https://www.linkedin.com/in/pdzeng/" target="_blank" rel="noreferrer">LinkedIn</a> 或{" "}<a href="https://t.me/pdzeng" target="_blank" rel="noreferrer">Telegram</a> 找到我。
        </p>
      </div>
    </div>
  );
}
