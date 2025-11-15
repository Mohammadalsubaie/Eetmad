# 🎯 Scripts Hub - Your Central Command Center

**Quick Navigation:** [🚀 Quick Start](#quick-start) | [📚 All Scripts](#all-scripts) | [🔧 Workflows](#common-workflows) | [📖 Guides](#documentation)

---

## 🚀 Quick Start

### First Time Setup

```bash
cd frontend/eetmad
npm install
```

### Run Interactive Menu

```bash
npm run scripts:menu
```

### Quick Commands

```bash
# Validate your current work
npm run validate:all

# Check just one file
npm run validate:design path/to/file.tsx

# Full project health check
npm run check:health
```

---

## 📚 All Scripts

### 🔍 Code Quality & Validation

| Script                | Command                              | When to Use   | Time |
| --------------------- | ------------------------------------ | ------------- | ---- |
| **Design Rules**      | `npm run validate:design [path]`     | Before commit | < 5s |
| **Type Checking**     | `npm run validate-types`             | Before commit | < 3s |
| **Naming Convention** | `npm run validate-naming`            | Weekly        | < 2s |
| **Structure Check**   | `node scripts/validate-structure.js` | Monthly       | < 1s |
| **Import Check**      | `./scripts/check-imports.sh`         | As needed     | < 2s |

📖 [Detailed Guide](./docs/validation/README.md)

### 🌍 Internationalization (i18n)

| Script                 | Command                | Purpose                      |
| ---------------------- | ---------------------- | ---------------------------- |
| **Check Translations** | `npm run i18n:check`   | Find missing translations    |
| **Sync Locales**       | `npm run i18n:sync`    | Sync AR/EN files             |
| **Extract Keys**       | `npm run i18n:extract` | Extract new translation keys |

📖 [i18n Guide](./docs/i18n/README.md) _(coming soon)_

### 🗄️ Database & Data

| Script         | Command              | Purpose             |
| -------------- | -------------------- | ------------------- |
| **Backup DB**  | `npm run db:backup`  | Create backup       |
| **Restore DB** | `npm run db:restore` | Restore from backup |
| **Seed Data**  | `npm run db:seed`    | Populate test data  |

📖 [Database Guide](./docs/database/README.md) _(coming soon)_

### 🚀 Deployment & CI/CD

| Script              | Command                | Purpose                           |
| ------------------- | ---------------------- | --------------------------------- |
| **Setup Git Hooks** | `npm run setup:hooks`  | Install pre-commit/pre-push hooks |
| **Health Check**    | `npm run check:health` | Full validation before push       |
| **Build Check**     | `npm run build`        | Test production build             |

📖 [CI/CD Quick Setup](./docs/ci-cd/QUICK_SETUP.md) | [Full Guide](./docs/ci-cd/README.md)

---

## 🔧 Common Workflows

### ⚡ First Time Setup (Do This Once!)

```bash
# Install git hooks for automatic validation
npm run setup:hooks
```

This installs:

- ✅ Pre-commit hook (validates staged files)
- ✅ Pre-push hook (full validation before push)

📖 [Complete CI/CD Setup Guide](./docs/ci-cd/QUICK_SETUP.md)

---

### 📝 Before Committing Code

```bash
# 1. Check what you changed
git diff --name-only --cached

# 2. Validate your changes
npm run validate:design $(git diff --name-only --cached | grep -E '\.(tsx|ts)$')

# 3. If all good, commit
git commit -m "your message"
```

📖 [More workflows](./docs/workflows/README.md)

### 🆕 Creating a New Component

```bash
# 1. Create your component following the template
# 2. Validate it immediately
npm run validate:design src/components/your-component.tsx

# 3. Fix any issues
# 4. Compare with correct example
cat scripts/examples/test-component-correct.tsx
```

📖 [Component Creation Guide](./docs/workflows/new-component.md)

### 🐛 Debugging Validation Errors

```bash
# 1. Run validation with details
npm run validate:design path/to/file.tsx

# 2. Read the error messages
# 3. Check examples
cat scripts/examples/test-component-example.tsx  # Wrong ❌
cat scripts/examples/test-component-correct.tsx  # Correct ✅

# 4. Fix and re-validate
```

### 🚢 Before Deploying

```bash
# Run full health check
npm run check:health

# This runs:
# ✓ Type checking
# ✓ Linting
# ✓ Design rules validation
# ✓ Build test
# ✓ Test suite
```

---

## 📖 Documentation

### 📋 Quick Reference Cards

**One-page cheat sheets** for quick lookup:

- [🎨 Design Rules Cheat Sheet](./quick-reference/design-rules.md)
- [🔤 Naming Conventions](./quick-reference/naming.md)
- [🎨 cssVars Quick Reference](./quick-reference/css-vars.md)
- [🌍 i18n Patterns](./quick-reference/i18n-patterns.md)
- [⚡ Common Fixes](./quick-reference/common-fixes.md)

### 📚 Detailed Documentation

**In-depth guides** organized by topic:

#### Validation Scripts

- [Design Rules Validation](./docs/validation/design-rules.md)
- [Type Validation](./docs/validation/types.md)
- [All Validation Tools](./docs/validation/README.md)

#### Workflows & Patterns

- [Common Workflows](./docs/workflows/README.md)
- [New Component Workflow](./docs/workflows/new-component.md)
- [Review Process](./docs/workflows/review-process.md)

#### CI/CD Integration

- [CI/CD Examples](./docs/ci-cd/ci-integration-example.yml)
- [Git Hooks Setup](./docs/ci-cd/git-hooks.md)

#### Examples

- [Correct Component Example](./examples/test-component-correct.tsx)
- [Common Mistakes Example](./examples/test-component-example.tsx)

---

## 🎯 By Role

### 👨‍💻 For Developers

**Daily Use:**

1. 📖 [Quick Reference - Design Rules](./quick-reference/design-rules.md)
2. 🔧 [Common Workflows](./docs/workflows/README.md)
3. ✅ Before commit: `npm run validate:design <your-files>`

### 👥 For Team Leads

**Review Process:**

1. 📋 [Review Checklist](./docs/workflows/review-process.md)
2. 🚀 [CI/CD Setup Guide](./docs/ci-cd/README.md)
3. 📊 Analytics: `npm run validate:design src/ --json report.json`

### 🆕 For New Team Members

**Start Here:**

1. 📖 [5-Minute Quick Start](./docs/onboarding/quick-start.md)
2. 🎓 [Training Path](./docs/onboarding/training.md)
3. 💡 [Examples to Study](./examples/)

---

## 🔍 Find What You Need

### By Task

- **Want to validate code?** → [Validation Scripts](#-code-quality--validation)
- **Creating a component?** → [Component Workflow](./docs/workflows/new-component.md)
- **Got validation errors?** → [Common Fixes](./quick-reference/common-fixes.md)
- **Setting up CI/CD?** → [CI/CD Guide](./docs/ci-cd/README.md)
- **Need quick answer?** → [Quick Reference Cards](./quick-reference/)

### By Time Available

- **⚡ 1 minute:** [Design Rules Cheat Sheet](./quick-reference/design-rules.md)
- **🏃 5 minutes:** [Quick Start Guide](./docs/onboarding/quick-start.md)
- **📚 30 minutes:** [Complete Validation Guide](./docs/validation/README.md)

---

## 🛠️ Interactive Tools

### Run the Menu System

```bash
npm run scripts:menu
```

This gives you an interactive menu to:

- ✅ Run any validation script
- 📖 Open relevant documentation
- 🔧 Access common workflows
- 💡 See examples

### Watch Mode (Auto-validate on save)

```bash
npm run validate:watch src/components/
```

---

## 🆘 Getting Help

### Quick Help

```bash
npm run validate:design --help
npm run scripts:help
```

### Common Issues

📖 [Troubleshooting Guide](./docs/troubleshooting.md)

### Can't Find What You Need?

1. Check the [Quick Reference](./quick-reference/) first
2. Look in [Documentation](./docs/) by category
3. Search this file (Ctrl/Cmd + F)
4. Ask the team

---

## 📊 Project Status

### Current Scripts Status

| Category   | Scripts  | Status     | Documentation |
| ---------- | -------- | ---------- | ------------- |
| Validation | 5        | ✅ Ready   | ✅ Complete   |
| i18n       | 3        | 🔄 Planned | 📝 Pending    |
| Database   | 3        | 🔄 Planned | 📝 Pending    |
| CI/CD      | Examples | ✅ Ready   | ✅ Complete   |

### What's New

- ✨ **Nov 2025:** Design Rules Validation - Full validation system
- 📖 **Nov 2025:** Comprehensive documentation restructure

---

## 🗺️ Folder Structure

```
scripts/
├── INDEX.md                    ← You are here!
│
├── docs/                       ← Detailed documentation
│   ├── validation/
│   ├── workflows/
│   ├── ci-cd/
│   └── onboarding/
│
├── quick-reference/            ← One-page cheat sheets
│   ├── design-rules.md
│   ├── css-vars.md
│   └── common-fixes.md
│
├── examples/                   ← Code examples
│   ├── test-component-correct.tsx
│   └── test-component-example.tsx
│
├── tools/                      ← Helper tools
│   └── menu.js                ← Interactive menu
│
└── *.ts                       ← Actual script files
```

---

## 💡 Pro Tips

### Aliases (Add to ~/.zshrc)

```bash
alias validate="npm run validate:design"
alias validate-all="npm run check:health"
alias scripts-menu="cd ~/Projects/fisal/frontend/eetmad && npm run scripts:menu"
```

### VS Code Shortcuts

Add to `.vscode/tasks.json`:

```json
{
  "label": "Validate Current File",
  "type": "shell",
  "command": "npm run validate:design ${file}",
  "group": "test"
}
```

### Git Hook (Auto-validate)

```bash
# One-time setup
npm run setup:hooks
```

---

## 📞 Support

- 📖 **Documentation:** Start with this INDEX
- 💬 **Team Chat:** Ask in #dev-help
- 🐛 **Issues:** Open GitHub issue
- 📧 **Email:** dev-team@fisal.com

---

**Last Updated:** November 15, 2025  
**Version:** 2.0 - Reorganized Structure  
**Maintainer:** Fisal Dev Team

---

**🎯 Remember:** When in doubt, run `npm run scripts:menu` for an interactive guide!
