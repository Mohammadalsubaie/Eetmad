# Component Building Guidelines

## 📋 Overview

This document provides comprehensive rules and best practices for building components in the Eetmad project. All components must follow these guidelines to ensure consistency, maintainability, and proper integration with the theme system and internationalization.

**Important**: The theme system is located in `frontend/eetmad/src/styles/theme` - always use this instead of hardcoded values.

---

## 🎨 Rule 1: Theme System Usage

### ✅ ALWAYS Use CSS Variables from Theme

**Location**: `frontend/eetmad/src/styles/theme/cssVariables.ts`

**Import Pattern**:

```tsx
import { cssVars } from '@/styles/theme';
```

**Usage in Components**:

```tsx
'use client';

import { cssVars } from '@/styles/theme';

export default function MyComponent() {
  return (
    <div
      style={{
        backgroundColor: cssVars.neutral.bg,
        color: cssVars.secondary.DEFAULT,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h1 style={{ color: cssVars.secondary.DEFAULT }}>Title</h1>
      <p style={{ color: cssVars.neutral.textSecondary }}>Description</p>
    </div>
  );
}
```

### ✅ Available CSS Variables

#### Primary Colors

- `cssVars.primary.DEFAULT` - Main primary color
- `cssVars.primary.dark` - Dark variant
- `cssVars.primary.light` - Light variant

#### Secondary Colors

- `cssVars.secondary.DEFAULT` - Main secondary color
- `cssVars.secondary.darker` - Darker variant

#### Accent Colors

- `cssVars.accent.primary` - Primary accent
- `cssVars.accent.secondary` - Secondary accent
- `cssVars.accent.warm` - Warm accent
- `cssVars.accent.light` - Light accent

#### Neutral Colors

- `cssVars.neutral.bg` - Page background
- `cssVars.neutral.surface` - Element surface
- `cssVars.neutral.surfaceAlt` - Alternative surface
- `cssVars.neutral.border` - Border color
- `cssVars.neutral.textMuted` - Muted text
- `cssVars.neutral.textSecondary` - Secondary text

#### Status Colors

- `cssVars.status.success` - Success state
- `cssVars.status.error` - Error state
- `cssVars.status.warning` - Warning state
- `cssVars.status.info` - Info state

#### Gradients

- `cssVars.gradient.gold` - Gold gradient
- `cssVars.gradient.primary` - Primary gradient
- `cssVars.gradient.hero` - Hero section gradient
- `cssVars.gradient.cta` - CTA section gradient

### ✅ Adding Opacity to CSS Variables

Use `color-mix` for opacity:

```tsx
// 95% opacity
style={{
  backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`,
}}

// 20% opacity
style={{
  borderColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 20%, transparent)`,
}}

// 10% opacity
style={{
  backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 10%, transparent)`,
}}
```

### ❌ NEVER Do This

```tsx
// ❌ WRONG - Hardcoded colors
<div style={{ backgroundColor: '#FAF8F1' }}>
<div style={{ color: '#334443' }}>

// ❌ WRONG - Using Tailwind arbitrary values for custom colors
<div className="bg-[#FAF8F1]">
<div className="text-[#334443]">

// ❌ WRONG - Direct rgba values
<div style={{ backgroundColor: 'rgba(51, 68, 67, 0.95)' }}>

// ❌ WRONG - Importing colors directly (use cssVars instead)
import { colors } from '@/styles/theme';
<div style={{ backgroundColor: colors.neutral.bg }}>
```

---

## 🌍 Rule 2: Internationalization (i18n)

### ✅ ALWAYS Use Translations for All Text

**Import Pattern**:

```tsx
import { useTranslations } from 'next-intl';
```

**Usage Pattern**:

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('submitButton')}</button>
    </div>
  );
}
```

### ✅ Translation Namespace Structure

Organize translations by feature/component:

