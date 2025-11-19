API Endpoints - التنظيم الكامل
Authentication & Authorization /api/v1/auth
POST /auth/register # تسجيل مستخدم جديد
POST /auth/login # تسجيل الدخول
POST /auth/logout # تسجيل الخروج
POST /auth/refresh-token # تجديد الـ token
POST /auth/forgot-password # نسيت كلمة المرور
POST /auth/reset-password # إعادة تعيين كلمة المرور
POST /auth/change-password # تغيير كلمة المرور
POST /auth/verify-email # التحقق من البريد
POST /auth/verify-phone # التحقق من الجوال
POST /auth/resend-verification # إعادة إرسال رمز التحقق
POST /auth/logout-all # تسجيل الخروج من جميع الأجهزة

# Two-Factor Authentication

POST /auth/2fa/enable # تفعيل المصادقة الثنائية
POST /auth/2fa/disable # تعطيل المصادقة الثنائية
POST /auth/2fa/verify # التحقق من رمز 2FA
GET /auth/2fa/backup-codes # إنشاء رموز احتياطية

Users /api/v1/users

# Profile Management

GET /users/me # معلوماتي الشخصية
PUT /users/me # تحديث الملف الشخصي
DELETE /users/me # حذف الحساب
PATCH /users/me/deactivate # تعطيل الحساب
PATCH /users/me/reactivate # إعادة تفعيل الحساب

# Avatar

POST /users/me/avatar # رفع صورة شخصية
DELETE /users/me/avatar # حذف صورة شخصية

# Address & Preferences

PUT /users/me/address # تحديث العنوان
PUT /users/me/notification-preferences # تفضيلات الإشعارات

# Statistics & Info

GET /users/me/statistics # إحصائياتي
GET /users/me/wallet/balance # رصيد المحفظة
GET /users/{id} # عرض ملف مستخدم عام
GET /users/{id}/public-profile # الملف العام للمستخدم

# Admin Only

GET /users # قائمة المستخدمين (Admin)
GET /users/{id}/full # تفاصيل كاملة (Admin)
PATCH /users/{id}/suspend # تعليق مستخدم (Admin)
PATCH /users/{id}/unsuspend # إلغاء التعليق (Admin)
PATCH /users/{id}/ban # حظر مستخدم (Admin)
PATCH /users/{id}/unban # إلغاء الحظر (Admin)

Supplier Profiles /api/v1/suppliers

# Supplier Management

POST /suppliers/profile # إنشاء ملف مورد
GET /suppliers/me # ملفي كمورد
PUT /suppliers/me # تحديث ملفي
DELETE /suppliers/me # حذف ملف المورد

# Portfolio

POST /suppliers/me/portfolio # إضافة عمل للمعرض
PUT /suppliers/me/portfolio/{id} # تحديث عمل
DELETE /suppliers/me/portfolio/{id} # حذف عمل

# Certifications

POST /suppliers/me/certifications # إضافة شهادة
DELETE /suppliers/me/certifications/{id} # حذف شهادة

# Working Hours

PUT /suppliers/me/working-hours # تحديث ساعات العمل

# Verification

POST /suppliers/me/verification/request # طلب التوثيق
DELETE /suppliers/me/verification/cancel # إلغاء طلب التوثيق

# Statistics

GET /suppliers/me/statistics # إحصائيات المورد
GET /suppliers/me/earnings # أرباحي
GET /suppliers/me/performance # مؤشرات الأداء

# Public Search & View

GET /suppliers # البحث في الموردين
GET /suppliers/{id} # عرض ملف مورد
GET /suppliers/{id}/reviews # تقييمات المورد
GET /suppliers/top-rated # أعلى الموردين تقييماً
GET /suppliers/category/{categoryId} # موردين حسب الفئة

Categories /api/v1/categories

# Public Endpoints

