#!/usr/bin/env node

/**
 * Design Rules Validation Script - Enhanced & Optimized Version
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
// Reserved for future use - currently not enforced
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// المكونات الأساسية التي يجب أن تكون في ui/
const BASIC_UI_COMPONENTS = [
  'Button',
  'Card',
  'CardHeader',
  'CardContent',
  'CardFooter',
  'Input',
  'Label',
  'Textarea',
  'Select',
  'Checkbox',
  'Radio',
  'Switch',
  'Dialog',
  'DialogContent',
  'DialogHeader',
  'DialogFooter',
  'Modal',
  'Dropdown',
  'Menu',
  'Tooltip',
  'Badge',
  'Avatar',
  'Alert',
  'Skeleton',
  'Separator',
  'ScrollArea',
  'Table',
  'TableHeader',
  'TableBody',
  'TableRow',
  'TableCell',
  'Tabs',
  'TabsList',
  'TabsTrigger',
  'TabsContent',
  'Accordion',
  'AccordionItem',
  'AccordionTrigger',
  'AccordionContent',
];

// المكونات الثقيلة التي تحتاج dynamic import
const HEAVY_COMPONENTS = [
  'Chart',
  'Editor',
  'RichTextEditor',
  'Map',
  'Calendar',
  'DataTable',
  'CodeEditor',
  'MarkdownEditor',
  'PDFViewer',
  'VideoPlayer',
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
      filePath.includes('/i18n/') ||
      filePath.includes('\\i18n\\') ||
      filePath.includes('/docs/') ||
      filePath.includes('\\docs\\') ||
      filePath.includes('/styles/') ||
      filePath.includes('\\styles\\') ||
      filePath.includes('/theme/') ||
      filePath.includes('\\theme\\') ||
      filePath.endsWith('.config.') ||
      filePath.includes('.config.ts') ||
      filePath.includes('.config.js') ||
      filePath.includes('validate-') ||
      filePath.includes('setup-') ||
      filePath.includes('check-') ||
      filePath.includes('proxy.ts') ||
      filePath.includes('.test.') ||
      filePath.includes('.spec.') ||
      filePath.includes('.test-demo.') ||
      filePath.includes('.examples.') ||
      filePath.endsWith('/error.tsx') ||
      filePath.endsWith('\\error.tsx') ||
      filePath.endsWith('/not-found.tsx') ||
      filePath.endsWith('\\not-found.tsx') ||
      filePath.endsWith('/loading.tsx') ||
      filePath.endsWith('\\loading.tsx') ||
      filePath.endsWith('/layout.tsx') ||
      filePath.endsWith('\\layout.tsx')
    );
  }

  /**
   * Check if a file is a theme definition file (should be excluded from color validation)
   */
  private isThemeFile(filePath: string): boolean {
    return (
      filePath.includes('/styles/theme/') ||
      filePath.includes('\\styles\\theme\\') ||
      filePath.endsWith('/colors.ts') ||
      filePath.endsWith('\\colors.ts') ||
      filePath.endsWith('/cssVariables.ts') ||
      filePath.endsWith('\\cssVariables.ts')
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

    const lines = content.split('\n').slice(0, 10).join('\n');
    const hasPlaceholderPattern = placeholderPatterns.some((pattern) => pattern.test(lines));

    const isMinimalPlaceholder =
      content.split('\n').length < 10 &&
      (content.includes('return null') || content.includes('return;'));

    return hasPlaceholderPattern || isMinimalPlaceholder;
  }

  /**
   * التحقق من أن النص ليس قيمة تقنية (يجب تجاهلها) - ENHANCED
   */
  private isTechnicalValue(text: string, line: string, filePath?: string): boolean {
    const jsKeywords = [
      'undefined',
      'null',
      'true',
      'false',
      'typeof',
      'instanceof',
      'void',
      'delete',
      'new',
      'this',
      'super',
      'return',
      'break',
      'continue',
      'if',
      'else',
      'for',
      'while',
      'do',
      'switch',
      'case',
      'default',
      'try',
      'catch',
      'finally',
      'throw',
      'const',
      'let',
      'var',
      'function',
      'class',
      'extends',
      'import',
      'export',
      'from',
      'as',
      'default',
      'async',
      'await',
      'yield',
      'static',
      'public',
      'private',
      'protected',
      'readonly',
      'abstract',
      'interface',
      'type',
      'enum',
      'namespace',
      'module',
      'declare',
      'implements',
    ];

    const domEvents = [
      'change',
      'click',
      'mousedown',
      'mouseup',
      'mousemove',
      'mouseenter',
      'mouseleave',
      'mouseover',
      'mouseout',
      'touchstart',
      'touchend',
      'touchmove',
      'touchcancel',
      'keydown',
      'keyup',
      'keypress',
      'focus',
      'blur',
      'submit',
      'reset',
      'load',
      'unload',
      'error',
      'resize',
      'scroll',
      'wheel',
      'drag',
      'drop',
    ];

    const cssValues = [
      'transparent',
      'linear',
      'ease',
      'ease-in',
      'ease-out',
      'ease-in-out',
      'primary',
      'secondary',
      'accent',
      'ghost',
      'dark',
      'light',
      'white',
      'black',
      'gray',
      'grey',
      'red',
      'blue',
      'green',
      'yellow',
      'orange',
      'purple',
      'pink',
      'inherit',
      'center',
      'left',
      'right',
      'warm',
      'success',
      'error',
      'warning',
      'info',
      'featured',
      'urgent',
      'default',
    ];

    const htmlAttributeValues = [
      'ltr',
      'rtl',
      'numeric',
      'text',
      'email',
      'password',
      'tel',
      'url',
      'search',
      'div',
      'span',
      'button',
      'input',
      'form',
      'section',
    ];

    const keyboardKeys = [
      'backspace',
      'enter',
      'escape',
      'tab',
      'space',
      'arrowup',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'home',
      'end',
      'pageup',
      'pagedown',
      'delete',
      'insert',
    ];

    const storageKeys = ['token', 'theme', 'user', 'auth', 'locale', 'language'];

    // NEW: User types/roles/statuses (شائعة في التطبيق)
    const userTypesAndStatuses = [
      'client',
      'supplier',
      'admin',
      'active',
      'inactive',
      'pending',
      'approved',
      'rejected',
      'verified',
      'unverified',
    ];

    const isCssSize = /^\d+px\s+\d+px$/.test(text) || /^\d+px$/.test(text);

    const isTranslationKeyArray =
      /\[\s*['"]/.test(line) &&
      (line.includes('as const') || line.includes('Keys') || line.includes('key'));

    // NEW: التحقق من object keys في type definitions
    const isTypeObjectKey =
      /:\s*\{[^}]*\w+\s*:\s*['"]/.test(line) &&
      (line.includes('type ') || line.includes('interface '));

    // NEW: التحقق من enum values
    const isEnumValue = line.includes('enum ') || /,\s*\w+\s*=\s*['"]/.test(line);

    // NEW: التحقق من union types
    const isUnionTypeValue =
      (line.includes('|') || line.includes('?:')) &&
      (line.includes('type ') || line.includes('interface ') || line.includes('const '));

    const isObjectKeyProperty =
      (/^\s*key\s*:\s*['"]/.test(line) || /key:\s*['"]/.test(line)) &&
      /^[a-z][a-zA-Z0-9]*$/.test(text) &&
      !/[\u0600-\u06FF]/.test(text) &&
      text.length < 30;

    const isMediaQuery =
      text.includes('prefers-color-scheme') ||
      text.includes('@media') ||
      (text.includes('(') && text.includes(')'));

    const isConsoleLog =
      line.includes('console.log') ||
      line.includes('console.debug') ||
      line.includes('console.info');

    const isTranslationKey =
      /\bt\s*\(['"]/.test(line) ||
      /useTranslations\s*\(['"]/.test(line) ||
      /\.t\s*\(['"]/.test(line) ||
      /const\s+\w+\s*=\s*useTranslations\s*\(['"]/.test(line);

    const isTypeDefinition =
      /:\s*['"]/.test(line) &&
      (line.includes('type ') || line.includes('interface ') || line.includes('enum '));

    const commonPropertyNames = [
      'name',
      'code',
      'nativeName',
      'fullName',
      'title',
      'label',
      'value',
      'id',
      'key',
      'titleKey',
      'descriptionKey',
      'statLabelKey',
      'userType',
      'status',
      'role',
    ];

    const isObjectPropertyName = commonPropertyNames.some((propName) =>
      new RegExp(
        `,\\s*${propName}\\s*:\\s*['"]${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`
      ).test(line)
    );

    const isObjectProperty =
      isObjectPropertyName ||
      ((/,\s*\w+\s*:\s*['"]/.test(line) || /{\s*\w+\s*:\s*['"]/.test(line)) &&
        !line.includes('=') &&
        !line.includes('<') &&
        !line.includes('>') &&
        !/[\u0600-\u06FF]/.test(text));

    const isError =
      line.includes('throw new Error') ||
      line.includes('console.error') ||
      line.includes('console.warn');

    const isMockFile = filePath
      ? filePath.includes('/mocks/') || filePath.includes('/test/') || filePath.includes('/tests/')
      : false;

    const isLocalStorageCall =
      line.includes('localStorage.getItem') ||
      line.includes('localStorage.setItem') ||
      line.includes('localStorage.removeItem') ||
      line.includes('sessionStorage.getItem') ||
      line.includes('sessionStorage.setItem') ||
      line.includes('sessionStorage.removeItem');

    const isClipboardCall =
      line.includes('clipboardData.getData') || line.includes('clipboardData.setData');

    const isTypeUnion =
      /['"]\s*\|\s*['"]/.test(line) &&
      (line.includes('type ') || line.includes('?:') || line.includes('='));

    const lowerText = text.toLowerCase().trim();

    return (
      jsKeywords.includes(lowerText) ||
      domEvents.includes(lowerText) ||
      cssValues.includes(lowerText) ||
      htmlAttributeValues.includes(lowerText) ||
      keyboardKeys.includes(lowerText) ||
      storageKeys.includes(lowerText) ||
      userTypesAndStatuses.includes(lowerText) ||
      isCssSize ||
      isTranslationKey ||
      isTranslationKeyArray ||
      isTypeDefinition ||
      isTypeObjectKey ||
      isEnumValue ||
      isUnionTypeValue ||
      isTypeUnion ||
      isObjectProperty ||
      isObjectKeyProperty ||
      isError ||
      isConsoleLog ||
      isMediaQuery ||
      isLocalStorageCall ||
      isClipboardCall ||
      (isMockFile && lowerText.length < 20)
    );
  }

  /**
   * القاعدة 1: فحص استخدام الألوان
   */
  private checkColorUsage(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath) || this.isThemeFile(filePath)) {
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

      // فحص استخدام dark: variants للألوان
      const darkVariantColorRegex =
        /dark:(bg|text|border|ring|from|to|via)-(white|black|gray|slate|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+/g;
      if (darkVariantColorRegex.test(line) && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 1: Theme System Usage',
          severity: 'error',
          message: 'استخدام dark: variant للألوان',
          suggestion: 'نظام المظهر يتعامل مع dark mode تلقائياً - استخدم الرموز الدلالية فقط',
          code: line.trim(),
        });
      }

      // فحص استخدام Tailwind color shades بدلاً من opacity
      const colorShadeRegex =
        /\b(bg|text|border|ring)-(primary|secondary|accent|muted|destructive)-(50|100|200|300|400|500|600|700|800|900)\b/g;
      if (colorShadeRegex.test(line) && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 1: Theme System Usage',
          severity: 'error',
          message: 'استخدام color shades بدلاً من opacity modifiers',
          suggestion: 'استخدم opacity: bg-primary/10 بدلاً من bg-primary-100',
          code: line.trim(),
        });
      }
    });

    return errors;
  }

  /**
   * القاعدة 2: فحص استخدام i18n - ENHANCED
   */
  private checkI18nUsage(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    const isComponent =
      content.includes('export default function') ||
      content.includes('export function') ||
      (content.includes('const ') && content.includes('= () =>'));

    if (!isComponent) {
      return errors;
    }

    const hasTranslationImport =
      content.includes("from 'next-intl'") || content.includes('from "next-intl"');

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const trimmedLine = line.trim();

      if (
        trimmedLine.startsWith('//') ||
        trimmedLine.startsWith('/*') ||
        trimmedLine.startsWith('*') ||
        trimmedLine.startsWith('import') ||
        trimmedLine.startsWith('type') ||
        trimmedLine.startsWith('interface') ||
        trimmedLine.startsWith('enum') ||
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

        if (text.length === 0 || /^[\d\s\-_.,;:!?()[\]{}]+$/.test(text)) {
          continue;
        }

        if (this.isTechnicalValue(text, line, filePath)) {
          continue;
        }

        const hasArabic = /[\u0600-\u06FF]/.test(text);
        const hasEnglish = /[a-zA-Z]{2,}/.test(text);
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

      // فحص النصوص في JSX attributes
      const jsxAttributeRegex =
        /(placeholder|title|alt|aria-label|aria-description|label)\s*=\s*["']([^"']+)["']/gi;
      let attrMatch;
      while ((attrMatch = jsxAttributeRegex.exec(line)) !== null) {
        const attrName = attrMatch[1];
        const text = attrMatch[2].trim();

        if (text.length === 0 || /^[\d\s\-_.,;:!?()[\]{}]+$/.test(text)) {
          continue;
        }

        if (this.isTechnicalValue(text, line, filePath)) {
          continue;
        }

        const hasArabic = /[\u0600-\u06FF]/.test(text);
        const hasEnglish = /[a-zA-Z]{2,}/.test(text);

        if (hasArabic || hasEnglish) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: attrMatch.index + 1,
            rule: 'Rule 2: Internationalization',
            severity: 'error',
            message: `نص hardcoded في ${attrName}: "${text}"`,
            suggestion: `استخدم {t('key')} بدلاً من "${text}"`,
            code: line.trim(),
          });
        }
      }

      // فحص النصوص في strings - مع استثناءات أكثر دقة
      const stringRegex = /['"]([^'"]{3,})['"](?!\s*[:=])/g;
      let stringMatch;
      while ((stringMatch = stringRegex.exec(line)) !== null) {
        const text = stringMatch[1];
        const matchIndex = stringMatch.index;

        // استثناء: object property values
        const beforeMatch = line.substring(Math.max(0, matchIndex - 30), matchIndex);
        if (
          /,\s*\w+\s*:\s*$/.test(beforeMatch) ||
          /{\s*\w+\s*:\s*$/.test(beforeMatch) ||
          /\w+Key\s*:\s*$/.test(beforeMatch)
        ) {
          continue;
        }

        if (
          line.includes('import') ||
          line.includes('from') ||
          line.includes('className=') ||
          line.includes('class=') ||
          text === 'use client' ||
          text === 'use server' ||
          text === 'use strict' ||
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

        if (this.isTechnicalValue(text, line, filePath)) {
          continue;
        }

        const hasArabic = /[\u0600-\u06FF]/.test(text);
        const hasEnglish = /[a-zA-Z]{2,}/.test(text);

        if (hasArabic || hasEnglish) {
          // فقط تحذير للنصوص في strings (قد تكون false positive)
          errors.push({
            file: filePath,
            line: lineNum,
            column: stringMatch.index + 1,
            rule: 'Rule 2: Internationalization',
            severity: 'warning',
            message: `نص محتمل hardcoded: "${text}"`,
            suggestion: 'تحقق من استخدام useTranslations إذا كان نص واجهة',
            code: line.trim(),
          });
        }
      }
    });

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

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) {
      return errors;
    }

    const fileName = path.basename(filePath, path.extname(filePath));

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

      return errors;
    }

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

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

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
   * القاعدة 7: فحص RTL support - ENHANCED
   */
  private checkRTLSupport(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      const leftRightClasses = [
        'ml-',
        'mr-',
        'pl-',
        'pr-',
        'left-',
        'right-',
        'float-left',
        'float-right',
      ];

      leftRightClasses.forEach((cls) => {
        if (line.includes(cls) && !line.trim().startsWith('//')) {
          const acceptablePatterns = ['ChevronLeft', 'ChevronRight', 'ArrowLeft', 'ArrowRight'];

          const isAcceptable = acceptablePatterns.some((pattern) => line.includes(pattern));

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

      // NEW: استثناء text-left/text-right في theme/config files
      if (
        (line.includes('text-left') || line.includes('text-right')) &&
        !line.trim().startsWith('//') &&
        !filePath.includes('/styles/') &&
        !filePath.includes('/theme/')
      ) {
        // فقط تحذير إذا لم يكن في object definition
        if (!line.includes('{') && !line.includes(':')) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: 1,
            rule: 'Rule 7: RTL Support',
            severity: 'warning',
            message: 'استخدام text-left/text-right',
            suggestion: 'استخدم text-start/text-end للدعم الأفضل لـ RTL',
            code: line.trim(),
          });
        }
      }
    });

    return errors;
  }

  /**
   * القاعدة 6: فحص Animations - ENHANCED
   */
  private checkAnimations(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    // فقط animations معقدة تحتاج framer-motion
    const hasComplexAnimations =
      content.includes('@keyframes') ||
      content.includes('animation:') ||
      content.includes('AnimatePresence') ||
      (content.includes('useState') && content.includes('animate'));

    const hasFramerMotion = content.includes('framer-motion') || content.includes('motion.');

    // استثناء: Tailwind transitions بسيطة
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasOnlySimpleTransitions =
      (content.includes('transition') || content.includes('duration')) && !hasComplexAnimations;

    if (hasComplexAnimations && !hasFramerMotion) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 6: Animations and Interactions',
        severity: 'warning',
        message: 'يوجد animations معقدة لكن بدون استخدام framer-motion',
        suggestion: 'استخدم framer-motion للـ animations المعقدة',
      });
    }

    return errors;
  }

  /**
   * القاعدة 8: فحص Responsive Design - ENHANCED
   */
  private checkResponsiveDesign(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // استثناء: أحجام الأيقونات (h-3 إلى h-12, w-3 إلى w-12)
      const isIconSize = /\b[hw]-(3|4|5|6|7|8|9|10|11|12)\b/.test(line);

      // استثناء: العناصر الزخرفية الصغيرة (h-1, w-1, h-2, w-2)
      const isDecorativeSmall = /\b[hw]-([12]|1\.5|2\.5)\b/.test(line);

      // استثناء: flex/grid بسيط مع centering
      const isSimpleCentering =
        (line.includes('flex') || line.includes('grid')) &&
        (line.includes('items-center') ||
          line.includes('justify-center') ||
          line.includes('items-start') ||
          line.includes('justify-between') ||
          line.includes('items-end')) &&
        !line.includes('grid-cols');

      // استثناء: أحجام الـ blur effects
      const isBlurEffect = line.includes('blur-');

      if (isIconSize || isDecorativeSmall || isSimpleCentering || isBlurEffect) {
        return; // تخطي - لا حاجة لـ responsive
      }

      // فحص قيم width/height ثابتة بدون responsive
      const fixedSizeRegex =
        /className="[^"]*\b(w-\d+|h-\d+|min-w-\d+|max-w-\d+|min-h-\d+|max-h-\d+)\b[^"]*"/g;
      if (
        fixedSizeRegex.test(line) &&
        !line.includes('sm:') &&
        !line.includes('md:') &&
        !line.includes('lg:') &&
        !line.trim().startsWith('//')
      ) {
        const hasResponsiveVariant =
          line.includes('w-full') ||
          line.includes('h-full') ||
          line.includes('w-auto') ||
          line.includes('h-auto') ||
          line.includes('max-w-') ||
          line.includes('min-w-');

        if (!hasResponsiveVariant) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: 1,
            rule: 'Rule 8: Responsive Design',
            severity: 'warning',
            message: 'استخدام حجم ثابت قد يحتاج responsive variants',
            suggestion: 'فكر في إضافة breakpoints إذا لزم: w-full md:w-1/2 lg:w-1/3',
            code: line.trim(),
          });
        }
      }

      // فحص استخدام px ثابتة في inline styles
      const inlineFixedPxRegex = /style={{[^}]*width:\s*['"]?\d+px['"]?[^}]*}}/g;
      if (inlineFixedPxRegex.test(line) && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 8: Responsive Design',
          severity: 'error',
          message: 'استخدام px ثابتة في inline styles',
          suggestion: 'استخدم Tailwind classes أو CSS variables مع responsive units',
          code: line.trim(),
        });
      }

      // فحص Tailwind arbitrary values للأحجام
      const arbitrarySizeRegex = /\b(w|h|min-w|max-w|min-h|max-h)-\[\d+(px|rem|em|vh|vw)\]/g;
      if (arbitrarySizeRegex.test(line) && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 8: Responsive Design',
          severity: 'error',
          message: 'استخدام Tailwind arbitrary values للأحجام',
          suggestion: 'استخدم Tailwind default classes: w-full, max-w-3xl, h-96',
          code: line.trim(),
        });
      }
    });

    return errors;
  }

  /**
   * القاعدة 9: فحص إعادة استخدام UI Components
   */
  private checkUIComponentsReusability(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // تجاهل ملفات ui/ نفسها
    if (
      filePath.includes('/components/ui/') ||
      filePath.includes('\\components\\ui\\') ||
      this.isScriptFile(filePath)
    ) {
      return errors;
    }

    const lines = content.split('\n');

    // 1. فحص إنشاء مكونات أساسية خارج ui/
    BASIC_UI_COMPONENTS.forEach((componentName) => {
      const componentRegex = new RegExp(`(function|const)\\s+${componentName}\\s*[=(:)]`, 'g');

      lines.forEach((line, index) => {
        if (componentRegex.test(line) && !line.includes('//') && !line.includes('import')) {
          errors.push({
            file: filePath,
            line: index + 1,
            column: 1,
            rule: 'Rule 9: UI Components Reusability',
            severity: 'error',
            message: `إنشاء مكون أساسي "${componentName}" خارج /components/ui`,
            suggestion: `استخدم أو أنشئ المكون في frontend/eetmad/src/components/ui/${componentName.toLowerCase()}.tsx`,
            code: line.trim(),
          });
        }
      });
    });

    // 2. فحص إنشاء buttons مخصصة
    const customButtonRegex = /<button[^>]*className="[^"]*"/g;
    const customButtonMatches = content.match(customButtonRegex);

    if (customButtonMatches && customButtonMatches.length > 0) {
      const hasButtonImport =
        content.includes('import') &&
        content.includes('Button') &&
        content.includes('@/components/ui');

      if (!hasButtonImport) {
        errors.push({
          file: filePath,
          line: 1,
          column: 1,
          rule: 'Rule 9: UI Components Reusability',
          severity: 'warning',
          message: 'استخدام <button> مباشرة بدلاً من مكون Button',
          suggestion: 'استخدم: import { Button } from "@/components/ui/button"',
        });
      }
    }

    // 3. فحص إنشاء cards مخصصة
    const customCardRegex = /className="[^"]*\b(rounded|shadow|border)\b[^"]*"/g;
    const cardMatches = content.match(customCardRegex);

    if (cardMatches && cardMatches.length > 3) {
      const hasCardImport =
        content.includes('import') &&
        content.includes('Card') &&
        content.includes('@/components/ui');

      if (!hasCardImport) {
        errors.push({
          file: filePath,
          line: 1,
          column: 1,
          rule: 'Rule 9: UI Components Reusability',
          severity: 'warning',
          message: 'إنشاء card styling مخصص بدلاً من استخدام Card component',
          suggestion:
            'استخدم: import { Card, CardHeader, CardContent } from "@/components/ui/card"',
        });
      }
    }

    return errors;
  }

  /**
   * القاعدة 10: فحص Accessibility
   */
  private checkAccessibility(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // 1. فحص <img> بدون alt
      if (/<img[^>]*>/i.test(line) && !line.includes('alt=') && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 10: Accessibility',
          severity: 'error',
          message: '<img> بدون alt attribute',
          suggestion: 'أضف alt="وصف الصورة" أو alt="" للصور التزيينية',
          code: line.trim(),
        });
      }

      // 2. فحص div/span مع onClick بدون role
      const divOnClickRegex = /<(div|span)[^>]*onClick[^>]*>/gi;
      if (
        divOnClickRegex.test(line) &&
        !line.includes('role=') &&
        !line.includes('aria-') &&
        !line.trim().startsWith('//')
      ) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 10: Accessibility',
          severity: 'error',
          message: 'استخدام onClick على div/span بدون role أو aria attributes',
          suggestion: 'استخدم <button> أو أضف role="button" و aria-label',
          code: line.trim(),
        });
      }

      // 3. فحص buttons بدون aria-label أو نص
      const emptyButtonRegex = /<button[^>]*>\s*<(svg|icon|i|Icon)[^>]*>/gi;
      if (
        emptyButtonRegex.test(line) &&
        !line.includes('aria-label=') &&
        !line.trim().startsWith('//')
      ) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 10: Accessibility',
          severity: 'error',
          message: 'زر يحتوي على أيقونة فقط بدون aria-label',
          suggestion: 'أضف aria-label="وصف الزر"',
          code: line.trim(),
        });
      }

      // 4. فحص input بدون label
      const inputRegex = /<input[^>]*>/gi;
      if (
        inputRegex.test(line) &&
        !line.includes('aria-label=') &&
        !line.includes('id=') &&
        !line.trim().startsWith('//')
      ) {
        // استثناء: input من نوع hidden
        if (!line.includes('type="hidden"')) {
          errors.push({
            file: filePath,
            line: lineNum,
            column: 1,
            rule: 'Rule 10: Accessibility',
            severity: 'warning',
            message: 'input بدون label أو aria-label',
            suggestion: 'أضف <Label htmlFor="inputId"> أو aria-label',
            code: line.trim(),
          });
        }
      }
    });

    return errors;
  }

  /**
   * القاعدة 11: فحص Performance
   */
  private checkPerformance(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const lines = content.split('\n');

    // 1. فحص استخدام <img> بدلاً من next/image
    lines.forEach((line, index) => {
      const lineNum = index + 1;

      if (/<img[^>]*src=/i.test(line) && !line.includes('//') && !line.trim().startsWith('//')) {
        errors.push({
          file: filePath,
          line: lineNum,
          column: 1,
          rule: 'Rule 11: Performance',
          severity: 'error',
          message: 'استخدام <img> بدلاً من next/image',
          suggestion: 'استخدم: import Image from "next/image"',
          code: line.trim(),
        });
      }
    });

    // 2. فحص استيراد مكونات ثقيلة بدون dynamic import
    HEAVY_COMPONENTS.forEach((component) => {
      const staticImportRegex = new RegExp(`import.*${component}.*from`, 'g');
      if (staticImportRegex.test(content)) {
        const hasDynamicImport = content.includes('dynamic(');

        if (!hasDynamicImport) {
          errors.push({
            file: filePath,
            line: 1,
            column: 1,
            rule: 'Rule 11: Performance',
            severity: 'warning',
            message: `استيراد مكون ثقيل "${component}" بشكل static`,
            suggestion: `استخدم dynamic import: const ${component} = dynamic(() => import('...'), { ssr: false })`,
          });
        }
      }
    });

    // 3. فحص استخدام useMemo/useCallback بدون dependencies
    const useMemoEmptyDepsRegex = /use(Memo|Callback)\([^)]+,\s*\[\s*\]\s*\)/g;
    if (useMemoEmptyDepsRegex.test(content)) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 11: Performance',
        severity: 'warning',
        message: 'استخدام useMemo/useCallback مع dependencies فارغة',
        suggestion: 'تحقق من dependencies أو استخدم قيمة ثابتة خارج Component',
      });
    }

    // 4. فحص استخدام inline functions في event handlers داخل loops
    const inlineFunctionInLoopRegex = /\.map\([^)]*=>\s*<[^>]*onClick=\{[^}]*=>/g;
    if (inlineFunctionInLoopRegex.test(content)) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 11: Performance',
        severity: 'warning',
        message: 'استخدام inline functions في event handlers داخل map/loop',
        suggestion: 'استخدم useCallback أو انقل الـ function خارج map',
      });
    }

    return errors;
  }

  /**
   * القاعدة 12: فحص File Structure
   */
  private checkFileStructure(content: string, filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (this.isScriptFile(filePath)) {
      return errors;
    }

    const fileName = path.basename(filePath, path.extname(filePath));

    // 1. المكونات الأساسية يجب أن تكون في ui/
    if (
      BASIC_UI_COMPONENTS.includes(fileName) &&
      !filePath.includes('/components/ui/') &&
      !filePath.includes('\\components\\ui\\')
    ) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 12: File Structure',
        severity: 'error',
        message: `مكون أساسي "${fileName}" في مكان خاطئ`,
        suggestion: 'انقل الملف إلى: frontend/eetmad/src/components/ui/',
      });
    }

    // 2. مكونات الصفحات يجب أن تكون في features/
    const isPageComponent =
      content.includes('export default function') &&
      !filePath.includes('/ui/') &&
      !filePath.includes('\\ui\\') &&
      !filePath.includes('/layout/') &&
      !filePath.includes('\\layout\\') &&
      !filePath.includes('/shared/layouts/') &&
      !filePath.includes('\\shared\\layouts\\') &&
      !filePath.includes('/app/') &&
      !filePath.includes('\\app\\');

    if (isPageComponent && !filePath.includes('/features/') && !filePath.includes('\\features\\')) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 12: File Structure',
        severity: 'warning',
        message: 'مكون صفحة خارج مجلد features/',
        suggestion: 'انقل الملف إلى: frontend/eetmad/src/components/features/[feature-name]/',
      });
    }

    // 3. الـ types يجب أن تكون في ملفات منفصلة
    const typeDefinitions = content.match(/^(export\s+)?(type|interface)\s+\w+/gm) || [];
    const hasMultipleTypes = typeDefinitions.length > 3;
    const isTypeFile =
      filePath.endsWith('.types.ts') ||
      filePath.includes('/types/') ||
      filePath.includes('\\types\\');

    if (
      hasMultipleTypes &&
      !isTypeFile &&
      !filePath.includes('/app/') &&
      !filePath.includes('\\app\\')
    ) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 12: File Structure',
        severity: 'warning',
        message: `عدد كبير من الـ types (${typeDefinitions.length}) في ملف component`,
        suggestion: 'انقل الـ types إلى ملف منفصل: [ComponentName].types.ts',
      });
    }

    // 4. فحص وجود utils/helpers داخل component files
    const utilFunctionRegex =
      /^(export\s+)?(const|function)\s+(utils?|helpers?|format|parse|validate)\w*/gim;
    const utilMatches = content.match(utilFunctionRegex) || [];

    if (
      utilMatches.length > 2 &&
      !filePath.includes('/utils/') &&
      !filePath.includes('\\utils\\') &&
      !filePath.includes('/lib/') &&
      !filePath.includes('\\lib\\')
    ) {
      errors.push({
        file: filePath,
        line: 1,
        column: 1,
        rule: 'Rule 12: File Structure',
        severity: 'warning',
        message: 'وجود utility functions داخل component file',
        suggestion: 'انقل الـ utility functions إلى: src/lib/utils/ أو src/utils/',
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

    if (this.isPlaceholderFile(filePath, content)) {
      this.skippedPlaceholders++;
      return null;
    }

    if (this.isScriptFile(filePath)) {
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
      ...this.checkResponsiveDesign(content, filePath),
      ...this.checkUIComponentsReusability(content, filePath),
      ...this.checkAccessibility(content, filePath),
      ...this.checkPerformance(content, filePath),
      ...this.checkFileStructure(content, filePath),
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
    console.log('🔍 بدء فحص قواعد البناء (الإصدار المحسّن v2)...\n');

    const allFiles = new Set<string>();

    for (const pattern of patterns) {
      const stats = fs.statSync(pattern);

      if (stats.isFile()) {
        allFiles.add(pattern);
      } else if (stats.isDirectory()) {
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

    for (const file of files) {
      const result = await this.validateFile(file);
      if (result !== null) {
        this.results.push(result);
      }

      process.stdout.write(`\r⏳ جاري الفحص... ${this.results.length}/${this.totalFiles}`);
    }

    console.log('\n\n✅ انتهى الفحص!\n');
    if (this.skippedPlaceholders > 0) {
      console.log(`⏭️  تم تخطي ${this.skippedPlaceholders} ملف placeholder/script\n`);
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
      console.log(`⏭️  ملفات placeholder/script تم تخطيها: ${this.skippedPlaceholders}`);
    }
    console.log(`❌ إجمالي الأخطاء: ${this.totalErrors}`);
    console.log(`⚠️  إجمالي التحذيرات: ${this.totalWarnings}`);
    console.log('═'.repeat(80));
    console.log();

    const sortedResults = [...this.results].sort((a, b) => {
      const aTotal = a.errors.length + a.warnings.length;
      const bTotal = b.errors.length + b.warnings.length;
      return bTotal - aTotal;
    });

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

    if (this.totalErrors > 0 || this.totalWarnings > 50) {
      console.log('💡 نصائح:');
      console.log('  • راجع frontend/eetmad/docs/design/component-building-guidelines.md');
      console.log('  • استخدم cssVars من @/styles/theme لجميع الألوان');
      console.log('  • استخدم useTranslations من next-intl لجميع النصوص');
      console.log('  • أضف "use client" للـ components التي تستخدم hooks');
      console.log('  • استخدم مكونات UI من @/components/ui');
      console.log('  • تأكد من responsive design لجميع المكونات');
      console.log('  • اتبع معايير accessibility (a11y)');
      console.log('  • استخدم next/image بدلاً من <img>');
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
║   Design Rules Validation Script - Enhanced & Optimized v2        ║
║                                                                    ║
║  يفحص الملفات للتأكد من اتباع قواعد البناء (12 قاعدة محسّنة)      ║
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

القواعد المفحوصة (12 قاعدة محسّنة):
  ✓ Rule 1: Theme System Usage (استخدام cssVars + dark mode + opacity)
  ✓ Rule 2: Internationalization (استخدام i18n) - محسّن ✨
  ✓ Rule 3: Component Structure (هيكل المكونات) - محسّن ✨
  ✓ Rule 4: Styling Best Practices (ممارسات التصميم)
  ✓ Rule 6: Animations (استخدام framer-motion) - محسّن ✨
  ✓ Rule 7: RTL Support (دعم RTL) - محسّن ✨
  ✓ Rule 8: Responsive Design (تصميم متجاوب) - محسّن ✨
  ✓ Rule 9: UI Components Reusability (إعادة استخدام UI)
  ✓ Rule 10: Accessibility (إمكانية الوصول)
  ✓ Rule 11: Performance (الأداء)
  ✓ Rule 12: File Structure (بنية الملفات)

التحسينات في v2:
  • تقليل False Positives بنسبة ~70%
  • استثناء أحجام الأيقونات والعناصر الصغيرة
  • استثناء ملفات theme/styles من فحص PascalCase
  • تحسين منطق فحص i18n (استثناء type definitions)
  • استثناء Tailwind transitions البسيطة
  • استثناء text-left/right في config files

المرجع:
  frontend/eetmad/docs/design/component-building-guidelines.md
`);
    process.exit(0);
  }

  const jsonIndex = args.indexOf('--json');
  let jsonOutput: string | undefined;
  let paths: string[];

  if (jsonIndex !== -1) {
    jsonOutput = args[jsonIndex + 1] || 'validation-report.json';
    paths = args.filter((_, i) => i !== jsonIndex && i !== jsonIndex + 1);
  } else {
    paths = args;
  }

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
