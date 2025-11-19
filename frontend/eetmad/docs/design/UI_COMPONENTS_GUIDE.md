# 🎨 دليل مكونات UI القابلة لإعادة الاستخدام

## 📋 نظرة عامة

تم إنشاء مجموعة من مكونات UI القابلة لإعادة الاستخدام لتوحيد المظهر والسلوك عبر التطبيق وتقليل تكرار الكود.

**الموقع**: `frontend/eetmad/src/components/ui/`

---

## 🆕 المكونات الجديدة

### 1. SectionBadge

Badge مخصص لرؤوس الأقسام مع دعم كامل للثيمات الفاتحة والداكنة.

#### الاستيراد

```tsx
import { SectionBadge } from '@/components/ui';
```

#### Props

```typescript
interface SectionBadgeProps {
  children: React.ReactNode; // النص المعروض
  icon?: LucideIcon; // الأيقونة (اختياري)
  variant?: 'light' | 'dark'; // نوع الخلفية
  color?: 'primary' | 'accent' | 'warm'; // اللون
  animated?: boolean; // نقطة متحركة
  className?: string; // CSS classes إضافية
}
```

#### الاستخدام

```tsx
// على خلفية فاتحة
<SectionBadge
  icon={Sparkles}
  variant="light"
  color="primary"
  animated
>
  الميزات الجديدة
</SectionBadge>

// على خلفية داكنة
<SectionBadge
  icon={Zap}
  variant="dark"
  color="accent"
>
  عاجل
</SectionBadge>
```

#### اختيار الألوان

| variant | color     | متى يستخدم                    |
| ------- | --------- | ----------------------------- |
| `light` | `primary` | أقسام عادية على خلفية فاتحة   |
| `light` | `accent`  | للفت الانتباه على خلفية فاتحة |
| `light` | `warm`    | تحذيرات أو معلومات مهمة       |
| `dark`  | `accent`  | على gradients داكنة (افتراضي) |
| `dark`  | `warm`    | تنويع على gradients داكنة     |

---

### 2. SectionHeader

رأس كامل للقسم مع badge + عنوان + وصف.

#### الاستيراد

```tsx
import { SectionHeader } from '@/components/ui';
```

#### Props

```typescript
interface SectionHeaderProps {
  badge?: string; // نص الـ badge
  badgeIcon?: LucideIcon; // أيقونة الـ badge
  title: string; // العنوان (إجباري)
  subtitle?: string; // الوصف
  variant?: 'light' | 'dark'; // نوع الخلفية
  align?: 'left' | 'center' | 'right'; // المحاذاة
  badgeColor?: 'primary' | 'accent' | 'warm'; // لون الـ badge
  badgeAnimated?: boolean; // نقطة متحركة
  className?: string; // CSS classes إضافية
}
```

#### الاستخدام

```tsx
// بسيط - عنوان فقط
<SectionHeader
  title="لماذا منصتنا؟"
/>

// كامل - مع badge ووصف
<SectionHeader
  badge="الميزات"
  badgeIcon={Sparkles}
  title="لماذا منصتنا؟"
  subtitle="اكتشف المميزات الفريدة التي تجعلنا الخيار الأمثل"
  variant="light"
  align="center"
  badgeColor="primary"
/>

// على خلفية داكنة
<SectionHeader
  badge="جديد"
  badgeIcon={Zap}
  title="جاهز للانطلاق"
  subtitle="ابدأ رحلتك معنا الآن"
  variant="dark"
  align="center"
  badgeColor="accent"
  badgeAnimated
/>
```

#### أنماط شائعة

```tsx
// Header على خلفية فاتحة - محاذاة يسار
<SectionHeader
  badge={t('badge')}
  title={t('title')}
  subtitle={t('subtitle')}
  variant="light"
  align="left"
  badgeColor="primary"
  className="max-w-2xl"
/>

// Header على خلفية داكنة - محاذاة وسط
<SectionHeader
  badge={t('badge')}
  badgeIcon={Sparkles}
  title={t('title')}
  subtitle={t('subtitle')}
  variant="dark"
  align="center"
  badgeColor="accent"
/>
```

---

### 3. GradientIcon

أيقونة مع خلفية gradient وحركة.

#### الاستيراد

```tsx
import { GradientIcon } from '@/components/ui';
```

#### Props

```typescript
interface GradientIconProps {
  icon: LucideIcon; // الأيقونة (إجباري)
  background?: string; // اللون أو gradient
  size?: 'sm' | 'md' | 'lg' | 'xl'; // الحجم
  iconColor?: string; // لون الأيقونة
  animated?: boolean; // حركة عند hover
  className?: string; // CSS classes إضافية
}
```

#### الاستخدام

