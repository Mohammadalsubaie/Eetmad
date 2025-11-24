import fs from 'fs';
import path from 'path';

/**
 * Check if a page exists at the given route path
 * @param routePath - The route path (e.g., '/admin', '/admin/users', '/ar/admin/users')
 * @param locale - The locale (e.g., 'ar', 'en')
 * @returns boolean indicating if the page exists
 */
export function pageExists(routePath: string, locale: string = 'ar'): boolean {
  try {
    // Remove leading slash
    let cleanPath = routePath.replace(/^\//, '');

    // Remove locale prefix if present (e.g., 'ar/admin' -> 'admin')
    const localePattern = new RegExp(`^${locale}/`);
    if (cleanPath.match(localePattern)) {
      cleanPath = cleanPath.replace(localePattern, '');
    }

    // Also check for any 2-letter locale prefix
    cleanPath = cleanPath.replace(/^[a-z]{2}\//, '');

    // If path is empty, check for root page
    if (!cleanPath) {
      const rootPagePath = path.join(process.cwd(), 'src/app/[locale]/page.tsx');
      return fs.existsSync(rootPagePath);
    }

    // Split path into segments
    const segments = cleanPath.split('/').filter(Boolean);

    // Build app directory path
    const appDir = path.join(process.cwd(), 'src/app/[locale]');

    // Route groups to check
    const routeGroups = ['(public)', '(main)', '(client)', '(supplier)', '(admin)', '(auth)'];

    // Check each route group
    for (const group of routeGroups) {
      // For admin routes, they must be in the (admin) group
      if (segments[0] === 'admin') {
        if (group === '(admin)') {
          const pagePath = path.join(appDir, group, ...segments, 'page.tsx');
          if (fs.existsSync(pagePath)) {
            return true;
          }
        }
      } else {
        // For non-admin routes, check in all route groups
        const pagePath = path.join(appDir, group, ...segments, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          return true;
        }
      }
    }

    // Also check without route groups (direct path) - though this is unlikely in Next.js App Router
    const directPath = path.join(appDir, ...segments, 'page.tsx');
    if (fs.existsSync(directPath)) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking if page exists:', error);
    return false;
  }
}
