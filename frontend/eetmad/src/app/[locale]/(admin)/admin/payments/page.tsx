'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { usePayments } from '@/lib/hooks/usePayments';
import { CreditCard } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { usePaymentsTableColumns } from '@/components/features/admin/PaymentsTableColumns';

export default function PaymentsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { data: payments, isLoading } = usePayments();
  const columns = usePaymentsTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('payments.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('payments.title')}
        description={t('payments.description')}
        icon={CreditCard}
      />

      <AdminDataTable
        data={payments}
        columns={columns}
        searchPlaceholder={t('payments.search')}
        onRowClick={(payment) => router.push(`/admin/payments/${payment.id}`)}
        isLoading={isLoading}
        emptyMessage={t('payments.empty')}
      />
    </div>
  );
}
