# ⚡ Common Fixes - Quick Solutions

**Fast solutions to the most common validation errors**

---

## 🎨 Theme & Color Errors

### Error: "Hardcoded hex color found"

```tsx
// ❌ Error
<div style={{ backgroundColor: '#FAF8F1' }}>

// ✅ Fix
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

**Steps:**

1. Import cssVars: `import { cssVars } from '@/styles/theme';`
2. Find the right variable in [cssVars Reference](./css-vars.md)
3. Replace hex with cssVars

---

### Error: "Hardcoded rgba color found"

```tsx
// ❌ Error
<div style={{ backgroundColor: 'rgba(140, 179, 105, 0.2)' }}>

// ✅ Fix
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.primary.alpha20 }}>
```

**Available opacity variants:**

- `alpha10` = 10%
- `alpha20` = 20%
- `alpha30` = 30%
- `alpha50` = 50%

---

### Error: "Tailwind color class found"

```tsx
// ❌ Error
<div className="bg-white text-gray-800">

// ✅ Fix
import { cssVars } from '@/styles/theme';
<div
  className="p-4"  // Keep layout classes
  style={{
    backgroundColor: cssVars.neutral.surface,
    color: cssVars.text.primary
  }}
>
```

**Keep Tailwind for:**

- Layout: `flex`, `grid`, `p-4`, `m-2`
- Positioning: `absolute`, `relative`, `top-0`
- Sizing: `w-full`, `h-screen`

**Use cssVars for:**

- Colors: backgrounds, text, borders
- Shadows
- Custom values

---

## 🌍 Internationalization (i18n) Errors

### Error: "Hardcoded English text found"

```tsx
// ❌ Error
<h1>Welcome to our platform</h1>
<button>Click here</button>

// ✅ Fix
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('home');  // namespace

  return (
    <>
      <h1>{t('welcomeTitle')}</h1>
      <button>{t('clickButton')}</button>
    </>
  );
}
```

**Steps:**

1. Import useTranslations
2. Call it with namespace: `const t = useTranslations('home')`
3. Add translations to `messages/ar.json` and `messages/en.json`
4. Use `{t('key')}` instead of hardcoded text

---

### Error: "Hardcoded Arabic text found"

```tsx
// ❌ Error
<p>مرحباً بك في المنصة</p>;

// ✅ Fix
const t = useTranslations('home');
<p>{t('welcomeMessage')}</p>;
```

**Add to translation files:**

```json
// messages/ar.json
{
  "home": {
    "welcomeMessage": "مرحباً بك في المنصة"
  }
}

// messages/en.json
{
  "home": {
    "welcomeMessage": "Welcome to the platform"
  }
}
```

---

### Error: "Missing useTranslations import"

```tsx
// ❌ Error - Has text but no translation hook
export default function Component() {
  return <div>Some text</div>;
}

// ✅ Fix
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('namespace');
  return <div>{t('someText')}</div>;
}
```

---

## 🏗️ Component Structure Errors

### Error: "Missing 'use client' directive"

```tsx
// ❌ Error
import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState();
  // ...
}

// ✅ Fix
('use client'); // Add this at the very top!

import { useState } from 'react';

export default function Component() {
  const [state, setState] = useState();
  // ...
}
```

**Add `'use client'` if using:**

- `useState`, `useEffect`, `useRef`
- `useTranslations`, `useRouter`
- Event handlers: `onClick`, `onChange`
- Browser APIs

---

### Error: "Component name doesn't match file name"

```tsx
// ❌ Error
// File: MyComponent.tsx
export default function MyComp() {
  // ...
}

// ✅ Fix - Component name should match file name
// File: MyComponent.tsx
export default function MyComponent() {
  // ...
}
```

---

### Warning: "Props interface not found"

```tsx
// ⚠️ Warning
export default function MyComponent({ title, description }) {
  // ...
}

// ✅ Fix
interface MyComponentProps {
  title: string;
  description?: string; // Optional prop
}

export default function MyComponent({ title, description }: MyComponentProps) {
  // ...
}
```

---

## 🎭 RTL Support Errors

### Error: "Left/Right margin classes found"

```tsx
// ❌ Error
<div className="ml-4 mr-2 pl-6 pr-3">

