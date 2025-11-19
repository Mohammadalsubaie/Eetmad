I'll create a comprehensive rules file for AI to properly handle your theme system.

````markdown
// THEME_RULES.md

# Theme System Rules for AI Development

## Overview

This project uses a CSS variable-based theme system with support for light and dark modes. All components MUST use semantic color tokens, never hardcoded color values.

## Core Principles

### ✅ DO: Use Semantic Tokens

```tsx
// Correct
<div className="bg-primary text-primary-foreground">
<div className="bg-card text-card-foreground border border-border">
<div className="bg-secondary text-secondary-foreground">
<div className="bg-accent text-accent-foreground">
<div className="bg-muted text-muted-foreground">
<p className="text-success">Success message</p>
<p className="text-warning">Warning message</p>
<p className="text-destructive">Error message</p>
```
````

### ❌ DON'T: Use Hardcoded Colors

```tsx
// Wrong - Never do this
<div className="bg-blue-600 text-white">
<div className="bg-slate-100 text-gray-900">
<div className="from-primary-600 to-primary-800">
<p className="text-green-500">
<p className="text-red-600">
```

## Available Theme Tokens

### Background Colors

- `bg-background` - Main page background
- `bg-foreground` - Inverted background (rarely used)
- `bg-card` - Card/panel background
- `bg-popover` - Popover/dropdown background
- `bg-primary` - Primary brand color background
- `bg-secondary` - Secondary brand color background
- `bg-muted` - Muted/subdued background
- `bg-accent` - Accent color background
- `bg-destructive` - Error/danger background

### Text Colors

- `text-foreground` - Default text color
- `text-background` - Inverted text (rarely used)
- `text-card-foreground` - Text on card backgrounds
- `text-popover-foreground` - Text on popover backgrounds
- `text-primary` - Primary brand color text
- `text-primary-foreground` - Text on primary backgrounds
- `text-secondary` - Secondary brand color text
- `text-secondary-foreground` - Text on secondary backgrounds
- `text-muted-foreground` - Muted/secondary text
- `text-accent-foreground` - Text on accent backgrounds
- `text-destructive` - Error/danger text
- `text-destructive-foreground` - Text on destructive backgrounds
- `text-success` - Success message text
- `text-warning` - Warning message text
- `text-info` - Info message text

### Border Colors

- `border-border` - Default border color
- `border-input` - Input field border

### Ring Colors (for focus states)

- `ring-ring` - Focus ring color

## Opacity Modifiers

When you need color variations, use opacity modifiers instead of color shades:

### ✅ DO: Use Opacity

```tsx
// Correct
<div className="bg-primary/10">         // 10% opacity
<div className="bg-primary/20">         // 20% opacity
<div className="bg-card/50">            // 50% opacity
<div className="text-foreground/70">    // 70% opacity
<div className="border-border/30">      // 30% opacity
```

### ❌ DON'T: Use Color Shades

```tsx
// Wrong
<div className="bg-primary-100">
<div className="bg-primary-200">
<div className="text-gray-500">
<div className="border-slate-300">
```

## Common Patterns

### Cards and Panels

```tsx
<div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
  <h3 className="font-bold text-foreground">Title</h3>
  <p className="text-muted-foreground">Description</p>
</div>
```

### Buttons with Theme

```tsx
// Primary button
<Button className="bg-primary text-primary-foreground hover:bg-primary/90">

// Secondary button
<Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">

// Outline button that respects theme
<Button variant="outline" className="border-border text-foreground hover:bg-accent">
```

### Hero Sections / Colored Backgrounds

```tsx
<section className="bg-primary text-primary-foreground">
  <h1 className="text-primary-foreground">Hero Title</h1>
  <p className="opacity-90">Hero description with slight transparency</p>

  {/* Nested card on colored background */}
  <div className="border border-border bg-card text-card-foreground">Content</div>
</section>
```

### Glass Morphism Effects

```tsx
<div className="border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm">
  Glass effect content
</div>
```

### Status Messages

```tsx
<div className="text-success">✓ Operation successful</div>
<div className="text-warning">⚠ Warning message</div>
<div className="text-destructive">✗ Error occurred</div>
<div className="text-info">ℹ Information</div>
```

### Gradients

When gradients are needed, use opacity variations:

```tsx
// Subtle gradient with theme colors
<div className="bg-gradient-to-r from-primary to-primary/80">

// Avoid hardcoded gradient colors
// ❌ from-blue-600 to-purple-600
```

## Interactive States

### Hover States

```tsx
<button className="bg-primary hover:bg-primary/90">
<div className="bg-card hover:bg-accent/50">
<a className="text-foreground hover:text-primary">
```

### Focus States

```tsx
<input className="border-input focus:ring-ring focus:border-primary">
<button className="focus-visible:ring-2 focus-visible:ring-ring">
```

### Active/Selected States

