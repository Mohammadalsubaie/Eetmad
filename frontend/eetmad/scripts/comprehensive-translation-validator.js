#!/usr/bin/env node

/**
 * Comprehensive Translation Validator
 * 
 * This script performs a deep, comprehensive validation of all translation usage
 * across the entire project, checking:
 * 1. All translation imports and usage patterns
 * 2. Every translation key exists in both ar.json and en.json
 * 3. No conflicts or errors preventing translations from working
 * 4. Proper namespace usage
 * 5. Dynamic key construction
 * 6. Missing keys and broken references
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(EETMAD_ROOT, 'src');
const MESSAGES_DIR = path.join(EETMAD_ROOT, 'messages');
const AR_JSON = path.join(MESSAGES_DIR, 'ar.json');
const EN_JSON = path.join(MESSAGES_DIR, 'en.json');

// Load translation files
let arMessages, enMessages;

try {
  arMessages = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));
  enMessages = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));
} catch (error) {
  console.error('❌ Failed to load translation files:', error.message);
  process.exit(1);
}

// Results storage
const results = {
  files: [],
  errors: [],
  warnings: [],
  stats: {
    totalFiles: 0,
    filesWithTranslations: 0,
    totalTranslationCalls: 0,
    missingKeys: 0,
    namespaceErrors: 0,
    importErrors: 0,
    dynamicKeyIssues: 0,
  },
};

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
 * Check if a translation key exists in messages
 */
function keyExists(namespace, key, locale = 'both') {
  const fullPath = key ? `${namespace}.${key}` : namespace;
  
  const arExists = getNestedValue(arMessages, fullPath) !== null;
  const enExists = getNestedValue(enMessages, fullPath) !== null;
  
  if (locale === 'ar') return arExists;
  if (locale === 'en') return enExists;
  return arExists && enExists;
}

/**
 * Extract all translation usage from a file
 */
