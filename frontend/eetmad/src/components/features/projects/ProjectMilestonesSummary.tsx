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
      whileHover={{ y: -2 }}
      className="rounded-3xl border-2 p-8 shadow-xl transition-all"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          {
            label: t('milestonesSection.totalAmount'),
            value: `${project.totalAmount.toLocaleString('ar-SA')} ${t('milestonesSection.currency')}`,
            icon: DollarSign,
            iconColor: cssVars.status.success,
          },
          {
            label: t('milestonesSection.progress'),
            value: `${project.progress}%`,
            icon: TrendingUp,
            iconColor: cssVars.primary.DEFAULT,
          },
          {
            label: t('milestonesSection.completedMilestones'),
            value: `${milestones.filter((m) => m.status === 'completed' || m.status === 'approved').length} / ${milestones.length}`,
            icon: CheckCircle,
            iconColor: cssVars.status.success,
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl border-2 p-4"
            style={{
              backgroundColor: `color-mix(in srgb, ${stat.iconColor} 5%, transparent)`,
              borderColor: cssVars.neutral.border,
            }}
          >
            <div
              className="mb-3 text-xs font-semibold uppercase tracking-wide"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {stat.label}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `color-mix(in srgb, ${stat.iconColor} 15%, transparent)`,
                }}
              >
                <stat.icon className="h-5 w-5" style={{ color: stat.iconColor }} />
              </div>
              <span className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {stat.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
