'use client';

import { Calendar, Clock, Shield } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Offer } from '@/lib/types/offer.types';

interface OfferStatsProps {
  offer: Offer;
}

export default function OfferStats({ offer }: OfferStatsProps) {
  const t = useTranslations('pages.offers');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
        <div>
          <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            {t('estimatedDuration')}
          </p>
          <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {offer.estimatedDuration} {t('days')}
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
            {formatDate(offer.startDate)}
          </p>
        </div>
      </div>
      {offer.warrantyPeriod && (
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" style={{ color: cssVars.status.success }} />
          <div>
            <p className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {t('warranty')}
            </p>
            <p className="text-sm font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {offer.warrantyPeriod} {t('days')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

