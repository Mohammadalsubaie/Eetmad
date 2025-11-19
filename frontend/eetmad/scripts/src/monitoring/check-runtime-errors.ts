#!/usr/bin/env tsx

/**
 * Check for translation errors by analyzing the app structure
 * and comparing with actual usage patterns
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface TranslationUsage {
  file: string;
  namespace: string;
  keys: Set<string>;
  lineNumbers: Map<string, number[]>;
}

function extractTranslationsFromFile(filePath: string): TranslationUsage[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results: TranslationUsage[] = [];

  // Extract all translation hooks and their namespaces
  const translationHooks = new Map<string, string>();
  const hookMatches = content.matchAll(/const\s+(\w+)\s*=\s*useTranslations\(['"]([^'"]+)['"]\)/g);

  for (const match of hookMatches) {
    const hookName = match[1];
    const namespace = match[2];
    translationHooks.set(hookName, namespace);
  }

  if (translationHooks.size === 0) return results;

  // Default to first hook if no specific hook is found
  const defaultHook = Array.from(translationHooks.keys())[0];
  const defaultNamespace = translationHooks.get(defaultHook)!;

  // Group keys by namespace (hook)
  const keysByNamespace = new Map<
    string,
    { keys: Set<string>; lineNumbers: Map<string, number[]> }
  >();

  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match t('key'), tPages('key'), etc. - only match known translation hooks
    for (const hookName of translationHooks.keys()) {
      const pattern = new RegExp(`\\b${hookName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*(?:,|\\))`, 'g');
      let match;

      while ((match = pattern.exec(line)) !== null) {
        const key = match[1];
        const namespace = translationHooks.get(hookName)!;

        // Skip if key looks like it's not a translation key (contains special chars, is too long, etc.)
        if (key.length > 100 || key.includes('\n') || key.includes('\\n')) {
          continue;
        }

        if (!keysByNamespace.has(namespace)) {
          keysByNamespace.set(namespace, {
            keys: new Set(),
            lineNumbers: new Map(),
          });
        }

        const namespaceData = keysByNamespace.get(namespace)!;
        namespaceData.keys.add(key);

        if (!namespaceData.lineNumbers.has(key)) {
          namespaceData.lineNumbers.set(key, []);
        }
        namespaceData.lineNumbers.get(key)!.push(index + 1);
      }
    }
  });

  // Create results for each namespace
  for (const [namespace, { keys, lineNumbers }] of keysByNamespace.entries()) {
    if (keys.size > 0) {
      results.push({
        file: path.relative(process.cwd(), filePath),
        namespace,
        keys,
        lineNumbers,
      });
    }
  }

  return results;
}

function checkTranslationKey(
  messages: Record<string, unknown>,
  namespace: string,
  key: string
): { exists: boolean; path: string } {
  // Navigate to namespace
  const namespaceParts = namespace.split('.');
  let current: Record<string, unknown> = messages;

  for (const part of namespaceParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return { exists: false, path: namespace };
    }
    current = current[part] as Record<string, unknown>;
  }

  // Check key
  const keyParts = key.split('.');
  for (const part of keyParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return { exists: false, path: `${namespace}.${key}` };
    }
    current = current[part] as Record<string, unknown>;
  }

  return { exists: true, path: `${namespace}.${key}` };
}

function main() {
  console.log('🔍 Checking for Runtime Translation Errors\n');
  console.log('='.repeat(60));
  console.log('');

  const appDir = path.resolve(process.cwd(), 'src');
  const pageFiles = glob.sync('**/*.tsx', {
    cwd: appDir,
    absolute: true,
  });

  // Load translation files
  const enFile = path.join(process.cwd(), 'messages', 'en.json');
  const arFile = path.join(process.cwd(), 'messages', 'ar.json');

  if (!fs.existsSync(enFile) || !fs.existsSync(arFile)) {
    console.error('❌ Translation files not found!');
    process.exit(1);
  }

  const enMessages = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
  const arMessages = JSON.parse(fs.readFileSync(arFile, 'utf-8'));

  console.log(`📂 Scanning ${pageFiles.length} files...\n`);

  const allUsages: TranslationUsage[] = [];

  for (const file of pageFiles) {
    const usages = extractTranslationsFromFile(file);
    allUsages.push(...usages);
  }

  console.log(`📦 Found ${allUsages.length} files using translations\n`);

  const errors: Array<{
    file: string;
    namespace: string;
    key: string;
    line: number;
    missingIn: 'en' | 'ar' | 'both';
  }> = [];

  for (const usage of allUsages) {
    for (const key of usage.keys) {
      const enCheck = checkTranslationKey(enMessages, usage.namespace, key);
      const arCheck = checkTranslationKey(arMessages, usage.namespace, key);

      if (!enCheck.exists || !arCheck.exists) {
        const lines = usage.lineNumbers.get(key) || [];
        const missingIn =
          !enCheck.exists && !arCheck.exists ? 'both' : !enCheck.exists ? 'en' : 'ar';

        errors.push({
          file: usage.file,
          namespace: usage.namespace,
          key,
          line: lines[0] || 0,
          missingIn,
        });
      }
    }
  }

  if (errors.length === 0) {
    console.log('✅ No translation errors found!');
    console.log('   All translation keys are properly defined.\n');
    process.exit(0);
  }

  console.log(`⚠️  Found ${errors.length} potential runtime errors:\n`);

  // Group by file
  const byFile = errors.reduce(
    (acc, err) => {
      if (!acc[err.file]) {
        acc[err.file] = [];
      }
      acc[err.file].push(err);
      return acc;
    },
    {} as Record<string, typeof errors>
  );

  for (const [file, fileErrors] of Object.entries(byFile)) {
    console.log(`📄 ${file}`);
    console.log(`   Namespace: ${fileErrors[0].namespace}`);

    for (const err of fileErrors) {
      const missing = err.missingIn === 'both' ? 'en.json & ar.json' : `${err.missingIn}.json`;
      console.log(`   ❌ Missing key "${err.key}" in ${missing} (line ${err.line})`);
    }
    console.log('');
  }

  console.log('💡 These errors may cause runtime issues when the app runs.');
  console.log('   Run: npm run validate:translations to fix them.\n');

  process.exit(1);
}

main();
