'use client';

import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import type { Review } from '@/lib/types/review.types';
import { cssVars } from '@/styles/theme';
import { Calendar, CheckCircle, Eye, Star, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReviewsManagementPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Mock data
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      projectId: 'project-1',
      reviewerId: 'client-1',
      reviewedId: 'supplier-1',
      rating: 5,
      reviewType: 'client_to_supplier',
      title: 'عمل ممتاز',
      comment: 'عمل ممتاز ومحترف جداً',
      qualityRating: 5,
      communicationRating: 5,
      timelinessRating: 5,
      professionalismRating: 5,
      isVerified: true,
      status: 'published',
      response: null,
      respondedAt: null,
      helpfulCount: 12,
      notHelpfulCount: 0,
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z',
    },
    {
      id: '2',
      projectId: 'project-2',
      reviewerId: 'client-2',
      reviewedId: 'supplier-2',
      rating: 4,
      reviewType: 'client_to_supplier',
      title: 'جيد جداً',
      comment: 'جيد جداً لكن كان هناك بعض التأخير',
      qualityRating: 5,
      communicationRating: 4,
      timelinessRating: 3,
      professionalismRating: 4,
      isVerified: true,
      status: 'published',
      response: null,
      respondedAt: null,
      helpfulCount: 8,
      notHelpfulCount: 1,
      createdAt: '2024-03-14T09:00:00Z',
      updatedAt: '2024-03-14T09:00:00Z',
    },
  ]);

  const columns = [
    {
      key: 'rating',
      header: t('reviews.table.rating'),
      render: (review: Review) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
              color: cssVars.status.warning,
            }}
          >
            {review.rating}
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                style={{
                  color: i < review.rating ? cssVars.status.warning : cssVars.neutral.border,
                  fill: i < review.rating ? cssVars.status.warning : 'none',
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: 'comment',
      header: t('reviews.table.comment'),
      render: (review: Review) => (
        <div>
          <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {review.comment.substring(0, 50)}...
          </div>
          <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
            مشروع #{review.projectId.slice(0, 8)}
          </div>
        </div>
      ),
    },
    {
      key: 'helpfulCount',
      header: t('reviews.table.helpful'),
      render: (review: Review) => (
        <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {review.helpfulCount}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: t('reviews.table.date'),
      render: (review: Review) => (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {new Date(review.createdAt).toLocaleDateString('ar-SA')}
          </span>
        </div>
      ),
    },
    {
      key: 'isVerified',
      header: t('reviews.table.verified'),
      render: (review: Review) => (
        <div className="flex items-center gap-1">
          {review.isVerified ? (
            <CheckCircle className="h-5 w-5" style={{ color: cssVars.status.success }} />
          ) : (
            <XCircle className="h-5 w-5" style={{ color: cssVars.status.error }} />
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      header: t('reviews.table.actions'),
      render: (review: Review) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/admin/reviews/${review.id}`);
          }}
          className="rounded-lg p-2 transition-all hover:bg-opacity-80"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
          }}
        >
          <Eye className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
        </button>
      ),
    },
  ];

  return (
    <div>
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
        isLoading={loading}
        emptyMessage={t('reviews.empty')}
      />
    </div>
  );
}
