import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { published, bySlug } from "@/lib/content";

export function generateStaticParams() {
  return published.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = bySlug(decodeURIComponent(slug));
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = bySlug(decodeURIComponent(slug));
  if (!post) notFound();

  const zh = post.locale === "zh-TW";

  return (
    <article className="mx-auto w-full max-w-3xl px-6" lang={zh ? "zh" : "en"}>
      <header className="mb-10">
        <Link href="/writing/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink">
          ← Writing
        </Link>
        <h1 className="display-tracking mt-4 font-display text-3xl leading-snug font-semibold sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-faint">
          <time dateTime={post.publishedAt} className="tabular-nums">
            {post.publishedAt.slice(0, 10)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.type}</span>
          {post.tags.map((t) => (
            <span key={t} className="surface-2 hairline rounded-full px-2.5 py-0.5 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </header>
      <div className="article" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
