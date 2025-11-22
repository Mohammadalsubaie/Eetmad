# 🌳 شجرة الترجمة الشاملة - Translation Tree

## 📋 الهدف

تتبع كل استخدام للترجمات في المشروع وتحديد:

1. أين تم استخدام كل مفتاح ترجمة
2. كيف تم استخدامه (namespace + key)
3. النصوص المكتوبة مباشرة (hardcoded) التي يجب نقلها لملفات الترجمة

---

## 🔍 منهجية الفحص

### 1. نمط الاستخدام الصحيح:

```tsx
import { useTranslations, useLocale } from 'next-intl';

const t = useTranslations('namespace'); // namespace مثل: 'admin', 'pages', 'nav'
const tPages = useTranslations('pages');
const locale = useLocale();

// الاستخدام:
{
	t('key');
} // namespace.key
{
	tPages('key');
} // pages.key
```

### 2. الملفات المستثناة:

-   `mocks/**` - بيانات وهمية
-   `**/*.test.ts` - ملفات الاختبار
-   `**/*.spec.ts` - ملفات الاختبار

---

## 📊 نتائج الفحص

### ✅ الملفات التي تستخدم الترجمات بشكل صحيح

#### 1. `app/[locale]/(admin)/admin/analytics/page.tsx`

**Namespaces المستخدمة:**

-   `admin` → `const t = useTranslations('admin')`
-   `pages` → `const tPages = useTranslations('pages')`

**المفاتيح المستخدمة:**

-   ✅ `tPages('admin.title')` → `pages.admin.title` ✓
-   ✅ `tPages('analytics.title')` → `pages.analytics.title` ✓
-   ✅ `t('analytics.title')` → `admin.analytics.title` ✓
-   ✅ `t('analytics.description')` → `admin.analytics.description` ✓
-   ✅ `t('analytics.actions.selectPeriod')` → `admin.analytics.actions.selectPeriod` ✓
-   ✅ `t('analytics.actions.exportReport')` → `admin.analytics.actions.exportReport` ✓
-   ✅ `t('analytics.stats.totalUsers')` → `admin.analytics.stats.totalUsers` ✓
-   ✅ `t('analytics.stats.totalRevenue')` → `admin.analytics.stats.totalRevenue` ✓
-   ✅ `t('analytics.stats.activeProjects')` → `admin.analytics.stats.activeProjects` ✓
-   ✅ `t('analytics.stats.growthRate')` → `admin.analytics.stats.growthRate` ✓
-   ✅ `t('analytics.charts.userGrowth')` → `admin.analytics.charts.userGrowth` ✓
-   ✅ `t('analytics.charts.monthlyRevenue')` → `admin.analytics.charts.monthlyRevenue` ✓
-   ✅ `t('analytics.charts.projectsByCategory')` → `admin.analytics.charts.projectsByCategory` ✓
-   ✅ `t('analytics.charts.completionRate')` → `admin.analytics.charts.completionRate` ✓

**❌ النصوص المكتوبة مباشرة (يجب نقلها للترجمة):**

-   ❌ السطر 47: `"جاري التحميل..."` → يجب أن يكون: `t('common.loading')` أو `admin.analytics.loading`
-   ❌ السطر 56: `"حدث خطأ في تحميل البيانات"` → يجب أن يكون: `t('analytics.error')` أو `admin.analytics.error`
-   ❌ السطر 64: `"M ر.س"` → يجب أن يكون: `t('common.currency.million')` أو `admin.common.currency.million`
-   ❌ السطر 66: `"K ر.س"` → يجب أن يكون: `t('common.currency.thousand')` أو `admin.common.currency.thousand`
-   ❌ السطر 234: `"مشروع"` → يجب أن يكون: `t('common.project')` أو `admin.common.project`

---

#### 2. `components/shared/layouts/Navbar.tsx`

**Namespaces المستخدمة:**

-   `nav` → `const t = useTranslations('nav')`

