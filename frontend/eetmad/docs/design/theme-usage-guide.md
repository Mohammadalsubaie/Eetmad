# Theme Usage Guide (Legacy Document)

> **⚠️ IMPORTANT**: This document is outdated. The theme system now uses CSS variables.
>
> **📖 For current guidelines, see**: [Component Building Guidelines](./component-building-guidelines.md)
>
> **Current Theme Location**: `frontend/eetmad/src/styles/theme/`
>
> **Key Change**: Always use `cssVars` instead of direct `colors` import.

---

# دليل استخدام الثيم (Theme Usage Guide) - Legacy

## نظرة عامة

> **Note**: This guide shows the old way. Now use `cssVars` from `@/styles/theme` instead of `colors`.

يستخدم المشروع نظام ثيم موحد موجود في `src/styles/theme` يوفر الألوان، التدرجات، المسافات، الأنصاف، الظلال، والخطوط. يجب استخدام هذه القيم دائماً بدلاً من كتابة القيم مباشرة في الكود.

## 📁 هيكل الثيم

```
src/styles/theme/
├── index.ts          # نقطة التصدير الرئيسية
├── colors.ts         # الألوان
├── gradients.ts      # التدرجات
├── radius.ts         # أنصاف الأقطار
├── shadows.ts        # الظلال
├── spacing.ts        # المسافات
└── typography.ts     # الخطوط
```

## 🎨 الاستيراد

### استيراد كامل

```typescript
import { colors, gradients, radius, shadows, spacing, typography } from '@/styles/theme';
```

### استيراد محدد

```typescript
import { colors, gradients } from '@/styles/theme';
```

## 🎨 الألوان (Colors)

### هيكل الألوان

```typescript
colors = {
  primary: {
    DEFAULT: '#34656D', // اللون الأساسي
    dark: '#284E54', // اللون الداكن
    light: '#6C8B89', // اللون الفاتح
  },
  secondary: {
    DEFAULT: '#334443',
  },
  accent: {
    primary: '#FAEAB1', // اللون الأساسي للإبراز
    secondary: '#F7DD7D', // اللون الثانوي للإبراز
    warm: '#F3D049', // اللون الدافئ
  },
  neutral: {
    bg: '#FAF8F1', // خلفية الصفحة
    surface: '#FFFFFF', // سطح العناصر
    surfaceAlt: '#F0ECDD', // سطح بديل
    border: '#E0DCC8', // لون الحدود
    textMuted: '#A4C5CA', // نص خافت
    textSecondary: '#536765', // نص ثانوي
  },
  status: {
    success: '#3D8B64', // نجاح
    error: '#C95454', // خطأ
    warning: '#F3D049', // تحذير
    info: '#34656D', // معلومات
  },
};
```

### ✅ الاستخدام الصحيح

```tsx
import { colors } from '@/styles/theme';

// استخدام في style prop
<div style={{ backgroundColor: colors.neutral.bg }}>
  <h1 style={{ color: colors.secondary.DEFAULT }}>عنوان</h1>
  <p style={{ color: colors.neutral.textMuted }}>نص</p>
</div>

// استخدام مع opacity
<div style={{ backgroundColor: `${colors.accent.primary}26` }}> // 15% opacity
<div style={{ backgroundColor: `${colors.accent.primary}33` }}> // 20% opacity
<div style={{ backgroundColor: `${colors.accent.primary}4D` }}> // 30% opacity
<div style={{ backgroundColor: `${colors.accent.primary}80` }}> // 50% opacity
```

### ❌ الاستخدام الخاطئ

```tsx
// ❌ خطأ - استخدام ألوان مباشرة
<div style={{ backgroundColor: '#FAF8F1' }}>
<div style={{ color: '#334443' }}>

// ❌ خطأ - استخدام Tailwind classes للألوان المخصصة
<div className="bg-[#FAF8F1]">
<div className="text-[#334443]">
```

## 🌈 التدرجات (Gradients)

### التدرجات المتاحة

