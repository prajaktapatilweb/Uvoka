---
name: workflow-new-component
description: >-
  Use this workflow when creating a new reusable React component for the UVOKA
  website. Covers component creation, TypeScript typing, design system
  compliance, and validation.
---

# Workflow: New Reusable Component

## Expected Inputs

- **Component name:** e.g., `ServiceCard`, `AnimatedCounter`, `SectionHeading`
- **Category:** `common/`, `animations/`, `home/`, `services/`, etc.
- **Props:** List of accepted props and their types
- **Interaction:** Static, hover, animated, or scroll-triggered

## Implementation Steps

### Step 1 – Create the File
```
src/components/[category]/ComponentName.tsx
```

### Step 2 – Define TypeScript Interface
```ts
export interface ComponentNameProps {
  // All props explicitly typed
  // No 'any'
}
```

### Step 3 – Write the Component
- Server Component if no hooks or browser APIs.
- Add `'use client'` only if required.
- Single default export.

### Step 4 – Apply Design System
- Colours via CSS variables only.
- Typography via `--font-*` variables.
- Spacing via Tailwind tokens or CSS variables.
- Hover via `--transition-base`.

### Step 5 – Add Animation (if required)
- GSAP: `useLayoutEffect` + `gsap.context` + `ctx.revert`.
- Framer Motion: appropriate variants from `src/lib/motion-variants.ts`.

### Step 6 – Export & Integrate
- Export the component from its file.
- Import and use in the target page.

## Validation

- [ ] TypeScript compiles with 0 errors.
- [ ] No `any` types.
- [ ] No hardcoded hex values.
- [ ] Keyboard accessible (if interactive).
- [ ] Renders correctly on mobile (375px), tablet (768px), desktop (1280px).
- [ ] Animation cleaned up on unmount.
