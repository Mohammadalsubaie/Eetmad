'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { offersApi } from '@/lib/api/offers';
import type { Offer } from '@/lib/types/offer.types';
import OfferCard from './OfferCard';
import EmptyState from '@/components/ui/EmptyState';

interface OffersListProps {
  requestId?: string;
  onAccept?: (offerId: string) => void;
  onReject?: (offerId: string) => void;
}

export default function OffersList({ requestId, onAccept, onReject }: OffersListProps) {
  const t = useTranslations('pages.offers');
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOffers();
  }, [requestId]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = requestId ? await offersApi.getByRequestId(requestId) : await offersApi.getAll();
      setOffers(data);
    } catch (err) {
      console.error('Failed to fetch offers:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (offerId: string) => {
    try {
      await offersApi.accept(offerId);
      if (onAccept) {
        onAccept(offerId);
      }
      fetchOffers(); // Refresh list
    } catch (err) {
      console.error('Failed to accept offer:', err);
    }
  };

  const handleReject = async (offerId: string) => {
    try {
      await offersApi.reject(offerId);
      if (onReject) {
        onReject(offerId);
      }
      fetchOffers(); // Refresh list
    } catch (err) {
      console.error('Failed to reject offer:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border-2 p-8 text-center"
        style={{ borderColor: cssVars.status.error }}
      >
        <p style={{ color: cssVars.status.error }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {offers.length === 0 ? (
        <EmptyState title={t('noOffers')} description={t('noOffersDescription')} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onAccept={handleAccept}
              onReject={handleReject}
              showActions={!!requestId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