function extractTranslations(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  const fileResults = {
    path: path.relative(SRC_DIR, filePath),
    fullPath: filePath,
    imports: [],
    namespaces: new Map(), // variable name -> namespace
    translations: [],
    errors: [],
    warnings: [],
  };
  
  // Extract imports
  const importRegex = /import\s+.*?useTranslations.*?from\s+['"]next-intl['"]/g;
  const imports = content.match(importRegex) || [];
  
  // Extract useTranslations calls
  const useTranslationsRegex = /const\s+(\w+)\s*=\s*useTranslations\(['"]([^'"]+)['"]\)/g;
  let match;
  
  while ((match = useTranslationsRegex.exec(content)) !== null) {
    const varName = match[1];
    const namespace = match[2];
    const lineNumber = content.substring(0, match.index).split('\n').length;
    
    fileResults.namespaces.set(varName, {
      namespace,
      line: lineNumber,
    });
    
    fileResults.imports.push({
      varName,
      namespace,
      line: lineNumber,
    });
  }
  
  // Extract t() calls
  const tCallRegex = /(\w+)\(['"`]([^'"`]+)['"`]\)/g;
  while ((match = tCallRegex.exec(content)) !== null) {
    const varName = match[1];
    const key = match[2];
    const lineNumber = content.substring(0, match.index).split('\n').length;
    const lineContent = lines[lineNumber - 1];
    
    // Check if it's a template literal (dynamic key)
    const isDynamic = lineContent.includes('`') && lineContent.includes('${');
    
    const namespaceInfo = fileResults.namespaces.get(varName);
    
    if (!namespaceInfo) {
      // Unknown variable - might be a function call, not translation
      // Only warn if it looks like a translation call
      if (varName === 't' || varName.startsWith('t')) {
        fileResults.warnings.push({
          type: 'unknown_namespace',
          line: lineNumber,
          message: `Translation call with unknown namespace: ${varName}('${key}')`,
          code: lineContent.trim(),
        });
      }
      continue;
    }
    
    const fullKey = key ? `${namespaceInfo.namespace}.${key}` : namespaceInfo.namespace;
    
    // Check if key exists
    let keyExistsResult = false;
    let missingIn = [];
    
    if (isDynamic) {
      // For dynamic keys, we can't verify all possible values
      // But we can check the base structure
      const baseKey = key.split('${')[0].replace(/\.$/, '');
      if (baseKey) {
        const baseFullKey = `${namespaceInfo.namespace}.${baseKey}`;
        keyExistsResult = getNestedValue(arMessages, baseFullKey) !== null;
      } else {
        keyExistsResult = true; // Assume valid if no base key
      }
      fileResults.warnings.push({
        type: 'dynamic_key',
        line: lineNumber,
        message: `Dynamic translation key: ${varName}(\`${key}\`) - cannot fully validate`,
        code: lineContent.trim(),
      });
    } else {
      const arExists = getNestedValue(arMessages, fullKey) !== null;
      const enExists = getNestedValue(enMessages, fullKey) !== null;
      
      if (!arExists) missingIn.push('ar');
      if (!enExists) missingIn.push('en');
      keyExistsResult = arExists && enExists;
    }
    
    fileResults.translations.push({
      varName,
      namespace: namespaceInfo.namespace,
      key,
      fullKey,
      line: lineNumber,
      isDynamic,
      exists: keyExistsResult,
      missingIn,
      code: lineContent.trim(),
    });
    
    if (!keyExistsResult && !isDynamic) {
      fileResults.errors.push({
        type: 'missing_key',
        line: lineNumber,
        message: `Missing translation key: ${fullKey}${missingIn.length > 0 ? ` (missing in: ${missingIn.join(', ')})` : ''}`,
        code: lineContent.trim(),
        namespace: namespaceInfo.namespace,
        key,
      });
    }
  }
  
  // Check for hardcoded Arabic text (common issue)
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+/g;
  const arabicMatches = [];
  lines.forEach((line, index) => {
    // Skip comments and strings that are already in t() calls
    if (line.trim().startsWith('//') || line.includes('t(')) return;
    
    const matches = line.match(arabicRegex);
    if (matches && matches.length > 0) {
      // Check if it's in a string literal
      const stringMatch = line.match(/['"`]([^'"`]*[\u0600-\u06FF][^'"`]*)['"`]/);
      if (stringMatch) {
        arabicMatches.push({
          line: index + 1,
          text: stringMatch[1].substring(0, 50),
          code: line.trim(),
        });
      }
    }
  });
  
  if (arabicMatches.length > 0) {
    fileResults.warnings.push({
      type: 'hardcoded_arabic',
      matches: arabicMatches,
      message: `Found ${arabicMatches.length} potential hardcoded Arabic text(s)`,
    });
  }
  
  return fileResults;
}

/**
 * Find all TypeScript/TSX files
 */
function findSourceFiles(dir = SRC_DIR) {
  const files = [];
  
  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      // Skip node_modules, .next, and other build directories
      if (entry.name.startsWith('.') || 
          entry.name === 'node_modules' || 
          entry.name === '.next' ||
          entry.name === 'dist' ||
          entry.name === 'build') {
        continue;
      }
      
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts'))) {
        // Skip test files and type definitions
        if (!entry.name.includes('.test.') && 
            !entry.name.includes('.spec.') &&
            !entry.name.endsWith('.d.ts') &&
            !entry.name.includes('mock')) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walk(dir);
  return files;
}

/**
 * Main validation function
 */
function validateAll() {
  console.log('🔍 Starting comprehensive translation validation...\n');
  console.log('='.repeat(80));
  
  const files = findSourceFiles();
  results.stats.totalFiles = files.length;
  
  console.log(`\n📁 Found ${files.length} source files to check\n`);
  
  for (const file of files) {
    try {
      const fileResults = extractTranslations(file);
      
      if (fileResults.translations.length > 0 || fileResults.imports.length > 0) {
        results.files.push(fileResults);
        results.stats.filesWithTranslations++;
        results.stats.totalTranslationCalls += fileResults.translations.length;
        results.stats.missingKeys += fileResults.errors.filter(e => e.type === 'missing_key').length;
        results.stats.namespaceErrors += fileResults.errors.filter(e => e.type === 'unknown_namespace').length;
        results.stats.dynamicKeyIssues += fileResults.warnings.filter(w => w.type === 'dynamic_key').length;
        
        results.errors.push(...fileResults.errors.map(e => ({
          file: fileResults.path,
          ...e,
        })));
        
        results.warnings.push(...fileResults.warnings.map(w => ({
          file: fileResults.path,
          ...w,
        })));
      }
    } catch (error) {
      results.errors.push({
        file: path.relative(SRC_DIR, file),
        type: 'parse_error',
        message: `Failed to parse file: ${error.message}`,
      });
    }
  }
  
  // Generate report
  generateReport();
}

/**
 * Generate comprehensive report
 */
function generateReport() {
  const reportPath = path.join(path.resolve(EETMAD_ROOT, '..'), 'TRANSLATION-VALIDATION-REPORT.md');
  
  let report = `# Comprehensive Translation Validation Report\n\n`;
  report += `Generated: ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- **Total Files Scanned**: ${results.stats.totalFiles}\n`;
  report += `- **Files Using Translations**: ${results.stats.filesWithTranslations}\n`;
  report += `- **Total Translation Calls**: ${results.stats.totalTranslationCalls}\n`;
  report += `- **Missing Keys**: ${results.stats.missingKeys}\n`;
  report += `- **Namespace Errors**: ${results.stats.namespaceErrors}\n`;
  report += `- **Dynamic Key Issues**: ${results.stats.dynamicKeyIssues}\n`;
  report += `- **Total Errors**: ${results.errors.length}\n`;
  report += `- **Total Warnings**: ${results.warnings.length}\n\n`;
  
  if (results.errors.length === 0 && results.warnings.length === 0) {
    report += `## ✅ All Clear!\n\n`;
    report += `No translation errors or warnings found. All translation keys are properly defined and used.\n`;
  } else {
    // Errors section
    if (results.errors.length > 0) {
      report += `## ❌ Errors (${results.errors.length})\n\n`;
      report += `These issues **must** be fixed as they prevent translations from working:\n\n`;
      
      const errorsByType = {};
      results.errors.forEach(error => {
        if (!errorsByType[error.type]) {
          errorsByType[error.type] = [];
        }
        errorsByType[error.type].push(error);
      });
      
      for (const [type, errors] of Object.entries(errorsByType)) {
        report += `### ${type} (${errors.length})\n\n`;
        errors.slice(0, 50).forEach(error => {
          report += `- **${error.file}:${error.line}** - ${error.message}\n`;
          report += `  \`\`\`\n  ${error.code}\n  \`\`\`\n\n`;
        });
        if (errors.length > 50) {
          report += `\n... and ${errors.length - 50} more\n\n`;
        }
      }
    }
    
    // Warnings section
    if (results.warnings.length > 0) {
      report += `## ⚠️ Warnings (${results.warnings.length})\n\n`;
      report += `These issues should be reviewed but may not prevent translations from working:\n\n`;
      
      const warningsByType = {};
      results.warnings.forEach(warning => {
        if (!warningsByType[warning.type]) {
          warningsByType[warning.type] = [];
        }
        warningsByType[warning.type].push(warning);
      });
      
      for (const [type, warnings] of Object.entries(warningsByType)) {
        report += `### ${type} (${warnings.length})\n\n`;
        warnings.slice(0, 30).forEach(warning => {
          if (warning.matches) {
            report += `- **${warning.file}** - ${warning.message}\n`;
            warning.matches.slice(0, 3).forEach(match => {
              report += `  - Line ${match.line}: "${match.text}"\n`;
            });
          } else {
            report += `- **${warning.file}:${warning.line}** - ${warning.message}\n`;
            if (warning.code) {
              report += `  \`\`\`\n  ${warning.code}\n  \`\`\`\n\n`;
            }
          }
        });
        if (warnings.length > 30) {
          report += `\n... and ${warnings.length - 30} more\n\n`;
        }
      }
    }
  }
  
  // File-by-file breakdown
  report += `\n## 📋 File-by-File Breakdown\n\n`;
  results.files.forEach(file => {
    report += `### ${file.path}\n\n`;
    report += `- **Namespaces Used**: ${Array.from(file.namespaces.values()).map(n => n.namespace).join(', ')}\n`;
    report += `- **Translation Calls**: ${file.translations.length}\n`;
    report += `- **Errors**: ${file.errors.length}\n`;
    report += `- **Warnings**: ${file.warnings.length}\n\n`;
    
    if (file.errors.length > 0 || file.warnings.length > 0) {
      file.errors.forEach(error => {
        report += `  - ❌ Line ${error.line}: ${error.message}\n`;
      });
      file.warnings.forEach(warning => {
        if (!warning.matches) {
          report += `  - ⚠️ Line ${warning.line}: ${warning.message}\n`;
        }
      });
      report += `\n`;
    }
  });
  
  fs.writeFileSync(reportPath, report, 'utf8');
  
  // Console output
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 Validation Results:\n');
  console.log(`   Files Scanned: ${results.stats.totalFiles}`);
  console.log(`   Files Using Translations: ${results.stats.filesWithTranslations}`);
  console.log(`   Total Translation Calls: ${results.stats.totalTranslationCalls}`);
  console.log(`   Missing Keys: ${results.stats.missingKeys}`);
  console.log(`   Namespace Errors: ${results.stats.namespaceErrors}`);
  console.log(`   Dynamic Key Issues: ${results.stats.dynamicKeyIssues}`);
  console.log(`   Total Errors: ${results.errors.length}`);
  console.log(`   Total Warnings: ${results.warnings.length}`);
  
  if (results.errors.length > 0) {
    console.log('\n❌ ERRORS FOUND - These must be fixed:');
    results.errors.slice(0, 10).forEach(error => {
      console.log(`   ${error.file}:${error.line} - ${error.message}`);
    });
    if (results.errors.length > 10) {
      console.log(`   ... and ${results.errors.length - 10} more`);
    }
  }
  
  if (results.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS - Should be reviewed:');
    results.warnings.slice(0, 10).forEach(warning => {
      if (!warning.matches) {
        console.log(`   ${warning.file}:${warning.line} - ${warning.message}`);
      } else {
        console.log(`   ${warning.file} - ${warning.message}`);
      }
    });
    if (results.warnings.length > 10) {
      console.log(`   ... and ${results.warnings.length - 10} more`);
    }
  }
  
  console.log(`\n📄 Full report saved to: ${reportPath}\n`);
  
  if (results.errors.length === 0) {
    console.log('✅ No critical errors found!');
    process.exit(0);
  } else {
    console.log('❌ Errors found - please review the report');
    process.exit(1);
  }
}

// Run validation
validateAll();

