'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  XCircle,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import { Button } from '@/components/ui';
import type { ProjectMilestone } from '@/lib/types/project.types';

interface MilestoneCardProps {
  milestone: ProjectMilestone;
  index: number;
  onApprove?: (milestoneId: string) => void;
  onReject?: (milestoneId: string) => void;
}

export default function MilestoneCard({
  milestone,
  index,
  onApprove,
  onReject,
}: MilestoneCardProps) {
  const t = useTranslations('pages.projects');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border-2 p-6 shadow-lg transition-all hover:shadow-xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
            }}
          >
            {milestone.milestoneNumber}
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {milestone.title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
              {milestone.description}
            </p>
          </div>
        </div>
        <StatusBadge
          status={milestone.status}
          labels={{
            pending: t('milestonesSection.statuses.pending'),
            in_progress: t('milestonesSection.statuses.in_progress'),
            completed: t('milestonesSection.statuses.completed'),
            approved: t('milestonesSection.statuses.approved'),
            rejected: t('milestonesSection.statuses.rejected'),
          }}
        />
      </div>

      {/* Milestone Details */}
      <div
        className="mb-4 grid gap-4 border-t pt-4 sm:grid-cols-3"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.amount')}
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
            <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {milestone.amount.toLocaleString('ar-SA')} {t('milestonesSection.currency')}
            </span>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.dueDate')}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
            <span style={{ color: cssVars.secondary.DEFAULT }}>
              {new Date(milestone.dueDate).toLocaleDateString('en-US')}
            </span>
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.paymentStatus')}
          </div>
          <div className="flex items-center gap-2">
            {milestone.paymentReleased ? (
              <>
                <CheckCircle className="h-4 w-4" style={{ color: cssVars.status.success }} />
                <span style={{ color: cssVars.status.success }}>{t('milestonesSection.paid')}</span>
              </>
            ) : (
              <>
                <Clock className="h-4 w-4" style={{ color: cssVars.status.warning }} />
                <span style={{ color: cssVars.status.warning }}>
                  {t('milestonesSection.pending')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Deliverables */}
      {milestone.deliverables && (
        <div
          className="mb-4 rounded-xl border-2 p-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.deliverables')}
          </div>
          <p style={{ color: cssVars.secondary.DEFAULT }}>{milestone.deliverables}</p>
        </div>
      )}

      {/* Attachments */}
      {milestone.attachments && milestone.attachments.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.attachments')}
          </div>
          <div className="flex flex-wrap gap-2">
            {milestone.attachments.map((attachment) => (
              <motion.a
                key={attachment.id}
                href={attachment.filePath}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg border-2 px-3 py-2 transition-all"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                  borderColor: cssVars.primary.DEFAULT,
                }}
              >
                <FileText className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
                  {attachment.filePath.split('/').pop()}
                </span>
                <Download className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {milestone.notes && (
        <div
          className="mb-4 rounded-xl border-2 p-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div className="mb-2 text-xs font-semibold" style={{ color: cssVars.neutral.textMuted }}>
            {t('milestonesSection.notes')}
          </div>
          <p style={{ color: cssVars.secondary.DEFAULT }}>{milestone.notes}</p>
        </div>
      )}

      {/* Actions */}
      {milestone.status === 'completed' && onApprove && onReject && (
        <div className="flex gap-3 border-t pt-4" style={{ borderColor: cssVars.neutral.border }}>
          <Button
            variant="primary"
            onClick={() => onApprove(milestone.id)}
            icon={CheckCircle}
            iconPosition="left"
            fullWidth
          >
            {t('milestonesSection.actions.approve')}
          </Button>
          <Button
            variant="outline"
            onClick={() => onReject(milestone.id)}
            icon={XCircle}
            iconPosition="left"
            style={{
              borderColor: cssVars.status.error,
              color: cssVars.status.error,
            }}
          >
            {t('milestonesSection.actions.reject')}
          </Button>
        </div>
      )}
    </motion.div>
  );
}
