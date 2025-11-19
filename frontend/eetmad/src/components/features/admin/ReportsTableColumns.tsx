'use client';

import { useTranslations } from 'next-intl';
import { Calendar, CheckCircle, Eye, Flag, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Report } from '@/lib/types/report.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useReportsTableColumns(): ColumnConfig<Report>[] {
  const t = useTranslations('admin');

  return [
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
}

