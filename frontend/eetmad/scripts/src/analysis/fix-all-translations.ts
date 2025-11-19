#!/usr/bin/env tsx

/**
 * Script to add ALL missing translation keys based on validation output
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

interface MissingKeys {
  namespace: string;
  en: string[];
  ar: string[];
}

/**
 * Set nested value in object using dot notation path
 */
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

/**
 * Get nested value from object using dot notation path
 */
function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null ? (current as Record<string, unknown>)[key] : undefined;
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
 * Generate Arabic translation placeholder (needs manual translation)
 */
function generateArabicTranslation(keyPath: string, englishValue: string): string {
  // For now, return a placeholder that indicates it needs translation
  // In a real scenario, you might use a translation service or dictionary
  return `[${englishValue}]`;
}

/**
 * Parse validation output to extract missing keys
 */
function parseValidationOutput(): MissingKeys[] {
  try {
    const output = execSync('npm run validate:translations', {
      cwd: process.cwd(),
      encoding: 'utf-8',
      stdio: 'pipe',
    }).toString();

    const missingKeys: MissingKeys[] = [];
    const lines = output.split('\n');

    let currentNamespace = '';
    let currentMissingEn: string[] = [];
    let currentMissingAr: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect namespace
      const namespaceMatch = line.match(/📦 Namespace: "([^"]+)"/);
      if (namespaceMatch) {
        if (currentNamespace) {
          missingKeys.push({
            namespace: currentNamespace,
            en: [...currentMissingEn],
            ar: [...currentMissingAr],
          });
        }
        currentNamespace = namespaceMatch[1];
        currentMissingEn = [];
        currentMissingAr = [];
        continue;
      }

      // Detect missing in en.json
      if (line.includes('❌ Missing in en.json')) {
        let j = i + 1;
        while (j < lines.length && lines[j].trim().startsWith('-')) {
          const keyMatch = lines[j].match(/- "([^"]+)"/);
          if (keyMatch) {
            currentMissingEn.push(keyMatch[1]);
          }
          j++;
        }
        i = j - 1;
        continue;
      }

      // Detect missing in ar.json
      if (line.includes('❌ Missing in ar.json')) {
        let j = i + 1;
        while (j < lines.length && lines[j].trim().startsWith('-')) {
          const keyMatch = lines[j].match(/- "([^"]+)"/);
          if (keyMatch) {
            currentMissingAr.push(keyMatch[1]);
          }
          j++;
        }
        i = j - 1;
        continue;
      }
    }

    // Add last namespace
    if (currentNamespace) {
      missingKeys.push({
        namespace: currentNamespace,
        en: [...currentMissingEn],
        ar: [...currentMissingAr],
      });
    }

    return missingKeys;
  } catch (error: unknown) {
    console.error('Error parsing validation output:', error instanceof Error ? error.message : String(error));
    return [];
  }
}

/**
 * Add missing keys to translation file
 */
function addMissingKeys(
  filePath: string,
  namespace: string,
  missingKeys: string[],
  isEnglish: boolean
): number {
  const content = fs.readFileSync(filePath, 'utf-8');
  const translations = JSON.parse(content);

  // Handle nested namespaces (e.g., "pages.projects" -> pages.projects)
  const namespaceParts = namespace.split('.');
  let current = translations;

  for (const part of namespaceParts) {
    if (!(part in current) || typeof current[part] !== 'object' || current[part] === null) {
      current[part] = {};
    }
    current = current[part];
  }

  let added = 0;
  for (const key of missingKeys) {
    const existingValue = getNestedValue(current, key);

    if (existingValue === undefined) {
      const englishValue = generateEnglishTranslation(key);
      const value = isEnglish ? englishValue : generateArabicTranslation(key, englishValue);
      setNestedValue(current, key, value);
      added++;
    }
  }

  if (added > 0) {
    // Write back with proper formatting
    const newContent = JSON.stringify(translations, null, 2);
    fs.writeFileSync(filePath, newContent + '\n', 'utf-8');
  }

  return added;
}

/**
 * Main function
 */
function main() {
  const projectRoot = process.cwd();
  const messagesDir = path.resolve(projectRoot, 'messages');
  const enFile = path.join(messagesDir, 'en.json');
  const arFile = path.join(messagesDir, 'ar.json');

  console.log('🔍 Parsing validation output to find missing keys...\n');

  const missingKeysByNamespace = parseValidationOutput();

  if (missingKeysByNamespace.length === 0) {
    console.log('✅ No missing keys found!');
    return;
  }

  console.log(`📦 Found ${missingKeysByNamespace.length} namespaces with missing keys\n`);

  let totalAddedEn = 0;
  let totalAddedAr = 0;

  for (const { namespace, en, ar } of missingKeysByNamespace) {
    if (en.length === 0 && ar.length === 0) continue;

    console.log(`📦 Namespace: "${namespace}"`);
    console.log(`   Missing in en.json: ${en.length} keys`);
    console.log(`   Missing in ar.json: ${ar.length} keys`);

    const addedEn = addMissingKeys(enFile, namespace, en, true);
    const addedAr = addMissingKeys(arFile, namespace, ar, false);

    totalAddedEn += addedEn;
    totalAddedAr += addedAr;

    console.log(`   ✓ Added ${addedEn} keys to en.json`);
    console.log(`   ✓ Added ${addedAr} keys to ar.json\n`);
  }

  console.log(`\n✅ Done!`);
  console.log(`   Total added to en.json: ${totalAddedEn} keys`);
  console.log(`   Total added to ar.json: ${totalAddedAr} keys`);
  console.log(
    `\n⚠️  Note: Arabic translations are placeholders. Please review and translate them manually.`
  );
}

main();
