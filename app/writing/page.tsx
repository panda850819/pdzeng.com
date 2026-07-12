import type { Metadata } from "next";
import { published } from "@/lib/content";
import { WritingList } from "@/components/writing-list";

export const metadata: Metadata = {
  title: "Writing",
  description: "Blog posts and notes on DeFi operations, AI tooling, and systems.",
};

export default function WritingPage() {
  const items = published.map((w) => ({
    title: w.title,
    description: w.description,
    permalink: w.permalink,
    publishedAt: w.publishedAt,
    type: w.type,
    locale: w.locale,
  }));

  return (
    <div className="mx-auto w-full max-w-3xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">Writing</h1>
      <p className="mt-3 mb-10 text-muted">
        Long-form posts and short notes — mostly in Traditional Chinese.
      </p>
      <WritingList items={items} />
    </div>
  );
}
