#!/bin/bash

# Quick script to push CI/CD setup to GitHub
# Run this from project root: ./push-ci-cd.sh

set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Pushing CI/CD Setup to GitHub"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d ".github" ]; then
  echo "❌ Error: Not in project root directory"
  echo "Please run from: /Users/hamad/Projects/fisal"
  exit 1
fi

echo "${BLUE}📋 Step 1: Checking files...${NC}"
echo ""

# Check critical files exist
FILES=(
  ".github/workflows/develop-checks.yml"
  ".github/BRANCH_PROTECTION_SETUP.md"
  ".github/pull_request_template.md"
  ".husky/pre-commit"
  ".husky/pre-push"
  "CI_CD_SUMMARY.md"
  "QUICK_SETUP.md"
  "PUSH_TO_GITHUB.md"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (missing)"
  fi
done

echo ""
echo "${BLUE}📋 Step 2: Git status${NC}"
echo ""
git status --short

echo ""
echo "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
read -p "Do you want to continue? (y/N) " -n 1 -r
echo ""
echo "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "${BLUE}📦 Step 3: Adding files...${NC}"
echo ""

# Add all CI/CD related files
git add .github/
git add .husky/
git add frontend/eetmad/scripts/
git add CI_CD_SUMMARY.md
git add QUICK_SETUP.md
git add PUSH_TO_GITHUB.md
git add push-ci-cd.sh

echo "${GREEN}✓ Files staged${NC}"

echo ""
echo "${BLUE}💬 Step 4: Committing...${NC}"
echo ""

git commit -m "ci: add comprehensive CI/CD and validation setup

Features:
- GitHub Actions workflow for develop branch validation
- Pre-commit hook for design rules validation
- Pre-push hook for complete validation suite
- Complete documentation and setup guides
- Branch protection setup instructions
- Pull request template for consistency

Quality Gates:
- Local: Pre-commit validates staged files (< 10s)
- Local: Pre-push runs full checks (~30s)
- GitHub: CI/CD validates before merge (5-8 min)

This ensures code quality at every step of the development workflow."

echo "${GREEN}✓ Committed${NC}"

echo ""
echo "${BLUE}🚀 Step 5: Pushing to GitHub...${NC}"
echo ""

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: ${CURRENT_BRANCH}"

# Push
git push origin $CURRENT_BRANCH

echo ""
echo "${GREEN}✓ Pushed to GitHub!${NC}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}🎉 CI/CD Setup Pushed Successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1. ${BLUE}Verify on GitHub:${NC}"
echo "   - Go to your repository on GitHub"
echo "   - Check Actions tab for the workflow"
echo ""
echo "2. ${BLUE}Create develop branch (if not exists):${NC}"
echo "   ${BLUE}git checkout -b develop${NC}"
echo "   ${BLUE}git push origin develop${NC}"
echo ""
echo "3. ${BLUE}Set up branch protection:${NC}"
echo "   - Follow guide: .github/BRANCH_PROTECTION_SETUP.md"
echo "   - Settings → Branches → Add rule for 'develop'"
echo ""
echo "4. ${BLUE}Test with a PR:${NC}"
echo "   - Create a test branch"
echo "   - Make a small change"
echo "   - Push and create PR to develop"
echo "   - Watch CI/CD run automatically"
echo ""
echo "${GREEN}Documentation:${NC}"
echo "  • Setup guide: ${BLUE}.github/BRANCH_PROTECTION_SETUP.md${NC}"
echo "  • Complete docs: ${BLUE}CI_CD_SUMMARY.md${NC}"
echo "  • Quick start: ${BLUE}QUICK_SETUP.md${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

