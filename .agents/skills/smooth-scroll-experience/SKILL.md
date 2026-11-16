---
name: smooth-scroll-experience
description: >-
  Use this skill when implementing Lenis smooth scrolling, synchronizing it
  with GSAP ScrollTrigger, or handling scroll-related accessibility and
  performance concerns for the UVOKA website. Activate for Lenis setup,
  scroll behaviour, or scroll-accessibility questions.
---

# Smooth Scroll Experience – UVOKA

## When to Use Lenis

Use Lenis only when:
- The design requires a noticeably smoother, momentum-based scroll feel.
- The section has scroll-driven GSAP animations that benefit from lerped scroll values.

Do NOT use Lenis if:
- It interferes with keyboard navigation or focus management.
- The page has complex scroll-locked sections that fight with Lenis.
- Mobile experience suffers (consider disabling on mobile).

## Lenis Setup with GSAP

```tsx
// src/providers/SmoothScrollProvider.tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Sync with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}
```

```tsx
// In app/layout.tsx – wrap children
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

## Mobile Consideration

```tsx
// Disable Lenis on mobile for better touch performance
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
if (isMobile) return <>{children}</>;
// else: initialise Lenis
```

## Accessibility Rules

- Ensure `:focus-visible` scroll behaviour is preserved (Lenis does not break this natively).
- Skip-to-content links must still work with Lenis (`lenis.scrollTo('#main-content')`).
- Respect `prefers-reduced-motion`: disable Lenis or set `duration: 0`.
- Test keyboard-only navigation to verify focus scroll is not disrupted.

```tsx
// Reduced-motion + Lenis
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = new Lenis({ duration: prefersReduced ? 0 : 1.2 });
```

## Validation

- [ ] Lenis and GSAP ScrollTrigger scroll values are in sync (no jitter).
- [ ] Skip-to-content and anchor links work correctly.
- [ ] Keyboard Tab navigation scrolls the viewport to focused elements.
- [ ] Mobile scroll is native (Lenis not applied) or smooth without lag.
- [ ] Reduced-motion disables or minimizes Lenis duration.
