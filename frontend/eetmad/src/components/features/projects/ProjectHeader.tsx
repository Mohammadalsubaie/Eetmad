'use client';

import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui';
import type { Project } from '@/lib/types/project.types';

interface ProjectHeaderProps {
  project: Project;
  variant?: 'client' | 'supplier';
}

export default function ProjectHeader({ project, variant = 'client' }: ProjectHeaderProps) {
  const t = useTranslations('pages.projects');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return cssVars.status.success;
      case 'pending_contract':
        return cssVars.status.warning;
      case 'completed':
        return cssVars.primary.DEFAULT;
      case 'cancelled':
      case 'disputed':
        return cssVars.status.error;
      case 'on_hold':
        return cssVars.neutral.textSecondary;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle2;
      case 'active':
        return TrendingUp;
      case 'pending_contract':
      case 'on_hold':
        return Clock;
      case 'cancelled':
      case 'disputed':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(project.status);
  const statusColor = getStatusColor(project.status);

  return (
    <div
      className="mb-8 rounded-2xl border-2 p-6"
      style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            {variant === 'supplier' ? (
              <Badge
                variant={
                  project.status === 'active'
                    ? 'success'
                    : project.status === 'completed'
                      ? 'featured'
                      : 'info'
                }
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {t(`status.${project.status}`)}
              </Badge>
            ) : (
              <Badge
                style={{
                  backgroundColor: `color-mix(in srgb, ${statusColor} 15%, transparent)`,
                  color: statusColor,
                  borderColor: statusColor,
                }}
              >
                <StatusIcon className="mr-1 h-3 w-3" />
                {t(`status.${project.status}`)}
              </Badge>
            )}
            {project.projectNumber && (
              <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {project.projectNumber}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('projectTitle')} #{project.id}
          </h1>
        </div>
      </div>

      {/* Progress Bar */}
      {project.status === 'active' && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {t('progress')}
            </span>
            <span className="text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
              {project.progress}%
            </span>
          </div>
          <div
            className="h-3 w-full overflow-hidden rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ background: cssVars.gradient.gold }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