GET /categories # جميع الفئات
GET /categories/tree # شجرة الفئات
GET /categories/active # الفئات النشطة
GET /categories/{id} # فئة محددة
GET /categories/{id}/subcategories # الفئات الفرعية
GET /categories/parent # الفئات الرئيسية

# Admin Only

POST /categories # إنشاء فئة
PUT /categories/{id} # تحديث فئة
DELETE /categories/{id} # حذف فئة
PATCH /categories/{id}/activate # تفعيل فئة
PATCH /categories/{id}/deactivate # تعطيل فئة
PUT /categories/reorder # إعادة ترتيب الفئات

Supplier Categories /api/v1/supplier-categories

# Supplier Management

POST /supplier-categories # ربط فئة بمورد
DELETE /supplier-categories/{id} # إزالة فئة من مورد
PATCH /supplier-categories/{id}/primary # تحديد كفئة أساسية
PUT /supplier-categories/bulk # تحديث جماعي للفئات

# Query

GET /supplier-categories/supplier/{supplierId} # فئات مورد معين
GET /supplier-categories/category/{categoryId} # موردين في فئة

Requests /api/v1/requests

# Request Management (Client)

POST /requests # إنشاء طلب
GET /requests/me # طلباتي
GET /requests/{id} # عرض طلب
PUT /requests/{id} # تحديث طلب
DELETE /requests/{id} # حذف طلب
PATCH /requests/{id}/publish # نشر طلب
PATCH /requests/{id}/close # إغلاق طلب
PATCH /requests/{id}/cancel # إلغاء طلب
PATCH /requests/{id}/extend-deadline # تمديد الموعد

# Attachments

POST /requests/{id}/attachments # رفع مرفق
DELETE /requests/{id}/attachments/{attachmentId} # حذف مرفق

# Offer Selection

POST /requests/{id}/select-offer # اختيار عرض فائز
DELETE /requests/{id}/unselect-offer # إلغاء اختيار العرض

# Public Search & Browse

GET /requests # البحث في الطلبات
GET /requests/active # الطلبات النشطة
GET /requests/category/{categoryId} # طلبات حسب الفئة
GET /requests/{id}/offers # عروض طلب معين
PATCH /requests/{id}/increment-views # زيادة المشاهدات

# Statistics

GET /requests/me/statistics # إحصائيات طلباتي

Offers /api/v1/offers

# Offer Management (Supplier)

POST /offers # تقديم عرض
GET /offers/me # عروضي
GET /offers/{id} # عرض تفاصيل عرض
PUT /offers/{id} # تحديث عرض
DELETE /offers/{id} # سحب عرض
PATCH /offers/{id}/withdraw # سحب العرض رسمياً

# Attachments

POST /offers/{id}/attachments # رفع مرفق
DELETE /offers/{id}/attachments/{attachmentId} # حذف مرفق

# Client Actions

PATCH /offers/{id}/accept # قبول عرض (Client)
PATCH /offers/{id}/reject # رفض عرض (Client)
PUT /offers/{id}/client-notes # ملاحظات العميل

# Admin Actions

PUT /offers/{id}/admin-notes # ملاحظات الإدارة
PATCH /offers/{id}/flag # الإبلاغ عن عرض

# Query & Compare

GET /offers/request/{requestId} # عروض طلب معين
POST /offers/compare # مقارنة العروض
GET /offers/{id}/statistics # إحصائيات العرض

Projects /api/v1/projects

# Project Management

GET /projects/me # مشاريعي
GET /projects/{id} # تفاصيل مشروع
PATCH /projects/{id}/status # تحديث حالة المشروع
PATCH /projects/{id}/start # بدء المشروع
PATCH /projects/{id}/complete # إتمام المشروع
PATCH /projects/{id}/cancel # إلغاء المشروع
PATCH /projects/{id}/pause # إيقاف مؤقت
PATCH /projects/{id}/resume # استئناف المشروع
PATCH /projects/{id}/progress # تحديث نسبة الإنجاز

# Delivery Management (Supplier)

