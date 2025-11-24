const fs = require('fs');
const path = require('path');

const PLACEHOLDER_TEMPLATE = `'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function {COMPONENT_NAME}() {
  const t = useTranslations('pages.{TRANSLATION_KEY}');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: '{TITLE}' }]} className="mb-6" />

      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {TITLE}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          This page is under construction.
        </p>
      </div>

      {/* TODO: Implement page content */}
    </div>
  );
}
`;

function toPascalCase(str) {
  return str
    .split(/[\/\-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).replace(/\[|\]/g, ''))
    .join('');
}

function toTitle(str) {
  return str
    .split(/[\/\-_]/)
    .pop()
    .replace(/\[.*?\]/g, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function createPlaceholder(routePath, group) {
  const baseDir = path.join(__dirname, '../src/app/[locale]');
  let fullPath = '';
  
  switch(group) {
    case 'supplier':
      fullPath = path.join(baseDir, '(supplier)', routePath);
      break;
    case 'admin':
      fullPath = path.join(baseDir, '(admin)/admin', routePath);
      break;
    case 'client':
      fullPath = path.join(baseDir, '(client)', routePath);
      break;
    case 'auth':
      fullPath = path.join(baseDir, '(auth)', routePath);
      break;
    case 'public':
      fullPath = path.join(baseDir, '(public)', routePath);
      break;
    case 'main':
      fullPath = path.join(baseDir, '(main)', routePath);
      break;
    default:
      fullPath = path.join(baseDir, '(client)', routePath);
  }
  
  const pageFile = path.join(fullPath, 'page.tsx');
  
  // Check if already exists
  if (fs.existsSync(pageFile)) {
    console.log(`✓ ${routePath} already exists`);
    return;
  }
  
  // Create directory
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Generate content
  const componentName = toPascalCase(routePath) + 'Page';
  const title = toTitle(routePath);
  const translationKey = routePath.replace(/\//g, '.').replace(/\[.*?\]/g, '');
  
  const content = PLACEHOLDER_TEMPLATE
    .replace(/{COMPONENT_NAME}/g, componentName)
    .replace(/{TRANSLATION_KEY}/g, translationKey)
    .replace(/{TITLE}/g, title);
  
  fs.writeFileSync(pageFile, content);
  console.log(`✓ Created ${routePath}`);
}

// Routes that might be missing - add more as needed
const routesToCreate = [
  // Add routes here if needed
];

console.log('Creating placeholder pages...\n');
routesToCreate.forEach(([path, group]) => createPlaceholder(path, group));
console.log('\nDone!');

