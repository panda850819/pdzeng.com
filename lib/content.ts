import { writing, projects } from "#content";
import type { Writing, Project } from "#content";

export type { Writing, Project };

export const allWriting = writing;
export const allProjects = projects;

export const published = [...writing]
  .filter((w) => !w.draft)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const bySlug = (slug: string) => published.find((w) => w.slug === slug);