POST /projects/{id}/delivery-proof # رفع إثبات التسليم
PUT /projects/{id}/delivery-notes # ملاحظات التسليم

# Client Actions

PATCH /projects/{id}/approve-delivery # اعتماد التسليم
PATCH /projects/{id}/reject-delivery # رفض التسليم
POST /projects/{id}/request-revision # طلب تعديل

# Query & Filter

GET /projects/active # المشاريع النشطة
GET /projects/completed # المشاريع المكتملة
GET /projects/status/{status} # المشاريع حسب الحالة
GET /projects/{id}/timeline # الجدول الزمني
GET /projects/me/statistics # إحصائيات مشاريعي

Contracts /api/v1/contracts

# Contract Management

POST /contracts # إنشاء عقد
GET /contracts/{id} # عرض عقد
PUT /contracts/{id} # تحديث عقد
DELETE /contracts/{id} # إلغاء عقد
GET /contracts/project/{projectId} # عقد المشروع

# Signing

POST /contracts/{id}/sign # توقيع العقد
POST /contracts/{id}/sign/client # توقيع العميل
POST /contracts/{id}/sign/supplier # توقيع المورد

# Versions

POST /contracts/{id}/versions # إنشاء نسخة جديدة
GET /contracts/{id}/versions # عرض النسخ
GET /contracts/{id}/versions/{version} # نسخة محددة

# Custom Clauses

POST /contracts/{id}/clauses # إضافة بند مخصص
DELETE /contracts/{id}/clauses/{clauseId} # حذف بند

# Export

GET /contracts/{id}/download # تنزيل PDF
GET /contracts/{id}/status # حالة العقد

Project Milestones /api/v1/milestones

# Milestone Management

POST /milestones # إضافة مرحلة
GET /milestones/{id} # عرض مرحلة
PUT /milestones/{id} # تحديث مرحلة
DELETE /milestones/{id} # حذف مرحلة
PATCH /milestones/{id}/complete # إتمام مرحلة

# Approval (Client)

PATCH /milestones/{id}/approve # اعتماد مرحلة
PATCH /milestones/{id}/reject # رفض مرحلة

# Payment

PATCH /milestones/{id}/release-payment # صرف دفعة المرحلة

# Attachments

POST /milestones/{id}/attachments # رفع مرفق
DELETE /milestones/{id}/attachments/{attachmentId} # حذف مرفق

# Query

GET /milestones/project/{projectId} # مراحل مشروع
GET /milestones/project/{projectId}/pending # المراحل المعلقة
GET /milestones/project/{projectId}/completed # المراحل المكتملة
PUT /milestones/project/{projectId}/reorder # إعادة الترتيب

Payments /api/v1/payments

# Payment Processing

POST /payments/initiate # بدء عملية دفع
POST /payments/{id}/process # معالجة الدفع
POST /payments/{id}/confirm # تأكيد الدفع
DELETE /payments/{id}/cancel # إلغاء الدفع

# Refunds

POST /payments/{id}/refund # استرجاع كامل
POST /payments/{id}/refund/partial # استرجاع جزئي

# Payment Release

POST /payments/{id}/release # تحويل للمورد

# Query

GET /payments/{id} # تفاصيل دفعة
GET /payments/me # دفعاتي
GET /payments/project/{projectId} # دفعات مشروع
GET /payments/history # سجل الدفعات
GET /payments/pending # الدفعات المعلقة
GET /payments/failed # الدفعات الفاشلة
GET /payments/statistics # إحصائيات الدفع

# Platform Fee

POST /payments/calculate-fee # حساب العمولة

Payment Gateway Transactions /api/v1/payment-gateway

# Gateway Integration

POST /payment-gateway/transaction # إنشاء معاملة
PATCH /payment-gateway/{id}/status # تحديث الحالة
POST /payment-gateway/webhook # webhook من البوابة
POST /payment-gateway/{id}/retry # إعادة محاولة
POST /payment-gateway/{id}/verify # التحقق من المعاملة

