import type { Metadata } from "next";
import { published } from "@/lib/content";
import { unifiedWriting, writingSnapshotUpdatedAt } from "@/lib/writing";
import { WritingList } from "@/components/writing-list";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays, Telegram notes, and the public X archive of Panda Zeng.",
};

export default function WritingPage() {
  const items = unifiedWriting(published);

  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="display-tracking font-display text-4xl font-semibold">Writing</h1>
          <p className="mt-3 max-w-xl text-muted">
            Essays, Telegram field notes, and public posts from X — collected in one place.
          </p>
        </div>
        <a
          href="https://pdzeng.substack.com/subscribe"
          target="_blank"
          rel="noreferrer"
          className="w-fit shrink-0 rounded-full bg-bamboo px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-150 active:scale-95"
        >
          Subscribe on Substack
        </a>
      </div>
      <div className="mt-8 border-y border-line py-4 text-sm text-muted">
        New essays publish on Substack. This page is the visual index for everything I write elsewhere.
      </div>
      <WritingList items={items} updatedAt={writingSnapshotUpdatedAt} />
    </div>
  );
}
