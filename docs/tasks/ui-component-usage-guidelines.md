# 🎨 UI Component Usage Guidelines

**Branch:** `refactor/components-reusability`  
**Status:** MANDATORY - All components must follow these patterns

---

## ⚠️ CRITICAL: Import Pattern Rules

### Rule 1: Always Import from Index

**MANDATORY:** All UI components MUST be imported from `@/components/ui` (the index file)

**✅ CORRECT:**
```tsx
import { Button, Card, Input, LoadingSpinner, EmptyState, ErrorMessage } from '@/components/ui';
```

**❌ FORBIDDEN:**
```tsx
// ❌ Direct file imports
import Button from '@/components/ui/Button/Button';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import EmptyState from '@/components/ui/EmptyState';
```

### Rule 2: Use Named Exports

**MANDATORY:** All UI components are exported as named exports from the index

**✅ CORRECT:**
```tsx
import { Button, LoadingSpinner, EmptyState } from '@/components/ui';
```

**❌ FORBIDDEN:**
```tsx
// ❌ Default imports from index
import Button from '@/components/ui';
```

---

## 📦 Available UI Components

### Core Components
- `Button` - Button component
- `Card` - Card component
- `Input` - Input field component
- `Badge` - Badge component
- `Tag` - Tag component
- `IconContainer` - Icon container component

### Section Components
- `SectionBadge` - Badge for section headers
- `SectionHeader` - Complete section header
- `GradientIcon` - Icon with gradient background
- `FeatureCard` - Feature card component

### Data Display Components
- `LoadingSpinner` - Loading indicator
- `EmptyState` - Empty state display
- `ErrorMessage` - Error message display
- `DataTable` - Data table component
- `StatCard` - Statistics card
- `SkeletonCard` - Loading skeleton
- `ProgressBar` - Progress bar
- `Timeline` - Timeline component

---

## 🔄 Import Examples

### Single Component
```tsx
import { Button } from '@/components/ui';

<Button>Click me</Button>
```

### Multiple Components
```tsx
import { Button, Card, Input, LoadingSpinner } from '@/components/ui';

<div>
  <Card>
    <Input />
    <Button>Submit</Button>
  </Card>
  <LoadingSpinner />
</div>
```

### With Types
```tsx
import { Button, type ButtonProps } from '@/components/ui';

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
};
```

---

## ✅ Benefits of This Pattern

1. **Consistency** - All imports follow the same pattern
2. **Refactoring** - Easy to move/rename components
3. **Tree Shaking** - Better bundle optimization
4. **Discoverability** - All components visible in one place
5. **Maintainability** - Single source of truth for exports

---

## 🚫 Common Mistakes

### Mistake 1: Direct File Imports
```tsx
// ❌ WRONG
import Button from '@/components/ui/Button/Button';
```

**Fix:**
```tsx
// ✅ CORRECT
import { Button } from '@/components/ui';
```

### Mistake 2: Mixed Import Patterns
```tsx
// ❌ WRONG - Inconsistent
import { Button } from '@/components/ui';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
```

**Fix:**
```tsx
// ✅ CORRECT - Consistent
import { Button, LoadingSpinner } from '@/components/ui';
```

### Mistake 3: Importing from Subdirectories
```tsx
// ❌ WRONG
import { Button } from '@/components/ui/Button';
```

**Fix:**
```tsx
// ✅ CORRECT
import { Button } from '@/components/ui';
```

---

## 📋 Validation Checklist

Before committing, verify:

- [ ] All UI components imported from `@/components/ui`
- [ ] No direct file path imports
- [ ] Using named exports (not default)
- [ ] Consistent import pattern across all files
- [ ] No mixed import patterns

---

## 🔍 How to Check

### Find Violations
```bash
# Find direct file imports
grep -r "from '@/components/ui/" src/components/features

# Should return empty or only show legitimate cases
```

### Verify Exports
```bash
# Check what's exported
cat frontend/eetmad/src/components/ui/index.ts
```

---

## 📝 Notes

- **This pattern is MANDATORY** - no exceptions
- **All new components** must be added to index.ts
- **All imports** must use the index
- **Refactoring** is easier with this pattern

---

**Last Updated:** 2025-01-27  
**Enforcement:** STRICT - Violations will cause rejection

