#!/usr/bin/env tsx

/**
 * Script to automatically add Breadcrumbs component to all Next.js pages
 *
 * This script:
 * 1. Scans all page.tsx files in src/app/[locale]/
 * 2. Checks if breadcrumbs already exist
 * 3. Generates appropriate breadcrumb items based on route structure
 * 4. Adds necessary imports
 * 5. Inserts Breadcrumbs component at the top of the page content
 */

import * as fs from 'fs';
import * as path from 'path';

// Route to translation key mapping
const ROUTE_LABELS: Record<string, { translationKey: string; label: string }> = {
  requests: { translationKey: 'pages.requests.title', label: 'Requests' },
  projects: { translationKey: 'pages.projects.title', label: 'Projects' },
  categories: { translationKey: 'pages.categories.title', label: 'Categories' },
  suppliers: { translationKey: 'pages.suppliers.title', label: 'Suppliers' },
  offers: { translationKey: 'pages.offers.title', label: 'Offers' },
  admin: { translationKey: 'pages.admin.title', label: 'Admin' },
  dashboard: { translationKey: 'pages.dashboard.title', label: 'Dashboard' },
  profile: { translationKey: 'pages.profile.title', label: 'Profile' },
  settings: { translationKey: 'pages.settings.title', label: 'Settings' },
  analytics: { translationKey: 'pages.analytics.title', label: 'Analytics' },
  users: { translationKey: 'pages.users.title', label: 'Users' },
  reports: { translationKey: 'pages.reports.title', label: 'Reports' },
  payments: { translationKey: 'pages.payments.title', label: 'Payments' },
  disputes: { translationKey: 'pages.disputes.title', label: 'Disputes' },
  reviews: { translationKey: 'pages.reviews.title', label: 'Reviews' },
  verification: { translationKey: 'pages.verification.title', label: 'Verification' },
  portfolio: { translationKey: 'pages.portfolio.title', label: 'Portfolio' },
  stats: { translationKey: 'pages.stats.title', label: 'Stats' },
  about: { translationKey: 'pages.about.title', label: 'About' },
  contact: { translationKey: 'pages.contact.title', label: 'Contact' },
  faq: { translationKey: 'pages.faq.title', label: 'FAQ' },
  privacy: { translationKey: 'pages.privacy.title', label: 'Privacy' },
  terms: { translationKey: 'pages.terms.title', label: 'Terms' },
  'how-it-works': { translationKey: 'pages.howItWorks.title', label: 'How It Works' },
  login: { translationKey: 'pages.login.title', label: 'Login' },
  register: { translationKey: 'pages.register.title', label: 'Register' },
  'forgot-password': { translationKey: 'pages.forgotPassword.title', label: 'Forgot Password' },
  'reset-password': { translationKey: 'pages.resetPassword.title', label: 'Reset Password' },
  'verify-email': { translationKey: 'pages.verifyEmail.title', label: 'Verify Email' },
  security: { translationKey: 'pages.security.title', label: 'Security' },
  new: { translationKey: 'pages.new.title', label: 'New' },
  edit: { translationKey: 'pages.edit.title', label: 'Edit' },
  milestones: { translationKey: 'pages.milestones.title', label: 'Milestones' },
  setup: { translationKey: 'pages.setup.title', label: 'Setup' },
};

interface BreadcrumbItem {
  label: string;
  href?: string;
  isDynamic?: boolean;
  dynamicParam?: string;
}

interface RouteInfo {
  filePath: string;
  routePath: string;
  segments: string[];
  isDynamic: boolean;
  dynamicParams: string[];
}

/**
 * Find all page.tsx files in the app directory
 */
function findPageFiles(dir: string, basePath: string = ''): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and other non-app directories
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        files.push(...findPageFiles(fullPath, relativePath));
      }
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Parse route path from file path
 */
