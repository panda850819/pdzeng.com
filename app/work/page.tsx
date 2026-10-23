import type { Metadata } from "next";
import Link from "next/link";
import { publishedWork } from "@/lib/content";
import { FadeUp } from "@/components/stagger";

export const metadata: Metadata = {
  title: "Work",
  description: "Operations case studies by Panda Zeng.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6" lang="en">
      <h1 className="display-tracking font-display text-4xl font-semibold">Work</h1>
      <p className="mt-3 mb-10 max-w-xl text-muted">
        Operations case studies — what was built, and how.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {publishedWork.map((item, i) => {
          // Metric values are display strings ("10 → 50"), so the headline metric is the first one listed.
          const headline = item.metrics[0];
          return (
            <FadeUp key={item.slug} delay={0.05 * Math.min(i, 6)}>
              <Link
                href={item.permalink}
                lang={item.locale === "zh-TW" ? "zh" : "en"}
                className="surface-1 hairline flex h-full flex-col rounded-lg p-6 transition-[background-color,transform] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-hover"
              >
                {headline && (
                  <span className="mb-4 self-start rounded-full bg-bamboo/15 px-2.5 py-0.5 text-xs text-bamboo tabular-nums">
                    {headline.value} · {headline.label}
                  </span>
                )}
                <h2 className="font-display text-lg leading-snug font-medium">{item.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted">{item.summary}</p>
                <p className="mt-4 text-xs text-faint">
                  {item.role} · {item.company} · <span className="whitespace-nowrap tabular-nums">{item.period}</span>
                </p>
              </Link>
            </FadeUp>
          );
        })}
      </div>
    </div>
  );
}
