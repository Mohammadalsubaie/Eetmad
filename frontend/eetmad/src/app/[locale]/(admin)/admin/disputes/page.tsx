'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useDisputes } from '@/lib/hooks/useAdmin';
import { AlertTriangle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useDisputesTableColumns } from '@/components/features/admin/DisputesTableColumns';

export default function DisputesPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { disputes, isLoading } = useDisputes();
  const columns = useDisputesTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('disputes.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('disputes.title')}
        description={t('disputes.description')}
        icon={AlertTriangle}
      />

      <AdminDataTable
        data={disputes}
        columns={columns}
        searchPlaceholder={t('disputes.search')}
        onRowClick={(dispute) => router.push(`/admin/disputes/${dispute.id}`)}
        isLoading={isLoading}
        emptyMessage={t('disputes.empty')}
      />
    </div>
  );
}
