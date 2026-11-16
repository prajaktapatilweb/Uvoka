# UVOKA Project – Global Agent Rules

> You are building the UVOKA premium corporate website.  
> Primary spec: `UVOKA_Website_Redesign_Specification.md` at the project root.  
> Primary logo: `logo1.png` at the project root.

---

## Project Context

UVOKA is a LinkedIn branding and lead-generation agency. The website is a
premium, modern, creative corporate experience using light-mode luxury design,
bold typography, scroll-based animations and interactive storytelling.

Design references:
- Creative layout / motion: theoceanlabs.com
- Animation style: skilltechwebdesign.com/htmlthemes/darkstar/

---

## Brand & Colour Rules

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#522166` | Royal Purple – buttons, highlights, CTAs |
| `--color-primary-dark` | `#382044` | Deep Aubergine – dark sections, contrast headings |
| `--color-primary-muted` | `#795A86` | Muted Purple – secondary accents, hover states |
| `--color-gold` | `#D2B98B` | Champagne Gold – premium highlights, decorative detail |
| `--color-ivory` | `#F4EFE7` | Warm Ivory – alternate section backgrounds |
| `--color-white` | `#FFFFFF` | Pure White – main background |
| `--color-charcoal` | `#27232A` | Charcoal – headings and body text |

**Rules:**
- NEVER hardcode hex values in component files. Always use CSS variables.
- Colour distribution: White 45%, Warm Ivory 25%, Royal Purple 18%, Charcoal 8%, Gold 4%.
- Dominant mode is light. Use deep-aubergine sections sparingly for contrast.
- All interactive states (hover, focus, active) must reference tokens, not raw hex.

---

## Typography Rules

- **Headings:** Space Grotesk / Sora / Plus Jakarta Sans (bold, oversized).
- **Editorial highlights:** Playfair Display / Cormorant Garamond (italic, selective).
- **Body:** DM Sans / Inter.
- Maintain strong hierarchy, generous spacing and readability.
- Selected words may be highlighted in `--color-primary` or `--color-gold`.
- Animated text reveals (line-by-line, word-by-word) must include reduced-motion fallbacks.

---

## Development Rules

### Framework & Architecture
- **Next.js App Router** exclusively. No Pages Router.
- Follow the project folder structure defined in the spec (`src/app`, `src/components`, etc.).
- Every page has its own route file. No monolithic page components.
- Use `src/data/` for static content (services, journey, team, FAQs, testimonials).
- Use Sanity CMS for all dynamic content (blogs, case studies).

### React & TypeScript
- **Server Components by default.** Add `'use client'` only when the component requires:
  - Browser APIs (window, document, IntersectionObserver).
  - React hooks (useState, useEffect, useRef).
  - Animation libraries (GSAP, Framer Motion, Lenis).
- Strict TypeScript. No `any`. Explicit prop interfaces for all components.
- Reusable, single-responsibility components. No business logic in page files.
- Props should be typed with `interface`, not `type`, unless union types are needed.

### Code Quality
- No duplicated components or styles.
- No unused imports or dead code.
- No hardcoded strings that belong in `src/lib/constants.ts`.
- Consistent naming: PascalCase components, camelCase hooks/utils, kebab-case files/routes.
- Only modify files relevant to the requested change. Do not refactor unrelated code.
- Verify TypeScript types compile cleanly before finishing any task.

---

## Animation Rules

- **GSAP + ScrollTrigger** for scroll-driven interactions, pinned sections, parallax.
- **Framer Motion** for component entrance, hover, stagger and page transitions.
- **Lenis** for smooth scrolling – integrate only where it genuinely improves UX.
- Always create a GSAP context (`gsap.context()`) inside `useLayoutEffect` and clean up on unmount.
- Refresh `ScrollTrigger.refresh()` after dynamic content loads and on route change.
- Prefer `transform` and `opacity` for all animations. Avoid animating layout properties.
- Respect `prefers-reduced-motion`. Provide static fallbacks.
- Avoid continuous/looping animations unless they serve a clear UX purpose.
- Mobile animations must be lighter (fewer elements, shorter durations).

---

## CMS Rules (Sanity)

- Sanity CMS for Blogs (`/blogs`, `/blogs/[slug]`) and Case Studies (`/case-studies`, `/case-studies/[slug]`).
- Only published documents appear publicly.
- All schemas must be typed. GROQ queries must have corresponding TypeScript return types.
- Use `next-sanity` for data fetching. Use Sanity image pipeline for all media.
- SEO metadata fields (title, description, og:image) must be part of every content schema.
- Sanity Studio at `/studio` with appropriate auth protection.

---

## Quality & Performance Rules

- All layouts must be fully responsive: desktop (1280px+), tablet (768–1279px), mobile (< 768px).
- Use `next/image` for all images. Provide explicit `width`, `height` and `alt`.
- Use `next/font` for custom fonts. No external font CDN `<link>` tags.
- Lazy-load below-the-fold sections.
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`, `<aside>`, `<header>`, `<footer>`).
- All interactive elements must be keyboard-accessible with visible focus states.
- Provide `aria-label` or `aria-labelledby` for all icon-only buttons and decorative elements.
- Run `next build` and confirm zero TypeScript errors before marking any task complete.

---

## What NOT to Do

- Do NOT start Next.js project setup unless explicitly asked.
- Do NOT install dependencies unless explicitly asked.
- Do NOT modify `UVOKA_Website_Redesign_Specification.md`.
- Do NOT create placeholder designs without real content.
- Do NOT invent employee names, client names, prices or statistics. Wait for client confirmation.
- Do NOT create multiple pricing cards. UVOKA has one active offer.
- Do NOT add unnecessary packages or devDependencies.
- Do NOT refactor code outside the scope of the current task.
