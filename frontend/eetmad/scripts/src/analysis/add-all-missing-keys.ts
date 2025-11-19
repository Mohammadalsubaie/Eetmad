#!/usr/bin/env tsx

/**
 * Comprehensive script to add ALL missing translation keys
 * by analyzing actual page files and adding missing keys
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Run validation and capture output
function getValidationOutput(): string {
  try {
    return execSync('npm run validate:translations 2>&1', {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).toString();
  } catch (error: unknown) {
    // Validation exits with error code when issues found, but we want the output
    return (error as { stdout?: string })?.stdout || String(error);
  }
}

// Parse missing keys from validation output
function parseMissingKeys(output: string): Map<string, { en: Set<string>; ar: Set<string> }> {
  const result = new Map<string, { en: Set<string>; ar: Set<string> }>();
  const lines = output.split('\n');

  let currentNamespace = '';
  let currentMissingEn = new Set<string>();
  let currentMissingAr = new Set<string>();
  let inEnSection = false;
  let inArSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect namespace
    const namespaceMatch = line.match(/📦 Namespace: "([^"]+)"/);
    if (namespaceMatch) {
      // Save previous namespace
      if (currentNamespace) {
        result.set(currentNamespace, {
          en: new Set(currentMissingEn),
          ar: new Set(currentMissingAr),
        });
      }
      currentNamespace = namespaceMatch[1];
      currentMissingEn = new Set();
      currentMissingAr = new Set();
      inEnSection = false;
      inArSection = false;
      continue;
    }

    // Detect missing in en.json section
    if (line.includes('❌ Missing in en.json')) {
      inEnSection = true;
      inArSection = false;
      continue;
    }

    // Detect missing in ar.json section
    if (line.includes('❌ Missing in ar.json')) {
      inEnSection = false;
      inArSection = true;
      continue;
    }

    // Parse missing key
    const keyMatch = line.match(/- "([^"]+)"/);
    if (keyMatch) {
      const key = keyMatch[1];
      if (inEnSection) {
        currentMissingEn.add(key);
      } else if (inArSection) {
        currentMissingAr.add(key);
      }
    }

    // Reset sections when we hit a new section
    if (line.includes('⚠️') || line.includes('📋') || line.includes('📦')) {
      inEnSection = false;
      inArSection = false;
    }
  }

  // Save last namespace
  if (currentNamespace) {
    result.set(currentNamespace, {
      en: new Set(currentMissingEn),
      ar: new Set(currentMissingAr),
    });
  }

  return result;
}

// Set nested value - handles keys with dots by creating nested structure
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
  // Only set if undefined - don't overwrite existing values
  if (current[lastPart] === undefined) {
    current[lastPart] = value;
  }
}

// Get nested value
function getNestedValue(obj: Record<string, unknown>, keyPath: string): unknown {
  return keyPath.split('.').reduce((current: unknown, key: string) => {
    return current && typeof current === 'object' && current !== null
      ? (current as Record<string, unknown>)[key]
      : undefined;
  }, obj as unknown);
}

// Generate English translation
function generateEnglish(key: string): string {
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Generate Arabic placeholder
function generateArabic(key: string, english: string): string {
  // Return placeholder - needs manual translation
  return `[${english}]`;
}

// Add keys to file
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
    const existingValue = getNestedValue(current, key);
    // Only add if truly undefined (not null, not empty string, not false)
    if (existingValue === undefined) {
      const english = generateEnglish(key);
      const value = isEnglish ? english : generateArabic(key, english);
      setNestedValue(current, key, value);
      added++;
    }
  }

  if (added > 0) {
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf-8');
  }

  return added;
}

// Main
function main() {
  console.log('🔍 Analyzing validation output...\n');

  const output = getValidationOutput();
  const missingKeys = parseMissingKeys(output);

  if (missingKeys.size === 0) {
    console.log('✅ No missing keys found!');
    return;
  }

  const projectRoot = process.cwd();
  const enFile = path.join(projectRoot, 'messages', 'en.json');
  const arFile = path.join(projectRoot, 'messages', 'ar.json');

  console.log(`📦 Found ${missingKeys.size} namespaces with missing keys\n`);

  let totalEn = 0;
  let totalAr = 0;

  for (const [namespace, { en, ar }] of missingKeys.entries()) {
    if (en.size === 0 && ar.size === 0) continue;

    console.log(`📦 ${namespace}`);
    console.log(`   Missing in en.json: ${en.size} keys`);
    console.log(`   Missing in ar.json: ${ar.size} keys`);

    const addedEn = addKeysToFile(enFile, namespace, en, true);
    const addedAr = addKeysToFile(arFile, namespace, ar, false);

    totalEn += addedEn;
    totalAr += addedAr;

    console.log(`   ✓ Added ${addedEn} to en.json, ${addedAr} to ar.json\n`);
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Total added to en.json: ${totalEn}`);
  console.log(`   Total added to ar.json: ${totalAr}`);
  console.log(`\n⚠️  Arabic translations are placeholders - please translate manually`);
}

main();