// ✅ Fix - Use start/end instead
<div className="ms-4 me-2 ps-6 pe-3">
```

**Replacements:**

- `ml-` → `ms-` (margin-start)
- `mr-` → `me-` (margin-end)
- `pl-` → `ps-` (padding-start)
- `pr-` → `pe-` (padding-end)
- `left-` → `start-`
- `right-` → `end-`

---

### Error: "Text alignment classes found"

```tsx
// ❌ Error
<div className="text-left">
<div className="text-right">

// ✅ Fix
<div className="text-start">
<div className="text-end">
```

---

### Error: "Float classes found"

```tsx
// ❌ Error
<img className="float-left" />

// ✅ Fix
<img className="float-start" />
```

---

## 🎬 Animation Errors

### Warning: "CSS animations without framer-motion"

```tsx
// ⚠️ Warning
<div style={{
  transition: 'all 0.3s ease',
  transform: hovering ? 'scale(1.05)' : 'scale(1)'
}}>

// ✅ Fix - Use framer-motion
import { motion } from 'framer-motion';

<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
```

**Common patterns:**

```tsx
// Hover effect
<motion.div whileHover={{ scale: 1.05 }}>

// Tap effect
<motion.button whileTap={{ scale: 0.95 }}>

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// Slide in
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
>
```

---

## 🔧 Import Errors

### Error: "Importing colors from theme"

```tsx
// ❌ Error
import { colors } from '@/styles/theme';

// ✅ Fix
import { cssVars } from '@/styles/theme';
```

---

### Error: "Importing individual color values"

```tsx
// ❌ Error
import { primary, secondary } from '@/styles/colors';

// ✅ Fix
import { cssVars } from '@/styles/theme';
// Then use: cssVars.primary.DEFAULT
```

---

## 🚀 Quick Workflows

### Complete Component Setup

```tsx
'use client'; // 1. Add if using hooks

// 2. Standard imports
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

// 3. Props interface
interface MyComponentProps {
  title: string;
  description?: string;
}

// 4. Component with same name as file
export default function MyComponent({ title, description }: MyComponentProps) {
  // 5. Translation hook
  const t = useTranslations('namespace');

  // 6. State (if needed)
  const [isOpen, setIsOpen] = useState(false);

  // 7. Use cssVars and translations
  return (
    <motion.div
      style={{
        backgroundColor: cssVars.neutral.surface,
        color: cssVars.text.primary,
      }}
      whileHover={{ scale: 1.02 }}
    >
      <h1>{t('title')}</h1>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

---

### Button Component Pattern

```tsx
'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const colors = {
    primary: {
      bg: cssVars.primary.DEFAULT,
      hover: cssVars.primary.hover,
      text: cssVars.text.white,
    },
    secondary: {
      bg: cssVars.neutral.surface,
      hover: cssVars.neutral.hover,
      text: cssVars.text.primary,
    },
  };

  return (
    <motion.button
      onClick={onClick}
      style={{
        backgroundColor: colors[variant].bg,
        color: colors[variant].text,
        padding: '12px 24px',
        borderRadius: cssVars.radius.md,
        border: 'none',
        cursor: 'pointer',
      }}
      whileHover={{
        backgroundColor: colors[variant].hover,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
```

---

## 📋 Before Commit Checklist

Run validation:

```bash
npm run validate:design path/to/file.tsx
```

Manual check:

- [ ] No hardcoded colors (hex, rgb, Tailwind color classes)
- [ ] All text uses `useTranslations`
- [ ] Has `'use client'` if needed
- [ ] Props interface defined
- [ ] RTL-friendly classes (ms/me, not ml/mr)
- [ ] Animations use framer-motion
- [ ] Only imports cssVars from '@/styles/theme'

---

## 🆘 Still Having Issues?

### 1. Check Examples

```bash
# See correct example
cat scripts/examples/test-component-correct.tsx

# See common mistakes
cat scripts/examples/test-component-example.tsx
```

### 2. Run Interactive Menu

```bash
npm run scripts:menu
```

### 3. Check Full Documentation

- [Design Rules Guide](../docs/validation/design-rules.md)
- [cssVars Reference](./css-vars.md)
- [i18n Patterns](./i18n-patterns.md)

---

**⚡ Save this for quick reference during development!**

_Last Updated: November 15, 2025_
