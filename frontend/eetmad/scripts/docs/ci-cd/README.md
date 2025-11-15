# 🚀 CI/CD Setup Guide

**Complete guide for automated code quality checks**

---

## 📋 Overview

We have two levels of automation:

### 1. **Local Checks** (Git Hooks)
- Run on your machine before commit/push
- Fast feedback
- Catches issues early

### 2. **CI/CD Pipeline** (GitHub Actions)
- Runs on pull requests to `develop`
- Comprehensive checks
- Final validation before merge

---

## 🎯 Quick Setup

### Install Git Hooks

```bash
# One command setup
cd frontend/eetmad
chmod +x scripts/setup-hooks.sh
./scripts/setup-hooks.sh
```

This installs:
- ✅ Pre-commit hook (validates staged files)
- ✅ Pre-push hook (full validation)

---

## 🔧 Git Hooks (Local)

### Pre-Commit Hook

**When it runs:** Before every `git commit`

**What it checks:**
- Design rules on staged files
- Fast (only changed files)

**Example output:**
```
🔍 Running pre-commit checks...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Validating Staged Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files to check:
  - src/components/MyComponent.tsx

🔍 Validating design rules...

✅ All staged files pass design rules validation!
```

---

### Pre-Push Hook

**When it runs:** Before every `git push`

**What it checks:**
1. TypeScript compilation
2. ESLint
3. Prettier formatting
4. Design rules (changed files)
5. Type validation
6. Tests

**Time:** ~30 seconds

**Example output:**
```
🚀 Running pre-push checks...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Running Pre-Push Validation Checks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 [1/6] Checking TypeScript...
✅ TypeScript check passed

🔍 [2/6] Running ESLint...
✅ ESLint check passed

🔍 [3/6] Checking code formatting...
✅ Format check passed

🔍 [4/6] Validating design rules...
✅ Design rules validation passed

🔍 [5/6] Validating types...
✅ Type validation passed

🧪 [6/6] Running tests...
✅ Tests passed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All pre-push checks passed! Pushing code...
```

---

### Skip Hooks (Not Recommended)

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**⚠️ Warning:** Only skip in emergencies! Skipped checks will fail in CI/CD.

---

## 🌐 CI/CD Pipeline (GitHub Actions)

### When It Runs

- **Pull Requests** to `develop` branch
- **Direct pushes** to `develop` branch

### Pipeline Jobs

#### 1. **Code Quality & Validation** ✅

```yaml
Steps:
  - TypeScript check
  - ESLint check
  - Prettier check
  - Design rules validation (all files)
  - Type validation
  - Naming convention check
  - Generate validation report
```

**Time:** ~2-3 minutes

---

#### 2. **Testing** 🧪

```yaml
Steps:
  - Run all tests
  - Generate coverage report
  - Upload coverage artifacts
```

**Time:** ~1-2 minutes

---

#### 3. **Build Check** 🏗️

```yaml
Steps:
  - Build production bundle
  - Check build size
  - Verify no build errors
```

**Time:** ~3-4 minutes

---

#### 4. **Security Audit** 🔒

```yaml
Steps:
  - npm audit
  - Check circular dependencies
```

**Time:** ~1 minute

---

#### 5. **Changed Files Validation** 📝

```yaml
Only on PRs:
  - Get changed files
  - Validate only changed files
  - Faster feedback
```

**Time:** ~1 minute

---

#### 6. **Summary Report** 📊

```yaml
Final step:
  - Aggregate all results
  - Generate summary
  - Mark PR as ready or needs fixes
```

---

### Viewing Results

**On GitHub:**
1. Go to your Pull Request
2. Scroll to "Checks" section
3. Click on "Develop Branch CI/CD"
4. View detailed results

**Example:**
```
✅ Code Quality & Validation  - Passed
✅ Testing                    - Passed
✅ Build Check                - Passed
✅ Security Audit             - Passed
✅ Changed Files Validation   - Passed
✅ Summary Report             - All checks passed
```

---

## 📊 What Gets Checked

### Complete Checklist

| Check | Pre-Commit | Pre-Push | CI/CD |
|-------|------------|----------|-------|
| Design Rules | ✅ (staged) | ✅ (changed) | ✅ (all) |
| TypeScript | ❌ | ✅ | ✅ |
| ESLint | ❌ | ✅ | ✅ |
| Prettier | ❌ | ✅ | ✅ |
| Type Validation | ❌ | ✅ | ✅ |
| Naming Convention | ❌ | ❌ | ✅ |
| Tests | ❌ | ✅ | ✅ |
| Build | ❌ | ❌ | ✅ |
| Security Audit | ❌ | ❌ | ✅ |

