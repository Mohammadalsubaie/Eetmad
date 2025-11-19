# Component & Page Structure Analyzer

This script analyzes your Next.js application structure to provide insights about:

- Component usage across pages
- Page-to-page linking relationships
- Component import patterns
- Unused components
- Missing component imports
- Overall structure health

## Usage

Run the analysis script:

```bash
npm run analyze:structure
```

Or directly with tsx:

```bash
tsx scripts/analyze-structure.ts
```

## What It Analyzes

### 1. Component Statistics

- Total number of components
- Components by category (features, shared, ui)
- Component usage distribution
- Unused components

### 2. Page Statistics

- Total number of pages
- Pages by route group (admin, auth, client, supplier, public, etc.)
- Component usage per page

### 3. Component Usage Tracking

- Which components are imported in which pages
- Which components are actually used (not just imported)
- Most frequently used components
- Components that are imported but never used

### 4. Page Connectivity

- Links between pages (Next.js Link, href attributes, router.push, etc.)
- Pages with most outgoing links
- Isolated pages (pages with no outgoing links)

### 5. Structure Health

- Health score (0-100)
- Issues (broken imports, etc.)
- Warnings (unused components, isolated pages, etc.)

## Report Output

The script generates a comprehensive text report that includes:

1. **Structure Health Score** - Overall health indicator (0-100)
2. **Component Statistics** - Distribution and usage metrics
3. **Page Statistics** - Route groups and page counts
4. **Unused Components** - Components that appear to be unused
5. **Most Used Components** - Top 10 most frequently used components
6. **Page Connectivity** - Pages with most links and isolated pages
7. **Component Usage by Page** - Detailed breakdown per page

The report is also saved to `scripts/structure-analysis-report.txt` for later reference.

## Understanding the Health Score

The health score is calculated based on:

- **Issues** (broken imports, etc.): -10 points each
- **Warnings** (unused components, isolated pages): -5 points each
- **Unused components**: -2 points each (max -20)

**Score Interpretation:**

- 80-100: ✅ Excellent structure
- 60-79: ⚠️ Good, but has some issues
- 0-59: ❌ Needs attention

## Examples

### Finding Unused Components

The script identifies components that are defined but never imported or used in any page. This helps you:

- Clean up dead code
- Identify components that might need better documentation
- Find components that should be removed

### Identifying Isolated Pages

Pages with no outgoing links might indicate:

- Pages that need navigation links
- Orphaned pages
- Pages that should be removed

### Component Usage Patterns

Understanding which components are used most helps you:

- Identify core UI components
- Find components that might need optimization
- Understand component dependencies

## Notes

- The script analyzes `.tsx` and `.ts` files
- It respects Next.js route groups (directories in parentheses)
- It handles both default and named exports
- It tracks index.ts barrel exports
- It supports path aliases from tsconfig.json

## Troubleshooting

If the script reports missing imports that you know exist:

1. Check your `tsconfig.json` path aliases
2. Verify the import paths match the file structure
3. Ensure index.ts files properly re-export components

If components are marked as unused but you know they're used:

1. Check if they're used in non-page files (layouts, etc.)
2. Verify the component name matches the import name
3. Check if they're used via dynamic imports
