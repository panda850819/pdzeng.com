import type { Metadata } from "next";
import { substackArticles } from "@/lib/substack-articles";

export const metadata: Metadata = {
  title: "熊貓隨口說",
  description: "Panda Zeng 在 Substack 寫的「熊貓隨口說」，依年份整理。",
};

const dotted = (iso: string) => iso.replaceAll("-", ".");

export default function SubstackPage() {
  const years = [...new Set(substackArticles.map((post) => post.date.slice(0, 4)))];

  return (
    <div className="mx-auto w-full max-w-3xl px-6" lang="zh-Hant">
      <h1 className="display-tracking font-display text-4xl font-semibold">熊貓隨口說</h1>
      <p className="mt-3 text-sm text-muted">文章都發在 Substack，這裡依年份整理。</p>
      {years.map((year) => (
        <section key={year} className="mt-8 border-t border-line pt-4 sm:grid sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6" aria-labelledby={`y${year}`}>
          <h2 id={`y${year}`} className="font-display text-xl font-semibold tabular-nums sm:pt-3 sm:text-2xl">
            {year}
          </h2>
          <ol>
            {substackArticles
              .filter((post) => post.date.startsWith(year))
              .map((post) => (
                <li key={post.url} className="flex flex-col border-t border-line py-3 first:border-t-0 sm:flex-row sm:gap-5">
                  <time dateTime={post.date} className="shrink-0 text-sm text-muted tabular-nums sm:w-[6.5em] sm:pt-3">
                    {dotted(post.date)}
                  </time>
                  <div className="min-w-0">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center text-lg font-semibold leading-snug text-ink hover:underline hover:underline-offset-4"
                    >
                      {post.title}
                    </a>
                    <p className="text-sm text-muted">{post.subtitle}</p>
                  </div>
                </li>
              ))}
          </ol>
        </section>
      ))}
      <p className="mt-8 text-sm text-muted">
        <a
          href="https://pdzeng.substack.com/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center underline decoration-line underline-offset-4"
        >
          到 Substack 訂閱 →
        </a>
      </p>
    </div>
  );
}
