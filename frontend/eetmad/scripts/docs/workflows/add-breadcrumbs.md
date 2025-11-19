# Automatic Breadcrumbs Generator

This script automatically analyzes your Next.js routing structure and adds breadcrumb navigation components to all pages.

## 🚀 Usage

```bash
npm run add:breadcrumbs
```

## 📋 What It Does

1. **Analyzes Routes**: Scans all `page.tsx` files in `src/app/[locale]/`
2. **Maps Route Hierarchy**: Understands route groups, dynamic routes, and nested routes
3. **Generates Breadcrumbs**: Creates appropriate breadcrumb configuration for each page
4. **Adds Components**: Automatically inserts the `Breadcrumbs` component into pages that don't have it

## 🎯 Features

- ✅ Automatically detects route structure
- ✅ Handles route groups `(admin)`, `(client)`, etc.
- ✅ Handles dynamic routes `[id]`, `[slug]`, etc.
- ✅ Generates translation keys for breadcrumb labels
- ✅ Skips pages that already have breadcrumbs
- ✅ Adds necessary imports (`Breadcrumbs`, `useLocale`)
- ✅ Inserts breadcrumbs in the correct location

## 📝 Route Label Mapping

The script uses a predefined mapping of routes to labels. Common routes are already configured:

- `admin` → "Admin" / "الإدارة"
- `admin/categories` → "Categories" / "الفئات"
- `categories` → "Categories" / "الفئات"
- `requests` → "Requests" / "الطلبات"
- etc.

## ⚠️ Dynamic Routes

For dynamic routes like `[id]` or `[slug]`, the script adds a placeholder comment that you need to replace with actual data:

```tsx
<Breadcrumbs
  items={[
    { label: t('pages.requests.title'), href: `/${locale}/requests` },
    // Dynamic: id - Replace with actual data
    { label: request.title }, // ← You need to add this
  ]}
/>
```

## 🔧 Customization

To add more route labels, edit the `ROUTE_LABELS` object in:

```
scripts/src/analysis/add-breadcrumbs.ts
```

## 📊 Example Output

```
🔍 Analyzing Next.js routes...

Found 61 pages

📄 Route: categories
   File: src/app/[locale]/(public)/categories/page.tsx
   Breadcrumbs: 1 items
   Status: Already has breadcrumbs

📄 Route: categories/[slug]
   File: src/app/[locale]/(public)/categories/[slug]/page.tsx
   Breadcrumbs: 2 items
✓ Added breadcrumbs to: categories/[slug]

✅ Summary:
   Total pages: 61
   Added breadcrumbs: 45
   Skipped (already exist): 16

⚠️  Note: Dynamic route segments need manual label updates with actual data.
```

## 🛠️ Manual Updates Needed

After running the script, you may need to:

1. **Update dynamic route labels**: Replace placeholder comments with actual data
2. **Verify translation keys**: Ensure all translation keys exist in `messages/en.json` and `messages/ar.json`
3. **Test breadcrumbs**: Check that breadcrumbs work correctly on all pages

## 📚 Related

- [Breadcrumbs Component](../../../../src/components/shared/navigation/Breadcrumbs.tsx)
- [Translation Files](../../../../messages/)
