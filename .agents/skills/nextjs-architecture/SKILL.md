---
name: nextjs-architecture
description: >-
  Use this skill when creating or modifying Next.js App Router pages, layouts,
  route groups, middleware, metadata, server actions, or the overall project
  folder structure for the UVOKA website. Activate when the user asks about
  routing, page creation, Next.js config, metadata/SEO, or project architecture.
---

# Next.js Architecture – UVOKA

## Project Structure

Follow the structure defined in the spec exactly:

```
src/
├── app/                    # All routes live here
│   ├── layout.tsx          # Root layout (fonts, providers, Navbar, Footer)
│   ├── page.tsx            # Homepage (assembles home/* section components)
│   ├── globals.css         # Global CSS variables and resets
│   ├── about/page.tsx
│   ├── founder/page.tsx
│   ├── services/
│   │   ├── page.tsx        # Services index
│   │   └── [service-slug]/page.tsx
│   ├── blogs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── case-studies/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── resources/page.tsx
│   ├── press/page.tsx
│   ├── contact/page.tsx
│   ├── privacy-policy/page.tsx
│   ├── terms/page.tsx
│   └── studio/[[...tool]]/page.tsx  # Sanity Studio (protected)
├── components/
│   ├── layout/   Navbar, Footer, PageTransition
│   ├── home/     One file per homepage section
│   ├── services/ ServiceCard, ServiceHero, ServiceFeatures, ServiceCTA
│   ├── blogs/    BlogCard, BlogGrid, BlogContent
│   ├── case-studies/ CaseStudyCard, CaseStudyContent
│   ├── animations/ TextReveal, ParallaxImage, ScrollReveal, AnimatedCounter, MagneticButton
│   └── common/   SectionHeading, Button, Container, AnimatedCard
├── sanity/       client.ts, image.ts, queries.ts, schemas/
├── data/         services.ts, journey.ts, testimonials.ts, team.ts, faqs.ts
├── hooks/        useScrollProgress.ts, useReducedMotion.ts
├── styles/       variables.css, typography.css, animations.css, utilities.css
└── lib/          utils.ts, constants.ts
```

## Server vs Client Components

```
Decision tree:
  Uses useState / useEffect / useRef / useCallback? → 'use client'
  Uses browser APIs (window, document, IntersectionObserver)? → 'use client'
  Uses GSAP / Framer Motion / Lenis? → 'use client'
  Fetches data from Sanity / static data? → Server Component (default)
  Just renders markup/JSX? → Server Component (default)
```

- Never add `'use client'` to layout files unless absolutely necessary.
- Wrap client islands inside server shell components to keep data fetching server-side.
- Pass serialisable props from server to client components only.

## Layouts

Root layout (`app/layout.tsx`):
- Loads fonts via `next/font/google`.
- Applies CSS variables globally via `globals.css`.
- Renders `<Navbar />` and `<Footer />` (server components).
- Wraps children in a smooth-scroll / page-transition provider if Lenis is used.

Nested layouts: use sparingly, only for major route groups (e.g., `/services`).

## Metadata

```ts
// Static pages
export const metadata: Metadata = {
  title: 'Page Title | UVOKA',
  description: '...',
  openGraph: { title: '...', description: '...', images: ['/og/page.jpg'] },
};

// Dynamic pages (blogs, case studies)
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
  return { title: `${post.seoTitle} | UVOKA`, description: post.seoDescription };
}
```

## Route Conventions

| Route | File |
|---|---|
| Homepage | `app/page.tsx` |
| Services index | `app/services/page.tsx` |
| Service detail | `app/services/[service-slug]/page.tsx` |
| Blog listing | `app/blogs/page.tsx` |
| Blog post | `app/blogs/[slug]/page.tsx` |
| Case study listing | `app/case-studies/page.tsx` |
| Case study detail | `app/case-studies/[slug]/page.tsx` |
| Sanity Studio | `app/studio/[[...tool]]/page.tsx` |

## next.config.ts

```ts
import type { NextConfig } from 'next';
const config: NextConfig = {
  images: { remotePatterns: [{ hostname: 'cdn.sanity.io' }] },
  experimental: { typedRoutes: true },
};
export default config;
```

## Validation

- `next build` must complete with 0 errors and 0 TypeScript warnings.
- All routes must be accessible at their defined paths.
- Dynamic routes must have `generateStaticParams` for published content where applicable.
