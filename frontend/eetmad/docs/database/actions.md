قائمة الأفعال (Actions/Operations) الشاملة للمنصة
بناءً على هيكل قاعدة البيانات، إليك جميع الأفعال المطلوبة مصنفة حسب الكيان:

User (المستخدم)
إدارة الحساب:
registerUser - تسجيل مستخدم جديد
loginUser - تسجيل الدخول
logoutUser - تسجيل الخروج
updateProfile - تحديث الملف الشخصي
changePassword - تغيير كلمة المرور
resetPassword - إعادة تعيين كلمة المرور
uploadAvatar - رفع الصورة الشخصية
deleteAvatar - حذف الصورة الشخصية
verifyEmail - التحقق من البريد الإلكتروني
verifyPhone - التحقق من رقم الجوال
updateNotificationPreferences - تحديث تفضيلات الإشعارات
updateAddress - تحديث العنوان
deactivateAccount - تعطيل الحساب
reactivateAccount - إعادة تفعيل الحساب
deleteAccount - حذف الحساب نهائياً
الاستعلام:
getUserProfile - عرض الملف الشخصي
getUserByEmail - البحث بالبريد
getUserByPhone - البحث برقم الجوال
getUserStatistics - إحصائيات المستخدم
getWalletBalance - عرض رصيد المحفظة

SupplierProfile (ملف المورد)
الإدارة:
createSupplierProfile - إنشاء ملف مورد
updateSupplierProfile - تحديث الملف
addPortfolioItem - إضافة عمل للمعرض
removePortfolioItem - حذف عمل من المعرض
addCertification - إضافة شهادة
removeCertification - حذف شهادة
updateWorkingHours - تحديث ساعات العمل
updateServiceDescription - تحديث وصف الخدمة
requestVerification - طلب التوثيق
cancelVerification - إلغاء طلب التوثيق
الاستعلام:
getSupplierProfile - عرض ملف المورد
getSupplierStatistics - إحصائيات المورد
searchSuppliers - البحث عن موردين
getTopRatedSuppliers - أعلى الموردين تقييماً
getSuppliersByCategory - الموردين حسب الفئة

Category (الفئات)
الإدارة (Admin):
createCategory - إنشاء فئة جديدة
updateCategory - تحديث فئة
deleteCategory - حذف فئة
activateCategory - تفعيل فئة
deactivateCategory - تعطيل فئة
reorderCategories - إعادة ترتيب الفئات
الاستعلام:
getAllCategories - عرض جميع الفئات
getCategoryById - عرض فئة محددة
getParentCategories - عرض الفئات الرئيسية
getSubCategories - عرض الفئات الفرعية
getActiveCategoriesTree - شجرة الفئات النشطة

SupplierCategory (فئات المورد)
الإدارة:
assignCategoryToSupplier - ربط فئة بمورد
removeCategoryFromSupplier - إزالة فئة من مورد
setPrimaryCategory - تحديد الفئة الأساسية
updateSupplierCategories - تحديث جميع فئات المورد
الاستعلام:
getSupplierCategories - عرض فئات مورد معين
getSuppliersInCategory - عرض الموردين في فئة

Request (الطلبات)
إدارة الطلبات (العميل):
createRequest - إنشاء طلب جديد
updateRequest - تحديث طلب
deleteRequest - حذف طلب
publishRequest - نشر طلب
closeRequest - إغلاق طلب
cancelRequest - إلغاء طلب
extendDeadline - تمديد الموعد النهائي
uploadRequestAttachment - رفع مرفق للطلب
deleteRequestAttachment - حذف مرفق
اختيار العروض:
selectOffer - اختيار عرض فائز
unselectOffer - إلغاء اختيار العرض
الاستعلام:
getRequestById - عرض طلب محدد
getMyRequests - طلباتي
searchRequests - البحث في الطلبات
getRequestsByCategory - الطلبات حسب الفئة
getActiveRequests - الطلبات النشطة
getRequestOffers - عروض طلب معين
incrementRequestViews - زيادة عداد المشاهدات

Offer (العروض)
إدارة العروض (المورد):
createOffer - تقديم عرض
updateOffer - تحديث عرض
withdrawOffer - سحب عرض
uploadOfferAttachment - رفع مرفق للعرض
deleteOfferAttachment - حذف مرفق
إدارة العروض (العميل):
acceptOffer - قبول عرض
rejectOffer - رفض عرض
addClientNotes - إضافة ملاحظات العميل
إدارة العروض (Admin):
addAdminNotes - إضافة ملاحظات الإدارة
flagOffer - الإبلاغ عن عرض
الاستعلام:
getOfferById - عرض عرض محدد
getMyOffers - عروضي
getOffersByRequest - عروض طلب معين
compareOffers - مقارنة العروض
getOfferStatistics - إحصائيات العرض

