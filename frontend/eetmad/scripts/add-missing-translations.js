#!/usr/bin/env node

/**
 * Script to add missing translation keys from en.json to ar.json
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const AR_JSON = path.join(EETMAD_ROOT, 'messages/ar.json');
const EN_JSON = path.join(EETMAD_ROOT, 'messages/en.json');
const REPORT_FILE = path.join(EETMAD_ROOT, '../../frontend/translation-check-report.txt');

// Helper function to set nested value
function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// Helper function to get nested value
function getNestedValue(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

// Helper function to check if key exists
function keyExists(key, translations) {
  return getNestedValue(translations, key) !== undefined;
}

// Read report
const report = JSON.parse(fs.readFileSync(REPORT_FILE, 'utf8'));
const ar = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));
const en = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));

console.log('🔧 بدء إضافة المفاتيح المفقودة...\n');

let addedCount = 0;
const notFoundInEn = [];

// Add missing keys from ar.json
console.log('📝 إضافة المفاتيح المفقودة في ar.json:');
for (const key of report.missingInAr) {
  // Try to get value from en.json first
  const enValue = getNestedValue(en, key);
  if (enValue && typeof enValue === 'string') {
    // For now, use English value as placeholder (you can translate later)
    // Or use a generic Arabic placeholder
    setNestedValue(ar, key, `[ترجمة مطلوبة: ${enValue}]`);
    addedCount++;
    if (addedCount <= 10) {
      console.log(`  ✓ ${key}`);
    }
  } else {
    notFoundInEn.push(key);
    // Add a generic placeholder
    setNestedValue(ar, key, '[ترجمة مطلوبة]');
    addedCount++;
  }
}

if (addedCount > 10) {
  console.log(`  ... و ${addedCount - 10} مفتاح آخر`);
}

console.log(`\n✅ تم إضافة ${addedCount} مفتاح إلى ar.json`);

if (notFoundInEn.length > 0) {
  console.log(`\n⚠️  ${notFoundInEn.length} مفتاح غير موجود في en.json:`);
  notFoundInEn.slice(0, 5).forEach(key => console.log(`  - ${key}`));
  if (notFoundInEn.length > 5) {
    console.log(`  ... و ${notFoundInEn.length - 5} مفتاح آخر`);
  }
}

// Save ar.json
fs.writeFileSync(AR_JSON, JSON.stringify(ar, null, 2) + '\n', 'utf8');
console.log(`\n💾 تم حفظ ar.json`);

// Now add missing keys to en.json
console.log('\n📝 إضافة المفاتيح المفقودة في en.json:');
let addedCountEn = 0;

for (const key of report.missingInEn) {
  // Try to get value from ar.json first
  const arValue = getNestedValue(ar, key);
  if (arValue && typeof arValue === 'string' && !arValue.includes('[ترجمة مطلوبة]')) {
    // Use Arabic value as reference (but keep English structure)
    setNestedValue(en, key, `[Translation needed]`);
    addedCountEn++;
    if (addedCountEn <= 10) {
      console.log(`  ✓ ${key}`);
    }
  } else {
    // Add a generic placeholder
    setNestedValue(en, key, '[Translation needed]');
    addedCountEn++;
  }
}

if (addedCountEn > 10) {
  console.log(`  ... و ${addedCountEn - 10} مفتاح آخر`);
}

console.log(`\n✅ تم إضافة ${addedCountEn} مفتاح إلى en.json`);

// Save en.json
fs.writeFileSync(EN_JSON, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log(`\n💾 تم حفظ en.json`);

console.log('\n✅ اكتمل! يرجى مراجعة الملفات وترجمة النصوص المميزة بـ [ترجمة مطلوبة] أو [Translation needed]');

