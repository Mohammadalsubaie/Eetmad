#!/usr/bin/env node

/**
 * Script to fix translation structure and move misplaced keys
 */

const fs = require('fs');
const path = require('path');

const EETMAD_ROOT = path.resolve(__dirname, '..');
const AR_JSON = path.join(EETMAD_ROOT, 'messages/ar.json');

const ar = JSON.parse(fs.readFileSync(AR_JSON, 'utf8'));

console.log('🔧 إصلاح بنية ملفات الترجمة...\n');

// Fix pages.users - move misplaced keys
if (ar.pages && ar.pages.users) {
  const users = ar.pages.users;
  
  // Keys that should be in pages.users directly
  const userKeys = {
    'address': 'العنوان',
    'averageRating': 'متوسط التقييم',
    'commercialRegister': 'السجل التجاري',
    'companyInformation': 'معلومات الشركة',
    'companyName': 'اسم الشركة',
    'completedProjects': 'المشاريع المكتملة',
    'contactInformation': 'معلومات الاتصال',
    'email': 'البريد الإلكتروني',
    'notAvailable': 'غير متوفر',
    'phone': 'الهاتف',
    'taxNumber': 'الرقم الضريبي',
    'totalReviews': 'إجمالي التقييمات',
    'userNotFound': 'المستخدم غير موجود',
    'verified': 'موثق',
    'memberSince': 'عضو منذ'
  };
  
  // Add missing keys
  for (const [key, value] of Object.entries(userKeys)) {
    if (!users[key] || users[key].includes('[ترجمة مطلوبة]')) {
      users[key] = value;
    }
  }
}

// Fix pages.profile - ensure structure is correct
if (ar.pages && ar.pages.profile) {
  const profile = ar.pages.profile;
  
  // Ensure edit section exists
  if (!profile.edit) {
    profile.edit = {};
  }
  
  // Ensure edit.sections exists
  if (!profile.edit.sections) {
    profile.edit.sections = {};
  }
  
  // Add missing keys
  if (!profile.edit.sections.socialLinks) {
    profile.edit.sections.socialLinks = 'روابط التواصل والموقع الإلكتروني';
  }
  
  if (!profile.edit.success) {
    profile.edit.success = 'تم تحديث الملف الشخصي بنجاح!';
  }
  
  // Ensure other edit keys exist
  if (!profile.edit.save) {
    profile.edit.save = 'حفظ التغييرات';
  }
  
  if (!profile.edit.saving) {
    profile.edit.saving = 'جاري الحفظ...';
  }
  
  if (!profile.edit.sections.basicInfo) {
    profile.edit.sections.basicInfo = 'المعلومات الأساسية';
  }
  
  if (!profile.edit.sections.companyInfo) {
    profile.edit.sections.companyInfo = 'معلومات الشركة';
  }
  
  if (!profile.edit.sections.address) {
    profile.edit.sections.address = 'العنوان';
  }
  
  // Move misplaced keys from pages.profile.profile to pages.profile if needed
  if (profile.profile && typeof profile.profile === 'object') {
    for (const [key, value] of Object.entries(profile.profile)) {
      if (!profile[key] && typeof value === 'string') {
        profile[key] = value;
      }
    }
    // Clean up if it was just a duplicate
    if (Object.keys(profile.profile).length === 0 || JSON.stringify(profile.profile) === JSON.stringify({})) {
      delete profile.profile;
    }
  }
}

// Fix pages.suppliers
if (ar.pages && ar.pages.suppliers) {
  const suppliers = ar.pages.suppliers;
  
  if (!suppliers.emptyState) {
    suppliers.emptyState = 'لا توجد بيانات';
  }
  
  if (!suppliers.noResults) {
    suppliers.noResults = 'لا توجد نتائج';
  }
  
  if (!suppliers.portfolioItems || suppliers.portfolioItems.includes('[ترجمة مطلوبة]')) {
    suppliers.portfolioItems = 'عناصر المحفظة';
  }
  
  if (!suppliers.supplierProfile || suppliers.supplierProfile.includes('[ترجمة مطلوبة]')) {
    suppliers.supplierProfile = 'ملف المورد';
  }
}

// Fix pages.projects.milestones
if (ar.pages && ar.pages.projects) {
  if (!ar.pages.projects.milestones) {
    ar.pages.projects.milestones = {};
  }
  
  if (!ar.pages.projects.milestones.title) {
    ar.pages.projects.milestones.title = 'المراحل';
  }
}

// Fix pages.requests.form
if (ar.pages && ar.pages.requests && ar.pages.requests.form) {
  if (!ar.pages.requests.form.expectedDurationPlaceholder) {
    ar.pages.requests.form.expectedDurationPlaceholder = 'الأيام المتوقعة';
  }
  
  if (!ar.pages.requests.form.location) {
    ar.pages.requests.form.location = 'الموقع';
  }
  
  if (!ar.pages.requests.form.locationPlaceholder) {
    ar.pages.requests.form.locationPlaceholder = 'أدخل الموقع';
  }
}

// Fix pages.reviews
if (ar.pages && ar.pages.reviews) {
  if (!ar.pages.reviews.cancel) {
    ar.pages.reviews.cancel = 'إلغاء';
  }
}

// Fix pages.profile.edit
if (ar.pages && ar.pages.profile && ar.pages.profile.edit) {
  if (!ar.pages.profile.edit.sections) {
    ar.pages.profile.edit.sections = {};
  }
  
  if (!ar.pages.profile.edit.sections.socialLinks) {
    ar.pages.profile.edit.sections.socialLinks = 'روابط التواصل والموقع الإلكتروني';
  }
  
  if (!ar.pages.profile.edit.success) {
    ar.pages.profile.edit.success = 'تم تحديث الملف الشخصي بنجاح!';
  }
}

// Clean up any remaining [ترجمة مطلوبة] placeholders with proper translations
function cleanPlaceholders(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key].includes('[ترجمة مطلوبة]')) {
      // Try to extract English value
      const match = obj[key].match(/\[ترجمة مطلوبة: (.+)\]/);
      if (match) {
        // Keep as is for now - will be translated manually
        obj[key] = `[ترجمة مطلوبة: ${match[1]}]`;
      }
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      cleanPlaceholders(obj[key]);
    }
  }
}

cleanPlaceholders(ar);

// Save
fs.writeFileSync(AR_JSON, JSON.stringify(ar, null, 2) + '\n', 'utf8');
console.log('✅ تم إصلاح البنية');
console.log('💾 تم حفظ ar.json');
console.log('\n✅ اكتمل!');

