#!/usr/bin/env node

/**
 * Comprehensive Translation Audit Script
 * يفحص جميع الملفات ويوثق كل استخدام للترجمات
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const SRC_DIR = path.join(__dirname, '../src');
const OUTPUT_FILE = path.join(__dirname, '../../TRANSLATION-AUDIT-REPORT.md');

// استثناءات
const EXCLUDE_PATTERNS = [
  '**/mocks/**',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
  '**/node_modules/**',
];

// نتائج الفحص
const results = {
  filesWithTranslations: [],
  filesWithHardcodedArabic: [],
  namespaces: new Map(),
  translationKeys: new Map(),
  hardcodedTexts: [],
  errors: [],
};

// البحث عن ملفات TypeScript/TSX
async function getAllSourceFiles() {
  const files = await glob('**/*.{ts,tsx}', {
    cwd: SRC_DIR,
    ignore: EXCLUDE_PATTERNS,
    absolute: true,
  });
  return files;
}

// استخراج useTranslations من ملف
function extractUseTranslations(content, filePath) {
  const patterns = [];
  const regex = /const\s+(\w+)\s*=\s*useTranslations\(['"`]([^'"`]+)['"`]\)/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    patterns.push({
      varName: match[1],
      namespace: match[2],
      line: content.substring(0, match.index).split('\n').length,
    });
  }
  
  return patterns;
}

// استخراج استخدامات t() و tPages()
function extractTranslationCalls(content, filePath, useTranslations) {
  const calls = [];
  const lines = content.split('\n');
  
  // إنشاء خريطة namespace لكل متغير
  const varToNamespace = new Map();
  useTranslations.forEach(({ varName, namespace }) => {
    varToNamespace.set(varName, namespace);
  });
  
  // البحث عن t('key') أو t("key")
  lines.forEach((line, index) => {
    // البحث عن t('key') أو t("key") أو tPages('key')
    const regex = /\b(\w+)\(['"`]([^'"`]+)['"`]\)/g;
    let match;
    
    while ((match = regex.exec(line)) !== null) {
      const varName = match[1];
      const key = match[2];
      
      // تجاهل إذا كان يحتوي على متغيرات ديناميكية
      if (key.includes('${') || key.includes('`') || key.length > 200) {
        continue;
      }
      
      // تحديد namespace
      let namespace;
      if (varName === 'tPages') {
        namespace = 'pages';
      } else if (varToNamespace.has(varName)) {
        namespace = varToNamespace.get(varName);
      } else if (varName === 't') {
        // محاولة العثور على آخر useTranslations قبل هذا السطر
        const beforeContent = content.substring(0, content.indexOf(line));
        const lastUseTranslations = beforeContent.match(/useTranslations\(['"`]([^'"`]+)['"`]\)/);
        if (lastUseTranslations) {
          namespace = lastUseTranslations[1];
        } else {
          namespace = 'unknown';
        }
      } else {
        namespace = 'unknown';
      }
      
      const fullKey = namespace === 'pages' ? `pages.${key}` : `${namespace}.${key}`;
      
      calls.push({
        varName,
        key,
        fullKey,
        namespace,
        line: index + 1,
        code: line.trim(),
      });
      
      // تحديث الإحصائيات
      if (!results.namespaces.has(namespace)) {
        results.namespaces.set(namespace, new Set());
      }
      results.namespaces.get(namespace).add(key);
      
      if (!results.translationKeys.has(fullKey)) {
        results.translationKeys.set(fullKey, []);
      }
      results.translationKeys.get(fullKey).push({
        file: path.relative(SRC_DIR, filePath),
        line: index + 1,
      });
    }
  });
  
  return calls;
}

// البحث عن نصوص عربية مكتوبة مباشرة
function findHardcodedArabic(content, filePath) {
  const hardcoded = [];
  const lines = content.split('\n');
  
  // نمط للبحث عن نصوص عربية (Unicode range للعربية)
  const arabicRegex = /['"`]([\u0600-\u06FF\s]{3,})['"`]/g;
  
  lines.forEach((line, index) => {
    // تجاهل التعليقات
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
      return;
    }
    
    let match;
    while ((match = arabicRegex.exec(line)) !== null) {
      const text = match[1].trim();
      
      // تجاهل إذا كان قصير جداً أو يحتوي على متغيرات
      if (text.length < 3 || text.includes('${') || text.includes('`')) {
        continue;
      }
      
      // تجاهل إذا كان في تعليق أو string template معقد
      const beforeMatch = line.substring(0, match.index);
      if (beforeMatch.includes('//') || beforeMatch.includes('*')) {
        continue;
      }
      
      hardcoded.push({
        text,
        line: index + 1,
        code: line.trim(),
      });
    }
  });
  
  return hardcoded;
}

// فحص ملف واحد
function auditFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(SRC_DIR, filePath);
    
    // استخراج useTranslations
    const useTranslations = extractUseTranslations(content, filePath);
    
    if (useTranslations.length > 0) {
      // استخراج استخدامات الترجمات
      const translationCalls = extractTranslationCalls(content, filePath, useTranslations);
      
      results.filesWithTranslations.push({
        file: relativePath,
        useTranslations,
        translationCalls,
      });
    }
    
    // البحث عن نصوص عربية مكتوبة مباشرة
    const hardcoded = findHardcodedArabic(content, filePath);
    if (hardcoded.length > 0) {
      results.filesWithHardcodedArabic.push({
        file: relativePath,
        hardcoded,
      });
      
      hardcoded.forEach(({ text, line }) => {
        results.hardcodedTexts.push({
          file: relativePath,
          text,
          line,
        });
      });
    }
  } catch (error) {
    results.errors.push({
      file: path.relative(SRC_DIR, filePath),
      error: error.message,
    });
  }
}

// إنشاء التقرير
function generateReport() {
  let report = '# 🔍 تقرير فحص الترجمات الشامل\n\n';
  report += `**تاريخ الفحص:** ${new Date().toLocaleString('ar-SA')}\n\n`;
  
  report += '## 📊 الإحصائيات العامة\n\n';
  report += `- **عدد الملفات التي تستخدم الترجمات:** ${results.filesWithTranslations.length}\n`;
  report += `- **عدد الملفات التي تحتوي على نصوص عربية مكتوبة مباشرة:** ${results.filesWithHardcodedArabic.length}\n`;
  report += `- **عدد Namespaces المستخدمة:** ${results.namespaces.size}\n`;
  report += `- **عدد مفاتيح الترجمة الفريدة:** ${results.translationKeys.size}\n`;
  report += `- **عدد النصوص المكتوبة مباشرة:** ${results.hardcodedTexts.length}\n`;
  report += `- **عدد الأخطاء:** ${results.errors.length}\n\n`;
  
  report += '## 📁 Namespaces المستخدمة\n\n';
  const namespacesArray = Array.from(results.namespaces.entries())
    .sort((a, b) => a[0].localeCompare(b[0]));
  
  namespacesArray.forEach(([namespace, keys]) => {
    report += `### ${namespace}\n`;
    report += `- **عدد المفاتيح:** ${keys.size}\n`;
    report += `- **المفاتيح:** ${Array.from(keys).slice(0, 10).join(', ')}${keys.size > 10 ? '...' : ''}\n\n`;
  });
  
  report += '## 🔴 الملفات التي تحتوي على نصوص عربية مكتوبة مباشرة\n\n';
  results.filesWithHardcodedArabic.forEach(({ file, hardcoded }) => {
    report += `### ${file}\n\n`;
    hardcoded.forEach(({ text, line, code }) => {
      report += `- **السطر ${line}:** \`${text}\`\n`;
      report += `  \`\`\`tsx\n  ${code}\n  \`\`\`\n\n`;
    });
  });
  
  report += '## 📝 تفاصيل استخدامات الترجمات\n\n';
  results.filesWithTranslations.forEach(({ file, useTranslations, translationCalls }) => {
    report += `### ${file}\n\n`;
    report += `**Namespaces المستخدمة:**\n`;
    useTranslations.forEach(({ varName, namespace, line }) => {
      report += `- \`${varName}\` = \`useTranslations('${namespace}')\` (السطر ${line})\n`;
    });
    report += `\n**عدد استخدامات الترجمات:** ${translationCalls.length}\n\n`;
    
    if (translationCalls.length > 0) {
      report += `**المفاتيح المستخدمة:**\n`;
      const uniqueKeys = new Set(translationCalls.map(c => c.fullKey));
      Array.from(uniqueKeys).sort().forEach(key => {
        const uses = translationCalls.filter(c => c.fullKey === key);
        report += `- \`${key}\` (${uses.length} استخدام)\n`;
      });
      report += '\n';
    }
  });
  
  report += '## ❌ الأخطاء\n\n';
  if (results.errors.length === 0) {
    report += 'لا توجد أخطاء.\n\n';
  } else {
    results.errors.forEach(({ file, error }) => {
      report += `- **${file}:** ${error}\n`;
    });
  }
  
  return report;
}

// الدالة الرئيسية
async function main() {
  console.log('🔍 بدء الفحص الشامل...\n');
  
  const files = await getAllSourceFiles();
  console.log(`📁 تم العثور على ${files.length} ملف للفحص\n`);
  
  let processed = 0;
  for (const file of files) {
    auditFile(file);
    processed++;
    if (processed % 50 === 0) {
      console.log(`   تم فحص ${processed}/${files.length} ملف...`);
    }
  }
  
  console.log(`\n✅ تم فحص ${files.length} ملف\n`);
  console.log('📝 إنشاء التقرير...\n');
  
  const report = generateReport();
  fs.writeFileSync(OUTPUT_FILE, report, 'utf8');
  
  console.log(`✅ تم حفظ التقرير في: ${OUTPUT_FILE}\n`);
  console.log('📊 ملخص النتائج:');
  console.log(`   - ملفات تستخدم الترجمات: ${results.filesWithTranslations.length}`);
  console.log(`   - ملفات تحتوي على نصوص عربية: ${results.filesWithHardcodedArabic.length}`);
  console.log(`   - Namespaces: ${results.namespaces.size}`);
  console.log(`   - مفاتيح ترجمة: ${results.translationKeys.size}`);
  console.log(`   - نصوص مكتوبة مباشرة: ${results.hardcodedTexts.length}`);
}

main().catch(console.error);

