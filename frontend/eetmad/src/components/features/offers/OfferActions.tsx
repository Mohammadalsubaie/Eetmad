'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import { offersApi } from '@/lib/api/offers';
import type { Offer } from '@/lib/types/offer.types';

interface OfferActionsProps {
  offer: Offer;
}

export default function OfferActions({ offer }: OfferActionsProps) {
  const t = useTranslations('pages.offers');
  const router = useRouter();

  if (offer.status !== 'pending') {
    return null;
  }

  const handleWithdraw = async () => {
    if (confirm(t('confirmWithdraw'))) {
      try {
        await offersApi.withdraw(offer.id);
        router.push('/offers');
      } catch (err) {
        console.error('Failed to withdraw offer:', err);
      }
    }
  };

  return (
    <Button
      onClick={handleWithdraw}
      variant="outline"
      className="w-full"
      style={{
        borderColor: cssVars.status.error,
        color: cssVars.status.error,
      }}
    >
      {t('withdraw')}
    </Button>
  );
}

