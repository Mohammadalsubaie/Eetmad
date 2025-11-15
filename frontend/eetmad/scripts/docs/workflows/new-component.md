# 🆕 Creating a New Component - Step by Step

**Complete guide for building components that follow all design rules**

---

## 📋 Quick Checklist

Before you start, make sure you have:
- [ ] Component name (PascalCase)
- [ ] Location decided (which feature/folder)
- [ ] Props interface planned
- [ ] Translations keys defined

---

## 🎯 Step-by-Step Guide

### Step 1: Create the File

```bash
# Choose the right location
src/components/
├── common/           # Reusable UI components
├── features/         # Feature-specific components
│   ├── home/
│   ├── auth/
│   └── dashboard/
└── layout/           # Layout components
```

```bash
# Create your component file
# File name MUST match component name
touch src/components/features/yourfeature/YourComponent.tsx
```

---

### Step 2: Set Up Basic Structure

```tsx
'use client';  // ← Add if using hooks or interactivity

import { useState } from 'react';  // ← If needed
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';  // ← For animations
import { cssVars } from '@/styles/theme';

// Props interface
interface YourComponentProps {
  title: string;
  description?: string;  // Optional props with ?
  onAction?: () => void;
}

export default function YourComponent({ 
  title, 
  description,
  onAction 
}: YourComponentProps) {
  // Component logic here
  
  return (
    <div>
      {/* JSX here */}
    </div>
  );
}
```

---

### Step 3: Add Translations

```tsx
export default function YourComponent({ title }: YourComponentProps) {
  // Add translation hook
  const t = useTranslations('yourfeature');  // ← namespace
  
  return (
    <div>
      <h1>{t('componentTitle')}</h1>
      <p>{t('componentDescription')}</p>
    </div>
  );
}
```

**Add to translation files:**

```bash
# Edit both files
code messages/ar.json
code messages/en.json
```

```json
// messages/ar.json
{
  "yourfeature": {
    "componentTitle": "عنوان المكون",
    "componentDescription": "وصف المكون"
  }
}

// messages/en.json
{
  "yourfeature": {
    "componentTitle": "Component Title",
    "componentDescription": "Component Description"
  }
}
```

---

### Step 4: Add Styling

```tsx
export default function YourComponent({ title }: YourComponentProps) {
  const t = useTranslations('yourfeature');
  
  return (
    <div
      className="p-6 rounded-lg"  // ← Tailwind for layout
      style={{
        backgroundColor: cssVars.neutral.surface,  // ← cssVars for colors
        border: `1px solid ${cssVars.neutral.border}`,
        boxShadow: cssVars.shadow.md,
      }}
    >
      <h1
        className="text-2xl font-bold mb-4"  // ← Tailwind for typography
        style={{
          color: cssVars.text.primary,  // ← cssVars for colors
        }}
      >
        {t('componentTitle')}
      </h1>
    </div>
  );
}
```

**Remember:**
- ✅ Use Tailwind for: layout, spacing, sizing
- ✅ Use cssVars for: colors, shadows, custom values
- ❌ Never use: hardcoded hex colors, Tailwind color classes

---

### Step 5: Add Animations (if needed)

```tsx
export default function YourComponent({ title }: YourComponentProps) {
  const t = useTranslations('yourfeature');
  
  return (
    <motion.div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        border: `1px solid ${cssVars.neutral.border}`,
      }}
      initial={{ opacity: 0, y: 20 }}       // ← Entry animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}          // ← Hover effect
    >
      <h1 style={{ color: cssVars.text.primary }}>
        {t('componentTitle')}
      </h1>
    </motion.div>
  );
}
```

---

### Step 6: Add State & Logic (if needed)

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

interface YourComponentProps {
  initialValue?: string;
}

export default function YourComponent({ 
  initialValue = '' 
}: YourComponentProps) {
  const t = useTranslations('yourfeature');
  const [value, setValue] = useState(initialValue);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={t('placeholder')}
        style={{
          backgroundColor: cssVars.neutral.surface,
          color: cssVars.text.primary,
          border: `1px solid ${cssVars.neutral.border}`,
        }}
      />
    </div>
  );
}
```

---

### Step 7: Validate Your Component

```bash
# Run validation
npm run validate:design src/components/features/yourfeature/YourComponent.tsx
```

**Expected output if correct:**

```
✨ رائع! جميع الملفات تتبع قواعد البناء بشكل صحيح
```

**If there are errors:**

1. Read the error messages
2. Check [Common Fixes Guide](../../quick-reference/common-fixes.md)
3. Fix the issues
4. Re-validate

---

### Step 8: Test in Browser

```bash
# Start dev server if not running
npm run dev