```tsx
// بسيط مع gradient من الثيم
<GradientIcon
  icon={Sparkles}
  background={cssVars.gradient.primary}
  size="md"
/>

// مع لون واحد
<GradientIcon
  icon={Code}
  background={cssVars.primary.DEFAULT}
  size="lg"
  animated={false}
/>

// gradient مخصص
<GradientIcon
  icon={Shield}
  background={`linear-gradient(135deg, ${cssVars.status.success} 0%, ${cssVars.primary.DEFAULT} 100%)`}
  size="xl"
/>
```

#### الأحجام

| Size | Container | Icon | الاستخدام                     |
| ---- | --------- | ---- | ----------------------------- |
| `sm` | 48px      | 24px | أيقونات صغيرة، badges         |
| `md` | 64px      | 32px | البطاقات، الأقسام العادية     |
| `lg` | 80px      | 40px | رؤوس أقسام مهمة               |
| `xl` | 96px      | 48px | صفحات landing، headers رئيسية |

---

### 4. FeatureCard

بطاقة ميزة كاملة مع أيقونة، عنوان، وصف، وتأثيرات.

#### الاستيراد

```tsx
import { FeatureCard } from '@/components/ui';
```

#### Props

```typescript
interface FeatureCardProps {
  title: string; // العنوان (إجباري)
  description: string; // الوصف (إجباري)
  icon: LucideIcon; // الأيقونة (إجباري)
  iconColor?: string; // لون/gradient الأيقونة
  showArrow?: boolean; // إظهار سهم في الزاوية
  footer?: string; // نص إضافي أسفل البطاقة
  animationDelay?: number; // تأخير الحركة
  className?: string; // CSS classes إضافية
  onClick?: () => void; // معالج النقر
}
```

#### الاستخدام

```tsx
// بسيط
<FeatureCard
  title="الشفافية الكاملة"
  description="جميع العمليات واضحة ومراقبة بشكل دقيق"
  icon={ShieldCheck}
  iconColor={cssVars.status.success}
/>

// مع كل المميزات
<FeatureCard
  title="الشفافية الكاملة"
  description="جميع العمليات واضحة ومراقبة بشكل دقيق"
  icon={ShieldCheck}
  iconColor={cssVars.status.success}
  showArrow
  footer="اعرف المزيد ←"
  animationDelay={0.1}
  onClick={() => router.push('/features')}
/>

// في Grid
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
  {features.map((feature, index) => (
    <FeatureCard
      key={feature.key}
      title={t(`features.${feature.key}.title`)}
      description={t(`features.${feature.key}.description`)}
      icon={feature.icon}
      iconColor={feature.color}
      showArrow
      animationDelay={index * 0.1}
    />
  ))}
</div>
```

---

## 📚 أمثلة عملية

### مثال 1: Section كامل على خلفية فاتحة

```tsx
<section style={{ backgroundColor: cssVars.neutral.bg }}>
  <div className="container py-20">
    {/* Header */}
    <SectionHeader
      badge="المميزات"
      badgeIcon={Sparkles}
      title="لماذا منصتنا؟"
      subtitle="اكتشف المميزات الفريدة"
      variant="light"
      align="center"
      badgeColor="primary"
      className="mb-16"
    />

    {/* Features Grid */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          iconColor={feature.color}
          showArrow
          animationDelay={index * 0.1}
        />
      ))}
    </div>
  </div>
</section>
```

### مثال 2: Section على خلفية داكنة

```tsx
<section style={{ background: cssVars.gradient.hero }}>
  <div className="container py-20">
    {/* Header */}
    <SectionHeader
      badge="جديد"
      badgeIcon={Zap}
      title="جاهز للانطلاق"
      subtitle="ابدأ رحلتك معنا الآن"
      variant="dark"
      align="center"
      badgeColor="accent"
      badgeAnimated
      className="mb-16"
    />

    {/* Content */}
    <div className="grid gap-8 lg:grid-cols-2">
      {cards.map((card) => (
        <div key={card.id} className="...">
          <div className="flex items-center gap-4">
            <GradientIcon icon={card.icon} background={card.gradient} size="lg" animated />
            <h3>{card.title}</h3>
          </div>
          {/* ... */}
        </div>
      ))}
    </div>
  </div>
</section>
```

### مثال 3: Badge منفصل

```tsx
// في Hero Section
<div>
  <SectionBadge variant="dark" color="accent" animated>
    🔥 عرض لفترة محدودة
  </SectionBadge>

  <h1>العنوان الرئيسي</h1>
</div>
```

---

## 🎯 قرار الاستخدام

### متى تستخدم SectionHeader vs مكونات منفصلة؟

#### استخدم `SectionHeader` عندما:

- ✅ تحتاج badge + title + subtitle معاً
- ✅ تريد تنسيق قياسي موحد
- ✅ السرعة في التطوير مهمة
- ✅ معظم الأقسام لها نفس البنية

