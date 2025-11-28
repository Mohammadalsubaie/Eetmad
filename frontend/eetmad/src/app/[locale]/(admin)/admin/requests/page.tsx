'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useRequests } from '@/lib/hooks/useRequests';
import { FileText } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useRequestsTableColumns } from '@/components/features/admin/RequestsTableColumns';

export default function RequestsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { data: requests, isLoading } = useRequests();
  const columns = useRequestsTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('requests.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('requests.title')}
        description={t('requests.description')}
        icon={FileText}
      />

      <AdminDataTable
        data={requests}
        columns={columns}
        searchPlaceholder={t('requests.search')}
        onRowClick={(request) => router.push(`/admin/requests/${request.id}`)}
        isLoading={isLoading}
        emptyMessage={t('requests.empty')}
      />
    </div>
  );
}
