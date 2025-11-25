/**
 * Mock disputes data
 */

import type { Dispute } from '@/lib/types/dispute.types';

export const mockDisputes: Dispute[] = [
  {
    id: 'dispute-1',
    disputeNumber: 'DSP-2025-001',
    projectId: '1',
    raisedBy: 'user-1',
    against: 'supplier-1',
    subject: 'تأخير في التسليم',
    description: 'لم يقم المورد بتسليم المشروع في الوقت المتفق عليه في العقد.',
    category: 'delivery',
    evidence: [
      {
        id: 'evidence-1',
        filePath: '/uploads/disputes/evidence-1.pdf',
        fileType: 'application/pdf',
        description: 'العقد يوضح تاريخ التسليم',
        uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    status: 'open',
    resolution: null,
    resolvedBy: null,
    resolvedAt: null,
    assignedTo: null,
    priority: 'high',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'dispute-2',
    disputeNumber: 'DSP-2025-002',
    projectId: '2',
    raisedBy: 'supplier-2',
    against: 'user-1',
    subject: 'مشكلة في الدفع',
    description: 'لم يقم العميل بسداد الدفعة للمرحلة 2 كما تم الاتفاق.',
    category: 'payment',
    evidence: [],
    status: 'in_review',
    resolution: null,
    resolvedBy: null,
    resolvedAt: null,
    assignedTo: 'admin-1',
    priority: 'urgent',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'dispute-3',
    disputeNumber: 'DSP-2025-003',
    projectId: '3',
    raisedBy: 'user-1',
    against: 'supplier-3',
    subject: 'مشاكل في الجودة',
    description:
      'العمل المسلم لا يفي بمعايير الجودة المحددة في العقد.',
    category: 'quality',
    evidence: [
      {
        id: 'evidence-2',
        filePath: '/uploads/disputes/evidence-2.jpg',
        fileType: 'image/jpeg',
        description: 'صور توضح مشاكل الجودة',
        uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    status: 'resolved',
    resolution: 'وافق المورد على إصلاح مشاكل الجودة خلال 7 أيام.',
    resolvedBy: 'admin-1',
    resolvedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'admin-1',
    priority: 'medium',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
