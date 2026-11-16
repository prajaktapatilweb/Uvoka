---
name: tailwind-design-system
description: >-
  Use this skill when configuring Tailwind CSS, extending the design system
  with UVOKA brand tokens, writing utility classes, managing CSS variables,
  or establishing consistent styling patterns. Activate when setting up
  tailwind.config, globals.css, or centralising design tokens.
---

# Tailwind Design System – UVOKA

## CSS Variables (globals.css)

Define all brand tokens as CSS custom properties:

```css
/* src/app/globals.css */
:root {
  /* Colours */
  --color-primary:        #522166;
  --color-primary-dark:   #382044;
  --color-primary-muted:  #795A86;
  --color-gold:           #D2B98B;
  --color-ivory:          #F4EFE7;
  --color-white:          #FFFFFF;
  --color-charcoal:       #27232A;

  /* Typography */
  --font-heading:   'Space Grotesk', 'Sora', sans-serif;
  --font-editorial: 'Playfair Display', 'Cormorant Garamond', serif;
  --font-body:      'DM Sans', 'Inter', sans-serif;

  /* Spacing scale */
  --space-xs:   0.5rem;
  --space-sm:   1rem;
  --space-md:   1.5rem;
  --space-lg:   2.5rem;
  --space-xl:   4rem;
  --space-2xl:  6rem;
  --space-3xl:  8rem;

  /* Radii */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card:  0 2px 20px rgba(82, 33, 102, 0.06);
  --shadow-hover: 0 8px 40px rgba(82, 33, 102, 0.12);
  --shadow-glow:  0 0 60px rgba(82, 33, 102, 0.15);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   300ms ease;
  --transition-slow:   600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Container */
  --container-max: 1280px;
  --container-pad: clamp(1rem, 5vw, 4rem);
}
```

## tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-muted':'var(--color-primary-muted)',
        gold:           'var(--color-gold)',
        ivory:          'var(--color-ivory)',
        charcoal:       'var(--color-charcoal)',
      },
      fontFamily: {
        heading:   ['var(--font-heading)'],
        editorial: ['var(--font-editorial)'],
        body:      ['var(--font-body)'],
      },
      spacing: {
        'section-sm': 'var(--space-xl)',
        'section-md': 'var(--space-2xl)',
        'section-lg': 'var(--space-3xl)',
      },
      borderRadius: {
        card: 'var(--radius-md)',
        pill: 'var(--radius-full)',
      },
      boxShadow: {
        card:  'var(--shadow-card)',
        hover: 'var(--shadow-hover)',
        glow:  'var(--shadow-glow)',
      },
      transitionDuration: {
        fast: '150',
        base: '300',
        slow: '600',
      },
      maxWidth: {
        container: 'var(--container-max)',
      },
    },
  },
  plugins: [],
};

export default config;
```

## Reusable Class Patterns

```css
/* src/styles/utilities.css */

/* Layout container */
.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-pad);
}

/* Section padding */
.section-padding {
  padding-block: var(--space-2xl);
}

/* Premium card */
.card-premium {
  background: var(--color-white);
  border: 1px solid rgba(82, 33, 102, 0.08);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-card);
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

/* Eyebrow label */
.eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-primary-muted);
}

/* Text highlight */
.text-highlight { color: var(--color-primary); }
.text-gold      { color: var(--color-gold);    }

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Rules

- Never use raw hex in Tailwind class `bg-[#522166]`. Use `bg-primary` (token).
- Never duplicate colour definitions. All tokens live in `globals.css` only.
- Tailwind utilities should reference extended tokens, not Tailwind defaults for brand colours.
- CSS Modules or `globals.css` utility classes for complex patterns; plain Tailwind for spacing/layout.

## Validation

- `tailwind.config.ts` references CSS variables – changing a variable updates the whole site.
- No hardcoded hex values in any component file.
- Design tokens documented in `globals.css`.