# Query

GET /payment-gateway/{id} # معاملة محددة
GET /payment-gateway/payment/{paymentId} # معاملات دفعة
GET /payment-gateway/failed # المعاملات الفاشلة
GET /payment-gateway/gateway/{name} # معاملات بوابة معينة

Wallet /api/v1/wallet

# Wallet Operations

POST /wallet/add-funds # إضافة رصيد
POST /wallet/withdraw # سحب رصيد
POST /wallet/transfer # تحويل رصيد
POST /wallet/freeze # تجميد مبلغ
POST /wallet/unfreeze # إلغاء تجميد
POST /wallet/refund # استرجاع للمحفظة

# Query

GET /wallet/balance # عرض الرصيد
GET /wallet/transactions # معاملات المحفظة
GET /wallet/statement # كشف حساب
GET /wallet/statement/export # تصدير كشف الحساب
GET /wallet/transactions/{id} # تفاصيل معاملة

Verification Documents /api/v1/verification

# Document Management (User)

POST /verification/documents # رفع مستند
GET /verification/documents/me # مستنداتي
GET /verification/documents/{id} # عرض مستند
PUT /verification/documents/{id} # تحديث مستند
DELETE /verification/documents/{id} # حذف مستند
POST /verification/documents/{id}/resubmit # إعادة إرسال

# Admin Review

GET /verification/documents # جميع المستندات (Admin)
GET /verification/documents/pending # المستندات المعلقة
PATCH /verification/documents/{id}/review # مراجعة مستند
PATCH /verification/documents/{id}/approve # الموافقة
PATCH /verification/documents/{id}/reject # الرفض
POST /verification/documents/{id}/request-info # طلب معلومات

# Query

GET /verification/documents/user/{userId} # مستندات مستخدم
GET /verification/documents/approved # المستندات الموافق عليها
GET /verification/documents/expiring # المستندات قاربت على الانتهاء

Reviews /api/v1/reviews

# Review Management

POST /reviews # إضافة تقييم
GET /reviews/{id} # عرض تقييم
PUT /reviews/{id} # تحديث تقييم
DELETE /reviews/{id} # حذف تقييم
POST /reviews/{id}/respond # الرد على تقييم

# Interaction

PATCH /reviews/{id}/helpful # تقييم مفيد
PATCH /reviews/{id}/not-helpful # تقييم غير مفيد
POST /reviews/{id}/report # الإبلاغ عن تقييم

# Admin Actions

PATCH /reviews/{id}/verify # توثيق تقييم (Admin)
PATCH /reviews/{id}/hide # إخفاء تقييم (Admin)

# Query

GET /reviews/project/{projectId} # تقييمات مشروع
GET /reviews/user/{userId} # تقييمات مستخدم
GET /reviews/supplier/{supplierId} # تقييمات مورد
GET /reviews/supplier/{supplierId}/average # متوسط التقييم
GET /reviews/supplier/{supplierId}/statistics # إحصائيات
GET /reviews/top-rated # التقييمات الأعلى

Conversations & Messages /api/v1/conversations

# Conversation Management

POST /conversations # بدء محادثة
GET /conversations # محادثاتي
GET /conversations/{id} # عرض محادثة
PATCH /conversations/{id}/close # إغلاق محادثة
PATCH /conversations/{id}/archive # أرشفة محادثة
PATCH /conversations/{id}/unarchive # إلغاء الأرشفة
PATCH /conversations/{id}/mute # كتم الإشعارات
PATCH /conversations/{id}/unmute # إلغاء الكتم

# Messages

POST /conversations/{id}/messages # إرسال رسالة
GET /conversations/{id}/messages # رسائل المحادثة
PUT /messages/{id} # تعديل رسالة
DELETE /messages/{id} # حذف رسالة
PATCH /messages/{id}/read # تعليم كمقروء
PATCH /conversations/{id}/messages/read-all # تعليم الكل كمقروء

