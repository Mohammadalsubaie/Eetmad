'use client';

import { Calendar, Clock, DollarSign, FileText } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Project } from '@/lib/types/project.types';

interface ProjectStatsProps {
  project: Project;
}

export default function ProjectStats({ project }: ProjectStatsProps) {
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

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('totalAmount')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatCurrency(project.totalAmount)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('startDate')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatDate(project.startDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('expectedEndDate')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {formatDate(project.expectedEndDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestones')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {project.milestones?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
