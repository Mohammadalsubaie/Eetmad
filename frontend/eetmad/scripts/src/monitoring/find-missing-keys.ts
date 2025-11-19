#!/usr/bin/env tsx

/**
 * Find all translation keys used in code and check if they exist
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface KeyUsage {
  file: string;
  namespace: string;
  key: string;
  line: number;
}

function extractKeysFromFile(filePath: string): KeyUsage[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results: KeyUsage[] = [];
  const lines = content.split('\n');

  // Find all useTranslations hooks
  const hooks = new Map<string, string>();
  const hookRegex = /const\s+(\w+)\s*=\s*useTranslations\(['"]([^'"]+)['"]\)/g;
  let match;
  while ((match = hookRegex.exec(content)) !== null) {
    hooks.set(match[1], match[2]);
  }

  if (hooks.size === 0) return results;

  // Extract all t('key') and tPages('key') calls
  lines.forEach((line, index) => {
    for (const [hookName, namespace] of hooks.entries()) {
      const pattern = new RegExp(`\\b${hookName}\\s*\\(\\s*['"]([^'"]+)['"]\\s*(?:,|\\))`, 'g');
      let keyMatch;
      while ((keyMatch = pattern.exec(line)) !== null) {
        const key = keyMatch[1];
        // Skip if it looks like a variable or template
        if (key.length > 100 || key.includes('${') || key.includes('`')) continue;

        results.push({
          file: path.relative(process.cwd(), filePath),
          namespace,
          key,
          line: index + 1,
        });
      }
    }
  });

  return results;
}

function keyExists(messages: Record<string, unknown>, namespace: string, key: string): boolean {
  const namespaceParts = namespace.split('.');
  let current: Record<string, unknown> = messages;

  for (const part of namespaceParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return false;
    }
    current = current[part] as Record<string, unknown>;
  }

  const keyParts = key.split('.');
  for (const part of keyParts) {
    if (!current || typeof current !== 'object' || !(part in current)) {
      return false;
    }
    current = current[part] as Record<string, unknown>;
  }

  return current !== undefined;
}

function main() {
  console.log('🔍 Finding Missing Translation Keys\n');
  console.log('='.repeat(60));
  console.log('');

  const appDir = path.resolve(process.cwd(), 'src');
  const files = glob.sync('**/*.tsx', { cwd: appDir, absolute: true });

  const enFile = path.join(process.cwd(), 'messages', 'en.json');
  const arFile = path.join(process.cwd(), 'messages', 'ar.json');

  const enMessages = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
  const arMessages = JSON.parse(fs.readFileSync(arFile, 'utf-8'));

  console.log(`📂 Scanning ${files.length} files...\n`);

  const allUsages: KeyUsage[] = [];
  for (const file of files) {
    allUsages.push(...extractKeysFromFile(file));
  }

  console.log(`📦 Found ${allUsages.length} translation key usages\n`);

  const missing: Array<{ usage: KeyUsage; missingIn: string[] }> = [];

  for (const usage of allUsages) {
    const enExists = keyExists(enMessages, usage.namespace, usage.key);
    const arExists = keyExists(arMessages, usage.namespace, usage.key);

    if (!enExists || !arExists) {
      const missingIn: string[] = [];
      if (!enExists) missingIn.push('en');
      if (!arExists) missingIn.push('ar');
      missing.push({ usage, missingIn });
    }
  }

  if (missing.length === 0) {
    console.log('✅ All translation keys exist!\n');
    process.exit(0);
  }

  console.log(`⚠️  Found ${missing.length} missing keys:\n`);

  // Group by file
  const byFile = missing.reduce(
    (acc, item) => {
      if (!acc[item.usage.file]) {
        acc[item.usage.file] = [];
      }
      acc[item.usage.file].push(item);
      return acc;
    },
    {} as Record<string, typeof missing>
  );

  for (const [file, items] of Object.entries(byFile)) {
    console.log(`📄 ${file}`);
    const namespace = items[0].usage.namespace;
    console.log(`   Namespace: ${namespace}`);

    for (const item of items) {
      const missingStr = item.missingIn.join(' & ');
      console.log(`   ❌ "${item.usage.key}" missing in ${missingStr} (line ${item.usage.line})`);
    }
    console.log('');
  }

  process.exit(1);
}

main();
