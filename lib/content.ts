import { writing, projects, work } from "#content";
import type { Writing, Project, Work } from "#content";

export type { Writing, Project, Work };

export const allWriting = writing;
export const allProjects = projects;

// Local copies of essays that live on Substack; their old URLs forward to the original
const substackOriginals = new Map([
  ["harness-2026-04", "https://pdzeng.substack.com/p/ai-harness"],
  ["busy-but-nothing-done-2026-feb-mar", "https://pdzeng.substack.com/p/fd5"],
  ["2026-01-monthly", "https://pdzeng.substack.com/p/01"],
  ["2025-year-in-review", "https://pdzeng.substack.com/p/2025"],
]);

export const published = [...writing]
  .filter((w) => !w.draft && !substackOriginals.has(w.slug))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const bySlug = (slug: string) => published.find((w) => w.slug === slug);

export const movedToSubstack = writing.flatMap((w) => {
  const url = substackOriginals.get(w.slug);
  return url ? [{ slug: w.slug, title: w.title, url }] : [];
});

export const movedBySlug = (slug: string) => movedToSubstack.find((w) => w.slug === slug);

export const publishedWork = [...work].filter((w) => !w.draft).sort((a, b) => a.order - b.order);

export const workBySlug = (slug: string) => publishedWork.find((w) => w.slug === slug);
