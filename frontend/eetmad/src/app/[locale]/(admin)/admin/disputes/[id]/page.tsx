'use client';

import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function DisputeDetailPage() {
  const params = useParams();
  const t = useTranslations('pages');
  const locale = useLocale();
  const disputeId = params.id as string;

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: t('admin.title'), href: `/${locale}/admin` },
          { label: t('disputes.title'), href: `/${locale}/admin/disputes` },
          // TODO: Replace with actual data for id
          { label: '{id}' },
        ]}
        className="mb-6"
      />

      <h1>{t('disputeDetails.title')}</h1>
      <p>
        {t('disputeDetails.id')}: {disputeId}
      </p>
      {/* Dispute details will be implemented here */}
    </div>
  );
}
