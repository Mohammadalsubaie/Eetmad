# 🎨 cssVars - Complete Reference

**Quick lookup for all theme variables**

---

## 📦 Import

```typescript
import { cssVars } from '@/styles/theme';
```

---

## 🎨 Color System

### Neutral (Backgrounds & Structural)

```typescript
cssVars.neutral.bg; // #FAF8F1  - Main page background
cssVars.neutral.surface; // #FFFFFF  - Cards, modals, panels
cssVars.neutral.border; // #E5E5E5  - Borders, dividers
cssVars.neutral.hover; // #F5F5F5  - Hover backgrounds
```

**Use for:**

- Page backgrounds
- Card/modal surfaces
- Borders and dividers
- Subtle hover effects

---

### Primary (Brand Green)

```typescript
cssVars.primary.DEFAULT; // #8CB369  - Main brand color
cssVars.primary.hover; // #7A9E5C  - Hover state
cssVars.primary.active; // #6B8A50  - Active/pressed state

// With opacity
cssVars.primary.alpha10; // 10% opacity - Very subtle tint
cssVars.primary.alpha20; // 20% opacity - Light backgrounds
cssVars.primary.alpha30; // 30% opacity
cssVars.primary.alpha50; // 50% opacity
```

**Use for:**

- Primary buttons
- Active states
- Success indicators
- Brand elements

---

### Secondary (Dark Text & Elements)

```typescript
cssVars.secondary.DEFAULT; // #334443  - Main dark color
cssVars.secondary.hover; // #2A3938  - Hover state
cssVars.secondary.active; // #222F2E  - Active state

// With opacity (for text hierarchy)
cssVars.secondary.muted; // 70% opacity - Secondary text
cssVars.secondary.subtle; // 40% opacity - Tertiary text
cssVars.secondary.alpha10; // 10% opacity
cssVars.secondary.alpha20; // 20% opacity
```

**Use for:**

- Body text
- Headings
- Icons
- Secondary buttons

---

### Accent (Terracotta/Orange)

```typescript
cssVars.accent.DEFAULT; // #CE7935  - Main accent
cssVars.accent.hover; // #B86B2F  - Hover state
cssVars.accent.active; // #A45E29  - Active state

// With opacity
cssVars.accent.alpha10; // 10% opacity
cssVars.accent.alpha20; // 20% opacity
cssVars.accent.alpha30; // 30% opacity
```

**Use for:**

- Highlights
- Badges
- Notifications
- Call-to-action elements

---

### Semantic Colors

```typescript
// Success (Green variations)
cssVars.success.DEFAULT; // Success messages
cssVars.success.light; // Light success backgrounds
cssVars.success.dark; // Strong success

// Error (Red)
cssVars.error.DEFAULT; // #DC2626
cssVars.error.light; // Light error backgrounds
cssVars.error.dark; // Strong error

// Warning (Yellow/Orange)
cssVars.warning.DEFAULT; // #F59E0B
cssVars.warning.light; // Light warning backgrounds
cssVars.warning.dark; // Strong warning

// Info (Blue)
cssVars.info.DEFAULT; // #3B82F6
cssVars.info.light; // Light info backgrounds
cssVars.info.dark; // Strong info
```

---

## 📝 Typography

### Text Colors

```typescript
cssVars.text.primary; // Main text color
cssVars.text.secondary; // Secondary text
cssVars.text.muted; // Muted/less important text
cssVars.text.subtle; // Very subtle text
cssVars.text.white; // White text (for dark backgrounds)
cssVars.text.disabled; // Disabled state text
```

### Font Families

```typescript
cssVars.font.sans; // 'Cairo', system-ui, sans-serif
cssVars.font.mono; // Monospace font
```

---

## 🎭 Effects

### Shadows

```typescript
cssVars.shadow.sm; // Small shadow (subtle elevation)
cssVars.shadow.md; // Medium shadow (cards)
cssVars.shadow.lg; // Large shadow (modals)
cssVars.shadow.xl; // Extra large shadow
cssVars.shadow.green; // Green glow effect
cssVars.shadow.hover; // Hover state shadow
```

### Border Radius

```typescript
cssVars.radius.sm; // 4px  - Small elements
cssVars.radius.md; // 8px  - Buttons, inputs
cssVars.radius.lg; // 12px - Cards
cssVars.radius.xl; // 16px - Large cards
cssVars.radius.full; // 9999px - Pills, avatars
```

### Transitions

```typescript
cssVars.transition.fast; // 150ms
cssVars.transition.base; // 200ms
cssVars.transition.slow; // 300ms
```

---

## 💡 Usage Examples

### Button (Primary)

