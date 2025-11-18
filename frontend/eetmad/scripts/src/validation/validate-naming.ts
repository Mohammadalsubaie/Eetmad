/**
 * Script to validate naming conventions for all project files
 *
 * Usage:
 *   npx tsx scripts/validate-naming.ts
 *   or
 *   ts-node scripts/validate-naming.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  validateNamingConventions,
  type ValidationInput,
  type ValidationResult,
} from '../../../src/lib/utils/naming-validator';

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  '.cache',
  'public',
  '.vercel',
  'out',
];

// Next.js App Router special files
const NEXTJS_SPECIAL_FILES = [
  'page.tsx',
  'layout.tsx',
  'loading.tsx',
  'error.tsx',
  'not-found.tsx',
  'global-error.tsx',
  'route.ts',
  'template.tsx',
  'default.tsx',
  'opengraph-image.tsx',
  'twitter-image.tsx',
  'icon.tsx',
  'apple-icon.tsx',
  'manifest.ts',
  'sitemap.ts',
  'robots.ts',
];

// Next.js root-level special files
const NEXTJS_ROOT_FILES = [
  'middleware.ts',
  'instrumentation.ts',
  'next.config.js',
  'next.config.mjs',
  'next.config.ts',
];

// Standard file names that are allowed
const ALLOWED_FILE_NAMES = [
  'index.ts',
  'index.tsx',
  'types.ts',
  'constants.ts',
  'utils.ts',
  'helpers.ts',
  'config.ts',
  'styles.ts',
  'hooks.ts',
];

// Path patterns to exclude
const EXCLUDE_PATTERNS = [
  'components/ui', // shadcn/ui components use kebab-case
  'app/api', // API routes can use kebab-case by convention
];

// Files to exclude
const EXCLUDE_FILES = [
  'next-env.d.ts',
  '*.test.ts',
  '*.test.tsx',
  '*.spec.ts',
  '*.spec.tsx',
  'naming-validator.ts',
  'naming-validator.examples.ts',
  'naming-validator.test-demo.ts',
  'naming-validator.README.md',
  '*.stories.tsx',
  '*.config.ts',
  '*.config.js',
  ...ALLOWED_FILE_NAMES,
];

// Extensions to validate
const VALID_EXTENSIONS = ['.ts', '.tsx'];

/**
 * React-specific naming patterns that should be allowed
 */
const REACT_PATTERNS = {
  eventHandlers: /^(handle|on)[A-Z]/,
  hooks: /^use[A-Z]/,
  helpers:
    /^(get|set|is|has|should|can|will|format|parse|validate|calculate|compute|find|filter|map|reduce|create|make|build|generate|check|confirm|verify|toggle)[A-Z]/,
};

/**
 * Filter out false positive violations based on React conventions
 */
function filterReactViolations(result: ValidationResult): ValidationResult {
  const filteredViolations = result.violations.filter((violation) => {
    // Allow index files
    if (violation.type === 'file' && ALLOWED_FILE_NAMES.includes(violation.name)) {
      return false;
    }

    // Allow event handlers (handleSubmit, onClick, etc.)
    if (violation.type === 'function' && REACT_PATTERNS.eventHandlers.test(violation.name)) {
      return false;
    }

    // Allow React hooks (useState, useEffect, useCustomHook, etc.)
    if (violation.type === 'function' && REACT_PATTERNS.hooks.test(violation.name)) {
      return false;
    }

    // Allow helper functions (getInitials, formatDate, etc.)
    if (violation.type === 'function' && REACT_PATTERNS.helpers.test(violation.name)) {
      return false;
    }

    // Allow component variables (const Icon = ...)
    if (violation.type === 'variable' && /^[A-Z]/.test(violation.name)) {
      return false;
    }

    return true;
  });

  // Recalculate score
  const totalChecks = result.violations.length;
  const remainingViolations = filteredViolations.length;
  const score =
    totalChecks > 0 ? Math.round(((totalChecks - remainingViolations) / totalChecks) * 100) : 100;

  return {
    ...result,
    violations: filteredViolations,
    score,
  };
}

function isDynamicSegment(dirName: string): boolean {
  return (
    /^\[\.\.\..*\]$/.test(dirName) || /^\[\[\.\.\..*\]\]$/.test(dirName) || /^\[.*\]$/.test(dirName)
  );
}

function isNextJsSpecialFile(filePath: string, projectRoot: string): boolean {
  const fileName = path.basename(filePath);
  const relativePath = getRelativePath(filePath, projectRoot);

  if (NEXTJS_ROOT_FILES.includes(fileName)) {
    return true;
  }

  if (NEXTJS_SPECIAL_FILES.includes(fileName)) {
    return true;
  }

  if (relativePath.startsWith('app/') || relativePath.startsWith('src/app/')) {
    if (NEXTJS_SPECIAL_FILES.includes(fileName)) {
      return true;
    }
  }

  return false;
}

function isPlaceholderFile(filePath: string, content: string): boolean {
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

function shouldExcludeFile(filePath: string, projectRoot: string): boolean {
  const fileName = path.basename(filePath);

  if (isNextJsSpecialFile(filePath, projectRoot)) {
    return true;
  }

  for (const pattern of EXCLUDE_FILES) {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      if (regex.test(fileName)) {
        return true;
      }
    } else if (fileName === pattern) {
      return true;
    }
  }

  return false;
}

function shouldExcludePath(filePath: string, projectRoot: string): boolean {
  const relativePath = getRelativePath(filePath, projectRoot);
  for (const pattern of EXCLUDE_PATTERNS) {
    if (relativePath.includes(pattern)) {
      return true;
    }
  }
  return false;
}

