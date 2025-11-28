'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useVerificationQueue } from '@/lib/hooks/useAdmin';
import { Download, ShieldCheck } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useVerificationTableColumns } from '@/components/features/admin/VerificationTableColumns';
import VerificationStats from '@/components/features/admin/VerificationStats';

export default function VerificationPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { documents, isLoading } = useVerificationQueue();

  const handleApprove = async (docId: string) => {
    // API call to approve document
    console.log('Approving document:', docId);
  };

  const handleReject = async (docId: string) => {
    // API call to reject document
    console.log('Rejecting document:', docId);
  };

  const columns = useVerificationTableColumns({
    onApprove: handleApprove,
    onReject: handleReject,
  });

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('verification.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('verification.title')}
        description={t('verification.description')}
        icon={ShieldCheck}
        action={
          <AdminActionButton
            label={t('verification.actions.exportReport')}
            icon={Download}
            variant="secondary"
            onClick={() => {
              // TODO: Implement export report action
              console.log('Export verification report');
            }}
          />
        }
      />

      <VerificationStats documents={documents} />

      <AdminDataTable
        data={documents}
        columns={columns}
        searchPlaceholder={t('verification.search')}
        isLoading={isLoading}
        emptyMessage={t('verification.empty')}
      />
    </div>
  );
}
