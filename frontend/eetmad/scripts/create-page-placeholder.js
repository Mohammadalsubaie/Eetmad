#!/usr/bin/env node

/**
 * Utility to create placeholder page.tsx files for missing routes
 * Usage: node create-page-placeholder.js <route-path> <group>
 * Example: node create-page-placeholder.js supplier-projects supplier
 */

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
    .split(/[\/\-_\[\]]/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toTitle(str) {
  const lastPart = str.split('/').pop() || str;
  return lastPart
    .replace(/\[.*?\]/g, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toTranslationKey(str) {
  return str
    .replace(/\//g, '.')
    .replace(/\[.*?\]/g, '')
    .toLowerCase();
}

function createPlaceholder(routePath, group = 'client') {
  const baseDir = path.join(__dirname, '../src/app/[locale]');
  let fullPath = '';
  
  const groupMap = {
    supplier: '(supplier)',
    admin: '(admin)/admin',
    client: '(client)',
    auth: '(auth)',
    public: '(public)',
    main: '(main)',
  };
  
  fullPath = path.join(baseDir, groupMap[group] || groupMap.client, routePath);
  const pageFile = path.join(fullPath, 'page.tsx');
  
  if (fs.existsSync(pageFile)) {
    console.log(`⚠️  ${routePath} already exists at ${pageFile}`);
    return false;
  }
  
  // Create directory
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Generate content
  const componentName = toPascalCase(routePath) + 'Page';
  const title = toTitle(routePath);
  const translationKey = toTranslationKey(routePath);
  
  const content = PLACEHOLDER_TEMPLATE
    .replace(/{COMPONENT_NAME}/g, componentName)
    .replace(/{TRANSLATION_KEY}/g, translationKey)
    .replace(/{TITLE}/g, title);
  
  fs.writeFileSync(pageFile, content);
  console.log(`✓ Created ${routePath} at ${pageFile}`);
  return true;
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node create-page-placeholder.js <route-path> [group]');
    console.log('Example: node create-page-placeholder.js supplier-projects supplier');
    process.exit(1);
  }
  
  const routePath = args[0];
  const group = args[1] || 'client';
  
  createPlaceholder(routePath, group);
}

module.exports = { createPlaceholder };

