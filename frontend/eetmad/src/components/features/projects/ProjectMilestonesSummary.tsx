'use client';

import { motion } from 'framer-motion';
import { CheckCircle, DollarSign, TrendingUp } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Project, ProjectMilestone } from '@/lib/types/project.types';

interface ProjectMilestonesSummaryProps {
  project: Project;
  milestones: ProjectMilestone[];
}

export default function ProjectMilestonesSummary({
  project,
  milestones,
}: ProjectMilestonesSummaryProps) {
  const t = useTranslations('pages.projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 rounded-2xl border-2 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <div
            className="mb-2 text-xs font-semibold"
            style={{ color: cssVars.neutral.textMuted }}
          >
            {t('milestonesSection.totalAmount')}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" style={{ color: cssVars.status.success }} />
            <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {project.totalAmount.toLocaleString('ar-SA')} {t('milestonesSection.currency')}
            </span>
          </div>
        </div>
        <div>
          <div
            className="mb-2 text-xs font-semibold"
            style={{ color: cssVars.neutral.textMuted }}
          >
            {t('milestonesSection.progress')}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
            <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {project.progress}%
            </span>
          </div>
        </div>
        <div>
          <div
            className="mb-2 text-xs font-semibold"
            style={{ color: cssVars.neutral.textMuted }}
          >
            {t('milestonesSection.completedMilestones')}
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
            <span className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {milestones.filter((m) => m.status === 'completed' || m.status === 'approved').length}{' '}
              / {milestones.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