# Attachments

POST /messages/{id}/attachments # رفع مرفق
DELETE /messages/{id}/attachments/{attachmentId} # حذف مرفق

# System Messages

POST /conversations/{id}/system-message # إرسال رسالة نظام

# Query

GET /messages/unread/count # عدد الرسائل غير المقروءة
GET /messages/search # البحث في الرسائل

Notifications /api/v1/notifications

# Notification Management

GET /notifications # إشعاراتي
GET /notifications/{id} # عرض إشعار
PATCH /notifications/{id}/read # تعليم كمقروء
PATCH /notifications/read-all # تعليم الكل كمقروء
DELETE /notifications/{id} # حذف إشعار
DELETE /notifications/clear-all # حذف جميع الإشعارات

# Query

GET /notifications/unread # الإشعارات غير المقروءة
GET /notifications/unread/count # عدد الإشعارات غير المقروءة
GET /notifications/type/{type} # الإشعارات حسب النوع

# Admin - Send Notifications

POST /notifications/send # إرسال إشعار (Admin)
POST /notifications/broadcast # إشعار جماعي (Admin)

Disputes /api/v1/disputes

# Dispute Management

POST /disputes # رفع نزاع
GET /disputes/me # نزاعاتي
GET /disputes/{id} # تفاصيل نزاع
PUT /disputes/{id} # تحديث نزاع
PATCH /disputes/{id}/close # إغلاق نزاع
POST /disputes/{id}/evidence # رفع دليل

# Admin Actions

PATCH /disputes/{id}/resolve # حل نزاع
PATCH /disputes/{id}/escalate # تصعيد نزاع
PATCH /disputes/{id}/assign # تعيين لمشرف

# Dispute Messages

POST /disputes/{id}/messages # إضافة رسالة
GET /disputes/{id}/messages # رسائل النزاع
POST /disputes/{id}/internal-note # ملاحظة داخلية (Admin)

# Query

GET /disputes # جميع النزاعات (Admin)
GET /disputes/pending # النزاعات المعلقة
GET /disputes/resolved # النزاعات المحلولة
GET /disputes/statistics # إحصائيات النزاعات

OTP Verification /api/v1/otp
POST /otp/generate # إنشاء رمز OTP
POST /otp/send # إرسال رمز OTP
POST /otp/verify # التحقق من الرمز
POST /otp/resend # إعادة إرسال الرمز
DELETE /otp/expire # إلغاء صلاحية الرمز
GET /otp/check-validity # التحقق من الصلاحية
GET /otp/attempts # عدد المحاولات

Audit Logs /api/v1/audit

# Log Management (Admin Only)

GET /audit/logs # عرض السجلات
GET /audit/logs/{id} # سجل محدد
GET /audit/logs/user/{userId} # سجلات مستخدم
GET /audit/logs/entity/{entityType} # السجلات حسب الكيان
GET /audit/logs/action/{action} # السجلات حسب الفعل
GET /audit/logs/search # البحث في السجلات
GET /audit/logs/export # تصدير السجلات

# Manual Logging

POST /audit/log # تسجيل حدث يدوي
POST /audit/log/security # تسجيل حدث أمني

Content Pages /api/v1/pages

# Public Access

GET /pages # جميع الصفحات المنشورة
GET /pages/slug/{slug} # صفحة بالرابط
GET /pages/{id} # صفحة محددة
GET /pages/type/{type} # الصفحات حسب النوع

# Admin Management

POST /pages # إنشاء صفحة
PUT /pages/{id} # تحديث صفحة
DELETE /pages/{id} # حذف صفحة
PATCH /pages/{id}/publish # نشر صفحة
PATCH /pages/{id}/unpublish # إلغاء النشر
PUT /pages/reorder # إعادة الترتيب

FAQ /api/v1/faq

# Public Access

