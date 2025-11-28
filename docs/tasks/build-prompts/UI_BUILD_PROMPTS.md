# Prompts لبناء الواجهات المفقودة
## UI Build Prompts - Organized by Priority

**تاريخ الإنشاء:** 2025-01-27  
**الهدف:** تقسيم العمل إلى prompts منظمة لبناء الواجهات المفقودة باحترافية

---

## 🎯 القواعد الأساسية (يجب اتباعها في كل Prompt)

### ✅ **قواعد إلزامية:**

1. **استخدام المكونات الموجودة - ممنوع التكرار:**
   - ✅ **يجب** استخدام المكونات من `@/components/ui` (Button, Card, Badge, Input, etc.)
   - ✅ **يجب** استخدام المكونات من `@/components/shared` (Breadcrumbs, ResourceGrid, EmptyState, etc.)
   - ✅ **يجب** استخدام المكونات من `@/components/features` (RequestCard, OfferCard, ProjectCard, etc.)
   - ❌ **ممنوع** إنشاء مكونات جديدة إذا كان يوجد مكون موجود يفي بالغرض
   - ❌ **ممنوع** تكرار الكود - استخدم المكونات الموجودة

2. **اتباع `docs/ai-instruction.md`:**
   - ✅ استخدام `cssVars` من `@/styles/theme` - **ممنوع** hardcode الألوان
   - ✅ استخدام `useTranslations` من `next-intl` - **ممنوع** hardcode النصوص
   - ✅ استخدام types من `@/lib/types` - **ممنوع** إنشاء inline types
   - ✅ مطابقة API endpoints من `docs/docs/endpoints.md` بالضبط
   - ✅ استخدام mock data من `frontend/eetmad/src/mocks/data/` - **ممنوع** إنشاء mock data في الملفات

3. **اتباع `docs/build-prompt.md`:**
   - ✅ قراءة جميع القواعد من `docs/build-prompt.md` قبل البدء
   - ✅ اتباع Design Guidelines من `docs/design-sample.md`
   - ✅ اتباع Component Building Rules
   - ✅ إضافة translations إلى `frontend/eetmad/messages/en.json` و `frontend/eetmad/messages/ar.json`

4. **التحقق من المكونات الموجودة:**
   - ✅ فحص `frontend/eetmad/src/components/ui/` قبل إنشاء أي مكون UI
   - ✅ فحص `frontend/eetmad/src/components/shared/` قبل إنشاء أي مكون مشترك
   - ✅ فحص `frontend/eetmad/src/components/features/` قبل إنشاء أي مكون feature
   - ✅ استخدام المكونات الموجودة بدلاً من إنشاء مكونات جديدة

---

## 📋 Prompts منظمة حسب الأولوية

### 🔴 **Prompt 1: Contracts Pages (أولوية عالية جداً)**

**الهدف:** بناء 8 صفحات للعقود

**الصفحات المطلوبة:**
1. `/contracts` - قائمة العقود
2. `/contracts/[id]` - تفاصيل عقد
3. `/contracts/new` - إنشاء عقد
4. `/contracts/[id]/edit` - تعديل عقد
5. `/contracts/[id]/sign` - توقيع العقد
6. `/contracts/[id]/versions` - نسخ العقد
7. `/contracts/[id]/clauses` - إدارة البنود
8. `/contracts/[id]/download` - تنزيل العقد

