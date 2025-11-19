#!/usr/bin/env tsx

/**
 * Monitor Next.js dev server output for translation/language errors
 * This script watches the terminal output and highlights translation issues
 */

import { spawn } from 'child_process';
import * as readline from 'readline';

interface TranslationError {
  type: 'missing_key' | 'invalid_namespace' | 'structure_error' | 'other';
  message: string;
  namespace?: string;
  key?: string;
  file?: string;
  line?: number;
  timestamp: Date;
}

const errors: TranslationError[] = [];

// Patterns to detect translation errors
const errorPatterns = [
  // Next-intl missing key errors
  {
    pattern: /Missing translation key: "([^"]+)" in namespace "([^"]+)"/i,
    type: 'missing_key' as const,
    extract: (match: RegExpMatchArray) => ({
      key: match[1],
      namespace: match[2],
    }),
  },
  {
    pattern: /Translation key "([^"]+)" not found/i,
    type: 'missing_key' as const,
    extract: (match: RegExpMatchArray) => ({
      key: match[1],
    }),
  },
  // Console errors about translations
  {
    pattern: /\[next-intl\].*?Missing.*?translation/i,
    type: 'missing_key' as const,
    extract: () => ({}),
  },
  // JSON parse errors in translation files
  {
    pattern: /(en\.json|ar\.json).*?parse.*?error/i,
    type: 'structure_error' as const,
    extract: (match: RegExpMatchArray) => ({
      file: match[1],
    }),
  },
  // Namespace errors
  {
    pattern: /namespace.*?not.*?found/i,
    type: 'invalid_namespace' as const,
    extract: () => ({}),
  },
];

function detectError(line: string): TranslationError | null {
  for (const { pattern, type, extract } of errorPatterns) {
    const match = line.match(pattern);
    if (match) {
      const extracted = extract(match);
      return {
        type,
        message: line.trim(),
        ...extracted,
        timestamp: new Date(),
      };
    }
  }
  return null;
}

function formatError(error: TranslationError): string {
  const time = error.timestamp.toLocaleTimeString();
  let output = `\n⚠️  [${time}] Translation Error (${error.type}):\n`;
  output += `   ${error.message}\n`;

  if (error.namespace) {
    output += `   Namespace: ${error.namespace}\n`;
  }
  if (error.key) {
    output += `   Key: ${error.key}\n`;
  }
  if (error.file) {
    output += `   File: ${error.file}\n`;
  }

  return output;
}

function main() {
  console.log('🔍 Translation Error Monitor');
  console.log('============================\n');
  console.log('Watching for translation errors in Next.js output...\n');
  console.log('Press Ctrl+C to stop\n');

  // Check if Next.js is running
  const nextProcess = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  // Monitor stdout
  const stdout = readline.createInterface({
    input: nextProcess.stdout!,
    crlfDelay: Infinity,
  });

  stdout.on('line', (line: string) => {
    const error = detectError(line);
    if (error) {
      errors.push(error);
      console.log(formatError(error));

      // Show summary every 10 errors
      if (errors.length % 10 === 0) {
        console.log(`\n📊 Summary: ${errors.length} translation errors detected so far\n`);
      }
    } else {
      // Show normal output (optional, comment out if too verbose)
      // process.stdout.write(line + '\n');
    }
  });

  // Monitor stderr
  const stderr = readline.createInterface({
    input: nextProcess.stderr!,
    crlfDelay: Infinity,
  });

  stderr.on('line', (line: string) => {
    const error = detectError(line);
    if (error) {
      errors.push(error);
      console.log(formatError(error));
    } else {
      // Show error output
      process.stderr.write(line + '\n');
    }
  });

  // Handle process exit
  nextProcess.on('exit', (code) => {
    console.log(`\n\n📊 Final Summary:`);
    console.log(`   Total translation errors: ${errors.length}`);

    if (errors.length > 0) {
      const byType = errors.reduce(
        (acc, err) => {
          acc[err.type] = (acc[err.type] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      console.log('\n   Errors by type:');
      Object.entries(byType).forEach(([type, count]) => {
        console.log(`     ${type}: ${count}`);
      });

      console.log('\n   Most common issues:');
      const namespaces = errors
        .filter((e) => e.namespace)
        .reduce(
          (acc, e) => {
            acc[e.namespace!] = (acc[e.namespace!] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );

      Object.entries(namespaces)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .forEach(([ns, count]) => {
          console.log(`     ${ns}: ${count} errors`);
        });
    }

    process.exit(code || 0);
  });

  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping monitor...');
    nextProcess.kill();
    process.exit(0);
  });
}

main();
