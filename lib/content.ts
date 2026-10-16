import { writing, projects, work } from "#content";
import type { Writing, Project, Work } from "#content";

export type { Writing, Project, Work };

export const allWriting = writing;
export const allProjects = projects;

export const published = [...writing]
  .filter((w) => !w.draft)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const bySlug = (slug: string) => published.find((w) => w.slug === slug);

export const publishedWork = [...work].filter((w) => !w.draft).sort((a, b) => a.order - b.order);

export const workBySlug = (slug: string) => publishedWork.find((w) => w.slug === slug);
