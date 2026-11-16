---
name: accessibility-responsive-design
description: >-
  Use this skill when reviewing or implementing accessibility (WCAG 2.1 AA),
  keyboard navigation, semantic HTML, ARIA attributes, reduced-motion support,
  or responsive layouts for desktop, tablet and mobile viewports on the UVOKA
  website. Activate for any a11y or responsive design question.
---

# Accessibility & Responsive Design – UVOKA

## Semantic HTML Structure

```tsx
// Correct section structure
<main id="main-content">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
    ...
  </section>
</main>

// Skip to content (must be first focusable element)
<a href="#main-content" className="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  z-index: 9999;
  transition: top 0.2s;
}
.skip-link:focus { top: 0; }
```

## Keyboard Accessibility

- All interactive elements (`<button>`, `<a>`, `<input>`) must be reachable by Tab.
- Custom interactive elements (animated cards with click handlers) must have:
  - `role="button"` and `tabIndex={0}`.
  - `onKeyDown` handler for `Enter` and `Space`.
- Focus states must be visible:  
  ```css
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
    border-radius: 4px;
  }
  ```
- Never `outline: none` without an alternative focus indicator.
- Modals/dialogs must trap focus and restore it on close.

## ARIA Patterns

```tsx
// Icon-only button
<button aria-label="Open navigation menu">
  <HamburgerIcon aria-hidden="true" />
</button>

// Decorative SVG
<svg aria-hidden="true" focusable="false">...</svg>

// Live counter (announces to screen readers)
<div aria-live="polite" aria-atomic="true">
  <span>{count}+</span> clients served
</div>

// Testimonials slider
<div role="region" aria-label="Client testimonials" aria-roledescription="carousel">
  <button aria-label="Previous testimonial">←</button>
  <div role="group" aria-roledescription="slide" aria-label="Testimonial 1 of 5">...</div>
  <button aria-label="Next testimonial">→</button>
</div>

// FAQ accordion
<button
  id="faq-btn-1"
  aria-expanded={isOpen}
  aria-controls="faq-panel-1"
>
  What is LinkedIn Personal Branding?
</button>
<div id="faq-panel-1" role="region" aria-labelledby="faq-btn-1" hidden={!isOpen}>
  ...
</div>
```

## Colour Contrast

| Use | Foreground | Background | Ratio |
|---|---|---|---|
| Body text | `#27232A` | `#FFFFFF` | 15.3:1 ✅ |
| Body text | `#27232A` | `#F4EFE7` | 12.1:1 ✅ |
| Primary button | `#FFFFFF` | `#522166` | 8.4:1 ✅ |
| Gold accent text | `#D2B98B` | `#382044` | 4.6:1 ✅ |
| Muted purple text | `#795A86` | `#FFFFFF` | 4.6:1 ✅ (AA) |

Verify all text/background combinations with WCAG AA minimum (4.5:1 for normal text).

## Reduced Motion

```css
/* CSS baseline */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// In React components
import { useReducedMotion } from '@/hooks/useReducedMotion';
const reduced = useReducedMotion();
// Skip GSAP/Framer animations if true
```

## Responsive Breakpoints

```css
/* Tailwind-compatible */
--bp-sm:  640px;   /* Small mobile */
--bp-md:  768px;   /* Tablet */
--bp-lg:  1024px;  /* Laptop */
--bp-xl:  1280px;  /* Desktop */
--bp-2xl: 1536px;  /* Large desktop */
```

```tsx
// Tailwind responsive utilities
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
```

## Mobile-Specific Rules

- Minimum touch target size: 44×44px (`min-height: 44px; min-width: 44px`).
- No hover-only interactions (always provide tap equivalent).
- Font size minimum: 16px for body (prevents iOS auto-zoom on inputs).
- Test all animations on a real mobile device – not just browser resize.
- Journey Map: horizontal wave → vertical stack on `< 768px`.

## Validation Checklist

- [ ] Skip-to-content link is first element and works.
- [ ] All pages pass WCAG 2.1 AA colour contrast.
- [ ] All interactive elements reachable by keyboard.
- [ ] All images have descriptive `alt` text (or `alt=""` for decorative).
- [ ] Reduced-motion CSS fallback in place.
- [ ] Mobile layout tested at 375px and 390px (iPhone 13/14).
- [ ] Tablet layout tested at 768px and 1024px.
- [ ] Axe DevTools or similar run with 0 critical violations.
