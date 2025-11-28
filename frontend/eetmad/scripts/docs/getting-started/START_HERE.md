# 🚀 START HERE - Scripts Directory Guide

**New to the scripts? This is your starting point!**

---

## 🎯 What is This?

This directory contains all the tools, scripts, and documentation to help you:

- ✅ Validate your code quality
- 📖 Learn best practices
- 🔧 Automate repetitive tasks
- 🚀 Speed up development

---

## ⚡ Quick Start (30 seconds)

### Option 1: Interactive Menu (Recommended)

```bash
npm run scripts:menu
```

This opens an interactive menu where you can:

- Run any validation script
- Open documentation
- View examples
- Get help

### Option 2: Read the INDEX

```bash
# View in terminal
cat scripts/INDEX.md

# Or open in editor
code scripts/INDEX.md
```

The INDEX is your central hub with links to everything.

---

## 📚 Documentation Structure

```
scripts/
├── START_HERE.md          ← You are here!
├── INDEX.md               ← Central hub - read this next
├── README.md              ← Original comprehensive guide
│
├── docs/                  ← Detailed documentation
│   ├── validation/        - All about validation scripts
│   ├── workflows/         - Step-by-step workflows
│   ├── ci-cd/             - CI/CD integration
│   └── onboarding/        - For new team members
│
├── quick-reference/       ← One-page cheat sheets ⚡
│   ├── design-rules.md    - Design rules cheat sheet
│   ├── css-vars.md        - All cssVars reference
│   ├── common-fixes.md    - Quick solutions
│   └── i18n-patterns.md   - i18n examples
│
├── examples/              ← Code examples
│   ├── test-component-correct.tsx
│   └── test-component-example.tsx
│
├── tools/                 ← Helper tools
│   └── menu.js            - Interactive menu
│
└── *.ts                   ← Actual script files
```

---

## 🎓 Learning Path

### For New Developers (30 minutes)

```
1. Read: START_HERE.md (3 min) ← You're doing it!
2. Read: INDEX.md (5 min)
3. Read: quick-reference/design-rules.md (10 min)
4. Try: npm run scripts:menu (2 min)
5. Practice: Create a test component and validate it (10 min)
```

### For Experienced Developers (5 minutes)

```
1. Scan: INDEX.md (2 min)
2. Bookmark: quick-reference/ folder (1 min)
3. Add alias: scripts:menu (1 min)
4. Start using: npm run validate:design (1 min)
```

---

## 🔥 Most Used Commands

### Daily Development

```bash
# Validate single file
npm run validate:design src/components/MyComponent.tsx

# Validate changes
npm run validate:design $(git diff --name-only | grep -E '\.(tsx|ts)$')

# Interactive menu
npm run scripts:menu
```

### Before Committing

```bash
# Check staged files
npm run validate:design $(git diff --cached --name-only | grep -E '\.(tsx|ts)$')

# Or run everything
npm run check:health
```

### Quick Help

```bash
# Show help text
npm run scripts:help

# Or interactive menu
npm run scripts:menu
```

---

## 📖 What Should I Read?

### By Time Available

**⚡ 1 minute?**

- [Design Rules Cheat Sheet](./quick-reference/design-rules.md)

**🏃 5 minutes?**

- [INDEX.md](./INDEX.md) - Central hub

**📚 15 minutes?**

- [New Component Workflow](./docs/workflows/new-component.md)
- [Common Fixes](./quick-reference/common-fixes.md)

**📖 30 minutes?**

- [Complete Validation Guide](./docs/validation/README.md)
- [All Workflows](./docs/workflows/README.md)

---

### By Task

**Want to validate code?**
→ [Validation Guide](./docs/validation/README.md)

**Creating a component?**
→ [New Component Workflow](./docs/workflows/new-component.md)

**Got errors?**
→ [Common Fixes](./quick-reference/common-fixes.md)

**Need cssVars?**
→ [cssVars Reference](./quick-reference/css-vars.md)

**Setting up CI/CD?**
→ [CI/CD Integration](./docs/ci-cd/ci-integration-example.yml)

---

## 🎯 Key Documents

| Document                                              | Purpose         | When to Read               |
| ----------------------------------------------------- | --------------- | -------------------------- |
| [INDEX.md](./INDEX.md)                                | Central hub     | First time, for navigation |
| [design-rules.md](./quick-reference/design-rules.md)  | Quick reference | Daily use                  |
| [common-fixes.md](./quick-reference/common-fixes.md)  | Error solutions | When you have errors       |
| [css-vars.md](./quick-reference/css-vars.md)          | Theme variables | When styling               |
| [new-component.md](./docs/workflows/new-component.md) | Component guide | Creating components        |

---

## 💡 Pro Tips

### 1. Bookmark These Files

Most useful for daily work:

- `scripts/INDEX.md`
- `scripts/quick-reference/design-rules.md`
- `scripts/quick-reference/common-fixes.md`

### 2. Add Shell Aliases

```bash
# Add to ~/.zshrc or ~/.bashrc
alias scripts="cd ~/Projects/fisal/frontend/eetmad && npm run scripts:menu"
alias validate="npm run validate:design"
```

### 3. VS Code Snippets

Create snippets for common patterns (see docs/workflows/new-component.md)

### 4. Set Up Git Hooks

Auto-validate on commit:

```bash
# Coming soon: npm run setup:hooks
```

---

## 🆘 Need Help?

### Quick Help

```bash
# Interactive menu
npm run scripts:menu

# View INDEX
npm run scripts:help

# Or just
cat scripts/INDEX.md
```

### Common Questions

**Q: Where do I start?**
A: Read INDEX.md, then the design-rules quick reference.

**Q: How do I validate my code?**
A: `npm run validate:design path/to/file.tsx`

**Q: I got validation errors, now what?**
A: Check `quick-reference/common-fixes.md`

**Q: Where are the examples?**
A: `scripts/examples/` folder

**Q: Too much documentation!**
A: Start with quick-reference/ folder - they're one-page cheat sheets

---

## 🗺️ Next Steps

### Immediate (Now)

1. ✅ You've read START_HERE.md
2. → Next: Read [INDEX.md](./INDEX.md)
3. → Then: Read [design-rules quick ref](./quick-reference/design-rules.md)

### Today

1. Try the interactive menu: `npm run scripts:menu`
2. Validate a file: `npm run validate:design <your-file>`
3. Bookmark the quick-reference folder

### This Week

1. Read [New Component Workflow](./docs/workflows/new-component.md)
2. Study [Code Examples](./examples/)
3. Set up your editor/shell with helpers

---

## 📊 What's Available

### ✅ Ready to Use

- **Validation Scripts** - Design rules, types, naming, structure
- **Documentation** - Complete guides and quick references
- **Interactive Menu** - Easy access to everything
- **Examples** - Correct and incorrect code samples
- **CI/CD Examples** - Integration templates

### 🔄 Coming Soon

- Auto-fix for common issues
- i18n checking scripts
- Database scripts
- Performance monitoring

---

## 📞 Support

- **Documentation:** Start with [INDEX.md](./INDEX.md)
- **Examples:** Check `scripts/examples/`
- **Team:** Ask in #dev-help channel
- **Issues:** Open GitHub issue

---

**🎉 Ready to get started? Run this:**

```bash
npm run scripts:menu
```

---

_Last Updated: November 15, 2025_
_Version: 2.0 - Reorganized Structure_
