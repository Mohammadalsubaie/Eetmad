#!/usr/bin/env node

/**
 * Batch create placeholder pages for routes that should exist
 * This script creates placeholders for common routes that might be missing
 */

const { createPlaceholder } = require('./create-page-placeholder');

// List of routes to create placeholders for
// Format: [routePath, group, description]
const routesToCreate = [
  // Add routes here that you want to create placeholders for
  // Example: ['supplier-projects', 'supplier', 'Supplier projects list page'],
];

console.log('Creating placeholder pages...\n');

let created = 0;
let skipped = 0;

routesToCreate.forEach(([routePath, group, description]) => {
  console.log(`Creating ${routePath} (${group})...`);
  if (createPlaceholder(routePath, group)) {
    created++;
    if (description) {
      console.log(`  → ${description}`);
    }
  } else {
    skipped++;
  }
});

console.log(`\n✓ Created: ${created} placeholder pages`);
console.log(`⚠️  Skipped: ${skipped} (already exist)`);

if (routesToCreate.length === 0) {
  console.log('\nNo routes specified. Add routes to the routesToCreate array in the script.');
}