**Actions المطلوبة:**
- `GET /contracts` - قائمة العقود
- `GET /contracts/{id}` - تفاصيل عقد
- `POST /contracts` - إنشاء عقد
- `PUT /contracts/{id}` - تحديث عقد
- `DELETE /contracts/{id}` - إلغاء عقد
- `GET /contracts/project/{projectId}` - عقد المشروع
- `POST /contracts/{id}/sign` - توقيع العقد
- `POST /contracts/{id}/sign/client` - توقيع العميل
- `POST /contracts/{id}/sign/supplier` - توقيع المورد
- `GET /contracts/{id}/versions` - عرض النسخ
- `GET /contracts/{id}/versions/{version}` - نسخة محددة
- `POST /contracts/{id}/versions` - إنشاء نسخة جديدة
- `POST /contracts/{id}/clauses` - إضافة بند
- `DELETE /contracts/{id}/clauses/{clauseId}` - حذف بند
- `GET /contracts/{id}/download` - تنزيل PDF
- `GET /contracts/{id}/status` - حالة العقد

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `Breadcrumbs` من `@/components/shared/navigation`
- `ResourceGrid` من `@/components/shared/data-display`
- `EmptyState` من `@/components/ui`
- `LoadingSpinner` من `@/components/ui`
- `ErrorMessage` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `RichTextEditor` من `@/components/shared/forms` (لنص العقد)
- `StatusBadge` من `@/components/shared/badges`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/contracts.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useContracts.ts` - hook للعقود
- `frontend/eetmad/src/components/features/contracts/ContractCard.tsx` - بطاقة عقد
- `frontend/eetmad/src/components/features/contracts/ContractForm.tsx` - نموذج العقد
- `frontend/eetmad/src/components/features/contracts/ContractSigning.tsx` - توقيع العقد
- `frontend/eetmad/src/app/[locale]/(client)/contracts/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/[id]/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/new/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/[id]/edit/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/[id]/sign/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/[id]/versions/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/contracts/[id]/clauses/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.contracts` namespace

---

### 🔴 **Prompt 2: Payments Pages (أولوية عالية جداً)**

**الهدف:** بناء 8 صفحات للدفعات

**الصفحات المطلوبة:**
1. `/payments` - قائمة دفعاتي
2. `/payments/initiate` - بدء عملية دفع
3. `/payments/[id]/process` - معالجة الدفع
4. `/payments/[id]/cancel` - إلغاء الدفع
5. `/payments/[id]/refund` - استرجاع
6. `/payments/[id]/release` - تحويل للمورد
7. `/payments/wallet` - المحفظة
8. `/payments/history` - سجل الدفعات

**Actions المطلوبة:**
- `GET /payments/me` - دفعاتي
- `POST /payments/initiate` - بدء عملية دفع
- `POST /payments/{id}/process` - معالجة الدفع
- `POST /payments/{id}/confirm` - تأكيد الدفع
- `DELETE /payments/{id}/cancel` - إلغاء الدفع
- `POST /payments/{id}/refund` - استرجاع كامل
- `POST /payments/{id}/refund/partial` - استرجاع جزئي
- `POST /payments/{id}/release` - تحويل للمورد
- `GET /wallet/balance` - رصيد المحفظة
- `POST /wallet/add-funds` - إضافة رصيد
- `POST /wallet/withdraw` - سحب رصيد
- `GET /payments/history` - سجل الدفعات
- `GET /payments/project/{projectId}` - دفعات مشروع

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `Breadcrumbs` من `@/components/shared/navigation`
- `ResourceGrid` من `@/components/shared/data-display`
- `EmptyState` من `@/components/ui`
- `LoadingSpinner` من `@/components/ui`
- `ErrorMessage` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `StatusBadge` من `@/components/shared/badges`
- `StatCard` من `@/components/shared/cards` (للإحصائيات)

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/payments.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/usePayments.ts` - تحديث hook
- `frontend/eetmad/src/components/features/payments/PaymentCard.tsx` - بطاقة دفعة
- `frontend/eetmad/src/components/features/payments/PaymentForm.tsx` - نموذج الدفع
- `frontend/eetmad/src/components/features/payments/WalletCard.tsx` - بطاقة المحفظة
- `frontend/eetmad/src/app/[locale]/(client)/payments/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/payments/initiate/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/payments/[id]/process/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/payments/wallet/page.tsx`
- `frontend/eetmad/src/app/[locale]/(client)/payments/history/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.payments` namespace

---

### 🔴 **Prompt 3: Messages Pages (أولوية عالية جداً)**

**الهدف:** بناء 4 صفحات للرسائل