**المفاتيح المستخدمة:**

-   ✅ `t('home')` → `nav.home` ✓
-   ✅ `t('about')` → `nav.about` ✓
-   ✅ `t('requests')` → `nav.requests` ✓
-   ✅ `t('suppliers')` → `nav.suppliers` ✓
-   ✅ `t('contact')` → `nav.contact` ✓
-   ✅ `t('toggleMenu')` → `nav.toggleMenu` ✓

**❌ النصوص المكتوبة مباشرة:**

-   ❌ السطر 31: `"Eetmad"` → يجب أن يكون: `t('brandName')` أو `nav.brandName`

---

## 🔴 المشاكل المكتشفة

### المشكلة 1: نصوص عربية مكتوبة مباشرة في الكود

#### 1. `app/[locale]/(admin)/admin/analytics/page.tsx`

**النصوص المكتوبة مباشرة:**

-   ❌ السطر 47: `"جاري التحميل..."`
    -   **يجب أن يكون:** `t('common.loading')` أو `admin.analytics.loading`
    -   **المفتاح المقترح:** `admin.analytics.loading`
-   ❌ السطر 56: `"حدث خطأ في تحميل البيانات"`
    -   **يجب أن يكون:** `t('analytics.error')` أو `admin.analytics.error`
    -   **المفتاح المقترح:** `admin.analytics.error`
-   ❌ السطر 64: `"M ر.س"` (في formatRevenue)
    -   **يجب أن يكون:** `t('common.currency.million')`
    -   **المفتاح المقترح:** `admin.common.currency.million` أو `common.currency.million`
-   ❌ السطر 66: `"K ر.س"` (في formatRevenue)
    -   **يجب أن يكون:** `t('common.currency.thousand')`
    -   **المفتاح المقترح:** `admin.common.currency.thousand` أو `common.currency.thousand`
-   ❌ السطر 234: `"مشروع"`
    -   **يجب أن يكون:** `t('common.project')` أو `tPages('projects.title')`
    -   **المفتاح المقترح:** `admin.common.project` أو `pages.projects.title`

#### 2. `components/shared/layouts/Navbar.tsx`

**النصوص المكتوبة مباشرة:**

-   ❌ السطر 31: `"Eetmad"` (اسم العلامة التجارية)
    -   **يجب أن يكون:** `t('brandName')` أو `nav.brandName`
    -   **المفتاح المقترح:** `nav.brandName`

#### 3. `components/features/admin/charts/UserGrowthChart.tsx`

**النصوص المكتوبة مباشرة:**

-   ❌ السطر 144: `name="المستخدمين"`
    -   **يجب أن يكون:** استخدام مفتاح ترجمة
    -   **المفتاح المقترح:** `admin.analytics.charts.userGrowth.usersLabel`
-   ❌ السطر 166: `name="النمو %"`
    -   **يجب أن يكون:** استخدام مفتاح ترجمة
    -   **المفتاح المقترح:** `admin.analytics.charts.userGrowth.growthLabel`

#### 4. `components/features/admin/UsersTableColumns.tsx`

**النصوص المكتوبة مباشرة:**

-   ❌ السطر 61: `'مورد'`, `'مسؤول'`, `'عميل'`
    -   **يجب أن يكون:** استخدام مفاتيح ترجمة
    -   **المفاتيح المقترحة:**
        -   `admin.users.types.supplier` → "مورد"
        -   `admin.users.types.admin` → "مسؤول"
        -   `admin.users.types.client` → "عميل"

**الحل المطلوب:**

-   نقل جميع النصوص إلى ملفات الترجمة (`ar.json` و `en.json`)
-   استخدام مفاتيح الترجمة بدلاً من النصوص المباشرة
-   تحديث الكود لاستخدام `t()` أو `tPages()` بدلاً من النصوص الثابتة

---

## 📝 خطة العمل

### المرحلة 1: فحص شامل لجميع الملفات

