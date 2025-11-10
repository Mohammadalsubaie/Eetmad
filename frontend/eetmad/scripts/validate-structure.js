#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');

const requiredDirs = [
  'src/app',
  'src/components',
  'src/lib/api',
  'src/lib/hooks',
  'src/lib/types',
  'src/lib/utils',
  'src/contexts',
  'public',
];

const requiredFiles = [
  'src/lib/api/client.ts',
  'src/lib/api/auth.ts',
  'src/lib/types/index.ts',
  'src/contexts/AuthContext.tsx',
  'src/lib/hooks/useAuth.ts',
  'package.json',
  'tsconfig.json',
  'next.config.ts',
  'tailwind.config.ts',
];

console.log('🔍 Validating project structure...\n');

let hasErrors = false;

// Check directories
console.log('📁 Checking directories...');
requiredDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`  ✅ ${dir}`);
  } else {
    console.log(`  ❌ ${dir} (missing)`);
    hasErrors = true;
  }
});

console.log('\n📄 Checking files...');
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (missing)`);
    hasErrors = true;
  }
});

console.log('\n' + (hasErrors ? '❌ Validation failed!' : '✅ All checks passed!'));
process.exit(hasErrors ? 1 : 0);
