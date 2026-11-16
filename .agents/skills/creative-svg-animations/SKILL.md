---
name: creative-svg-animations
description: >-
  Use this skill when building SVG-based animations, motion along paths,
  the UVOKA interactive journey map (logo moving along a curved wave path
  as the user scrolls), animated milestone indicators, or responsive SVG
  layouts. Activate for any SVG animation implementation task.
---

# Creative SVG Animations – UVOKA

## Journey Map Overview

The "How We Work" section features:
- A curved, wave-like SVG path spanning the full section width.
- The UVOKA icon (`/public/logo/uvoka-icon.svg`) travels along this path as the user scrolls.
- 6 milestone points on the path, each with an information card above or below.
- Cards reveal when the logo reaches their milestone.
- Mobile: horizontal wave → vertical journey (same logic, different SVG viewBox).

## SVG Path Structure

```tsx
// components/home/JourneyMap.tsx (simplified)
'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const MILESTONES = [
  { id: 1, label: 'Onboarding & Discovery',          position: 0.08 },
  { id: 2, label: 'Profile Optimization',            position: 0.24 },
  { id: 3, label: 'Content Strategy',                position: 0.42 },
  { id: 4, label: 'Content Creation & Calendar',     position: 0.58 },
  { id: 5, label: 'Design & Approval',               position: 0.75 },
  { id: 6, label: 'Performance Tracking & Reporting',position: 0.92 },
];

export function JourneyMap() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<SVGImageElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: false,
        },
      });

      // Animate logo along path
      tl.to(logoRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: 'none',
      });

      // Reveal milestone cards
      MILESTONES.forEach(({ id, position }) => {
        tl.to(`#milestone-card-${id}`, {
          opacity: 1, y: 0, duration: 0.1,
        }, position);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="journey-section" style={{ height: '300vh' }}>
      <div className="journey-sticky" style={{ position: 'sticky', top: 0, height: '100vh' }}>
        <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" className="journey-svg">
          {/* Wave path */}
          <path
            ref={pathRef}
            id="journey-path"
            d="M 0,200 C 100,50 200,350 400,200 C 600,50 700,350 900,200 C 1050,100 1150,300 1200,200"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeDasharray="6 4"
            opacity="0.4"
          />

          {/* Milestone dots */}
          {MILESTONES.map((m) => (
            <circle key={m.id} cx={m.position * 1200} cy={200}
              r="8" fill="var(--color-gold)" id={`dot-${m.id}`} />
          ))}

          {/* Logo icon travels along path */}
          <image
            ref={logoRef}
            id="journey-logo"
            href="/logo/uvoka-icon.svg"
            width="40" height="40"
            x="-20" y="-20"
          />
        </svg>

        {/* Info cards */}
        {MILESTONES.map((m) => (
          <div
            key={m.id}
            id={`milestone-card-${m.id}`}
            className="milestone-card"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            <h4>{m.label}</h4>
            {/* Description populated from data/journey.ts */}
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Animated SVG Stroke Dash (path drawing)

```js
// Draw the path progressively on scroll
const pathLength = path.getTotalLength();
gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
gsap.to(path, {
  strokeDashoffset: 0,
  ease: 'none',
  scrollTrigger: { trigger, scrub: 1 },
});
```

## Milestone Dot Pulse (active state)

```css
.milestone-dot.active {
  animation: dot-pulse 1.5s ease-in-out infinite;
}
@keyframes dot-pulse {
  0%, 100% { r: 8; opacity: 1; }
  50%       { r: 12; opacity: 0.6; }
}
@media (prefers-reduced-motion: reduce) {
  .milestone-dot.active { animation: none; }
}
```

## Responsive Adaptation

```tsx
// On mobile (<768px), render a vertical SVG path
const isVertical = typeof window !== 'undefined' && window.innerWidth < 768;
const pathD = isVertical
  ? 'M 100,0 C 50,100 150,200 100,300 C 50,400 150,500 100,600'
  : 'M 0,200 C 100,50 200,350 400,200 C 600,50 700,350 900,200 ...';
```

## Rules

- Use `MotionPathPlugin` from GSAP for logo movement along path.
- Always call `ctx.revert()` to prevent path animation memory leaks.
- SVG must be responsive: use `viewBox`, not fixed `width`/`height`.
- Milestone card text comes from `src/data/journey.ts` (never hardcoded in JSX).
- Path colour: `var(--color-primary)`, milestone dots: `var(--color-gold)`.
- Logo icon file: `/public/logo/uvoka-icon.svg` (not `logo1.png` – use a crisp SVG icon).

## Validation

- [ ] Logo travels smoothly along the entire path as user scrolls.
- [ ] All 6 milestone cards reveal at the correct scroll position.
- [ ] Active milestone dot is visually distinct.
- [ ] SVG scales correctly from 320px to 1920px viewports.
- [ ] Vertical layout works on mobile.
- [ ] Reduced-motion: logo appears at start, all cards visible, no scroll movement.
