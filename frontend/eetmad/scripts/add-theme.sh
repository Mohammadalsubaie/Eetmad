#!/bin/bash

# Script to help add a new theme
# Usage: ./scripts/add-theme.sh <option_number>
# Example: ./scripts/add-theme.sh 16

if [ -z "$1" ]; then
  echo "Usage: ./scripts/add-theme.sh <option_number>"
  echo "Example: ./scripts/add-theme.sh 16"
  exit 1
fi

OPTION_NUM=$1
THEME_FILE="docs/design/themes/option${OPTION_NUM}.css"
PUBLIC_THEME="public/themes/option${OPTION_NUM}.css"

# Check if theme file exists
if [ ! -f "$THEME_FILE" ]; then
  echo "❌ Error: Theme file not found: $THEME_FILE"
  echo "Please create the theme file first in docs/design/themes/"
  exit 1
fi

echo "🎨 Adding theme option${OPTION_NUM}..."

# 1. Copy to public directory
echo "📋 Copying theme file to public directory..."
cp "$THEME_FILE" "$PUBLIC_THEME"
echo "✅ Copied to $PUBLIC_THEME"

# 2. Extract colors
echo ""
echo "🎨 Extracting color palette from theme..."
PRIMARY=$(grep -A 1 "^\s*--color-primary:" "$THEME_FILE" | head -1 | sed 's/.*: //; s/;.*//')
ACCENT=$(grep -A 1 "^\s*--color-accent:" "$THEME_FILE" | head -1 | sed 's/.*: //; s/;.*//')
BACKGROUND=$(grep -A 1 "^\s*--color-neutral-bg:" "$THEME_FILE" | head -1 | sed 's/.*: //; s/;.*//')
TEXT=$(grep -A 1 "^\s*--color-neutral-darker:" "$THEME_FILE" | head -1 | sed 's/.*: //; s/;.*//')

echo "Primary:   $PRIMARY"
echo "Accent:    $ACCENT"
echo "Background: $BACKGROUND"
echo "Text:      $TEXT"

# 3. Show what needs to be updated
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Update src/lib/utils/themeLoader.ts:"
echo "   Change the count in getAvailableThemes() to $OPTION_NUM"
echo ""
echo "2. Add to src/lib/utils/themeColors.ts:"
echo "   option${OPTION_NUM}: {"
echo "     primary: '$PRIMARY',"
echo "     accent: '$ACCENT',"
echo "     background: '$BACKGROUND',"
echo "     text: '$TEXT',"
echo "   },"
echo ""
echo "✅ Theme file copied successfully!"
echo "⚠️  Don't forget to update the code files mentioned above!"

