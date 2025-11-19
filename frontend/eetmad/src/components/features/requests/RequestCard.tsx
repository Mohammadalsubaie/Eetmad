'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Calendar, Eye, MapPin, Tag, Clock, DollarSign } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Request } from '@/lib/types/request.types';
import { Badge } from '@/components/ui';

interface RequestCardProps {
  request: Request;
  onView?: (id: string) => void;
  showActions?: boolean;
}

export default function RequestCard({ request, onView }: RequestCardProps) {
  const t = useTranslations('pages.requests');
  const router = useRouter();

  const handleClick = () => {
    if (onView) {
      onView(request.id);
    } else {
      router.push(`/requests/${request.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatBudget = (min: number | null, max: number | null) => {
    if (min && max) {
      return `${min.toLocaleString()} - ${max.toLocaleString()} ${t('currency')}`;
    }
    if (min) {
      return `${t('budgetMin')}: ${min.toLocaleString()} ${t('currency')}`;
    }
    if (max) {
      return `${t('budgetMax')}: ${max.toLocaleString()} ${t('currency')}`;
    }
    return t('budgetNotSpecified');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return cssVars.status.success;
      case 'in_progress':
        return cssVars.status.info;
      case 'completed':
        return cssVars.primary.DEFAULT;
      case 'cancelled':
      case 'closed':
        return cssVars.status.error;
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
                backgroundColor: `color-mix(in srgb, ${getStatusColor(request.status)} 15%, transparent)`,
                color: getStatusColor(request.status),
                borderColor: getStatusColor(request.status),
              }}
            >
              {t(`status.${request.status}`)}
            </Badge>
            {request.requestNumber && (
              <span className="text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {request.requestNumber}
              </span>
            )}
          </div>
          <h3
            className="mb-2 text-xl font-bold leading-tight"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {request.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p
        className="mb-4 line-clamp-2 text-sm leading-relaxed"
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {request.description}
      </p>

      {/* Details Grid */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        {/* Budget */}
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {formatBudget(request.budgetMin, request.budgetMax)}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {request.expectedDuration} {t('days')}
          </span>
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {formatDate(request.deadline)}
          </span>
        </div>

        {/* Location */}
        {request.location && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
            <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {request.location.city || t('locationNotSpecified')}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between border-t pt-4"
        style={{ borderColor: cssVars.neutral.border }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
            <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {request.viewsCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
            <span className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {request.offersCount} {t('offers')}
            </span>
          </div>
        </div>
        {request.requiresOnSiteVisit && (
          <Badge
            style={{
              borderColor: cssVars.accent.warm,
              color: cssVars.accent.warm,
            }}
          >
            {t('onSiteVisit')}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
