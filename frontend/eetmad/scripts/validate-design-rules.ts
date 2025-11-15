#!/usr/bin/env node

/**
 * Design Rules Validation Script
 *
 * يفحص الملفات للتأكد من اتباع قواعد البناء المذكورة في:
 * frontend/eetmad/docs/design/component-building-guidelines.md
 *
 * الاستخدام:
 * npm run validate:design [ملف أو مجلد]
 *
 * أمثلة:
 * npm run validate:design src/components/features/home/HeroSection.tsx
 * npm run validate:design src/components/features/home/
 * npm run validate:design src/app/[locale]/page.tsx
 */

import * as fs from 'fs';
import { glob } from 'glob';
import * as path from 'path';

// الألوان المحظورة (hex patterns شائعة من المشروع)
const FORBIDDEN_HEX_COLORS = [
  '#FAF8F1',
  '#FFFFFF',
  '#334443',
  '#536765',
  '#E0DCC8',
  '#34656D',
  '#3D8B64',
  '#C95454',
  '#F7F3E3',
  '#FFF8DC',
  '#FFFACD',
  '#D4A95E',
  '#C19A6B',
  '#B8860B',
  '#DAA520',
];

interface ValidationError {
  file: string;
  line: number;
  column: number;
  rule: string;
  severity: 'error' | 'warning';
  message: string;
  suggestion: string;
  code?: string;
}

interface ValidationResult {
  file: string;
  errors: ValidationError[];
  warnings: ValidationError[];
  totalLines: number;
  scannedAt: Date;
}

class DesignRulesValidator {
  private results: ValidationResult[] = [];
  private totalFiles = 0;
  private totalErrors = 0;
  private totalWarnings = 0;
  private skippedPlaceholders = 0;

  /**
   * Check if a file is a script file (should be excluded from component rules)
   */
  private isScriptFile(filePath: string): boolean {
    return (
      filePath.includes('/scripts/') ||
      filePath.includes('\\scripts\\') ||
      filePath.endsWith('.config.') ||
      filePath.includes('.config.ts') ||
      filePath.includes('.config.js') ||
      filePath.includes('validate-') ||
      filePath.includes('setup-') ||
      filePath.includes('check-')
    );
  }

  /**
   * Check if a file is a placeholder (not ready for validation)
   */
  private isPlaceholderFile(filePath: string, content: string): boolean {
    const placeholderPatterns = [
      /\/\/\s*TODO:\s*Implement/i,
      /\/\/\s*PLACEHOLDER/i,
      /\/\/\s*not\s+ready/i,
      /\/\/\s*not\s+implemented/i,
      /\/\/\s*placeholder\s+only/i,
      /\/\*\s*TODO:\s*Implement/i,
      /\/\*\s*PLACEHOLDER/i,
    ];

    // Check for placeholder patterns in the first 10 lines
    const lines = content.split('\n').slice(0, 10).join('\n');
    const hasPlaceholderPattern = placeholderPatterns.some((pattern) => pattern.test(lines));

    // Also check if file is very minimal (likely a placeholder)
    // If it only has a few lines and returns null, it's likely a placeholder
    const isMinimalPlaceholder =
      content.split('\n').length < 10 &&
      (content.includes('return null') || content.includes('return;'));

    return hasPlaceholderPattern || isMinimalPlaceholder;
  }

