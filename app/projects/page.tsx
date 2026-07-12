import type { Metadata } from "next";
import { allProjects } from "@/lib/content";
import { FadeUp } from "@/components/stagger";

export const metadata: Metadata = {
  title: "Projects",
  description: "CLI tools, AI agents, and side projects by Panda Zeng.",
};

export default function ProjectsPage() {
  const projects = [...allProjects].sort((a, b) => Number(b.featured) - Number(a.featured));

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
              className="surface-1 hairline flex h-full flex-col rounded-lg p-6 transition-colors duration-150 [@media(hover:hover)]:hover:bg-white/4"
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
    </div>
  );
}
