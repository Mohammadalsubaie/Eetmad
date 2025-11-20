'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useSuppliers } from '@/lib/hooks/useSupplier';
import { ShoppingBag } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useSuppliersTableColumns } from '@/components/features/admin/SuppliersTableColumns';

export default function SuppliersManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { suppliers, isLoading } = useSuppliers();
  const columns = useSuppliersTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('suppliers.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('suppliers.title')}
        description={t('suppliers.description')}
        icon={ShoppingBag}
      />

      <AdminDataTable
        data={suppliers}
        columns={columns}
        searchPlaceholder={t('suppliers.search')}
        onRowClick={(supplier) => router.push(`/admin/suppliers/${supplier.id}`)}
        isLoading={isLoading}
        emptyMessage={t('suppliers.empty')}
      />
    </div>
  );
}
