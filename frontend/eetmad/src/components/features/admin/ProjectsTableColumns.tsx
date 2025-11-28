'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Briefcase, Calendar, Eye, TrendingUp } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { cssVars } from '@/styles/theme';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { Project } from '@/lib/types/project.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useProjectsTableColumns(): ColumnConfig<Project>[] {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
    {
      key: 'projectNumber',
      header: t('projects.table.title'),
      render: (project: Project) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.secondary.DEFAULT} 15%, transparent)`,
            }}
          >
            <Briefcase className="h-5 w-5" style={{ color: cssVars.secondary.DEFAULT }} />
          </div>
          <div>
            <div
              className="text-ellipsis whitespace-nowrap font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {project.projectNumber}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('projects.table.request')}: {project.requestId}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'totalAmount',
      header: t('projects.table.price'),
      render: (project: Project) => (
        <CurrencyDisplay
          amount={project.totalAmount}
          className="font-bold"
          iconSize={16}
          iconClassName="h-4 w-4"
        />
      ),
    },
    {
      key: 'progress',
      header: t('projects.table.progress'),
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {project.progress}%
          </span>
        </div>
      ),
    },
    {
      key: 'expectedEndDate',
      header: t('projects.table.deadline'),
      render: (project: Project) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(project.expectedEndDate).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('projects.table.status'),
      render: (project: Project) => (
        <StatusBadge
          status={project.status}
          labels={{
            draft: t('projects.statuses.draft'),
            pending_contract: t('projects.statuses.pending_contract'),
            active: t('projects.statuses.active'),
            on_hold: t('projects.statuses.on_hold'),
            completed: t('projects.statuses.completed'),
            cancelled: t('projects.statuses.cancelled'),
            disputed: t('projects.statuses.disputed'),
          }}
        />
      ),
    },
    {
      key: 'actions',
      header: t('projects.table.actions'),
      render: (project: Project) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/projects/${project.id}`);
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
