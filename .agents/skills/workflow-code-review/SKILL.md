---
name: workflow-code-review
description: >-
  Use this workflow to run a comprehensive code review and production build
  verification for the UVOKA website before deploying or completing a feature.
  Runs through the full frontend-code-review skill checklist systematically.
---

# Workflow: Code Review & Production Build Verification

## Expected Inputs

- **Scope:** Single component / Full page / All changes since last review
- **Files changed:** List of modified files

## Verification Steps

### Step 1 – TypeScript Check
```bash
npx tsc --noEmit
```
Expected: 0 errors, 0 warnings.

### Step 2 – Run Frontend Code Review Skill
Activate `frontend-code-review` skill and work through every checklist item.

### Step 3 – Production Build
```bash
next build
```
Expected:
- 0 TypeScript errors.
- 0 ESLint errors (if configured).
- No critical bundle size warnings.

### Step 4 – Spot Check in Browser
- Navigate to all modified routes.
- Test on mobile (DevTools 375px).
- Test keyboard navigation.
- Test with animations disabled (simulate reduced-motion).

### Step 5 – Sanity Content (if applicable)
- Verify published content appears.
- Verify draft content is hidden.
- Verify CMS metadata populates page `<head>`.

### Step 6 – Performance Spot Check
- Open Network tab – verify no unintended large bundles.
- Verify hero image loads with priority.
- Verify below-fold images lazy-load.

## Sign-off Criteria

- [ ] `tsc --noEmit` → 0 errors.
- [ ] `next build` → success.
- [ ] All `frontend-code-review` checklist items passed.
- [ ] Mobile layout verified at 375px.
- [ ] No hardcoded hex in any modified component.
- [ ] Reduced-motion tested.
