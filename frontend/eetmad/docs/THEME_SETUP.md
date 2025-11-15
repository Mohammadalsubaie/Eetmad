# Theme Setup Documentation

## Overview

This project uses Tailwind CSS v4 with a custom theme system that supports both light and dark modes. The theme is managed through CSS variables and a React Context.

## Architecture

### 1. Theme Configuration Files

#### `src/styles/themes.css`

- Defines all theme variables using HSL color space
- Contains `:root` for light theme
- Contains `.dark` class for dark theme
- Variables follow the pattern: `--color-name: H S% L%;`

#### `src/styles/globals.css`

- Imports Tailwind CSS v4
- Imports theme variables
- Defines Tailwind v4 dark mode variant: `@custom-variant dark (&:where(.dark, .dark *))`
- Contains global styles and transitions

#### `tailwind.config.ts`

- Defines content paths for Tailwind to scan
- Maps CSS variables to Tailwind color utilities using `hsl(var(--variable-name))`
- Defines color scales (50-950) for primary and secondary colors
- Note: In Tailwind v4, theme extension still works but dark mode is configured in CSS

### 2. Theme Context (`src/contexts/ThemeContext.tsx`)

- React Context for theme state management
- Provides `theme`, `setTheme`, and `toggleTheme`
- Syncs with localStorage
- Listens to system theme preference
- Applies `.dark` class to `document.documentElement`

### 3. Root Layout (`src/app/layout.tsx`)

- Includes theme initialization script (runs before React hydration)
- Wraps app with `ThemeProvider`
- Script prevents FOUC (Flash of Unstyled Content) by applying theme class early

## Theme Variables

### Semantic Colors

- `--background`: Main background color
- `--foreground`: Main text color
- `--primary`: Primary brand color
- `--secondary`: Secondary brand color
- `--muted`: Muted/subtle backgrounds
- `--accent`: Accent color
- `--border`: Border color
- `--card`: Card background
- `--popover`: Popover background
- `--destructive`: Error/destructive actions

### Color Scales

- Primary: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
- Secondary: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

## Usage in Components

### Using Theme Colors

```tsx
// Use semantic colors
<div className="bg-background text-foreground">
  <div className="bg-card border-border">
    <p className="text-muted-foreground">Muted text</p>
  </div>
</div>

// Use primary color scale
<button className="bg-primary-600 dark:bg-primary-400 text-primary-foreground">
  Click me
</button>
```

### Dark Mode Variants

```tsx
// Add dark: variant for dark mode specific styles
<div className="bg-white dark:bg-gray-900">
  <p className="text-gray-900 dark:text-gray-100">Content</p>
</div>
```

## Theme Toggle Component

Use the `ThemeToggle` component to allow users to switch themes:

```tsx
import ThemeToggle from '@/components/shared/misc/ThemeToggle';

<ThemeToggle />;
```

## Best Practices

1. **Always use semantic colors** (`bg-background`, `text-foreground`) instead of hardcoded colors
2. **Add dark mode variants** for numeric color scales (e.g., `dark:bg-primary-950`)
3. **Use theme variables** for all colors to ensure consistency
4. **Test both themes** to ensure proper contrast and readability

## Troubleshooting

### Theme not applying

1. Check if `.dark` class is on `<html>` element
2. Verify `@custom-variant dark` is in `globals.css`
3. Ensure theme script runs before hydration
4. Check browser console for errors

### Colors not changing

1. Verify CSS variables are defined in `themes.css`
2. Check if Tailwind config maps variables correctly
3. Ensure components use theme classes, not hardcoded colors
4. Clear browser cache and rebuild

### FOUC (Flash of Unstyled Content)

1. Theme script should run `beforeInteractive`
2. `suppressHydrationWarning` should be on `<html>` and `<body>`
3. Initial theme should be set in the script, not in useEffect

## Tailwind v4 Specific Notes

- Dark mode is configured via `@custom-variant dark` in CSS, not in config
- Theme variables work with `hsl(var(--variable))` syntax
- Content paths are still defined in `tailwind.config.ts`
- Theme extension in config still works for mapping variables

## Future Improvements

- Add theme persistence to user preferences
- Support system theme detection
- Add more theme variants (e.g., high contrast)
- Create theme preview component