```typescript
gradients = {
  gold: 'linear-gradient(135deg, #FAEAB1 0%, #F7DD7D 100%)',
  primary: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)',
  hero: 'linear-gradient(180deg, #334443 0%, #34656D 100%)',
  cta: 'linear-gradient(135deg, #34656D 0%, #334443 100%)',
};
```

### ✅ الاستخدام الصحيح

```tsx
import { gradients } from '@/styles/theme';

// استخدام في style prop
<section style={{ background: gradients.hero }}>
  <div style={{ background: gradients.gold }}>
    <button style={{ background: gradients.primary }}>زر</button>
  </div>
</section>;
```

### ❌ الاستخدام الخاطئ

```tsx
// ❌ خطأ - كتابة التدرج مباشرة
<div style={{ background: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)' }}>

// ❌ خطأ - استخدام Tailwind gradient classes
<div className="bg-gradient-to-r from-[#34656D] to-[#284E54]">
```

## 📏 المسافات (Spacing)

### ✅ الاستخدام الصحيح

```tsx
import { spacing } from '@/styles/theme';

<div style={{ padding: spacing.md, margin: spacing.lg }}>
  <div style={{ gap: spacing.sm }}>محتوى</div>
</div>;
```

## 🔲 أنصاف الأقطار (Radius)

### ✅ الاستخدام الصحيح

```tsx
import { radius } from '@/styles/theme';

<div style={{ borderRadius: radius.lg }}>
  <button style={{ borderRadius: radius.md }}>زر</button>
</div>;
```

## 🌑 الظلال (Shadows)

### ✅ الاستخدام الصحيح

```tsx
import { shadows } from '@/styles/theme';

<div style={{ boxShadow: shadows.lg }}>
  <card style={{ boxShadow: shadows.md }}>بطاقة</card>
</div>;
```

## 📝 الخطوط (Typography)

### ✅ الاستخدام الصحيح

```tsx
import { typography } from '@/styles/theme';

<h1 style={{ fontFamily: typography.fontFamily.heading }}>
  عنوان
</h1>
<p style={{ fontFamily: typography.fontFamily.body }}>
  نص
</p>
```

## 📚 أمثلة عملية

### مثال 1: مكون Header

```tsx
'use client';

import { colors, gradients } from '@/styles/theme';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: `${colors.secondary.DEFAULT}F2`, // 95% opacity
        borderColor: `${colors.neutral.textMuted}33`, // 20% opacity
      }}
    >
      <motion.button
        style={{
          background: gradients.gold,
          color: colors.secondary.DEFAULT,
        }}
      >
        حسابي
      </motion.button>
    </header>
  );
}
```

### مثال 2: مكون Card

```tsx
'use client';

import { colors } from '@/styles/theme';

export default function Card() {
  return (
    <div
      style={{
        backgroundColor: colors.neutral.surface,
        borderColor: colors.neutral.border,
        color: colors.secondary.DEFAULT,
      }}
    >
      <h3 style={{ color: colors.secondary.DEFAULT }}>عنوان</h3>
      <p style={{ color: colors.neutral.textSecondary }}>وصف</p>
      <div
        style={{
          backgroundColor: colors.neutral.bg,
          color: colors.neutral.textMuted,
        }}
      >
        معلومات إضافية
      </div>
    </div>
  );
}
```

### مثال 3: مكون Button

```tsx
'use client';

import { colors, gradients } from '@/styles/theme';

export default function Button({ variant = 'primary' }) {
  const styles = {
    primary: {
      background: gradients.gold,
      color: colors.secondary.DEFAULT,
    },
    secondary: {
      backgroundColor: colors.primary.DEFAULT,
      color: colors.neutral.bg,
    },
    outline: {
      borderColor: colors.primary.DEFAULT,
      color: colors.primary.DEFAULT,
      backgroundColor: 'transparent',
    },
  };

  return <button style={styles[variant]}>نص الزر</button>;
}
```

### مثال 4: مكون Badge

