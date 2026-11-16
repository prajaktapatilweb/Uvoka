---
name: luxury-ui-ux-design
description: >-
  Use this skill when making design decisions for the UVOKA website: section
  layouts, card design, visual hierarchy, typography application, spacing,
  imagery treatment, colour usage, hover states, or overall premium aesthetic
  direction. Activate for any UI/UX design question specific to the UVOKA brand.
---

# Luxury UI/UX Design – UVOKA

## Design Philosophy

> "Bold Typography + Light Luxury Colours + Interactive Storytelling +
> Creative Parallax + Animated Graphics + Meaningful Content."

The website must feel like a **premium digital experience**, not a conventional
corporate brochure. Every element should communicate professionalism, credibility
and creative excellence.

## Layout Principles

- **Content-first:** Typography, numbers and abstract graphics carry the visual
  weight. Use photography sparingly and only when it adds genuine value.
- **Generous whitespace:** Let sections breathe. Never crowd elements.
- **Asymmetric / editorial layouts:** Avoid symmetrical grid uniformity everywhere.
  Mix full-bleed sections with contained content blocks.
- **Section contrast:** Alternate white → warm ivory → deep aubergine sections
  to create rhythm without monotony.
- **No stock imagery** unless explicitly approved.

## Typography Application

```
Hero heading:     80–120px / font-weight 700–900 / Space Grotesk or Sora
Section h2:       48–64px  / font-weight 700
Section h3:       32–40px  / font-weight 600
Eyebrow labels:   12–14px  / UPPERCASE / letter-spacing 0.1–0.15em / Muted Purple
Body:             16–18px  / font-weight 400 / DM Sans or Inter / line-height 1.6–1.8
Editorial accent: Playfair Display italic (use selectively for one word or phrase)
```

- Use `clamp()` for responsive heading sizes:  
  `font-size: clamp(2.5rem, 6vw, 5rem);`
- Selected words highlighted with `color: var(--color-primary)` or `var(--color-gold)`.
- Never use more than 3 font families on the same page.

## Card Design System

UVOKA uses a consistent premium card design:

```css
.card-premium {
  background: var(--color-white);
  border: 1px solid rgba(82, 33, 102, 0.08);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 20px rgba(82, 33, 102, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.card-premium:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(82, 33, 102, 0.12);
  border-color: rgba(82, 33, 102, 0.2);
}
```

**Glossy glow (restrained):**
```css
.card-glow::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(210,185,139,0.15), rgba(82,33,102,0.08));
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.card-glow:hover::before { opacity: 1; }
```

> Keep glow subtle. Bright or neon glows are explicitly prohibited.

## Section Design Patterns

| Section | Background | Key Treatment |
|---|---|---|
| Hero | White + subtle abstract graphic | Full-bleed, oversized type, parallax |
| Featured In | Warm Ivory | Horizontal marquee logos |
| Counters | White | Large numerals, minimal decoration |
| Services | White → alternating ivory | 5 unique animated cards |
| Special Offer | Deep Aubergine | Champagne gold accents |
| Journey Map | Warm Ivory | SVG wave path, scroll-driven logo |
| About | White | Editorial image layout, awards showcase |
| CTA | Deep Aubergine | Champagne gold highlight, bold type |
| Footer | Deep Aubergine or White | Clean, premium |

## Imagery Guidelines

- Prefer abstract geometric shapes over photographs.
- When using photos: use selective overlapping layouts, not full grids.
- All images must have `next/image` with explicit dimensions.
- Apply subtle clip-path reveals on scroll, not static placement.
- Awards and media logos: consistent sizing, no distortion.

## Hover & Interaction States

- Hover transitions: 200–350ms `ease` or `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Elevation: `translateY(-4px)` maximum for cards.
- Colour shifts: use `--color-primary` → `--color-primary-muted` for text links.
- Focus styles: visible ring using `--color-primary` for keyboard users.
- Never remove default focus outline without providing a custom one.

## Responsive Design Targets

| Breakpoint | Range | Approach |
|---|---|---|
| Mobile | < 768px | Single column, simplified animations |
| Tablet | 768–1279px | 2-column where needed, reduced hero size |
| Desktop | 1280px+ | Full creative layouts, all animations |

## Validation

- Does the section communicate its content without animation? (content-first check)
- Are all brand colours referenced via CSS variables?
- Is the section readable and functional on mobile?
- Does hover state provide meaningful feedback without being distracting?
