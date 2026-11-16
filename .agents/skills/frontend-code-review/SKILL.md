---
name: frontend-code-review
description: >-
  Use this skill when performing a code review, quality audit, TypeScript
  error check, performance review, accessibility review, or production
  readiness check for any UVOKA website component, page, or feature.
  Activate when the user asks to review code or verify before deployment.
---

# Frontend Code Review – UVOKA

## Review Checklist

Run through every category below before marking a task complete or approving a PR.

---

### 1. TypeScript & Code Quality

- [ ] Zero TypeScript errors: `npx tsc --noEmit`
- [ ] No `any` types. All props and return values explicitly typed.
- [ ] No unused imports, variables or functions.
- [ ] No hardcoded hex colour values in component files.
- [ ] No hardcoded text strings that belong in `src/lib/constants.ts`.
- [ ] No duplicated components or styles.
- [ ] Components follow single-responsibility principle.
- [ ] No `console.log` or debug code in production files.

---

### 2. Next.js Architecture

- [ ] Server Components used by default (no unnecessary `'use client'`).
- [ ] All `'use client'` components justified (uses hooks/browser APIs/animations).
- [ ] Data fetching happens in Server Components or Server Actions, not in `useEffect`.
- [ ] Dynamic routes have `generateStaticParams` or ISR `revalidate` set.
- [ ] `next.config.ts` only contains supported configuration.
- [ ] No Pages Router patterns in an App Router project.

---

### 3. Component Structure

- [ ] One default export per file.
- [ ] Prop interfaces exported for reuse where appropriate.
- [ ] Animation components (GSAP/Framer) are Client Components.
- [ ] Server-side data passed as props to Client Components.
- [ ] Components placed in correct directory (`home/`, `common/`, `animations/`).
- [ ] File names follow convention (PascalCase for components, camelCase for hooks/utils).

---

### 4. GSAP Animations

- [ ] `gsap.context()` used with scope ref.
- [ ] `ctx.revert()` called in `useLayoutEffect` cleanup.
- [ ] `ScrollTrigger.refresh()` called after dynamic content loads.
- [ ] No GSAP animations in Server Components.
- [ ] Only `transform`/`opacity` properties animated (no layout properties).
- [ ] Plugin registrations not duplicated across files.
- [ ] Mobile: animations simplified or disabled below 768px.

---

### 5. Framer Motion

- [ ] `viewport={{ once: true }}` on scroll-triggered animations.
- [ ] `AnimatePresence` with `mode="wait"` for route transitions.
- [ ] `useReducedMotion` respected.
- [ ] No Framer Motion applied to Server Components.
- [ ] No GSAP + Framer Motion on the same element.

---

### 6. Design System Compliance

- [ ] All colours via CSS variables (no raw hex).
- [ ] Typography uses `var(--font-heading)` / `var(--font-body)` / `var(--font-editorial)`.
- [ ] Spacing uses Tailwind tokens or CSS variables (no magic pixel values).
- [ ] Card patterns follow `.card-premium` design system.
- [ ] Hover states use `--transition-base` (300ms).
- [ ] Glow effects are subtle (opacity < 0.2 for brand colours in light mode).

---

### 7. Accessibility

- [ ] Semantic HTML used (`<section>`, `<article>`, `<nav>`, etc.).
- [ ] All `<img>` have descriptive `alt` or `alt=""` for decorative.
- [ ] All icon-only buttons have `aria-label`.
- [ ] Keyboard navigation works for all interactive elements.
- [ ] Focus styles visible (not `outline: none` without replacement).
- [ ] ARIA attributes correct on complex widgets (accordion, slider, tabs).
- [ ] `prefers-reduced-motion` handled.

---

### 8. Performance

- [ ] `next/image` for all images (no `<img>` tags).
- [ ] Hero images use `priority` prop.
- [ ] Below-fold heavy components use `dynamic(() => import(...), { ssr: false })`.
- [ ] No unnecessary re-renders (memoisation where appropriate).
- [ ] No large synchronous libraries imported in Server Components.
- [ ] `next build` completes without warnings about large bundle sizes.

---

### 9. Sanity CMS (if applicable)

- [ ] Only published content returned by queries.
- [ ] All schemas typed with `defineType`/`defineField`.
- [ ] SEO fields populated from CMS, not hardcoded.
- [ ] Images use Sanity image pipeline with blur placeholder.

---

### 10. Production Readiness

- [ ] `next build` succeeds with 0 TypeScript errors.
- [ ] No environment variables exposed client-side unintentionally.
- [ ] No `/studio` route accessible without authentication in production.
- [ ] Error boundaries in place for data-fetching components.
- [ ] Canonical URLs and metadata set on all public pages.

---

## Common UVOKA-Specific Issues to Catch

| Anti-pattern | Correct approach |
|---|---|
| `color: #522166` in a component | `color: var(--color-primary)` |
| Animating `height` or `top` with GSAP | Animate `scaleY` or `translateY` |
| `useEffect` for GSAP | `useLayoutEffect` with `gsap.context` |
| `<img src="...">` | `<Image ... />` from `next/image` |
| Hardcoded blog content in JSX | Fetch from Sanity CMS |
| `any` on Sanity query return | Define TypeScript type for query shape |
| ScrollTrigger on Server Component | Move to Client Component |
| Framer + GSAP on same element | Pick one per element |
