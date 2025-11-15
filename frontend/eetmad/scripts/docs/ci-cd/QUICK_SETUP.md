# ⚡ CI/CD Quick Setup (5 Minutes)

**Get automated code checks running in 5 minutes**

---

## 🚀 One-Command Setup

```bash
cd frontend/eetmad
chmod +x scripts/setup-hooks.sh
./scripts/setup-hooks.sh
```

**That's it!** You're done. 🎉

---

## ✅ What You Just Installed

### 1. Pre-Commit Hook
- Runs before every commit
- Validates staged files
- Fast (< 10 seconds)

### 2. Pre-Push Hook
- Runs before every push
- Full validation suite
- Takes ~30 seconds

### 3. GitHub Actions
- Already configured
- Runs on PRs to develop
- Comprehensive checks

---

## 🧪 Test Your Setup

### Test Pre-Commit Hook

```bash
# 1. Make a test change
echo "test" >> src/test.ts

# 2. Stage it
git add src/test.ts

# 3. Try to commit
git commit -m "test: commit hook"

# You should see validation running!
```

---

### Test Pre-Push Hook

```bash
# 1. Commit something
git commit -m "test: push hook"

# 2. Try to push
git push

# You should see all checks running!
```

---

## 📋 What Happens Now

### When You Commit
```
$ git commit -m "feat: add feature"

🔍 Running pre-commit checks...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Validating Staged Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files to check:
  - src/components/MyComponent.tsx

🔍 Validating design rules...
✅ All staged files pass design rules validation!
```

---

### When You Push
```
$ git push

🚀 Running pre-push checks...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Running Pre-Push Validation Checks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ All pre-push checks passed! Pushing code...
```

---

### When You Create PR to Develop

GitHub Actions automatically runs:
- ✅ Code Quality Checks
- ✅ Tests
- ✅ Build Check
- ✅ Security Audit
- ✅ Changed Files Validation

You'll see results in the PR!

---

## 💡 Pro Tips

### Skip Hooks (Emergency Only)

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

**⚠️ Not recommended!** These will fail in CI/CD anyway.

---

### Fix Issues Fast

```bash
# Interactive help
npm run scripts:menu

# Common fixes guide
cat scripts/quick-reference/common-fixes.md

# Validate specific file
npm run validate:design src/components/MyComponent.tsx
```

---

### Run Full Check Before Push

```bash
# Run everything locally first
npm run check:health

# If this passes, your push will too!
```

---

## 🐛 Troubleshooting

### "Hooks not running"

```bash
# Make sure they're executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push

# Reinstall
./scripts/setup-hooks.sh
```

---

### "Hooks failing"

```bash
# Run checks manually to see details
npm run type-check
npm run lint:check
npm run validate:design src/

# Fix issues
npm run format
npm run lint -- --fix

# Try again
git commit / git push
```

---

## 📚 Learn More

- [Full CI/CD Guide](./README.md)
- [Workflow Best Practices](../workflows/README.md)
- [Common Fixes](../../quick-reference/common-fixes.md)

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Pre-commit hook exists: `ls -la .husky/pre-commit`
- [ ] Pre-push hook exists: `ls -la .husky/pre-push`
- [ ] Hooks are executable: `file .husky/pre-*`
- [ ] Test commit works: Make test commit
- [ ] GitHub Actions configured: Check `.github/workflows/`

---

**🎉 You're all set! Your code quality is now automated.**

*Setup time: 5 minutes*  
*Saves: Hours of code review*

---

## 🆘 Need Help?

```bash
# Interactive menu
npm run scripts:menu

# Or ask the team
```

---

*Last Updated: November 15, 2025*

