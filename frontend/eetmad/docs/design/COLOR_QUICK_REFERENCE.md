# 🎨 مرجع سريع للألوان

## 📋 جدول الاختيار السريع

### على خلفية فاتحة (`neutral.bg` أو `neutral.surface`)

| العنصر | اللون | الكود |
|--------|-------|-------|
| 🔤 عنوان رئيسي | رمادي داكن | `cssVars.secondary.DEFAULT` |
| 📝 نص وصفي | رمادي | `cssVars.neutral.textSecondary` |
| 🏷️ Badge/Tag | أزرق-أخضر | `cssVars.primary.DEFAULT` |
| 🔗 رابط/زر | أزرق-أخضر | `cssVars.primary.DEFAULT` |
| 🎨 أيقونة بارزة | أزرق-أخضر | `cssVars.primary.DEFAULT` |
| 📦 خلفية كارت | أبيض | `cssVars.neutral.surface` |
| ➖ حد/Border | بيج | `cssVars.neutral.border` |

### على خلفية داكنة (`gradient.hero` أو `gradient.cta`)

| العنصر | اللون | الكود |
|--------|-------|-------|
| 🔤 عنوان رئيسي | أبيض | `cssVars.neutral.bg` |
| 📝 نص وصفي | رمادي فاتح | `cssVars.neutral.textMuted` |
| 🏷️ Badge/Tag | ذهبي | `cssVars.accent.primary` |
| 🔗 رابط/زر | ذهبي | `cssVars.accent.primary` |
| 🎨 أيقونة بارزة | ذهبي | `cssVars.accent.primary` |
| 📦 خلفية كارت | شفاف | `color-mix(..., 90%, transparent)` |
| ➖ حد/Border | شفاف فاتح | `color-mix(..., 30%, transparent)` |

---

## 🎯 كود جاهز للنسخ

### Section Header - خلفية فاتحة
```tsx
<div style={{ backgroundColor: cssVars.neutral.bg }}>
  {/* Badge */}
  <div
    className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2"
    style={{
      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
      borderColor: cssVars.primary.light,
      color: cssVars.primary.DEFAULT,
    }}
  >
    <Icon className="h-4 w-4" />
    {t('badge')}
  </div>
  
  {/* Title */}
  <h2 
    className="text-4xl font-bold" 
    style={{ color: cssVars.secondary.DEFAULT }}
  >
    {t('title')}
  </h2>
  
  {/* Description */}
  <p 
    className="text-lg" 
    style={{ color: cssVars.neutral.textSecondary }}
  >
    {t('description')}
  </p>
</div>
```

### Section Header - خلفية داكنة
```tsx
<div style={{ background: cssVars.gradient.hero }}>
  {/* Badge */}
  <div
    className="inline-flex items-center gap-2 rounded-full border-2 px-5 py-2"
    style={{
      backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 80%, transparent)`,
      borderColor: cssVars.accent.primary,
      color: cssVars.accent.primary,
    }}
  >
    <Icon className="h-4 w-4" />
    {t('badge')}
  </div>
  
  {/* Title */}
  <h2 
    className="text-4xl font-bold" 
    style={{ color: cssVars.neutral.bg }}
  >
    {t('title')}
  </h2>
  
  {/* Description */}
  <p 
    className="text-lg" 
    style={{ color: cssVars.neutral.textMuted }}
  >
    {t('description')}
  </p>
</div>
```

### Card Component - خلفية فاتحة
```tsx
<div
  className="rounded-3xl border-2 p-6 shadow-lg"
  style={{
    backgroundColor: cssVars.neutral.surface,
    borderColor: cssVars.neutral.border,
  }}
>
  {/* Icon */}
  <div
    className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl"
    style={{
      background: `linear-gradient(135deg, ${cssVars.primary.DEFAULT} 0%, ${cssVars.primary.dark} 100%)`,
    }}
  >
    <Icon className="h-8 w-8" style={{ color: cssVars.neutral.bg }} />
  </div>
  
  {/* Title */}
  <h3 
    className="mb-2 text-2xl font-bold" 
    style={{ color: cssVars.secondary.DEFAULT }}
  >
    {t('title')}
  </h3>
  
  {/* Description */}
  <p 
    className="text-base" 
    style={{ color: cssVars.neutral.textSecondary }}
  >
    {t('description')}
  </p>
</div>
```

### Button - Primary
```tsx
<button
  className="rounded-xl px-6 py-3 font-bold"
  style={{
    backgroundColor: cssVars.primary.DEFAULT,
    color: cssVars.neutral.bg,
  }}
>
  {t('buttonText')}
</button>
```

### Button - Outline
```tsx
<button
  className="rounded-xl border-2 px-6 py-3 font-bold"
  style={{
    borderColor: cssVars.primary.DEFAULT,
    color: cssVars.primary.DEFAULT,
    backgroundColor: 'transparent',
  }}
>
  {t('buttonText')}
</button>
```

---

## 🔢 ألوان البطاقات المتعددة (Recommended Set)

```tsx
const cardColors = [
  cssVars.primary.DEFAULT,      // #34656D - أزرق-أخضر
  cssVars.primary.dark,         // #284E54 - أزرق-أخضر داكن
  cssVars.status.success,       // #3D8B64 - أخضر
  cssVars.secondary.DEFAULT,    // #334443 - رمادي داكن
];

// استخدام
{cardColors.map((color, index) => (
  <Card key={index}>
    <div style={{ background: `linear-gradient(135deg, ${color} 0%, ...)` }}>
      <Icon />
    </div>
  </Card>
))}
```

---

## 🎨 Opacity Levels

```tsx
// Very Light (10%)
backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`

// Light (20%)
borderColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`

// Medium (50%)
backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 50%, transparent)`

// Semi-transparent (80%)
backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 80%, transparent)`

// Almost Opaque (95%)
backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 95%, transparent)`
```

---

## ⚡ Decision Tree (شجرة القرار)

```
هل الخلفية داكنة (gradient)؟
├─ نعم
│  ├─ عنوان → neutral.bg
│  ├─ نص → neutral.textMuted
│  └─ badge → accent.primary أو accent.warm
│
└─ لا (خلفية فاتحة)
   ├─ عنوان → secondary.DEFAULT
   ├─ نص → neutral.textSecondary
   └─ badge → primary.DEFAULT
```

---

## 🚫 الأخطاء الشائعة

| ❌ خطأ | ✅ صحيح |
|--------|---------|
| `cssVars.accent.primary` على badge فاتح | `cssVars.primary.DEFAULT` |
| `cssVars.primary.DEFAULT` على خلفية داكنة | `cssVars.accent.primary` |
| خلط accent colors عشوائياً | استخدام عائلة واحدة |
| `cssVars.secondary.DEFAULT` على gradient | `cssVars.neutral.bg` |

---

## 📱 للنسخ السريع

```tsx
// استيراد
import { cssVars } from '@/styles/theme';

// الألوان الأكثر استخداماً
cssVars.secondary.DEFAULT      // عناوين فاتحة
cssVars.neutral.textSecondary  // نص فاتح
cssVars.primary.DEFAULT        // أزرار فاتحة
cssVars.neutral.bg             // عناوين داكنة
cssVars.neutral.textMuted      // نص داكن
cssVars.accent.primary         // badges داكنة
```

---

**استخدم هذا المرجع كدليل سريع عند إنشاء مكونات جديدة!** 🚀

