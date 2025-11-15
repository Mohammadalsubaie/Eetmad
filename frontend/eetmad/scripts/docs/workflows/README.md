# 🔧 Common Workflows

**Step-by-step guides for common development scenarios**

---

## 📝 Daily Development Workflows

### Before Starting Work

```bash
# 1. Pull latest changes
git pull origin main

# 2. Create feature branch
git checkout -b feature/your-feature-name

# 3. Install any new dependencies
npm install

# 4. Start dev server
npm run dev
```

---

### While Developing

#### Creating a New Component

See [New Component Workflow](./new-component.md) for detailed guide.

**Quick version:**

```bash
# 1. Create component file
# 2. Follow the template structure
# 3. Validate immediately
npm run validate:design src/components/YourComponent.tsx

# 4. Fix any issues
# 5. Test in browser
```

---

#### Before Committing

```bash
# 1. Check what changed
git status
git diff

# 2. Validate changed files
npm run validate:design $(git diff --name-only | grep -E '\.(tsx|ts)$')

# 3. Fix any validation errors

# 4. Run linter
npm run lint

# 5. Stage files
git add .

# 6. Validate staged files
npm run validate:design $(git diff --name-only --cached | grep -E '\.(tsx|ts)$')

# 7. Commit
git commit -m "feat: your feature description"
```

---

#### Before Push

```bash
# 1. Run full validation suite
npm run check:health

# This includes:
# - TypeScript checking
# - Linting
# - Design rules validation
# - Tests

# 2. If all passes, push
git push origin your-branch-name
```

---

## 🐛 Debugging Workflows

### Fixing Validation Errors

```bash
# 1. Run validation to see errors
npm run validate:design path/to/file.tsx

# 2. Read error messages carefully
# Look for: file path, line number, error type

# 3. Check quick reference
cat scripts/quick-reference/common-fixes.md

# 4. Check examples
cat scripts/examples/test-component-correct.tsx

# 5. Fix the issues

# 6. Re-validate
npm run validate:design path/to/file.tsx

# 7. Repeat until clean
```

---

### Common Error Patterns

#### "Hardcoded color found"

```bash
# Quick fix workflow:
1. Find the line with hardcoded color
2. Import cssVars
3. Replace color with appropriate cssVar
4. Check: scripts/quick-reference/css-vars.md for right variable
5. Re-validate
```

#### "Hardcoded text found"

```bash
# Quick fix workflow:
1. Find the hardcoded text
2. Import useTranslations
3. Add translation key to messages/ar.json and messages/en.json
4. Replace text with t('key')
5. Re-validate
```

---

## 🔄 Refactoring Workflows

### Large Component Refactoring

```bash
# 1. Create backup branch
git checkout -b backup/component-name

# 2. Go back to working branch
git checkout feature/your-feature

# 3. Validate before refactoring
npm run validate:design src/components/Component.tsx > before.txt

# 4. Do refactoring

# 5. Validate after refactoring
npm run validate:design src/components/Component.tsx > after.txt

# 6. Compare results
diff before.txt after.txt

# 7. Test functionality

# 8. Commit
git commit -m "refactor: improve Component structure"
```

---

### Fixing Multiple Files

```bash
# 1. Find all files with issues
npm run validate:design src/components/ --json report.json

# 2. Review report.json to see all issues

# 3. Fix by category
# Example: Fix all hardcoded colors first

# 4. Validate again
npm run validate:design src/components/

# 5. Continue until clean
```

---

## 📦 Feature Development Workflow

### Complete Feature (Example: User Profile)

```bash
# Day 1: Setup
git checkout -b feature/user-profile
mkdir -p src/components/features/profile

# Day 1-2: Build components
# Create ProfileCard.tsx
npm run validate:design src/components/features/profile/ProfileCard.tsx

# Create ProfileHeader.tsx
npm run validate:design src/components/features/profile/ProfileHeader.tsx

# Day 2: Integration
# Build main Profile page
npm run validate:design src/app/[locale]/profile/page.tsx

# Day 3: Testing & Refinement
npm run check:health
npm run test

# Day 3: Review & Commit
git add .
npm run validate:design $(git diff --cached --name-only | grep -E '\.(tsx|ts)$')
git commit -m "feat: add user profile feature"

# Day 4: Create PR
git push origin feature/user-profile
# Create PR on GitHub/GitLab
```

