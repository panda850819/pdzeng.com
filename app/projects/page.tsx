import type { Metadata } from "next";
import { allProjects } from "@/lib/content";
import { openSourceRepos } from "@/lib/github";
import { FadeUp } from "@/components/stagger";

export const metadata: Metadata = {
  title: "Projects",
  description: "CLI tools, AI agents, and side projects by Panda Zeng.",
};

export default function ProjectsPage() {
  const projects = [...allProjects].sort((a, b) => Number(b.featured) - Number(a.featured));
  const repos = openSourceRepos(projects.map((p) => p.url));

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <h1 className="display-tracking font-display text-4xl font-semibold">Projects</h1>
      <p className="mt-3 mb-10 max-w-xl text-muted">
        Mostly CLI tools and agent infrastructure — built to remove my own repetitive work first.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <FadeUp key={project.title} delay={0.05 * Math.min(i, 6)}>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="surface-1 hairline flex h-full flex-col rounded-lg p-6 transition-[background-color,transform] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:bg-hover"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-lg font-medium">{project.title}</h2>
                {project.featured && (
                  <span className="shrink-0 rounded-full bg-bamboo/15 px-2.5 py-0.5 text-xs text-bamboo">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
              {project.techs.length > 0 && (
                <p className="mt-4 text-xs text-faint">{project.techs.join(" · ")}</p>
              )}
            </a>
          </FadeUp>
        ))}
      </div>

      {repos.length > 0 && (
        <section className="mt-20" aria-labelledby="oss-activity">
          <FadeUp>
            <h2 id="oss-activity" className="display-tracking font-display text-2xl font-semibold">
              Open source activity
            </h2>
            <p className="mt-2 mb-6 text-sm text-faint">
              Synced daily from GitHub — public repos by latest push.
            </p>
          </FadeUp>
          <ul>
            {repos.map((repo) => (
              <li key={repo.url} className="border-t border-line">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div className="min-w-0">
                    <span className="text-base text-ink transition-colors duration-150 [@media(hover:hover)]:group-hover:text-bamboo">
                      {repo.name}
                    </span>
                    {repo.description && (
                      <p className="mt-0.5 max-w-2xl text-sm text-muted">{repo.description}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-baseline gap-4 text-sm text-faint tabular-nums">
                    {repo.language && <span>{repo.language}</span>}
                    {repo.stars > 0 && <span>★ {repo.stars}</span>}
                    <time dateTime={repo.pushedAt}>{repo.pushedAt}</time>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
