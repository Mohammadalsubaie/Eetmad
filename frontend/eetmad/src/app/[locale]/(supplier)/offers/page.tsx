'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { offersApi } from '@/lib/api/offers';
import type { Offer } from '@/lib/types/offer.types';
import OfferCard from '@/components/features/offers/OfferCard';
import EmptyState from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function OffersPage() {
  const t = useTranslations('pages.offers');
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await offersApi.getMyOffers();
      setOffers(data);
    } catch (err) {
      console.error('Failed to fetch offers:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
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

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-xl border-2 p-4" style={{ borderColor: cssVars.status.error }}>
          <p style={{ color: cssVars.status.error }}>{error}</p>
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
