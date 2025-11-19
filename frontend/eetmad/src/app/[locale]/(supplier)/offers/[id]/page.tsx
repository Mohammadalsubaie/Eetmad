'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Edit,
  DollarSign,
  Calendar,
  Clock,
  FileText,
  Shield,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { offersApi } from '@/lib/api/offers';
import type { Offer } from '@/lib/types/offer.types';
import { Button } from '@/components/ui/Button';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.offers');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffer = useCallback(
    async (offerId: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await offersApi.getById(offerId);
        setOffer(data);
      } catch (err) {
        console.error('Failed to fetch offer:', err);
        setError(t('fetchError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (id) {
      fetchOffer(id);
    }
  }, [id, fetchOffer]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ${t('currency')}`;
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return CheckCircle2;
      case 'rejected':
        return XCircle;
      case 'withdrawn':
      case 'expired':
        return AlertCircle;
      default:
        return AlertCircle;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{ borderColor: cssVars.status.error }}
        >
          <p style={{ color: cssVars.status.error }}>{error || t('notFound')}</p>
          <Button
            onClick={() => router.push('/offers')}
            className="mt-4"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {t('backToOffers')}
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(offer.status);

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/offers` },
          { label: offer.offerNumber || `#${id}` },
        ]}
        className="mb-6"
      />
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
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
                  backgroundColor: `color-mix(in srgb, ${getStatusColor(offer.status)} 15%, transparent)`,
                  color: getStatusColor(offer.status),
                  borderColor: getStatusColor(offer.status),
                }}
              >
                <StatusIcon className="h-3 w-3" />
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
              onClick={() => router.push(`/offers/${id}/edit`)}
              variant="outline"
              className="flex items-center gap-2"
              style={{
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              <Edit className="h-4 w-4" />
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

        {/* Stats Grid */}
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
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Technical Proposal */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2
              className="mb-4 flex items-center gap-2 text-xl font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              <FileText className="h-5 w-5" />
              {t('technicalProposal')}
            </h2>
            <p
              className="whitespace-pre-line leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {offer.technicalProposal}
            </p>
          </div>

          {/* Deliverables */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('deliverables')}
            </h2>
            <p
              className="whitespace-pre-line leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {offer.deliverables}
            </p>
          </div>

          {/* Payment Terms */}
          <div
            className="rounded-2xl border-2 p-6"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
            }}
          >
            <h2 className="mb-4 text-xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('paymentTerms')}
            </h2>
            <p
              className="whitespace-pre-line leading-relaxed"
              style={{ color: cssVars.neutral.textSecondary }}
            >
              {offer.paymentTerms}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Warranty Details */}
          {offer.warrantyDetails && (
            <div
              className="rounded-2xl border-2 p-6"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3
                className="mb-4 flex items-center gap-2 text-lg font-bold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                <Shield className="h-5 w-5" />
                {t('warrantyDetails')}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {offer.warrantyDetails}
              </p>
            </div>
          )}

          {/* Actions */}
          {offer.status === 'pending' && (
            <Button
              onClick={async () => {
                if (confirm(t('confirmWithdraw'))) {
                  try {
                    await offersApi.withdraw(offer.id);
                    router.push('/offers');
                  } catch (err) {
                    console.error('Failed to withdraw offer:', err);
                  }
                }
              }}
              variant="outline"
              className="w-full"
              style={{
                borderColor: cssVars.status.error,
                color: cssVars.status.error,
              }}
            >
              {t('withdraw')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
