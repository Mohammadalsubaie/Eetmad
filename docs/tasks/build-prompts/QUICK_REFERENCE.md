# Quick Reference - UI Build Prompts
## مرجع سريع لـ Prompts بناء الواجهات

**تاريخ الإنشاء:** 2025-01-27

---

## 🎯 القواعد الأساسية (يجب اتباعها في كل Prompt)

### ⚠️ **قاعدة ذهبية: استخدام المكونات الموجودة - ممنوع التكرار**

1. ✅ **يجب** فحص `frontend/eetmad/src/components/ui/` قبل إنشاء أي مكون UI
2. ✅ **يجب** فحص `frontend/eetmad/src/components/shared/` قبل إنشاء أي مكون مشترك
3. ✅ **يجب** فحص `frontend/eetmad/src/components/features/` قبل إنشاء أي مكون feature
4. ❌ **ممنوع** إنشاء مكونات جديدة إذا كان يوجد مكون موجود يفي بالغرض
5. ❌ **ممنوع** تكرار الكود - استخدم المكونات الموجودة

### 📋 **قواعد إلزامية:**

- اتباع `docs/ai-instruction.md`
- اتباع `docs/build-prompt.md`
- استخدام `cssVars` - **ممنوع** hardcode الألوان
- استخدام `useTranslations` - **ممنوع** hardcode النصوص
- استخدام types من `@/lib/types` - **ممنوع** inline types
- مطابقة API endpoints من `docs/docs/endpoints.md`
- استخدام Mock Data من `frontend/eetmad/src/mocks/data/`

---

## 📋 قائمة Prompts السريعة

### 🔴 **أولوية عالية جداً (يجب إضافتها فوراً):**

1. **Prompt 1: Contracts Pages** (8 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-1`
   - الوقت المقدر: 2-3 أيام

2. **Prompt 2: Payments Pages** (8 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-2`
   - الوقت المقدر: 2-3 أيام

3. **Prompt 3: Messages Pages** (4 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-3`
   - الوقت المقدر: 1-2 أيام

4. **Prompt 4: Notifications Pages** (3 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-4`
   - الوقت المقدر: 1 يوم

5. **Prompt 5: Projects Actions Completion** (9 مكونات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-5`
   - الوقت المقدر: 2-3 أيام

6. **Prompt 6: Milestones Actions Completion** (5 مكونات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-6`
   - الوقت المقدر: 1-2 أيام

**المجموع:** 37 صفحة/مكون | الوقت المقدر: 9-14 يوم

---

### 🟡 **أولوية متوسطة (يجب إضافتها قريباً):**

7. **Prompt 7: Users/Profile Pages** (5 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-7`
   - الوقت المقدر: 1-2 أيام

8. **Prompt 8: Suppliers Pages** (6 صفحات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-8`
   - الوقت المقدر: 1-2 أيام

9. **Prompt 9: Requests Enhancements** (3 مكونات)
   - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-9`
   - الوقت المقدر: 1 يوم

10. **Prompt 10: Offers Enhancements** (2 مكونات)
    - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-10`
    - الوقت المقدر: 1 يوم

11. **Prompt 11: Reviews Pages** (4 صفحات)
    - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-11`
    - الوقت المقدر: 1-2 أيام

12. **Prompt 12: Disputes Pages** (3 صفحات)
    - الملف: `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md#prompt-12`
    - الوقت المقدر: 1-2 أيام

**المجموع:** 23 صفحة/مكون | الوقت المقدر: 6-10 أيام

---

## 🚀 كيفية استخدام Prompts

### لكل Prompt:

1. افتح `docs/tasks/build-prompts/UI_BUILD_PROMPTS.md`
2. ابحث عن Prompt المطلوب (مثلاً: `Prompt 1: Contracts Pages`)
3. اقرأ القواعد الأساسية في بداية الملف
4. اتبع التعليمات في Prompt
5. استخدم المكونات الموجودة - **ممنوع التكرار**
6. أضف Translations
7. اختبر الصفحات/المكونات

---

## 📊 الإحصائيات

- **إجمالي Prompts:** 12
- **الصفحات/المكونات المطلوبة:** 60
- **الوقت المقدر:** 15-24 يوم عمل

---

**تم إعداد الملف بواسطة:** AI Project Manager  
**التاريخ:** 2025-01-27

