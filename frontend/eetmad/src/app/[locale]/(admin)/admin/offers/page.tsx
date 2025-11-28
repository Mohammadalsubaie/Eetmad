'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useOffers } from '@/lib/hooks/useOffers';
import { Briefcase } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useOffersTableColumns } from '@/components/features/admin/OffersTableColumns';

export default function OffersManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { data: offers, isLoading } = useOffers();
  const columns = useOffersTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('offers.title') },
        ]}
        className="mb-6"
      />

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
        isLoading={isLoading}
        emptyMessage={t('offers.empty')}
      />
    </div>
  );
}
