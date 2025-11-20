'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { cssVars } from '@/styles/theme';
import type { Request } from '@/lib/types/request.types';

interface RequestActionsProps {
  request: Request;
  requestId: string;
}

export default function RequestActions({ request, requestId }: RequestActionsProps) {
  const t = useTranslations('pages.requests');
  const router = useRouter();

  if (request.status !== 'open' || request.offersCount === 0) {
    return null;
  }

  return (
    <Button
      onClick={() => router.push(`/requests/${requestId}/offers`)}
      className="w-full"
      variant="primary"
      style={{
        background: cssVars.gradient.gold,
        color: cssVars.secondary.DEFAULT,
      }}
    >
      {t('viewOffers')} ({request.offersCount})
    </Button>
  );
}