```tsx
<button
  style={{
    backgroundColor: cssVars.primary.DEFAULT,
    color: cssVars.text.white,
    padding: '12px 24px',
    borderRadius: cssVars.radius.md,
    boxShadow: cssVars.shadow.sm,
    transition: cssVars.transition.base,
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = cssVars.primary.hover;
    e.currentTarget.style.boxShadow = cssVars.shadow.md;
  }}
>
  Click Me
</button>
```

### Card

```tsx
<div
  style={{
    backgroundColor: cssVars.neutral.surface,
    border: `1px solid ${cssVars.neutral.border}`,
    borderRadius: cssVars.radius.lg,
    padding: '24px',
    boxShadow: cssVars.shadow.md,
  }}
>
  <h3 style={{ color: cssVars.text.primary }}>Card Title</h3>
  <p style={{ color: cssVars.text.secondary }}>Card content...</p>
</div>
```

### Badge

```tsx
<span
  style={{
    backgroundColor: cssVars.accent.alpha20,
    color: cssVars.accent.DEFAULT,
    padding: '4px 12px',
    borderRadius: cssVars.radius.full,
    fontSize: '12px',
    fontWeight: 600,
  }}
>
  New
</span>
```

### Success Message

```tsx
<div
  style={{
    backgroundColor: cssVars.success.light,
    color: cssVars.success.dark,
    border: `1px solid ${cssVars.success.DEFAULT}`,
    borderRadius: cssVars.radius.md,
    padding: '16px',
  }}
>
  ✓ Success! Your changes have been saved.
</div>
```

### Text Hierarchy

```tsx
<div>
  <h1 style={{ color: cssVars.text.primary }}>Main Heading</h1>
  <p style={{ color: cssVars.text.secondary }}>Important body text</p>
  <p style={{ color: cssVars.text.muted }}>Less important details</p>
  <p style={{ color: cssVars.text.subtle }}>Very subtle information</p>
</div>
```

---

## 🎯 Quick Decision Guide

### Choosing Background Colors

| Use Case        | Color      | Variable                  |
| --------------- | ---------- | ------------------------- |
| Page background | Warm beige | `cssVars.neutral.bg`      |
| Card/Modal      | White      | `cssVars.neutral.surface` |
| Hover effect    | Light gray | `cssVars.neutral.hover`   |
| Primary button  | Green      | `cssVars.primary.DEFAULT` |
| Accent area     | Terracotta | `cssVars.accent.DEFAULT`  |

### Choosing Text Colors

| Content Type | Color      | Variable                 |
| ------------ | ---------- | ------------------------ |
| Headings     | Dark       | `cssVars.text.primary`   |
| Body text    | Dark       | `cssVars.text.secondary` |
| Captions     | Gray       | `cssVars.text.muted`     |
| Placeholders | Light gray | `cssVars.text.subtle`    |
| On dark bg   | White      | `cssVars.text.white`     |

### Choosing Shadows

| Element      | Shadow | Variable               |
| ------------ | ------ | ---------------------- |
| Button       | Small  | `cssVars.shadow.sm`    |
| Card         | Medium | `cssVars.shadow.md`    |
| Modal/Dialog | Large  | `cssVars.shadow.lg`    |
| Dropdown     | Large  | `cssVars.shadow.lg`    |
| Hover state  | Hover  | `cssVars.shadow.hover` |

---

## ⚡ Pro Tips

### 1. Use Opacity Variants

```tsx
// Instead of defining new colors
background: cssVars.primary.alpha20; // ✅

// Avoid inline rgba
background: 'rgba(140, 179, 105, 0.2)'; // ❌
```

### 2. Consistent Shadows

```tsx
// Good - consistent elevation
boxShadow: cssVars.shadow.md; // ✅

// Bad - custom shadows
boxShadow: '0 2px 4px rgba(0,0,0,0.1)'; // ❌
```

### 3. Semantic Over Specific

```tsx
// Good - semantic meaning
color: cssVars.text.primary; // ✅

// Avoid - too specific
color: cssVars.secondary.DEFAULT; // Less clear intent
```

---

## 🚫 Never Do This

```tsx
// ❌ Hardcoded colors
backgroundColor: '#FAF8F1';
color: '#334443';

// ❌ Tailwind color classes for project colors
className = 'bg-white text-gray-800';

// ❌ Custom rgba values
background: 'rgba(140, 179, 105, 0.2)';

// ✅ Always use cssVars
backgroundColor: cssVars.neutral.bg;
color: cssVars.text.primary;
background: cssVars.primary.alpha20;
```

---

## 🔗 Related

- [Design Rules Quick Reference](./design-rules.md)
- [Complete Theme Documentation](../docs/validation/design-rules.md)
- [Correct Component Example](../examples/test-component-correct.tsx)

---

**💾 Bookmark this page for quick lookups!**

_Last Updated: November 15, 2025_