```tsx
'use client';

import { colors } from '@/styles/theme';

export default function Badge({ type = 'success' }) {
  const badgeStyles = {
    success: {
      backgroundColor: `${colors.status.success}33`, // 20% opacity
      color: colors.status.success,
    },
    error: {
      backgroundColor: `${colors.status.error}33`,
      color: colors.status.error,
    },
    warning: {
      backgroundColor: `${colors.status.warning}33`,
      color: colors.status.warning,
    },
  };

  return <span style={badgeStyles[type]}>{type}</span>;
}
```

## 🎯 أفضل الممارسات

### 1. استخدم الثيم دائماً

```tsx
// ✅ صحيح
<div style={{ color: colors.secondary.DEFAULT }}>

// ❌ خطأ
<div style={{ color: '#334443' }}>
```

### 2. استخدم Opacity Hex Codes للشفافية

```tsx
// ✅ صحيح - استخدام hex opacity
<div style={{ backgroundColor: `${colors.accent.primary}26` }}> // 15%
<div style={{ backgroundColor: `${colors.accent.primary}33` }}> // 20%
<div style={{ backgroundColor: `${colors.accent.primary}4D` }}> // 30%
<div style={{ backgroundColor: `${colors.accent.primary}80` }}> // 50%

// ❌ خطأ - استخدام rgba
<div style={{ backgroundColor: 'rgba(250, 234, 177, 0.15)' }}>
```

### 3. استخدم التدرجات من الثيم

```tsx
// ✅ صحيح
<div style={{ background: gradients.hero }}>

// ❌ خطأ
<div style={{ background: 'linear-gradient(180deg, #334443 0%, #34656D 100%)' }}>
```

### 4. استخدم الألوان الدلالية

```tsx
// ✅ صحيح - استخدام ألوان دلالية
<div style={{ backgroundColor: colors.neutral.bg }}>      // خلفية
<div style={{ backgroundColor: colors.neutral.surface }}> // سطح
<div style={{ color: colors.neutral.textMuted }}>         // نص خافت

// ❌ خطأ - استخدام ألوان مباشرة
<div style={{ backgroundColor: '#FAF8F1' }}>
```

### 5. استخدم ألوان الحالة للرسائل

```tsx
// ✅ صحيح
<div style={{ color: colors.status.success }}>نجح</div>
<div style={{ color: colors.status.error }}>فشل</div>
<div style={{ color: colors.status.warning }}>تحذير</div>

// ❌ خطأ
<div style={{ color: '#3D8B64' }}>نجح</div>
```

## ⚠️ ما يجب تجنبه

### ❌ لا تستخدم ألوان مباشرة

```tsx
// ❌ خطأ
<div style={{ color: '#334443' }}>
<div style={{ backgroundColor: '#FAF8F1' }}>
```

### ❌ لا تستخدم Tailwind arbitrary values للألوان المخصصة

```tsx
// ❌ خطأ
<div className="bg-[#FAF8F1]">
<div className="text-[#334443]">
```

### ❌ لا تكتب التدرجات مباشرة

```tsx
// ❌ خطأ
<div style={{ background: 'linear-gradient(135deg, #34656D 0%, #284E54 100%)' }}>
```

### ❌ لا تستخدم CSS variables مباشرة (إن لم تكن معرفة)

```tsx
// ❌ خطأ - إلا إذا كانت معرفة في globals.css
<div style={{ color: 'var(--primary)' }}>
```

## 🔄 Opacity Hex Codes

عند الحاجة لشفافية، استخدم hex opacity codes:

| Hex  | Opacity | الاستخدام              |
| ---- | ------- | ---------------------- |
| `00` | 0%      | شفاف تماماً            |
| `1A` | 10%     | خلفيات خفيفة جداً      |
| `26` | 15%     | خلفيات خفيفة           |
| `33` | 20%     | خلفيات شفافة           |
| `4D` | 30%     | خلفيات متوسطة الشفافية |
| `66` | 40%     | -                      |
| `80` | 50%     | خلفيات شبه شفافة       |
| `99` | 60%     | -                      |
| `B3` | 70%     | -                      |
| `CC` | 80%     | -                      |
| `E6` | 90%     | -                      |
| `FF` | 100%    | معتم تماماً            |

### أمثلة

