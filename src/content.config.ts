import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// These fields mirror public/admin/config.yml exactly.
// If you add a field in one, add it in the other or the build will fail.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    standfirst: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    link: z.string().url().optional(),
    linkLabel: z.string().optional(),
    draft: z.boolean().default(false),
    // Opt in per post. Only true puts the post in /linkedin.xml,
    // which is the only feed Make watches.
    linkedin: z.boolean().default(false),
  }),
});

// Press releases. Mirrors the "press" collection in public/admin/config.yml.
// The date is kept for ordering, the feed and NewsArticle schema only.
// It is never shown on the page.
const press = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/press' }),
  schema: z.object({
    headline: z.string(),
    subject: z.string(),
    kind: z.enum(['App', 'Website', 'Shop', 'Hardware']),
    standfirst: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    icon: z.string().optional(),
    website: z.string().url().optional(),
    appStore: z.string().url().optional(),
    contact: z.string().email().optional(),
    facts: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    notes: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, press };
