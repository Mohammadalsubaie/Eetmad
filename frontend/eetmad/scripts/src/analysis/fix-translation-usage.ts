#!/usr/bin/env tsx

/**
 * Script to fix incorrect translation usage in pages
 * Changes t('pages.X.title') to t('title') when already in pages.X namespace
 * For breadcrumbs, uses separate translation hook
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface Fix {
  file: string;
  namespace: string;
  incorrectPatterns: Array<{ old: string; new: string }>;
}

/**
 * Extract namespace from useTranslations call
 */
function extractNamespace(content: string): string | null {
  const match = content.match(/useTranslations\(['"]([^'"]+)['"]\)/);
  return match ? match[1] : null;
}

/**
 * Fix translation calls in a file
 */
function fixFile(filePath: string): { fixed: boolean; changes: string[] } {
  const content = fs.readFileSync(filePath, 'utf-8');
  const namespace = extractNamespace(content);

  if (!namespace) {
    return { fixed: false, changes: [] };
  }

  const changes: string[] = [];
  let newContent = content;
  let fixed = false;

  // Pattern 1: t('pages.X.title') when namespace is 'pages.X' -> t('title')
  // Pattern 2: t('pages.X.Y') when namespace is 'pages.X' -> t('Y')
  const namespacePrefix = namespace + '.';

  // Find all t('pages.X.Y') patterns
  const pattern = new RegExp(
    `t\\(['"](${namespacePrefix.replace(/\./g, '\\.')}[^'"]+)['"]\\)`,
    'g'
  );

  newContent = newContent.replace(pattern, (match, key) => {
    if (key.startsWith(namespacePrefix)) {
      const newKey = key.substring(namespacePrefix.length);
      fixed = true;
      changes.push(`${key} -> ${newKey}`);
      return `t('${newKey}')`;
    }
    return match;
  });

  // Special case: breadcrumbs that need to reference other namespaces
  // We'll add a separate translation hook for breadcrumbs
  if (content.includes('Breadcrumbs') && content.includes(`t('pages.`)) {
    // Check if we need to add a pages translation hook for breadcrumbs
    if (!content.includes("useTranslations('pages')") && namespace.startsWith('pages.')) {
      // Add pages translation hook after the main one
      const useTranslationsMatch = content.match(/(const t = useTranslations\([^)]+\);)/);
      if (useTranslationsMatch) {
        const pagesHook = `  const tPages = useTranslations('pages');`;
        newContent = newContent.replace(
          useTranslationsMatch[0],
          `${useTranslationsMatch[0]}\n${pagesHook}`
        );
        fixed = true;
        changes.push('Added tPages hook for breadcrumbs');

        // Replace breadcrumb t('pages.X.title') with tPages('X.title')
        newContent = newContent.replace(/t\(['"]pages\.([^'"]+)['"]\)/g, (match, key) => {
          if (key.startsWith(namespace.split('.').pop() + '.')) {
            // This is the current namespace, use t instead
            return `t('${key.split('.').slice(1).join('.')}')`;
          }
          return `tPages('${key}')`;
        });
      }
    }
  }

  if (fixed) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }

  return { fixed, changes };
}

/**
 * Main function
 */
function main() {
  const appDir = path.resolve(process.cwd(), 'src/app');
  const pageFiles = glob.sync('**/page.tsx', {
    cwd: appDir,
    absolute: true,
  });

  console.log(`🔍 Found ${pageFiles.length} page files\n`);

  let totalFixed = 0;
  let totalChanges = 0;

  for (const file of pageFiles) {
    const result = fixFile(file);
    if (result.fixed) {
      totalFixed++;
      totalChanges += result.changes.length;
      console.log(`✓ Fixed: ${path.relative(process.cwd(), file)}`);
      if (result.changes.length > 0) {
        result.changes.forEach((change) => {
          console.log(`  - ${change}`);
        });
      }
    }
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Fixed ${totalFixed} files`);
  console.log(`   Made ${totalChanges} changes`);
}

main();