**الصفحات المطلوبة:**
1. `/messages` - قائمة المحادثات
2. `/messages/[id]` - محادثة
3. `/messages/new` - بدء محادثة جديدة
4. `/messages/settings` - إعدادات الرسائل

**Actions المطلوبة:**
- `GET /conversations` - قائمة المحادثات
- `POST /conversations` - بدء محادثة جديدة
- `GET /conversations/{id}` - عرض محادثة
- `GET /conversations/{id}/messages` - رسائل المحادثة
- `POST /conversations/{id}/messages` - إرسال رسالة
- `PUT /messages/{id}` - تعديل رسالة
- `DELETE /messages/{id}` - حذف رسالة
- `PATCH /messages/{id}/read` - تعليم كمقروء
- `PATCH /conversations/{id}/messages/read-all` - تعليم الكل كمقروء
- `POST /messages/{id}/attachments` - رفع مرفق
- `PATCH /conversations/{id}/close` - إغلاق محادثة
- `PATCH /conversations/{id}/archive` - أرشفة محادثة
- `PATCH /conversations/{id}/mute` - كتم الإشعارات
- `GET /messages/unread/count` - عدد الرسائل غير المقروءة

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `Breadcrumbs` من `@/components/shared/navigation`
- `EmptyState` من `@/components/ui`
- `LoadingSpinner` من `@/components/ui`
- `ErrorMessage` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms` (للمرفقات)
- `Avatar` من `@/components/ui/Avatar`
- `StatusBadge` من `@/components/shared/badges`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/messages.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useMessages.ts` - تحديث hook
- `frontend/eetmad/src/components/features/messages/ConversationCard.tsx` - بطاقة محادثة
- `frontend/eetmad/src/components/features/messages/MessageBubble.tsx` - فقاعة رسالة
- `frontend/eetmad/src/components/features/messages/MessageInput.tsx` - إدخال رسالة
- `frontend/eetmad/src/components/features/messages/ConversationList.tsx` - قائمة المحادثات
- `frontend/eetmad/src/app/[locale]/(main)/messages/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/messages/[id]/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/messages/new/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/messages/settings/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.messages` namespace

---

### 🔴 **Prompt 4: Notifications Pages (أولوية عالية جداً)**

**الهدف:** بناء 3 صفحات للإشعارات

**الصفحات المطلوبة:**
1. `/notifications` - قائمة الإشعارات
2. `/notifications/[id]` - تفاصيل إشعار
3. `/notifications/settings` - إعدادات الإشعارات