GET /faq # جميع الأسئلة المنشورة
GET /faq/{id} # سؤال محدد
GET /faq/category/{categoryId} # أسئلة حسب الفئة
GET /faq/search # البحث في الأسئلة
GET /faq/popular # الأسئلة الأكثر مشاهدة

# User Interaction

PATCH /faq/{id}/helpful # تقييم مفيد
PATCH /faq/{id}/not-helpful # تقييم غير مفيد
PATCH /faq/{id}/increment-views # زيادة المشاهدات

# Admin Management

POST /faq # إضافة سؤال
PUT /faq/{id} # تحديث سؤال
DELETE /faq/{id} # حذف سؤال
PATCH /faq/{id}/publish # نشر سؤال
PATCH /faq/{id}/unpublish # إلغاء النشر
PUT /faq/reorder # إعادة الترتيب

System Settings /api/v1/settings

# Public Settings

GET /settings/public # الإعدادات العامة
GET /settings/key/{key} # إعداد محدد

# Admin Management

GET /settings # جميع الإعدادات
POST /settings # إضافة إعداد
PUT /settings/{id} # تحديث إعداد
DELETE /settings/{id} # حذف إعداد
PATCH /settings/{id}/reset # إعادة للقيمة الافتراضية
PUT /settings/bulk # تحديث جماعي
GET /settings/category/{category} # الإعدادات حسب الفئة

Platform Commission /api/v1/commission

# Commission Rules (Admin)

POST /commission/rules # إنشاء قاعدة عمولة
GET /commission/rules # جميع القواعد
GET /commission/rules/{id} # قاعدة محددة
PUT /commission/rules/{id} # تحديث قاعدة
DELETE /commission/rules/{id} # حذف قاعدة
PATCH /commission/rules/{id}/activate # تفعيل قاعدة
PATCH /commission/rules/{id}/deactivate # تعطيل قاعدة

# Calculations

POST /commission/calculate # حساب العمولة
POST /commission/apply # تطبيق العمولة

# Query

GET /commission/rules/active # القواعد النشطة
GET /commission/rules/category/{categoryId} # عمولة حسب الفئة
GET /commission/statistics # إحصائيات العمولات

Refunds /api/v1/refunds

# Refund Management

POST /refunds # طلب استرجاع
GET /refunds/me # طلبات الاسترجاع الخاصة بي
GET /refunds/{id} # تفاصيل استرجاع
DELETE /refunds/{id} # إلغاء طلب استرجاع

# Admin Actions

GET /refunds # جميع الطلبات (Admin)
GET /refunds/pending # الطلبات المعلقة
PATCH /refunds/{id}/process # معالجة استرجاع
PATCH /refunds/{id}/approve # الموافقة على استرجاع
PATCH /refunds/{id}/reject # رفض استرجاع
PATCH /refunds/{id}/complete # إتمام الاسترجاع

# Statistics

GET /refunds/statistics # إحصائيات الاسترجاعات
GET /refunds/approved # الطلبات الموافق عليها

Saved Searches /api/v1/saved-searches
POST /saved-searches # حفظ بحث
GET /saved-searches # عمليات البحث المحفوظة
GET /saved-searches/{id} # بحث محدد
PUT /saved-searches/{id} # تحديث بحث
DELETE /saved-searches/{id} # حذف بحث
PATCH /saved-searches/{id}/notifications/enable # تفعيل الإشعارات
PATCH /saved-searches/{id}/notifications/disable # تعطيل الإشعارات
POST /saved-searches/{id}/execute # تنفيذ البحث
GET /saved-searches/{id}/results # نتائج البحث

Bookmarks /api/v1/bookmarks
POST /bookmarks # إضافة للمفضلة
GET /bookmarks # المفضلة الخاصة بي
GET /bookmarks/{id} # عرض مفضلة
DELETE /bookmarks/{id} # إزالة من المفضلة
PUT /bookmarks/{id}/notes # تحديث ملاحظات
DELETE /bookmarks/clear # مسح جميع المفضلة
GET /bookmarks/type/{type} # المفضلة حسب النوع
POST /bookmarks/check # التحقق من الإضافة

