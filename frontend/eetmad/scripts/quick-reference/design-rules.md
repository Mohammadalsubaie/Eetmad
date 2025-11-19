# 🎨 Design Rules - Quick Reference Card

**⚡ One-page cheat sheet for daily use**

---

## 🚦 The Big 6 Rules

### 1️⃣ Use Theme System (cssVars)

```tsx
// ❌ NEVER DO THIS
<div style={{ backgroundColor: '#FAF8F1' }}>
<div className="bg-white text-gray-800">

// ✅ ALWAYS DO THIS
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

**Quick Fix:** Import `cssVars` from `@/styles/theme`

---

### 2️⃣ Use Translations (i18n)

```tsx
// ❌ NEVER DO THIS
<h1>Welcome</h1>
<p>مرحباً</p>

// ✅ ALWAYS DO THIS
import { useTranslations } from 'next-intl';
const t = useTranslations('home');
<h1>{t('welcome')}</h1>
```

**Quick Fix:** Import `useTranslations` from `next-intl`

---

### 3️⃣ Component Structure

```tsx
// ✅ CORRECT STRUCTURE
'use client'; // If using hooks

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  const t = useTranslations('namespace');

  return <div>{title}</div>;
}
```

**Checklist:**

- ✅ `'use client'` if using hooks
- ✅ Props interface defined
- ✅ PascalCase naming
- ✅ File name matches component name

---

### 4️⃣ RTL Support

```tsx
// ❌ NEVER DO THIS
className = 'ml-4 mr-2 text-left';

// ✅ ALWAYS DO THIS
className = 'ms-4 me-2 text-start';
```

**Use:**

- `ms-` instead of `ml-`
- `me-` instead of `mr-`
- `text-start` instead of `text-left`
- `text-end` instead of `text-right`

---

### 5️⃣ Animations

```tsx
// ❌ AVOID THIS
<div style={{ transition: 'all 0.3s' }}>

// ✅ USE THIS
import { motion } from 'framer-motion';
<motion.div whileHover={{ scale: 1.05 }}>
```

---

### 6️⃣ Styling Best Practices

```tsx
// ✅ GOOD PATTERN
import { cssVars } from '@/styles/theme';

<div
  className="p-4 rounded-lg"  // Tailwind for layout
  style={{
    backgroundColor: cssVars.neutral.surface,  // cssVars for colors
    color: cssVars.secondary.DEFAULT
  }}
>
```

---

## 🎨 cssVars Quick Reference

### Colors

```typescript
// Neutral (Backgrounds & Borders)
cssVars.neutral.bg; // #FAF8F1 - Main background
cssVars.neutral.surface; // #FFFFFF - Cards, surfaces
cssVars.neutral.border; // #E5E5E5 - Borders

// Primary (Brand - Green)
cssVars.primary.DEFAULT; // #8CB369 - Main green
cssVars.primary.hover; // #7A9E5C - Hover state
cssVars.primary.alpha10; // 10% opacity
cssVars.primary.alpha20; // 20% opacity

// Secondary (Dark Text)
cssVars.secondary.DEFAULT; // #334443 - Main dark text
cssVars.secondary.muted; // 70% opacity
cssVars.secondary.subtle; // 40% opacity

// Accent (Warm Terracotta)
cssVars.accent.DEFAULT; // #CE7935
cssVars.accent.hover; // #B86B2F
cssVars.accent.alpha10; // 10% opacity
```

### Typography

```typescript
cssVars.text.primary; // Main text
cssVars.text.secondary; // Secondary text
cssVars.text.muted; // Muted text
cssVars.text.subtle; // Very light text
cssVars.text.white; // White text
```

### Shadows & Effects

```typescript
cssVars.shadow.sm; // Small shadow
cssVars.shadow.md; // Medium shadow
cssVars.shadow.lg; // Large shadow
cssVars.shadow.green; // Green glow
```

---

## ⚡ Common Fixes

### Fix: Hardcoded Colors

```tsx
// Before
<div style={{ backgroundColor: '#FAF8F1' }}>

// After
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

### Fix: Hardcoded Text

```tsx
// Before
<h1>Welcome</h1>;

// After
import { useTranslations } from 'next-intl';
const t = useTranslations('home');
<h1>{t('welcome')}</h1>;
```

### Fix: Missing 'use client'

```tsx
// Before
import { useState } from 'react';
export default function Component() { ... }

// After
'use client';  // Add this!
import { useState } from 'react';
export default function Component() { ... }
```

### Fix: RTL Issues

```tsx
// Before
className = 'ml-4 pl-2 text-left';

// After
className = 'ms-4 ps-2 text-start';
```

---

## 🔍 Validation Commands

```bash
# Check single file
npm run validate:design src/components/MyComponent.tsx

# Check folder
npm run validate:design src/components/features/home/

# Check before commit
npm run validate:design $(git diff --name-only --cached)
```

---

## 🎯 Before You Commit Checklist

- [ ] No hardcoded colors (`#FAF8F1`, `#FFFFFF`, etc.)
- [ ] No hardcoded text (use `useTranslations`)
- [ ] `'use client'` if component uses hooks
- [ ] Props interface defined
- [ ] RTL-friendly classes (`ms-`, `me-`, not `ml-`, `mr-`)
- [ ] Animations use `framer-motion`
- [ ] Ran validation: `npm run validate:design <file>`

---

## 🆘 Getting Help

- **Full Guide:** [Design Rules Documentation](../docs/validation/design-rules.md)
- **Examples:**
  - Correct: `scripts/examples/test-component-correct.tsx`
  - Wrong: `scripts/examples/test-component-example.tsx`
- **Interactive Help:** `npm run scripts:menu`

---

**Print this and keep it next to your desk! 📌**

_Last Updated: November 15, 2025_
