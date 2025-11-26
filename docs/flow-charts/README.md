# 🗺️ خرائط التدفق الشاملة - Comprehensive Flow Charts

هذا المجلد يحتوي على جميع خرائط التدفق للمنصة، مقسمة حسب المستخدم والوظيفة.

## 📂 هيكل المجلد

### 1️⃣ تدفقات العميل (Client Flows)
- [01-client-registration.md](./client/01-client-registration.md) - رحلة التسجيل وإعداد الحساب
- [02-client-create-request.md](./client/02-client-create-request.md) - إنشاء طلب جديد
- [03-client-review-offers.md](./client/03-client-review-offers.md) - مراجعة العروض واختيار المورد
- [04-client-payment-start.md](./client/04-client-payment-start.md) - دفع العربون وبدء المشروع
- [05-client-project-tracking.md](./client/05-client-project-tracking.md) - متابعة المشروع والتسليمات
- [06-client-project-completion.md](./client/06-client-project-completion.md) - إتمام المشروع والتقييم
- [07-client-dispute.md](./client/07-client-dispute.md) - فتح نزاع

### 2️⃣ تدفقات المورد (Supplier Flows)
- [01-supplier-registration.md](./supplier/01-supplier-registration.md) - التسجيل والتحقق
- [02-supplier-browse-submit.md](./supplier/02-supplier-browse-submit.md) - البحث عن طلبات وتقديم عروض
- [03-supplier-contract-project.md](./supplier/03-supplier-contract-project.md) - التعامل مع العقد والمشروع
- [04-supplier-earnings-withdrawal.md](./supplier/04-supplier-earnings-withdrawal.md) - إدارة الأرباح والسحب

### 3️⃣ تدفقات الإدارة (Admin Flows)
- [01-admin-supplier-review.md](./admin/01-admin-supplier-review.md) - مراجعة تسجيل الموردين
- [02-admin-dispute-management.md](./admin/02-admin-dispute-management.md) - إدارة النزاعات

### 4️⃣ تدفقات المعاملات المالية (Payment Flows)
- [01-payment-cycle.md](./payment/01-payment-cycle.md) - دورة الدفع الكاملة
- [02-escrow-release.md](./payment/02-escrow-release.md) - إطلاق الدفعات من Escrow
- [03-withdrawal-processing.md](./payment/03-withdrawal-processing.md) - معالجة السحوبات

### 5️⃣ تدفقات الإشعارات والرسائل (Notification & Messaging Flows)
- [01-notification-system.md](./notification/01-notification-system.md) - نظام الإشعارات الشامل
- [02-messaging-system.md](./notification/02-messaging-system.md) - نظام المراسلة الكامل

### 6️⃣ حالات الطوارئ والأخطاء (Emergency & Error Flows)
- [01-technical-errors.md](./emergency/01-technical-errors.md) - التعامل مع الأخطاء التقنية
- [02-security-threats.md](./emergency/02-security-threats.md) - التعامل مع محاولات الاختراق والأمن

## 🎯 الغرض من هذه الخرائط

هذه الخرائط توفر:
- **فهم شامل** لجميع تدفقات المستخدمين في المنصة
- **توثيق كامل** لجميع الحالات والسيناريوهات المحتملة
- **مرجع تقني** للمطورين والمصممين
- **دليل اختبار** لفريق QA
- **وثائق تدريب** للفرق الجديدة

## 📊 كيفية استخدام الخرائط

1. **للمطورين**: استخدم الخرائط لفهم المنطق والتدفقات قبل التطوير
2. **للمصممين**: راجع تجربة المستخدم وتأكد من تغطية جميع الحالات
3. **لفريق QA**: استخدم الخرائط لإنشاء حالات اختبار شاملة
4. **للإدارة**: فهم العمليات الكاملة واتخاذ قرارات مستنيرة

## 🔄 التحديثات

آخر تحديث: 25-11-2025

---

> **ملاحظة**: جميع الخرائط مكتوبة بصيغة Mermaid وقابلة للعرض في أي محرر يدعم Mermaid diagrams.