function findTypeScriptFiles(dir: string, projectRoot: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const dirName = path.basename(filePath);

      if (EXCLUDE_DIRS.includes(dirName) || dirName.startsWith('.')) {
        return;
      }

      if (isDynamicSegment(dirName)) {
        findTypeScriptFiles(filePath, projectRoot, fileList);
        return;
      }

      findTypeScriptFiles(filePath, projectRoot, fileList);
    } else if (stat.isFile()) {
      const ext = path.extname(filePath);
      if (
        VALID_EXTENSIONS.includes(ext) &&
        !shouldExcludeFile(filePath, projectRoot) &&
        !shouldExcludePath(filePath, projectRoot)
      ) {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          if (!isPlaceholderFile(filePath, content)) {
            fileList.push(filePath);
          }
        } catch {
          // Skip files we can't read
        }
      }
    }
  });

  return fileList;
}

function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

function getRelativePath(filePath: string, projectRoot: string): string {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/');
}

function formatResultsWithFiles(results: Map<string, ValidationResult>): string {
  let output = '\n' + '='.repeat(80) + '\n';
  output += '📊 Naming Convention Validation - Next.js Project\n';
  output += '='.repeat(80) + '\n\n';

  let totalViolations = 0;
  let totalFiles = 0;
  let totalFilesWithViolations = 0;
  const summary = {
    file: 0,
    function: 0,
    variable: 0,
    constant: 0,
  };

  results.forEach((result) => {
    totalFiles++;
    if (result.violations.length > 0) {
      totalFilesWithViolations++;
      totalViolations += result.violations.length;
      result.violations.forEach((v) => {
        summary[v.type]++;
      });
    }
  });

  output += `Overall Summary:\n`;
  output += `  • Total files validated: ${totalFiles}\n`;
  output += `  • Files with violations: ${totalFilesWithViolations}\n`;
  output += `  • Total violations: ${totalViolations}\n\n`;

  output += `Violations by type:\n`;
  output += `  • Files: ${summary.file}\n`;
  output += `  • Functions: ${summary.function}\n`;
  output += `  • Variables: ${summary.variable}\n`;
  output += `  • Constants: ${summary.constant}\n\n`;

  if (totalFilesWithViolations > 0) {
    output += '='.repeat(80) + '\n';
    output += 'Files with Violations:\n';
    output += '='.repeat(80) + '\n\n';

    results.forEach((result, filePath) => {
      if (result.violations.length > 0) {
        output += `\n📁 ${filePath}\n`;
        output += `${'-'.repeat(80)}\n`;
        output += `Score: ${result.score}% | Violations: ${result.violations.length}\n\n`;

        result.violations.forEach((violation, index) => {
          output += `${index + 1}. [${violation.severity.toUpperCase()}] ${violation.type}: ${violation.name}\n`;
          output += `   ${violation.message}\n`;
          if (violation.line) {
            output += `   Line: ${violation.line}\n`;
          }
          output += `   Suggestion: ${violation.suggestion}\n`;
          if (index < result.violations.length - 1) {
            output += '\n';
          }
        });
        output += '\n';
      }
    });
  } else {
    output += '✅ No violations found! All files follow naming conventions.\n';
  }

  return output;
}

function main() {
  const projectRoot = path.resolve(__dirname, '../../../');

  const possibleDirs = [path.join(projectRoot, 'src'), path.join(projectRoot, 'app')];

  const dirsToScan = possibleDirs.filter((dir) => fs.existsSync(dir));

  console.log('🔍 Scanning for TypeScript files...');
  console.log(`Project root: ${projectRoot}`);
  console.log(`Scanning directories: ${dirsToScan.map((d) => path.basename(d)).join(', ')}\n`);

  let files: string[] = [];
  dirsToScan.forEach((dir) => {
    files = files.concat(findTypeScriptFiles(dir, projectRoot));
  });

  const rootFiles = fs
    .readdirSync(projectRoot)
    .filter((file) => {
      const filePath = path.join(projectRoot, file);
      const stat = fs.statSync(filePath);
      return (
        stat.isFile() &&
        VALID_EXTENSIONS.includes(path.extname(file)) &&
        !shouldExcludeFile(filePath, projectRoot)
      );
    })
    .map((file) => path.join(projectRoot, file));

  files = files.concat(rootFiles);

  console.log(`Found ${files.length} TypeScript files to validate\n`);

  if (files.length === 0) {
    console.log('No files found to validate.');
    return;
  }

  console.log('Validating files...\n');
  const inputs: ValidationInput[] = [];
  const fileResults = new Map<string, ValidationResult>();

  files.forEach((filePath) => {
    const code = readFileContent(filePath);
    if (code && !isPlaceholderFile(filePath, code)) {
      const relativePath = getRelativePath(filePath, projectRoot);
      inputs.push({
        filePath: relativePath,
        code,
      });
    }
  });

  validateNamingConventions(inputs);

  // Apply React-specific filtering
  inputs.forEach((input) => {
    const result = validateNamingConventions(input);
    const filteredResult = filterReactViolations(result);
    fileResults.set(input.filePath, filteredResult);
  });

  console.log(formatResultsWithFiles(fileResults));

  // Count actual violations after filtering
  const actualViolations = Array.from(fileResults.values()).reduce(
    (sum, result) => sum + result.violations.length,
    0
  );

  if (actualViolations > 0) {
    console.log('\n❌ Validation completed with violations.');
    process.exit(1);
  } else {
    console.log('\n✅ All files pass naming convention validation!');
    process.exit(0);
  }
}

main();
