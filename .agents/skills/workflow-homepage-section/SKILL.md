---
name: workflow-homepage-section
description: >-
  Use this workflow when building a new homepage section for the UVOKA website.
  Covers data sourcing, component structure, design application, animation
  integration and mobile layout.
---

# Workflow: Homepage Section Development

## Expected Inputs

- **Section name:** e.g., "Hero", "Services", "Journey Map", "Testimonials"
- **Section number:** per spec (01–17)
- **Background:** White / Warm Ivory / Deep Aubergine
- **Content source:** Static data or Sanity CMS
- **Animation type:** Scroll-reveal / parallax / GSAP / Framer

## Implementation Steps

### Step 1 – Create Section File
```
src/components/home/SectionName.tsx
```

### Step 2 – Source Content
- Static content → `src/data/[relevant].ts`
- Dynamic content → Sanity query in parent `app/page.tsx`, passed as props

### Step 3 – Apply Section Design
Reference `luxury-ui-ux-design` skill for:
- Background colour (alternating pattern)
- Section padding (`var(--space-2xl)`)
- Typography scale
- Card design system

### Step 4 – Build Layout
- Semantic HTML (`<section aria-labelledby="...">`)
- Responsive grid (mobile-first)
- Design token compliance

### Step 5 – Add Animation
Reference `gsap-scroll-animations` or `framer-motion-interactions` skill.
Add reduced-motion fallback.

### Step 6 – Register in Homepage
Import and add to `src/app/page.tsx` in correct order.

## Section Order Reference (per spec)
01 Hero → 02 Featured In → 03 Counters → 04 Client Recognition →
05 Testimonials → 06 Services → 07 Special Offer → 08 Add-ons →
09 Journey Map → 10 About → 11 Blogs → 12 Resources →
13 Team → 14 Press → 15 CTA → 16 FAQ → 17 Footer

## Validation

- [ ] Section renders at correct order on homepage.
- [ ] Background colour follows alternating spec pattern.
- [ ] Animation: fade-up / scroll-trigger works correctly.
- [ ] Mobile layout clean at 375px.
- [ ] No hardcoded hex values.
- [ ] `next build` passes with 0 errors.
