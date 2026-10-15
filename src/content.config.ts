import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const posts = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    path: z.string(),
    date: z.string(),
    modified: z.string(),
    html: z.string(),
    historicalReview: z.boolean().optional(),
    image: z.string().optional(),
    categories: z.array(z.number()),
    source: z.string(),
  }),
});
const cases = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/cases" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.string(),
    category: z.string(),
    website: z.url(),
    image: z.string(),
    mission: z.string(),
    details: z.array(z.string()),
  }),
});
export const collections = { posts, cases };
