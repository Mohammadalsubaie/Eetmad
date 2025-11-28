#!/usr/bin/env tsx

/**
 * Script to automatically add missing translation keys to en.json and ar.json
 * Based on validation output from validate-translations script
 */

import * as fs from 'fs';
import * as path from 'path';

interface MissingKey {
  namespace: string;
  key: string;
  file: string;
  line: number;
}

/**
 * Set nested value in object using dot notation path
 */
function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}

/**
 * Get nested value from object using dot notation path
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj as unknown);
}

/**
 * Generate English translation from key path
 */
function generateEnglishTranslation(keyPath: string): string {
  const parts = keyPath.split('.');
  const lastPart = parts[parts.length - 1];

  // Convert camelCase or snake_case to Title Case
  const title = lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();

  return title;
}

/**
 * Generate Arabic translation placeholder
 */
function generateArabicTranslation(keyPath: string): string {
  // Return placeholder that needs manual translation
  return `[${keyPath}]`;
}

/**
 * Add missing keys to translation file
 */
function addMissingKeys(
  filePath: string,
  namespace: string,
  missingKeys: string[],
  isEnglish: boolean
): void {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = JSON.parse(content);

  if (!translations[namespace]) {
    translations[namespace] = {};
  }

  let added = 0;
  for (const key of missingKeys) {
    const fullPath = `${namespace}.${key}`;
    const existingValue = getNestedValue(translations[namespace], key);

    if (existingValue === undefined) {
      const value = isEnglish
        ? generateEnglishTranslation(key)
        : generateArabicTranslation(fullPath);
      setNestedValue(translations[namespace], key, value);
      added++;
    }
  }

  if (added > 0) {
    // Write back with proper formatting
    const newContent = JSON.stringify(translations, null, 2);
    fs.writeFileSync(filePath, newContent + '\n', 'utf-8');
    console.log(`   ✓ Added ${added} keys to ${path.basename(filePath)}`);
  }
}

/**
 * Main function - reads validation output and adds missing keys
 */
function main() {
  const projectRoot = process.cwd();
  const messagesDir = path.resolve(projectRoot, 'messages');
  const enFile = path.join(messagesDir, 'en.json');
  const arFile = path.join(messagesDir, 'ar.json');

  console.log('🔍 Adding Missing Translations\n');

  // For now, we'll manually add the most common missing keys
  // A full implementation would parse the validation output

  const missingKeysByNamespace: Record<string, { en: string[]; ar: string[] }> = {
    pages: {
      en: ['admin.title', 'disputes.title', 'privacy.title'],
      ar: ['admin.title', 'disputes.title', 'privacy.title'],
    },
    'pages.projects': {
      en: ['title', 'milestones.title', 'milestones.loading', 'milestones.notFound'],
      ar: ['title', 'milestones.title', 'milestones.loading', 'milestones.notFound'],
    },
    'pages.requests': {
      en: ['title', 'edit.title', 'loading', 'notFound', 'fetchError'],
      ar: ['title', 'edit.title', 'loading', 'notFound', 'fetchError'],
    },
    'pages.offers': {
      en: ['title', 'loading', 'back', 'notFound'],
      ar: ['title', 'loading', 'back', 'notFound'],
    },
    'pages.dashboard': {
      en: ['title', 'timeAgo.justNow', 'timeAgo.minutes', 'timeAgo.hours', 'timeAgo.days'],
      ar: ['title', 'timeAgo.justNow', 'timeAgo.minutes', 'timeAgo.hours', 'timeAgo.days'],
    },
    'pages.profile': {
      en: ['title', 'edit.title', 'security.title', 'loading', 'error', 'notProvided'],
      ar: ['title', 'edit.title', 'security.title', 'loading', 'error', 'notProvided'],
    },
    'pages.profile.edit': {
      en: ['title', 'back'],
      ar: ['title', 'back'],
    },
    'pages.profile.security': {
      en: ['title', 'back'],
      ar: ['title', 'back'],
    },
    biddingPlatform: {
      en: ['pages.about.title'],
      ar: ['pages.about.title'],
    },
    'pages.categories': {
      en: ['title', 'notFound', 'error', 'loading', 'backToCategories'],
      ar: ['title', 'notFound', 'error', 'loading', 'backToCategories'],
    },
    'pages.contact': {
      en: ['title', 'pageTitle', 'pageDescription'],
      ar: ['title', 'pageTitle', 'pageDescription'],
    },
    'pages.faq': {
      en: ['title', 'eyebrow', 'subtitle'],
      ar: ['title', 'eyebrow', 'subtitle'],
    },
    'pages.suppliers': {
      en: ['title', 'error', 'loading', 'notFound', 'back'],
      ar: ['title', 'error', 'loading', 'notFound', 'back'],
    },
    'pages.terms': {
      en: ['title', 'pageTitle'],
      ar: ['title', 'pageTitle'],
    },
    'pages.portfolio': {
      en: ['title', 'pageTitle', 'pageSubtitle'],
      ar: ['title', 'pageTitle', 'pageSubtitle'],
    },
    'pages.stats': {
      en: ['title', 'fetchError', 'currency', 'loading'],
      ar: ['title', 'fetchError', 'currency', 'loading'],
    },
    'pages.supplierProfile': {
      en: ['title', 'loading', 'subtitle'],
      ar: ['title', 'loading', 'subtitle'],
    },
    'pages.supplierSetup': {
      en: ['title', 'subtitle', 'pages.setup.title'],
      ar: ['title', 'subtitle', 'pages.setup.title'],
    },
  };

  for (const [namespace, keys] of Object.entries(missingKeysByNamespace)) {
    console.log(`📦 Adding keys for namespace: "${namespace}"`);
    addMissingKeys(enFile, namespace, keys.en, true);
    addMissingKeys(arFile, namespace, keys.ar, false);
    console.log('');
  }

  console.log('✅ Done! Please review and update Arabic translations manually.');
}

main();
