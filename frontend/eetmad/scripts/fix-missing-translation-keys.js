#!/usr/bin/env node

/**
 * Fix Missing Translation Keys
 * 
 * This script reads the validation report and automatically adds
 * missing translation keys to ar.json using values from en.json
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const AR_JSON = path.join(EETMAD_ROOT, 'messages', 'ar.json');
const EN_JSON = path.join(EETMAD_ROOT, 'messages', 'en.json');
const REPORT_PATH = path.join(path.resolve(EETMAD_ROOT, '..'), 'TRANSLATION-VALIDATION-REPORT.md');

// Load translation files
let arMessages, enMessages;

try {
  arMessages = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));
  enMessages = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));
} catch (error) {
  console.error('❌ Failed to load translation files:', error.message);
  process.exit(1);
}

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return null;
    }
  }
  return current;
}

/**
 * Set nested value in object using dot notation
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;
  
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }
  
    current[keys[keys.length - 1]] = value;
}

/**
 * Parse missing keys from report
 */
function parseMissingKeys() {
  const report = fs.readFileSync(REPORT_PATH, 'utf8');
  const missingKeys = [];
  
  // Extract missing key patterns
  const pattern = /Missing translation key: ([^\s]+) \(missing in: ([^)]+)\)/g;
  let match;
  
  while ((match = pattern.exec(report)) !== null) {
    const fullKey = match[1];
    const missingIn = match[2];
    
    if (missingIn.includes('ar')) {
      missingKeys.push(fullKey);
    }
  }
  
  return [...new Set(missingKeys)]; // Remove duplicates
}

/**
 * Add missing keys to ar.json
 */
function addMissingKeys() {
  console.log('🔍 Reading validation report...\n');
  
  const missingKeys = parseMissingKeys();
  
  if (missingKeys.length === 0) {
    console.log('✅ No missing keys found!');
    return;
  }
  
  console.log(`📋 Found ${missingKeys.length} missing keys in ar.json\n`);
  console.log('Adding missing keys...\n');
  
  let added = 0;
  let skipped = 0;
  
  for (const fullKey of missingKeys) {
    const enValue = getNestedValue(enMessages, fullKey);
    
    if (!enValue) {
      console.log(`⚠️  Key ${fullKey} not found in en.json, skipping`);
      skipped++;
      continue;
    }
    
    const arValue = getNestedValue(arMessages, fullKey);
    
    if (arValue) {
      console.log(`ℹ️  Key ${fullKey} already exists in ar.json, skipping`);
      skipped++;
      continue;
    }
    
    // Add the key
    const keys = fullKey.split('.');
    let current = arMessages;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
        current[key] = {};
      }
      current = current[key];
    }
    
    const lastKey = keys[keys.length - 1];
    current[lastKey] = `[ترجمة مطلوبة: ${enValue}]`;
    
    console.log(`✅ Added: ${fullKey}`);
    added++;
  }
  
  // Save updated ar.json
  fs.writeFileSync(AR_JSON, JSON.stringify(arMessages, null, 2) + '\n', 'utf8');
  
  console.log(`\n${'='.repeat(60)}`);
  console.log(`\n✅ Added ${added} missing keys`);
  if (skipped > 0) {
    console.log(`ℹ️  Skipped ${skipped} keys (already exist or not in en.json)`);
  }
  console.log(`\n📄 Updated: ${AR_JSON}\n`);
}

// Run
addMissingKeys();

