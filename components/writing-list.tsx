"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

type View = "list" | "grid";

export function WritingList({ items }: { items: WritingItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [view, setView] = useState<View>("list");

  useEffect(() => {
    const saved = localStorage.getItem("writing-view");
    if (saved === "grid" || saved === "list") setView(saved);
  }, []);

  const switchView = (v: View) => {
    setView(v);
    localStorage.setItem("writing-view", v);
  };

  const visible = filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="flex gap-2" role="group" aria-label="Filter writing">
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
        <div className="flex gap-1" role="group" aria-label="View mode">
          <button
            onClick={() => switchView("list")}
            aria-pressed={view === "list"}
            aria-label="List view"
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 active:scale-95 ${
              view === "list" ? "surface-3 text-ink" : "text-faint [@media(hover:hover)]:hover:text-ink"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => switchView("grid")}
            aria-pressed={view === "grid"}
            aria-label="Grid view"
            className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 active:scale-95 ${
              view === "grid" ? "surface-3 text-ink" : "text-faint [@media(hover:hover)]:hover:text-ink"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <rect x="4" y="4" width="7" height="7" rx="1" />
              <rect x="13" y="4" width="7" height="7" rx="1" />
              <rect x="4" y="13" width="7" height="7" rx="1" />
              <rect x="13" y="13" width="7" height="7" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">Nothing here yet — drafts are brewing.</p>
      ) : view === "grid" ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {visible.map((item) => (
            <li key={item.permalink}>
              <Link
                href={item.permalink}
                className="surface-1 hairline group flex h-full flex-col rounded-lg p-5 transition-colors duration-150 [@media(hover:hover)]:hover:bg-hover"
              >
                <span className="text-xs text-faint uppercase">{item.type}</span>
                <h2
                  lang={item.locale === "zh-TW" ? "zh" : "en"}
                  className="mt-2 flex-none text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo"
                >
                  {item.title}
                </h2>
                {item.description && (
                  <p lang={item.locale === "zh-TW" ? "zh" : "en"} className="mt-2 flex-1 text-sm text-muted">
                    {item.description}
                  </p>
                )}
                <time dateTime={item.publishedAt} className="mt-4 text-sm text-faint tabular-nums">
                  {item.publishedAt.slice(0, 10)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {visible.map((item) => (
            <li key={item.permalink} className="border-t border-line">
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