Reports /api/v1/reports

# Report Management

POST /reports # تقديم بلاغ
GET /reports/me # بلاغاتي
GET /reports/{id} # تفاصيل بلاغ
PUT /reports/{id} # تحديث بلاغ

# Admin Actions

GET /reports # جميع البلاغات (Admin)
GET /reports/pending # البلاغات المعلقة
PATCH /reports/{id}/review # مراجعة بلاغ
PATCH /reports/{id}/resolve # حل بلاغ
PATCH /reports/{id}/dismiss # رفض بلاغ
POST /reports/{id}/take-action # اتخاذ إجراء

# Query

GET /reports/type/{type} # البلاغات حسب النوع
GET /reports/resolved # البلاغات المحلولة
GET /reports/statistics # إحصائيات البلاغات

Promotions /api/v1/promotions

# Public Access

GET /promotions/active # الحملات النشطة
GET /promotions/code/{code} # البحث بالكود
POST /promotions/validate # التحقق من كود

# User Actions

POST /promotions/apply # تطبيق كود خصم
DELETE /promotions/remove # إلغاء كود

# Admin Management

POST /promotions # إنشاء حملة
GET /promotions # جميع الحملات
GET /promotions/{id} # حملة محددة
PUT /promotions/{id} # تحديث حملة
DELETE /promotions/{id} # حذف حملة
PATCH /promotions/{id}/activate # تفعيل حملة
PATCH /promotions/{id}/deactivate # تعطيل حملة
PATCH /promotions/{id}/extend # تمديد حملة

# Statistics

GET /promotions/{id}/statistics # إحصائيات الحملة
GET /promotions/{id}/usage # سجل الاستخدام

Promotion Usage /api/v1/promotion-usage
POST /promotion-usage # تسجيل استخدام
GET /promotion-usage/promotion/{promotionId} # استخدامات حملة
GET /promotion-usage/user/{userId} # سجل استخدام مستخدم
GET /promotion-usage/statistics # إحصائيات الاستخدام

Subscriptions /api/v1/subscriptions

# Subscription Management

POST /subscriptions # إنشاء اشتراك
GET /subscriptions/me # اشتراكي الحالي
GET /subscriptions/{id} # تفاصيل اشتراك
PUT /subscriptions/{id} # تحديث اشتراك
DELETE /subscriptions/{id}/cancel # إلغاء اشتراك
POST /subscriptions/{id}/renew # تجديد اشتراك
PATCH /subscriptions/{id}/upgrade # ترقية الاشتراك
PATCH /subscriptions/{id}/downgrade # تخفيض الاشتراك
PATCH /subscriptions/{id}/pause # إيقاف مؤقت
PATCH /subscriptions/{id}/resume # استئناف الاشتراك

# Query

GET /subscriptions/history # سجل الاشتراكات
GET /subscriptions/active # الاشتراكات النشطة (Admin)
GET /subscriptions/expiring # الاشتراكات القاربة على الانتهاء
GET /subscriptions/statistics # إحصائيات الاشتراكات

Dashboard & Analytics /api/v1/dashboard

# User Dashboard

GET /dashboard/overview # نظرة عامة
GET /dashboard/statistics # إحصائيات شاملة
GET /dashboard/recent-activity # النشاط الأخير

# Supplier Dashboard

GET /dashboard/supplier/earnings # أرباحي
GET /dashboard/supplier/performance # مؤشرات الأداء
GET /dashboard/supplier/projects # إحصائيات المشاريع

# Client Dashboard

GET /dashboard/client/spending # مصروفاتي
GET /dashboard/client/projects # إحصائيات المشاريع

# Admin Dashboard

