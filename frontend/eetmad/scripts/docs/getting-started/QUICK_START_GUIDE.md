# دليل البدء السريع - سكريبت فحص قواعد البناء

## 🚀 البدء السريع (5 دقائق)

### 1. التثبيت

```bash
cd frontend/eetmad
npm install
```

### 2. تشغيل اختبار سريع

```bash
# اختبر السكريبت على ملف المثال
npm run validate:design scripts/test-component-example.tsx
```

### 3. النتيجة المتوقعة

ستحصل على تقرير يشبه هذا:

```
═══════════════════════════════════════════════════════════════════════
📊 ملخص النتائج
═══════════════════════════════════════════════════════════════════════
📁 إجمالي الملفات: 1
❌ إجمالي الأخطاء: 8
⚠️  إجمالي التحذيرات: 2
═══════════════════════════════════════════════════════════════════════
```

### 4. قارن مع الملف الصحيح

```bash
# افحص الملف الصحيح
npm run validate:design scripts/test-component-correct.tsx
```

النتيجة المتوقعة:

```
✨ رائع! جميع الملفات تتبع قواعد البناء بشكل صحيح
```

## 📋 حالات الاستخدام الشائعة

### حالة 1: فحص component جديد قبل commit

```bash
npm run validate:design src/components/features/auth/LoginForm.tsx
```

### حالة 2: فحص مجلد features كامل

```bash
npm run validate:design src/components/features/
```

### حالة 3: فحص صفحة معينة

```bash
npm run validate:design src/app/[locale]/(auth)/login/page.tsx
```

### حالة 4: فحص عدة ملفات معاً

```bash
npm run validate:design \
  src/components/features/home/HeroSection.tsx \
  src/components/features/home/SearchSection.tsx \
  src/components/features/home/CategorySection.tsx
```

### حالة 5: حفظ التقرير

```bash
npm run validate:design src/components/ --json validation-report.json
```

## 🎯 الأخطاء الشائعة والإصلاح السريع

### خطأ #1: لون hex مباشر

**الخطأ:**

```tsx
<div style={{ backgroundColor: '#FAF8F1' }}>
```

**الإصلاح:**

```tsx
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

---

### خطأ #2: نص hardcoded

**الخطأ:**

```tsx
<h1>Welcome to Platform</h1>
```

**الإصلاح:**

```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations('home');
<h1>{t('welcomeTitle')}</h1>;
```

ثم أضف في `messages/en.json`:

```json
{
  "home": {
    "welcomeTitle": "Welcome to Platform"
  }
}
```

---

### خطأ #3: استيراد colors بدلاً من cssVars

**الخطأ:**

```tsx
import { colors } from '@/styles/theme';
<div style={{ backgroundColor: colors.neutral.bg }}>
```

**الإصلاح:**

```tsx
import { cssVars } from '@/styles/theme';
<div style={{ backgroundColor: cssVars.neutral.bg }}>
```

---

### خطأ #4: Tailwind color classes

**الخطأ:**

```tsx
<div className="bg-white text-gray-800">
```

**الإصلاح:**

```tsx
import { cssVars } from '@/styles/theme';
<div
  className="p-4"
  style={{
    backgroundColor: cssVars.neutral.surface,
    color: cssVars.secondary.DEFAULT,
  }}