```json
// messages/en.json
{
  "biddingPlatform": {
    "categories": {
      "all": "All",
      "tech": "Technology",
      "design": "Design"
    },
    "projects": {
      "project1": {
        "title": "Project Title",
        "description": "Project Description"
      }
    }
  },
  "nav": {
    "home": "Home",
    "projects": "Projects",
    "myAccount": "My Account"
  }
}
```

### ✅ Using Translations with Variables

```tsx
const t = useTranslations('biddingPlatform');

// Simple variable
t('opportunities.count', { count: filteredProjects.length });

// Multiple variables
t('validation.minLength', { field: 'Password', min: 8 });
```

### ✅ Example from Real Component

Reference: `frontend/eetmad/src/app/[locale]/page.tsx`

```tsx
'use client';

import { useTranslations } from 'next-intl';

function ModernBiddingPlatform() {
  const t = useTranslations('biddingPlatform');

  const categories = [
    { id: 'all', name: t('categories.all'), icon: Package, count: 312 },
    { id: 'tech', name: t('categories.tech'), icon: Code, count: 124 },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: t('projects.project1.title'),
      organization: t('projects.project1.organization'),
      description: t('projects.project1.description'),
    },
  ];

  return (
    <div>
      <h2>{t('opportunities.title')}</h2>
      <p>{t('opportunities.count', { count: filteredProjects.length })}</p>
    </div>
  );
}
```

### ❌ NEVER Do This

```tsx
// ❌ WRONG - Hardcoded text
<h1>Login to Your Account</h1>
<button>Submit</button>

// ❌ WRONG - Mixing languages
<h1>تسجيل الدخول</h1>
<button>Submit</button>

// ❌ WRONG - Using multiple namespaces unnecessarily
const t1 = useTranslations('auth');
const t2 = useTranslations('common');
// Use one namespace per component when possible
```

---

## 🏗️ Rule 3: Component Structure

### ✅ Component File Structure

```
src/components/
├── features/          # Feature-specific components
│   ├── home/
│   ├── projects/
│   └── auth/
├── shared/            # Reusable shared components
│   ├── layouts/
│   ├── forms/
│   └── cards/
└── ui/                # Base UI components
    ├── Button/
    ├── Card/
    └── Input/
```

### ✅ Component Template

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export default function MyComponent({ title, description, onAction }: MyComponentProps) {
  const t = useTranslations('namespace');

  return (
    <div
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h2 style={{ color: cssVars.secondary.DEFAULT }}>{title}</h2>
      {description && <p style={{ color: cssVars.neutral.textSecondary }}>{description}</p>}
      <button
        onClick={onAction}
        style={{
          backgroundColor: cssVars.primary.DEFAULT,
          color: cssVars.neutral.bg,
        }}
      >
        {t('actionButton')}
      </button>
    </div>
  );
}
```

### ✅ Component Naming

- Use PascalCase for component names: `ProjectCard`, `UserProfile`, `SearchBar`
- Use descriptive names that indicate purpose
- Match file name to component name: `ProjectCard.tsx` exports `ProjectCard`

---

## 🎨 Rule 4: Styling Best Practices

### ✅ Use Inline Styles with CSS Variables

Always use inline `style` prop with `cssVars`:

```tsx
<div
  style={{
    backgroundColor: cssVars.neutral.surface,
    color: cssVars.secondary.DEFAULT,
    borderColor: cssVars.neutral.border,
    borderRadius: '1rem', // Use theme radius values when available
  }}
>
```

### ✅ Combine with Tailwind for Layout

Use Tailwind for layout, spacing, and responsive design:

```tsx
<div
  className="container flex items-center justify-between gap-4 py-6"
  style={{
    backgroundColor: cssVars.neutral.bg,
    color: cssVars.secondary.DEFAULT,
  }}
>
```

### ✅ Gradients

Always use gradient CSS variables:

```tsx
<button
  style={{
    background: cssVars.gradient.gold,
    color: cssVars.secondary.DEFAULT,
  }}
>
  {t('buttonText')}
