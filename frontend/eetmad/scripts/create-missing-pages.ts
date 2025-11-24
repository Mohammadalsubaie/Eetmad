#!/usr/bin/env ts-node

/**
 * Script to create placeholder page.tsx files for missing routes
 */

import * as fs from 'fs';
import * as path from 'path';

const PLACEHOLDER_TEMPLATE = `'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function PLACEHOLDER_PAGE_NAME() {
  const t = useTranslations('pages.PLACEHOLDER_KEY');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: 'PLACEHOLDER_TITLE' }]} className="mb-6" />

      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          PLACEHOLDER_TITLE
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

interface RouteInfo {
  path: string;
  group: string;
  isDynamic: boolean;
  params?: string[];
}

// Routes that should exist but might be missing
const ROUTES_TO_CHECK: RouteInfo[] = [
  // Supplier routes
  { path: 'supplier-projects', group: 'supplier', isDynamic: false },
  
  // Add more routes as needed
];

function createPlaceholderPage(routePath: string, routeInfo: RouteInfo) {
  const basePath = path.join(
    __dirname,
    '../../src/app/[locale]',
    routeInfo.group === 'supplier' ? '(supplier)' : 
    routeInfo.group === 'admin' ? '(admin)/admin' :
    routeInfo.group === 'client' ? '(client)' :
    routeInfo.group === 'auth' ? '(auth)' :
    routeInfo.group === 'public' ? '(public)' :
    routeInfo.group === 'main' ? '(main)' : '',
    routePath
  );

  const pagePath = path.join(basePath, 'page.tsx');
  
  // Check if page already exists
  if (fs.existsSync(pagePath)) {
    console.log(`✓ ${routePath} already exists`);
    return;
  }

  // Create directory if it doesn't exist
  fs.mkdirSync(basePath, { recursive: true });

  // Generate component name
  const componentName = routePath
    .split('/')
    .map(part => 
      part.replace(/\[|\]/g, '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
    )
    .join('') + 'Page';

  // Generate placeholder content
  const content = PLACEHOLDER_TEMPLATE
    .replace(/PLACEHOLDER_PAGE_NAME/g, componentName)
    .replace(/PLACEHOLDER_KEY/g, routePath.replace(/\//g, '.').replace(/\[.*?\]/g, ''))
    .replace(/PLACEHOLDER_TITLE/g, routePath.split('/').pop()?.replace(/-/g, ' ') || 'Page');

  // Write file
  fs.writeFileSync(pagePath, content);
  console.log(`✓ Created ${routePath}`);
}

// Main execution
console.log('Creating placeholder pages...\n');

ROUTES_TO_CHECK.forEach(route => {
  createPlaceholderPage(route.path, route);
});

console.log('\nDone!');