---

## 🚢 Release Workflows

### Pre-deployment Checklist

```bash
# 1. Full validation
npm run validate:design src/

# 2. Type check
npm run type-check

# 3. Lint
npm run lint

# 4. Test
npm run test

# 5. Build
npm run build

# 6. Test build locally
npm run start

# 7. Check for console errors
# Open browser DevTools

# 8. Manual smoke test
# - Navigate major pages
# - Test key features
# - Check both AR/EN
# - Test mobile view

# 9. If all good, deploy
npm run deploy
```

---

## 👥 Code Review Workflows

### For Authors (Before Requesting Review)

```bash
# 1. Self-review checklist
- [ ] All files validated
- [ ] No console.log statements
- [ ] No commented code
- [ ] Translations added
- [ ] Mobile responsive
- [ ] AR/EN both work

# 2. Generate validation report
npm run validate:design $(git diff origin/main...HEAD --name-only) --json review-report.json

# 3. Take screenshots
# - Before/after if UI change
# - Mobile and desktop
# - AR and EN

# 4. Write good PR description
# - What changed
# - Why changed
# - How to test
# - Screenshots

# 5. Request review
```

---

### For Reviewers

```bash
# 1. Checkout PR branch
git fetch
git checkout feature/branch-name

# 2. Install dependencies
npm install

# 3. Run validation
npm run validate:design $(git diff origin/main...HEAD --name-only)

# 4. Review validation report

# 5. Start dev server
npm run dev

# 6. Test functionality
# - Check all changed pages
# - Test user interactions
# - Check AR/EN
# - Check mobile

# 7. Review code
# - Read the changes
# - Check for best practices
# - Look for security issues
# - Check performance

# 8. Leave feedback or approve
```

---

## 🆘 Emergency Workflows

### Hotfix Process

```bash
# 1. Create hotfix branch from main
git checkout main
git pull
git checkout -b hotfix/critical-issue

# 2. Make minimal fix

# 3. Quick validation
npm run validate:design path/to/changed/file.tsx

# 4. Quick test
npm run test -- --related

# 5. Commit
git commit -m "fix: critical issue description"

# 6. Fast-track review
git push origin hotfix/critical-issue

# 7. Merge & deploy immediately
```

---

### Rollback Process

```bash
# If you need to revert a deployment

# 1. Identify the last good commit
git log --oneline

# 2. Create revert branch
git checkout -b revert/bad-feature

# 3. Revert the commit
git revert <commit-hash>

# 4. Test
npm run check:health

# 5. Deploy
git push origin revert/bad-feature
# Then merge and deploy
```

---

## 🎓 Learning Workflows

### For New Team Members

**Week 1: Familiarization**

```bash
# Day 1: Setup
1. Clone repo
2. npm install
3. Read scripts/INDEX.md
4. Read scripts/quick-reference/design-rules.md

# Day 2-3: Study Examples
1. Read scripts/examples/test-component-correct.tsx
2. Study the patterns
3. Try modifying it
4. Run validation on your changes

# Day 4-5: First Component
1. Create a simple component
2. Validate it
3. Get feedback
4. Fix issues
5. Repeat
```

---

## 📊 Monitoring Workflows

### Weekly Quality Check

```bash
# Run on Friday afternoon

# 1. Full codebase validation
npm run validate:design src/ --json weekly-report.json

# 2. Analyze report
cat weekly-report.json | jq '.summary'

# 3. Identify trends
# - Which types of errors are most common?
# - Which files/folders need attention?
# - Is quality improving?

# 4. Share with team
# - Email report
# - Discuss in standup
# - Plan improvements
```

---

## 🔗 Related

- [New Component Workflow](./new-component.md)
- [Review Process](./review-process.md)
- [Quick Reference Cards](../../quick-reference/)
- [Main INDEX](../../INDEX.md)

---

**💡 Tip:** Bookmark the workflows you use most!

_Last Updated: November 15, 2025_
