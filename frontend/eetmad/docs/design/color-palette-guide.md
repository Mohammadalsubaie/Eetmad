# 🎨 دليل لوحة الألوان الاحترافية

## نظرة عامة

هذا الدليل يوضح كيفية استخدام الألوان بشكل احترافي في المنصة.

---

## 🎯 اللوحة الأساسية

### الألوان الأساسية (Primary)

```
#34656D → primary.DEFAULT     ████████ (أخضر مزرق - اللون الرئيسي)
#284E54 → primary.dark        ████████ (أخضر مزرق داكن)
#6C8B89 → primary.light       ████████ (أخضر مزرق فاتح)
```

**الاستخدام:**

- الأزرار الرئيسية
- الروابط المهمة
- Icons البارزة
- Badges على الخلفيات الفاتحة

---

### الألوان الثانوية (Secondary)

```
#334443 → secondary.DEFAULT   ████████ (رمادي داكن)
```

**الاستخدام:**

- العناوين الرئيسية (على خلفية فاتحة)
- النصوص المهمة
- الحدود القوية

---

### ألوان الإبراز (Accent)

```
#FAEAB1 → accent.primary      ████████ (ذهبي فاتح)
#F7DD7D → accent.secondary    ████████ (ذهبي)
#F3D049 → accent.warm         ████████ (أصفر)
#FCFAE1 → accent.light        ████████ (ذهبي فاتح جداً)
```

**الاستخدام:**

- لفت الانتباه على الخلفيات الداكنة
- Highlights مهمة
- Badges على gradients
- عناصر تحتاج تمييز خاص

---

### الألوان المحايدة (Neutral)

```
#FAF8F1 → neutral.bg          ████████ (بيج فاتح - خلفية الصفحة)
#FFFFFF → neutral.surface     ████████ (أبيض - خلفية البطاقات)
#F0ECDD → neutral.surfaceAlt  ████████ (بيج - خلفية بديلة)
#E0DCC8 → neutral.border      ████████ (بيج داكن - الحدود)
#A4C5CA → neutral.textMuted   ████████ (أزرق رمادي فاتح)
#536765 → neutral.textSecondary ████████ (رمادي - نص ثانوي)
```

**الاستخدام:**

- خلفيات الصفحات والأقسام
- النصوص الثانوية والوصفية
- الحدود والفواصل
- النصوص على الخلفيات الداكنة (neutral.bg)

---

### ألوان الحالة (Status)

```
#3D8B64 → status.success      ████████ (أخضر - نجاح)
#C95454 → status.error        ████████ (أحمر - خطأ)
#F3D049 → status.warning      ████████ (أصفر - تحذير)
#34656D → status.info         ████████ (أزرق - معلومة)
```

**الاستخدام:**

- رسائل النجاح والخطأ
- إشعارات
- مؤشرات الحالة

---

## 📐 قواعد التركيب

### 1. على خلفية فاتحة (neutral.bg أو neutral.surface)

#### ✅ مثال صحيح

```tsx
<section style={{ backgroundColor: cssVars.neutral.bg }}>
  {/* Badge */}
  <div
    style={{
      borderColor: cssVars.primary.light, // ✅ فاتح للحد
      color: cssVars.primary.DEFAULT, // ✅ داكن للنص
    }}
  >
    البادج
  </div>

  {/* Heading */}
  <h2 style={{ color: cssVars.secondary.DEFAULT }}>
    {' '}
    {/* ✅ داكن */}
    العنوان
  </h2>

  {/* Text */}
  <p style={{ color: cssVars.neutral.textSecondary }}>
    {' '}
    {/* ✅ رمادي */}
    النص الوصفي
  </p>

  {/* Cards */}
  <div
    style={{
      backgroundColor: cssVars.neutral.surface, // ✅ أبيض
      borderColor: cssVars.neutral.border, // ✅ بيج
    }}
  />
</section>
```

#### ❌ مثال خاطئ

