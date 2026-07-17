"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { UnifiedWritingItem, WritingCategory, WritingPreview } from "@/lib/writing";
import { splitXCopy, telegramNote, writingHeadline } from "@/lib/writing-display";

const filters = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "telegram", label: "Telegram" },
  { key: "x", label: "X archive" },
] as const;

type Filter = "all" | WritingCategory;
type View = "list" | "grid";

const sourceLabels = {
  substack: "Substack",
  telegram: "Telegram",
  x: "X",
} as const;

const sourceNotes: Record<Filter, React.ReactNode> = {
  all: "Latest public writing across every channel.",
  blog: (
    <>
      Essays published on{" "}
      <a className="text-ink underline decoration-line underline-offset-4" href="https://pdzeng.substack.com/" target="_blank" rel="noreferrer">
        Substack
      </a>
      .
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

const hasMetrics = (item: UnifiedWritingItem) =>
  Boolean(item.metrics && item.metrics.replies + item.metrics.reposts + item.metrics.likes > 0);

const previewSiteLabel = (preview: WritingPreview) =>
  preview.siteName === "X (formerly Twitter)" ? "X" : preview.siteName;

function PreviewImage({ preview, className = "aspect-[16/9]" }: { preview?: WritingPreview; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (!preview?.imageUrl) return null;
  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center overflow-hidden bg-hover text-xs text-faint`}>
        {previewSiteLabel(preview)}
      </div>
    );
  }
  return (
    <div className={`${className} overflow-hidden bg-hover`}>
      <img
        src={preview.imageUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-[1.02]"
      />
    </div>
  );
}

function ItemMeta({ item }: { item: UnifiedWritingItem }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs text-faint sm:block">
      <time dateTime={item.publishedAt} className="tabular-nums">{formatDate(item.publishedAt)}</time>
      <span className="sm:mt-1 sm:block">{sourceLabels[item.source]}</span>
    </div>
  );
}

function Metrics({ item }: { item: UnifiedWritingItem }) {
  if (!hasMetrics(item)) return null;
  return (
    <p className="mt-3 text-xs text-faint tabular-nums">
      {item.metrics!.replies} replies · {item.metrics!.reposts} reposts · {item.metrics!.likes} likes
    </p>
  );
}

function CompactPreview({ preview, showImage = true, primary = false, excludeText = "" }: { preview: WritingPreview; showImage?: boolean; primary?: boolean; excludeText?: string }) {
  return (
    <div className={`surface-2 mt-3 grid gap-3 rounded-md p-3 ${showImage && preview.imageUrl ? "grid-cols-[minmax(0,1fr)_5.5rem]" : ""}`}>
      <div className="min-w-0">
        <p className="text-xs text-faint">{previewSiteLabel(preview)}</p>
        {preview.title && preview.title !== excludeText && (
          <p className={`mt-1 line-clamp-2 text-ink ${primary ? "text-base" : "text-sm"}`}>{preview.title}</p>
        )}
        {preview.description && preview.description !== excludeText && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{preview.description}</p>}
      </div>
      {showImage && preview.imageUrl && <PreviewImage preview={preview} className="aspect-square rounded-sm" />}
    </div>
  );
}

export function GridCard({ item }: { item: UnifiedWritingItem }) {
  if (item.source === "substack") {
    return (
      <>
        <PreviewImage preview={item.preview} />
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-3 text-xs text-faint">
            <span>Substack</span>
            <time dateTime={item.publishedAt} className="shrink-0 tabular-nums">{formatDate(item.publishedAt)}</time>
          </div>
          <h2 lang={item.locale === "zh-TW" ? "zh" : "en"} className="mt-2 line-clamp-3 break-words text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo">
            {item.title}
          </h2>
          {item.description && <p lang="zh" className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.description}</p>}
        </div>
      </>
    );
  }

  if (item.source === "telegram") {
    const note = telegramNote(item);
    const headline = writingHeadline(item);
    return (
      <div className="flex h-full flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs text-faint">
          <span>Telegram</span>
          <time dateTime={item.publishedAt} className="shrink-0 tabular-nums">{formatDate(item.publishedAt)}</time>
        </div>
        <h2 lang="zh" className="mt-3 line-clamp-4 whitespace-pre-line text-base leading-relaxed text-ink">{headline}</h2>
        {item.preview && <CompactPreview preview={item.preview} excludeText={headline} />}
      </div>
    );
  }

  const copy = splitXCopy(item);
  const isQuote = Boolean(item.preview && (item.preview.title || item.preview.description));
  return (
    <div className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3 text-xs text-faint">
        <span>X</span>
        <time dateTime={item.publishedAt} className="shrink-0 tabular-nums">{formatDate(item.publishedAt)}</time>
      </div>
      <h2 lang="zh" className="mt-3 line-clamp-4 whitespace-pre-line text-base font-medium leading-relaxed text-ink">{copy.headline}</h2>
      {copy.body && <p lang="zh" className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-muted">{copy.body}</p>}
      {isQuote && item.preview ? (
        <CompactPreview preview={item.preview} />
      ) : item.preview?.imageUrl ? (
        <PreviewImage preview={item.preview} className="mt-4 aspect-[2/1] rounded-md" />
      ) : null}
      <div className="mt-auto"><Metrics item={item} /></div>
    </div>
  );
}

function ListRow({ item }: { item: UnifiedWritingItem }) {
  const note = item.source === "telegram" ? telegramNote(item) : "";
  const xCopy = item.source === "x" ? splitXCopy(item) : null;
  const continuation = xCopy?.body || item.description;
  const showCompactPreview = Boolean(item.preview && item.source !== "substack" && (item.source === "telegram" || item.preview.title || item.preview.description));
  const showHeading = item.source !== "telegram" || Boolean(note) || !item.preview;

  return (
    <ItemLink item={item} className="group grid gap-3 py-6 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-5">
      <ItemMeta item={item} />
      <div className={`min-w-0 ${item.preview?.imageUrl ? "grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem]" : ""}`}>
        <div className="min-w-0">
          {showHeading && (
            <h2 lang={item.locale === "zh-TW" ? "zh" : "en"} className="break-words text-base font-medium leading-relaxed text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo">
              {item.source === "telegram" ? note || item.title : xCopy?.headline || item.title}
            </h2>
          )}
          {item.source !== "telegram" && continuation && (
            <p lang="zh" className="mt-1 line-clamp-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted">{continuation}</p>
          )}
          {showCompactPreview && item.preview && <CompactPreview preview={item.preview} showImage={false} primary={!note && item.source === "telegram"} />}
          <Metrics item={item} />
        </div>
        {item.preview?.imageUrl && <PreviewImage preview={item.preview} className="aspect-[4/3] w-28 rounded-md sm:w-full" />}
      </div>
    </ItemLink>
  );
}

export function WritingList({ items }: { items: UnifiedWritingItem[] }) {
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
          <p className="shrink-0 tabular-nums">
            {filtered.length} entries{filtered[0] && ` · latest ${formatDate(filtered[0].publishedAt)}`}
          </p>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-muted">No published entries in this source yet.</p>
      ) : view === "grid" ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {visible.map((item) => (
            <li key={item.id}>
              <ItemLink item={item} className="surface-1 hairline group flex h-full flex-col overflow-hidden rounded-lg transition-colors duration-150 [@media(hover:hover)]:hover:bg-hover">
                <GridCard item={item} />
              </ItemLink>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          {visible.map((item) => (
            <li key={item.id} className="border-b border-line">
              <ListRow item={item} />
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
