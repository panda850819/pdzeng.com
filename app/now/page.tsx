import type { Metadata } from "next";
import Link from "next/link";
import { nowUpdated, now, notDoing, previously } from "@/lib/now-data";
import { publishedWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Now",
  description: "What Panda Zeng is focused on right now, and what is deliberately off the list this quarter.",
};

// A previous role links to its case study once one is published; otherwise the CV covers it.
const hrefFor = (company: string) =>
  publishedWork.find((w) => w.company === company)?.permalink ?? "/cv/";

export default function NowPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6" lang="zh">
      <header>
        <h1 className="display-tracking font-display text-4xl font-semibold" lang="en">
          Now
        </h1>
        <p className="mt-3 text-sm text-faint tabular-nums">更新於 {nowUpdated}</p>
      </header>

      <section className="mt-12" aria-labelledby="now-current">
        <h2 id="now-current" className="display-tracking mb-6 font-display text-2xl font-semibold">
          現在
        </h2>
        <ul className="space-y-5">
          {now.map((n) => (
            <li key={n.title}>
              <h3 className="font-display text-lg font-medium">{n.title}</h3>
              <p className="mt-1 text-muted">{n.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="now-not-doing">
        <h2 id="now-not-doing" className="display-tracking mb-6 font-display text-2xl font-semibold">
          這季刻意不做
        </h2>
        <ul className="space-y-3">
          {notDoing.map((item) => (
            <li key={item} className="text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="now-previously">
        <h2 id="now-previously" className="display-tracking mb-6 font-display text-2xl font-semibold">
          之前
        </h2>
        <ul>
          {previously.map((p) => (
            <li key={`${p.company}-${p.role}`} className="border-t border-line">
              <Link href={hrefFor(p.company)} className="group block py-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <span className="font-display text-base font-medium text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo">
                    {p.role} <span className="text-muted">· {p.company}</span>
                  </span>
                  <span className="shrink-0 text-sm text-faint tabular-nums">{p.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{p.detail}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-14 text-sm text-muted">
        想聊聊的話，可以在{" "}
        <a href="https://x.com/pandazeng1" target="_blank" rel="noreferrer" className="text-bamboo underline decoration-bamboo/40 underline-offset-3 [@media(hover:hover)]:hover:decoration-bamboo">
          X
        </a> 或{" "}
        <a href="https://t.me/pdzeng_talk" target="_blank" rel="noreferrer" className="text-bamboo underline decoration-bamboo/40 underline-offset-3 [@media(hover:hover)]:hover:decoration-bamboo">
          Telegram
        </a> 找到我。
      </p>
    </div>
  );
}
