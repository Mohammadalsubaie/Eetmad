'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, FileText, User, ArrowRight } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Dispute } from '@/lib/types/dispute.types';
import { Badge } from '@/components/ui';
import StatusBadge from '@/components/shared/badges/StatusBadge';

interface DisputeCardProps {
  dispute: Dispute;
  onView?: (id: string) => void;
}

export default function DisputeCard({ dispute, onView }: DisputeCardProps) {
  const t = useTranslations('pages.disputes');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(dispute.id);
    } else {
      router.push(`/disputes/${dispute.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return cssVars.status.error;
      case 'high':
        return cssVars.status.warning;
      case 'medium':
        return cssVars.status.info;
      case 'low':
        return cssVars.neutral.textMuted;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'quality':
        return cssVars.status.error;
      case 'delivery':
        return cssVars.status.warning;
      case 'payment':
        return cssVars.primary.DEFAULT;
      case 'communication':
        return cssVars.status.info;
      default:
        return cssVars.neutral.textSecondary;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer rounded-2xl border-2 p-6 shadow-md transition-all hover:shadow-lg"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
        borderLeftWidth: '4px',
        borderLeftColor: getPriorityColor(dispute.priority),
      }}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-3 flex items-center gap-2">
            <StatusBadge
              status={dispute.status}
              labels={{
                open: t('status.open'),
                in_review: t('status.in_review'),
                resolved: t('status.resolved'),
                closed: t('status.closed'),
                escalated: t('status.escalated'),
              }}
              colorMap={{
                open: cssVars.status.warning,
                in_review: cssVars.status.info,
                resolved: cssVars.status.success,
                closed: cssVars.neutral.textMuted,
                escalated: cssVars.status.error,
              }}
            />
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${getPriorityColor(dispute.priority)} 15%, transparent)`,
                color: getPriorityColor(dispute.priority),
                borderColor: getPriorityColor(dispute.priority),
              }}
            >
              {t(`priority.${dispute.priority}`)}
            </Badge>
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${getCategoryColor(dispute.category)} 15%, transparent)`,
                color: getCategoryColor(dispute.category),
                borderColor: getCategoryColor(dispute.category),
              }}
            >
              {t(`category.${dispute.category}`)}
            </Badge>
          </div>

          {/* Title */}
          <h3
            className="mb-2 text-xl font-bold leading-tight"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {dispute.subject}
          </h3>

          {/* Description */}
          <p
            className="mb-3 line-clamp-2 text-sm leading-relaxed"
            style={{ color: cssVars.neutral.textSecondary }}
          >
            {dispute.description}
          </p>

          {/* Details */}
          <div className="mb-3 space-y-2">
            {dispute.disputeNumber && (
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('disputeNumber')}:
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {dispute.disputeNumber}
                </span>
              </div>
            )}
            {dispute.evidence && dispute.evidence.length > 0 && (
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
                <span className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                  {dispute.evidence.length} {t('evidenceFiles')}
                </span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between border-t pt-3"
            style={{ borderColor: cssVars.neutral.border }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
              <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
                {formatDate(dispute.createdAt)}
              </span>
            </div>
            <ArrowRight className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
