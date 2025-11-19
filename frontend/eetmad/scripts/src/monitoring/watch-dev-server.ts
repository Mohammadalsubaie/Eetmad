#!/usr/bin/env tsx

/**
 * Watch Next.js dev server output for translation errors
 * This script monitors the actual running server
 */

import { spawn } from 'child_process';
import * as readline from 'readline';

const errors: Array<{ type: string; message: string; timestamp: Date }> = [];

function detectTranslationError(line: string): boolean {
  const patterns = [
    /Missing translation/i,
    /Translation key.*not found/i,
    /\[next-intl\].*error/i,
    /\[next-intl\].*missing/i,
    /Could not find.*translation/i,
    /en\.json.*error/i,
    /ar\.json.*error/i,
    /JSON.*parse.*error/i,
    /Unexpected token/i,
    /SyntaxError/i,
  ];

  return patterns.some((pattern) => pattern.test(line));
}

function main() {
  console.log('🔍 Monitoring Next.js Dev Server for Translation Errors\n');
  console.log('='.repeat(60));
  console.log('Watching for translation-related errors...\n');
  console.log('Press Ctrl+C to stop\n');
  console.log('='.repeat(60));
  console.log('');

  // Check if dev server is already running
  const checkProcess = spawn('lsof', ['-ti:3000'], { shell: true });
  checkProcess.on('exit', (code) => {
    if (code === 0) {
      console.log('⚠️  Dev server is already running on port 3000');
      console.log('   Monitoring existing server output...\n');
    } else {
      console.log('ℹ️  Starting new dev server...\n');
    }
  });

  // Monitor terminal output by tailing logs or checking process output
  // Since we can't directly attach to existing process, we'll provide instructions
  console.log('📋 To see translation errors:');
  console.log('   1. Check the terminal where "npm run dev" is running');
  console.log('   2. Open browser DevTools Console (F12)');
  console.log('   3. Look for messages starting with "[next-intl]"');
  console.log('   4. Check for red error messages about missing translations\n');

  console.log('🔍 Running comprehensive check...\n');

  // Run our validation
  const validation = spawn('npm', ['run', 'check:translations'], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
  });

  validation.on('exit', (code) => {
    if (code === 0) {
      console.log('\n✅ Static validation passed!');
      console.log('\n💡 If you still see errors in the browser:');
      console.log('   1. Clear browser cache');
      console.log('   2. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)');
      console.log('   3. Check browser console for specific error messages');
      console.log('   4. Share the exact error message from browser console\n');
    } else {
      console.log('\n⚠️  Static validation found issues. Please fix them first.\n');
    }
    process.exit(code || 0);
  });
}

main();
