'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Calendar, DollarSign, Eye, FileText } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { Request } from '@/lib/types/request.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useRequestsTableColumns(): ColumnConfig<Request>[] {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
    {
      key: 'title',
      header: t('requests.table.title'),
      render: (request: Request) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.title}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {request.offersCount} عرض • {request.viewsCount} مشاهدة
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'budgetMin',
      header: t('requests.table.budget'),
      render: (request: Request) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {request.budgetMin?.toLocaleString('ar-SA') ?? 0} -{' '}
            {request.budgetMax?.toLocaleString('ar-SA') ?? 0} ر.س
          </span>
        </div>
      ),
    },
    {
      key: 'deadline',
      header: t('requests.table.deadline'),
      render: (request: Request) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(request.deadline).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('requests.table.status'),
      render: (request: Request) => (
        <StatusBadge
          status={request.status}
          labels={{
            draft: t('requests.statuses.draft'),
            open: t('requests.statuses.active'),
            in_progress: t('projects.statuses.in_progress'),
            completed: t('projects.statuses.completed'),
            closed: t('requests.statuses.closed'),
            cancelled: t('requests.statuses.cancelled'),
          }}
        />
      ),
    },
    {
      key: 'actions',
      header: t('requests.table.actions'),
      render: (request: Request) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/requests/${request.id}`);
          }}
          className="rounded-lg p-2 transition-all hover:bg-opacity-80"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
        </button>
      ),
    },
  ];
}

