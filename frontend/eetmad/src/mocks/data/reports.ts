/**
 * Mock report data
 */

import type { Report } from '@/lib/types/report.types';

export const mockReports: Report[] = [
  {
    id: '1',
    reportedBy: 'user-1',
    reportedEntityType: 'user',
    reportedEntityId: 'user-2',
    reportedUserId: 'user-2',
    reason: 'inappropriate_content',
    description: 'محتوى غير لائق في الملف الشخصي',
    status: 'pending',
    evidence: null,
    reviewedBy: null,
    reviewedAt: null,
    actionTaken: null,
    createdAt: '2024-03-18T10:00:00Z',
    updatedAt: '2024-03-18T10:00:00Z',
  },
  {
    id: '2',
    reportedBy: 'user-3',
    reportedEntityType: 'project',
    reportedEntityId: 'project-1',
    reportedUserId: null,
    reason: 'spam',
    description: 'مشروع وهمي',
    status: 'under_review',
    evidence: {},
    reviewedBy: null,
    reviewedAt: null,
    actionTaken: null,
    createdAt: '2024-03-17T14:30:00Z',
    updatedAt: '2024-03-18T09:00:00Z',
  },
  {
    id: '3',
    reportedBy: 'user-4',
    reportedEntityType: 'review',
    reportedEntityId: 'review-5',
    reportedUserId: 'user-7',
    reason: 'fraud',
    description: 'تقييم كاذب',
    status: 'resolved',
    evidence: {},
    reviewedBy: 'admin-1',
    reviewedAt: '2024-03-16T16:00:00Z',
    actionTaken: 'تم حذف التقييم',
    createdAt: '2024-03-15T11:20:00Z',
    updatedAt: '2024-03-16T16:00:00Z',
  },
];