Project (المشاريع)
إدارة المشروع:
createProject - إنشاء مشروع (تلقائياً عند قبول عرض)
updateProjectStatus - تحديث حالة المشروع
startProject - بدء المشروع
completeProject - إتمام المشروع
cancelProject - إلغاء المشروع
pauseProject - إيقاف المشروع مؤقتاً
resumeProject - استئناف المشروع
updateProgress - تحديث نسبة الإنجاز
uploadDeliveryProof - رفع إثبات التسليم
approveDelivery - اعتماد التسليم (العميل)
rejectDelivery - رفض التسليم
requestRevision - طلب تعديل
addDeliveryNotes - إضافة ملاحظات التسليم
الاستعلام:
getProjectById - عرض مشروع محدد
getMyProjects - مشاريعي
getProjectsByStatus - المشاريع حسب الحالة
getActiveProjects - المشاريع النشطة
getCompletedProjects - المشاريع المكتملة
getProjectTimeline - الجدول الزمني للمشروع
getProjectStatistics - إحصائيات المشروع

Contract (العقود)
إدارة العقود:
generateContract - إنشاء عقد تلقائياً
updateContract - تحديث العقد
signContract - توقيع العقد
signContractByClient - توقيع العميل
signContractBySupplier - توقيع المورد
cancelContract - إلغاء العقد
createContractVersion - إنشاء نسخة جديدة
addCustomClause - إضافة بند مخصص
removeCustomClause - حذف بند مخصص
الاستعلام:
getContractById - عرض عقد
getContractByProject - عرض عقد المشروع
getContractVersions - عرض نسخ العقد
downloadContract - تنزيل العقد PDF
getContractStatus - حالة العقد

ProjectMilestone (مراحل المشروع)
إدارة المراحل:
createMilestone - إضافة مرحلة
updateMilestone - تحديث مرحلة
deleteMilestone - حذف مرحلة
completeMilestone - إتمام مرحلة
approveMilestone - اعتماد مرحلة (العميل)
rejectMilestone - رفض مرحلة
releaseMilestonePayment - صرف دفعة المرحلة
reorderMilestones - إعادة ترتيب المراحل
uploadMilestoneAttachment - رفع مرفق للمرحلة
الاستعلام:
getMilestoneById - عرض مرحلة محددة
getProjectMilestones - مراحل مشروع معين
getPendingMilestones - المراحل قيد الانتظار
getCompletedMilestones - المراحل المكتملة
getMilestoneProgress - تقدم المرحلة

Payment (الدفع)
إدارة الدفعات:
initiatePayment - بدء عملية دفع
processPayment - معالجة الدفع
confirmPayment - تأكيد الدفع
cancelPayment - إلغاء الدفع
refundPayment - استرجاع دفعة
partialRefund - استرجاع جزئي
releasePaymentToSupplier - تحويل المبلغ للمورد
calculatePlatformFee - حساب عمولة المنصة
الاستعلام:
getPaymentById - عرض دفعة محددة
getProjectPayments - دفعات مشروع معين
getMyPayments - دفعاتي
getPaymentHistory - سجل الدفعات
getPaymentStatistics - إحصائيات الدفع
getPendingPayments - الدفعات المعلقة
getFailedPayments - الدفعات الفاشلة

PaymentGatewayTransaction (معاملات البوابة)
إدارة المعاملات:
createGatewayTransaction - إنشاء معاملة
updateGatewayStatus - تحديث حالة المعاملة
handleWebhook - معالجة webhook من البوابة
retryFailedTransaction - إعادة محاولة معاملة فاشلة
verifyTransaction - التحقق من المعاملة
الاستعلام:
getGatewayTransactionById - عرض معاملة محددة
getTransactionsByPayment - معاملات دفعة معينة
getFailedTransactions - المعاملات الفاشلة
getTransactionsByGateway - المعاملات حسب البوابة

WalletTransaction (معاملات المحفظة)
إدارة المحفظة:
addFundsToWallet - إضافة رصيد
withdrawFromWallet - سحب رصيد
transferFunds - تحويل رصيد
freezeFunds - تجميد مبلغ
unfreezeFunds - إلغاء تجميد مبلغ
refundToWallet - استرجاع للمحفظة
الاستعلام:
getWalletBalance - عرض الرصيد
getWalletTransactions - معاملات المحفظة
getWalletStatement - كشف حساب المحفظة
exportWalletStatement - تصدير كشف الحساب

