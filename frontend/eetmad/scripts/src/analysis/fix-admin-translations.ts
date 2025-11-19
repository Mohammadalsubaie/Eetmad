#!/usr/bin/env tsx

/**
 * Fix admin pages to use correct translation pattern
 * Admin pages use useTranslations('admin') but call t('pages.X.title')
 * We'll add tPages hook for breadcrumbs
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

function fixAdminFile(filePath: string): boolean {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if it's an admin page using admin namespace
  if (
    !content.includes("useTranslations('admin')") &&
    !content.includes('useTranslations("admin")')
  ) {
    return false;
  }

  // Check if it uses pages.X pattern in breadcrumbs
  if (!content.includes("t('pages.") && !content.includes('t("pages.')) {
    return false;
  }

  let newContent = content;
  let changed = false;

  // Add tPages hook if not present
  if (
    !content.includes("useTranslations('pages')") &&
    !content.includes('useTranslations("pages")')
  ) {
    const useTranslationsMatch = content.match(/(const t = useTranslations\(['"]admin['"]\);)/);
    if (useTranslationsMatch) {
      newContent = newContent.replace(
        useTranslationsMatch[0],
        `${useTranslationsMatch[0]}\n  const tPages = useTranslations('pages');`
      );
      changed = true;
    }
  }

  // Replace t('pages.X.title') with tPages('X.title') in breadcrumbs
  if (newContent.includes('Breadcrumbs')) {
    newContent = newContent.replace(/t\(['"]pages\.([^'"]+)['"]\)/g, (match, key) => {
      // If it's pages.admin.title and we're in admin namespace, use admin.pages.admin.title
      // But for breadcrumbs, we should use tPages
      if (newContent.includes('const tPages')) {
        return `tPages('${key}')`;
      }
      return match;
    });
    if (newContent !== content) {
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf-8');
  }

  return changed;
}

function main() {
  const appDir = path.resolve(process.cwd(), 'src/app');
  const adminFiles = glob.sync('**/admin/**/page.tsx', {
    cwd: appDir,
    absolute: true,
  });

  console.log(`🔍 Found ${adminFiles.length} admin page files\n`);

  let fixed = 0;
  for (const file of adminFiles) {
    if (fixAdminFile(file)) {
      fixed++;
      console.log(`✓ Fixed: ${path.relative(process.cwd(), file)}`);
    }
  }

  console.log(`\n✅ Fixed ${fixed} admin pages`);
}

main();
