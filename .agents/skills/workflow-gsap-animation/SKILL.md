---
name: workflow-gsap-animation
description: >-
  Use this workflow when implementing a GSAP or ScrollTrigger animation for
  any UVOKA website section. Ensures correct setup, context management,
  cleanup, reduced-motion support and testing.
---

# Workflow: GSAP Animation Implementation

## Expected Inputs

- **Target element:** Section or component to animate
- **Animation type:** Fade-up / parallax / pin / horizontal scroll / text mask / counter / path motion
- **Trigger:** Scroll position, viewport entry, or manual
- **Scroll behaviour:** scrub / play-once / toggle

## Implementation Steps

### Step 1 – Ensure Client Component
Add `'use client'` at the top of the file.

### Step 2 – Register Plugins (once per file)
```ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
```

### Step 3 – Create Refs and Reduced-Motion Check
```ts
const containerRef = useRef<HTMLDivElement>(null);
const reduced = useReducedMotion();
```

### Step 4 – Implement in useLayoutEffect
```ts
useLayoutEffect(() => {
  if (reduced) return;
  const ctx = gsap.context(() => {
    // Animation code here
  }, containerRef);
  return () => ctx.revert();
}, [reduced]);
```

### Step 5 – Refer to Pattern
Choose the matching pattern from `gsap-scroll-animations` skill:
- Fade-up stagger, parallax, pinned, text mask, counter, SVG path

### Step 6 – Handle Dynamic Content
```ts
// After images/fonts load
ScrollTrigger.refresh();
```

### Step 7 – Mobile Simplification
```ts
if (window.innerWidth < 768) {
  // Simpler animation or skip
  return;
}
```

## Validation

- [ ] Animation runs correctly on first scroll.
- [ ] Animation works after route change.
- [ ] No GSAP memory leaks (ctx.revert called).
- [ ] `ScrollTrigger.refresh()` called where needed.
- [ ] Reduced-motion: static layout, no errors.
- [ ] Mobile: lighter animation or none.
- [ ] Only transform/opacity animated (no layout properties).
