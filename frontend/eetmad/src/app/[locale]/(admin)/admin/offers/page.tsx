'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import StatusBadge from '@/components/shared/badges/StatusBadge';
import type { Offer } from '@/lib/types/offer.types';
import { cssVars } from '@/styles/theme';
import { Briefcase, Calendar, Clock, DollarSign, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function OffersManagementPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock data
  const [offers] = useState<Offer[]>([
    {
      id: '1',
      offerNumber: 'OFF-2024-001',
      requestId: 'request-1',
      supplierId: 'supplier-1',
      proposedPrice: 65000,
      estimatedDuration: 30,
      startDate: '2024-04-01',
      technicalProposal: 'سأقوم بتطوير الموقع بأعلى جودة باستخدام أحدث التقنيات',
      deliverables: 'موقع ويب كامل, لوحة تحكم, تطبيق موبايل',
      paymentTerms: '50% عند البداية، 50% عند التسليم',
      status: 'pending',
      warrantyPeriod: 90,
      warrantyDetails: 'ضمان شامل لمدة 3 أشهر',
      clientNotes: null,
      adminNotes: null,
      attachments: [],
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
      acceptedAt: null,
    },
    {
      id: '2',
      offerNumber: 'OFF-2024-002',
      requestId: 'request-2',
      supplierId: 'supplier-2',
      proposedPrice: 18000,
      estimatedDuration: 15,
      startDate: '2024-03-20',
      technicalProposal: 'تصميم هوية بصرية احترافية متكاملة',
      deliverables: 'شعار, بطاقات أعمال, ترويسة, دليل هوية',
      paymentTerms: '100% عند القبول',
      status: 'accepted',
      warrantyPeriod: null,
      warrantyDetails: null,
      clientNotes: null,
      adminNotes: null,
      attachments: [],
      createdAt: '2024-03-14T09:00:00Z',
      updatedAt: '2024-03-16T14:00:00Z',
      acceptedAt: '2024-03-15T14:00:00Z',
    },
  ]);

  const columns = [
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

  return (
    <div>
      <AdminPageHeader
        title={t('offers.title')}
        description={t('offers.description')}
        icon={Briefcase}
      />

      <AdminDataTable
        data={offers}
        columns={columns}
        searchPlaceholder={t('offers.search')}
        onRowClick={(offer) => router.push(`/admin/offers/${offer.id}`)}
        isLoading={loading}
        emptyMessage={t('offers.empty')}
      />
    </div>
  );
}