-   [ ] فحص جميع ملفات `app/[locale]/**/*.tsx`
-   [ ] فحص جميع ملفات `components/**/*.tsx`
-   [ ] فحص جميع ملفات `lib/**/*.ts` (باستثناء mocks)

### المرحلة 2: إنشاء شجرة ترجمة كاملة

-   [ ] توثيق كل namespace مستخدم
-   [ ] توثيق كل مفتاح مستخدم مع موقعه
-   [ ] توثيق كل نص مكتوب مباشرة

### المرحلة 3: التحقق من ملفات الترجمة

-   [ ] التحقق من وجود كل مفتاح في `ar.json`
-   [ ] التحقق من وجود كل مفتاح في `en.json`
-   [ ] تحديد المفاتيح المفقودة

---

## 📊 نتائج الفحص الشامل

تم إجراء فحص شامل لـ **554 ملف** في المشروع:

### الإحصائيات:

-   ✅ **240 ملف** يستخدم الترجمات بشكل صحيح
-   ❌ **10 ملفات** تحتوي على نصوص عربية مكتوبة مباشرة
-   📁 **45 namespace** مستخدمة في المشروع
-   🔑 **1,467 مفتاح ترجمة** فريد
-   ⚠️ **28 نص** مكتوب مباشرة يجب نقله للترجمة

### Namespaces المستخدمة (45 namespace):

1. **admin** - 310 مفاتيح
2. **pages** - 40 مفاتيح
3. **pages.contracts** - 85 مفاتيح
4. **pages.projects** - 99 مفاتيح
5. **pages.profile** - 79 مفاتيح
6. **pages.messages** - 50 مفاتيح
7. **pages.notifications** - 49 مفاتيح
8. **pages.offers** - 51 مفاتيح
9. **pages.payments** - 65 مفاتيح
10. **pages.disputes** - 59 مفاتيح
11. **pages.requests** - 62 مفاتيح
12. **pages.reviews** - 40 مفاتيح
13. **pages.suppliers** - 50 مفاتيح
14. **pages.dashboard** - 20 مفاتيح
15. **pages.profile.edit** - 27 مفاتيح
16. **pages.profile.security** - 15 مفاتيح
17. **auth** - 58 مفاتيح
18. **nav** - 11 مفاتيح
19. **footer** - 20 مفاتيح
20. **home.hero** - 6 مفاتيح
21. **home.cta** - 3 مفاتيح
22. **home.stats** - 8 مفاتيح
23. **home.testimonials** - 2 مفاتيح
24. **pages.categories** - 12 مفاتيح
25. **pages.contact** - 10 مفاتيح
26. **pages.faq** - 3 مفاتيح
27. **pages.portfolio** - 9 مفاتيح
28. **pages.stats** - 10 مفاتيح
29. **pages.supplierProfile** - 7 مفاتيح
30. **pages.supplierSetup** - 14 مفاتيح
31. **pages.terms** - 14 مفاتيح
32. **pages.users** - 16 مفاتيح
33. **biddingPlatform** - 10 مفاتيح
34. **biddingPlatform.sections.\*** - 27+ مفاتيح
35. **dev** - 9 مفاتيح
36. **faq** - 2 مفاتيح
37. **common** - 1 مفتاح
38. **auth.register.userType** - 2 مفاتيح
39. **unknown** - 94 مفاتيح (يجب فحصها)

---

## 🔴 قائمة كاملة بالملفات التي تحتوي على نصوص عربية مكتوبة مباشرة

### 1. `i18n/config.ts`

-   السطر 12: `"العربية"` - اسم اللغة (مقبول في ملف الإعدادات)

### 2. `lib/hooks/useAdminDashboard.ts`

-   بيانات وهمية (mock data) - **مقبول** لأنها في hook للبيانات الوهمية

### 3. `components/shared/misc/LanguageSwitcher.tsx`

-   السطر 12: `"العربية"` - اسم اللغة الأصلي (مقبول)

