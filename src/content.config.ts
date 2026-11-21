import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './i18n';

// posts live in src/content/blog/<lang>/<slug>/index.md, images next to them
const blog = defineCollection({
  loader: glob({ pattern: '*/*/index.md', base: './src/content/blog', generateId: ({ entry }) => entry.replace(/\/index\.md$/, '') }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      // the same key links a post to its translation
      translationKey: z.string(),
      category: z.enum(categoryIds),
      tags: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string(),
      // the matching LinkedIn article, if there is one
      linkedin: z.string().url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
