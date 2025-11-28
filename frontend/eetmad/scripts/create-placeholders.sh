#!/bin/bash

# Script to create placeholder page.tsx files for missing routes

BASE_DIR="src/app/[locale]"
PLACEHOLDER_CONTENT=''\''use client'\'';

import { useTranslations, useLocale } from '\''next-intl'\'';
import { cssVars } from '\''@/styles/theme'\'';
import Breadcrumbs from '\''@/components/shared/navigation/Breadcrumbs'\'';

export default function PLACEHOLDER_PAGE_NAME() {
  const t = useTranslations('\''pages.PLACEHOLDER_KEY'\'');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: '\''PLACEHOLDER_TITLE'\'' }]} className="mb-6" />

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
'

create_placeholder() {
  local route_path=$1
  local group=$2
  local full_path=""
  
  case $group in
    supplier)
      full_path="$BASE_DIR/(supplier)/$route_path"
      ;;
    admin)
      full_path="$BASE_DIR/(admin)/admin/$route_path"
      ;;
    client)
      full_path="$BASE_DIR/(client)/$route_path"
      ;;
    auth)
      full_path="$BASE_DIR/(auth)/$route_path"
      ;;
    public)
      full_path="$BASE_DIR/(public)/$route_path"
      ;;
    main)
      full_path="$BASE_DIR/(main)/$route_path"
      ;;
  esac
  
  local page_file="$full_path/page.tsx"
  
  if [ -f "$page_file" ]; then
    echo "✓ $route_path already exists"
    return
  fi
  
  # Create directory
  mkdir -p "$full_path"
  
  # Generate component name
  local component_name=$(echo "$route_path" | sed 's/\// /g' | sed 's/\[//g' | sed 's/\]//g' | sed 's/-/ /g' | awk '\''{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1'\'' | sed 's/ //g')Page
  
  # Generate title
  local title=$(echo "$route_path" | sed 's/.*\///' | sed 's/-/ /g' | awk '\''{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1'\'')
  
  # Generate translation key
  local trans_key=$(echo "$route_path" | sed 's/\//./g' | sed 's/\[.*\]//g')
  
  # Create file
  echo "$PLACEHOLDER_CONTENT" | \
    sed "s/PLACEHOLDER_PAGE_NAME/$component_name/g" | \
    sed "s/PLACEHOLDER_KEY/$trans_key/g" | \
    sed "s/PLACEHOLDER_TITLE/$title/g" > "$page_file"
  
  echo "✓ Created $route_path"
}

echo "Creating placeholder pages..."
echo ""

# Create placeholders for known missing routes
# Add routes here as needed

echo "Done!"

