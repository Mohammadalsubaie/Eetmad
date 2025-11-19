#!/bin/bash

echo "🔍 Checking imports..."

# Check for missing imports
echo "\n📦 Checking for missing exports in API files..."
grep -r "export.*from.*@/lib/api" src --include="*.ts" --include="*.tsx" | head -20

echo "\n📦 Checking for missing exports in types..."
grep -r "export.*from.*@/lib/types" src --include="*.ts" --include="*.tsx" | head -20

echo "\n✅ Import check complete!"