  /**
   * القاعدة 1: فحص استخدام الألوان
   */
  private checkColorUsage(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // فحص hex colors
      const hexColorRegex = /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})\b/g;
      let hexMatch;
      while ((hexMatch = hexColorRegex.exec(line)) !== null) {
        const hexColor = hexMatch[0];

        // تجاهل التعليقات والـ examples
        if (line.trim().startsWith('//') || line.includes('WRONG') || line.includes('❌')) {
          continue;
        }

        errors.push({
          file: filePath,
          line: lineNum,
          column: hexMatch.index + 1,
          rule: 'Rule 1: Theme System Usage',
          severity: 'error',
          message: `استخدام لون hex مباشر: ${hexColor}`,
          suggestion: 'استخدم cssVars من @/styles/theme بدلاً من ذلك',
          code: line.trim(),
        });
      }

      // فحص rgba/rgb values
      const rgbaRegex = /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g;
      let rgbaMatch;
      while ((rgbaMatch = rgbaRegex.exec(line)) !== null) {
        if (line.trim().startsWith('//') || line.includes('WRONG') || line.includes('❌')) {
          continue;
        }

        // استثناء: rgba في shadows أو box-shadow قد يكون مقبولاً
        if (!line.includes('shadow') && !line.includes('Shadow')) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: rgbaMatch.index + 1,
            rule: 'Rule 1: Theme System Usage',
            severity: 'error',
            message: `استخدام rgba/rgb مباشر: ${rgbaMatch[0]}`,
            suggestion: 'استخدم color-mix مع cssVars للشفافية',
            code: line.trim(),
          });
        }
      }

      // فحص Tailwind arbitrary values للألوان
      const tailwindArbitraryRegex = /\b(bg|text|border|ring|from|to|via)-\[#[0-9A-Fa-f]{3,8}\]/g;
      let tailwindMatch;
      while ((tailwindMatch = tailwindArbitraryRegex.exec(line)) !== null) {
        if (line.trim().startsWith('//') || line.includes('WRONG') || line.includes('❌')) {
          continue;
        }

        errors.push({
          file: filePath,
          line: lineNum,
          column: tailwindMatch.index + 1,
          rule: 'Rule 1: Theme System Usage',
          severity: 'error',
          message: `استخدام Tailwind arbitrary value للألوان: ${tailwindMatch[0]}`,
          suggestion: 'استخدم inline styles مع cssVars',
          code: line.trim(),
        });
      }

      // فحص استيراد colors بدلاً من cssVars
      if (line.includes('import') && line.includes('colors') && line.includes('@/styles/theme')) {
        if (!line.includes('cssVars')) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: 1,
            rule: 'Rule 1: Theme System Usage',
            severity: 'error',
            message: 'استيراد colors مباشرة من theme',
            suggestion: 'استخدم: import { cssVars } from "@/styles/theme"',
            code: line.trim(),
          });
        }
      }
    });

    return errors;
  }

  /**
   * القاعدة 2: فحص استخدام i18n
   */
  private checkI18nUsage(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    // فحص إذا كان ملف component
    const isComponent =
      content.includes('export default function') ||
      content.includes('export function') ||
      (content.includes('const ') && content.includes('= () =>'));

    if (!isComponent) {
      return errors; // تجاهل الملفات غير Components
    }

    // فحص وجود useTranslations
    const hasUseTranslations = content.includes('useTranslations');
    const hasTranslationImport =
      content.includes("from 'next-intl'") || content.includes('from "next-intl"');

    // فحص النصوص المباشرة في JSX
    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();

      // تجاهل التعليقات والـ imports والـ types
      if (
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('/*') ||
        trimmedLine.startsWith('*') ||
        trimmedLine.startsWith('import') ||
        trimmedLine.startsWith('type') ||
        trimmedLine.startsWith('interface') ||
        trimmedLine.includes('WRONG') ||
        trimmedLine.includes('❌')
      ) {
        return;
      }

      // فحص النصوص العربية أو الإنجليزية في JSX
      const jsxTextRegex = />([^<>{}\n]+)</g;
      let jsxMatch;
      while ((jsxMatch = jsxTextRegex.exec(line)) !== null) {
        const text = jsxMatch[1].trim();

        // تجاهل النصوص القصيرة جداً والأرقام والرموز
        if (text.length < 3 || /^[\d\s\-_.,;:!?()[\]{}]+$/.test(text)) {
          continue;
        }

        // فحص إذا كان نص عربي أو إنجليزي (ليس متغير)
        const hasArabic = /[\u0600-\u06FF]/.test(text);
        const hasEnglish = /[a-zA-Z]{3,}/.test(text);
        const isVariable = text.includes('{') || text.startsWith('$');

        if ((hasArabic || hasEnglish) && !isVariable) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: jsxMatch.index + 1,
            rule: 'Rule 2: Internationalization',
            severity: 'error',
            message: `نص hardcoded في JSX: "${text}"`,
            suggestion: 'استخدم useTranslations من next-intl',
            code: line.trim(),
          });
        }
      }

      // فحص النصوص في strings
      const stringRegex = /['"]([^'"]{10,})['"](?!\s*[:=])/g;
      let stringMatch;
      while ((stringMatch = stringRegex.exec(line)) !== null) {
        const text = stringMatch[1];

        // تجاهل الـ imports والـ paths والـ className والـ CSS classes
        if (
          line.includes('import') ||
          line.includes('from') ||
          line.includes('className=') ||
          line.includes('class=') ||
          text.includes('/') ||
          text.includes('@') ||
          text.includes('.') ||
          text.includes('px-') ||
          text.includes('py-') ||
          text.includes('text-') ||
          text.includes('flex') ||
          text.includes('grid') ||
          text.includes('rounded')
        ) {
          continue;
        }

        const hasArabic = /[\u0600-\u06FF]/.test(text);
        const hasEnglish = /[a-zA-Z]{3,}/.test(text);

        if (hasArabic || hasEnglish) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: stringMatch.index + 1,
            rule: 'Rule 2: Internationalization',
            severity: 'warning',
            message: `نص محتمل hardcoded: "${text}"`,
            suggestion: 'تحقق من استخدام useTranslations',
            code: line.trim(),
          });
        }
      }
    });

    // تحذير إذا لم يتم استيراد useTranslations في component
    if (isComponent && !hasTranslationImport && errors.length > 0) {
      errors.unshift({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 2: Internationalization',
        severity: 'warning',
        message: 'Component لا يستورد next-intl',
        suggestion: 'أضف: import { useTranslations } from "next-intl"',
      });
    }

    return errors;
  }

  /**
   * القاعدة 3: فحص هيكل Component
   */
  private checkComponentStructure(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    // فحص إذا كان ملف TSX component
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
      return errors;
    }

    const fileName = path.basename(filePath, path.extname(filePath));

    // استثناء: تجاهل الملفات غير الـ component
    const nonComponentPatterns = [
      '/types/',
      '/schemas/',
      '/constants/',
      '/api/',
      '/lib/',
      '/utils/',
      '/hooks/',
      '/store/',
      '/contexts/',
      '/mocks/',
      '.types.',
      '.schema.',
      '.config.',
      '.constants.',
      'index.ts',
      'route.ts',
      'layout.tsx',
      'page.tsx',
      'middleware.',
      'instrumentation.',
    ];

    const isNonComponentFile = nonComponentPatterns.some(
      (pattern) => filePath.includes(pattern) || fileName.includes(pattern.replace('.', ''))
    );

    if (isNonComponentFile) {
      // فقط فحص 'use client' للملفات التي تستخدم hooks
      const usesClientHooks =
        content.includes('useState') ||
        content.includes('useEffect') ||
        content.includes('useTranslations') ||
        content.includes('useRouter');

      const hasUseClient = content.includes("'use client'") || content.includes('"use client"');

      if (usesClientHooks && !hasUseClient) {
        errors.push({
          file: filePath,
          line: 1,
          column: 1,
          rule: 'Rule 3: Component Structure',
          severity: 'error',
          message: 'الملف يستخدم client hooks لكن بدون "use client"',
          suggestion: 'أضف "use client" في أول الملف',
        });
      }

      return errors; // تجاهل فحوصات PascalCase و Component name
    }

    // فحص تطابق اسم الملف مع اسم Component
    const componentNameRegex = /export\s+(?:default\s+)?function\s+(\w+)/;
    const componentMatch = content.match(componentNameRegex);

    if (componentMatch && componentMatch[1] !== fileName) {
      errors.push({
        file: filePath,
        line: content.substring(0, content.indexOf(componentMatch[0])).split('\n').length,
        column: 1,
        rule: 'Rule 3: Component Structure',
        severity: 'warning',
        message: `اسم Component "${componentMatch[1]}" لا يطابق اسم الملف "${fileName}"`,
        suggestion: 'اجعل اسم الملف مطابقاً لاسم Component',
      });
    }

    // فحص وجود 'use client' في components التي تستخدم hooks
    const usesClientHooks =
      content.includes('useState') ||
      content.includes('useEffect') ||
      content.includes('useTranslations') ||
      content.includes('useRouter');

    const hasUseClient = content.includes("'use client'") || content.includes('"use client"');

    if (usesClientHooks && !hasUseClient) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 3: Component Structure',
        severity: 'error',
        message: 'Component يستخدم client hooks لكن بدون "use client"',
        suggestion: 'أضف "use client" في أول الملف',
      });
    }

    // فحص PascalCase للـ component name (فقط للـ components الفعلية)
    if (fileName && !/^[A-Z][a-zA-Z0-9]*$/.test(fileName)) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 3: Component Structure',
        severity: 'warning',
        message: `اسم Component "${fileName}" لا يتبع PascalCase`,
        suggestion: 'استخدم PascalCase: مثل ProjectCard, UserProfile',
      });
    }

    return errors;
  }

  /**
   * القاعدة 4: فحص الـ styling
   */
  private checkStylingPractices(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // فحص استخدام Tailwind classes للألوان بدلاً من cssVars
      const tailwindColorClasses = [
        'bg-white',
        'bg-black',
        'bg-gray',
        'bg-red',
        'bg-blue',
        'bg-green',
        'text-white',
        'text-black',
        'text-gray',
        'text-red',
        'text-blue',
        'border-white',
        'border-black',
        'border-gray',
      ];

      tailwindColorClasses.forEach((cls) => {
        const regex = new RegExp(`\\b${cls}(-\\d+)?\\b`, 'g');
        if (regex.test(line) && !line.trim().startsWith('//')) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: line.indexOf(cls) + 1,
            rule: 'Rule 4: Styling Best Practices',
            severity: 'warning',
            message: `استخدام Tailwind color class: ${cls}`,
            suggestion: 'استخدم inline styles مع cssVars للألوان',
            code: line.trim(),
          });
        }
      });
    });

    return errors;
  }

  /**
   * القاعدة 7: فحص RTL support
   */
  private checkRTLSupport(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // فحص استخدام left/right بدلاً من start/end
      const leftRightClasses = [
        'ml-',
        'mr-',
        'pl-',
        'pr-',
        'left-',
        'right-',
        'float-left',
        'float-right',
        'text-left',
        'text-right',
      ];

      leftRightClasses.forEach((cls) => {
        if (line.includes(cls) && !line.trim().startsWith('//')) {
          // استثناء: بعض الحالات المقبولة
          const acceptablePatterns = [
            'text-left',
            'text-right', // قد تكون مقبولة في بعض الحالات
            'ChevronLeft',
            'ChevronRight', // أسماء components
          ];

          const isAcceptable = acceptablePatterns.some(
            (pattern) => line.includes(pattern) && !cls.startsWith('text-')
          );

          if (!isAcceptable) {
            errors.push({
              file: filePath,
              line: lineNum,
              column: line.indexOf(cls) + 1,
              rule: 'Rule 7: RTL Support',
              severity: 'warning',
              message: `استخدام directional class: ${cls}`,
              suggestion: 'استخدم logical properties: ps/pe/start/end بدلاً من left/right',
              code: line.trim(),
            });
          }
        }
      });
    });

    return errors;
  }

  /**
   * القاعدة 6: فحص Animations
   */
  private checkAnimations(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات الـ scripts
    if (this.isScriptFile(filePath)) {
      return errors;
    }

    // فحص استخدام animations بدون framer-motion
    const hasAnimations =
      content.includes('transition') ||
      content.includes('animation') ||
      content.includes('animate');

    const hasFramerMotion = content.includes('framer-motion') || content.includes('motion.');

    if (hasAnimations && !hasFramerMotion) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 6: Animations and Interactions',
        severity: 'warning',
        message: 'يوجد animations لكن بدون استخدام framer-motion',
        suggestion: 'استخدم framer-motion للـ animations',
      });
    }

    return errors;
  }

  /**
   * فحص ملف واحد
   */
  private async validateFile(filePath: string): Promise<ValidationResult | null> {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Skip placeholder files
    if (this.isPlaceholderFile(filePath, content)) {
      this.skippedPlaceholders++;
      return null;
    }

    const allErrors: ValidationError[] = [
      ...this.checkColorUsage(content, filePath),
      ...this.checkI18nUsage(content, filePath),
      ...this.checkComponentStructure(content, filePath),
      ...this.checkStylingPractices(content, filePath),
      ...this.checkRTLSupport(content, filePath),
      ...this.checkAnimations(content, filePath),
    ];

    const errors = allErrors.filter((e) => e.severity === 'error');
    const warnings = allErrors.filter((e) => e.severity === 'warning');

    this.totalErrors += errors.length;
    this.totalWarnings += warnings.length;

    return {
      file: filePath,
      errors,
      warnings,
      totalLines: lines.length,
      scannedAt: new Date(),
    };
  }

  /**
   * فحص عدة ملفات
   */
  async validateFiles(patterns: string[]): Promise<void> {
    console.log('🔍 بدء فحص قواعد البناء...\n');

    // جمع جميع الملفات
    const allFiles = new Set<string>();

    for (const pattern of patterns) {
      const stats = fs.statSync(pattern);

      if (stats.isFile()) {
        // ملف واحد
        allFiles.add(pattern);
      } else if (stats.isDirectory()) {
        // مجلد - ابحث عن جميع ملفات tsx/ts
        const files = await glob(`${pattern}/**/*.{tsx,ts}`, {
          ignore: [
            '**/node_modules/**',
            '**/dist/**',
            '**/build/**',
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
          ],
        });
        files.forEach((f) => allFiles.add(f));
      }
    }

    const files = Array.from(allFiles);
    this.totalFiles = files.length;

    console.log(`📁 عدد الملفات المراد فحصها: ${this.totalFiles}\n`);

    // فحص كل ملف
    for (const file of files) {
      const result = await this.validateFile(file);
      if (result !== null) {
        this.results.push(result);
      }

      // عرض progress
      process.stdout.write(`\r⏳ جاري الفحص... ${this.results.length}/${this.totalFiles}`);
    }

    console.log('\n\n✅ انتهى الفحص!\n');
    if (this.skippedPlaceholders > 0) {
      console.log(`⏭️  تم تخطي ${this.skippedPlaceholders} ملف placeholder\n`);
    }
  }

  /**
   * عرض النتائج
   */
  displayResults(): void {
    console.log('═'.repeat(80));
    console.log('📊 ملخص النتائج');
    console.log('═'.repeat(80));
    console.log(`📁 إجمالي الملفات: ${this.totalFiles}`);
    if (this.skippedPlaceholders > 0) {
      console.log(`⏭️  ملفات placeholder تم تخطيها: ${this.skippedPlaceholders}`);
    }
    console.log(`❌ إجمالي الأخطاء: ${this.totalErrors}`);
    console.log(`⚠️  إجمالي التحذيرات: ${this.totalWarnings}`);
    console.log('═'.repeat(80));
    console.log();

    // فرز النتائج حسب عدد المشاكل
    const sortedResults = [...this.results].sort((a, b) => {
      const aTotal = a.errors.length + a.warnings.length;
      const bTotal = b.errors.length + b.warnings.length;
      return bTotal - aTotal;
    });

    // عرض الملفات التي بها مشاكل
    const filesWithIssues = sortedResults.filter(
      (r) => r.errors.length > 0 || r.warnings.length > 0
    );

    if (filesWithIssues.length === 0) {
      console.log('✨ رائع! جميع الملفات تتبع قواعد البناء بشكل صحيح\n');
      return;
    }

    console.log(`📝 الملفات التي بها مشاكل: ${filesWithIssues.length}/${this.totalFiles}\n`);

    filesWithIssues.forEach((result, index) => {
      const totalIssues = result.errors.length + result.warnings.length;
      const relPath = path.relative(process.cwd(), result.file);

      console.log(`\n${'─'.repeat(80)}`);
      console.log(`📄 [${index + 1}/${filesWithIssues.length}] ${relPath}`);
      console.log(
        `   الأخطاء: ${result.errors.length} | التحذيرات: ${result.warnings.length} | إجمالي: ${totalIssues}`
      );
      console.log(`${'─'.repeat(80)}`);

      // عرض الأخطاء
      if (result.errors.length > 0) {
        console.log('\n❌ الأخطاء:\n');
        result.errors.forEach((error, i) => {
          console.log(`  ${i + 1}. السطر ${error.line}:${error.column}`);
          console.log(`     القاعدة: ${error.rule}`);
          console.log(`     المشكلة: ${error.message}`);
          console.log(`     الحل: ${error.suggestion}`);
          if (error.code) {
            console.log(`     الكود: ${error.code}`);
          }
          console.log();
        });
      }

      // عرض التحذيرات
      if (result.warnings.length > 0) {
        console.log('⚠️  التحذيرات:\n');
        result.warnings.forEach((warning, i) => {
          console.log(`  ${i + 1}. السطر ${warning.line}:${warning.column}`);
          console.log(`     القاعدة: ${warning.rule}`);
          console.log(`     المشكلة: ${warning.message}`);
          console.log(`     الحل: ${warning.suggestion}`);
          if (warning.code) {
            console.log(`     الكود: ${warning.code}`);
          }
          console.log();
        });
      }
    });

    // إحصائيات القواعد
    console.log('\n' + '═'.repeat(80));
    console.log('📈 إحصائيات القواعد');
    console.log('═'.repeat(80));

    const ruleStats = new Map<string, { errors: number; warnings: number }>();

    this.results.forEach((result) => {
      [...result.errors, ...result.warnings].forEach((issue) => {
        const current = ruleStats.get(issue.rule) || { errors: 0, warnings: 0 };
        if (issue.severity === 'error') {
          current.errors++;
        } else {
          current.warnings++;
        }
        ruleStats.set(issue.rule, current);
      });
    });

    Array.from(ruleStats.entries())
      .sort((a, b) => b[1].errors + b[1].warnings - (a[1].errors + a[1].warnings))
      .forEach(([rule, stats]) => {
        console.log(`\n${rule}:`);
        console.log(`  ❌ أخطاء: ${stats.errors}`);
        console.log(`  ⚠️  تحذيرات: ${stats.warnings}`);
        console.log(`  📊 إجمالي: ${stats.errors + stats.warnings}`);
      });

    console.log('\n' + '═'.repeat(80));
    console.log();

    // نصائح عامة
    if (this.totalErrors > 0) {
      console.log('💡 نصائح:');
      console.log('  • راجع frontend/eetmad/docs/design/component-building-guidelines.md');
      console.log('  • استخدم cssVars من @/styles/theme لجميع الألوان');
      console.log('  • استخدم useTranslations من next-intl لجميع النصوص');
      console.log('  • أضف "use client" للـ components التي تستخدم hooks');
      console.log();
    }
  }

  /**
   * تصدير النتائج إلى JSON
   */
  exportToJson(outputPath: string): void {
    const report = {
      summary: {
        totalFiles: this.totalFiles,
        skippedPlaceholders: this.skippedPlaceholders,
        totalErrors: this.totalErrors,
        totalWarnings: this.totalWarnings,
        scannedAt: new Date().toISOString(),
      },
      results: this.results,
    };

    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
    console.log(`📄 تم حفظ التقرير في: ${outputPath}\n`);
  }
}

