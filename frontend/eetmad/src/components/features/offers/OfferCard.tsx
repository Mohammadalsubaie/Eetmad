'use client';

import { Badge, Button } from '@/components/ui';
import type { Offer } from '@/lib/types/offer.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { AlertCircle, Calendar, CheckCircle2, Clock, XCircle } from 'lucide-react';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface OfferCardProps {
  offer: Offer;
  onView?: (id: string) => void;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  showActions?: boolean;
}

export default function OfferCard({
  offer,
  onView,
  onAccept,
  onReject,
  showActions = true,
}: OfferCardProps) {
  const t = useTranslations('pages.offers');
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border-2 p-6 shadow-lg transition-all hover:shadow-2xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              style={{
                backgroundColor: `color-mix(in srgb, ${getStatusColor(offer.status)} 15%, transparent)`,
                color: getStatusColor(offer.status),
                borderColor: getStatusColor(offer.status),
              }}
            >
              {offer.status === 'accepted' ? (
                <CheckCircle2 className="mr-1 h-3 w-3" />
              ) : offer.status === 'rejected' ? (
                <XCircle className="mr-1 h-3 w-3" />
              ) : offer.status === 'withdrawn' || offer.status === 'expired' ? (
                <AlertCircle className="mr-1 h-3 w-3" />
              ) : (
                <AlertCircle className="mr-1 h-3 w-3" />
              )}
              {t(`status.${offer.status}`)}
            </Badge>
            {offer.offerNumber && (
              <span className="text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
                {offer.offerNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price - Highlighted */}
      <div
        className="mb-4 rounded-xl border-2 p-4"
        style={{
          borderColor: cssVars.primary.DEFAULT,
          backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
        }}
      >
        <div>
          <p className="mb-1 text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
            {t('proposedPrice')}
          </p>
          <CurrencyDisplay amount={offer.proposedPrice} className="text-2xl font-bold" iconSize={24} />
        </div>
      </div>

      {/* Details Grid */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {offer.estimatedDuration} {t('days')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('startDate')}: {formatDate(offer.startDate)}
          </span>
        </div>
        {offer.warrantyPeriod && (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" style={{ color: cssVars.status.success }} />
            <span className="text-sm font-medium" style={{ color: cssVars.neutral.textSecondary }}>
              {t('warranty')}: {offer.warrantyPeriod} {t('days')}
            </span>
          </div>
        )}
      </div>

      {/* Technical Proposal Preview */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium" style={{ color: cssVars.neutral.textMuted }}>
          {t('technicalProposal')}
        </p>
        <p
          className="line-clamp-2 text-sm leading-relaxed"
          style={{ color: cssVars.neutral.textSecondary }}
        >
          {offer.technicalProposal}
        </p>
      </div>

      {/* Actions */}
      {showActions && offer.status === 'pending' && (
        <div className="flex gap-2 border-t pt-4" style={{ borderColor: cssVars.neutral.border }}>
          <Button
            onClick={() => onAccept?.(offer.id)}
            className="flex-1"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('accept')}
          </Button>
          <Button onClick={() => onReject?.(offer.id)} variant="outline" className="flex-1">
            {t('reject')}
          </Button>
        </div>
      )}

      {/* View Details Link */}
      <button
        onClick={() => (onView ? onView(offer.id) : router.push(`/offers/${offer.id}`))}
        className="mt-4 w-full text-center text-sm font-medium underline"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        {t('viewDetails')}
      </button>
    </motion.div>
  );
}
