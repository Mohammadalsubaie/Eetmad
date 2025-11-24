#!/usr/bin/env node

/**
 * Script to create placeholder pages for all routes in routes.json that don't have page files
 */

const fs = require('fs');
const path = require('path');

const { createPlaceholder } = require('./create-page-placeholder');

// Read routes.json
const routesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'reports/2025-11-23/routes.json'), 'utf8')
);

console.log('Analyzing routes and creating missing placeholders...\n');

let created = 0;
let skipped = 0;
let errors = 0;

// Process all routes
routesData.allRoutes.forEach((route) => {
  // Skip external links
  if (route.type === 'external' || route.path.startsWith('http')) {
    return;
  }

  // Skip root route
  if (route.path === '/') {
    return;
  }

  // Get route path without leading slash
  let routePath = route.path.replace(/^\//, '');

  // For dynamic routes, we still want to create the page.tsx
  // But we'll use the base path for checking
  let checkPath = routePath;
  if (checkPath.includes('[')) {
    // For dynamic routes, check if the directory exists
    checkPath = checkPath.split('[')[0].replace(/\/$/, '');
  }

  // Skip if no path
  if (!checkPath) return;

  // Determine group and full path
  // Note: profile routes are in (client) not (main) based on actual file structure
  let group = route.group || 'client';
  if (group === 'main' && checkPath.startsWith('profile')) {
    group = 'client'; // Profile routes are in (client) folder
  }
  
  let fullPath = path.join(__dirname, '../src/app/[locale]');

  // Remove 'admin' prefix if route path already starts with 'admin/'
  let routePathForCheck = checkPath;
  if (group === 'admin' && checkPath.startsWith('admin/')) {
    routePathForCheck = checkPath.replace(/^admin\//, '');
  }

  if (group === 'supplier') {
    fullPath = path.join(fullPath, '(supplier)', routePathForCheck);
  } else if (group === 'admin') {
    fullPath = path.join(fullPath, '(admin)/admin', routePathForCheck);
  } else if (group === 'client') {
    fullPath = path.join(fullPath, '(client)', routePathForCheck);
  } else if (group === 'auth') {
    fullPath = path.join(fullPath, '(auth)', routePathForCheck);
  } else if (group === 'public') {
    fullPath = path.join(fullPath, '(public)', routePathForCheck);
  } else if (group === 'main') {
    fullPath = path.join(fullPath, '(main)', routePathForCheck);
  } else {
    fullPath = path.join(fullPath, '(client)', routePathForCheck);
  }

  const pageFile = path.join(fullPath, 'page.tsx');

  // Only create if it doesn't exist
  if (!fs.existsSync(pageFile)) {
    try {
      // Use routePathForCheck for creating placeholder
      if (createPlaceholder(routePathForCheck, group)) {
        created++;
      } else {
        skipped++;
      }
    } catch (error) {
      console.error(`Error creating ${checkPath}:`, error.message);
      errors++;
    }
  }
});

console.log(`\n✓ Created: ${created} placeholder pages`);
console.log(`⚠️  Skipped: ${skipped} (already exist or errors)`);
if (errors > 0) {
  console.log(`❌ Errors: ${errors}`);
}