```tsx
<div className="bg-accent text-accent-foreground">  // Selected state
<div className="bg-muted text-muted-foreground">    // Inactive state
```

## Dark Mode Considerations

### DO NOT use dark: variants for theme colors

The theme system handles dark mode automatically through CSS variables.

### ❌ WRONG

```tsx
<div className="bg-white dark:bg-gray-900">
<div className="text-gray-900 dark:text-white">
<div className="bg-blue-600 dark:bg-blue-400">
```

### ✅ CORRECT

```tsx
<div className="bg-background">
<div className="text-foreground">
<div className="bg-primary">
```

The only time to use `dark:` is for utility classes that aren't color-related:

```tsx
// OK to use dark: for non-color utilities
<div className="text-sm dark:text-base">
<div className="p-4 dark:p-6">
```

## Component-Specific Guidelines

### Forms

```tsx
<Input className="bg-background border-input text-foreground placeholder:text-muted-foreground focus:ring-ring" />
<Label className="text-foreground" />
<FormDescription className="text-muted-foreground" />
<FormMessage className="text-destructive" />
```

### Navigation

```tsx
// Active nav item
<a className="bg-accent text-accent-foreground">

// Inactive nav item
<a className="text-muted-foreground hover:text-foreground hover:bg-accent/50">
```

### Tables

```tsx
<Table className="border-border">
  <TableHeader className="bg-muted">
    <TableHead className="text-muted-foreground">Header</TableHead>
  </TableHeader>
  <TableBody>
    <TableRow className="border-border hover:bg-muted/50">
      <TableCell className="text-foreground">Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Badges/Tags

```tsx
<Badge className="bg-primary text-primary-foreground">Primary</Badge>
<Badge className="bg-secondary text-secondary-foreground">Secondary</Badge>
<Badge className="bg-muted text-muted-foreground">Muted</Badge>
<Badge className="bg-destructive text-destructive-foreground">Error</Badge>
```

### Modals/Dialogs

```tsx
<Dialog>
  <DialogContent className="border-border bg-card text-card-foreground">
    <DialogHeader>
      <DialogTitle className="text-foreground">Title</DialogTitle>
      <DialogDescription className="text-muted-foreground">Description</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Testing Theme Compliance

Before submitting any component, verify:

1. ✅ No hardcoded color classes (blue-600, gray-100, etc.)
2. ✅ Uses only semantic tokens (primary, secondary, muted, etc.)
3. ✅ Uses opacity modifiers for variations (/10, /20, /50, etc.)
4. ✅ No dark: variants for colors
5. ✅ Component works in both light and dark modes
6. ✅ Text is readable on all backgrounds
7. ✅ Borders are visible but subtle

## Quick Reference Chart

| Need              | Use                                  | Don't Use                              |
| ----------------- | ------------------------------------ | -------------------------------------- |
| Main background   | `bg-background`                      | `bg-white dark:bg-gray-900`            |
| Card background   | `bg-card`                            | `bg-gray-50 dark:bg-gray-800`          |
| Primary button    | `bg-primary text-primary-foreground` | `bg-blue-600 text-white`               |
| Secondary text    | `text-muted-foreground`              | `text-gray-500 dark:text-gray-400`     |
| Border            | `border-border`                      | `border-gray-200 dark:border-gray-700` |
| Success           | `text-success`                       | `text-green-600 dark:text-green-400`   |
| Error             | `text-destructive`                   | `text-red-600 dark:text-red-400`       |
| Subtle background | `bg-muted`                           | `bg-gray-100 dark:bg-gray-800`         |
| Light overlay     | `bg-primary/10`                      | `bg-primary-100`                       |

## RTL Support

The theme works with RTL (right-to-left) layouts. Use logical properties:

```tsx
// ✅ Good - uses logical properties
<div className="ps-4 pe-8">  // padding-inline-start, padding-inline-end
<div className="ms-auto">    // margin-inline-start

// ❌ Avoid - uses physical properties
<div className="pl-4 pr-8">
<div className="ml-auto">
```

## Summary

**Golden Rule**: If you're typing a color name or number (blue, gray, 100, 600, etc.), you're probably doing it wrong. Use semantic tokens instead!

This ensures:

- ✨ Consistent theming across the app
- 🌓 Automatic dark mode support
- 🎨 Easy theme customization
- ♿ Better accessibility
- 🔧 Easier maintenance

```

This rules file provides:

1. **Clear DO/DON'T examples** for every scenario
2. **Complete token reference** for all available theme variables
3. **Common patterns** for typical UI components
4. **Dark mode guidelines** explaining why to avoid `dark:` variants
5. **Component-specific examples** for forms, navigation, tables, etc.
6. **Testing checklist** to verify theme compliance
7. **Quick reference chart** for common use cases
8. **RTL support** considerations

You can place this file in your project root or docs folder and reference it when working with AI assistants to ensure consistent theme usage.
```
