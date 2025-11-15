# 🎨 UI Components Library

مكتبة مكونات UI القابلة لإعادة الاستخدام.

## 📦 المكونات المتاحة

### Core Components (الأساسية)
- **Badge** - badges للحالة والفئات
- **Button** - أزرار موحدة
- **Card** - بطاقات أساسية
- **Input** - حقول إدخال
- **Tag** - وسوم

### Layout Components (التخطيط)
- **IconContainer** - حاوية للأيقونات

### Section Components (الأقسام) 🆕
- **SectionBadge** - Badge لرؤوس الأقسام
- **SectionHeader** - رأس كامل للقسم (badge + title + subtitle)
- **GradientIcon** - أيقونة مع خلفية gradient
- **FeatureCard** - بطاقة ميزة كاملة

## 🚀 الاستخدام السريع

```tsx
import {
  Badge,
  Button,
  Card,
  SectionBadge,
  SectionHeader,
  GradientIcon,
  FeatureCard,
} from '@/components/ui';
```

## 📚 التوثيق

للتوثيق الكامل، راجع:
- **دليل المكونات**: `/docs/design/UI_COMPONENTS_GUIDE.md`
- **تعليمات التصميم**: `/docs/design/component-building-guidelines.md`
- **دليل الألوان**: `/docs/design/color-palette-guide.md`

## ✨ أمثلة سريعة

### Section Header
```tsx
<SectionHeader
  badge="الميزات"
  badgeIcon={Sparkles}
  title="لماذا منصتنا؟"
  subtitle="اكتشف المميزات الفريدة"
  variant="light"
  align="center"
/>
```

### Feature Card
```tsx
<FeatureCard
  title="الشفافية الكاملة"
  description="جميع العمليات واضحة ومراقبة"
  icon={ShieldCheck}
  iconColor={cssVars.status.success}
  showArrow
/>
```

### Gradient Icon
```tsx
<GradientIcon
  icon={Sparkles}
  background={cssVars.gradient.primary}
  size="lg"
  animated
/>
```

## 🎯 المبادئ

1. **قابلية إعادة الاستخدام** - كل مكون قابل للاستخدام في سياقات متعددة
2. **الاتساق** - تصميم وسلوك موحد
3. **المرونة** - سهل التخصيص عبر props
4. **الجودة** - TypeScript + best practices
5. **التوثيق** - كل مكون موثق بالكامل

---

**آخر تحديث**: نوفمبر 2025

