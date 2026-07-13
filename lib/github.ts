import repos from "../content/github-repos.json";

export type GithubRepo = (typeof repos)[number];

/** Auto-synced public repos, minus ones already curated as featured projects. */
export const openSourceRepos = (excludeUrls: string[]) => {
  const excluded = new Set(excludeUrls.map((u) => u.replace(/\/$/, "").toLowerCase()));
  return repos.filter((r) => !excluded.has(r.url.toLowerCase()));
};
