# Structure Analyzer - Quick Summary

## ✅ What Was Created

A comprehensive analysis script (`scripts/analyze-structure.ts`) that provides insights into your Next.js application structure.

## 🚀 How to Use

```bash
npm run analyze:structure
```

The script will:

1. Scan all components in `src/components/`
2. Scan all pages and layouts in `src/app/[locale]/`
3. Analyze component usage across pages
4. Detect page-to-page links
5. Generate a comprehensive report

## 📊 What It Reports

### Structure Health Score (0-100)

- **80-100**: ✅ Excellent structure
- **60-79**: ⚠️ Good, but has some issues
- **0-59**: ❌ Needs attention

### Key Metrics

- **Component Statistics**: Total, used, unused components by category
- **Page Statistics**: Total pages by route group
- **Component Usage**: Which components are used where
- **Page Connectivity**: Links between pages
- **Issues & Warnings**: Problems to fix

### Current Analysis Results

Based on the initial run:

- **Health Score**: 70/100
- **Total Components**: 188
- **Components in Use**: 23
- **Total Pages**: 51
- **Most Used Component**: AdminPageHeader (14 pages)

## 📋 Report Sections

1. **Structure Health** - Overall score and issues
2. **Component Statistics** - Distribution and usage
3. **Page Statistics** - Route groups and counts
4. **Unused Components** - Components that appear unused
5. **Most Used Components** - Top 10 frequently used
6. **Page Connectivity** - Pages with most links
7. **Isolated Pages** - Pages with no outgoing links
8. **Component Usage by Page** - Detailed breakdown

## 🔍 What It Detects

### Component Usage

- ✅ Imports from `@/components`
- ✅ Actual usage in JSX (`<Component />`)
- ✅ Function calls
- ✅ Index.ts barrel exports

### Page Links

- ✅ Next.js `<Link>` components
- ✅ `href` attributes
- ✅ `router.push()` / `router.replace()`
- ✅ Template literals in routes
- ✅ Object properties with `href`

### Issues Detected

- ❌ Broken imports
- ⚠️ Unused components
- ⚠️ Isolated pages (no links)

## 📝 Output

The report is:

1. **Printed to console** - Immediate feedback
2. **Saved to file** - `scripts/structure-analysis-report.txt`

## 🎯 Use Cases

### 1. Clean Up Dead Code

Find unused components that can be removed:

```bash
npm run analyze:structure | grep "UNUSED COMPONENTS"
```

### 2. Identify Missing Links

Find pages that need navigation:

```bash
npm run analyze:structure | grep "ISOLATED PAGES"
```

### 3. Understand Component Dependencies

See which components are most critical:

```bash
npm run analyze:structure | grep "MOST USED COMPONENTS"
```

### 4. Validate Structure

Check if your component architecture is working:

```bash
npm run analyze:structure
# Look for Health Score >= 80
```

## 🔧 Customization

The script can be customized by editing `scripts/analyze-structure.ts`:

- Adjust health score calculation
- Add more link detection patterns
- Include additional file types
- Modify report format

## 📚 Documentation

See `scripts/analyze-structure.README.md` for detailed documentation.

## 💡 Tips

1. **Run regularly** - Add to CI/CD pipeline
2. **Review unused components** - They might be needed for future features
3. **Fix isolated pages** - Add navigation links
4. **Monitor health score** - Keep it above 80

## 🐛 Known Limitations

- Doesn't detect dynamic imports
- May miss components used in non-page files (hooks, utils)
- Template literal routes are simplified (base path only)
- Doesn't analyze component props usage

## 🎉 Next Steps

1. Review the generated report
2. Fix any broken imports
3. Add links to isolated pages
4. Consider removing truly unused components
5. Run regularly to maintain structure health