function parseRoutePath(filePath: string): RouteInfo {
  // Extract path relative to [locale]
  const localeIndex = filePath.indexOf('[locale]');
  if (localeIndex === -1) {
    throw new Error(`File path doesn't contain [locale]: ${filePath}`);
  }

  const relativePath = filePath.substring(localeIndex + '[locale]'.length);
  const segments = relativePath
    .split(path.sep)
    .filter((seg) => seg && seg !== 'page.tsx')
    .map((seg) => {
      // Remove route groups (parentheses)
      if (seg.startsWith('(') && seg.endsWith(')')) {
        return '';
      }
      return seg;
    })
    .filter((seg) => seg !== '');

  const dynamicParams: string[] = [];
  const isDynamic = segments.some((seg) => {
    if (seg.startsWith('[') && seg.endsWith(']')) {
      const param = seg.slice(1, -1);
      dynamicParams.push(param);
      return true;
    }
    return false;
  });

  const routePath = '/' + segments.filter((seg) => !seg.startsWith('[')).join('/');

  return {
    filePath,
    routePath,
    segments,
    isDynamic,
    dynamicParams,
  };
}

/**
 * Check if a page exists at the given path segments
 * Uses the current file's route group context to check the correct path
 */
function pageExistsAtPath(appDir: string, segments: string[], currentFilePath: string): boolean {
  if (segments.length === 0) {
    // Check root page
    const rootPagePath = path.join(appDir, '[locale]', 'page.tsx');
    return fs.existsSync(rootPagePath);
  }

  // Extract route groups from the current file path
  const localeIndex = currentFilePath.indexOf('[locale]');
  if (localeIndex === -1) {
    return false;
  }

  const pathAfterLocale = currentFilePath.substring(localeIndex + '[locale]'.length);
  const pathParts = pathAfterLocale.split(path.sep).filter((p) => p);

  // Find route groups in the current file's path
  const routeGroups: string[] = [];
  for (const part of pathParts) {
    if (part.startsWith('(') && part.endsWith(')')) {
      routeGroups.push(part);
    }
  }

  // Build possible paths to check
  const pathsToCheck: string[] = [];

  // 1. Direct path without route groups
  pathsToCheck.push(path.join(appDir, '[locale]', ...segments, 'page.tsx'));

  // 2. Path with route groups from current file
  if (routeGroups.length > 0) {
    // Check with the same route groups
    const pathWithGroups = ['[locale]', ...routeGroups, ...segments, 'page.tsx'];
    pathsToCheck.push(path.join(appDir, ...pathWithGroups));
  }

  // 3. Check all route groups (in case the segment exists in a different route group)
  const localeDir = path.join(appDir, '[locale]');
  if (fs.existsSync(localeDir)) {
    const entries = fs.readdirSync(localeDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith('(') && entry.name.endsWith(')')) {
        const routeGroupPath = path.join(localeDir, entry.name, ...segments, 'page.tsx');
        pathsToCheck.push(routeGroupPath);
      }
    }
  }

  // Check if any of these paths exist
  for (const checkPath of pathsToCheck) {
    if (fs.existsSync(checkPath)) {
      return true;
    }
  }

  return false;
}

/**
 * Generate breadcrumb items from route info
 */
