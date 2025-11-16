'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import type { Report } from '@/lib/types/report.types';
import { cssVars } from '@/styles/theme';
import { Calendar, CheckCircle, Eye, Flag, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ReportsPage() {
  const t = useTranslations('admin');
  const [loading, setLoading] = useState(false);

  // Mock data
  const [reports] = useState<Report[]>([
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
  ]);

  const columns = [
    {
      key: 'reportedEntityType',
      header: t('reports.table.type'),
      render: (report: Report) => (
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <Flag className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(
              `reports.types.${
                report.reportedEntityType === 'message'
                  ? 'other'
                  : report.reportedEntityType === 'request' || report.reportedEntityType === 'offer'
                    ? 'project'
                    : report.reportedEntityType
              }`
            )}
          </span>
        </div>
      ),
    },
    {
      key: 'reason',
      header: t('reports.table.reason'),
      render: (report: Report) => (
        <div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(`reports.reasons.${report.reason}`)}
          </div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {report.description}
          </div>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: t('reports.table.date'),
      render: (report: Report) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(report.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('reports.table.status'),
      render: (report: Report) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              report.status === 'resolved'
                ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                : report.status === 'dismissed'
                  ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`
                  : report.status === 'under_review'
                    ? `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`
                    : `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
            color:
              report.status === 'resolved'
                ? cssVars.status.success
                : report.status === 'dismissed'
                  ? cssVars.neutral.textMuted
                  : report.status === 'under_review'
                    ? cssVars.status.info
                    : cssVars.status.warning,
          }}
        >
          {t(`reports.statuses.${report.status}`)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('reports.table.actions'),
      render: (report: Report) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          {report.status === 'pending' && (
            <>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 transition-all hover:bg-opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 10%, transparent)`,
                }}
              >
                <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg p-2 transition-all hover:bg-opacity-80"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
                }}
              >
                <XCircle className="h-4 w-4" style={{ color: cssVars.status.error }} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title={t('reports.title')}
        description={t('reports.description')}
        icon={Flag}
      />

      <AdminDataTable
        data={reports}
        columns={columns}
        searchPlaceholder={t('reports.search')}
        isLoading={loading}
        emptyMessage={t('reports.empty')}
      />
    </div>
  );
}