**Actions المطلوبة:**
- `GET /notifications` - إشعاراتي
- `GET /notifications/unread` - الإشعارات غير المقروءة
- `GET /notifications/unread/count` - عدد الإشعارات غير المقروءة
- `GET /notifications/{id}` - عرض إشعار
- `PATCH /notifications/{id}/read` - تعليم كمقروء
- `PATCH /notifications/read-all` - تعليم الكل كمقروء
- `DELETE /notifications/{id}` - حذف إشعار
- `DELETE /notifications/clear-all` - حذف جميع الإشعارات
- `GET /notifications/type/{type}` - الإشعارات حسب النوع
- `PUT /users/me/notification-preferences` - تفضيلات الإشعارات

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `Breadcrumbs` من `@/components/shared/navigation`
- `ResourceGrid` من `@/components/shared/data-display`
- `EmptyState` من `@/components/ui`
- `LoadingSpinner` من `@/components/ui`
- `ErrorMessage` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `StatusBadge` من `@/components/shared/badges`
- `NotificationBell` من `@/components/shared/misc` (موجود)

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/notifications.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useNotifications.ts` - تحديث hook
- `frontend/eetmad/src/components/features/notifications/NotificationCard.tsx` - بطاقة إشعار
- `frontend/eetmad/src/components/features/notifications/NotificationList.tsx` - قائمة الإشعارات
- `frontend/eetmad/src/components/features/notifications/NotificationSettings.tsx` - إعدادات الإشعارات
- `frontend/eetmad/src/app/[locale]/(main)/notifications/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/notifications/[id]/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/notifications/settings/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.notifications` namespace

---

### 🔴 **Prompt 5: Projects Actions Completion (أولوية عالية جداً)**

**الهدف:** إكمال Actions المشاريع المفقودة

**المكونات/الصفحات المطلوبة:**
1. تحديث `ProjectActions.tsx` - إضافة Actions المفقودة
2. إضافة مكونات لإدارة المشروع (start, complete, cancel, pause, resume)
3. إضافة مكون لإثبات التسليم
4. إضافة مكون لطلب التعديل

**Actions المطلوبة:**
- `PATCH /projects/{id}/status` - تحديث حالة المشروع
- `PATCH /projects/{id}/start` - بدء المشروع
- `PATCH /projects/{id}/complete` - إتمام المشروع
- `PATCH /projects/{id}/cancel` - إلغاء المشروع
- `PATCH /projects/{id}/pause` - إيقاف مؤقت
- `PATCH /projects/{id}/resume` - استئناف المشروع
- `PATCH /projects/{id}/progress` - تحديث نسبة الإنجاز
- `POST /projects/{id}/delivery-proof` - رفع إثبات التسليم
- `PUT /projects/{id}/delivery-notes` - ملاحظات التسليم
- `PATCH /projects/{id}/approve-delivery` - اعتماد التسليم
- `PATCH /projects/{id}/reject-delivery` - رفض التسليم
- `POST /projects/{id}/request-revision` - طلب تعديل
- `GET /projects/me/statistics` - إحصائيات مشاريعي

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms` (لإثبات التسليم)
- `StatusBadge` من `@/components/shared/badges`
- `ConfirmationDialog` من `@/components/shared/feedback` (للتأكيد)

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/projects.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useProjects.ts` - تحديث hook
- `frontend/eetmad/src/components/features/projects/ProjectActions.tsx` - تحديث المكون
- `frontend/eetmad/src/components/features/projects/ProjectStatusActions.tsx` - Actions الحالة
- `frontend/eetmad/src/components/features/projects/DeliveryProofForm.tsx` - نموذج إثبات التسليم
- `frontend/eetmad/src/components/features/projects/RevisionRequestForm.tsx` - نموذج طلب التعديل

**الترجمات المطلوبة:**
- إضافة translations في `pages.projects` namespace

---

### 🔴 **Prompt 6: Milestones Actions Completion (أولوية عالية جداً)**

**الهدف:** إكمال Actions المراحل المفقودة

**المكونات/الصفحات المطلوبة:**
1. إكمال TODO في `milestones/page.tsx` - approve/reject milestone
2. إضافة مكونات لإدارة المراحل (create, update, complete)
3. إضافة مكون لصرف دفعة المرحلة

**Actions المطلوبة:**
- `POST /milestones` - إضافة مرحلة
- `GET /milestones/{id}` - عرض مرحلة
- `PUT /milestones/{id}` - تحديث مرحلة
- `DELETE /milestones/{id}` - حذف مرحلة
- `PATCH /milestones/{id}/complete` - إتمام مرحلة
- `PATCH /milestones/{id}/approve` - اعتماد مرحلة (TODO موجود)
- `PATCH /milestones/{id}/reject` - رفض مرحلة (TODO موجود)
- `PATCH /milestones/{id}/release-payment` - صرف دفعة المرحلة
- `POST /milestones/{id}/attachments` - رفع مرفق
- `DELETE /milestones/{id}/attachments/{attachmentId}` - حذف مرفق
- `GET /milestones/project/{projectId}/pending` - المراحل المعلقة
- `GET /milestones/project/{projectId}/completed` - المراحل المكتملة
- `PUT /milestones/project/{projectId}/reorder` - إعادة الترتيب

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `MilestoneCard` من `@/components/features/projects` (موجود)
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms`
- `StatusBadge` من `@/components/shared/badges`
- `ConfirmationDialog` من `@/components/shared/feedback`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/milestones.ts` - إنشاء API file جديد
- `frontend/eetmad/src/lib/hooks/useMilestones.ts` - إنشاء hook جديد
- `frontend/eetmad/src/components/features/projects/MilestoneForm.tsx` - نموذج المرحلة
- `frontend/eetmad/src/components/features/projects/MilestoneActions.tsx` - Actions المرحلة
- `frontend/eetmad/src/app/[locale]/(client)/projects/[id]/milestones/page.tsx` - تحديث الصفحة (إكمال TODO)

**الترجمات المطلوبة:**
- إضافة translations في `pages.projects.milestones` namespace

---

### 🟡 **Prompt 7: Users/Profile Pages (أولوية متوسطة)**

**الهدف:** بناء 5 صفحات للملف الشخصي

**الصفحات المطلوبة:**
1. `/profile/avatar` - رفع/حذف الصورة الشخصية
2. `/profile/address` - تحديث العنوان
3. `/profile/notifications` - تفضيلات الإشعارات
4. `/profile/statistics` - إحصائياتي
5. `/profile/wallet` - رصيد المحفظة

**Actions المطلوبة:**
- `POST /users/me/avatar` - رفع صورة شخصية
- `DELETE /users/me/avatar` - حذف صورة شخصية
- `PUT /users/me/address` - تحديث العنوان
- `PUT /users/me/notification-preferences` - تفضيلات الإشعارات
- `GET /users/me/statistics` - إحصائياتي
- `GET /users/me/wallet/balance` - رصيد المحفظة

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms`
- `ImageCropper` من `@/components/shared/forms` (لرفع الصورة)
- `Avatar` من `@/components/ui/Avatar`
- `StatCard` من `@/components/shared/cards`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/users.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useUser.ts` - تحديث hook
- `frontend/eetmad/src/components/features/profile/AvatarUpload.tsx` - رفع الصورة
- `frontend/eetmad/src/components/features/profile/AddressForm.tsx` - نموذج العنوان
- `frontend/eetmad/src/components/features/profile/NotificationPreferences.tsx` - تفضيلات الإشعارات
- `frontend/eetmad/src/app/[locale]/(main)/profile/avatar/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/profile/address/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/profile/notifications/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/profile/statistics/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/profile/wallet/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.profile` namespace

---

### 🟡 **Prompt 8: Suppliers Pages (أولوية متوسطة)**

**الهدف:** بناء 6 صفحات للموردين

**الصفحات المطلوبة:**
1. `/supplier-profile/certifications` - إدارة الشهادات
2. `/supplier-profile/working-hours` - ساعات العمل
3. `/supplier-profile/verification` - طلب التوثيق
4. `/supplier-profile/earnings` - الأرباح
5. `/supplier-profile/performance` - مؤشرات الأداء
6. `/suppliers/[id]/reviews` - تقييمات المورد

**Actions المطلوبة:**
- `POST /suppliers/me/certifications` - إضافة شهادة
- `DELETE /suppliers/me/certifications/{id}` - حذف شهادة
- `PUT /suppliers/me/working-hours` - تحديث ساعات العمل
- `POST /suppliers/me/verification/request` - طلب التوثيق
- `DELETE /suppliers/me/verification/cancel` - إلغاء طلب التوثيق
- `GET /suppliers/me/earnings` - أرباحي
- `GET /suppliers/me/performance` - مؤشرات الأداء
- `GET /suppliers/{id}/reviews` - تقييمات المورد

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms` (للشهادات)
- `StatCard` من `@/components/shared/cards`
- `StatusBadge` من `@/components/shared/badges`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/suppliers.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useSupplier.ts` - تحديث hook
- `frontend/eetmad/src/components/features/supplier/CertificationsManager.tsx` - إدارة الشهادات
- `frontend/eetmad/src/components/features/supplier/WorkingHoursForm.tsx` - نموذج ساعات العمل
- `frontend/eetmad/src/components/features/supplier/VerificationRequest.tsx` - طلب التوثيق
- `frontend/eetmad/src/app/[locale]/(supplier)/supplier-profile/certifications/page.tsx`
- `frontend/eetmad/src/app/[locale]/(supplier)/supplier-profile/working-hours/page.tsx`
- `frontend/eetmad/src/app/[locale]/(supplier)/supplier-profile/verification/page.tsx`
- `frontend/eetmad/src/app/[locale]/(supplier)/supplier-profile/earnings/page.tsx`
- `frontend/eetmad/src/app/[locale]/(supplier)/supplier-profile/performance/page.tsx`
- `frontend/eetmad/src/app/[locale]/(public)/suppliers/[id]/reviews/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.supplier` namespace

---

### 🟡 **Prompt 9: Requests Enhancements (أولوية متوسطة)**

**الهدف:** إضافة مكونات/صفحات للطلبات

**المكونات/الصفحات المطلوبة:**
1. إضافة مكون لإدارة المرفقات في صفحة تفاصيل الطلب
2. إضافة مكون لاختيار عرض فائز
3. إضافة صفحة إحصائيات الطلبات

**Actions المطلوبة:**
- `POST /requests/{id}/attachments` - رفع مرفق
- `DELETE /requests/{id}/attachments/{attachmentId}` - حذف مرفق
- `POST /requests/{id}/select-offer` - اختيار عرض فائز
- `DELETE /requests/{id}/unselect-offer` - إلغاء اختيار العرض
- `GET /requests/me/statistics` - إحصائيات طلباتي

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `FileUpload` من `@/components/shared/forms`
- `ConfirmationDialog` من `@/components/shared/feedback`
- `StatCard` من `@/components/shared/cards`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/requests.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/components/features/requests/RequestAttachments.tsx` - إدارة المرفقات
- `frontend/eetmad/src/components/features/requests/SelectOfferDialog.tsx` - اختيار عرض فائز
- تحديث `frontend/eetmad/src/app/[locale]/(client)/requests/[id]/page.tsx` - إضافة المكونات

