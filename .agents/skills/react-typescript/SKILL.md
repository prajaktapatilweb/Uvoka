---
name: react-typescript
description: >-
  Use this skill when writing, reviewing, or refactoring React components,
  custom hooks, TypeScript interfaces, or component composition patterns for
  the UVOKA project. Activate for prop typing, state management, hook creation,
  or any React/TypeScript best-practice question.
---

# React & TypeScript – UVOKA

## Component Template

```tsx
// components/common/SectionHeading.tsx
import type { FC } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string; // word(s) to colour in --color-primary
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeading: FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  className = '',
  align = 'left',
}) => {
  return (
    <div className={`section-heading align-${align} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>
        {highlight
          ? title.split(highlight).map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && <span className="highlight">{highlight}</span>}
              </span>
            ))
          : title}
      </h2>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
```

## TypeScript Conventions

- All component props use `interface`. Use `type` only for union/intersection types.
- Never use `any`. Use `unknown` + type narrowing, or proper generics.
- Explicit return types on all utility functions and hooks.
- Use `FC<Props>` for function components (keeps consistent with the team convention).
- Export prop interfaces for reuse: `export interface ButtonProps { ... }`.

## Custom Hooks

```ts
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```

```ts
// hooks/useScrollProgress.ts
import { useEffect, useState } from 'react';

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight));
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return progress;
}
```

## State Management

- Use `useState` and `useReducer` for local component state.
- Use React Context for cross-cutting concerns (e.g., Lenis instance, theme tokens).
- Do NOT introduce Redux, Zustand or similar unless the project scope changes.
- Keep server data fetching in Server Components; pass results as props to clients.

## Component Composition

- Prefer composition over configuration (children > render props > complex prop APIs).
- Use `forwardRef` when a component wraps a DOM element that needs a ref externally.
- Separate concerns: layout shell (server) + animated inner (client).
- Each component file: one default export, related named exports (types, utils) only.

## File Naming

| Entity | Convention | Example |
|---|---|---|
| Component | PascalCase | `ServiceCard.tsx` |
| Hook | camelCase with `use` prefix | `useScrollProgress.ts` |
| Utility | camelCase | `formatDate.ts` |
| Types file | camelCase | `sanity.types.ts` |
| Route | kebab-case directory | `linkedin-personal-branding/` |

## Validation Checklist

- [ ] Zero TypeScript errors (`tsc --noEmit`).
- [ ] No `any` types.
- [ ] All props explicitly typed.
- [ ] No unused imports.
- [ ] Hooks follow rules of hooks (not inside conditionals/loops).
- [ ] Client components marked `'use client'`.
