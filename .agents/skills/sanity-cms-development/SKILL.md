---
name: sanity-cms-development
description: >-
  Use this skill when setting up Sanity Studio, writing Sanity schemas,
  GROQ queries, Next.js dynamic routes for blogs or case studies, Sanity
  image handling, or draft/published content management for the UVOKA website.
  Activate for any Sanity CMS task.
---

# Sanity CMS Development – UVOKA

## Sanity Config (sanity.config.ts)

```ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  name: 'uvoka-studio',
  title: 'UVOKA Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

## Schemas

### Post (Blog)
```ts
// src/sanity/schemas/post.ts
import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post', title: 'Blog Post', type: 'document',
  fields: [
    defineField({ name: 'title',       type: 'string',   title: 'Title',        validation: r => r.required() }),
    defineField({ name: 'slug',        type: 'slug',     title: 'Slug',         options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'author',      type: 'reference',title: 'Author',       to: [{ type: 'author' }] }),
    defineField({ name: 'featuredImage', type: 'image',  title: 'Featured Image', options: { hotspot: true } }),
    defineField({ name: 'categories',  type: 'array',    title: 'Categories',   of: [{ type: 'reference', to: { type: 'category' } }] }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'body',        type: 'array',    title: 'Body',         of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'seoTitle',    type: 'string',   title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', rows: 3 }),
    defineField({ name: 'featured',    type: 'boolean',  title: 'Featured Post', initialValue: false }),
  ],
  preview: { select: { title: 'title', media: 'featuredImage' } },
});
```

### Case Study
```ts
// src/sanity/schemas/caseStudy.ts
export const caseStudy = defineType({
  name: 'caseStudy', title: 'Case Study', type: 'document',
  fields: [
    defineField({ name: 'title',       type: 'string',   title: 'Title',         validation: r => r.required() }),
    defineField({ name: 'slug',        type: 'slug',     title: 'Slug',          options: { source: 'title' } }),
    defineField({ name: 'client',      type: 'string',   title: 'Client Name' }),
    defineField({ name: 'industry',    type: 'string',   title: 'Industry' }),
    defineField({ name: 'service',     type: 'string',   title: 'Service Category' }),
    defineField({ name: 'coverImage',  type: 'image',    title: 'Cover Image',   options: { hotspot: true } }),
    defineField({ name: 'challenge',   type: 'array',    title: 'Challenge',     of: [{ type: 'block' }] }),
    defineField({ name: 'solution',    type: 'array',    title: 'Solution',      of: [{ type: 'block' }] }),
    defineField({ name: 'results',     type: 'array',    title: 'Results',       of: [{ type: 'block' }] }),
    defineField({ name: 'metrics',     type: 'array',    title: 'Key Metrics',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'value', type: 'string' },
      ]}]
    }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At' }),
    defineField({ name: 'seoTitle',    type: 'string',   title: 'SEO Title' }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
  ],
});
```

## GROQ Queries

```ts
// src/sanity/queries.ts
import { groq } from 'next-sanity';

// Blog listing
export const postsQuery = groq`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id, title, slug, publishedAt, featured,
    "readingTime": round(length(pt::text(body)) / 1000),
    featuredImage { asset->{ url, metadata { lqip, dimensions } } },
    "categories": categories[]->{ title, slug },
    seoDescription
  }
`;

// Single blog post
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title, slug, publishedAt, body, seoTitle, seoDescription,
    "author": author->{ name },
    "categories": categories[]->{ title, slug },
    featuredImage { asset->{ url, metadata { lqip, dimensions } } }
  }
`;

// Case studies
export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && publishedAt <= now()]
  | order(publishedAt desc) {
    _id, title, slug, client, industry, service, publishedAt, seoDescription,
    coverImage { asset->{ url, metadata { lqip, dimensions } } }
  }
`;
```

## Sanity Client

```ts
// src/sanity/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});
```

## Image Handling

```ts
// src/sanity/image.ts
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);
```

```tsx
// In component – use next/image with Sanity URL
import Image from 'next/image';
import { urlFor } from '@/sanity/image';

<Image
  src={urlFor(post.featuredImage).width(800).height(400).url()}
  alt={post.title}
  width={800} height={400}
  placeholder="blur"
  blurDataURL={post.featuredImage.asset.metadata.lqip}
/>
```

## Rules

- Never hardcode content in page files. All CMS content comes from Sanity queries.
- All schemas must be fully typed with Sanity's `defineType`/`defineField`.
- Only `publishedAt <= now()` documents appear in public queries.
- SEO fields (`seoTitle`, `seoDescription`) are mandatory in all schemas.
- Use `generateStaticParams` for published slugs where possible.
- Provide ISR revalidation: `revalidate = 3600` on data-fetching pages.

## Validation

- [ ] Sanity Studio accessible at `/studio`.
- [ ] Only published posts appear on `/blogs`.
- [ ] Dynamic route `/blogs/[slug]` resolves correctly.
- [ ] Images load via Sanity CDN with blur placeholder.
- [ ] SEO metadata populated from CMS fields.
