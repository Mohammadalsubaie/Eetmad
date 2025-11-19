#!/usr/bin/env tsx

/**
 * Translation Validation Script
 *
 * This script:
 * 1. Scans all page files for translation usage
 * 2. Extracts all translation namespaces and keys used
 * 3. Checks if all keys exist in both en.json and ar.json
 * 4. Reports missing translations and structure mismatches
 * 5. Does NOT fix anything - only reports issues
 */

import * as fs from 'fs';
import * as path from 'path';

interface TranslationUsage {
  files: string[];
  namespace: string;
  keys: Set<string>;
  lineNumbers: Map<string, number[]>;
}

interface TranslationFile {
  [key: string]: unknown;
}

interface ValidationResult {
  namespace: string;
  missingInEn: string[];
  missingInAr: string[];
  structureMismatch: boolean;
  expectedStructure: Record<string, unknown>;
  actualStructureEn: Record<string, unknown>;
  actualStructureAr: Record<string, unknown>;
}

/**
 * Find all page.tsx files
 */
function findPageFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        files.push(...findPageFiles(fullPath));
      }
    } else if (entry.name === 'page.tsx') {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract translation namespace from useTranslations call
 */
function extractNamespace(content: string): string | null {
  // Match: useTranslations('namespace') or useTranslations("namespace")
  const regex = /useTranslations\(['"]([^'"]+)['"]\)/;
  const match = content.match(regex);
  return match ? match[1] : null;
}

/**
 * Extract all translation keys used in the file
 * Handles: t('key'), t("key"), t('key.subkey'), t.rich('key'), etc.
 */
function extractTranslationKeys(
  content: string,
  namespace: string
): {
  keys: Set<string>;
  lineNumbers: Map<string, number[]>;
} {
  const keys = new Set<string>();
  const lineNumbers = new Map<string, number[]>();
  const lines = content.split('\n');

  // Pattern to match t('key'), t("key"), t('key.subkey'), t.rich('key'), etc.
  // Matches: t('key'), t("key"), t('key.subkey'), t.rich('key'), t('key', {...})
  const patterns = [
    // Simple: t('key') or t("key")
    /\bt\s*\(\s*['"]([^'"]+)['"]\s*(?:,|\))/g,
    // With method: t.rich('key'), t.markup('key'), etc.
    /\bt\.\w+\s*\(\s*['"]([^'"]+)['"]\s*(?:,|\))/g,
  ];

  lines.forEach((line, index) => {
    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        const key = match[1];
        if (key) {
          keys.add(key);
          if (!lineNumbers.has(key)) {
            lineNumbers.set(key, []);
          }
          lineNumbers.get(key)!.push(index + 1);
        }
      }
    });
  });

  return { keys, lineNumbers };
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null ? (current as Record<string, unknown>)[key] : undefined;
  }, obj as unknown);
}

/**
 * Check if a key exists in the translation object
 */
function keyExists(translations: TranslationFile, namespace: string, key: string): boolean {
  // Navigate to namespace (handle nested namespaces like 'pages.projects')
  const namespaceData = getNestedValue(translations, namespace);
  if (!namespaceData || typeof namespaceData !== 'object' || namespaceData === null) {
    return false;
  }

  // Handle nested keys like 'key.subkey'
  if (key.includes('.')) {
    return getNestedValue(namespaceData as Record<string, unknown>, key) !== undefined;
  }

  return (namespaceData as Record<string, unknown>)[key] !== undefined;
}

/**
 * Get the structure of a namespace in translation file
 */
function getNamespaceStructure(translations: TranslationFile, namespace: string): Record<string, unknown> | null {
  return getNestedValue(translations, namespace) || null;
}

/**
 * Compare two objects and find differences
 */
function compareStructures(obj1: Record<string, unknown>, obj2: Record<string, unknown>, path: string = ''): string[] {
  const differences: string[] = [];

  if (obj1 === null || obj1 === undefined) {
    if (obj2 !== null && obj2 !== undefined) {
      differences.push(`${path}: Missing in first object`);
    }
    return differences;
  }

  if (obj2 === null || obj2 === undefined) {
    if (obj1 !== null && obj1 !== undefined) {
      differences.push(`${path}: Missing in second object`);
    }
    return differences;
  }

  if (typeof obj1 !== typeof obj2) {
    differences.push(`${path}: Type mismatch (${typeof obj1} vs ${typeof obj2})`);
    return differences;
  }

  if (typeof obj1 !== 'object' || Array.isArray(obj1)) {
    return differences;
  }

  const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  for (const key of allKeys) {
    const newPath = path ? `${path}.${key}` : key;
    if (!(key in obj1)) {
      differences.push(`${newPath}: Missing in first object`);
    } else if (!(key in obj2)) {
      differences.push(`${newPath}: Missing in second object`);
    } else {
      differences.push(...compareStructures(obj1[key], obj2[key], newPath));
    }
  }

  return differences;
}