function generateBreadcrumbs(routeInfo: RouteInfo, appDir: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  let currentPath = '';
  const pathSegments: string[] = [];

  for (let i = 0; i < routeInfo.segments.length; i++) {
    const segment = routeInfo.segments[i];

    if (!segment) continue;

    // Skip dynamic segments in path building but add placeholder
    if (segment.startsWith('[') && segment.endsWith(']')) {
      const param = segment.slice(1, -1);
      items.push({
        label: `{${param}}`, // Placeholder that needs manual replacement
        isDynamic: true,
        dynamicParam: param,
      });
      continue;
    }

    // Build path for this segment
    currentPath += `/${segment}`;
    pathSegments.push(segment);

    // Check if a page exists at this path (only for non-dynamic segments)
    const hasPage = pageExistsAtPath(appDir, pathSegments, routeInfo.filePath);

    // Only add breadcrumb if a page exists at this level
    if (!hasPage && i < routeInfo.segments.length - 1) {
      // Skip this segment if no page exists and it's not the last segment
      continue;
    }

    // Get label for this segment
    const routeLabel = ROUTE_LABELS[segment];
    let label: string;

    if (routeLabel) {
      // Extract the last part of the translation key for the label
      // e.g., 'pages.requests.title' -> 't(\'title\')' if t is scoped to 'pages.requests'
      const keyParts = routeLabel.translationKey.split('.');
      if (keyParts.length >= 3 && keyParts[0] === 'pages') {
        // Use just the last part (e.g., 'title')
        // This works when t is scoped like: useTranslations('pages.requests')
        label = `t('${keyParts[keyParts.length - 1]}')`;
      } else {
        // For other cases, try to use a common translation key
        // or fall back to the segment name
        label = `t('${keyParts[keyParts.length - 1]}')`;
      }
    } else {
      // No translation key found, use capitalized segment name
      label = `'${segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')}'`;
    }

    // For the last segment, don't add href (it's the current page)
    const isLast = i === routeInfo.segments.length - 1;

    items.push({
      label,
      href: isLast ? undefined : `\`/\${locale}${currentPath}\``,
      isDynamic: false,
    });
  }

  return items;
}

/**
 * Check if file already has breadcrumbs
 */
function hasBreadcrumbs(content: string): boolean {
  return (
    content.includes('Breadcrumbs') &&
    (content.includes("from '@/components/shared/navigation/Breadcrumbs'") ||
      content.includes('from "@/components/shared/navigation/Breadcrumbs"'))
  );
}

/**
 * Check if file has useLocale import
 */
function hasUseLocale(content: string): boolean {
  return content.includes('useLocale') && content.includes('next-intl');
}

/**
 * Add imports to file content
 */
function addImports(content: string): string {
  let newContent = content;

  // Add Breadcrumbs import
  if (!content.includes("from '@/components/shared/navigation/Breadcrumbs'")) {
    // Find the last import statement
    const importRegex = /^import .+ from ['"].+['"];?$/gm;
    const imports = content.match(importRegex) || [];

    if (imports.length > 0) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const insertIndex = lastImportIndex + lastImport.length;

      newContent =
        content.slice(0, insertIndex) +
        "\nimport Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';" +
        content.slice(insertIndex);
    } else {
      // No imports found, add at the top after 'use client' if present
      if (content.startsWith("'use client'")) {
        const useClientEnd = content.indexOf('\n', content.indexOf("'use client'"));
        newContent =
          content.slice(0, useClientEnd + 1) +
          "import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';\n" +
          content.slice(useClientEnd + 1);
      } else {
        newContent =
          "import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';\n" + newContent;
      }
    }
  }

  // Add useLocale to next-intl import
  if (!hasUseLocale(newContent)) {
    // Check if useTranslations is imported
    const translationsImportRegex = /import\s+{([^}]+)}\s+from\s+['"]next-intl['"]/;
    const match = newContent.match(translationsImportRegex);

    if (match) {
      const imports = match[1].split(',').map((i) => i.trim());
      if (!imports.includes('useLocale')) {
        const newImports = [...imports, 'useLocale'].join(', ');
        newContent = newContent.replace(
          translationsImportRegex,
          `import { ${newImports} } from 'next-intl'`
        );
      }
    } else {
      // Add new import for useLocale
      const importRegex = /^import .+ from ['"].+['"];?$/gm;
      const imports = newContent.match(importRegex) || [];

      if (imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const lastImportIndex = newContent.lastIndexOf(lastImport);
        const insertIndex = lastImportIndex + lastImport.length;

        newContent =
          newContent.slice(0, insertIndex) +
          "\nimport { useLocale } from 'next-intl';" +
          newContent.slice(insertIndex);
      } else {
        // No imports at all, add at the top
        if (newContent.startsWith("'use client'")) {
          const useClientEnd = newContent.indexOf('\n', newContent.indexOf("'use client'"));
          newContent =
            newContent.slice(0, useClientEnd + 1) +
            "import { useLocale } from 'next-intl';\n" +
            newContent.slice(useClientEnd + 1);
        } else {
          newContent = "import { useLocale } from 'next-intl';\n" + newContent;
        }
      }
    }
  }

  return newContent;
}

/**
 * Add useLocale hook call
 */
function addUseLocaleHook(content: string): string {
  // Check if useLocale is already called
  if (content.includes('const locale = useLocale()')) {
    return content;
  }

  // Find where useTranslations is called
  const translationsRegex = /const\s+t\s*=\s*useTranslations\([^)]+\);/;
  const match = content.match(translationsRegex);

  if (match) {
    const insertIndex = match.index! + match[0].length;
    return (
      content.slice(0, insertIndex) + '\n  const locale = useLocale();' + content.slice(insertIndex)
    );
  }

  // If no useTranslations, find the function start
  const functionStartRegex = /export\s+default\s+function\s+\w+\s*\([^)]*\)\s*{/;
  const funcMatch = content.match(functionStartRegex);

  if (funcMatch) {
    const insertIndex = funcMatch.index! + funcMatch[0].length;
    return (
      content.slice(0, insertIndex) + '\n  const locale = useLocale();' + content.slice(insertIndex)
    );
  }

  return content;
}

