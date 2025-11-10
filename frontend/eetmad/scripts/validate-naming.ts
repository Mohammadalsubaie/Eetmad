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
} from '../src/lib/utils/naming-validator';

// Directories to exclude
const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'coverage',
  '.cache',
  'public', // Skip public assets
];

// Path patterns to exclude (relative to src)
const EXCLUDE_PATTERNS = [
  'components/ui', // shadcn/ui components use kebab-case
];

// Files to exclude
const EXCLUDE_FILES = [
  'next-env.d.ts',
  '*.test.ts',
  '*.test.tsx',
  '*.spec.ts',
  '*.spec.tsx',
  'naming-validator.ts', // Validator itself
  'naming-validator.examples.ts', // Examples file
  'naming-validator.test-demo.ts', // Test demo file
  'naming-validator.README.md', // Documentation
];

// Extensions to validate
const VALID_EXTENSIONS = ['.ts', '.tsx'];

/**
 * Check if a file should be excluded
 */
function shouldExcludeFile(filePath: string): boolean {
  const fileName = path.basename(filePath);

  // Check exclude patterns
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

/**
 * Check if a path should be excluded based on patterns
 */
function shouldExcludePath(filePath: string, srcDir: string): boolean {
  const relativePath = getRelativePath(filePath, srcDir);
  for (const pattern of EXCLUDE_PATTERNS) {
    if (relativePath.includes(pattern)) {
      return true;
    }
  }
  return false;
}

/**
 * Recursively find all TypeScript files
 */
function findTypeScriptFiles(dir: string, srcDir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded directories
    if (stat.isDirectory()) {
      const dirName = path.basename(filePath);
      if (!EXCLUDE_DIRS.includes(dirName) && !dirName.startsWith('.')) {
        findTypeScriptFiles(filePath, srcDir, fileList);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(filePath);
      if (
        VALID_EXTENSIONS.includes(ext) &&
        !shouldExcludeFile(filePath) &&
        !shouldExcludePath(filePath, srcDir)
      ) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Read file content
 */
function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return '';
  }
}

/**
 * Convert absolute path to relative path from project root
 */
function getRelativePath(filePath: string, projectRoot: string): string {
  return path.relative(projectRoot, filePath).replace(/\\/g, '/');
}

/**
 * Format results with file grouping
 */
function formatResultsWithFiles(results: Map<string, ValidationResult>): string {
  let output = '\n' + '='.repeat(80) + '\n';
  output += '📊 Naming Convention Validation - Project Wide\n';
  output += '='.repeat(80) + '\n\n';

  // Calculate totals
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

  // Overall summary
  output += `Overall Summary:\n`;
  output += `  • Total files validated: ${totalFiles}\n`;
  output += `  • Files with violations: ${totalFilesWithViolations}\n`;
  output += `  • Total violations: ${totalViolations}\n\n`;

  output += `Violations by type:\n`;
  output += `  • Files: ${summary.file}\n`;
  output += `  • Functions: ${summary.function}\n`;
  output += `  • Variables: ${summary.variable}\n`;
  output += `  • Constants: ${summary.constant}\n\n`;

  // Files with violations
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

/**
 * Main function
 */
function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');

  console.log('🔍 Scanning for TypeScript files...');
  console.log(`Project root: ${projectRoot}`);
  console.log(`Source directory: ${srcDir}\n`);

  // Find all TypeScript files
  const files = findTypeScriptFiles(srcDir, srcDir);
  console.log(`Found ${files.length} TypeScript files to validate\n`);

  if (files.length === 0) {
    console.log('No files found to validate.');
    return;
  }

  // Validate each file
  console.log('Validating files...\n');
  const inputs: ValidationInput[] = [];
  const fileResults = new Map<string, ValidationResult>();

  files.forEach((filePath) => {
    const code = readFileContent(filePath);
    if (code) {
      const relativePath = getRelativePath(filePath, projectRoot);
      inputs.push({
        filePath: relativePath,
        code,
      });
    }
  });

  // Validate all files
  const batchResult = validateNamingConventions(inputs);

  // Also get individual results for better reporting
  inputs.forEach((input) => {
    const result = validateNamingConventions(input);
    fileResults.set(input.filePath, result);
  });

  // Display results
  console.log(formatResultsWithFiles(fileResults));

  // Exit with error code if there are violations
  if (batchResult.violations.length > 0) {
    console.log('\n❌ Validation completed with violations.');
    process.exit(1);
  } else {
    console.log('\n✅ All files pass naming convention validation!');
    process.exit(0);
  }
}

// Run the script
main();
