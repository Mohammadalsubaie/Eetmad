# Route Detection Script

## Overview

The `detect-routes.ts` script automatically detects all navigation patterns in your Next.js application and generates comprehensive routing documentation.

## Features

- **Filesystem Scanning**: Detects all actual routes from the `app/[locale]` directory structure
- **Code Analysis**: Finds navigation patterns in TypeScript/TSX files:
  - `Link` components with `href` props
  - `router.push()` and `router.replace()` calls
  - External links (http/https)
  - Route constants usage from `lib/constants/routes.ts`
- **Smart Grouping**: Organizes routes by category (admin, auth, client, supplier, public, etc.)
- **Multiple Output Formats**: Generates both JSON and Markdown files

## Usage

```bash
npm run detect:routes
```

## Output

The script generates two files in `scripts/reports/[date]/`:

1. **routes.json**: Machine-readable JSON with all route information
2. **routes.md**: Human-readable Markdown documentation

### JSON Structure

```json
{
  "generatedAt": "2025-11-23T19:26:01.974Z",
  "totalRoutes": 128,
  "summary": {
    "internal": 81,
    "dynamic": 37,
    "external": 11
  },
  "routes": {
    "admin": [...],
    "auth": [...],
    "client": [...],
    ...
  },
  "allRoutes": [...]
}
```

### Route Information

Each route includes:

- **path**: The route path
- **type**: `internal`, `dynamic`, or `external`
- **source**: Where it was found (`filesystem`, `link`, `router`, `constant`, `external`)
- **file**: Source file location
- **line**: Line number (if found in code)
- **isDynamic**: Whether it contains dynamic parameters
- **params**: Array of parameter names (e.g., `[id]`, `[slug]`)
- **group**: Route category/group

## Route Types

### Internal Routes

Static routes that don't contain dynamic parameters (e.g., `/about`, `/login`)

### Dynamic Routes

Routes with parameters (e.g., `/projects/[id]`, `/categories/[slug]`)

### External Links

URLs pointing outside the application (e.g., `https://example.com`)

## Route Groups

Routes are automatically grouped into:

- **admin**: Admin panel routes
- **auth**: Authentication routes
- **client**: Client/user routes
- **supplier**: Supplier-specific routes
- **public**: Public-facing pages
- **main**: Main application routes (dashboard, profile)
- **other**: Unclassified routes

## Examples

### Detected Patterns

The script detects routes from:

```tsx
// Link components
<Link href="/about">About</Link>;

// Router navigation
router.push('/dashboard');

// External links
<a href="https://example.com">External</a>;

// Route constants
router.push(ROUTES.DASHBOARD);
```

### Filesystem Routes

Routes are also detected from the file structure:

```
app/[locale]/(public)/
  ├── about/page.tsx          → /about
  ├── categories/
  │   ├── page.tsx           → /categories
  │   └── [slug]/page.tsx    → /categories/[slug]
```

## Limitations

- Template literals with variables are skipped (e.g., `` `/users/${id}` ``)
- Relative paths are not resolved
- Routes in comments are not detected
- Routes in test files are excluded

## Integration

You can integrate this into your CI/CD pipeline:

```json
{
  "scripts": {
    "detect:routes": "tsx scripts/src/analysis/detect-routes.ts",
    "pre-commit": "npm run detect:routes"
  }
}
```

## Maintenance

The script should be run:

- After adding new routes
- Before major releases
- When refactoring navigation
- As part of documentation updates

## Troubleshooting

### Routes not detected

1. Check if the route exists in the filesystem
2. Verify the route is used in code (not just defined)
3. Ensure the route doesn't use template literals with variables
4. Check that the file extension is `.ts` or `.tsx`

### Invalid routes in output

The script filters out:

- Code snippets that look like routes
- Routes with newlines
- Routes longer than 200 characters
- Routes containing code patterns

If invalid routes appear, they may need manual filtering or the validation logic may need adjustment.
