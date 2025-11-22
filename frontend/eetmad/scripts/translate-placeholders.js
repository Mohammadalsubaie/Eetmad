#!/usr/bin/env node

/**
 * Script to translate placeholder texts in ar.json
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const AR_JSON = path.join(EETMAD_ROOT, 'messages/ar.json');
const EN_JSON = path.join(EETMAD_ROOT, 'messages/en.json');

// Translation mappings for common keys
const translations = {
  // Common
  'address': 'العنوان',
  'avatar': 'الصورة الشخصية',
  'averageRating': 'متوسط التقييم',
  'back': 'رجوع',
  'cancel': 'إلغاء',
  'changePassword': 'تغيير كلمة المرور',
  'changing': 'جاري التغيير...',
  'city': 'المدينة',
  'commercialRegister': 'السجل التجاري',
  'companyInformation': 'معلومات الشركة',
  'companyName': 'اسم الشركة',
  'confirmDeleteAccount': 'هل أنت متأكد من حذف حسابك؟',
  'confirmDeleteAccountFinal': 'سيتم حذف حسابك نهائياً. اكتب DELETE للتأكيد.',
  'confirmPassword': 'تأكيد كلمة المرور',
  'country': 'الدولة',
  'currentPassword': 'كلمة المرور الحالية',
  'dangerZone': 'منطقة الخطر',
  'dateOfBirth': 'تاريخ الميلاد',
  'deleteAccount': 'حذف الحساب',
  'deleteAccountWarning': 'بمجرد حذف حسابك، لا يمكن التراجع. يرجى التأكد.',
  'deleting': 'جاري الحذف...',
  'editDescription': 'تحديث معلومات ملفك الشخصي',
  'email': 'البريد الإلكتروني',
  'emailNotifications': 'إشعارات البريد الإلكتروني',
  'fullName': 'الاسم الكامل',
  'nationalId': 'رقم الهوية الوطنية',
  'newPassword': 'كلمة المرور الجديدة',
  'notAvailable': 'غير متوفر',
  'notificationPreferences': 'تفضيلات الإشعارات',
  'passwordChanged': 'تم تغيير كلمة المرور بنجاح',
  'passwordsDoNotMatch': 'كلمات المرور غير متطابقة',
  'personalInformation': 'المعلومات الشخصية',
  'phone': 'الهاتف',
  'postalCode': 'الرمز البريدي',
  'preferencesSaved': 'تم حفظ التفضيلات بنجاح',
  'profileNotFound': 'الملف الشخصي غير موجود',
  'pushNotifications': 'الإشعارات الفورية',
  'save': 'حفظ',
  'saving': 'جاري الحفظ...',
  'settings': 'الإعدادات',
  'settingsDescription': 'إدارة إعدادات حسابك وتفضيلاتك',
  'smsNotifications': 'إشعارات الرسائل النصية',
  'state': 'المنطقة/المحافظة',
  'street': 'عنوان الشارع',
  'taxNumber': 'الرقم الضريبي',
  'totalReviews': 'إجمالي التقييمات',
  'uploadAvatar': 'رفع صورة شخصية',
  'uploading': 'جاري الرفع...',
  'verified': 'موثق',
  'walletBalance': 'رصيد المحفظة',
  
  // Users
  'userNotFound': 'المستخدم غير موجود',
  'contactInformation': 'معلومات الاتصال',
  'completedProjects': 'المشاريع المكتملة',
  'memberSince': 'عضو منذ',
  
  // Suppliers
  'emptyState': 'لا توجد بيانات',
  'noResults': 'لا توجد نتائج',
  'portfolioItems': 'عناصر المحفظة',
  'supplierProfile': 'ملف المورد',
  
  // Projects
  'milestones.title': 'المراحل',
  
  // Requests
  'form.expectedDurationPlaceholder': 'الأيام المتوقعة',
  'form.location': 'الموقع',
  'form.locationPlaceholder': 'أدخل الموقع',
  
  // Reviews
  'cancel': 'إلغاء',
  
  // Profile edit
  'edit.sections.socialLinks': 'روابط التواصل والموقع الإلكتروني',
  'edit.success': 'تم تحديث الملف الشخصي بنجاح!',
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

function translatePlaceholders(obj, prefix = '') {
  let translated = 0;
  
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    
    if (typeof value === 'string') {
      if (value.includes('[ترجمة مطلوبة]')) {
        // Try to find translation
        const shortKey = key;
        const translation = translations[shortKey] || translations[fullKey];
        
        if (translation) {
          obj[key] = translation;
          translated++;
        } else {
          // Try to extract from English value if available
          const match = value.match(/\[ترجمة مطلوبة: (.+)\]/);
          if (match) {
            // Keep placeholder but clean it
            obj[key] = `[ترجمة مطلوبة: ${match[1]}]`;
          }
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      translated += translatePlaceholders(value, fullKey);
    }
  }
  
  return translated;
}

// Main
const ar = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));
const en = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));

console.log('🔧 بدء ترجمة النصوص...\n');

// First, fix structure issues - move misplaced keys
if (ar.pages && ar.pages.profile) {
  // Check if there are misplaced keys at pages.profile level
  const profileKeys = Object.keys(ar.pages.profile);
  const misplacedKeys = [];
  
  for (const key of profileKeys) {
    if (key.startsWith('[') || translations[key]) {
      misplacedKeys.push(key);
    }
  }
  
  // Move to correct location
  if (!ar.pages.profile.profile) {
    ar.pages.profile.profile = {};
  }
  
  for (const key of misplacedKeys) {
    if (translations[key]) {
      ar.pages.profile.profile[key] = translations[key];
      delete ar.pages.profile[key];
    }
  }
}

// Translate placeholders
const translated = translatePlaceholders(ar);

console.log(`✅ تم ترجمة ${translated} نص`);

// Save
fs.writeFileSync(AR_JSON, JSON.stringify(ar, null, 2) + '\n', 'utf8');
console.log('💾 تم حفظ ar.json');

console.log('\n✅ اكتمل!');

