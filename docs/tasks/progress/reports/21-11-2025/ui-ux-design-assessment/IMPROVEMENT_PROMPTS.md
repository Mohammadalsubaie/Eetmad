# Prompts لتحسين UI/UX Design System
## UI/UX Design System Improvement Prompts

**المصدر:** تقرير تقييم UI/UX - 21 نوفمبر 2025  
**التقييم الحالي:** 75/100 ✅  
**التقييم المتوقع:** 92/100 ✅  
**الوقت الإجمالي:** 6-9 أسابيع

---

## 📋 الفهرس | Index

### Phase 1: Critical Fixes (4-6 أسابيع) 🔴
1. [تحسين إمكانية الوصول (Accessibility)](#1-تحسين-إمكانية-الوصول-accessibility)
2. [تحسين تجربة الجوال (Mobile UX)](#2-تحسين-تجربة-الجوال-mobile-ux)
3. [تحسين Dark Mode](#3-تحسين-dark-mode)
4. [توحيد الأنماط (Style Standardization)](#4-توحيد-الأنماط-style-standardization)

### Phase 2: High Priority (2-3 أسابيع) 🟠
5. [تحسين Animations](#5-تحسين-animations)
6. [تحسين Micro-interactions](#6-تحسين-micro-interactions)
7. [تحسين الاتساق (Consistency)](#7-تحسين-الاتساق-consistency)

### Phase 3: Polish & Testing (1-2 أسبوع) 🟡
8. [المراجعة النهائية والاختبارات](#8-المراجعة-النهائية-والاختبارات)

---

## Phase 1: Critical Fixes 🔴

### 1. تحسين إمكانية الوصول (Accessibility)

#### Prompt 1.1: تحسين Contrast Ratios

```
قم بتحسين Contrast Ratios لجميع الألوان في النظام لضمان تحقيق معايير WCAG AA على الأقل.

المهام المطلوبة:
1. مراجعة جميع ألوان النصوص في Light Theme:
   - تحسين Text Muted Color (#A4C5CA) لتحقيق ratio 4.5:1 على الأقل
   - مراجعة Text Secondary (#536765) وضمان ratio 4.5:1
   - مراجعة جميع ألوان النصوص في المكونات

2. مراجعة جميع ألوان النصوص في Dark Theme:
   - ضمان تحقيق WCAG AA لجميع الألوان
   - تحسين أي ألوان لا تحقق المعايير

3. إنشاء ملف توثيق للألوان مع Contrast Ratios:
   - توثيق كل لون مع ratio الخاص به
   - تحديد ما إذا كان يحقق WCAG AA/AAA
   - إضافة ملاحظات للتحسينات المطلوبة

4. تحديث CSS Variables في:
   - frontend/eetmad/src/lib/theme/css-vars.ts
   - أو أي ملف يحتوي على تعريفات الألوان

5. اختبار الألوان باستخدام أدوات مثل:
   - WebAIM Contrast Checker
   - axe DevTools
   - Lighthouse Accessibility Audit

الملفات المتأثرة:
- ملفات تعريف الألوان (CSS Variables)
- مكونات UI التي تستخدم الألوان
- ملفات الثيمات (Light/Dark)

المعايير:
- ✅ جميع ألوان النصوص تحقق WCAG AA (4.5:1 للـ Normal Text)
- ✅ جميع ألوان النصوص الكبيرة تحقق WCAG AA (3:1 للـ Large Text)
- ✅ توثيق كامل لجميع Contrast Ratios
```

#### Prompt 1.2: إضافة ARIA Labels و Roles

```
قم بإضافة ARIA Labels و ARIA Roles لجميع المكونات في النظام لتحسين دعم Screen Readers.

المهام المطلوبة:
1. مراجعة جميع مكونات UI الأساسية:
   - Button: إضافة aria-label أو aria-labelledby
   - Input: إضافة aria-label و aria-describedby للرسائل
   - Card: إضافة role="article" أو role="region"
   - Navigation: إضافة role="navigation" و aria-label
   - Modal/Dialog: إضافة role="dialog" و aria-modal="true"
   - Form: إضافة role="form" و aria-label
   - List: إضافة role="list" و role="listitem"

2. إضافة ARIA Labels للمكونات التفاعلية:
   - الأزرار بدون نص واضح (Icons Only)
   - الأزرار مع Icons
   - Links بدون نص واضح
   - Toggle Buttons
   - Dropdown Menus

3. إضافة ARIA Describedby للرسائل:
   - Error Messages في Forms
   - Help Text
   - Validation Messages
   - Success Messages

4. إضافة ARIA States:
   - aria-expanded للـ Dropdowns و Collapsible
   - aria-selected للـ Tabs و Selects
   - aria-checked للـ Checkboxes و Radio Buttons
   - aria-disabled للعناصر المعطلة
   - aria-invalid للـ Inputs مع أخطاء

5. إضافة ARIA Live Regions:
   - aria-live="polite" للرسائل غير الحرجة
   - aria-live="assertive" للرسائل الحرجة
   - aria-atomic="true" عند الحاجة

6. تحديث المكونات في:
   - frontend/eetmad/src/components/ui/
   - frontend/eetmad/src/components/shared/
   - frontend/eetmad/src/components/features/

7. اختبار مع Screen Readers:
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

المعايير:
- ✅ جميع المكونات التفاعلية لها ARIA Labels
- ✅ جميع المكونات لها ARIA Roles المناسبة
- ✅ جميع الرسائل مربوطة بـ aria-describedby
- ✅ جميع States محددة بوضوح
- ✅ اختبار كامل مع Screen Readers
```

#### Prompt 1.3: تحسين Focus States

```
قم بتحسين Focus States لجميع المكونات لتحسين تجربة Keyboard Navigation.

المهام المطلوبة:
1. تحسين Focus Outline:
   - إضافة focus-visible styles واضحة
   - استخدام outline-offset لتحسين الرؤية
   - ضمان contrast جيد للـ Focus Outline
   - استخدام ألوان مناسبة (Primary Color أو Accent)

2. تحسين Focus Visibility:
   - زيادة سمك Outline (2px على الأقل)
   - إضافة Focus Ring واضح
   - استخدام Box Shadow للـ Focus (اختياري)
   - ضمان Visibility في Light و Dark Mode

3. تحسين Focus Order:
   - مراجعة Tab Order في جميع الصفحات
   - ضمان ترتيب منطقي للعناصر
   - إضافة tabindex="-1" للعناصر غير التفاعلية
   - إضافة tabindex="0" عند الحاجة

4. إضافة Focus Styles للمكونات:
   - Buttons: focus ring واضح
   - Inputs: focus border واضح
   - Links: focus underline أو outline
   - Cards: focus indicator عند الحاجة
   - Navigation Items: focus indicator واضح

5. تحديث Tailwind Config:
   - إضافة focus-visible utilities
   - إضافة focus ring colors
   - إضافة focus ring sizes

6. تحديث المكونات:
   - إضافة focus-visible:outline-2
   - إضافة focus-visible:outline-offset-2
   - إضافة focus-visible:outline-primary أو accent

7. اختبار Keyboard Navigation:
   - Tab للتنقل للأمام
   - Shift+Tab للتنقل للخلف
   - Enter/Space للتنشيط
   - Arrow Keys للتنقل في Lists و Menus

المعايير:
- ✅ جميع المكونات لها Focus States واضحة
- ✅ Focus Outline مرئي في Light و Dark Mode
- ✅ Tab Order منطقي في جميع الصفحات
- ✅ اختبار كامل مع Keyboard Navigation
```

#### Prompt 1.4: إضافة Skip Links

```
قم بإضافة Skip Links للتنقل السريع في الصفحات لتحسين إمكانية الوصول.

المهام المطلوبة:
1. إنشاء مكون SkipLink:
   - مكون قابل لإعادة الاستخدام
   - يظهر عند الضغط على Tab
   - يختفي بعد التنقل
   - تصميم واضح ومرئي

2. إضافة Skip Links للصفحات:
   - Skip to main content
   - Skip to navigation (اختياري)
   - Skip to footer (اختياري)
   - Skip to search (اختياري)

3. تنفيذ SkipLink Component:
   - استخدام CSS للظهور عند Focus
   - استخدام JavaScript للتنقل السلس
   - دعم RTL
   - تصميم متجاوب

4. إضافة Skip Links في Layout:
   - في Main Layout Component
   - في جميع الصفحات الرئيسية
   - في الصفحات المعقدة

5. اختبار Skip Links:
   - اختبار مع Keyboard Navigation
   - اختبار مع Screen Readers
   - اختبار في Light و Dark Mode

الملفات المطلوبة:
- frontend/eetmad/src/components/shared/SkipLink.tsx
- frontend/eetmad/src/app/[locale]/layout.tsx

المعايير:
- ✅ Skip Links موجودة في جميع الصفحات
- ✅ Skip Links تعمل بشكل صحيح
- ✅ Skip Links مرئية عند Focus
- ✅ اختبار كامل مع Keyboard Navigation و Screen Readers
```

---

### 2. تحسين تجربة الجوال (Mobile UX)

#### Prompt 2.1: تحسين Touch Targets

```
قم بتحسين Touch Targets لجميع العناصر التفاعلية لتحسين تجربة الجوال.

المهام المطلوبة:
1. مراجعة جميع الأزرار:
   - ضمان حجم 44x44px كحد أدنى على الجوال
   - زيادة Padding للأزرار الصغيرة
   - إضافة min-height و min-width للأزرار
   - استخدام responsive padding (px-4 py-3 على الجوال)

2. مراجعة جميع الروابط:
   - ضمان حجم 44x44px كحد أدنى
   - زيادة Padding للروابط
   - إضافة min-height للروابط

3. مراجعة جميع الأيقونات:
   - ضمان حجم 24px على الأقل
   - إضافة Padding حول الأيقونات
   - ضمان Touch Target 44x44px للأيقونات التفاعلية

4. مراجعة Form Inputs:
   - ضمان min-height 44px
   - زيادة Padding للـ Inputs
   - تحسين Touch Targets للـ Checkboxes و Radio Buttons

5. تحديث المكونات:
   - Button Component: إضافة mobile-specific styles
   - Link Components: إضافة mobile-specific styles
   - Icon Buttons: إضافة padding إضافي
   - Form Components: تحسين Touch Targets

6. إضافة Responsive Utilities:
   - mobile:min-h-[44px]
   - mobile:min-w-[44px]
   - mobile:px-4 mobile:py-3

7. اختبار على أجهزة مختلفة:
   - iPhone (iOS)
   - Android Phones
   - Tablets
   - اختبار مع Touch

المعايير:
- ✅ جميع الأزرار 44x44px على الأقل
- ✅ جميع الروابط 44x44px على الأقل
- ✅ جميع الأيقونات التفاعلية 44x44px
- ✅ جميع Form Inputs 44px height على الأقل
- ✅ اختبار كامل على أجهزة مختلفة
```

#### Prompt 2.2: تحسين Mobile Navigation

```
قم بتحسين Mobile Navigation بإضافة Mobile Menu و Hamburger Menu.

المهام المطلوبة:
1. إنشاء Mobile Menu Component:
   - Hamburger Menu Icon
   - Slide-in Menu أو Overlay Menu
   - Close Button
   - Animation سلس

2. تحسين Header Navigation:
   - إخفاء Desktop Navigation على الجوال
   - إظهار Hamburger Menu على الجوال
   - إضافة Mobile Menu Toggle

3. تصميم Mobile Menu:
   - Full-screen أو Slide-in
   - Navigation Items واضحة
   - Touch-friendly spacing
   - Close Button واضح

4. إضافة Animations:
   - Slide-in Animation
   - Fade Animation
   - Smooth Transitions
   - استخدام Framer Motion

5. تحسين UX:
   - إضافة Backdrop/Overlay
   - إغلاق عند الضغط على Overlay
   - إغلاق عند الضغط على Escape
   - Focus Management

6. تحديث Navigation Components:
   - Header Component
   - Navigation Component
   - Mobile Menu Component

7. اختبار Mobile Navigation:
   - اختبار على أجهزة مختلفة
   - اختبار Touch Interactions
   - اختبار Animations
   - اختبار Accessibility

الملفات المطلوبة:
- frontend/eetmad/src/components/shared/MobileMenu.tsx
- frontend/eetmad/src/components/shared/Header.tsx (تحديث)

المعايير:
- ✅ Mobile Menu موجود ويعمل
- ✅ Hamburger Menu واضح وسهل الاستخدام
- ✅ Animations سلسة
- ✅ Touch-friendly
- ✅ اختبار كامل على أجهزة مختلفة
```

#### Prompt 2.3: تحسين Spacing للجوال

```
قم بتحسين Spacing للجوال لتحسين استخدام المساحة وتحسين القراءة.

المهام المطلوبة:
1. مراجعة Padding & Margins:
   - تقليل Padding على الجوال
   - تقليل Margins بين العناصر
   - استخدام responsive spacing (p-4 على Desktop, p-3 على Mobile)
   - تحسين Container Padding

2. مراجعة Typography Spacing:
   - تقليل Line Heights على الجوال
   - تقليل Letter Spacing
   - تحسين Paragraph Spacing
   - تحسين Heading Spacing

3. مراجعة Component Spacing:
   - تقليل Spacing في Cards
   - تقليل Spacing في Forms
   - تقليل Spacing في Lists
   - تحسين Spacing في Navigation

4. إضافة Responsive Spacing Utilities:
   - mobile:p-3 (بدلاً من p-4)
   - mobile:gap-3 (بدلاً من gap-4)
   - mobile:space-y-3 (بدلاً من space-y-4)

5. تحديث المكونات:
   - Card Components
   - Form Components
   - List Components
   - Layout Components

6. اختبار Spacing:
   - اختبار على أجهزة مختلفة
   - اختبار القراءة
   - اختبار الاستخدام

المعايير:
- ✅ Spacing محسّن للجوال
- ✅ استخدام أفضل للمساحة
- ✅ تحسين القراءة
- ✅ اختبار كامل على أجهزة مختلفة
```

---

### 3. تحسين Dark Mode

#### Prompt 3.1: مراجعة وتحسين Dark Mode Colors

```
قم بمراجعة وتحسين ألوان Dark Mode لضمان الاتساق والتباين الجيد.

المهام المطلوبة:
1. مراجعة Primary Color في Dark Mode:
   - مراجعة Primary DEFAULT (#F7374F)
   - ضمان الاتساق مع Light Theme
   - تحسين التباين
   - مراجعة Primary Dark و Primary Light

2. مراجعة جميع الألوان في Dark Mode:
   - مراجعة Neutral Colors
   - مراجعة Accent Colors
   - مراجعة Status Colors
   - ضمان التباين الجيد

3. تحسين Contrast في Dark Mode:
   - ضمان WCAG AA لجميع الألوان
   - تحسين Text Colors
   - تحسين Background Colors
   - تحسين Border Colors

4. مراجعة Gradients في Dark Mode:
   - تعديل Gradients للـ Dark Mode
   - ضمان Visibility جيدة
   - تحسين التباين

5. تحديث CSS Variables:
   - مراجعة جميع Dark Mode Colors
   - تحديث الألوان التي تحتاج تحسين
   - ضمان الاتساق

6. اختبار Dark Mode:
   - اختبار على أجهزة مختلفة
   - اختبار Contrast
   - اختبار القراءة
   - اختبار الاتساق

الملفات المتأثرة:
- frontend/eetmad/src/lib/theme/css-vars.ts
- ملفات الثيمات

المعايير:
- ✅ جميع الألوان محسّنة في Dark Mode
- ✅ Contrast جيد لجميع الألوان
- ✅ الاتساق مع Light Theme
- ✅ اختبار كامل
```

#### Prompt 3.2: ضمان دعم Dark Mode لجميع المكونات

```
قم بضمان دعم Dark Mode لجميع المكونات في النظام.

المهام المطلوبة:
1. مراجعة جميع مكونات UI:
   - Button Components
   - Card Components
   - Input Components
   - Badge Components
   - جميع المكونات الأخرى

2. تحديث المكونات التي لا تدعم Dark Mode:
   - إضافة Dark Mode Styles
   - استخدام CSS Variables
   - ضمان التباين الجيد

3. مراجعة الصفحات:
   - مراجعة جميع الصفحات
   - ضمان دعم Dark Mode
   - إصلاح أي مشاكل

4. اختبار Dark Mode:
   - اختبار جميع المكونات
   - اختبار جميع الصفحات
   - اختبار Transitions

المعايير:
- ✅ جميع المكونات تدعم Dark Mode
- ✅ جميع الصفحات تدعم Dark Mode
- ✅ Transitions سلسة
- ✅ اختبار كامل
```

#### Prompt 3.3: تحسين Transitions بين الثيمات

```
قم بتحسين Transitions بين Light و Dark Mode لتحسين تجربة المستخدم.

المهام المطلوبة:
1. إضافة Smooth Transitions:
   - إضافة transition للـ color
   - إضافة transition للـ background-color
   - إضافة transition للـ border-color
   - استخدام transition-all عند الحاجة

2. تحسين Transition Timing:
   - استخدام duration مناسب (200-300ms)
   - استخدام easing مناسب (ease-in-out)
   - ضمان Smooth Transitions

3. تحديث CSS Variables:
   - إضافة transitions في Global Styles
   - تحديث Theme Provider
   - ضمان Smooth Transitions

4. اختبار Transitions:
   - اختبار التبديل بين الثيمات
   - اختبار Smoothness
   - اختبار Performance

المعايير:
- ✅ Transitions سلسة
- ✅ Timing مناسب
- ✅ Performance جيد
- ✅ اختبار كامل
```

---

### 4. توحيد الأنماط (Style Standardization)

#### Prompt 4.1: توحيد Spacing

```
قم بتوحيد Spacing في جميع أنحاء النظام لضمان الاتساق.

المهام المطلوبة:
1. مراجعة Spacing System:
   - مراجعة Tailwind Spacing Scale
   - تحديد Spacing Standards
   - توثيق Spacing Guidelines

2. توحيد Component Spacing:
   - توحيد Padding في المكونات
   - توحيد Margins بين المكونات
   - توحيد Gaps في Grids و Flexbox

3. توحيد Page Spacing:
   - توحيد Container Padding
   - توحيد Section Spacing
   - توحيد Page Margins

4. إنشاء Spacing Guidelines:
   - توثيق Spacing Standards
   - إضافة أمثلة
   - إضافة Best Practices

5. تحديث المكونات:
   - تحديث جميع المكونات لاستخدام Spacing الموحد
   - إزالة Custom Spacing غير الضروري

6. اختبار Spacing:
   - مراجعة جميع الصفحات
   - ضمان الاتساق

المعايير:
- ✅ Spacing موحد في جميع المكونات
- ✅ Spacing موحد في جميع الصفحات
- ✅ توثيق كامل
- ✅ اختبار كامل
```

#### Prompt 4.2: توحيد Border Radius

```
قم بتوحيد Border Radius في جميع أنحاء النظام.

المهام المطلوبة:
1. تحديد Border Radius Standards:
   - Small: 4px
   - Medium: 8px
   - Large: 12px
   - XLarge: 16px
   - Full: 9999px

2. توحيد Border Radius في المكونات:
   - Buttons: استخدام radius موحد
   - Cards: استخدام radius موحد
   - Inputs: استخدام radius موحد
   - Badges: استخدام radius موحد

3. تحديث Tailwind Config:
   - إضافة Custom Border Radius Values
   - توثيق الاستخدام

4. تحديث المكونات:
   - تحديث جميع المكونات لاستخدام Border Radius الموحد

5. اختبار Border Radius:
   - مراجعة جميع المكونات
   - ضمان الاتساق

المعايير:
- ✅ Border Radius موحد في جميع المكونات
- ✅ توثيق كامل
- ✅ اختبار كامل
```

#### Prompt 4.3: توحيد Shadows

```
قم بتوحيد Shadows في جميع أنحاء النظام.

المهام المطلوبة:
1. تحديد Shadow Standards:
   - Small: shadow-sm
   - Medium: shadow-md
   - Large: shadow-lg
   - XLarge: shadow-xl

2. توحيد Shadow Usage:
   - Cards: استخدام shadow موحد
   - Buttons: استخدام shadow موحد
   - Modals: استخدام shadow موحد
   - Dropdowns: استخدام shadow موحد

3. تحديث Tailwind Config:
   - إضافة Custom Shadows إذا لزم الأمر
   - توثيق الاستخدام

4. تحديث المكونات:
   - تحديث جميع المكونات لاستخدام Shadows الموحدة

5. اختبار Shadows:
   - مراجعة جميع المكونات
   - ضمان الاتساق
   - اختبار في Light و Dark Mode

المعايير:
- ✅ Shadows موحدة في جميع المكونات
- ✅ توثيق كامل
- ✅ اختبار كامل
```

---

## Phase 2: High Priority 🟠

### 5. تحسين Animations

#### Prompt 5.1: توحيد Animation Styles

```
قم بتوحيد Animation Styles في جميع أنحاء النظام.

المهام المطلوبة:
1. تحديد Animation Standards:
   - Duration: 200ms, 300ms, 500ms
   - Easing: ease-in-out, ease-out, ease-in
   - Delay: عند الحاجة

2. إنشاء Animation Utilities:
   - إنشاء animation utilities في Framer Motion
   - إنشاء animation variants
   - توثيق الاستخدام

3. توحيد Animations في المكونات:
   - Page Transitions
   - Component Animations
   - Hover Animations
   - Click Animations

4. تحديث المكونات:
   - تحديث جميع المكونات لاستخدام Animation Styles الموحدة

5. اختبار Animations:
   - اختبار Performance
   - اختبار Smoothness
   - اختبار على أجهزة مختلفة

المعايير:
- ✅ Animation Styles موحدة
- ✅ Performance جيد
- ✅ Smooth Animations
- ✅ توثيق كامل
```

#### Prompt 5.2: إضافة المزيد من Animations

```
قم بإضافة المزيد من Animations لتحسين تجربة المستخدم.

المهام المطلوبة:
1. إضافة Page Transitions:
   - Fade In/Out
   - Slide In/Out
   - Scale In/Out

2. إضافة Component Animations:
   - Card Animations
   - List Item Animations
   - Modal Animations

3. إضافة Micro-animations:
   - Button Click Animations
   - Icon Animations
   - Loading Animations

4. استخدام Framer Motion:
   - motion components
   - AnimatePresence
   - Variants

5. اختبار Animations:
   - اختبار Performance
   - اختبار Smoothness
   - اختبار على أجهزة مختلفة

المعايير:
- ✅ Animations سلسة
- ✅ Performance جيد
- ✅ تحسين تجربة المستخدم
- ✅ اختبار كامل
```

---

### 6. تحسين Micro-interactions

#### Prompt 6.1: تحسين Click Feedback

```
قم بتحسين Click Feedback لجميع العناصر التفاعلية.

المهام المطلوبة:
1. إضافة Click Feedback:
   - Scale Animation عند Click
   - Ripple Effect (اختياري)
   - Color Change
   - Shadow Change

2. تحديث المكونات:
   - Button Components
   - Link Components
   - Card Components (عند الحاجة)

3. استخدام Framer Motion:
   - whileTap animations
   - whileHover animations

4. اختبار Click Feedback:
   - اختبار على Desktop
   - اختبار على Mobile
   - اختبار Performance

المعايير:
- ✅ Click Feedback واضح
- ✅ Performance جيد
- ✅ تحسين تجربة المستخدم
- ✅ اختبار كامل
```

#### Prompt 6.2: تحسين Loading States

```
قم بتحسين Loading States في جميع أنحاء النظام.

المهام المطلوبة:
1. إنشاء Loading Components:
   - Spinner Component
   - Skeleton Loader
   - Progress Bar
   - Loading Overlay

2. تحسين Loading States:
   - إضافة Animations
   - تحسين Visual Design
   - إضافة Progress Indicators

3. تحديث المكونات:
   - إضافة Loading States للمكونات
   - استخدام Loading Components

4. اختبار Loading States:
   - اختبار Performance
   - اختبار Visual Design
   - اختبار على أجهزة مختلفة

المعايير:
- ✅ Loading States واضحة
- ✅ Animations سلسة
- ✅ تحسين تجربة المستخدم
- ✅ اختبار كامل
```

#### Prompt 6.3: إضافة المزيد من Micro-interactions

```
قم بإضافة المزيد من Micro-interactions لتحسين تجربة المستخدم.

المهام المطلوبة:
1. إضافة Hover Effects:
   - تحسين Hover States
   - إضافة Hover Animations
   - تحسين Visual Feedback

2. إضافة Form Interactions:
   - Input Focus Effects
   - Validation Feedback
   - Success Feedback

3. إضافة Navigation Interactions:
   - Active State Animations
   - Hover Effects
   - Click Feedback

4. استخدام Framer Motion:
   - whileHover
   - whileFocus
   - whileTap

5. اختبار Micro-interactions:
   - اختبار Performance
   - اختبار Smoothness
   - اختبار على أجهزة مختلفة

المعايير:
- ✅ Micro-interactions سلسة
- ✅ Performance جيد
- ✅ تحسين تجربة المستخدم
- ✅ اختبار كامل
```

---

### 7. تحسين الاتساق (Consistency)

#### Prompt 7.1: توحيد المكونات

```
قم بتوحيد المكونات في جميع أنحاء النظام.

المهام المطلوبة:
1. مراجعة جميع المكونات:
   - مراجعة Variants
   - مراجعة Props
   - مراجعة Styles

2. توحيد Variants:
   - توحيد Variant Names
   - توحيد Variant Styles
   - توثيق Variants

3. توحيد Props:
   - توحيد Prop Names
   - توحيد Prop Types
   - توثيق Props

4. توحيد Styles:
   - توحيد Class Names
   - توحيد Style Patterns
   - توثيق Styles

5. تحديث المكونات:
   - تحديث جميع المكونات لضمان الاتساق

6. اختبار المكونات:
   - اختبار جميع Variants
   - اختبار جميع Props
   - ضمان الاتساق

المعايير:
- ✅ المكونات موحدة
- ✅ Variants موحدة
- ✅ Props موحدة
- ✅ توثيق كامل
```

#### Prompt 7.2: توحيد الصفحات

```
قم بتوحيد الصفحات في جميع أنحاء النظام.

المهام المطلوبة:
1. مراجعة جميع الصفحات:
   - مراجعة Layout
   - مراجعة Headers
   - مراجعة Footers

2. توحيد Headers:
   - توحيد Header Design
   - توحيد Header Navigation
   - توحيد Header Styles

3. توحيد Footers:
   - توحيد Footer Design
   - توحيد Footer Content
   - توحيد Footer Styles

4. توحيد Layout:
   - توحيد Page Layout
   - توحيد Container Width
   - توحيد Spacing

5. تحديث الصفحات:
   - تحديث جميع الصفحات لضمان الاتساق

6. اختبار الصفحات:
   - مراجعة جميع الصفحات
   - ضمان الاتساق

المعايير:
- ✅ الصفحات موحدة
- ✅ Headers موحدة
- ✅ Footers موحدة
- ✅ Layout موحد
- ✅ توثيق كامل
```

---

## Phase 3: Polish & Testing 🟡

### 8. المراجعة النهائية والاختبارات

#### Prompt 8.1: المراجعة الشاملة

```
قم بمراجعة شاملة لجميع التحسينات وضمان الجودة.

المهام المطلوبة:
1. مراجعة جميع التحسينات:
   - مراجعة Accessibility Improvements
   - مراجعة Mobile UX Improvements
   - مراجعة Dark Mode Improvements
   - مراجعة Style Standardization
   - مراجعة Animations
   - مراجعة Micro-interactions
   - مراجعة Consistency

2. اختبار على أجهزة مختلفة:
   - Desktop (Chrome, Firefox, Safari, Edge)
   - Mobile (iOS, Android)
   - Tablets
   - اختبار Responsive Design

3. اختبار مع Screen Readers:
   - NVDA (Windows)
   - JAWS (Windows)
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)

4. اختبار Performance:
   - Lighthouse Audit
   - Performance Testing
   - Bundle Size Check

5. اختبار Accessibility:
   - axe DevTools
   - WAVE
   - Lighthouse Accessibility

6. إصلاح Bugs:
   - إصلاح جميع Bugs المكتشفة
   - تحسين Performance Issues
   - تحسين Accessibility Issues

المعايير:
- ✅ جميع التحسينات مكتملة
- ✅ اختبار كامل على جميع الأجهزة
- ✅ اختبار كامل مع Screen Readers
- ✅ Performance جيد
- ✅ Accessibility ممتاز
- ✅ جاهز للإطلاق
```

#### Prompt 8.2: تحسينات نهائية

```
قم بإجراء تحسينات نهائية وإصلاح أي مشاكل متبقية.

المهام المطلوبة:
1. تحسينات بسيطة:
   - تحسينات بسيطة في التصميم
   - تحسينات بسيطة في UX
   - تحسينات بسيطة في Performance

2. إصلاح Bugs:
   - إصلاح جميع Bugs المتبقية
   - إصلاح Issues في GitHub

3. تحسين Performance:
   - Code Splitting
   - Lazy Loading
   - Image Optimization
   - Bundle Size Optimization

4. التوثيق النهائي:
   - تحديث Documentation
   - تحديث README
   - تحديث Style Guide

5. Final Testing:
   - اختبار نهائي شامل
   - اختبار User Acceptance

المعايير:
- ✅ جميع التحسينات مكتملة
- ✅ جميع Bugs مصلحة
- ✅ Performance محسّن
- ✅ التوثيق محدث
- ✅ جاهز للإطلاق
```

---

## 📊 ملخص Prompts

| المرحلة | Prompt | الأولوية | الوقت المتوقع |
|---------|--------|----------|---------------|
| Phase 1 | 1.1 - تحسين Contrast Ratios | 🔴 Critical | 3-4 أيام |
| Phase 1 | 1.2 - إضافة ARIA Labels | 🔴 Critical | 4-5 أيام |
| Phase 1 | 1.3 - تحسين Focus States | 🔴 Critical | 2-3 أيام |
| Phase 1 | 1.4 - إضافة Skip Links | 🔴 Critical | 1-2 أيام |
| Phase 1 | 2.1 - تحسين Touch Targets | 🔴 Critical | 3-4 أيام |
| Phase 1 | 2.2 - تحسين Mobile Navigation | 🔴 Critical | 4-5 أيام |
| Phase 1 | 2.3 - تحسين Spacing للجوال | 🔴 Critical | 2-3 أيام |
| Phase 1 | 3.1 - مراجعة Dark Mode Colors | 🔴 Critical | 2-3 أيام |
| Phase 1 | 3.2 - ضمان دعم Dark Mode | 🔴 Critical | 2-3 أيام |
| Phase 1 | 3.3 - تحسين Transitions | 🔴 Critical | 1-2 أيام |
| Phase 1 | 4.1 - توحيد Spacing | 🔴 Critical | 2-3 أيام |
| Phase 1 | 4.2 - توحيد Border Radius | 🔴 Critical | 1-2 أيام |
| Phase 1 | 4.3 - توحيد Shadows | 🔴 Critical | 1-2 أيام |
| Phase 2 | 5.1 - توحيد Animation Styles | 🟠 High | 2-3 أيام |
| Phase 2 | 5.2 - إضافة المزيد من Animations | 🟠 High | 2-3 أيام |
| Phase 2 | 6.1 - تحسين Click Feedback | 🟠 High | 1-2 أيام |
| Phase 2 | 6.2 - تحسين Loading States | 🟠 High | 2-3 أيام |
| Phase 2 | 6.3 - إضافة Micro-interactions | 🟠 High | 2-3 أيام |
| Phase 2 | 7.1 - توحيد المكونات | 🟠 High | 2-3 أيام |
| Phase 2 | 7.2 - توحيد الصفحات | 🟠 High | 2-3 أيام |
| Phase 3 | 8.1 - المراجعة الشاملة | 🟡 Medium | 3-4 أيام |
| Phase 3 | 8.2 - تحسينات نهائية | 🟡 Medium | 2-3 أيام |

**الإجمالي:** 21 Prompt | **الوقت الإجمالي:** 6-9 أسابيع

---

## 🎯 كيفية الاستخدام

1. **ابدأ بـ Phase 1 (Critical):**
   - ابدأ بالـ Prompts الحرجة أولاً
   - رتب حسب الأولوية
   - أكمل كل Prompt قبل الانتقال للآخر

2. **انتقل لـ Phase 2 (High Priority):**
   - بعد إكمال Phase 1
   - رتب حسب الأولوية
   - أكمل كل Prompt

3. **أنهِ بـ Phase 3 (Polish):**
   - المراجعة النهائية
   - الاختبارات
   - التحسينات النهائية

4. **التوثيق:**
   - وثّق جميع التحسينات
   - حدّث Documentation
   - حدّث Style Guide

---

**آخر تحديث:** 21 نوفمبر 2025

