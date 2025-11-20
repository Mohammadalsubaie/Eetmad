'use client';

import ReviewEngagementSection from '@/components/features/reviews/ReviewEngagementSection';
import ReviewInfoSection from '@/components/features/reviews/ReviewInfoSection';
import ReviewOverviewCard from '@/components/features/reviews/ReviewOverviewCard';
import ReviewResponseSection from '@/components/features/reviews/ReviewResponseSection';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useReview } from '@/lib/hooks/useReviews';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const reviewId = params.id as string;

  const { review, isLoading, error } = useReview(reviewId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('reviews.title'), href: `/${locale}/admin/reviews` },
            { label: reviewId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('reviews.title'), href: `/${locale}/admin/reviews` },
            { label: reviewId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('reviews.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <AdminPageHeader
          title={t('reviews.detail.title')}
          description={t('reviews.detail.description')}
          icon={Star}
          action={
            <AdminActionButton
              label={t('reviews.actions.edit')}
              icon={Edit}
              variant="primary"
              onClick={() => router.push(`/admin/reviews/${reviewId}/edit`)}
            />
          }
        />
      </div>

      <ReviewOverviewCard review={review} />

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ReviewInfoSection review={review} />
        <ReviewEngagementSection review={review} />
        <ReviewResponseSection review={review} />
      </div>
    </div>
  );
}