# Open browser to test:
# - Visual appearance
# - Functionality
# - Arabic/English switching
# - Mobile responsiveness
# - Hover states
# - Animations
```

---

### Step 9: Document (if complex)

```tsx
/**
 * YourComponent
 * 
 * Description: Brief description of what the component does
 * 
 * @param title - The main title to display
 * @param description - Optional description text
 * @param onAction - Optional callback when action is triggered
 * 
 * @example
 * ```tsx
 * <YourComponent 
 *   title="My Title"
 *   description="My Description"
 *   onAction={() => console.log('Action!')}
 * />
 * ```
 */
export default function YourComponent({ ... }: YourComponentProps) {
  // ...
}
```

---

### Step 10: Commit

```bash
# Stage the file
git add src/components/features/yourfeature/YourComponent.tsx

# Add translation files if created
git add messages/ar.json messages/en.json

# Commit with descriptive message
git commit -m "feat: add YourComponent to yourfeature"
```

---

## 📚 Complete Example

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

interface ServiceCardProps {
  serviceId: string;
  title: string;
  price: number;
  onBook?: (serviceId: string) => void;
}

export default function ServiceCard({
  serviceId,
  title,
  price,
  onBook,
}: ServiceCardProps) {
  const t = useTranslations('services');
  const [isHovered, setIsHovered] = useState(false);
  
  const handleBook = () => {
    if (onBook) {
      onBook(serviceId);
    }
  };
  
  return (
    <motion.div
      className="p-6 rounded-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        border: `1px solid ${cssVars.neutral.border}`,
        boxShadow: isHovered ? cssVars.shadow.lg : cssVars.shadow.md,
        transition: cssVars.transition.base,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <h3
        className="text-xl font-bold mb-2"
        style={{ color: cssVars.text.primary }}
      >
        {title}
      </h3>
      
      <p
        className="text-lg mb-4"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        {price} {t('currency')}
      </p>
      
      <motion.button
        onClick={handleBook}
        className="w-full py-2 px-4 rounded-md"
        style={{
          backgroundColor: cssVars.primary.DEFAULT,
          color: cssVars.text.white,
        }}
        whileHover={{
          backgroundColor: cssVars.primary.hover,
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {t('bookNow')}
      </motion.button>
    </motion.div>
  );
}
```

---

## 🎯 Common Component Patterns

### Button Component

```tsx
'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: {
      bg: cssVars.primary.DEFAULT,
      hover: cssVars.primary.hover,
      text: cssVars.text.white,
    },
    secondary: {
      bg: cssVars.secondary.DEFAULT,
      hover: cssVars.secondary.hover,
      text: cssVars.text.white,
    },
    accent: {
      bg: cssVars.accent.DEFAULT,
      hover: cssVars.accent.hover,
      text: cssVars.text.white,
    },
  };
  
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 rounded-md font-medium"
      style={{
        backgroundColor: variants[variant].bg,
        color: variants[variant].text,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      whileHover={!disabled ? {
        backgroundColor: variants[variant].hover,
        scale: 1.02,
      } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
}
```

### Card Component

```tsx
'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export default function Card({
  children,
  hoverable = false,
  className = '',
}: CardProps) {
  return (
    <motion.div
      className={`p-6 rounded-lg ${className}`}
      style={{
        backgroundColor: cssVars.neutral.surface,
        border: `1px solid ${cssVars.neutral.border}`,
        boxShadow: cssVars.shadow.md,
      }}
      whileHover={hoverable ? {
        y: -4,
        boxShadow: cssVars.shadow.lg,
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## ⚠️ Common Mistakes to Avoid

### ❌ Mistake 1: Hardcoded Colors

```tsx
// WRONG
<div style={{ backgroundColor: '#FAF8F1' }}>

// RIGHT
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

### ❌ Mistake 2: Hardcoded Text

```tsx
// WRONG
<h1>Welcome</h1>

// RIGHT
const t = useTranslations('home');
<h1>{t('welcome')}</h1>
```

### ❌ Mistake 3: Missing 'use client'

```tsx
// WRONG - Will cause errors
import { useState } from 'react';
export default function Component() { ... }

// RIGHT
'use client';
import { useState } from 'react';
export default function Component() { ... }
```

### ❌ Mistake 4: Not RTL-friendly

```tsx
// WRONG
<div className="ml-4 text-left">

// RIGHT
<div className="ms-4 text-start">
```

---

## 🔗 Related Resources

- [Design Rules Cheat Sheet](../../quick-reference/design-rules.md)
- [cssVars Reference](../../quick-reference/css-vars.md)
- [Common Fixes](../../quick-reference/common-fixes.md)
- [i18n Patterns](../../quick-reference/i18n-patterns.md)
- [Correct Component Example](../../examples/test-component-correct.tsx)

---

**🎉 You're ready to build great components!**

*Last Updated: November 15, 2025*