VerificationDocument (مستندات التحقق)
إدارة المستندات (المستخدم):
uploadDocument - رفع مستند
updateDocument - تحديث مستند
deleteDocument - حذف مستند
resubmitDocument - إعادة إرسال مستند
إدارة المستندات (Admin):
reviewDocument - مراجعة مستند
approveDocument - الموافقة على مستند
rejectDocument - رفض مستند
requestMoreInfo - طلب معلومات إضافية
الاستعلام:
getDocumentById - عرض مستند محدد
getUserDocuments - مستندات مستخدم معين
getPendingDocuments - المستندات المعلقة
getApprovedDocuments - المستندات الموافق عليها
getExpiringSoonDocuments - المستندات قاربت على الانتهاء

Review (التقييمات)
إدارة التقييمات:
createReview - إضافة تقييم
updateReview - تحديث تقييم
deleteReview - حذف تقييم
respondToReview - الرد على تقييم
markReviewAsHelpful - تقييم مفيد
markReviewAsNotHelpful - تقييم غير مفيد
reportReview - الإبلاغ عن تقييم
verifyReview - توثيق تقييم (Admin)
hideReview - إخفاء تقييم (Admin)
الاستعلام:
getReviewById - عرض تقييم محدد
getProjectReviews - تقييمات مشروع
getUserReviews - تقييمات مستخدم
getSupplierReviews - تقييمات مورد
getAverageRating - متوسط التقييم
getReviewStatistics - إحصائيات التقييمات
getTopRatedProjects - المشاريع الأعلى تقييماً

Conversation & Message (المحادثات والرسائل)
إدارة المحادثات:
createConversation - بدء محادثة
closeConversation - إغلاق محادثة
archiveConversation - أرشفة محادثة
unarchiveConversation - إلغاء الأرشفة
muteConversation - كتم الإشعارات
unmuteConversation - إلغاء الكتم
إدارة الرسائل:
sendMessage - إرسال رسالة
editMessage - تعديل رسالة
deleteMessage - حذف رسالة
markAsRead - تعليم كمقروء
markAllAsRead - تعليم الكل كمقروء
uploadMessageAttachment - رفع مرفق
deleteMessageAttachment - حذف مرفق
sendSystemMessage - إرسال رسالة نظام
الاستعلام:
getConversationById - عرض محادثة
getMyConversations - محادثاتي
getConversationMessages - رسائل محادثة
searchMessages - البحث في الرسائل
getUnreadMessagesCount - عدد الرسائل غير المقروءة

Notification (الإشعارات)
إدارة الإشعارات:
createNotification - إنشاء إشعار
sendNotification - إرسال إشعار
markNotificationAsRead - تعليم كمقروء
markAllNotificationsAsRead - تعليم الكل كمقروء
deleteNotification - حذف إشعار
deleteAllNotifications - حذف جميع الإشعارات
الاستعلام:
getMyNotifications - إشعاراتي
getUnreadNotifications - الإشعارات غير المقروءة
getUnreadCount - عدد الإشعارات غير المقروءة
getNotificationsByType - الإشعارات حسب النوع

Dispute (النزاعات)
إدارة النزاعات:
raiseDispute - رفع نزاع
updateDispute - تحديث نزاع
resolveDispute - حل نزاع
closeDispute - إغلاق نزاع
escalateDispute - تصعيد نزاع
assignDisputeToAdmin - تعيين نزاع لمشرف
uploadDisputeEvidence - رفع دليل
رسائل النزاع:
addDisputeMessage - إضافة رسالة للنزاع
addInternalNote - إضافة ملاحظة داخلية (Admin)
الاستعلام:
getDisputeById - عرض نزاع محدد
getMyDisputes - نزاعاتي
getPendingDisputes - النزاعات المعلقة
getResolvedDisputes - النزاعات المحلولة
getDisputeMessages - رسائل النزاع
getDisputeStatistics - إحصائيات النزاعات

OTPVerification (التحقق برمز OTP)
إدارة OTP:
generateOTP - إنشاء رمز OTP
sendOTP - إرسال رمز OTP
verifyOTP - التحقق من رمز OTP
resendOTP - إعادة إرسال الرمز
expireOTP - إلغاء صلاحية الرمز
الاستعلام:
checkOTPValidity - التحقق من صلاحية الرمز
getOTPAttempts - عدد محاولات الإدخال

