'use client';

import { DollarSign, Edit } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import type { Offer } from '@/lib/types/offer.types';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface OfferHeaderProps {
  offer: Offer;
  offerId: string;
}

export default function OfferHeader({ offer, offerId }: OfferHeaderProps) {
  const t = useTranslations('pages.offers');
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return cssVars.status.success;
      case 'rejected':
        return cssVars.status.error;
      case 'withdrawn':
        return cssVars.neutral.textSecondary;
      case 'expired':
        return cssVars.status.warning;
      default:
        return cssVars.status.info;
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
  };

  const renderStatusIcon = () => {
    const IconComponent =
      offer.status === 'accepted'
        ? CheckCircle2
        : offer.status === 'rejected'
          ? XCircle
          : AlertCircle;

    return <IconComponent className="h-3 w-3" />;
  };

  const statusColor = getStatusColor(offer.status);

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
              {renderStatusIcon()}
              {t(`status.${offer.status}`)}
            </span>
            {offer.offerNumber && (
              <span className="text-sm font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {offer.offerNumber}
              </span>
            )}
          </div>
          <h1 className="mb-4 text-3xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('offerDetails')}
          </h1>
        </div>
        {offer.status === 'pending' && (
          <Button
            onClick={() => router.push(`/offers/${offerId}/edit`)}
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
        )}
      </div>

      {/* Price Highlight */}
      <div
        className="mb-4 rounded-xl border-2 p-4"
        style={{
          borderColor: cssVars.primary.DEFAULT,
          backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
              {t('proposedPrice')}
            </p>
            <p className="text-3xl font-bold" style={{ color: cssVars.primary.DEFAULT }}>
              {formatCurrency(offer.proposedPrice)}
            </p>
          </div>
          <DollarSign className="h-10 w-10" style={{ color: cssVars.primary.DEFAULT }} />
        </div>
      </div>
    </div>
  );
}
