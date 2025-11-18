'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { reviewsApi } from '@/lib/api/reviews';
import type { Review } from '@/lib/types/review.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle, Edit, MessageSquare, Star, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const reviewId = params.id as string;

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const data = await reviewsApi.getById(reviewId);
        setReview(data);
      } catch (error) {
        console.error('Failed to fetch review:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reviewId) {
      fetchReview();
    }
  }, [reviewId]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.neutral.textSecondary }}>{t('reviews.loading')}</div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.status.error }}>{t('reviews.notFound')}</div>
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

      {/* Review Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`,
                color: cssVars.status.warning,
              }}
            >
              {review.rating}
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.title}
              </h2>
              <div className="mt-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5"
                    style={{
                      color: i < review.rating ? cssVars.status.warning : cssVars.neutral.border,
                      fill: i < review.rating ? cssVars.status.warning : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {review.isVerified ? (
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                  color: cssVars.status.success,
                }}
              >
                <CheckCircle className="h-3 w-3" />
                {t('reviews.verified')}
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
                  color: cssVars.neutral.textMuted,
                }}
              >
                <XCircle className="h-3 w-3" />
                {t('reviews.notVerified')}
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div
          className="mb-6 rounded-xl border-2 p-4"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <p style={{ color: cssVars.secondary.DEFAULT }}>{review.comment}</p>
        </div>

        {/* Sub-ratings */}
        {(review.qualityRating ||
          review.communicationRating ||
          review.timelinessRating ||
          review.professionalismRating) && (
          <div
            className="grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4"
            style={{ borderColor: cssVars.neutral.border }}
          >
            {review.qualityRating && (
              <div>
                <div
                  className="mb-2 text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('reviews.detail.qualityRating')}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        color:
                          i < review.qualityRating!
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill: i < review.qualityRating! ? cssVars.status.warning : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {review.communicationRating && (
              <div>
                <div
                  className="mb-2 text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('reviews.detail.communicationRating')}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        color:
                          i < review.communicationRating!
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill: i < review.communicationRating! ? cssVars.status.warning : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {review.timelinessRating && (
              <div>
                <div
                  className="mb-2 text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('reviews.detail.timelinessRating')}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        color:
                          i < review.timelinessRating!
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill: i < review.timelinessRating! ? cssVars.status.warning : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            {review.professionalismRating && (
              <div>
                <div
                  className="mb-2 text-xs font-semibold"
                  style={{ color: cssVars.neutral.textMuted }}
                >
                  {t('reviews.detail.professionalismRating')}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        color:
                          i < review.professionalismRating!
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill: i < review.professionalismRating! ? cssVars.status.warning : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Review Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <MessageSquare className="h-5 w-5" />
            {t('reviews.detail.sections.info')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.reviewType')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`reviews.types.${review.reviewType}`)}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.projectId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.projectId}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.reviewerId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.reviewerId}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.reviewedId')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {review.reviewedId}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.status')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {t(`reviews.statuses.${review.status}`)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Engagement & Timestamps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <Calendar className="h-5 w-5" />
            {t('reviews.detail.sections.engagement')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.helpfulCount')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.status.success }}>
                {review.helpfulCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.notHelpfulCount')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.status.error }}>
                {review.notHelpfulCount}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('reviews.detail.createdAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(review.createdAt).toLocaleDateString('en-US')}
              </span>
            </div>
            {review.respondedAt && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('reviews.detail.respondedAt')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {new Date(review.respondedAt).toLocaleDateString('en-US')}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Response */}
        {review.response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              borderLeftColor: cssVars.primary.DEFAULT,
            }}
          >
            <h3
              className="mb-4 flex items-center gap-2 text-lg font-bold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              <MessageSquare className="h-5 w-5" />
              {t('reviews.detail.sections.response')}
            </h3>
            <p style={{ color: cssVars.secondary.DEFAULT }}>{review.response}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
