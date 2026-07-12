"use client";

import Link from "next/link";
import { useState } from "react";

export type WritingItem = {
  title: string;
  description: string;
  permalink: string;
  publishedAt: string;
  type: "blog" | "note";
  locale: string;
};

const filters = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "note", label: "Notes" },
] as const;

export function WritingList({ items }: { items: WritingItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const visible = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div>
      <div className="mb-8 flex gap-2" role="group" aria-label="Filter writing">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-150 active:scale-95 ${
              filter === f.key
                ? "bg-bamboo font-medium text-canvas"
                : "surface-2 hairline text-muted [@media(hover:hover)]:hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">Nothing here yet — drafts are brewing.</p>
      ) : (
        <ul>
          {visible.map((item) => (
            <li key={item.permalink} className="hairline border-x-0 border-b-0">
              <Link href={item.permalink} className="group block py-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h2
                    lang={item.locale === "zh-TW" ? "zh" : "en"}
                    className="text-lg text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo"
                  >
                    {item.title}
                  </h2>
                  <time dateTime={item.publishedAt} className="shrink-0 text-sm text-faint tabular-nums">
                    {item.publishedAt.slice(0, 10)}
                  </time>
                </div>
                {item.description && (
                  <p lang={item.locale === "zh-TW" ? "zh" : "en"} className="mt-1.5 max-w-2xl text-sm text-muted">
                    {item.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
