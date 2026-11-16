---
name: gsap-scroll-animations
description: >-
  Use this skill when implementing GSAP animations, ScrollTrigger, pinned
  sections, parallax effects, horizontal scroll, text mask reveals, counter
  animations, or SVG timeline animations for the UVOKA website. Activate
  for any GSAP-related implementation task.
---

# GSAP & ScrollTrigger Animations – UVOKA

## Setup Pattern (Always Use This)

```tsx
'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function MyAnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return; // Respect prefers-reduced-motion

    const ctx = gsap.context(() => {
      // All GSAP selectors are scoped to containerRef
      gsap.from('.animate-in', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.animate-in',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef); // ← scope

    return () => ctx.revert(); // ← cleanup
  }, [reduced]);

  return <div ref={containerRef}>...</div>;
}
```

## ScrollTrigger Patterns

### Fade-up stagger (sections, cards)
```js
gsap.from(elements, {
  y: 60, opacity: 0, duration: 0.8,
  stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger, start: 'top 80%' },
});
```

### Parallax background
```js
gsap.to(bgElement, {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: { trigger, scrub: 1 },
});
```

### Pinned section (horizontal scroll)
```js
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    pin: true,
    scrub: 1,
    end: () => `+=${track.scrollWidth}`,
  },
});
```

### Text mask reveal (line by line)
```js
// Wrap each line in a .line-mask div first
gsap.from('.line-mask', {
  yPercent: 110,
  duration: 0.9,
  stagger: 0.08,
  ease: 'power4.out',
  scrollTrigger: { trigger, start: 'top 75%' },
});
```

### Counter animation
```js
gsap.to(counter, {
  textContent: targetValue,
  duration: 2,
  ease: 'power1.out',
  snap: { textContent: 1 },
  scrollTrigger: { trigger, start: 'top 80%', once: true },
});
```

### SVG Path Motion (Journey Map logo)
```js
const path = document.querySelector('#journey-path');
const logo = document.querySelector('#journey-logo');
gsap.to(logo, {
  motionPath: { path, align: path, autoRotate: false },
  ease: 'none',
  scrollTrigger: {
    trigger: '#journey-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1,
  },
});
```
> Requires `gsap/MotionPathPlugin` – register it alongside ScrollTrigger.

## Service Card Entrance Animations (5 unique)

```js
// Card 1 – upward reveal
gsap.from(card1, { y: 80, opacity: 0, duration: 0.8, ease: 'power3.out' });
// Card 2 – horizontal slide-in
gsap.from(card2, { x: -80, opacity: 0, duration: 0.8, ease: 'power3.out' });
// Card 3 – scale and fade
gsap.from(card3, { scale: 0.85, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' });
// Card 4 – subtle rotational entrance
gsap.from(card4, { rotation: -6, opacity: 0, duration: 0.9, ease: 'power2.out' });
// Card 5 – clip-path reveal
gsap.from(card5, { clipPath: 'inset(0 100% 0 0)', duration: 0.9, ease: 'power3.inOut' });
```

## Soft Glow Continuous Animation (Cards)
```js
// Acceptable continuous animation (very subtle)
gsap.to('.card-glow-orb', {
  scale: 1.2, opacity: 0.6, duration: 2.5,
  yoyo: true, repeat: -1, ease: 'sine.inOut',
});
```
> Use `will-change: transform` on these elements. Keep them off the main layout flow.

## Rules

- ALWAYS use `gsap.context(fn, scopeRef)` + `ctx.revert()` in cleanup.
- ALWAYS use `useLayoutEffect`, not `useEffect`, for GSAP (avoids flash).
- ALWAYS call `ScrollTrigger.refresh()` after dynamic content / images load.
- NEVER animate `width`, `height`, `top`, `left` – use `transform` only.
- NEVER create ScrollTrigger instances outside React lifecycle (no module-level GSAP).
- Disable or simplify animations on mobile (check `window.innerWidth < 768`).
- Register plugins ONCE at the top of the file or in a shared gsap-config module.

## Validation

- [ ] No GSAP memory leaks: all contexts reverted on unmount.
- [ ] `ScrollTrigger.refresh()` called after all images/fonts load.
- [ ] Reduced-motion users see static layout without JS errors.
- [ ] Animations tested on route change (ScrollTrigger re-initialises).
- [ ] No `width`/`height`/`top`/`left` properties animated.
