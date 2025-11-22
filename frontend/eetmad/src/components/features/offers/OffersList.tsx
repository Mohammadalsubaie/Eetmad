'use client';

import { useTranslations } from 'next-intl';
import { offersApi } from '@/lib/api/offers';
import { useOffers, useOffersByRequest } from '@/lib/hooks/useOffers';
import OfferCard from './OfferCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface OffersListProps {
  requestId?: string;
  onAccept?: (offerId: string) => void;
  onReject?: (offerId: string) => void;
}

export default function OffersList({ requestId, onAccept, onReject }: OffersListProps) {
  const t = useTranslations('pages.offers');
  const {
    data: offers,
    isLoading,
    error,
  } = requestId ? useOffersByRequest(requestId) : useOffers();

  const handleAccept = async (offerId: string) => {
    try {
      await offersApi.accept(offerId);
      if (onAccept) {
        onAccept(offerId);
      }
      // Note: In a real app, you might want to refetch or use a mutation hook
      // For now, the hook will handle refetching on next render
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
      // Note: In a real app, you might want to refetch or use a mutation hook
      // For now, the hook will handle refetching on next render
    } catch (err) {
      console.error('Failed to reject offer:', err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {offers.length === 0 ? (
        <EmptyState title={t('noOffers')} description={t('noOffersDescription')} />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onAccept={handleAccept}
              onReject={handleReject}
              showActions={!!requestId}
            />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}