AuditLog (سجل التدقيق)
إدارة السجل:
logAction - تسجيل حدث
logUserAction - تسجيل فعل مستخدم
logSystemAction - تسجيل فعل النظام
logSecurityEvent - تسجيل حدث أمني
الاستعلام:
getAuditLogs - عرض السجلات
getUserAuditLogs - سجلات مستخدم معين
getAuditLogsByEntity - السجلات حسب الكيان
getAuditLogsByAction - السجلات حسب الفعل
searchAuditLogs - البحث في السجلات
exportAuditLogs - تصدير السجلات

ContentPage

(صفحات المحتوى)
إدارة الصفحات (Admin):
createPage - إنشاء صفحة
updatePage - تحديث صفحة
deletePage - حذف صفحة
publishPage - نشر صفحة
unpublishPage - إلغاء نشر صفحة
reorderPages - إعادة ترتيب الصفحات
الاستعلام:
getPageById - عرض صفحة محددة
getPageBySlug - عرض صفحة بالرابط
getAllPages - عرض جميع الصفحات
getPublishedPages - الصفحات المنشورة
getPagesByType - الصفحات حسب النوع

❓ FAQ (الأسئلة الشائعة)
إدارة الأسئلة (Admin):
createFAQ - إضافة سؤال
updateFAQ - تحديث سؤال
deleteFAQ - حذف سؤال
publishFAQ - نشر سؤال
unpublishFAQ - إلغاء نشر سؤال
reorderFAQs - إعادة ترتيب الأسئلة
تفاعل المستخدمين:
markFAQAsHelpful - تقييم مفيد
markFAQAsNotHelpful - تقييم غير مفيد
incrementFAQViews - زيادة عداد المشاهدات
الاستعلام:
getFAQById - عرض سؤال محدد
getAllFAQs - عرض جميع الأسئلة
getFAQsByCategory - الأسئلة حسب الفئة
searchFAQs - البحث في الأسئلة
getPopularFAQs - الأسئلة الأكثر مشاهدة

SystemSetting (إعدادات النظام)
إدارة الإعدادات (Admin):
createSetting - إضافة إعداد
updateSetting - تحديث إعداد
deleteSetting - حذف إعداد
resetSettingToDefault - إعادة للقيمة الافتراضية
bulkUpdateSettings - تحديث جماعي
الاستعلام:
getSettingByKey - عرض إعداد محدد
getAllSettings - عرض جميع الإعدادات
getPublicSettings - الإعدادات العامة
getSettingsByCategory - الإعدادات حسب الفئة

PlatformCommission (العمولات)
إدارة العمولات (Admin):
createCommissionRule - إنشاء قاعدة عمولة
updateCommissionRule - تحديث قاعدة
deleteCommissionRule - حذف قاعدة
activateCommissionRule - تفعيل قاعدة
deactivateCommissionRule - تعطيل قاعدة

الحسابات:
calculateCommission - حساب العمولة
applyCommission - تطبيق العمولة
الاستعلام:
getCommissionById - عرض قاعدة محددة
getAllCommissions - عرض جميع القواعد
getActiveCommissions - القواعد النشطة
getCommissionByCategory - العمولة حسب الفئة
getCommissionStatistics - إحصائيات العمولات

Refund (المرتجعات)
إدارة المرتجعات:
requestRefund - طلب استرجاع
processRefund - معالجة استرجاع
approveRefund - الموافقة على استرجاع (Admin)
rejectRefund - رفض استرجاع
cancelRefund - إلغاء طلب استرجاع
completeRefund - إتمام الاسترجاع
الاستعلام:
getRefundById - عرض استرجاع محدد
getMyRefunds - طلبات الاسترجاع الخاصة بي
getPendingRefunds - الطلبات المعلقة
getApprovedRefunds - الطلبات الموافق عليها
getRefundStatistics - إحصائيات الاسترجاعات

SavedSearch (البحث المحفوظ)
إدارة البحث:
saveSearch - حفظ بحث
updateSavedSearch - تحديث بحث محفوظ
deleteSavedSearch - حذف بحث
enableNotifications - تفعيل الإشعارات
disableNotifications - تعطيل الإشعارات
executeSavedSearch - تنفيذ البحث المحفوظ
الاستعلام:
getSavedSearchById - عرض بحث محدد
getMySavedSearches - عمليات البحث المحفوظة
getSearchResults - نتائج البحث

