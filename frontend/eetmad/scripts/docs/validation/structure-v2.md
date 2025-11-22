# Component & Page Structure Analyzer v2

This is a complete rebuild of the structure analyzer from scratch, designed to fix critical issues in v1.

## What's New in v2

### ✅ Fixed Issues

1. **Hook Detection**: Now properly tracks hooks exports (e.g., `useTableColumns`, `useOffersTableColumns`)
2. **Nested Component Usage**: Tracks component usage in imported components recursively
3. **Link Detection**: Finds links in nested components, not just in pages
4. **Export Tracking**: Better understanding of re-exports, named exports, and default exports
5. **Accurate Statistics**: More accurate usage statistics and health scores

### 🔧 Key Improvements

- **Recursive Analysis**: Traverses imported components to find actual usage
- **Export Types**: Distinguishes between default exports, named exports, hooks, and types
- **Better Path Resolution**: Improved handling of path aliases and index files
- **Comprehensive Link Tracking**: Finds links in component hierarchies

## Usage

Run the v2 analyzer:

```bash
npm run analyze:structure:v2
```

Or directly with tsx:

```bash
tsx scripts/src/analysis/analyze-structure-v2.ts
```

## Report Output

The report is saved to `scripts/structure-analysis-report-v2.txt` and includes:

1. **Structure Health Score** - Overall health indicator (0-100)
2. **Component Statistics** - Distribution and usage metrics by export
3. **Page Statistics** - Route groups and page counts
4. **Unused Exports** - Exports that appear to be unused (not just components)
5. **Most Used Exports** - Top 10 most frequently used exports
6. **Page Connectivity** - Pages with most links and isolated pages
7. **Component Usage by Page** - Detailed breakdown per page

## Differences from v1

### v1 Issues Fixed

- ❌ v1: Marked `useCategoriesTableColumns` as unused → ✅ v2: Correctly detects it's used
- ❌ v1: Marked `RegisterFormFields` as unused → ✅ v2: Correctly detects it's used
- ❌ v1: Only found links in pages → ✅ v2: Finds links in imported components
- ❌ v1: Missed hook usage → ✅ v2: Properly tracks hook calls

### Statistics Comparison

- **Exports tracked**: v1 tracked component names only, v2 tracks all exports (default, named, hooks)
- **Usage detection**: v1 only checked pages, v2 checks recursively through components
- **Link detection**: v1 only checked pages, v2 checks imported components

## Understanding the Report

### Export vs Component

v2 tracks **exports** rather than just component names. This means:

- A single file can export multiple things (default component, hooks, types)
- Each export is tracked separately
- Unused exports are identified even if the file has other used exports

### Health Score

The health score is calculated based on:

- **Issues** (broken imports, etc.): -10 points each
- **Warnings** (unused exports, isolated pages): -5 points each
- **Unused exports**: -0.5 points each (max -30)

**Score Interpretation:**

- 80-100: ✅ Excellent structure
- 60-79: ⚠️ Good, but has some issues
- 0-59: ❌ Needs attention

## Technical Details

### Export Detection

The analyzer detects:

- Default exports: `export default function ComponentName`
- Named exports: `export function ComponentName` or `export const ComponentName`
- Hooks: Named exports starting with `use` (e.g., `useTableColumns`)
- Types: `export type` and `export interface`
- Re-exports: `export { default as Name } from './file'` and `export * from './file'`

### Usage Detection

The analyzer finds usage in:

- JSX: `<ComponentName />`
- Function calls: `ComponentName()`
- Hook calls: `useHookName()`
- Type usage: `type MyType = ImportedType`

### Link Detection

The analyzer finds links in:

- Next.js `<Link>` components
- `href` properties
- `router.push()` and `router.replace()` calls
- `redirect()` calls
- Recursively in imported components

## Notes

- The analyzer respects Next.js route groups (directories in parentheses)
- It handles both default and named exports
- It tracks index.ts barrel exports and re-exports
- It supports path aliases from tsconfig.json
- It recursively traverses component imports to find actual usage

## Migration from v1

To compare results:

```bash
# Run v1
npm run analyze:structure

# Run v2
npm run analyze:structure:v2

# Compare reports
diff scripts/structure-analysis-report.txt scripts/structure-analysis-report-v2.txt
```

## Troubleshooting

If exports are marked as unused but you know they're used:

1. Check if they're used in non-page files (layouts, etc.)
2. Verify the component name matches the import name
3. Check if they're used via dynamic imports (not yet supported)
4. Verify re-exports are properly tracked in index files

If links are missing:

1. Check if they're in imported components (v2 should find them)
2. Verify the link syntax matches supported patterns
3. Check for dynamic routes (template literals)
