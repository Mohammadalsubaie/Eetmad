#!/usr/bin/env node

/**
 * Translation Checker Script
 * 
 * هذا السكريبت يفحص جميع استخدامات الترجمات في المشروع
 * ويتحقق من وجود جميع المفاتيح في ملفات الترجمة (ar.json و en.json)
 */

const fs = require('fs');
const path = require('path');

// المسارات - استخدام المسار المطلق من موقع السكريبت
// __dirname يشير إلى frontend/eetmad/scripts
// لذا ../.. يعيدنا إلى frontend/eetmad
const SCRIPT_DIR = __dirname;
const EETMAD_ROOT = path.resolve(SCRIPT_DIR, '..');
const SRC_DIR = path.join(EETMAD_ROOT, 'src');
const AR_JSON = path.join(EETMAD_ROOT, 'messages/ar.json');
const EN_JSON = path.join(EETMAD_ROOT, 'messages/en.json');

// قراءة ملفات الترجمة
function loadTranslations() {
  try {
    // التحقق من وجود الملفات
    if (!fs.existsSync(AR_JSON)) {
      console.error(`❌ ملف ar.json غير موجود في: ${AR_JSON}`);
      process.exit(1);
    }
    if (!fs.existsSync(EN_JSON)) {
      console.error(`❌ ملف en.json غير موجود في: ${EN_JSON}`);
      process.exit(1);
    }
    
    const arContent = fs.readFileSync(AR_JSON, 'utf8');
    const enContent = fs.readFileSync(EN_JSON, 'utf8');
    return {
      ar: JSON.parse(arContent),
      en: JSON.parse(enContent),
    };
  } catch (error) {
    console.error('❌ خطأ في قراءة ملفات الترجمة:', error.message);
    console.error(`   AR_JSON: ${AR_JSON}`);
    console.error(`   EN_JSON: ${EN_JSON}`);
    process.exit(1);
  }
}

