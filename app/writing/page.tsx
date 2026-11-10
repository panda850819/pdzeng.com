import type { Metadata } from "next";
import { isMurmurTalk, unifiedWriting } from "@/lib/writing";
import { WritingList } from "@/components/writing-list";

const title = "隨口說";
const description = "Panda Zeng 在 Telegram 和 X 上的短貼，連回原文。";

export const metadata: Metadata = { title, description };

export default function WritingPage() {
  const items = unifiedWriting().filter(isMurmurTalk);

  return (
    <div className="mx-auto w-full max-w-3xl px-6" lang="zh-Hant">
      <h1 className="display-tracking font-display text-4xl font-semibold">隨口說</h1>
      <p className="mt-3 max-w-xl text-muted">Telegram 和 X 上隨手寫下的短貼，集中在這裡。</p>
      <WritingList items={items} />
    </div>
  );
}
