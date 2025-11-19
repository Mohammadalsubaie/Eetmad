'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useMyOffers } from '@/lib/hooks/useOffers';
import OfferCard from '@/components/features/offers/OfferCard';
import { EmptyState, Button, LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function OffersPage() {
  const t = useTranslations('pages.offers');
  const locale = useLocale();
  const router = useRouter();
  const { data: offers, isLoading, error } = useMyOffers();

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('myOffers')}
          </h1>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('myOffersSubtitle')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push('/offers/new')}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Plus className="h-5 w-5" />
            {t('createOffer')}
          </Button>
        </motion.div>
      </div>

      {error && (
        <div className="mb-6">
          <ErrorMessage
            error={error.message || t('fetchError')}
            variant="banner"
          />
        </div>
      )}

      {/* Offers List */}
      {offers.length === 0 ? (
        <EmptyState title={t('noOffers')} description={t('noOffersDescription')} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onView={(id) => router.push(`/offers/${id}`)}
              showActions={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