```tsx
<section style={{ backgroundColor: cssVars.neutral.bg }}>
  {/* ❌ استخدام accent كلون أساسي للبادج على خلفية فاتحة */}
  <div
    style={{
      borderColor: cssVars.accent.primary,
      color: cssVars.accent.primary,
    }}
  >
    البادج
  </div>

  {/* ❌ استخدام neutral.bg للعنوان على خلفية فاتحة */}
  <h2 style={{ color: cssVars.neutral.bg }}>العنوان</h2>
</section>
```

---

### 2. على خلفية داكنة (gradients)

#### ✅ مثال صحيح

```tsx
<section style={{ background: cssVars.gradient.hero }}>
  {/* Badge */}
  <div
    style={{
      borderColor: cssVars.accent.primary, // ✅ ذهبي فاتح
      color: cssVars.accent.primary, // ✅ ذهبي فاتح
    }}
  >
    البادج
  </div>

  {/* Heading */}
  <h2 style={{ color: cssVars.neutral.bg }}>
    {' '}
    {/* ✅ أبيض */}
    العنوان
  </h2>

  {/* Text */}
  <p style={{ color: cssVars.neutral.textMuted }}>
    {' '}
    {/* ✅ رمادي فاتح */}
    النص الوصفي
  </p>
</section>
```

#### ❌ مثال خاطئ

```tsx
<section style={{ background: cssVars.gradient.hero }}>
  {/* ❌ استخدام primary.DEFAULT على خلفية داكنة - تباين ضعيف */}
  <div
    style={{
      borderColor: cssVars.primary.light,
      color: cssVars.primary.DEFAULT,
    }}
  >
    البادج
  </div>

  {/* ❌ استخدام secondary.DEFAULT على خلفية داكنة */}
  <h2 style={{ color: cssVars.secondary.DEFAULT }}>العنوان</h2>
</section>
```

---

## 🎨 أنماط البطاقات (Cards)

### النمط 1: بطاقات على خلفية فاتحة

```tsx
const cardColors = [
  cssVars.primary.DEFAULT, // #34656D
  cssVars.primary.dark, // #284E54
  cssVars.status.success, // #3D8B64
  cssVars.secondary.DEFAULT, // #334443
];

// استخدام
<Card
  style={{
    backgroundColor: cssVars.neutral.surface, // أبيض
    borderColor: cssVars.neutral.border, // بيج
  }}
>
  <Icon
    style={{
      background: `linear-gradient(135deg, ${cardColor} 0%, ${cardColor} 100%)`,
    }}
  />
  <h3 style={{ color: cssVars.secondary.DEFAULT }}>العنوان</h3>
  <p style={{ color: cssVars.neutral.textSecondary }}>الوصف</p>
</Card>;
```

### النمط 2: بطاقات على خلفية داكنة

```tsx
<Card
  style={{
    backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 90%, transparent)`,
    borderColor: `color-mix(in srgb, ${cssVars.neutral.bg} 30%, transparent)`,
  }}
>
  <Icon
    style={{
      background: cssVars.gradient.primary, // gradient من الثيم
    }}
  />
  <h3 style={{ color: cssVars.secondary.DEFAULT }}>العنوان</h3>
  <p style={{ color: cssVars.neutral.textSecondary }}>الوصف</p>
</Card>
```

---

## 🔍 مصفوفة التباين (Contrast Matrix)

| الخلفية                     | العنوان             | النص                    | Badge             | Icon              |
| --------------------------- | ------------------- | ----------------------- | ----------------- | ----------------- |
| `neutral.bg` (#FAF8F1)      | `secondary.DEFAULT` | `neutral.textSecondary` | `primary.DEFAULT` | `primary.DEFAULT` |
| `neutral.surface` (#FFFFFF) | `secondary.DEFAULT` | `neutral.textSecondary` | `primary.DEFAULT` | `primary.DEFAULT` |
| `gradient.hero` (داكن)      | `neutral.bg`        | `neutral.textMuted`     | `accent.primary`  | `accent.primary`  |
| `gradient.cta` (داكن)       | `neutral.bg`        | `neutral.textMuted`     | `accent.warm`     | `accent.primary`  |

---

## 💡 نصائح احترافية

### 1. استخدم عائلة واحدة للبطاقات المتشابهة

```tsx
// ✅ جيد - من عائلة primary
const colors = [
  cssVars.primary.DEFAULT,
  cssVars.primary.dark,
  cssVars.status.success, // قريب من primary
  cssVars.secondary.DEFAULT,
];

