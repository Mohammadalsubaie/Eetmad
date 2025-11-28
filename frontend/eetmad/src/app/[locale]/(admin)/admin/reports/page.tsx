'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useReports } from '@/lib/hooks/useAdmin';
import { Flag } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useReportsTableColumns } from '@/components/features/admin/ReportsTableColumns';

export default function ReportsPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { reports, isLoading } = useReports();
  const columns = useReportsTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('reports.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('reports.title')}
        description={t('reports.description')}
        icon={Flag}
      />

      <AdminDataTable
        data={reports}
        columns={columns}
        searchPlaceholder={t('reports.search')}
        isLoading={isLoading}
        emptyMessage={t('reports.empty')}
      />
    </div>
  );
}
