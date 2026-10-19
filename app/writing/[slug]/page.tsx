import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { published, bySlug, movedToSubstack, movedBySlug } from "@/lib/content";

export function generateStaticParams() {
  return [...published, ...movedToSubstack].map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const moved = movedBySlug(decodeURIComponent(slug));
  if (moved) return { title: moved.title, alternates: { canonical: moved.url } };
  const post = bySlug(decodeURIComponent(slug));
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

// A static export can't answer with a 301, so the old URL ships a page that forwards to Substack
function MovedToSubstack({ title, url }: { title: string; url: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6" lang="zh-Hant">
      <meta httpEquiv="refresh" content={`0; url=${url}`} />
      <Link href="/writing/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink">
        ← Writing
      </Link>
      <h1 className="display-tracking mt-4 font-display text-3xl leading-snug font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-6 text-muted">
        這篇文章在 Substack。如果沒有自動跳轉，
        <a className="text-ink underline decoration-line underline-offset-4" href={url}>
          到 Substack 閱讀
        </a>
        。
      </p>
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const moved = movedBySlug(decodeURIComponent(slug));
  if (moved) return <MovedToSubstack title={moved.title} url={moved.url} />;
  const post = bySlug(decodeURIComponent(slug));
  if (!post) notFound();

  const zh = post.locale === "zh-TW";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `https://pdzeng.com${post.permalink}`,
    datePublished: post.publishedAt,
    inLanguage: post.locale,
    author: { "@type": "Person", name: "Panda Zeng", url: "https://pdzeng.com" },
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-6" lang={zh ? "zh" : "en"}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
