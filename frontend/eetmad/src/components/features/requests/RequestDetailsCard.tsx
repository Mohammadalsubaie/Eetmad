'use client';

import { Calendar, MapPin } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Request } from '@/lib/types/request.types';

interface RequestDetailsCardProps {
  request: Request;
}

export default function RequestDetailsCard({ request }: RequestDetailsCardProps) {
  const t = useTranslations('pages.requests');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="rounded-2xl border-2 p-6"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h3 className="mb-4 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('details')}
      </h3>
      <div className="space-y-4">
        <div>
          <p
            className="mb-1 text-xs font-medium"
            style={{ color: cssVars.neutral.textMuted }}
          >
            {t('deadline')}
          </p>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
            <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
              {formatDate(request.deadline)}
            </p>
          </div>
        </div>
        {request.location && (
          <div>
            <p
              className="mb-1 text-xs font-medium"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('location')}
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
              <p className="text-sm font-medium" style={{ color: cssVars.secondary.DEFAULT }}>
                {request.location.city ||
                  request.location.region ||
                  t('locationNotSpecified')}
              </p>
            </div>
          </div>
        )}
        {request.requiresOnSiteVisit && (
          <span
            className="inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.warm} 15%, transparent)`,
              color: cssVars.accent.warm,
              borderColor: cssVars.accent.warm,
            }}
          >
            {t('onSiteVisit')}
          </span>
        )}
      </div>
    </div>
  );
}