/**
 * Load translation file
 */
function loadTranslationFile(filePath: string): TranslationFile | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Error loading ${filePath}:`, error);
    return null;
  }
}

/**
 * Main validation function
 */
function main() {
  const projectRoot = process.cwd();
  const appDir = path.resolve(projectRoot, 'src/app');
  const messagesDir = path.resolve(projectRoot, 'messages');
  const enFile = path.join(messagesDir, 'en.json');
  const arFile = path.join(messagesDir, 'ar.json');

  console.log('🔍 Translation Validation Script\n');
  console.log('='.repeat(60));
  console.log('📋 This script checks:');
  console.log('   1. All translation keys used in pages');
  console.log('   2. If keys exist in en.json');
  console.log('   3. If keys exist in ar.json');
  console.log('   4. Structure consistency between languages');
  console.log('='.repeat(60));
  console.log('');

  // Load translation files
  console.log('📂 Loading translation files...');
  const enTranslations = loadTranslationFile(enFile);
  const arTranslations = loadTranslationFile(arFile);

  if (!enTranslations || !arTranslations) {
    console.error('❌ Failed to load translation files');
    process.exit(1);
  }

  console.log(`   ✓ Loaded en.json (${Object.keys(enTranslations).length} namespaces)`);
  console.log(`   ✓ Loaded ar.json (${Object.keys(arTranslations).length} namespaces)\n`);

  // Find all page files
  console.log('🔍 Scanning page files...');
  const pageFiles = findPageFiles(appDir);
  console.log(`   Found ${pageFiles.length} page files\n`);

  // Extract translation usage from all pages
  const translationUsage = new Map<string, TranslationUsage>();

  for (const filePath of pageFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const namespace = extractNamespace(content);

    if (!namespace) {
      continue; // Skip files without translations
    }

    const { keys, lineNumbers } = extractTranslationKeys(content, namespace);
    const relativePath = path.relative(projectRoot, filePath);

    if (keys.size > 0) {
      if (!translationUsage.has(namespace)) {
        translationUsage.set(namespace, {
          files: [],
          namespace,
          keys: new Set(),
          lineNumbers: new Map(),
        });
      }

      const usage = translationUsage.get(namespace)!;
      if (!usage.files.includes(relativePath)) {
        usage.files.push(relativePath);
      }
      keys.forEach((key) => {
        usage.keys.add(key);
        const existingLines = usage.lineNumbers.get(key) || [];
        const newLines = lineNumbers.get(key) || [];
        usage.lineNumbers.set(key, [...existingLines, ...newLines]);
      });
    }
  }

  console.log(`   Found ${translationUsage.size} unique translation namespaces\n`);

  // Validate each namespace
  const results: ValidationResult[] = [];
  let totalIssues = 0;

  console.log('🔎 Validating translations...\n');

  for (const [namespace, usage] of translationUsage) {
    const missingInEn: string[] = [];
    const missingInAr: string[] = [];

    // Check if namespace exists (handle nested namespaces)
    const namespaceExistsInEn = getNestedValue(enTranslations, namespace) !== undefined;
    const namespaceExistsInAr = getNestedValue(arTranslations, namespace) !== undefined;

    // Check each key
    for (const key of usage.keys) {
      if (!namespaceExistsInEn || !keyExists(enTranslations, namespace, key)) {
        missingInEn.push(key);
      }
      if (!namespaceExistsInAr || !keyExists(arTranslations, namespace, key)) {
        missingInAr.push(key);
      }
    }

    // Check structure consistency
    const enStructure = getNamespaceStructure(enTranslations, namespace);
    const arStructure = getNamespaceStructure(arTranslations, namespace);
    const structureDifferences = compareStructures(enStructure, arStructure, namespace);

    const hasIssues =
      !namespaceExistsInEn ||
      !namespaceExistsInAr ||
      missingInEn.length > 0 ||
      missingInAr.length > 0 ||
      structureDifferences.length > 0;

    if (hasIssues) {
      totalIssues += missingInEn.length + missingInAr.length + structureDifferences.length;

      results.push({
        namespace,
        missingInEn,
        missingInAr,
        structureMismatch: structureDifferences.length > 0,
        expectedStructure: enStructure,
        actualStructureEn: enStructure,
        actualStructureAr: arStructure,
      });
    }
  }

  // Print results
  console.log('='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));
  console.log('');

  if (results.length === 0) {
    console.log('✅ All translations are valid!');
    console.log('   ✓ All keys exist in en.json');
    console.log('   ✓ All keys exist in ar.json');
    console.log('   ✓ Structures match between languages\n');
    process.exit(0);
  }

  console.log(`⚠️  Found issues in ${results.length} namespace(s)\n`);

  for (const result of results) {
    console.log(`📦 Namespace: "${result.namespace}"`);
    const usage = translationUsage.get(result.namespace);
    if (usage && usage.files.length > 0) {
      console.log(`   Files using this namespace:`);
      usage.files.forEach((file) => {
        console.log(`      - ${file}`);
      });
      console.log('');
    }

    // Missing in English
    if (result.missingInEn.length > 0) {
      console.log(`   ❌ Missing in en.json (${result.missingInEn.length} keys):`);
      result.missingInEn.forEach((key) => {
        const usage = translationUsage.get(result.namespace);
        const lines = usage?.lineNumbers.get(key) || [];
        const lineInfo = lines.length > 0 ? ` (lines: ${lines.join(', ')})` : '';
        console.log(`      - "${key}"${lineInfo}`);
      });
      console.log('');
    }

    // Missing in Arabic
    if (result.missingInAr.length > 0) {
      console.log(`   ❌ Missing in ar.json (${result.missingInAr.length} keys):`);
      result.missingInAr.forEach((key) => {
        const usage = translationUsage.get(result.namespace);
        const lines = usage?.lineNumbers.get(key) || [];
        const lineInfo = lines.length > 0 ? ` (lines: ${lines.join(', ')})` : '';
        console.log(`      - "${key}"${lineInfo}`);
      });
      console.log('');
    }

    // Structure mismatch
    if (result.structureMismatch) {
      console.log(`   ⚠️  Structure mismatch detected:`);
      const enStructure = result.actualStructureEn;
      const arStructure = result.actualStructureAr;

      if (!enStructure && !arStructure) {
        console.log(
          `      - Namespace "${result.namespace}" does not exist in either en.json or ar.json`
        );
        console.log(`      - This namespace is used in pages but missing from translation files`);
      } else if (!enStructure) {
        console.log(`      - Namespace "${result.namespace}" does not exist in en.json`);
        console.log(`      - It exists in ar.json but not in en.json`);
      } else if (!arStructure) {
        console.log(`      - Namespace "${result.namespace}" does not exist in ar.json`);
        console.log(`      - It exists in en.json but not in ar.json`);
      } else {
        const differences = compareStructures(enStructure, arStructure, result.namespace);
        if (differences.length > 0) {
          differences.forEach((diff) => {
            console.log(`      - ${diff}`);
          });
        } else {
          console.log(`      - Structures have different key arrangements`);
        }
      }
      console.log('');
    }

    // Expected structure - show what should exist based on what's used
    if (usage && usage.keys.size > 0) {
      console.log(`   📋 Expected structure in messages/en.json and messages/ar.json:`);
      console.log(`      "${result.namespace}": {`);

      // Build expected structure from used keys
      const expectedKeys: string[] = Array.from(usage.keys).sort();
      expectedKeys.forEach((key, index) => {
        const isLast = index === expectedKeys.length - 1;
        const comma = isLast ? '' : ',';
        if (key.includes('.')) {
          // Nested key - show structure
          const parts = key.split('.');
          let indent = '        ';
          for (let i = 0; i < parts.length - 1; i++) {
            console.log(`${indent}"${parts[i]}": {`);
            indent += '  ';
          }
          console.log(`${indent}"${parts[parts.length - 1]}": "translation here"${comma}`);
          for (let i = parts.length - 2; i >= 0; i--) {
            indent = indent.slice(2);
            console.log(`${indent}}${i === 0 ? comma : ''}`);
          }
        } else {
          console.log(`        "${key}": "translation here"${comma}`);
        }
      });
      console.log(`      }`);
      console.log('');
    } else if (result.expectedStructure) {
      // Fallback to showing actual structure if available
      console.log(`   📋 Current structure in en.json:`);
      console.log(JSON.stringify({ [result.namespace]: result.expectedStructure }, null, 6));
      console.log('');
    }

    console.log('   ' + '-'.repeat(56));
    console.log('');
  }

  // Summary
  console.log('='.repeat(60));
  console.log('📈 SUMMARY');
  console.log('='.repeat(60));
  console.log(`   Total namespaces checked: ${translationUsage.size}`);
  console.log(`   Namespaces with issues: ${results.length}`);
  console.log(`   Total issues found: ${totalIssues}`);
  console.log('');

  const missingEnCount = results.reduce((sum, r) => sum + r.missingInEn.length, 0);
  const missingArCount = results.reduce((sum, r) => sum + r.missingInAr.length, 0);
  const structureIssues = results.filter((r) => r.structureMismatch).length;

  console.log(`   Missing in en.json: ${missingEnCount} keys`);
  console.log(`   Missing in ar.json: ${missingArCount} keys`);
  console.log(`   Structure mismatches: ${structureIssues} namespace(s)`);
  console.log('');

  if (totalIssues > 0) {
    console.log('💡 Next steps:');
    console.log('   1. Add missing keys to the appropriate translation files');
    console.log('   2. Ensure structure matches between en.json and ar.json');
    console.log('   3. Run this script again to verify fixes');
    console.log('');
    process.exit(1);
  }

  process.exit(0);
}

// Run if executed directly
main();