GET /dashboard/admin/overview # نظرة عامة شاملة
GET /dashboard/admin/revenue # تقرير الإيرادات
GET /dashboard/admin/users # تقرير المستخدمين
GET /dashboard/admin/growth # تقرير النمو
GET /dashboard/admin/projects # تقرير المشاريع
GET /dashboard/admin/payments # تقرير المدفوعات
GET /dashboard/admin/disputes # تقرير النزاعات
GET /dashboard/admin/performance # مؤشرات الأداء
GET /dashboard/admin/top-suppliers # أفضل الموردين
GET /dashboard/admin/top-clients # أفضل العملاء
GET /dashboard/admin/categories # أداء الفئات

# Export Reports

POST /dashboard/export/pdf # تصدير تقرير PDF
POST /dashboard/export/excel # تصدير تقرير Excel
POST /dashboard/export/csv # تصدير تقرير CSV

Analytics & Reports /api/v1/analytics

# General Analytics

GET /analytics/overview # نظرة عامة
GET /analytics/real-time # إحصائيات فورية
GET /analytics/trends # التوجهات

# User Analytics

GET /analytics/users/growth # نمو المستخدمين
GET /analytics/users/demographics # التركيبة السكانية
GET /analytics/users/retention # معدل الاحتفاظ
GET /analytics/users/activity # نشاط المستخدمين

# Revenue Analytics

GET /analytics/revenue/total # إجمالي الإيرادات
GET /analytics/revenue/by-category # الإيرادات حسب الفئة
GET /analytics/revenue/by-period # الإيرادات حسب الفترة
GET /analytics/revenue/forecast # توقعات الإيرادات

# Project Analytics

GET /analytics/projects/completion-rate # معدل الإنجاز
GET /analytics/projects/average-duration # متوسط المدة
GET /analytics/projects/success-rate # معدل النجاح

# Custom Reports

POST /analytics/custom-report # تقرير مخصص
GET /analytics/reports/saved # التقارير المحفوظة

Real-time & WebSocket /api/v1/realtime

# WebSocket Connection

WS /realtime/connect # الاتصال بـ WebSocket

# Subscriptions

POST /realtime/subscribe/notifications # الاشتراك في الإشعارات
POST /realtime/subscribe/messages # الاشتراك في الرسائل
POST /realtime/subscribe/updates # الاشتراك في التحديثات
DELETE /realtime/unsubscribe/all # إلغاء جميع الاشتراكات

# Push Notifications

POST /realtime/push/send # إرسال إشعار push (Admin)
POST /realtime/email/send # إرسال بريد (Admin)
POST /realtime/sms/send # إرسال SMS (Admin)

Search & Filter /api/v1/search

# Global Search

GET /search # بحث عام
GET /search/requests # البحث في الطلبات
GET /search/suppliers # البحث في الموردين
GET /search/projects # البحث في المشاريع
GET /search/users # البحث في المستخدمين (Admin)

# Advanced Search

POST /search/advanced # بحث متقدم
POST /search/filter # بحث بالفلاتر

# Suggestions

GET /search/suggestions # اقتراحات البحث
GET /search/autocomplete # إكمال تلقائي

File Upload /api/v1/upload
POST /upload/image # رفع صورة
POST /upload/document # رفع مستند
POST /upload/multiple # رفع ملفات متعددة
DELETE /upload/{fileId} # حذف ملف
GET /upload/{fileId} # عرض ملف
GET /upload/{fileId}/download # تنزيل ملف

Localization /api/v1/localization
GET /localization/languages # اللغات المتاحة
GET /localization/translations/{lang} # الترجمات
GET /localization/currencies # العملات المدعومة
GET /localization/countries # الدول

System Health & Monitoring /api/v1/system
GET /system/health # حالة النظام
GET /system/status # حالة الخدمات
GET /system/metrics # مقاييس الأداء
GET /system/version # إصدار النظام

تنظيم الـ API حسب HTTP Methods
GET - القراءة والاستعلام
POST - الإنشاء والإضافة
PUT - التحديث الكامل
PATCH - التحديث الجزئي
DELETE - الحذف