// استخراج جميع المفاتيح من كائن JSON بشكل متداخل
function getAllKeys(obj, prefix = '') {
  const keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// قراءة جميع الملفات في مجلد معين
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// استخراج استخدامات الترجمات من ملف
function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const translations = new Set();
  
  // البحث عن useTranslations('namespace') مع متغيراتها
  const useTranslationsRegex = /const\s+(\w+)\s*=\s*useTranslations\(['"`]([^'"`]+)['"`]\)/g;
  let match;
  const namespaceMap = new Map(); // خريطة المتغير -> namespace
  
  while ((match = useTranslationsRegex.exec(content)) !== null) {
    const varName = match[1];
    const namespace = match[2];
    namespaceMap.set(varName, namespace);
  }
  
  // البحث عن t('key') أو t("key") أو t(`key`) وربطه بالمتغير المناسب
  const tRegex = /\b(\w+)\(['"`]([^'"`]+)['"`]\)/g;
  while ((match = tRegex.exec(content)) !== null) {
    const varName = match[1];
    const key = match[2];
    
    // تجاهل المفاتيح التي تحتوي على متغيرات مثل {count}
    if (!key.includes('${') && !key.startsWith('`')) {
      // إذا كان المتغير هو tPages، استخدم pages namespace
      if (varName === 'tPages') {
        translations.add(`pages.${key}`);
      }
      // إذا كان المتغير موجود في namespaceMap، استخدم namespace المناسب
      else if (namespaceMap.has(varName)) {
        translations.add(`${namespaceMap.get(varName)}.${key}`);
      }
      // إذا كان المتغير هو t فقط، نحاول العثور على أقرب namespace
      else if (varName === 't') {
        // البحث عن آخر useTranslations قبل هذا الاستخدام
        const beforeMatch = content.substring(Math.max(0, match.index - 500), match.index);
        const lastNamespaceMatch = beforeMatch.match(/useTranslations\(['"`]([^'"`]+)['"`]\)/);
        if (lastNamespaceMatch) {
          translations.add(`${lastNamespaceMatch[1]}.${key}`);
        }
      }
    }
  }
  
  // البحث عن t(`namespace.${variable}`) - نمط ديناميكي
  const dynamicTRegex = /\bt\([`'"]\$\{?([^}]+)\}?[`'"]\)/g;
  while ((match = dynamicTRegex.exec(content)) !== null) {
    // نحاول استخراج namespace من السياق
    const context = content.substring(Math.max(0, match.index - 100), match.index);
    const namespaceMatch = context.match(/useTranslations\(['"`]([^'"`]+)['"`]\)/);
    if (namespaceMatch) {
      translations.add(`${namespaceMatch[1]}.${match[1]}`);
    }
  }
  
  return {
    file: path.relative(SRC_DIR, filePath),
    translations: Array.from(translations),
    namespaces: Array.from(namespaceMap.values()),
  };
}

// التحقق من وجود مفتاح في ملف الترجمة
function keyExists(key, translations) {
  const parts = key.split('.');
  let current = translations;
  for (const part of parts) {
    if (current[part] === undefined) {
      return false;
    }
    current = current[part];
  }
  return typeof current === 'string';
}

// الوظيفة الرئيسية
function main() {
  console.log('🔍 بدء فحص الترجمات...\n');
  
  // تحميل ملفات الترجمة
  const translations = loadTranslations();
  const arKeys = getAllKeys(translations.ar);
  const enKeys = getAllKeys(translations.en);
  
  console.log(`📊 إحصائيات ملفات الترجمة:`);
  console.log(`   - المفاتيح في ar.json: ${arKeys.length}`);
  console.log(`   - المفاتيح في en.json: ${enKeys.length}\n`);
  
  // قراءة جميع الملفات
  const files = getAllFiles(SRC_DIR);
  console.log(`📁 عدد الملفات المفحوصة: ${files.length}\n`);
  
  // استخراج جميع الترجمات المستخدمة
  const allUsedKeys = new Set();
  const fileResults = [];
  
  for (const file of files) {
    const result = extractTranslations(file);
    if (result.translations.length > 0) {
      fileResults.push(result);
      result.translations.forEach((key) => allUsedKeys.add(key));
    }
  }
  
  console.log(`🔑 عدد المفاتيح المستخدمة في الكود: ${allUsedKeys.size}\n`);
  
  // التحقق من وجود المفاتيح
  const missingInAr = [];
  const missingInEn = [];
  const usedKeysArray = Array.from(allUsedKeys);
  
  for (const key of usedKeysArray) {
    if (!keyExists(key, translations.ar)) {
      missingInAr.push(key);
    }
    if (!keyExists(key, translations.en)) {
      missingInEn.push(key);
    }
  }
  
  // المفاتيح الموجودة في ملفات الترجمة ولكن غير مستخدمة
  const unusedInAr = arKeys.filter((key) => !allUsedKeys.has(key));
  const unusedInEn = enKeys.filter((key) => !allUsedKeys.has(key));
  
  // طباعة التقرير
  console.log('='.repeat(80));
  console.log('📋 تقرير فحص الترجمات');
  console.log('='.repeat(80));
  console.log();
  
  // المفاتيح المفقودة
  if (missingInAr.length > 0) {
    console.log(`❌ المفاتيح المفقودة في ar.json (${missingInAr.length}):`);
    missingInAr.sort().forEach((key) => {
      console.log(`   - ${key}`);
    });
    console.log();
  } else {
    console.log('✅ جميع المفاتيح المستخدمة موجودة في ar.json\n');
  }
  
  if (missingInEn.length > 0) {
    console.log(`❌ المفاتيح المفقودة في en.json (${missingInEn.length}):`);
    missingInEn.sort().forEach((key) => {
      console.log(`   - ${key}`);
    });
    console.log();
  } else {
    console.log('✅ جميع المفاتيح المستخدمة موجودة في en.json\n');
  }
  
  // المفاتيح غير المستخدمة (اختياري - يمكن تعطيله)
  if (unusedInAr.length > 0 && process.argv.includes('--show-unused')) {
    console.log(`⚠️  المفاتيح غير المستخدمة في ar.json (${unusedInAr.length}):`);
    unusedInAr.slice(0, 20).forEach((key) => {
      console.log(`   - ${key}`);
    });
    if (unusedInAr.length > 20) {
      console.log(`   ... و ${unusedInAr.length - 20} مفاتيح أخرى`);
    }
    console.log();
  }
  
  // إحصائيات إضافية
  console.log('='.repeat(80));
  console.log('📊 ملخص الإحصائيات:');
  console.log('='.repeat(80));
  console.log(`   - إجمالي المفاتيح المستخدمة: ${allUsedKeys.size}`);
  console.log(`   - المفاتيح المفقودة في ar.json: ${missingInAr.length}`);
  console.log(`   - المفاتيح المفقودة في en.json: ${missingInEn.length}`);
  console.log(`   - المفاتيح غير المستخدمة: ${unusedInAr.length} (ar), ${unusedInEn.length} (en)`);
  console.log();
  
  // حفظ التقرير في ملف
  const reportPath = path.join(__dirname, '../../translation-check-report.txt');
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalUsedKeys: allUsedKeys.size,
      missingInAr: missingInAr.length,
      missingInEn: missingInEn.length,
      unusedInAr: unusedInAr.length,
      unusedInEn: unusedInEn.length,
    },
    missingInAr,
    missingInEn,
    unusedInAr: process.argv.includes('--show-unused') ? unusedInAr : [],
    unusedInEn: process.argv.includes('--show-unused') ? unusedInEn : [],
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`💾 تم حفظ التقرير في: ${reportPath}`);
  console.log();
  
  // إنهاء البرنامج مع كود خطأ إذا كان هناك مفاتيح مفقودة
  if (missingInAr.length > 0 || missingInEn.length > 0) {
    console.log('❌ تم العثور على مفاتيح مفقودة!');
    process.exit(1);
  } else {
    console.log('✅ جميع الترجمات موجودة!');
    process.exit(0);
  }
}

// تشغيل السكريبت
main();

