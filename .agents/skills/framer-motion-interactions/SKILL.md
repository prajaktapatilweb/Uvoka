---
name: framer-motion-interactions
description: >-
  Use this skill when implementing Framer Motion animations for component
  entrances, hover interactions, staggered reveals, layout animations, or page
  transitions in the UVOKA website. Activate for any Framer Motion
  implementation task.
---

# Framer Motion Interactions – UVOKA

## Variants System

Define variants at the top of files or in a shared `lib/motion-variants.ts`:

```ts
// src/lib/motion-variants.ts
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
```

## Scroll-Triggered Entrance (whileInView)

```tsx
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/motion-variants';

function ServiceCards() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {cards.map((card) => (
        <motion.div key={card.id} variants={fadeUp}>
          <ServiceCard {...card} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

## Hover Interactions

```tsx
// Premium card hover
<motion.div
  whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)' }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  ...
</motion.div>

// Magnetic button (subtle pull effect)
<motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
>
  Enquire Now
</motion.button>
```

## Page Transitions

```tsx
// components/layout/PageTransition.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const pageVariants = {
  hidden:  { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} variants={pageVariants} initial="hidden" animate="visible" exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

## Layout Animations

```tsx
// FAQ accordion
<motion.div
  layout
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.3, ease: 'easeInOut' }}
>
  {answer}
</motion.div>
```

## Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion'; // Framer's built-in hook

function AnimatedCard() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0.1 : 0.6 }}
    />
  );
}
```

## Rules

- Use `viewport={{ once: true }}` for scroll-triggered entrances (no re-trigger on scroll up).
- Use `AnimatePresence` with `mode="wait"` for page transitions.
- Keep `whileHover` transforms subtle: max `scale(1.05)`, max `translateY(-6px)`.
- Use Framer Motion's `useReducedMotion` hook, not a custom one, in Framer components.
- Do NOT use Framer Motion for GSAP scroll-pinning – use the right tool for each job.
- Do NOT combine GSAP and Framer Motion on the same element.

## Validation

- [ ] All entrance animations use `viewport={{ once: true }}`.
- [ ] Page transitions use `AnimatePresence`.
- [ ] Hover states tested on touch devices (hover should degrade gracefully).
- [ ] Reduced-motion users see instant/minimal transitions.