**الترجمات المطلوبة:**
- إضافة translations في `pages.requests` namespace

---

### 🟡 **Prompt 10: Offers Enhancements (أولوية متوسطة)**

**الهدف:** إضافة مكونات للعروض

**المكونات المطلوبة:**
1. إضافة مكون لإدارة المرفقات في صفحة تفاصيل العرض
2. إضافة مكون لمقارنة العروض

**Actions المطلوبة:**
- `POST /offers/{id}/attachments` - رفع مرفق
- `DELETE /offers/{id}/attachments/{attachmentId}` - حذف مرفق
- `POST /offers/compare` - مقارنة العروض

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `FileUpload` من `@/components/shared/forms`
- `Card` من `@/components/ui`
- `OfferCard` من `@/components/features/offers` (موجود)

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/offers.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/components/features/offers/OfferAttachments.tsx` - إدارة المرفقات
- `frontend/eetmad/src/components/features/offers/OfferComparison.tsx` - مقارنة العروض
- تحديث `frontend/eetmad/src/app/[locale]/(supplier)/offers/[id]/page.tsx` - إضافة المكونات

**الترجمات المطلوبة:**
- إضافة translations في `pages.offers` namespace

---

### 🟡 **Prompt 11: Reviews Pages (أولوية متوسطة)**

**الهدف:** بناء 4 صفحات للتقييمات

**الصفحات المطلوبة:**
1. `/reviews/new` - إضافة تقييم
2. `/reviews/[id]` - تفاصيل تقييم
3. `/reviews/[id]/respond` - الرد على تقييم
4. `/reviews/supplier/[id]` - تقييمات مورد

**Actions المطلوبة:**
- `POST /reviews` - إضافة تقييم
- `GET /reviews/{id}` - عرض تقييم
- `POST /reviews/{id}/respond` - الرد على تقييم
- `GET /reviews/supplier/{supplierId}` - تقييمات مورد
- `GET /reviews/supplier/{supplierId}/average` - متوسط التقييم
- `GET /reviews/supplier/{supplierId}/statistics` - إحصائيات

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `RatingDisplay` من `@/components/shared/badges` (موجود)
- `ReviewFormFields` من `@/components/features/reviews` (موجود)

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/reviews.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useReviews.ts` - تحديث hook
- `frontend/eetmad/src/app/[locale]/(main)/reviews/new/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/reviews/[id]/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/reviews/[id]/respond/page.tsx`
- `frontend/eetmad/src/app/[locale]/(public)/suppliers/[id]/reviews/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.reviews` namespace

