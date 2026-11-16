---
name: workflow-responsive-review
description: >-
  Use this workflow to perform a full responsive design review of a UVOKA page
  or component across mobile, tablet and desktop breakpoints.
---

# Workflow: Responsive Design Review

## Expected Inputs

- **Target:** Page or component to review
- **Breakpoints to test:** 375px (mobile), 768px (tablet), 1280px (desktop)

## Review Steps

### Step 1 – Mobile First (375px)
- Single-column layout.
- Typography readable (min 16px body).
- Touch targets ≥ 44px.
- No horizontal overflow.
- Animations simplified or disabled.
- Journey Map: vertical layout active.

### Step 2 – Tablet (768px)
- 2-column grids where appropriate.
- Navigation adapts (hamburger → partial nav).
- Section padding reduced vs desktop.
- Animations active but lighter.

### Step 3 – Desktop (1280px)
- Full creative layout active.
- All animations active.
- Oversized typography rendered correctly.
- Section backgrounds correct.
- Hover states functional.

### Step 4 – Large Desktop (1536px+)
- Max-width container (`1280px`) centred with side padding.
- No unintended stretch or overflow.

### Step 5 – Cross-Browser
- Chrome, Firefox, Safari (macOS and iOS).
- Edge.

## Validation Checklist

- [ ] No horizontal overflow at any breakpoint.
- [ ] All text readable and not truncated.
- [ ] All interactive elements accessible by touch on mobile.
- [ ] No layout shift (CLS = 0) on load.
- [ ] Images not distorted at any breakpoint.
- [ ] Container max-width respected.
