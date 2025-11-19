# 🧪 Test Your Pre-Commit Hook

**Quick test to verify design validation is working**

---

## ✅ Hook Status

The pre-commit hook is installed at: `.husky/pre-commit`

**It will automatically validate design rules before EVERY commit.**

---

## 🧪 Test 1: Success Case

### Create a correct component:

```bash
cd frontend/eetmad

# Create a test file
cat > src/test-correct.tsx << 'EOF'
'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';

export default function TestCorrect() {
  const t = useTranslations('test');

  return (
    <div style={{ backgroundColor: cssVars.neutral.bg }}>
      <h1>{t('title')}</h1>
    </div>
  );
}
EOF

# Stage it
git add src/test-correct.tsx

# Try to commit
git commit -m "test: correct component"
```

**Expected:** ✅ Validation passes, commit succeeds

---

## 🧪 Test 2: Failure Case

### Create a component with errors:

```bash
cd frontend/eetmad

# Create a test file with design violations
cat > src/test-wrong.tsx << 'EOF'
export default function TestWrong() {
  return (
    <div style={{ backgroundColor: '#FAF8F1' }}>
      <h1>Hardcoded Text</h1>
    </div>
  );
}
EOF

# Stage it
git add src/test-wrong.tsx

# Try to commit
git commit -m "test: wrong component"
```

**Expected:** ❌ Validation fails, commit blocked

**You should see:**

```
❌ Design rules validation failed!

Errors found:
- Line 3: Hardcoded hex color found: #FAF8F1
- Line 4: Hardcoded English text found: Hardcoded Text
```

---

## 🎯 What This Proves

### When you commit:

1. ✅ **Hook automatically runs** - No need to remember
2. ✅ **Validates staged files** - Only what you're committing
3. ✅ **Shows clear errors** - Easy to understand
4. ✅ **Blocks bad commits** - Forces you to fix issues
5. ✅ **Helpful messages** - Tells you how to fix

---

## 💡 Quick Test (One Command)

```bash
cd frontend/eetmad

# Create test, stage, and try to commit
echo "const test = '#FAF8F1';" > src/test-hook.ts && \
git add src/test-hook.ts && \
git commit -m "test: hook"

# This should FAIL because of hardcoded color!
```

**Clean up:**

```bash
rm src/test-hook.ts
git restore --staged src/test-hook.ts 2>/dev/null || true
```

---

## 🔍 See the Hook in Action

The hook output looks like this:

```
🔍 Running design validation before commit...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Validating Staged Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Files to validate:
  ✓ src/components/MyComponent.tsx

🔍 Running design rules validation...

[Validation results here...]

✅ All staged files pass design rules validation!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ✅ Verification Checklist

- [ ] Hook file exists and is executable
- [ ] Committing correct code works
- [ ] Committing incorrect code fails
- [ ] Error messages are clear
- [ ] Can fix and re-commit successfully

---

## 🆘 If Hook Doesn't Run

```bash
# Make sure it's executable
chmod +x .husky/pre-commit

# Check git hooks path
git config core.hooksPath

# Should show: .husky

# If not set:
git config core.hooksPath .husky
```

---

## 🎉 Success!

If the hook is working, you'll see:

✅ **Automatic validation** on every commit  
✅ **Fast feedback** (< 10 seconds)  
✅ **Clear error messages**  
✅ **No bad code gets committed**

---

**Your commits are now protected! 🛡️**

_Next: Try committing actual code and see the validation in action!_
