/**
 * Mock offer data
 */

import type { Offer } from '@/lib/types/offer.types';

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    offerNumber: 'OFF-2025-001',
    requestId: '1',
    supplierId: 'supplier-1',
    proposedPrice: 85000,
    estimatedDuration: 75,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'سنقوم بتطوير موقع إلكتروني شامل بتصميم واجهة مستخدم حديث، تصميم متجاوب، ونظام مصادقة آمن.',
    deliverables:
      '1. موقع إلكتروني كامل الوظائف\n2. لوحة تحكم إدارية\n3. وثائق المستخدم\n4. دعم لمدة 3 أشهر',
    paymentTerms: '30% مقدماً، 40% عند إكمال المرحلة، 30% عند التسليم النهائي',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 90,
    warrantyDetails: '3 أشهر دعم مجاني وإصلاح الأخطاء',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
  {
    id: 'offer-2',
    offerNumber: 'OFF-2025-002',
    requestId: '1',
    supplierId: 'supplier-2',
    proposedPrice: 92000,
    estimatedDuration: 90,
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'فريقنا متخصص في البوابات الحكومية. سنستخدم React و Node.js و PostgreSQL للحصول على حل قابل للتوسع.',
    deliverables:
      '1. موقع إلكتروني بجميع الميزات\n2. تصميم متجاوب للجوال\n3. لوحة تحكم إدارية\n4. وثائق API\n5. دعم لمدة 6 أشهر',
    paymentTerms:
      '20% مقدماً، 30% عند الموافقة على التصميم، 30% عند إكمال التطوير، 20% عند الإطلاق',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 180,
    warrantyDetails: '6 أشهر دعم مجاني وصيانة',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
  {
    id: 'offer-3',
    offerNumber: 'OFF-2025-003',
    requestId: '1',
    supplierId: 'supplier-3',
    proposedPrice: 75000,
    estimatedDuration: 60,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'تسليم سريع مع تقنيات حديثة. نستخدم Next.js للحصول على أداء مثالي وتحسين محركات البحث.',
    deliverables: '1. موقع إلكتروني كامل\n2. لوحة تحكم إدارية\n3. دليل المستخدم\n4. دعم لمدة شهر واحد',
    paymentTerms: '50% مقدماً، 50% عند الإكمال',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 30,
    warrantyDetails: 'شهر واحد دعم مجاني',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
];
