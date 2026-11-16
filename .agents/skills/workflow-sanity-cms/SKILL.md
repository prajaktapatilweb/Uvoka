---
name: workflow-sanity-cms
description: >-
  Use this workflow when creating a new Sanity schema, GROQ query, or dynamic
  Next.js route for CMS-managed content in the UVOKA website. Covers schema
  creation, query writing, page integration and validation.
---

# Workflow: Sanity Schema & CMS Development

## Expected Inputs

- **Content type:** Blog post / Case study / New document type
- **Fields required:** Title, slug, body, images, SEO, metadata
- **Route:** `/blogs/[slug]` / `/case-studies/[slug]`

## Implementation Steps

### Step 1 – Define Schema
```
src/sanity/schemas/[contentType].ts
```
Reference `sanity-cms-development` skill for field patterns.
Always include: `title`, `slug`, `publishedAt`, `seoTitle`, `seoDescription`.

### Step 2 – Register Schema
```ts
// src/sanity/schemas/index.ts
export const schemaTypes = [post, caseStudy, author, category];
```

### Step 3 – Write GROQ Query
```
src/sanity/queries.ts
```
Filter: `publishedAt <= now()` for all public queries.
Type the return shape with a TypeScript interface.

### Step 4 – Create Dynamic Route
```
src/app/[content-type]/[slug]/page.tsx
```
- `generateStaticParams` for published slugs.
- `generateMetadata` from CMS SEO fields.
- `notFound()` for unpublished/missing slugs.
- `revalidate = 3600` for ISR.

### Step 5 – Build Page Component
- Fetch data in Server Component.
- Use Sanity image pipeline.
- Apply UVOKA design system.

### Step 6 – Test in Sanity Studio
- Create a draft post.
- Publish it.
- Verify it appears at the correct route.
- Verify SEO metadata correct in browser.

## Validation

- [ ] Draft content NOT visible at public route.
- [ ] Published content visible and styled correctly.
- [ ] Dynamic metadata from CMS (title, description, og:image).
- [ ] Image renders with blur placeholder.
- [ ] `next build` passes with 0 errors.
