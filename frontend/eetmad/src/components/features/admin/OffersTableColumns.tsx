'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Briefcase, Calendar, Clock, DollarSign, Eye } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { Offer } from '@/lib/types/offer.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useOffersTableColumns(): ColumnConfig<Offer>[] {
  const t = useTranslations('admin');
  const router = useRouter();

  return [
    {
      key: 'requestId',
      header: t('offers.table.request'),
      render: (offer: Offer) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 15%, transparent)`,
            }}
          >
            <Briefcase className="h-5 w-5" style={{ color: cssVars.accent.primary }} />
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              طلب #{offer.requestId.slice(0, 8)}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              مورد #{offer.supplierId.slice(0, 8)}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: t('offers.table.price'),
      render: (offer: Offer) => (
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" style={{ color: cssVars.status.success }} />
          <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {offer.proposedPrice.toLocaleString('ar-SA')} ر.س
          </span>
        </div>
      ),
    },
    {
      key: 'deliveryTime',
      header: t('offers.table.deliveryTime'),
      render: (offer: Offer) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {offer.estimatedDuration} {t('offers.time.days')}
          </span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      header: t('offers.table.date'),
      render: (offer: Offer) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(offer.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      header: t('offers.table.status'),
      render: (offer: Offer) => (
        <StatusBadge
          status={offer.status}
          labels={{
            pending: t('offers.statuses.pending'),
            accepted: t('offers.statuses.accepted'),
            rejected: t('offers.statuses.rejected'),
            withdrawn: t('offers.statuses.withdrawn'),
          }}
        />
      ),
    },
    {
      key: 'actions',
      header: t('offers.table.actions'),
      render: (offer: Offer) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/offers/${offer.id}`);
          }}
          className="rounded-lg p-2 transition-all hover:bg-opacity-80"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
        </button>
      ),
    },
  ];
}