Bookmark (المفضلة)
إدارة المفضلة:
addBookmark - إضافة للمفضلة
removeBookmark - إزالة من المفضلة
updateBookmarkNotes - تحديث ملاحظات
clearAllBookmarks - مسح جميع المفضلة
الاستعلام:
getMyBookmarks - المفضلة الخاصة بي
getBookmarksByType - المفضلة حسب النوع
checkIsBookmarked - التحقق من الإضافة

Report (البلاغات)
إدارة البلاغات:
submitReport - تقديم بلاغ
updateReport - تحديث بلاغ
reviewReport - مراجعة بلاغ (Admin)
resolveReport - حل بلاغ
dismissReport - رفض بلاغ
takeActionOnReport - اتخاذ إجراء
الاستعلام:
getReportById - عرض بلاغ محدد
getMyReports - بلاغاتي
getPendingReports - البلاغات المعلقة
getResolvedReports - البلاغات المحلولة
getReportsByType - البلاغات حسب النوع
getReportStatistics - إحصائيات البلاغات

PromotionCampaign (الحملات الترويجية)
إدارة الحملات (Admin):
createPromotion - إنشاء حملة
updatePromotion - تحديث حملة
deletePromotion - حذف حملة
activatePromotion - تفعيل حملة
deactivatePromotion - تعطيل حملة
extendPromotion - تمديد حملة
تطبيق الحملات:
applyPromoCode - تطبيق كود خصم
validatePromoCode - التحقق من كود
removePromoCode - إلغاء كود
الاستعلام:
getPromotionById - عرض حملة محددة
getAllPromotions - عرض جميع الحملات
getActivePromotions - الحملات النشطة
getPromotionByCode - البحث بالكود
getPromotionStatistics - إحصائيات الحملة

PromotionUsage (استخدام الحملات)
التتبع:
recordPromotionUsage - تسجيل استخدام
getUsageCount - عدد مرات الاستخدام
getUserPromotionHistory - سجل استخدام المستخدم
getPromotionUsageStatistics - إحصائيات الاستخدام

Subscription (الاشتراكات)
إدارة الاشتراكات:
createSubscription - إنشاء اشتراك
updateSubscription - تحديث اشتراك
cancelSubscription - إلغاء اشتراك
renewSubscription - تجديد اشتراك
upgradeSubscription - ترقية الاشتراك
downgradeSubscription - تخفيض الاشتراك
pauseSubscription - إيقاف مؤقت
resumeSubscription - استئناف الاشتراك
الاستعلام:
getSubscriptionById - عرض اشتراك محدد
getMySubscription - اشتراكي الحالي
getSubscriptionHistory - سجل الاشتراكات
getActiveSubscriptions - الاشتراكات النشطة
getExpiringSubscriptions - الاشتراكات القاربة على الانتهاء
getSubscriptionStatistics - إحصائيات الاشتراكات

Dashboard & Reports (لوحة التحكم والتقارير)
تقارير Admin:
getOverviewStatistics - إحصائيات عامة
getRevenueReport - تقرير الإيرادات
getUserGrowthReport - تقرير نمو المستخدمين
getProjectsReport - تقرير المشاريع
getPaymentsReport - تقرير المدفوعات
getDisputesReport - تقرير النزاعات
getPerformanceMetrics - مؤشرات الأداء
getTopSuppliers - أفضل الموردين
getTopClients - أفضل العملاء
getCategoryPerformance - أداء الفئات
exportReport - تصدير تقرير
تقارير المستخدم:
getMyDashboard - لوحة التحكم الخاصة بي
getMyEarnings - أرباحي (للموردين)
getMySpending - مصروفاتي (للعملاء)
getMyProjectsStatistics - إحصائيات مشاريعي
getMyPerformanceMetrics - مؤشرات أدائي

Real-time & Notifications
الإشعارات الفورية:
subscribeToNotifications - الاشتراك في الإشعارات
unsubscribeFromNotifications - إلغاء الاشتراك
sendPushNotification - إرسال إشعار push
sendEmailNotification - إرسال إشعار بريد
sendSMSNotification - إرسال SMS

Security & Authentication
الأمان:
enable2FA - تفعيل المصادقة الثنائية
disable2FA - تعطيل المصادقة الثنائية
verify2FACode - التحقق من رمز 2FA
generateBackupCodes - إنشاء رموز احتياطية
suspendUser - تعليق مستخدم (Admin)
unsuspendUser - إلغاء التعليق
banUser - حظر مستخدم
unbanUser - إلغاء الحظر
logoutAllDevices - تسجيل الخروج من جميع الأجهزة
revokeAccessToken - إلغاء رمز الوصول