// Main function
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
╔════════════════════════════════════════════════════════════════════╗
║           Design Rules Validation Script                          ║
║                                                                    ║
║  يفحص الملفات للتأكد من اتباع قواعد البناء                        ║
╚════════════════════════════════════════════════════════════════════╝

الاستخدام:
  npm run validate:design [ملف أو مجلد] [...خيارات]

أمثلة:
  npm run validate:design src/components/features/home/HeroSection.tsx
  npm run validate:design src/components/features/home/
  npm run validate:design src/app/[locale]/page.tsx
  npm run validate:design src/components/ --json report.json

الخيارات:
  --json [file]    تصدير النتائج إلى ملف JSON
  --help, -h       عرض هذه المساعدة

القواعد المفحوصة:
  ✓ Rule 1: Theme System Usage (استخدام cssVars)
  ✓ Rule 2: Internationalization (استخدام i18n)
  ✓ Rule 3: Component Structure (هيكل المكونات)
  ✓ Rule 4: Styling Best Practices (ممارسات التصميم)
  ✓ Rule 6: Animations (استخدام framer-motion)
  ✓ Rule 7: RTL Support (دعم RTL)

المرجع:
  frontend/eetmad/docs/design/component-building-guidelines.md
`);
    process.exit(0);
  }

  // فصل المسارات عن الخيارات
  const jsonIndex = args.indexOf('--json');
  let jsonOutput: string | undefined;
  let paths: string[];

  if (jsonIndex !== -1) {
    jsonOutput = args[jsonIndex + 1] || 'validation-report.json';
    paths = args.filter((_, i) => i !== jsonIndex && i !== jsonIndex + 1);
  } else {
    paths = args;
  }

  // التحقق من وجود المسارات
  const validPaths = paths.filter((p) => {
    try {
      fs.statSync(p);
      return true;
    } catch {
      console.error(`❌ المسار غير موجود: ${p}`);
      return false;
    }
  });

  if (validPaths.length === 0) {
    console.error('❌ لا توجد مسارات صحيحة للفحص');
    process.exit(1);
  }

  try {
    const validator = new DesignRulesValidator();
    await validator.validateFiles(validPaths);
    validator.displayResults();

    if (jsonOutput) {
      validator.exportToJson(jsonOutput);
    }

    // Exit code based on errors
    const hasErrors = validator['totalErrors'] > 0;
    process.exit(hasErrors ? 1 : 0);
  } catch (error) {
    console.error('❌ حدث خطأ أثناء الفحص:', error);
    process.exit(1);
  }
}

// Run
if (require.main === module) {
  main();
}

export { DesignRulesValidator };
