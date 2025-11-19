#!/usr/bin/env tsx

/**
 * Check for actual runtime translation errors by:
 * 1. Validating JSON files are parseable
 * 2. Checking for common next-intl error patterns
 * 3. Testing actual key access
 */

import * as fs from 'fs';
import * as path from 'path';

function validateJSON(filePath: string): { valid: boolean; error?: string } {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    JSON.parse(content);
    return { valid: true };
  } catch (error: unknown) {
    return { valid: false, error: error instanceof Error ? error.message : String(error) };
  }
}

function testKeyAccess(messages: Record<string, unknown>, namespace: string, key: string): boolean {
  try {
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
  } catch {
    return false;
  }
}

function findCommonIssues(
  enMessages: Record<string, unknown>,
  arMessages: Record<string, unknown>
): string[] {
  const issues: string[] = [];

  // Check for common missing patterns
  const commonKeys = [
    'pages.new.title',
    'pages.edit.title',
    'pages.verification.title',
    'pages.users.title',
    'pages.settings.title',
    'pages.reviews.title',
    'pages.payments.title',
    'pages.setup.title',
    'nav.about',
    'nav.requests',
    'nav.suppliers',
    'nav.contact',
    'nav.toggleMenu',
    'auth.twoFactor.qrCodeAlt',
  ];

  for (const keyPath of commonKeys) {
    const [namespace, ...keyParts] = keyPath.split('.');
    const key = keyParts.join('.');

    if (!testKeyAccess(enMessages, namespace, key)) {
      issues.push(`Missing in en.json: ${keyPath}`);
    }
    if (!testKeyAccess(arMessages, namespace, key)) {
      issues.push(`Missing in ar.json: ${keyPath}`);
    }
  }

  return issues;
}

function main() {
  console.log('🔍 Checking for Runtime Translation Errors\n');
  console.log('='.repeat(60));
  console.log('');

  const projectRoot = process.cwd();
  const enFile = path.join(projectRoot, 'messages', 'en.json');
  const arFile = path.join(projectRoot, 'messages', 'ar.json');

  // Validate JSON files
  console.log('📋 Validating JSON files...');
  const enValidation = validateJSON(enFile);
  const arValidation = validateJSON(arFile);

  if (!enValidation.valid) {
    console.error(`❌ en.json is invalid: ${enValidation.error}`);
    process.exit(1);
  }

  if (!arValidation.valid) {
    console.error(`❌ ar.json is invalid: ${arValidation.error}`);
    process.exit(1);
  }

  console.log('   ✓ en.json is valid');
  console.log('   ✓ ar.json is valid\n');

  // Load messages
  const enMessages = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
  const arMessages = JSON.parse(fs.readFileSync(arFile, 'utf-8'));

  // Check for common issues
  console.log('🔎 Checking for common missing keys...\n');
  const issues = findCommonIssues(enMessages, arMessages);

  if (issues.length > 0) {
    console.log('⚠️  Found issues:\n');
    issues.forEach((issue) => console.log(`   - ${issue}`));
    console.log('');
    process.exit(1);
  }

  console.log('✅ No common issues found!\n');

  // Test actual key access for critical paths
  console.log('🧪 Testing critical translation paths...\n');

  const criticalTests = [
    { namespace: 'pages', key: 'admin.title' },
    { namespace: 'pages', key: 'new.title' },
    { namespace: 'pages', key: 'edit.title' },
    { namespace: 'nav', key: 'about' },
    { namespace: 'auth.twoFactor', key: 'qrCodeAlt' },
  ];

  let allPassed = true;
  for (const test of criticalTests) {
    const enExists = testKeyAccess(enMessages, test.namespace, test.key);
    const arExists = testKeyAccess(arMessages, test.namespace, test.key);

    if (!enExists || !arExists) {
      console.log(`   ❌ ${test.namespace}.${test.key}`);
      if (!enExists) console.log(`      Missing in en.json`);
      if (!arExists) console.log(`      Missing in ar.json`);
      allPassed = false;
    } else {
      console.log(`   ✓ ${test.namespace}.${test.key}`);
    }
  }

  console.log('');

  if (allPassed) {
    console.log('✅ All critical paths are valid!\n');
    console.log('💡 If you still see errors in the browser:');
    console.log('   1. Check browser console for next-intl errors');
    console.log('   2. Clear .next cache: rm -rf .next');
    console.log('   3. Restart dev server: npm run dev\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some critical paths are missing!\n');
    process.exit(1);
  }
}

main();