</button>
```

### ✅ Responsive Design

Use Tailwind responsive classes:

```tsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">{/* Content */}</div>
```

### ❌ NEVER Do This

```tsx
// ❌ WRONG - Hardcoded styles
<div style={{ backgroundColor: '#FFFFFF', color: '#334443' }}>

// ❌ WRONG - Using CSS classes for custom colors
<div className="bg-white text-gray-800">

// ❌ WRONG - Mixing hardcoded and theme values
<div style={{
  backgroundColor: cssVars.neutral.surface,
  color: '#334443' // Should use cssVars.secondary.DEFAULT
}}>
```

---

## 🔤 Rule 5: Typography

### ✅ Font Family

Use the theme typography system:

```tsx
import { typography } from '@/styles/theme';

<div style={{ fontFamily: typography.fontFamily.heading }}>
  <h1>Heading</h1>
</div>

<div style={{ fontFamily: typography.fontFamily.body }}>
  <p>Body text</p>
</div>
```

### ✅ Font Sizes

Use Tailwind text size classes:

```tsx
<h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
  {t('title')}
</h1>

<p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
  {t('description')}
</p>
```

---

## 🎭 Rule 6: Animations and Interactions

### ✅ Use Framer Motion

```tsx
import { motion } from 'framer-motion';

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={{
    backgroundColor: cssVars.primary.DEFAULT,
    color: cssVars.neutral.bg,
  }}
>
  {t('buttonText')}
</motion.button>;
```

### ✅ Hover Effects

```tsx
<motion.div
  whileHover={{ y: -8 }}
  style={{
    backgroundColor: cssVars.neutral.surface,
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
  }}
>
  {/* Content */}
</motion.div>
```

---

## 📱 Rule 7: RTL Support

### ✅ RTL-Aware Components

The layout automatically handles RTL based on locale. Use Tailwind's logical properties:

```tsx
// ✅ GOOD - Uses logical properties
<div className="flex items-center gap-4">
  <Icon className="ml-2" /> {/* Will flip in RTL */}
  <span>{t('text')}</span>
</div>

// ✅ GOOD - Use start/end instead of left/right
<div className="ps-4 pe-6"> {/* padding-start, padding-end */}
```

### ✅ Icons and Direction

Icons should automatically flip in RTL. Use Lucide React icons which handle this:

```tsx
import { ChevronRight } from 'lucide-react';

<ChevronRight className="h-5 w-5" /> {/* Will flip in RTL */}
```

---

## ✅ Rule 8: Component Checklist

Before submitting a component, ensure:

- [ ] All text uses `useTranslations` hook
- [ ] All colors use `cssVars` from theme
- [ ] No hardcoded color values
- [ ] Component is properly typed with TypeScript
- [ ] Props interface is defined
- [ ] Component follows naming conventions
- [ ] Responsive design is implemented
- [ ] RTL support is considered
- [ ] Animations use Framer Motion when needed
- [ ] Component is placed in correct directory structure

---

## 📚 Rule 9: Real-World Examples

### Example 1: Simple Card Component

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  onAction?: () => void;
}

export default function Card({ title, description, onAction }: CardProps) {
  const t = useTranslations('common');

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="rounded-2xl border-2 p-6 shadow-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {title}
      </h3>
      <p className="mb-4 text-base" style={{ color: cssVars.neutral.textSecondary }}>
        {description}
      </p>
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="rounded-xl px-6 py-3 font-bold"
          style={{
            backgroundColor: cssVars.primary.DEFAULT,
            color: cssVars.neutral.bg,
          }}
        >
          {t('viewMore')}
        </motion.button>
      )}
    </motion.div>
  );
}
```

### Example 2: Header Component

Reference: `frontend/eetmad/src/components/shared/layouts/Header.tsx`

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Header() {
  const t = useTranslations('nav');

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'projects', href: '/projects' },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-lg"
      style={{
        backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`,
        borderColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 20%, transparent)`,
      }}
    >
      <div className="container">
        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl px-5 py-2.5 font-semibold"
              style={{
                color: cssVars.neutral.textMuted,
                backgroundColor: 'transparent',
              }}
            >
              {t(item.key)}
            </motion.button>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

