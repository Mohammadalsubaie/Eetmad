'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useReviews } from '@/lib/hooks/useReviews';
import { Star } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useReviewsTableColumns } from '@/components/features/admin/ReviewsTableColumns';

export default function ReviewsManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const router = useRouter();
  const { reviews, isLoading } = useReviews();
  const columns = useReviewsTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('reviews.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('reviews.title')}
        description={t('reviews.description')}
        icon={Star}
      />

      <AdminDataTable
        data={reviews}
        columns={columns}
        searchPlaceholder={t('reviews.search')}
        onRowClick={(review) => router.push(`/admin/reviews/${review.id}`)}
        isLoading={isLoading}
        emptyMessage={t('reviews.empty')}
      />
    </div>
  );
}
