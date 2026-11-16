---
name: seo-performance-optimization
description: >-
  Use this skill when implementing technical SEO, Next.js metadata API,
  structured data (JSON-LD), Open Graph tags, sitemap, robots.txt, Core Web
  Vitals optimization, image optimization, font loading, or lazy loading for
  the UVOKA website. Activate for any SEO or performance task.
---

# SEO & Performance Optimization – UVOKA

## Metadata Structure

```ts
// Root layout – site-wide defaults
export const metadata: Metadata = {
  metadataBase: new URL('https://www.uvoka.in'),
  title:        { default: 'UVOKA', template: '%s | UVOKA' },
  description:  'Premium LinkedIn branding and lead generation agency.',
  openGraph: {
    type:        'website',
    siteName:    'UVOKA',
    locale:      'en_IN',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', site: '@uvoka' },
  robots:  { index: true, follow: true },
};
```

```ts
// Individual page (static)
export const metadata: Metadata = {
  title:       'LinkedIn Personal Branding Services',
  description: '...150 chars...',
  alternates:  { canonical: 'https://www.uvoka.in/services/linkedin-personal-branding' },
};
```

```ts
// Dynamic page (blog post)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title:       post.seoTitle || post.title,
    description: post.seoDescription,
    openGraph:   { images: [urlFor(post.featuredImage).width(1200).height(630).url()] },
    alternates:  { canonical: `https://www.uvoka.in/blogs/${params.slug}` },
  };
}
```

## Structured Data (JSON-LD)

```tsx
// In page.tsx for blog posts
function BlogPostSchema({ post }: { post: Post }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context':     'https://schema.org',
        '@type':        'BlogPosting',
        headline:       post.title,
        datePublished:  post.publishedAt,
        author:         { '@type': 'Person', name: post.author?.name },
        image:          urlFor(post.featuredImage).width(1200).url(),
        publisher: {
          '@type': 'Organization',
          name:    'UVOKA',
          logo:    { '@type': 'ImageObject', url: 'https://www.uvoka.in/logo/uvoka-logo.svg' },
        },
      })}}
    />
  );
}
```

## Sitemap & Robots

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();
  return [
    { url: 'https://www.uvoka.in', lastModified: new Date() },
    ...posts.map(p => ({
      url: `https://www.uvoka.in/blogs/${p.slug.current}`,
      lastModified: new Date(p.publishedAt),
    })),
  ];
}
```

```ts
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/studio/' },
    sitemap: 'https://www.uvoka.in/sitemap.xml',
  };
}
```

## Image Optimization

- Use `next/image` exclusively. Never `<img>` tags.
- Provide `width` and `height` attributes to prevent CLS.
- Use `priority` on above-the-fold images (hero).
- Use `loading="lazy"` (default) on below-the-fold images.
- Use `placeholder="blur"` with `blurDataURL` from Sanity LQIP.
- Serve WebP/AVIF automatically via Next.js image optimizer.

## Font Optimization

```tsx
// app/layout.tsx
import { Space_Grotesk, DM_Sans, Playfair_Display } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], variable: '--font-heading', display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const dmSans = DM_Sans({
  subsets: ['latin'], variable: '--font-body', display: 'swap',
  weight: ['400', '500', '600'],
});
const playfair = Playfair_Display({
  subsets: ['latin'], variable: '--font-editorial', display: 'swap',
  style: ['normal', 'italic'],
});
```

## Core Web Vitals Checklist

| Metric | Target | Actions |
|---|---|---|
| LCP | < 2.5s | Priority image, preload hero asset |
| CLS | < 0.1 | Explicit image dimensions, font `display: swap` |
| FID/INP | < 200ms | Avoid heavy JS on main thread, defer animations |
| FCP | < 1.8s | Minimal render-blocking resources |

## Performance Rules

- Lazy-load all below-the-fold sections.
- Use `Suspense` boundaries for async data sections.
- Avoid importing entire animation libraries in Server Components.
- Use dynamic imports for heavy client components:  
  `const JourneyMap = dynamic(() => import('@/components/home/JourneyMap'), { ssr: false })`.
- Split GSAP imports: only import plugins used on the current page.
- Measure with `next build` output – monitor bundle sizes.

## Validation

- [ ] Lighthouse score: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90.
- [ ] All pages have unique `title` and `description`.
- [ ] Canonical URLs set on all pages.
- [ ] Sitemap generated at `/sitemap.xml`.
- [ ] JSON-LD structured data on blog and case study pages.
- [ ] No CLS from images (all have explicit dimensions).