---

### 🟡 **Prompt 12: Disputes Pages (أولوية متوسطة)**

**الهدف:** بناء 3 صفحات للنزاعات

**الصفحات المطلوبة:**
1. `/disputes` - قائمة نزاعاتي
2. `/disputes/new` - رفع نزاع
3. `/disputes/[id]` - تفاصيل نزاع

**Actions المطلوبة:**
- `GET /disputes/me` - نزاعاتي
- `POST /disputes` - رفع نزاع
- `GET /disputes/{id}` - تفاصيل نزاع
- `PUT /disputes/{id}` - تحديث نزاع
- `PATCH /disputes/{id}/close` - إغلاق نزاع
- `POST /disputes/{id}/evidence` - رفع دليل
- `POST /disputes/{id}/messages` - إضافة رسالة
- `GET /disputes/{id}/messages` - رسائل النزاع

**المكونات الموجودة التي يجب استخدامها:**
- `Button` من `@/components/ui`
- `Card` من `@/components/ui`
- `FormField` من `@/components/shared/forms`
- `FileUpload` من `@/components/shared/forms` (للأدلة)
- `StatusBadge` من `@/components/shared/badges`
- `ResourceGrid` من `@/components/shared/data-display`

**الملفات المطلوبة:**
- `frontend/eetmad/src/lib/api/disputes.ts` - إضافة Actions المفقودة
- `frontend/eetmad/src/lib/hooks/useDisputes.ts` - تحديث hook
- `frontend/eetmad/src/components/features/disputes/DisputeCard.tsx` - بطاقة نزاع
- `frontend/eetmad/src/components/features/disputes/DisputeForm.tsx` - نموذج النزاع
- `frontend/eetmad/src/components/features/disputes/DisputeMessages.tsx` - رسائل النزاع
- `frontend/eetmad/src/app/[locale]/(main)/disputes/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/disputes/new/page.tsx`
- `frontend/eetmad/src/app/[locale]/(main)/disputes/[id]/page.tsx`

