import { defineCollection, z } from 'astro:content';

const education = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    side: z.enum(['left', 'right']),
    school: z.string(),
    degree: z.string(),
    from: z.object({ month: z.string(), year: z.string() }),
    to: z.object({ month: z.string(), year: z.string() }),
    logo: z.string(),
    panoImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    side: z.enum(['left', 'right']),
    title: z.string(),
    role: z.string().optional(),
    from: z.object({ month: z.string(), year: z.string() }),
    to: z.object({ month: z.string(), year: z.string() }),
    logo: z.string().optional(),
    panoImage: z.string().optional(),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    section: z.enum(['ml-systems', 'or-transportation', 'dissertation']),
    entries: z.array(
      z.object({
        title: z.string(),
        authors: z.array(z.string()),
        venue: z.string(),
        year: z.number(),
        url: z.string().url().optional(),
        note: z.string().optional(),
      }),
    ),
  }),
});

const skills = defineCollection({
  type: 'data',
  schema: z.object({
    categories: z.array(
      z.object({
        title: z.string(),
        tagline: z.string().optional(),
        items: z.array(
          z.object({
            name: z.string(),
            level: z.enum(['core', 'proficient', 'expert']),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { education, projects, publications, skills };
