'use client';

import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui';
import type { Project } from '@/lib/types/project.types';

interface ProjectMilestonesListProps {
  project: Project;
}

export default function ProjectMilestonesList({ project }: ProjectMilestonesListProps) {
  const t = useTranslations('pages.projects');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
  };

  if (!project.milestones || project.milestones.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('milestones')}
      </h2>
      <div className="space-y-4">
        {project.milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="rounded-xl border-2 p-4"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {milestone.title}
              </h3>
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                  color: cssVars.status.success,
                  borderColor: cssVars.status.success,
                }}
              >
                {t(`milestoneStatus.${milestone.status}`)}
              </Badge>
            </div>
            <p className="mb-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {milestone.description}
            </p>
            <div
              className="flex items-center gap-4 text-xs"
              style={{ color: cssVars.neutral.textMuted }}
            >
              <span>{formatCurrency(milestone.amount)}</span>
              <span>{formatDate(milestone.dueDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

