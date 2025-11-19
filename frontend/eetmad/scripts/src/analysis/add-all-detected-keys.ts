#!/usr/bin/env tsx

/**
 * Add ALL keys detected as missing by validation script
 * This is more aggressive and adds keys even if they seem redundant
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

function getValidationOutput(): string {
  try {
    return execSync('npm run validate:translations 2>&1', {
      cwd: process.cwd(),
      encoding: 'utf-8',
    }).toString();
  } catch (error: unknown) {
    return (error as { stdout?: string })?.stdout || String(error);
  }
}

function parseAllMissingKeys(output: string): Map<string, { en: Set<string>; ar: Set<string> }> {
  const result = new Map<string, { en: Set<string>; ar: Set<string> }>();
  const lines = output.split('\n');

  let currentNamespace = '';
  let currentMissingEn = new Set<string>();
  let currentMissingAr = new Set<string>();
  let inEnSection = false;
  let inArSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const namespaceMatch = line.match(/📦 Namespace: "([^"]+)"/);
    if (namespaceMatch) {
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

    if (line.includes('Missing in en.json')) {
      inEnSection = true;
      inArSection = false;
      continue;
    }

    if (line.includes('Missing in ar.json')) {
      inEnSection = false;
      inArSection = true;
      continue;
    }

    const keyMatch = line.match(/- "([^"]+)"/);
    if (keyMatch && currentNamespace) {
      const key = keyMatch[1];
      if (inEnSection) {
        currentMissingEn.add(key);
      } else if (inArSection) {
        currentMissingAr.add(key);
      }
    }

    // Reset when we hit a new section
    if (line.includes('📋') || (line.match(/📦 Namespace:/) && i > 0)) {
      if (currentNamespace && (currentMissingEn.size > 0 || currentMissingAr.size > 0)) {
        result.set(currentNamespace, {
          en: new Set(currentMissingEn),
          ar: new Set(currentMissingAr),
        });
      }
      inEnSection = false;
      inArSection = false;
    }
  }

  if (currentNamespace && (currentMissingEn.size > 0 || currentMissingAr.size > 0)) {
    result.set(currentNamespace, {
      en: new Set(currentMissingEn),
      ar: new Set(currentMissingAr),
    });
  }

  return result;
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
    return current && typeof current === 'object' && current !== null ? (current as Record<string, unknown>)[key] : undefined;
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
    const existing = getNestedValue(current, key);
    if (existing === undefined) {
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
  console.log('🔍 Parsing validation output...\n');

  const output = getValidationOutput();
  const missingKeys = parseAllMissingKeys(output);

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

    if (addedEn > 0 || addedAr > 0) {
      console.log(`   ✓ Added ${addedEn} to en.json, ${addedAr} to ar.json`);
    }
    console.log('');
  }

  console.log(`\n✅ Complete!`);
  console.log(`   Total added to en.json: ${totalEn}`);
  console.log(`   Total added to ar.json: ${totalAr}`);
  console.log(`\n⚠️  Arabic translations are placeholders - please translate manually`);
}

main();
