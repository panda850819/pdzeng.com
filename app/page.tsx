import Link from "next/link";
import { WordReveal, FadeUp } from "@/components/stagger";
import { PandaHero } from "@/components/panda-hero";
import { Marquee } from "@/components/marquee";
import { allProjects } from "@/lib/content";
import { unifiedWriting } from "@/lib/writing";
import { writingHeadline } from "@/lib/writing-display";

export default function Home() {
  const latest = unifiedWriting().filter((post) => post.category === "blog").slice(0, 4);
  const projects = allProjects.filter((p) => p.featured).concat(allProjects.filter((p) => !p.featured)).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <section className="relative flex min-h-[calc(100dvh-6rem)] flex-col justify-center pb-8 md:min-h-[70dvh] md:pb-6">
        <PandaHero className="mb-3 h-28 w-28 md:absolute md:top-1/2 md:right-0 md:mb-0 md:h-72 md:w-72 md:-translate-y-[55%]" />
        <p className="mb-4 text-sm text-bamboo md:mb-5">Panda Zeng · Company operations × AI</p>
        <h1 className="display-tracking max-w-2xl font-display text-4xl leading-[1.06] font-semibold sm:text-5xl lg:text-6xl">
          <WordReveal text="Building the systems that move companies forward." />
        </h1>
        <FadeUp delay={0.5} className="mt-6 max-w-2xl md:mt-8">
          <p className="text-base text-muted sm:text-lg">
            I&apos;m an operator with a technical background and hands-on experience in GTM and software
            development. I use AI to turn company goals into workflows, tools, and operating systems
            that help teams execute faster and grow.
          </p>
        </FadeUp>
        <FadeUp delay={0.65} className="mt-7 flex items-center gap-5 md:mt-9">
          <a
            href="#how-i-work"
            className="whitespace-nowrap rounded-full bg-bamboo px-5 py-2.5 text-sm font-medium text-canvas transition-transform duration-150 active:scale-95"
          >
            See how I work
          </a>
          <Link
            href="/writing/"
            className="text-sm text-muted transition-colors duration-150 active:scale-95 [@media(hover:hover)]:hover:text-ink"
          >
            Read field notes →
          </Link>
        </FadeUp>
      </section>

      <div className="relative left-1/2 my-10 w-screen -translate-x-1/2 sm:my-16">
        <Marquee />
      </div>

      <section id="how-i-work" className="scroll-mt-24 pt-12" aria-labelledby="how-i-work-title">
        <FadeUp>
          <p className="text-sm text-bamboo">From goal to execution</p>
          <h2
            id="how-i-work-title"
            className="display-tracking mt-3 max-w-2xl font-display text-3xl font-semibold sm:text-4xl"
          >
            I work across the whole operating path.
          </h2>
          <p className="mt-5 max-w-2xl text-muted">
            The advantage is not AI alone. It is being able to connect a company priority to the GTM
            motion, operating model, and technical implementation needed to move it forward.
          </p>
        </FadeUp>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {[
            {
              number: "01",
              title: "Frame the goal",
              body: "Turn company priorities and market context into a clear outcome, owner, and path to execution.",
            },
            {
              number: "02",
              title: "Design the system",
              body: "Build the workflows, decision rules, and feedback loops that keep teams aligned and moving.",
            },
            {
              number: "03",
              title: "Build the leverage",
              body: "Use software, automation, and AI agents to remove repeated work and increase the team’s capacity.",
            },
          ].map((step, i) => (
            <FadeUp key={step.number} delay={0.08 * i}>
              <article className="border-t border-line pt-4">
                <p className="text-xs text-faint tabular-nums">{step.number}</p>
                <h3 className="mt-3 font-display text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.body}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mt-24" aria-labelledby="latest-writing">
        <FadeUp>
          <div className="mb-6 flex items-baseline justify-between">
            <h2 id="latest-writing" className="display-tracking font-display text-2xl font-semibold">
              Field notes
            </h2>
            <Link href="/writing/" className="text-sm text-muted [@media(hover:hover)]:hover:text-ink">
              All writing →
            </Link>
          </div>
        </FadeUp>
        <ul>
          {latest.map((post, i) => (
            <FadeUp key={post.id} delay={0.08 * i}>
              <li className="border-t border-line">
                <Link
                  href={post.url}
                  target={post.external ? "_blank" : undefined}
                  rel={post.external ? "noreferrer" : undefined}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span
                    lang={post.locale === "zh-TW" ? "zh" : "en"}
                    className="break-words text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo"
                  >
                    {writingHeadline(post)}
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
              <div>
                <h2 id="featured-projects" className="display-tracking font-display text-2xl font-semibold">
                  Things I&apos;ve built
                </h2>
                <p className="mt-2 text-sm text-muted">Technical execution is part of how I operate.</p>
              </div>
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
                  className="surface-1 hairline block rounded-lg p-6 transition-[background-color,transform] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-hover"
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
