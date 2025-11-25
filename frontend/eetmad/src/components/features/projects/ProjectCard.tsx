'use client';

import { Badge } from '@/components/ui';
import type { Project } from '@/lib/types/project.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  project: Project;
  onView?: (id: string) => void;
  showActions?: boolean;
}

export default function ProjectCard({ project, onView }: ProjectCardProps) {
  const t = useTranslations('pages.projects');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(project.id);
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer rounded-2xl border-2 p-6 shadow-lg transition-all hover:shadow-2xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${getStatusColor(project.status)} 15%, transparent)`,
                color: getStatusColor(project.status),
                borderColor: getStatusColor(project.status),
              }}
            >
              {project.status === 'completed' ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : project.status === 'active' ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : project.status === 'pending_contract' || project.status === 'on_hold' ? (
                <Clock className="mr-1 h-3 w-3" />
              ) : project.status === 'cancelled' || project.status === 'disputed' ? (
                <AlertCircle className="mr-1 h-3 w-3" />
              ) : (
                <Clock className="mr-1 h-3 w-3" />
              )}
              {t(`status.${project.status}`)}
            </Badge>
            {project.projectNumber && (
              <span className="text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {project.projectNumber}
              </span>
            )}
          </div>
          <h3
            className="mb-2 text-xl font-bold leading-tight"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('projectTitle')} #{project.id}
          </h3>
        </div>
      </div>

      {/* Progress Bar */}
      {project.status === 'active' && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {t('progress')}
            </span>
            <span className="text-sm font-bold" style={{ color: cssVars.primary.DEFAULT }}>
              {project.progress}%
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 20%, transparent)`,
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${project.progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ background: cssVars.gradient.primary }}
            />
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/* Total Amount */}
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('totalAmount')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            <CurrencyDisplay amount={project.totalAmount} iconSize={16} />
          </p>
        </div>

        {/* Expected End Date */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('expectedEndDate')}
            </p>
            <p className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {formatDate(project.expectedEndDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t pt-4"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('milestones')}: {project.milestones?.length || 0}
            </span>
          </div>
        </div>
        {project.approvedByClient && (
          <Badge
            style={{
              borderColor: cssVars.status.success,
              color: cssVars.status.success,
            }}
          >
            {t('approved')}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
