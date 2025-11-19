#!/bin/bash

# Setup Git Hooks for Pre-commit and Pre-push Validation
# This script installs Husky and sets up automated checks

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Setting up Git Hooks for Fisal Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../../.." && pwd )"

echo "${BLUE}📍 Project root: $PROJECT_ROOT${NC}"
echo ""

# Check if we're in a git repository
if [ ! -d "$PROJECT_ROOT/.git" ]; then
  echo "${RED}❌ Error: Not a git repository${NC}"
  echo "Please run this script from within the Fisal project"
  exit 1
fi

# Step 1: Navigate to project root
cd "$PROJECT_ROOT" || exit 1

# Step 2: Check if husky is already installed
echo "🔍 Checking Husky installation..."
if [ -d ".husky" ]; then
  echo "${YELLOW}⚠️  Husky is already installed${NC}"
  read -p "Do you want to reinstall? (y/N) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "${BLUE}ℹ️  Keeping existing installation${NC}"
  else
    echo "🗑️  Removing existing .husky directory..."
    rm -rf .husky
  fi
fi

# Step 3: Install husky in frontend/eetmad
echo ""
echo "📦 Installing Husky..."
cd frontend/eetmad

if npm list husky &> /dev/null; then
  echo "${GREEN}✅ Husky is already in package.json${NC}"
else
  echo "➕ Adding Husky to package.json..."
  npm install --save-dev husky
fi

# Step 4: Initialize husky
echo ""
echo "🔧 Initializing Husky..."
cd "$PROJECT_ROOT"
npx husky install

# Step 5: Make hook files executable
echo ""
echo "🔧 Making hook files executable..."
if [ -f ".husky/pre-commit" ]; then
  chmod +x .husky/pre-commit
  echo "${GREEN}✅ pre-commit hook is executable${NC}"
fi

if [ -f ".husky/pre-push" ]; then
  chmod +x .husky/pre-push
  echo "${GREEN}✅ pre-push hook is executable${NC}"
fi

# Step 6: Verify installation
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Git Hooks Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${GREEN}Installed hooks:${NC}"
echo ""

if [ -f ".husky/pre-commit" ]; then
  echo "  ✅ pre-commit  - Validates staged files before commit"
else
  echo "  ❌ pre-commit  - Not found"
fi

if [ -f ".husky/pre-push" ]; then
  echo "  ✅ pre-push    - Runs full validation before push"
else
  echo "  ❌ pre-push    - Not found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 What happens now:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🔸 ${YELLOW}Before commit:${NC}"
echo "     - Validates staged .ts/.tsx files"
echo "     - Checks design rules"
echo "     - Fast (only checks changed files)"
echo ""
echo "  🔸 ${YELLOW}Before push:${NC}"
echo "     - TypeScript check"
echo "     - ESLint"
echo "     - Prettier"
echo "     - Design rules validation"
echo "     - Type validation"
echo "     - Tests"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💡 Pro Tips:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  • Test hooks:           Make a commit or push to see them in action"
echo "  • Skip if needed:       git commit --no-verify"
echo "  • View hooks:           cat .husky/pre-commit"
echo "  • Quick help:           npm run scripts:menu"
echo "  • Fix common errors:    cat scripts/quick-reference/common-fixes.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${GREEN}🎉 You're all set! Happy coding!${NC}"
echo ""

