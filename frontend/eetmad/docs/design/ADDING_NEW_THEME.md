# Adding a New Theme

This guide explains how to add a new theme to the application.

## Quick Start (Using Helper Script)

If you've already created the theme CSS file in `docs/design/themes/`, you can use the helper script:

```bash
cd frontend/eetmad
./scripts/add-theme.sh 16
```

This script will:

- ✅ Copy the theme file to `public/themes/`
- ✅ Extract the color palette automatically
- ✅ Show you exactly what to add to the code files

Then just follow the "Next steps" shown by the script.

## Manual Steps

If you prefer to do it manually or the script doesn't work:

### 1. Create the Theme CSS File

Create a new CSS file in `docs/design/themes/` following the naming convention:

- `option16.css` (if you have 15 themes, the next would be 16)
- `option17.css`, etc.

The file should follow the same structure as existing theme files:

- `:root` selector with light theme variables
- `.dark` selector with dark theme variables
- All the same CSS variables as other themes

### 2. Copy Theme File to Public Directory

**Option A: Use the helper script (recommended)**

```bash
./scripts/add-theme.sh 16
```

**Option B: Manual copy**

```bash
cp docs/design/themes/option16.css public/themes/option16.css
```

Or copy all theme files at once:

```bash
cp docs/design/themes/*.css public/themes/
```

### 3. Update Theme Count

Update the theme count in `src/lib/utils/themeLoader.ts`:

```typescript
export function getAvailableThemes(): ThemeOption[] {
  return Array.from({ length: 16 }, (_, i) => `option${i + 1}` as ThemeOption);
  //                                 ^^ Change this number to match your total theme count
}
```

### 4. Extract and Add Color Palette

Extract the 4 key colors from your new theme CSS file:

1. **Primary color**: `--color-primary` value
2. **Accent color**: `--color-accent` value
3. **Background color**: `--color-neutral-bg` value
4. **Text color**: `--color-neutral-darker` value

You can extract them using this command:

```bash
cd docs/design/themes
grep -A 1 "^\s*--color-primary:" option16.css | head -1 | sed 's/.*: //; s/;.*//'
grep -A 1 "^\s*--color-accent:" option16.css | head -1 | sed 's/.*: //; s/;.*//'
grep -A 1 "^\s*--color-neutral-bg:" option16.css | head -1 | sed 's/.*: //; s/;.*//'
grep -A 1 "^\s*--color-neutral-darker:" option16.css | head -1 | sed 's/.*: //; s/;.*//'
```

### 5. Add Color Palette to themeColors.ts

Add the new theme's color palette to `src/lib/utils/themeColors.ts`:

```typescript
export const themeColorPalettes: Record<string, ThemeColors> = {
  // ... existing themes ...
  option16: {
    primary: '#YOUR_PRIMARY_COLOR',
    accent: '#YOUR_ACCENT_COLOR',
    background: '#YOUR_BACKGROUND_COLOR',
    text: '#YOUR_TEXT_COLOR',
  },
};
```

## Quick Reference

**Files to update:**

1. ✅ Create: `docs/design/themes/optionX.css`
2. ✅ Copy: `public/themes/optionX.css`
3. ✅ Update: `src/lib/utils/themeLoader.ts` (theme count)
4. ✅ Update: `src/lib/utils/themeColors.ts` (color palette)

**Example for option16:**

```typescript
// themeLoader.ts
export function getAvailableThemes(): ThemeOption[] {
  return Array.from({ length: 16 }, (_, i) => `option${i + 1}` as ThemeOption);
}

// themeColors.ts
option16: {
  primary: '#34656d',
  accent: '#faeab1',
  background: '#faf8f1',
  text: '#ffffff',
},
```

## Verification

After adding a new theme:

1. Start the development server
2. Open the Theme Switcher (palette icon in dev mode)
3. Verify the new theme appears in the list
4. Verify the color palette preview shows correctly
5. Click the theme to verify it loads and applies correctly
6. Test both light and dark modes

## Notes

- Theme files must follow the exact same CSS variable structure as existing themes
- The theme name must follow the pattern `option{NUMBER}` (e.g., `option16`, `option17`)
- Color palettes are used for preview only - the actual theme CSS file contains all the colors
- The theme switcher only appears in development mode
