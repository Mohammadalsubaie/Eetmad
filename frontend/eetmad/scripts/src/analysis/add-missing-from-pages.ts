#!/usr/bin/env tsx

/**
 * Extract all translation keys actually used in pages and add missing ones
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface KeyUsage {
  namespace: string;
  keys: Set<string>;
}

function extractKeysFromFile(filePath: string): KeyUsage | null {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract namespace
  const namespaceMatch = content.match(/useTranslations\(['"]([^'"]+)['"]\)/);
  if (!namespaceMatch) return null;

  const namespace = namespaceMatch[1];
  const keys = new Set<string>();

  // Extract all t('key') patterns
  const patterns = [
    /\bt\s*\(\s*['"]([^'"]+)['"]\s*(?:,|\))/g,
    /\btPages\s*\(\s*['"]([^'"]+)['"]\s*(?:,|\))/g,
  ];

  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      keys.add(match[1]);
    }
  });

  return { namespace, keys };
}

function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: unknown): void {
  const parts = keyPath.split('.');
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    }
    current = current[part] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  if (current[lastPart] === undefined) {
    current[lastPart] = value;
  }
}

function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj as unknown);
}

function generateEnglish(key: string): string {
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function addKeysToFile(
  filePath: string,
  namespace: string,
  keys: Set<string>,
  isEnglish: boolean
): number {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = JSON.parse(content);

  // Navigate to namespace
  const namespaceParts = namespace.split('.');
  let current = translations;

  for (const part of namespaceParts) {
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    }
    current = current[part];
  }

  let added = 0;
  for (const key of keys) {
    if (getNestedValue(current, key) === undefined) {
      const english = generateEnglish(key);
      const value = isEnglish ? english : `[${english}]`;
      setNestedValue(current, key, value);
      added++;
    }
  }

  if (added > 0) {
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf-8');
  }

  return added;
}

function main() {
  const appDir = path.resolve(process.cwd(), 'src/app');
  const pageFiles = glob.sync('**/page.tsx', {
    cwd: appDir,
    absolute: true,
  });

  console.log(`🔍 Analyzing ${pageFiles.length} page files...\n`);

  const namespaceKeys = new Map<string, Set<string>>();

  for (const file of pageFiles) {
    const result = extractKeysFromFile(file);
    if (result) {
      if (!namespaceKeys.has(result.namespace)) {
        namespaceKeys.set(result.namespace, new Set());
      }
      result.keys.forEach((key) => namespaceKeys.get(result.namespace)!.add(key));
    }
  }

  const projectRoot = process.cwd();
  const enFile = path.join(projectRoot, 'messages', 'en.json');
  const arFile = path.join(projectRoot, 'messages', 'ar.json');

  let totalEn = 0;
  let totalAr = 0;

  for (const [namespace, keys] of namespaceKeys.entries()) {
    if (keys.size === 0) continue;

    console.log(`📦 ${namespace} (${keys.size} unique keys)`);

    const addedEn = addKeysToFile(enFile, namespace, keys, true);
    const addedAr = addKeysToFile(arFile, namespace, keys, false);

    totalEn += addedEn;
    totalAr += addedAr;

    if (addedEn > 0 || addedAr > 0) {
      console.log(`   ✓ Added ${addedEn} to en.json, ${addedAr} to ar.json`);
    }
    console.log('');
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Total added to en.json: ${totalEn}`);
  console.log(`   Total added to ar.json: ${totalAr}`);
}

main();
