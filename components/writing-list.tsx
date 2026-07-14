"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { UnifiedWritingItem, WritingCategory } from "@/lib/writing";

const filters = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "telegram", label: "Telegram" },
  { key: "x", label: "X archive" },
] as const;

type Filter = "all" | WritingCategory;
type View = "list" | "grid";

const sourceLabels = {
  site: "pdzeng.com",
  substack: "Substack",
  telegram: "Telegram",
  x: "X",
} as const;

const sourceNotes: Record<Filter, React.ReactNode> = {
  all: "Latest public writing across every channel.",
  blog: (
    <>
      Legacy essays and new issues from{" "}
      <a className="text-ink underline decoration-line underline-offset-4" href="https://pdzeng.substack.com/" target="_blank" rel="noreferrer">
        Substack
      </a>
      , deduplicated into one index.
    </>
  ),
  telegram: (
    <>
      Short notes from{" "}
      <a className="text-ink underline decoration-line underline-offset-4" href="https://t.me/pdzeng_talk" target="_blank" rel="noreferrer">
        @pdzeng_talk
      </a>
      . The archive is powered by the{" "}
      <a className="text-ink underline decoration-line underline-offset-4" href="https://github.com/panda850819/mini-blog" target="_blank" rel="noreferrer">
        mini-blog
      </a>{" "}
      source.
    </>
  ),
  x: (
    <>
      Public posts by{" "}
      <a className="text-ink underline decoration-line underline-offset-4" href="https://x.com/PandaZeng1" target="_blank" rel="noreferrer">
        @PandaZeng1
      </a>
      , preserved here with links to the originals.
    </>
  ),
};

const isFilter = (value: string): value is Filter => filters.some((filter) => filter.key === value);

const formatDate = (value: string) => value.slice(0, 10);

function ItemLink({ item, className, children }: { item: UnifiedWritingItem; className: string; children: React.ReactNode }) {
  if (item.external) {
    return (
      <a href={item.url} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return <Link href={item.url} className={className}>{children}</Link>;
}

export function WritingList({ items, updatedAt }: { items: UnifiedWritingItem[]; updatedAt: string }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("list");
  const [visibleCount, setVisibleCount] = useState(24);

  useEffect(() => {
    const savedView = localStorage.getItem("writing-view");
    if (savedView === "grid" || savedView === "list") setView(savedView);
    const hashFilter = window.location.hash.slice(1);
    if (isFilter(hashFilter)) setFilter(hashFilter);
  }, []);

  const switchFilter = (next: Filter) => {
    setFilter(next);
    setVisibleCount(24);
    window.history.replaceState(null, "", next === "all" ? window.location.pathname : `#${next}`);
  };

  const switchView = (next: View) => {
    setView(next);
    localStorage.setItem("writing-view", next);
  };

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );
  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-5 border-b border-line pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter writing">
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => switchFilter(item.key)}
                aria-pressed={filter === item.key}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors duration-150 active:scale-95 ${
                  filter === item.key
                    ? "bg-bamboo font-medium text-canvas"
                    : "surface-2 hairline text-muted [@media(hover:hover)]:hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="hidden gap-1 sm:flex" role="group" aria-label="View mode">
            <button
              onClick={() => switchView("list")}
              aria-pressed={view === "list"}
              aria-label="List view"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 active:scale-95 ${
                view === "list" ? "surface-3 text-ink" : "text-faint [@media(hover:hover)]:hover:text-ink"
              }`}
            >
              <span aria-hidden>≡</span>
            </button>
            <button
              onClick={() => switchView("grid")}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 active:scale-95 ${
                view === "grid" ? "surface-3 text-ink" : "text-faint [@media(hover:hover)]:hover:text-ink"
              }`}
            >
              <span aria-hidden>⊞</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-sm text-faint sm:flex-row sm:items-baseline sm:justify-between">
          <p>{sourceNotes[filter]}</p>
          <p className="shrink-0 tabular-nums">{filtered.length} entries · latest {formatDate(updatedAt)}</p>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">No published entries in this source yet.</p>
      ) : view === "grid" ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {visible.map((item) => (
            <li key={item.id}>
              <ItemLink item={item} className="surface-1 hairline group flex h-full flex-col rounded-lg p-5 transition-colors duration-150 [@media(hover:hover)]:hover:bg-hover">
                <span className="text-xs text-faint">{sourceLabels[item.source]}</span>
                <h2 lang={item.locale === "zh-TW" ? "zh" : "en"} className={`mt-2 flex-none text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo ${item.category === "blog" ? "" : "line-clamp-6 whitespace-pre-line"}`}>
                  {item.title}
                </h2>
                {item.description && <p lang="zh" className="mt-2 line-clamp-4 flex-1 text-sm text-muted">{item.description}</p>}
                <time dateTime={item.publishedAt} className="mt-4 text-sm text-faint tabular-nums">{formatDate(item.publishedAt)}</time>
              </ItemLink>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {visible.map((item) => (
            <li key={item.id} className="border-b border-line">
              <ItemLink item={item} className="group block py-6">
                <div className="mb-2 flex items-center justify-between gap-4 text-xs text-faint">
                  <span>{sourceLabels[item.source]}</span>
                  <time dateTime={item.publishedAt} className="shrink-0 tabular-nums">{formatDate(item.publishedAt)}</time>
                </div>
                <h2 lang={item.locale === "zh-TW" ? "zh" : "en"} className={`text-lg text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo ${item.category === "blog" ? "" : "whitespace-pre-line leading-relaxed"}`}>
                  {item.title}
                </h2>
                {item.description && <p lang="zh" className="mt-1.5 line-clamp-3 max-w-2xl text-sm text-muted">{item.description}</p>}
                {item.metrics && (item.metrics.replies + item.metrics.reposts + item.metrics.likes > 0) && (
                  <p className="mt-3 text-xs text-faint tabular-nums">
                    {item.metrics.replies} replies · {item.metrics.reposts} reposts · {item.metrics.likes} likes
                  </p>
                )}
              </ItemLink>
            </li>
          ))}
        </ul>
      )}

      {visible.length < filtered.length && (
        <button
          onClick={() => setVisibleCount((count) => count + 24)}
          className="mt-8 w-full rounded-lg border border-line py-3 text-sm text-muted transition-colors duration-150 active:scale-[0.99] [@media(hover:hover)]:hover:text-ink"
        >
          Show older entries
        </button>
      )}
    </div>
  );
}