---

## 🔧 Configuration Files

### GitHub Actions Workflow

**Location:** `.github/workflows/develop-checks.yml`

```yaml
name: Develop Branch CI/CD
on:
  pull_request:
    branches: [develop]
  push:
    branches: [develop]
```

---

### Pre-Commit Hook

**Location:** `.husky/pre-commit`

**Customization:**
```bash
# Edit the file to add/remove checks
vim .husky/pre-commit

# Example: Add a custom check
echo "Running custom check..."
npm run your-custom-script
```

---

### Pre-Push Hook

**Location:** `.husky/pre-push`

**Customization:**
```bash
# Edit the file to add/remove checks
vim .husky/pre-push

# Example: Skip a specific check
# Comment out the check you don't want
```

---

## 🐛 Troubleshooting

### Hooks Not Running

**Problem:** Git hooks don't execute

**Solution:**
```bash
# Reinstall hooks
./scripts/setup-hooks.sh

# Check if hooks are executable
ls -la .husky/

# Make them executable if needed
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

---

### Hooks Failing

**Problem:** Pre-push hook fails

**Debug:**
```bash
# Run checks manually to see details
cd frontend/eetmad

npm run type-check
npm run lint:check
npm run format:check
npm run validate:design src/
npm run validate-types
npm run test
```

**Quick fixes:**
```bash
# Format code
npm run format

# Fix linting issues
npm run lint -- --fix

# See common fixes
cat scripts/quick-reference/common-fixes.md
```

---

### CI/CD Pipeline Failing

**Problem:** GitHub Actions failing

**Steps:**
1. Check the error logs on GitHub
2. Run the same checks locally:
   ```bash
   npm run check:health
   ```
3. Fix issues locally
4. Push again

---

### Slow Pre-Push Hook

**Problem:** Pre-push takes too long

**Solutions:**
```bash
# Option 1: Comment out tests in .husky/pre-push
# (Not recommended for develop branch)

# Option 2: Run tests in watch mode during development
npm run test:watch

# Option 3: Skip occasionally (emergency only)
git push --no-verify
```

---

## 💡 Best Practices

### Daily Workflow

```bash
# 1. Start development
git checkout -b feature/my-feature

# 2. Make changes
# ... code ...

# 3. Validate before commit
npm run validate:design src/components/MyComponent.tsx

# 4. Fix issues

# 5. Commit (pre-commit hook runs)
git commit -m "feat: add MyComponent"

# 6. Push (pre-push hook runs)
git push origin feature/my-feature

# 7. Create PR to develop (CI/CD runs)
```

---

### Before Creating PR

```bash
# Run full local check
npm run check:health

# If all passes, create PR
# CI/CD will run automatically
```

---

### Fixing Failed Checks

```bash
# 1. See what failed
# Check GitHub Actions logs or local output

# 2. Get help
npm run scripts:menu  # Interactive help
cat scripts/quick-reference/common-fixes.md

# 3. Fix issues
# ... make fixes ...

# 4. Re-validate
npm run validate:design <file>

# 5. Commit and push again
git add .
git commit -m "fix: resolve validation errors"
git push
```

---

## 📚 Additional Resources

### Quick References
- [Common Fixes](../../quick-reference/common-fixes.md)
- [Design Rules](../../quick-reference/design-rules.md)
- [cssVars Reference](../../quick-reference/css-vars.md)

### Workflows
- [Before Commit](../workflows/README.md#before-committing)
- [Code Review](../workflows/README.md#code-review-workflows)
- [Debugging Errors](../workflows/README.md#debugging-workflows)

### Examples
- [CI/CD Config Examples](./ci-integration-example.yml)
- [Correct Component](../../examples/test-component-correct.tsx)

---

## 🎯 Summary

### Setup (One Time)
```bash
./scripts/setup-hooks.sh
```

### Daily Use
- Commit → Pre-commit hook validates
- Push → Pre-push hook validates
- PR → CI/CD validates

### Benefits
- ✅ Catch errors early
- ✅ Consistent code quality
- ✅ Automated checks
- ✅ No bad code in develop
- ✅ Faster reviews

---

## 📞 Support

**Issues?**
- Check logs carefully
- Run checks manually
- Use interactive menu: `npm run scripts:menu`
- Ask in #dev-help channel

**Want to customize?**
- Edit `.husky/pre-commit` or `.husky/pre-push`
- Modify `.github/workflows/develop-checks.yml`
- Update and test carefully

---

**🎉 Your code quality is now automated!**

*Last Updated: November 15, 2025*

