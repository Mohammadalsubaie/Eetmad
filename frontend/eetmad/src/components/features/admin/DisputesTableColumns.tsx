'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertTriangle, Calendar, CheckCircle, Eye, MessageSquare, XCircle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Dispute } from '@/lib/types/dispute.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useDisputesTableColumns(): ColumnConfig<Dispute>[] {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
    {
      key: 'reason',
      header: t('disputes.table.reason'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${
                dispute.priority === 'high'
                  ? cssVars.status.error
                  : dispute.priority === 'medium'
                    ? cssVars.status.warning
                    : cssVars.status.info
              } 15%, transparent)`,
            }}
          >
            <AlertTriangle
              className="h-5 w-5"
              style={{
                color:
                  dispute.priority === 'high'
                    ? cssVars.status.error
                    : dispute.priority === 'medium'
                      ? cssVars.status.warning
                      : cssVars.status.info,
              }}
            />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {dispute.subject}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {dispute.description.substring(0, 50)}...
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'priority',
      header: t('disputes.table.priority'),
      render: (dispute: Dispute) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: `color-mix(in srgb, ${
              dispute.priority === 'high'
                ? cssVars.status.error
                : dispute.priority === 'medium'
                  ? cssVars.status.warning
                  : cssVars.status.info
            } 15%, transparent)`,
            color:
              dispute.priority === 'high'
                ? cssVars.status.error
                : dispute.priority === 'medium'
                  ? cssVars.status.warning
                  : cssVars.status.info,
          }}
        >
          {dispute.priority === 'high'
            ? 'عالية'
            : dispute.priority === 'medium'
              ? 'متوسطة'
              : 'منخفضة'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: t('disputes.table.date'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(dispute.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('disputes.table.status'),
      render: (dispute: Dispute) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor:
              dispute.status === 'resolved'
                ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
                : dispute.status === 'closed'
                  ? `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`
                  : dispute.status === 'in_review'
                    ? `color-mix(in srgb, ${cssVars.status.info} 15%, transparent)`
                    : `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
            color:
              dispute.status === 'resolved'
                ? cssVars.status.success
                : dispute.status === 'closed'
                  ? cssVars.neutral.textMuted
                  : dispute.status === 'in_review'
                    ? cssVars.status.info
                    : cssVars.status.warning,
          }}
        >
          {t(`disputes.statuses.${dispute.status}`)}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('disputes.table.actions'),
      render: (dispute: Dispute) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/admin/disputes/${dispute.id}`);
            }}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
            }}
          >
            <MessageSquare className="h-4 w-4" style={{ color: cssVars.status.info }} />
          </button>
          {dispute.status === 'open' && (
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

