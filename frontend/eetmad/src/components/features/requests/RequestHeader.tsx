'use client';

import { Edit, Eye, Tag, DollarSign, Clock } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import type { Request } from '@/lib/types/request.types';

interface RequestHeaderProps {
  request: Request;
  requestId: string;
}

export default function RequestHeader({ request, requestId }: RequestHeaderProps) {
  const t = useTranslations('pages.requests');
  const locale = useLocale();
  const router = useRouter();

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

  const statusColor = getStatusColor(request.status);

  return (
    <div
      className="mb-8 rounded-2xl border-2 p-6"
      style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${statusColor} 15%, transparent)`,
                color: statusColor,
                borderColor: statusColor,
              }}
            >
              {t(`status.${request.status}`)}
            </span>
            {request.requestNumber && (
              <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {request.requestNumber}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {request.title}
          </h1>
        </div>
        <Button
          onClick={() => router.push(`/${locale}/requests/${requestId}/edit`)}
          variant="outline"
          className="flex items-center gap-2"
          style={{
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          icon={Edit}
          iconPosition="left"
        >
          {t('edit.title')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('views')}
            </p>
            <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.viewsCount}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('offers')}
            </p>
            <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.offersCount}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('budget')}
            </p>
            <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {formatBudget(request.budgetMin, request.budgetMax)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('duration')}
            </p>
            <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {request.expectedDuration} {t('days')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