### 4. `components/features/admin/UsersTableColumns.tsx`

-   ❌ السطر 61: `"مورد"`, `"مسؤول"`, `"عميل"`
    -   **يجب أن يكون:** `t('users.types.supplier')`, `t('users.types.admin')`, `t('users.types.client')`
    -   **المفاتيح المقترحة:** `admin.users.types.supplier`, `admin.users.types.admin`, `admin.users.types.client`

### 5. `components/features/admin/DisputesTableColumns.tsx`

-   ❌ السطر 78-81: `"عالية"`, `"متوسطة"`, `"منخفضة"`
    -   **يجب أن يكون:** استخدام مفاتيح ترجمة
    -   **المفاتيح المقترحة:** `admin.disputes.priority.high`, `admin.disputes.priority.medium`, `admin.disputes.priority.low`

### 6. `components/features/admin/charts/UserGrowthChart.tsx`

-   ❌ السطر 144: `name="المستخدمين"`
    -   **يجب أن يكون:** استخدام مفتاح ترجمة
    -   **المفتاح المقترح:** `admin.analytics.charts.userGrowth.usersLabel`

### 7. `components/features/admin/charts/ProjectsByCategoryChart.tsx`

-   ❌ السطر 127: `name="المشاريع"`
    -   **يجب أن يكون:** استخدام مفتاح ترجمة
    -   **المفتاح المقترح:** `admin.analytics.charts.projectsByCategory.label`

### 8. `components/features/admin/charts/MonthlyRevenueChart.tsx`

-   ❌ نصوص عربية في المخطط
    -   **يجب أن يكون:** استخدام مفاتيح ترجمة

### 9. `app/[locale]/(admin)/admin/settings/page.tsx`

-   ❌ نصوص عربية مكتوبة مباشرة
    -   **يجب فحص الملف**

### 10. `app/[locale]/(admin)/admin/analytics/page.tsx`

-   ❌ السطر 47: `"جاري التحميل..."`
-   ❌ السطر 56: `"حدث خطأ في تحميل البيانات"`
-   ❌ السطر 64: `"M ر.س"`
-   ❌ السطر 66: `"K ر.س"`
-   ❌ السطر 234: `"مشروع"`

---

## 📝 خطة العمل المحدثة

### المرحلة 1: إصلاح النصوص المكتوبة مباشرة ✅

-   [x] فحص شامل لجميع الملفات
-   [ ] إصلاح `components/features/admin/UsersTableColumns.tsx`
-   [ ] إصلاح `components/features/admin/DisputesTableColumns.tsx`
-   [ ] إصلاح `components/features/admin/charts/UserGrowthChart.tsx`
-   [ ] إصلاح `components/features/admin/charts/ProjectsByCategoryChart.tsx`
-   [ ] إصلاح `components/features/admin/charts/MonthlyRevenueChart.tsx`
-   [ ] إصلاح `app/[locale]/(admin)/admin/analytics/page.tsx`
-   [ ] إصلاح `app/[locale]/(admin)/admin/settings/page.tsx`

### المرحلة 2: التحقق من ملفات الترجمة

-   [ ] التحقق من وجود كل مفتاح من 1,467 مفتاح في `ar.json`
-   [ ] التحقق من وجود كل مفتاح من 1,467 مفتاح في `en.json`
-   [ ] تحديد المفاتيح المفقودة (94 مفتاح في namespace "unknown" تحتاج فحص)

### المرحلة 3: إصلاح namespace "unknown"

-   [ ] فحص الملفات التي تستخدم namespace غير معروف
-   [ ] تصحيح استخدامات namespace الخاطئة

---

## 📄 التقرير الكامل

التقرير الشامل متوفر في: `frontend/TRANSLATION-AUDIT-REPORT.md`

---

## 🔄 التحديثات المستمرة

تم تحديث هذا الملف بناءً على الفحص الشامل الذي تم في: ٣٠‏/٥‏/١٤٤٧ هـ
