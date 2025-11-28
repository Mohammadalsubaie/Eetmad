/**
 * Mock contract data
 */

import type { Contract } from '@/lib/types/contract.types';

export const mockContracts: Contract[] = [
  {
    id: 'contract-1',
    contractNumber: 'CNT-2025-001',
    projectId: '1',
    contractText:
      'يحدد هذا العقد الشروط والأحكام لمشروع تطوير الموقع الإلكتروني...',
    termsAndConditions:
      '1. يوافق المورد على تسليم المشروع في الإطار الزمني المحدد.\n2. يوافق العميل على سداد المدفوعات وفقاً لجدول الدفع.\n3. يتفق الطرفان على الحفاظ على السرية.',
    paymentTerms:
      'سيتم الدفع على ثلاث دفعات: 30% عند التوقيع، 40% عند إكمال المرحلة، و30% عند التسليم النهائي.',
    deliverables:
      '1. موقع إلكتروني كامل الوظائف\n2. الكود المصدري\n3. الوثائق\n4. جلسة تدريبية',
    warrantyTerms: 'يوفر المورد ضماناً لمدة 6 أشهر لجميع الأعمال المسلمة.',
    clientSignature: null,
    supplierSignature: null,
    clientSignedAt: null,
    supplierSignedAt: null,
    status: 'pending_client_signature',
    version: 1,
    templateUsed: 'standard-project-contract',
    customClauses: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'contract-2',
    contractNumber: 'CNT-2025-002',
    projectId: '2',
    contractText:
      'يحدد هذا العقد الشروط والأحكام لمشروع تطوير تطبيق الجوال...',
    termsAndConditions:
      '1. يوافق المورد على تسليم المشروع في الإطار الزمني المحدد.\n2. يوافق العميل على سداد المدفوعات وفقاً لجدول الدفع.\n3. يتفق الطرفان على الحفاظ على السرية.',
    paymentTerms:
      'سيتم الدفع على أربع دفعات: 25% عند التوقيع، 25% عند المرحلة الأولى، 25% عند المرحلة الثانية، و25% عند التسليم النهائي.',
    deliverables:
      '1. تطبيق الجوال (iOS و Android)\n2. الكود المصدري\n3. الوثائق\n4. تقديم التطبيق للمتاجر',
    warrantyTerms: 'يوفر المورد ضماناً لمدة 12 شهراً لجميع الأعمال المسلمة.',
    clientSignature: 'signature-hash-1',
    supplierSignature: 'signature-hash-2',
    clientSignedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    supplierSignedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'signed',
    version: 1,
    templateUsed: 'standard-project-contract',
    customClauses: {
      additionalSupport: 'سيوفر المورد 3 أشهر من الدعم المجاني بعد التسليم.',
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'contract-3',
    contractNumber: 'CNT-2025-003',
    projectId: '3',
    contractText: 'يحدد هذا العقد الشروط والأحكام لمشروع الهوية البصرية...',
    termsAndConditions:
      '1. يوافق المورد على تسليم المشروع في الإطار الزمني المحدد.\n2. يوافق العميل على سداد المدفوعات وفقاً لجدول الدفع.\n3. يتفق الطرفان على الحفاظ على السرية.',
    paymentTerms:
      'سيتم الدفع على دفعتين: 50% عند التوقيع و50% عند التسليم النهائي.',
    deliverables: '1. تصميم الشعار\n2. دليل الهوية البصرية\n3. بطاقات العمل\n4. تصميم الأوراق الرسمية',
    warrantyTerms: null,
    clientSignature: null,
    supplierSignature: 'signature-hash-3',
    clientSignedAt: null,
    supplierSignedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending_client_signature',
    version: 1,
    templateUsed: 'standard-project-contract',
    customClauses: null,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