// ❌ سيء - خليط عشوائي
const colors = [
  cssVars.primary.DEFAULT,
  cssVars.accent.primary,
  cssVars.accent.warm,
  cssVars.accent.secondary,
];
```

### 2. احترم التسلسل الهرمي

```
primary > secondary > accent
```

- **Primary**: للعناصر الأساسية والمهمة
- **Secondary**: للعناوين والنصوص
- **Accent**: للفت الانتباه فقط

### 3. استخدم opacity بحكمة

```tsx
// للخلفيات الشفافة
backgroundColor: `color-mix(in srgb, ${cssVars.neutral.surface} 80%, transparent)`;

// للحدود الخفيفة
borderColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`;

// للتظليل
backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 10%, transparent)`;
```

### 4. اختبر على كلا الثيمين

- الثيم الفاتح (light) - الافتراضي
- الثيم الداكن (dark) - المستقبلي

---

## 📊 أمثلة من المشروع

### ✅ ExploreCategoriesSection (محسّن)

```tsx
// Badge
borderColor: cssVars.primary.light,
color: cssVars.primary.DEFAULT,

// Category Cards
{ color: cssVars.primary.DEFAULT },
{ color: cssVars.primary.dark },
{ color: cssVars.status.success },
{ color: cssVars.secondary.DEFAULT },
```

### ✅ GettingStartedSection (محسّن)

```tsx
// Badge على خلفية داكنة
borderColor: cssVars.accent.primary,
color: cssVars.accent.primary,

// Card Colors
{ accentColor: cssVars.primary.DEFAULT },
{ accentColor: cssVars.secondary.DEFAULT },
```

### ✅ ProjectBenefitsSection (محسّن)

```tsx
// Badge
borderColor: cssVars.primary.light,
color: cssVars.primary.DEFAULT,
```

---

## 🎓 تمارين عملية

### تمرين 1: أنشئ Section Header

اختر الألوان المناسبة:

```tsx
// على خلفية: cssVars.neutral.bg
<div>
  {/* Badge */}
  <div
    style={{
      borderColor: ___________, // اختر اللون المناسب
      color: ___________,
    }}
  >
    إضاءة
  </div>

  {/* Heading */}
  <h2 style={{ color: ___________ }}>عنوان القسم</h2>

  {/* Description */}
  <p style={{ color: ___________ }}>وصف القسم</p>
</div>
```

<details>
<summary>الإجابة</summary>

```tsx
<div>
  <div
    style={{
      borderColor: cssVars.primary.light,
      color: cssVars.primary.DEFAULT,
    }}
  >
    إضاءة
  </div>

  <h2 style={{ color: cssVars.secondary.DEFAULT }}>عنوان القسم</h2>

  <p style={{ color: cssVars.neutral.textSecondary }}>وصف القسم</p>
</div>
```

</details>

---

## 📚 المراجع السريعة

### استيراد

```tsx
import { cssVars } from '@/styles/theme';
```

### الألوان الأكثر استخداماً

```tsx
// على خلفية فاتحة
cssVars.secondary.DEFAULT; // للعناوين
cssVars.neutral.textSecondary; // للنصوص
cssVars.primary.DEFAULT; // للأزرار والبادجات

// على خلفية داكنة
cssVars.neutral.bg; // للعناوين (أبيض)
cssVars.neutral.textMuted; // للنصوص
cssVars.accent.primary; // للبادجات
```

### Helper Function

```tsx
import { withOpacity } from '@/styles/theme/cssVariables';

// استخدام
backgroundColor: withOpacity(cssVars.primary.DEFAULT, 0.1);
// = color-mix(in srgb, var(--color-primary) 10%, transparent)
```

---

**آخر تحديث**: نوفمبر 2025