>
```

---

### خطأ #5: directional classes

**الخطأ:**

```tsx
<div className="ml-4 mr-2">
```

**الإصلاح:**

```tsx
<div className="ms-4 me-2">
```

---

### خطأ #6: rgba مباشر

**الخطأ:**

```tsx
<div style={{ backgroundColor: 'rgba(51, 68, 67, 0.95)' }}>
```

**الإصلاح:**

```tsx
import { cssVars } from '@/styles/theme';
<div style={{
  backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`
}}>
```

---

### خطأ #7: عدم استخدام 'use client'

**الخطأ:**

```tsx
import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  // ...
}
```

**الإصلاح:**

```tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  // ...
}
```

## 📚 قائمة cssVars المتاحة

### الألوان الأساسية

```tsx
cssVars.primary.DEFAULT; // اللون الأساسي
cssVars.primary.dark; // أغمق
cssVars.primary.light; // أفتح

cssVars.secondary.DEFAULT; // اللون الثانوي
cssVars.secondary.darker; // أغمق
```

### الألوان المحايدة

```tsx
cssVars.neutral.bg; // خلفية الصفحة
cssVars.neutral.surface; // سطح العنصر
cssVars.neutral.surfaceAlt; // سطح بديل
cssVars.neutral.border; // لون الحدود
cssVars.neutral.textMuted; // نص خفيف
cssVars.neutral.textSecondary; // نص ثانوي
```

### ألوان الحالة

```tsx
cssVars.status.success; // نجاح
cssVars.status.error; // خطأ
cssVars.status.warning; // تحذير
cssVars.status.info; // معلومة
```

### التدرجات

```tsx
cssVars.gradient.gold; // تدرج ذهبي
cssVars.gradient.primary; // تدرج أساسي
cssVars.gradient.hero; // تدرج البطل
cssVars.gradient.cta; // تدرج CTA
```

## 🔄 سير العمل اليومي

### قبل البدء بتطوير component جديد

1. راجع القواعد:

   ```bash
   cat docs/design/component-building-guidelines.md
   ```

2. انظر للأمثلة الصحيحة:
   ```bash
   cat scripts/test-component-correct.tsx
   ```

### أثناء التطوير

1. اكتب الـ component
2. افحصه فوراً:
   ```bash
   npm run validate:design src/components/features/myfeature/MyComponent.tsx
   ```
3. أصلح الأخطاء
4. كرر

### قبل Commit

```bash
# افحص الملفات المعدلة فقط
npm run validate:design $(git diff --name-only --cached | grep -E '\.(tsx|ts)$')
```

### قبل Pull Request

```bash
# افحص كل ملفات الـ feature
npm run validate:design src/components/features/myfeature/ --json pr-report.json
```

## 💡 نصائح احترافية

### نصيحة 1: استخدم alias

أضف في `~/.zshrc` أو `~/.bashrc`:

```bash
alias vd="npm run validate:design"
```

الاستخدام:

```bash
vd src/components/features/home/
```

### نصيحة 2: افحص فقط الملفات المعدلة

```bash
npm run validate:design $(git status --short | grep '\.tsx\?$' | awk '{print $2}')
```

### نصيحة 3: VS Code Task

أضف في `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Validate Design Rules (Current File)",
      "type": "shell",
      "command": "npm run validate:design ${file}",
      "problemMatcher": [],
      "group": {
        "kind": "test",
        "isDefault": true
      }
    }
  ]
}
```

اختصار لوحة المفاتيح: `Cmd+Shift+B` (Mac) أو `Ctrl+Shift+B` (Windows/Linux)

### نصيحة 4: Pre-commit Hook

أضف في `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate design rules for staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(tsx|ts)$')

if [ -n "$STAGED_FILES" ]; then
  echo "🔍 Validating design rules..."
  npm run validate:design $STAGED_FILES

  if [ $? -ne 0 ]; then
    echo "❌ Design rules validation failed. Please fix the errors above."
    exit 1
  fi
fi
```

## 🎓 تمرين عملي

### التمرين: أصلح جميع الأخطاء

1. افتح `scripts/test-component-example.tsx`
2. قم بتشغيل الفحص:
   ```bash
   npm run validate:design scripts/test-component-example.tsx
   ```
3. اقرأ كل خطأ بعناية
4. أصلح الأخطاء واحداً تلو الآخر
5. أعد تشغيل الفحص حتى تحصل على:
   ```
   ✨ رائع! جميع الملفات تتبع قواعد البناء بشكل صحيح
   ```

### الحل

انظر إلى `scripts/test-component-correct.tsx` للمقارنة!

## 📞 الدعم والمساعدة

### الموارد

- 📖 [القواعد الكاملة](../docs/design/component-building-guidelines.md)
- 🎨 [نظام الثيم](../src/styles/theme/)
- 🌍 [ملفات الترجمة](../messages/)
- 📄 [التوثيق الكامل](./validate-design-rules.README.md)

### الأسئلة الشائعة

**س: السكريبت بطيء جداً، ماذا أفعل؟**
ج: فحص مجلدات محددة بدلاً من كل المشروع:

```bash
npm run validate:design src/components/features/myfeature/
```

**س: كيف أتجاهل بعض الأخطاء؟**
ج: السكريبت ذكي ويتجاهل:

- التعليقات (`//`)
- الأمثلة المحتوية على `❌` أو `WRONG`
- ملفات الاختبار (`.test.ts`, `.spec.ts`)

**س: هل يعدل السكريبت الملفات؟**
ج: لا، السكريبت للفحص فقط. لا يعدل أي ملفات.

---

**استمتع بالبناء! 🚀**