```tsx
// 15% opacity
<div style={{ backgroundColor: `${colors.accent.primary}26` }}>

// 20% opacity
<div style={{ backgroundColor: `${colors.accent.primary}33` }}>

// 30% opacity
<div style={{ backgroundColor: `${colors.accent.primary}4D` }}>

// 50% opacity
<div style={{ backgroundColor: `${colors.accent.primary}80` }}>
```

## 📋 قائمة مرجعية سريعة

### الألوان الأساسية

- `colors.primary.DEFAULT` - اللون الأساسي
- `colors.primary.dark` - اللون الداكن
- `colors.primary.light` - اللون الفاتح
- `colors.secondary.DEFAULT` - اللون الثانوي

### ألوان الإبراز

- `colors.accent.primary` - إبراز أساسي
- `colors.accent.secondary` - إبراز ثانوي
- `colors.accent.warm` - إبراز دافئ

### الألوان المحايدة

- `colors.neutral.bg` - خلفية الصفحة
- `colors.neutral.surface` - سطح العناصر
- `colors.neutral.surfaceAlt` - سطح بديل
- `colors.neutral.border` - لون الحدود
- `colors.neutral.textMuted` - نص خافت
- `colors.neutral.textSecondary` - نص ثانوي

### ألوان الحالة

- `colors.status.success` - نجاح
- `colors.status.error` - خطأ
- `colors.status.warning` - تحذير
- `colors.status.info` - معلومات

### التدرجات

- `gradients.gold` - تدرج ذهبي
- `gradients.primary` - تدرج أساسي
- `gradients.hero` - تدرج Hero Section
- `gradients.cta` - تدرج CTA Section

## 🔍 أمثلة من المكونات الحالية

### Logo Component

```tsx
import { colors, gradients } from '@/styles/theme';

<div style={{ background: gradients.primary }}>
  <Sparkles style={{ color: colors.accent.primary, opacity: 0.3 }} />
  <Target style={{ color: colors.neutral.bg }} />
</div>
<h1 style={{ color: colors.neutral.bg }}>عنوان</h1>
<p style={{ color: colors.neutral.textMuted }}>وصف</p>
```

### Hero Section

```tsx
import { colors, gradients } from '@/styles/theme';

<section style={{ background: gradients.hero }}>
  <div style={{ backgroundColor: `${colors.accent.primary}26` }}>
    <span style={{ color: colors.accent.primary }}>نص</span>
  </div>
  <h1 style={{ color: colors.neutral.bg }}>عنوان</h1>
  <p style={{ color: colors.neutral.textMuted }}>وصف</p>
</section>;
```

### Project Card

```tsx
import { colors, gradients } from '@/styles/theme';

<div
  style={{
    backgroundColor: colors.neutral.surface,
    borderColor: colors.neutral.border,
  }}
>
  <div style={{ background: gradients.primary }}>
    <Building2 style={{ color: colors.neutral.bg }} />
  </div>
  <h3 style={{ color: colors.secondary.DEFAULT }}>عنوان</h3>
  <p style={{ color: colors.neutral.textSecondary }}>وصف</p>
  <div style={{ backgroundColor: colors.neutral.bg }}>معلومات</div>
  <button
    style={{
      backgroundColor: colors.primary.DEFAULT,
      color: colors.neutral.bg,
    }}
  >
    قدم الآن
  </button>
</div>;
```

## 🎓 نصائح إضافية

1. **استخدم TypeScript**: الثيم مدعوم بـ TypeScript، استخدم autocomplete في IDE
2. **راجع المكونات الموجودة**: انظر إلى المكونات الحالية كأمثلة
3. **اتساق الألوان**: استخدم نفس الألوان لنفس الأغراض في كل المشروع
4. **اختبار الوضوح**: تأكد من أن النصوص واضحة على الخلفيات
5. **الوصولية**: استخدم ألوان الحالة بشكل صحيح للرسائل

## 📞 الدعم

إذا كان لديك أي أسئلة حول استخدام الثيم، راجع:

- المكونات الموجودة في `src/components`
- ملفات الثيم في `src/styles/theme`
- هذا الدليل

---

**آخر تحديث**: 2025
