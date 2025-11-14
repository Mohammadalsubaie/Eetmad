# Design Documentation

## 📖 Current Guidelines

**👉 [Component Building Guidelines](./component-building-guidelines.md)** - **START HERE**

This is the main guide for building components. It includes:

- Theme system usage (`cssVars` from `frontend/eetmad/src/styles/theme`)
- Internationalization (i18n) with `next-intl`
- Component structure and best practices
- Real-world examples from the codebase
- Common mistakes to avoid

## 📚 Documentation Files

### Active Documentation

- **[component-building-guidelines.md](./component-building-guidelines.md)** ⭐
  - Complete guide for building components
  - Theme system usage with `cssVars`
  - i18n patterns with `useTranslations`
  - Component templates and examples
  - **This is the document you should follow**

### Legacy Documentation (Historical Reference)

- **[design-analysis.md](./design-analysis.md)**
  - ⚠️ **Outdated** - Kept for historical reference
  - Contains old design specifications
  - See component-building-guidelines.md for current practices

- **[theme-usage-guide.md](./theme-usage-guide.md)**
  - ⚠️ **Outdated** - Shows old way of using theme
  - Now use `cssVars` instead of direct `colors` import
  - See component-building-guidelines.md for current practices

- **[samplepage.tsx](./samplepage.tsx)**
  - ⚠️ **Outdated** - Old example with hardcoded values
  - See `frontend/eetmad/src/app/[locale]/page.tsx` for current example

## 🎨 Theme System Location

**Current Theme**: `frontend/eetmad/src/styles/theme/`

```
frontend/eetmad/src/styles/theme/
├── index.ts          # Main exports
├── cssVariables.ts   # CSS variables (USE THIS)
├── colors.ts         # Color definitions
├── gradients.ts      # Gradient definitions
├── radius.ts         # Border radius values
├── shadows.ts        # Shadow definitions
├── spacing.ts        # Spacing scale
└── typography.ts     # Typography system
```

## 🌍 Internationalization

**Translation Files**: `frontend/eetmad/messages/`

- `en.json` - English translations
- `ar.json` - Arabic translations

**Usage**: Always use `useTranslations` from `next-intl`

## 📝 Quick Start

1. Read [component-building-guidelines.md](./component-building-guidelines.md)
2. Check example: `frontend/eetmad/src/app/[locale]/page.tsx`
3. Reference theme: `frontend/eetmad/src/styles/theme/cssVariables.ts`
4. Follow the rules and examples in the guidelines

## 🔗 Related Documentation

- Project Structure: `../structure/structure.md`
- Frontend Structure: `../structure/frontendStructure.md`
- Development Setup: `../../docs/development-setup.md`

---

**Last Updated**: 2025
