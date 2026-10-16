import { defineConfig, defineCollection, s } from "velite";

const writing = defineCollection({
  name: "Writing",
  pattern: "writing/**/*.{md,mdx}",
  schema: s
    .object({
      title: s.string(),
      description: s.string().default(""),
      slug: s.string(),
      publishedAt: s.isodate(),
      type: s.enum(["blog", "note"]),
      locale: s.enum(["zh-TW", "en"]),
      draft: s.boolean().default(false),
      tags: s.array(s.string()).default([]),
      content: s.markdown(),
      raw: s.raw(),
    })
    .transform((data) => ({ ...data, permalink: `/writing/${data.slug}/` })),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.{md,mdx}",
  schema: s.object({
    title: s.string(),
    description: s.string(),
    url: s.string().url(),
    featured: s.boolean().default(false),
    techs: s.array(s.string()).default([]),
    locale: s.enum(["zh-TW", "en"]).default("en"),
    content: s.markdown(),
  }),
});

const work = defineCollection({
  name: "Work",
  pattern: "work/**/*.{md,mdx}",
  schema: s
    .object({
      title: s.string(),
      slug: s.string(),
      summary: s.string(),
      company: s.string(),
      role: s.string(),
      period: s.string(),
      locale: s.enum(["zh-TW", "en"]).default("zh-TW"),
      order: s.number(),
      draft: s.boolean().default(false),
      metrics: s.array(s.object({ value: s.string(), label: s.string() })).min(1).max(4),
      links: s.array(s.object({ label: s.string(), url: s.string().url() })).default([]),
      content: s.markdown(),
    })
    .transform((data) => ({ ...data, permalink: `/work/${data.slug}/` })),
});

export default defineConfig({
  root: "content",
  collections: { writing, projects, work },
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
});
