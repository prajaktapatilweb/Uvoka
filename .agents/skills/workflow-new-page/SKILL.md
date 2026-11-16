---
name: workflow-new-page
description: >-
  Use this workflow when creating a new page for the UVOKA website (e.g.,
  /services/[slug], /about, /founder, /resources, /press). Provides a
  step-by-step implementation process from route creation to production
  validation.
---

# Workflow: New Page Development

## Expected Inputs

- **Page name:** e.g., "About", "Founder", "Services – LinkedIn Personal Branding"
- **Route path:** e.g., `/about`, `/founder`, `/services/linkedin-personal-branding`
- **Content source:** Static data file (`src/data/`) or Sanity CMS
- **Key sections:** List of sections this page requires

## Implementation Steps

### Step 1 – Create the Route File
```
src/app/[route]/page.tsx
```
- Server Component by default.
- Import static data from `src/data/` or fetch from Sanity.
- Compose sections from components in `src/components/`.

### Step 2 – Add Page Metadata
```ts
export const metadata: Metadata = {
  title: 'Page Name',
  description: '...150 chars...',
  alternates: { canonical: 'https://www.uvoka.in/[route]' },
};
```

### Step 3 – Build Section Components
- Create section files in appropriate directory (`home/`, `services/`, etc.).
- Server Components for data display; Client Components for animations.
- Each section component: single responsibility, typed props.

### Step 4 – Apply Design System
- Use CSS variables for all colours.
- Follow section background pattern (white → ivory → aubergine).
- Apply typography system (headings, body, eyebrow).

### Step 5 – Add Animations
- Refer to `gsap-scroll-animations` skill for GSAP patterns.
- Refer to `framer-motion-interactions` skill for Framer patterns.
- Add reduced-motion fallbacks.

### Step 6 – SEO & Accessibility
- Semantic HTML structure.
- ARIA labels on interactive elements.
- All images with `alt` text and explicit dimensions.
- Canonical URL set.

## Validation

- [ ] `next build` succeeds with 0 TypeScript errors.
- [ ] Page renders at the correct route.
- [ ] Mobile layout correct at 375px.
- [ ] All animations have reduced-motion fallbacks.
- [ ] Metadata and canonical URL present.
- [ ] Run `frontend-code-review` skill checklist.
