#!/usr/bin/env node

/**
 * Complete translation script - translates all placeholder texts
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const AR_JSON = path.join(EETMAD_ROOT, 'messages/ar.json');
const EN_JSON = path.join(EETMAD_ROOT, 'messages/en.json');

// Comprehensive translation map
const translations = {
  // Messages (under pages.messages)
  'pages.messages.active': 'نشط',
  'pages.messages.archive': 'أرشفة',
  'pages.messages.archived': 'مؤرشف',
  'pages.messages.autoMarkAsRead': 'وضع علامة مقروءة تلقائياً',
  'pages.messages.autoMarkAsReadDescription': 'وضع علامة مقروءة تلقائياً عند عرض الرسائل',
  'pages.messages.back': 'رجوع',
  'pages.messages.cancel': 'إلغاء',
  'pages.messages.confirmDeleteMessage': 'هل أنت متأكد من حذف هذه الرسالة؟',
  'pages.messages.conversation': 'محادثة',
  'pages.messages.conversationAboutProject': 'محادثة حول المشروع',
  'pages.messages.conversationAboutRequest': 'محادثة حول الطلب',
  'pages.messages.conversationNotFound': 'المحادثة غير موجودة',
  'pages.messages.createConversation': 'إنشاء محادثة',
  'pages.messages.creating': 'جاري الإنشاء...',
  'pages.messages.delete': 'حذف',
  'pages.messages.edit': 'تعديل',
  'pages.messages.editMessagePlaceholder': 'عدّل رسالتك...',
  'pages.messages.editing': 'جاري التعديل...',
  'pages.messages.emailNotifications': 'إشعارات البريد الإلكتروني',
  'pages.messages.emailNotificationsDescription': 'تلقي إشعارات البريد الإلكتروني للرسائل الجديدة',
  'pages.messages.initialMessage': 'الرسالة الأولية',
  'pages.messages.initialMessagePlaceholder': 'اكتب رسالة أولية (اختياري)...',
  'pages.messages.loading': 'جاري تحميل المحادثات...',
  'pages.messages.mute': 'كتم',
  'pages.messages.newConversation': 'محادثة جديدة',
  'pages.messages.newConversationDescription': 'بدء محادثة مع مستخدمين آخرين',
  'pages.messages.noConversations': 'لا توجد محادثات',
  'pages.messages.noConversationsDescription': 'ابدأ محادثة جديدة للبدء',
  'pages.messages.noMessages': 'لا توجد رسائل بعد. ابدأ المحادثة!',
  'pages.messages.noUsersFound': 'لم يتم العثور على مستخدمين',
  'pages.messages.optional': 'اختياري',
  'pages.messages.participants': 'المشاركون',
  'pages.messages.project': 'المشروع',
  'pages.messages.pushNotifications': 'الإشعارات الفورية',
  'pages.messages.pushNotificationsDescription': 'تلقي إشعارات فورية للرسائل الجديدة',
  'pages.messages.request': 'الطلب',
  'pages.messages.searchUsers': 'البحث عن المستخدمين',
  'pages.messages.searchUsersPlaceholder': 'البحث بالاسم أو البريد الإلكتروني...',
  'pages.messages.selectedUsers': 'المستخدمون المحددون',
  'pages.messages.send': 'إرسال',
  'pages.messages.sending': 'جاري الإرسال...',
  'pages.messages.settings': 'الإعدادات',
  'pages.messages.settingsDescription': 'إدارة تفضيلات الرسائل',
  'pages.messages.soundEnabled': 'تفعيل الصوت',
  'pages.messages.soundEnabledDescription': 'تشغيل الصوت عند استلام رسائل جديدة',
  'pages.messages.subtitle': 'التواصل مع الموردين والعملاء',
  'pages.messages.title': 'الرسائل',
  'pages.messages.typeMessage': 'اكتب رسالة...',
  'pages.messages.unarchive': 'إلغاء الأرشفة',
  'pages.messages.users': 'المستخدمون',
  
  // Notifications (under pages.notifications)
  'pages.notifications.all': 'الكل',
  'notifications.back': 'رجوع',
  'notifications.channels': 'القنوات',
  'notifications.clearAll': 'مسح الكل',
  'notifications.confirmClearAll': 'هل أنت متأكد من حذف جميع الإشعارات؟ لا يمكن التراجع عن هذا الإجراء.',
  'notifications.confirmDelete': 'هل أنت متأكد من حذف هذا الإشعار؟',
  'notifications.confirmMarkAllAsRead': 'هل أنت متأكد من وضع علامة مقروءة على جميع الإشعارات؟',
  'notifications.contractNotifications': 'إشعارات العقود',
  'notifications.createdAt': 'تاريخ الإنشاء',
  'notifications.daysAgo': 'منذ {count} يوم',
  'notifications.delete': 'حذف',
  'notifications.details': 'التفاصيل',
  'notifications.disputeNotifications': 'إشعارات النزاعات',
  'notifications.emailNotifications': 'إشعارات البريد الإلكتروني',
  'notifications.emailNotificationsDescription': 'تلقي إشعارات البريد الإلكتروني',
  'notifications.hoursAgo': 'منذ {count} ساعة',
  'notifications.inAppNotifications': 'الإشعارات داخل التطبيق',
  'notifications.inAppNotificationsDescription': 'تلقي الإشعارات داخل التطبيق',
  'notifications.justNow': 'الآن',
  'notifications.loading': 'جاري تحميل الإشعارات...',
  'notifications.markAllAsRead': 'وضع علامة مقروءة على الكل',
  'notifications.messageNotifications': 'إشعارات الرسائل',
  'notifications.minutesAgo': 'منذ {count} دقيقة',
  'notifications.noNotifications': 'لا توجد إشعارات',
  'notifications.noNotificationsDescription': 'أنت محدث! لا توجد إشعارات جديدة.',
  'notifications.noUnreadNotifications': 'لا توجد إشعارات غير مقروءة',
  'notifications.noUnreadNotificationsDescription': 'تم قراءة جميع الإشعارات',
  'notifications.notificationNotFound': 'الإشعار غير موجود',
  'notifications.notificationTypes': 'أنواع الإشعارات',
  'notifications.offerNotifications': 'إشعارات العروض',
  'notifications.paymentNotifications': 'إشعارات المدفوعات',
  'notifications.projectNotifications': 'إشعارات المشاريع',
  'notifications.pushNotifications': 'الإشعارات الفورية',
  'notifications.pushNotificationsDescription': 'تلقي إشعارات فورية على جهازك',
  'notifications.read': 'مقروء',
  'notifications.readAt': 'تاريخ القراءة',
  'notifications.reference': 'المرجع',
  'notifications.requestNotifications': 'إشعارات الطلبات',
  'notifications.settings': 'الإعدادات',
  'notifications.settingsDescription': 'إدارة تفضيلات الإشعارات',
  'notifications.smsNotifications': 'إشعارات الرسائل النصية',
  'notifications.smsNotificationsDescription': 'تلقي إشعارات الرسائل النصية',
  'notifications.status': 'الحالة',
  'notifications.subtitle': 'ابق على اطلاع بجميع أنشطتك',
  'notifications.title': 'الإشعارات',
  'notifications.type': 'النوع',
  'notifications.unread': 'غير مقروء',
  'notifications.viewRelated': 'عرض ذو الصلة',
  'notifications.systemNotifications': 'إشعارات النظام',
  
  'pages.payments.addFundsAmountPrompt': 'أدخل المبلغ للإضافة',
  'pages.payments.all': 'الكل',
  'pages.payments.amount': 'المبلغ',
  'pages.payments.amountPlaceholder': 'أدخل المبلغ',
  'pages.payments.back': 'رجوع',
  'pages.payments.balance': 'الرصيد',
  'pages.payments.cancel': 'إلغاء',
  'pages.payments.completedAt': 'تاريخ الإتمام',
  'pages.payments.confirmCancel': 'هل أنت متأكد من إلغاء هذه الدفعة؟',
  'pages.payments.createdAt': 'تاريخ الإنشاء',
  'pages.payments.failureReason': 'سبب الفشل',
  'pages.payments.history': 'السجل',
  'pages.payments.historyDescription': 'عرض سجل المدفوعات الكامل',
  'pages.payments.initiate': 'بدء الدفعة',
  'pages.payments.initiatePayment': 'بدء الدفعة',
  'pages.payments.initiatePaymentDescription': 'بدء عملية دفع جديدة',
  'pages.payments.method.bank_transfer': 'تحويل بنكي',
  'pages.payments.method.credit_card': 'بطاقة ائتمان',
  'pages.payments.method.debit_card': 'بطاقة خصم',
  'pages.payments.method.wallet': 'محفظة',
  'pages.payments.milestoneId': 'رقم المرحلة',
  'pages.payments.milestoneIdPlaceholder': 'أدخل رقم المرحلة (اختياري)',
  'pages.payments.netAmount': 'المبلغ الصافي',
  'pages.payments.noPayments': 'لا توجد مدفوعات',
  'pages.payments.noPaymentsDescription': 'ليس لديك أي مدفوعات بعد.',
  'pages.payments.noPendingPayments': 'لا توجد مدفوعات معلقة',
  'pages.payments.noTransactions': 'لا توجد معاملات',
  'pages.payments.notAvailable': 'غير متوفر',
  'pages.payments.notCompleted': 'غير مكتمل',
  'pages.payments.notes': 'ملاحظات',
  'pages.payments.notesPlaceholder': 'ملاحظات إضافية (اختياري)',
  'pages.payments.optional': 'اختياري',
  'pages.payments.paymentGateway': 'بوابة الدفع',
  'pages.payments.paymentInfo': 'معلومات الدفع',
  'pages.payments.paymentMethod': 'طريقة الدفع',
  'pages.payments.paymentNotFound': 'الدفعة غير موجودة',
  'pages.payments.paymentType': 'نوع الدفعة',
  'pages.payments.pending': 'معلق',
  'pages.payments.platformFee': 'رسوم المنصة',
  'pages.payments.processing': 'جاري المعالجة...',
  'pages.payments.projectId': 'رقم المشروع',
  'pages.payments.projectIdPlaceholder': 'أدخل رقم المشروع',
  'pages.payments.refundReasonPrompt': 'يرجى تقديم سبب الاسترجاع',
  'pages.payments.refundedAt': 'تاريخ الاسترجاع',
  'pages.payments.requestRefund': 'طلب استرجاع',
  'pages.payments.status.cancelled': 'ملغي',
  'pages.payments.status.completed': 'مكتمل',
  'pages.payments.status.failed': 'فاشل',
  'pages.payments.status.pending': 'معلق',
  'pages.payments.status.processing': 'قيد المعالجة',
  'pages.payments.status.refunded': 'مسترجعة',
  'pages.payments.subtitle': 'إدارة جميع مدفوعاتك ومعاملاتك',
  'pages.payments.timeline': 'الجدول الزمني',
  'pages.payments.transactionId': 'رقم المعاملة',
  'pages.payments.transactions': 'المعاملات',
  'pages.payments.type.deposit': 'إيداع',
  'pages.payments.type.final': 'نهائي',
  'pages.payments.type.milestone': 'مرحلة',
  'pages.payments.viewAll': 'عرض الكل',
  'pages.payments.wallet': 'المحفظة',
  'pages.payments.walletDescription': 'إدارة رصيد محفظتك والمعاملات',
  'pages.payments.walletNotFound': 'المحفظة غير موجودة',
  'pages.payments.withdraw': 'سحب',
  
  // Contracts (under pages.contracts)
  'pages.contracts.add': 'إضافة',
  'contracts.addClause': 'إضافة بند',
  'contracts.back': 'رجوع',
  'contracts.backToContracts': 'العودة إلى العقود',
  'contracts.cancel': 'إلغاء',
  'contracts.clauseKeyPlaceholder': 'مفتاح البند (مثال: additionalSupport)',
  'contracts.clauseValuePlaceholder': 'قيمة البند',
  'contracts.clauses': 'البنود',
  'contracts.clausesDescription': 'إدارة البنود المخصصة لهذا العقد',
  'contracts.clientSignature': 'توقيع العميل',
  'contracts.confirmDeleteClause': 'هل أنت متأكد من حذف هذا البند؟',
  'contracts.contract': 'عقد',
  'contracts.contractDetails': 'تفاصيل العقد',
  'contracts.contractInfo': 'معلومات العقد',
  'contracts.contractNumber': 'رقم العقد',
  'contracts.contractText': 'نص العقد',
  'contracts.createContract': 'إنشاء عقد',
  'contracts.currentVersion': 'الإصدار الحالي',
  'contracts.delete': 'حذف',
  'contracts.deliverables': 'المخرجات',
  'contracts.download': 'تحميل',
  'contracts.edit': 'تعديل',
  'contracts.editContract': 'تعديل العقد',
  'contracts.editContractDescription': 'تحديث تفاصيل العقد',
  'contracts.form.cancel': 'إلغاء',
  'contracts.form.contractText': 'نص العقد',
  'contracts.form.contractTextPlaceholder': 'أدخل نص العقد الرئيسي...',
  'contracts.form.create': 'إنشاء عقد',
  'contracts.form.deliverables': 'المخرجات',
  'contracts.form.deliverablesPlaceholder': 'أدخل المخرجات...',
  'contracts.form.paymentTerms': 'شروط الدفع',
  'contracts.form.paymentTermsPlaceholder': 'أدخل شروط الدفع...',
  'contracts.form.saving': 'جاري الحفظ...',
  'contracts.form.templateUsed': 'القالب المستخدم',
  'contracts.form.templateUsedPlaceholder': 'أدخل اسم القالب (اختياري)...',
  'contracts.form.termsAndConditions': 'الشروط والأحكام',
  'contracts.form.termsAndConditionsPlaceholder': 'أدخل الشروط والأحكام...',
  'contracts.form.update': 'تحديث العقد',
  'contracts.form.warrantyTerms': 'شروط الضمان',
  'contracts.form.warrantyTermsPlaceholder': 'أدخل شروط الضمان (اختياري)...',
  'contracts.loading': 'جاري تحميل العقود...',
  'contracts.manageClauses': 'إدارة البنود',
  'contracts.newContract': 'عقد جديد',
  'contracts.newContractDescription': 'إنشاء عقد جديد لمشروعك',
  'contracts.noClauses': 'لا توجد بنود مخصصة',
  'contracts.noContracts': 'لا توجد عقود',
  'contracts.noContractsDescription': 'ليس لديك أي عقود بعد.',
  'contracts.noVersions': 'لا توجد إصدارات',
  'contracts.notFound': 'العقد غير موجود',
  'contracts.notSigned': 'غير موقّع',
  'contracts.paymentTerms': 'شروط الدفع',
  'contracts.sign': 'توقيع',
  'contracts.signContract': 'توقيع العقد',
  'contracts.signContractDescription': 'مراجعة وتوقيع العقد',
  'contracts.signatures': 'التوقيعات',
  'contracts.signing.alreadySigned': 'لقد وقّعت هذا العقد بالفعل',
  'contracts.signing.clientSignature': 'توقيع العميل',
  'contracts.signing.description': 'يرجى مراجعة العقد وتقديم توقيعك',
  'contracts.signing.fullySigned': 'العقد موقّع بالكامل',
  'contracts.signing.fullySignedDescription': 'كلا الطرفين وقّعا هذا العقد',
  'contracts.signing.pending': 'معلق',
  'contracts.signing.sign': 'توقيع العقد',
  'contracts.signing.signatureHint': 'اكتب اسمك الكامل كتوقيع',
  'contracts.signing.signatureLabel': 'توقيعك',
  'contracts.signing.signaturePlaceholder': 'أدخل توقيعك',
  'contracts.signing.signing': 'جاري التوقيع...',
  'contracts.signing.supplierSignature': 'توقيع المورد',
  'contracts.signing.title': 'توقيع العقد',
  'contracts.status.cancelled': 'ملغي',
  'contracts.status.draft': 'مسودة',
  'contracts.status.expired': 'منتهي الصلاحية',
  'contracts.status.pending_client_signature': 'في انتظار توقيع العميل',
  'contracts.status.pending_supplier_signature': 'في انتظار توقيع المورد',
  'contracts.status.signed': 'موقّع',
  'contracts.subtitle': 'عرض وإدارة جميع عقودك',
  'contracts.supplierSignature': 'توقيع المورد',
  'contracts.templateUsed': 'القالب المستخدم',
  'contracts.termsAndConditions': 'الشروط والأحكام',
  'contracts.title': 'العقود',
  'contracts.version': 'الإصدار',
  'contracts.versions': 'الإصدارات',
  'contracts.versionsDescription': 'عرض جميع إصدارات هذا العقد',
  'contracts.view': 'عرض',
  'contracts.viewVersions': 'عرض الإصدارات',
  'contracts.warrantyTerms': 'شروط الضمان',
  
  // Suppliers
  'suppliers.emptyState': 'لا توجد بيانات',
  'suppliers.noResults': 'لا توجد نتائج',
  'suppliers.portfolioItems': 'عناصر المحفظة',
  'suppliers.supplierProfile': 'ملف المورد',
  
  // Projects
  'projects.milestones.title': 'المراحل',
  
  // Requests
  'requests.form.expectedDurationPlaceholder': 'الأيام المتوقعة',
  'requests.form.location': 'الموقع',
  'requests.form.locationPlaceholder': 'أدخل الموقع',
  
  // Reviews
  'reviews.cancel': 'إلغاء',
  
  // Users
  'users.address': 'العنوان',
  'users.averageRating': 'متوسط التقييم',
  'users.commercialRegister': 'السجل التجاري',
  'users.companyInformation': 'معلومات الشركة',
  'users.companyName': 'اسم الشركة',
  'users.completedProjects': 'المشاريع المكتملة',
  'users.contactInformation': 'معلومات الاتصال',
  'users.email': 'البريد الإلكتروني',
  'users.notAvailable': 'غير متوفر',
  'users.phone': 'الهاتف',
  'users.taxNumber': 'الرقم الضريبي',
  'users.totalReviews': 'إجمالي التقييمات',
  'users.userNotFound': 'المستخدم غير موجود',
  'users.verified': 'موثق',
  'users.memberSince': 'عضو منذ',
};

function getNestedValue(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current[part] === undefined) {
      return undefined;
    }
    current = current[part];
  }
  return current;
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

function translatePlaceholders(obj, prefix = '', translations) {
  let translated = 0;
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'string') {
      if (value.includes('[ترجمة مطلوبة]')) {
        // Try to find translation
        const translation = translations[fullKey];
        
        if (translation) {
          obj[key] = translation;
          translated++;
          console.log(`  ✓ ${fullKey}`);
        } else {
          // Try to extract from English value if available
          const match = value.match(/\[ترجمة مطلوبة: (.+)\]/);
          if (match) {
            // Keep placeholder but clean it
            obj[key] = `[ترجمة مطلوبة: ${match[1]}]`;
          }
        }
      }
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      translated += translatePlaceholders(value, fullKey, translations);
    }
  }
  
  return translated;
}

// Main
const ar = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));

console.log('🔧 بدء ترجمة جميع النصوص...\n');

// Translate placeholders
const translated = translatePlaceholders(ar, '', translations);

console.log(`✅ تم ترجمة ${translated} نص`);

// Save
fs.writeFileSync(AR_JSON, JSON.stringify(ar, null, 2) + '\n', 'utf8');
console.log('💾 تم حفظ ar.json');

console.log('\n✅ اكتمل!');