**الترجمات المطلوبة:**
- إضافة translations في `pages.disputes` namespace

---

## 📝 تعليمات الاستخدام

### لكل Prompt:

1. **اقرأ `docs/ai-instruction.md`** قبل البدء
2. **اقرأ `docs/build-prompt.md`** قبل البدء
3. **فحص المكونات الموجودة** في:
   - `frontend/eetmad/src/components/ui/`
   - `frontend/eetmad/src/components/shared/`
   - `frontend/eetmad/src/components/features/`
4. **استخدم المكونات الموجودة** - ممنوع التكرار
5. **اتبع Design Guidelines** من `docs/design-sample.md`
6. **أضف Translations** إلى `frontend/eetmad/messages/en.json` و `frontend/eetmad/messages/ar.json`
7. **استخدم Mock Data** من `frontend/eetmad/src/mocks/data/`
8. **اتبع TypeScript Types** من `@/lib/types`

---

## ✅ Checklist لكل Prompt

- [ ] قراءة `docs/ai-instruction.md`
- [ ] قراءة `docs/build-prompt.md`
- [ ] فحص المكونات الموجودة في `components/`
- [ ] استخدام المكونات الموجودة (لا تكرار)
- [ ] استخدام `cssVars` (لا hardcode)
- [ ] استخدام `useTranslations` (لا hardcode)
- [ ] استخدام types من `@/lib/types`
- [ ] مطابقة API endpoints من `docs/docs/endpoints.md`
- [ ] إضافة translations إلى `messages/en.json` و `messages/ar.json`
- [ ] استخدام Mock Data من `mocks/data/`
- [ ] اختبار الصفحات/المكونات

---

**تم إعداد الملف بواسطة:** AI Project Manager  
**التاريخ:** 2025-01-27  
**الحالة:** ✅ **جاهز للاستخدام**