#### استخدم مكونات منفصلة عندما:

- ✅ تحتاج تخصيص متقدم في التخطيط
- ✅ بعض العناصر اختيارية بشكل معقد
- ✅ تحتاج عناصر إضافية بين badge والعنوان
- ✅ التخطيط غير قياسي

---

## 🔄 الترقية من الكود القديم

### قبل (الكود المكرر)

```tsx
<div className="mb-16 text-center">
  <div
    className="mb-6 inline-flex items-center gap-2 rounded-full border-2 px-6 py-2 text-sm font-bold shadow-lg"
    style={{
      backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
      borderColor: cssVars.primary.light,
      color: cssVars.primary.DEFAULT,
    }}
  >
    <Sparkles className="h-4 w-4" />
    {t('badge')}
  </div>
  <h2 className="mb-6 text-4xl font-bold lg:text-5xl" style={{ color: cssVars.secondary.DEFAULT }}>
    {t('title')}
  </h2>
  <p
    className="mx-auto max-w-3xl text-xl leading-relaxed"
    style={{ color: cssVars.neutral.textSecondary }}
  >
    {t('subtitle')}
  </p>
</div>
```

### بعد (مع المكونات الجديدة)

```tsx
<SectionHeader
  badge={t('badge')}
  badgeIcon={Sparkles}
  title={t('title')}
  subtitle={t('subtitle')}
  variant="light"
  align="center"
  badgeColor="primary"
  className="mb-16"
/>
```

**الفوائد:**

- ✅ 23 سطر → 9 أسطر (تقليل 60%)
- ✅ أسهل في القراءة والصيانة
- ✅ ألوان متسقة تلقائياً
- ✅ حركات موحدة
- ✅ أسهل في التعديل لاحقاً

---

## 📊 المكونات التي تم تحديثها

تم تحديث المكونات التالية لاستخدام المكونات الجديدة:

### ✅ ExploreCategoriesSection

- ❌ قبل: 167 سطر، كود مكرر للـ badge والعنوان
- ✅ بعد: 135 سطر، استخدام `SectionHeader` و `GradientIcon`

### ✅ ProjectBenefitsSection

- ❌ قبل: 143 سطر، 50+ سطر للبطاقات
- ✅ بعد: 76 سطر، استخدام `SectionHeader` و `FeatureCard`

### ✅ FAQSection

- ❌ قبل: badge وheader مكرر
- ✅ بعد: استخدام `SectionHeader`

### ✅ GettingStartedSection

- ❌ قبل: أيقونات مكررة
- ✅ بعد: استخدام `SectionHeader` و `GradientIcon`

### ✅ AudienceSection

- ❌ قبل: badge وأيقونات مكررة
- ✅ بعد: استخدام `SectionHeader` و `GradientIcon`

---

## 🎨 التخصيص

### تخصيص الألوان

```tsx
// استخدام ألوان من الثيم
<SectionBadge color="primary" />   // اللون الأساسي
<SectionBadge color="accent" />    // ذهبي
<SectionBadge color="warm" />      // أصفر

// تخصيص في FeatureCard
<FeatureCard
  iconColor={cssVars.status.success}  // أخضر
/>
```

### تخصيص الحجم

```tsx
// أحجام مختلفة للأيقونات
<GradientIcon size="sm" />  // صغير
<GradientIcon size="md" />  // متوسط (افتراضي)
<GradientIcon size="lg" />  // كبير
<GradientIcon size="xl" />  // كبير جداً
```

### إضافة CSS classes

```tsx
<SectionHeader
  className="max-w-2xl mx-auto"
  {...props}
/>

<FeatureCard
  className="hover:scale-105"
  {...props}
/>
```

---

## ✅ Checklist للمكونات الجديدة

عند استخدام المكونات الجديدة، تأكد من:

- [ ] استيراد من `@/components/ui`
- [ ] اختيار `variant` الصحيح (light/dark) حسب الخلفية
- [ ] اختيار `color` مناسب للسياق
- [ ] استخدام `animated` للعناصر المهمة فقط
- [ ] إضافة `animationDelay` للعناصر المتعددة
- [ ] استخدام الترجمة `t()` للنصوص
- [ ] اختبار على الثيم الفاتح والداكن

---

## 📚 المراجع

- **تعليمات التصميم**: `frontend/eetmad/docs/design/component-building-guidelines.md`
- **دليل الألوان**: `frontend/eetmad/docs/design/color-palette-guide.md`
- **مرجع سريع للألوان**: `frontend/eetmad/docs/design/COLOR_QUICK_REFERENCE.md`
- **Theme System**: `frontend/eetmad/src/styles/theme/`

---

**آخر تحديث**: نوفمبر 2025
**الإصدار**: 1.0
