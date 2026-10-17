import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedWork, workBySlug } from "@/lib/content";

export function generateStaticParams() {
  return publishedWork.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = workBySlug(decodeURIComponent(slug));
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: { title: item.title, description: item.summary, type: "article" },
  };
}

const gridCols = ["", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4"];

export default async function WorkCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = workBySlug(decodeURIComponent(slug));
  if (!item) notFound();

  const zh = item.locale === "zh-TW";

  return (
    <article className="mx-auto w-full max-w-3xl px-6" lang={zh ? "zh" : "en"}>
      <header className="mb-10">
        <Link href="/work/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink" lang="en">
          ← Work
        </Link>
        <h1 className="display-tracking mt-4 font-display text-3xl leading-snug font-semibold sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-4 text-muted">{item.summary}</p>
      </header>

      {item.metrics.length > 0 && (
        <dl className={`mb-12 grid grid-cols-2 gap-3 ${gridCols[item.metrics.length]}`}>
          {item.metrics.map((m) => (
            <div key={m.label} className="surface-1 hairline rounded-lg p-4">
              <dt className="text-xs text-faint">{m.label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold text-ink tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="article" dangerouslySetInnerHTML={{ __html: item.content }} />

      <footer className="mt-14 border-t border-line pt-6">
        <dl className="grid gap-4 text-sm sm:grid-cols-3" lang="en">
          <div>
            <dt className="text-xs text-faint">Role</dt>
            <dd className="mt-1 text-ink">{item.role}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Period</dt>
            <dd className="mt-1 text-ink tabular-nums">{item.period}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Company</dt>
            <dd className="mt-1 text-ink">{item.company}</dd>
          </div>
        </dl>
        {item.links.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {item.links.map((l) => (
              <li key={l.url}>
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="surface-2 hairline inline-block rounded-full px-3 py-1 text-xs text-muted transition-colors duration-150 [@media(hover:hover)]:hover:text-ink"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </footer>
    </article>
  );
}
