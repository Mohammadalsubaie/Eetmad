'use client';

import { useTranslations } from 'next-intl';
import { useReviews, useReviewsByProject, useReviewsBySupplier } from '@/lib/hooks/useReviews';
import ReviewCard from './ReviewCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface ReviewsListProps {
  projectId?: string;
  supplierId?: string;
}

export default function ReviewsList({ projectId, supplierId }: ReviewsListProps) {
  const t = useTranslations('pages.reviews');
  const { data: reviews, isLoading, error } = projectId
    ? useReviewsByProject(projectId)
    : supplierId
      ? useReviewsBySupplier(supplierId)
      : useReviews();

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {reviews.length === 0 ? (
        <EmptyState
          title={t('noReviews')}
          description={t('noReviewsDescription')}
        />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}
