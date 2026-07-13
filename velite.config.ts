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

export default defineConfig({
  root: "content",
  collections: { writing, projects },
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
});