/**
 * Generate breadcrumbs JSX code
 */
function generateBreadcrumbsJSX(items: BreadcrumbItem[]): string {
  if (items.length === 0) {
    return '';
  }

  const itemsCode = items
    .map((item) => {
      if (item.isDynamic) {
        return `    // TODO: Replace with actual data for ${item.dynamicParam}\n    { label: '${item.label}' },`;
      }
      if (item.href) {
        return `    { label: ${item.label}, href: ${item.href} },`;
      }
      return `    { label: ${item.label} },`;
    })
    .join('\n');

  return `<Breadcrumbs
  items={[
${itemsCode}
  ]}
  className="mb-6"
/>`;
}

/**
 * Insert breadcrumbs into file content
 */
function insertBreadcrumbs(content: string, breadcrumbsJSX: string): string {
  // Find the return statement
  const returnRegex = /return\s*\(/;
  const returnMatch = content.match(returnRegex);

  if (!returnMatch) {
    console.warn('  ⚠️  Could not find return statement');
    return content;
  }

  const returnIndex = returnMatch.index! + returnMatch[0].length;

  // Find the opening tag after return
  const afterReturn = content.slice(returnIndex);
  const openingTagMatch = afterReturn.match(/^\s*<(\w+)/);

  if (!openingTagMatch) {
    console.warn('  ⚠️  Could not find opening tag after return');
    return content;
  }

  // Find the end of the opening tag (including attributes)
  let tagEndIndex = returnIndex + openingTagMatch.index! + openingTagMatch[0].length;
  const tagContent = content.slice(tagEndIndex);

  // Find the closing > of the opening tag
  let bracketCount = 0;
  let inString = false;
  let stringChar = '';

  for (let i = 0; i < tagContent.length; i++) {
    const char = tagContent[i];

    if ((char === '"' || char === "'" || char === '`') && (i === 0 || tagContent[i - 1] !== '\\')) {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    } else if (!inString) {
      if (char === '<') bracketCount++;
      else if (char === '>') {
        if (bracketCount === 0) {
          tagEndIndex += i + 1;
          break;
        }
        bracketCount--;
      }
    }
  }

  // Insert breadcrumbs after the opening tag
  const indent = '      ';
  const breadcrumbsWithIndent = breadcrumbsJSX
    .split('\n')
    .map((line, index) => (index === 0 ? indent + line : indent + '  ' + line))
    .join('\n');

  return (
    content.slice(0, tagEndIndex) + '\n' + breadcrumbsWithIndent + '\n' + content.slice(tagEndIndex)
  );
}

/**
 * Main function
 */
function main() {
  // Get the project root - resolve from current working directory or script location
  // When run via npm script, cwd is the project root
  const projectRoot = process.cwd();
  const appDir = path.resolve(projectRoot, 'src/app');

  if (!fs.existsSync(appDir)) {
    console.error(`❌ App directory not found: ${appDir}`);
    process.exit(1);
  }

  console.log('🔍 Analyzing Next.js routes...\n');

  const pageFiles = findPageFiles(appDir);
  console.log(`Found ${pageFiles.length} pages\n`);

  let addedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const filePath of pageFiles) {
    try {
      const routeInfo = parseRoutePath(filePath);
      const relativePath = path.relative(appDir, filePath);

      // Skip root page
      if (relativePath.includes('[locale]/page.tsx')) {
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf-8');

      // Skip if already has breadcrumbs
      if (hasBreadcrumbs(content)) {
        console.log(`📄 Route: ${routeInfo.routePath}`);
        console.log(`   File: ${relativePath}`);
        console.log(`   Status: Already has breadcrumbs\n`);
        skippedCount++;
        continue;
      }

      // Breadcrumbs is a client component, so we need 'use client' directive
      // Skip server component pages (pages without 'use client' that don't use client hooks)
      const hasClientDirective = content.includes("'use client'");
      const usesClientHooks =
        content.includes('useState') ||
        content.includes('useEffect') ||
        content.includes('useRouter') ||
        content.includes('useTranslations') ||
        content.includes('onClick') ||
        content.includes('onChange');

      if (!hasClientDirective && !usesClientHooks) {
        // Skip pure server components
        console.log(`📄 Route: ${routeInfo.routePath}`);
        console.log(`   File: ${relativePath}`);
        console.log(
          `   Status: Skipped (server component - add 'use client' manually if needed)\n`
        );
        skippedCount++;
        continue;
      }

      // Add 'use client' if missing but page uses client hooks
      if (!hasClientDirective && usesClientHooks) {
        content = "'use client';\n\n" + content;
      }

      // Generate breadcrumbs
      const breadcrumbItems = generateBreadcrumbs(routeInfo, appDir);

      if (breadcrumbItems.length === 0) {
        console.log(`📄 Route: ${routeInfo.routePath}`);
        console.log(`   File: ${relativePath}`);
        console.log(`   Status: Skipped (no breadcrumb items)\n`);
        skippedCount++;
        continue;
      }

      // Add imports
      let newContent = addImports(content);

      // Add useLocale hook
      newContent = addUseLocaleHook(newContent);

      // Generate breadcrumbs JSX
      const breadcrumbsJSX = generateBreadcrumbsJSX(breadcrumbItems);

      // Insert breadcrumbs
      newContent = insertBreadcrumbs(newContent, breadcrumbsJSX);

      // Write file
      fs.writeFileSync(filePath, newContent, 'utf-8');

      console.log(`📄 Route: ${routeInfo.routePath}`);
      console.log(`   File: ${relativePath}`);
      console.log(`   Breadcrumbs: ${breadcrumbItems.length} items`);
      if (routeInfo.isDynamic) {
        console.log(`   ⚠️  Dynamic route - manual updates may be needed`);
      }
      console.log(`   ✓ Added breadcrumbs\n`);
      addedCount++;
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error);
      errorCount++;
    }
  }

  console.log('\n✅ Summary:');
  console.log(`   Total pages: ${pageFiles.length}`);
  console.log(`   Added breadcrumbs: ${addedCount}`);
  console.log(`   Skipped (already exist): ${skippedCount}`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount}`);
  }
  console.log('\n⚠️  Note: Dynamic route segments need manual label updates with actual data.');
}

// Run if executed directly
main();
