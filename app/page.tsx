import Link from "next/link";
import { WordReveal, FadeUp } from "@/components/stagger";
import { published, allProjects } from "@/lib/content";

export default function Home() {
  const latest = published.slice(0, 4);
  const projects = allProjects.filter((p) => p.featured).concat(allProjects.filter((p) => !p.featured)).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <section className="flex min-h-[70dvh] flex-col justify-center">
        <p className="mb-5 text-sm text-bamboo">Panda Zeng · on-chain since 2018</p>
        <h1 className="display-tracking max-w-3xl font-display text-5xl leading-[1.05] font-semibold sm:text-7xl">
          <WordReveal text="Operations, automation, and everything between DeFi and AI." />
        </h1>
        <FadeUp delay={0.5} className="mt-8 max-w-xl">
          <p className="text-lg text-muted">
            I run operations in crypto and build the systems that run themselves — agents, pipelines, and
            the occasional trading experiment. Notes from the field live here.
          </p>
        </FadeUp>
        <FadeUp delay={0.65} className="mt-10 flex gap-4">
          <Link
            href="/writing/"
            className="rounded-full bg-bamboo px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-150 active:scale-95"
          >
            Read the writing
          </Link>
          <Link
            href="/about/"
            className="glass rounded-full px-5 py-2.5 text-sm text-ink transition-transform duration-150 active:scale-95"
          >
            About me
          </Link>
        </FadeUp>
      </section>

      <section className="mt-24" aria-labelledby="latest-writing">
        <FadeUp>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 id="latest-writing" className="display-tracking font-display text-2xl font-semibold">
              Latest writing
            </h2>
            <Link href="/writing/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink">
              All posts →
            </Link>
          </div>
        </FadeUp>
        <ul>
          {latest.map((post, i) => (
            <FadeUp key={post.slug} delay={0.08 * i}>
              <li className="hairline border-x-0 border-b-0">
                <Link
                  href={post.permalink}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span
                    lang={post.locale === "zh-TW" ? "zh" : "en"}
                    className="text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo"
                  >
                    {post.title}
                  </span>
                  <time dateTime={post.publishedAt} className="shrink-0 text-sm text-faint tabular-nums">
                    {post.publishedAt.slice(0, 10)}
                  </time>
                </Link>
              </li>
            </FadeUp>
          ))}
        </ul>
      </section>

      {projects.length > 0 && (
        <section className="mt-24" aria-labelledby="featured-projects">
          <FadeUp>
            <div className="mb-6 flex items-baseline justify-between">
              <h2 id="featured-projects" className="display-tracking font-display text-2xl font-semibold">
                Projects
              </h2>
              <Link href="/projects/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink">
                All projects →
              </Link>
            </div>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project, i) => (
              <FadeUp key={project.title} delay={0.08 * i}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="surface-1 hairline block rounded-lg p-6 transition-colors duration-150 [@media(hover:hover)]:hover:bg-white/4"
                >
                  <h3 className="font-display text-lg font-medium">{project.title}</h3>
                  <p lang="zh" className="mt-2 text-sm text-muted">
                    {project.description}
                  </p>
                  {project.techs.length > 0 && (
                    <p className="mt-4 text-xs text-faint">{project.techs.join(" · ")}</p>
                  )}
                </a>
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