### Example 3: Button with Gradient

```tsx
'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

interface GradientButtonProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function GradientButton({ onClick, variant = 'primary' }: GradientButtonProps) {
  const t = useTranslations('common');

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="rounded-2xl px-10 py-4 text-lg font-bold shadow-lg"
      style={{
        background: variant === 'primary' ? cssVars.gradient.gold : cssVars.gradient.primary,
        color: cssVars.secondary.DEFAULT,
      }}
    >
      {t('submitButton')}
    </motion.button>
  );
}
```

---

## 🚫 Rule 10: Common Mistakes to Avoid

### ❌ Mistake 1: Hardcoded Colors

```tsx
// ❌ WRONG
<div style={{ backgroundColor: '#FAF8F1' }}>

// ✅ CORRECT
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

### ❌ Mistake 2: Hardcoded Text

```tsx
// ❌ WRONG
<h1>Welcome to the Platform</h1>;

// ✅ CORRECT
const t = useTranslations('home');
<h1>{t('welcomeTitle')}</h1>;
```

### ❌ Mistake 3: Using colors instead of cssVars

```tsx
// ❌ WRONG
import { colors } from '@/styles/theme';
<div style={{ backgroundColor: colors.neutral.bg }}>

// ✅ CORRECT
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

### ❌ Mistake 4: Not Using Translations for Dynamic Content

```tsx
// ❌ WRONG
<p>{projects.length} projects available</p>;

// ✅ CORRECT
const t = useTranslations('projects');
<p>{t('count', { count: projects.length })}</p>;
```

---

## 📖 Reference Files

When building components, reference these files:

1. **Theme System**: `frontend/eetmad/src/styles/theme/`
   - `cssVariables.ts` - CSS variables for colors and gradients
   - `colors.ts` - Color definitions
   - `gradients.ts` - Gradient definitions
   - `typography.ts` - Typography system

2. **Example Components**:
   - `frontend/eetmad/src/app/[locale]/page.tsx` - Main page with i18n and theme usage
   - `frontend/eetmad/src/components/shared/layouts/Header.tsx` - Header component example

3. **Translation Files**:
   - `frontend/eetmad/messages/en.json` - English translations
   - `frontend/eetmad/messages/ar.json` - Arabic translations

---

## 🎯 Quick Reference

| Need            | Use                                              | Never Use              |
| --------------- | ------------------------------------------------ | ---------------------- |
| Page background | `cssVars.neutral.bg`                             | `#FAF8F1`              |
| Card surface    | `cssVars.neutral.surface`                        | `#FFFFFF`              |
| Primary action  | `cssVars.primary.DEFAULT`                        | `#34656D`              |
| Secondary text  | `cssVars.neutral.textSecondary`                  | `#536765`              |
| Border          | `cssVars.neutral.border`                         | `#E0DCC8`              |
| Success state   | `cssVars.status.success`                         | `#3D8B64`              |
| Error state     | `cssVars.status.error`                           | `#C95454`              |
| Gold gradient   | `cssVars.gradient.gold`                          | `linear-gradient(...)` |
| Text content    | `t('key')`                                       | `"Hardcoded text"`     |
| Opacity         | `color-mix(in srgb, ${cssVar} 95%, transparent)` | `rgba(...)`            |

---

## 📝 Summary

1. **Always use `cssVars`** from `@/styles/theme` for all colors and gradients
2. **Always use `useTranslations`** from `next-intl` for all text content
3. **Use inline styles** with CSS variables, combine with Tailwind for layout
4. **Follow component structure** and naming conventions
5. **Ensure RTL support** by using logical properties
6. **Use Framer Motion** for animations and interactions
7. **Reference real examples** from the codebase
8. **Check the checklist** before submitting components

---

**Last Updated**: 2025

**Theme Location**: `frontend/eetmad/src/styles/theme/`

**Example Reference**: `frontend/eetmad/src/app/[locale]/page.tsx`
