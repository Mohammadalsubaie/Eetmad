'use client';

import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { reviewsApi, type UpdateReviewInput } from '@/lib/api/reviews';
import type { Review } from '@/lib/types/review.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const reviewId = params.id as string;

  const [review, setReview] = useState<Review | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateReviewInput>({
    rating: 5,
    title: '',
    comment: '',
    qualityRating: undefined,
    communicationRating: undefined,
    timelinessRating: undefined,
    professionalismRating: undefined,
    response: undefined,
  });

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const data = await reviewsApi.getById(reviewId);
        setReview(data);
        setFormData({
          rating: data.rating,
          title: data.title,
          comment: data.comment,
          qualityRating: data.qualityRating || undefined,
          communicationRating: data.communicationRating || undefined,
          timelinessRating: data.timelinessRating || undefined,
          professionalismRating: data.professionalismRating || undefined,
          response: data.response || undefined,
        });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UpdateReviewInput) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev: UpdateReviewInput) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await reviewsApi.update(reviewId, formData);
      router.push(`/admin/reviews/${reviewId}`);
    } catch (err) {
      console.error('Failed to update review:', err);
      setError(t('reviews.edit.error'));
    } finally {
      setSubmitting(false);
    }
  };

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
          title={t('reviews.edit.title')}
          description={t('reviews.edit.description')}
          icon={Star}
        />
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {error && (
          <div
            className="mb-6 rounded-xl border-2 p-4"
            style={{
              borderColor: cssVars.status.error,
              backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
            }}
          >
            <p style={{ color: cssVars.status.error }}>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Overall Rating */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.rating')} *
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <motion.button
                  key={rating}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRatingChange('rating', rating)}
                  className="rounded-lg p-2 transition-all"
                  style={{
                    backgroundColor:
                      (formData.rating ?? 0) >= rating
                        ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                        : 'transparent',
                  }}
                >
                  <Star
                    className="h-6 w-6"
                    style={{
                      color:
                        (formData.rating ?? 0) >= rating
                          ? cssVars.status.warning
                          : cssVars.neutral.border,
                      fill: (formData.rating ?? 0) >= rating ? cssVars.status.warning : 'none',
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.title')} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Comment */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.comment')} *
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Sub-ratings */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('reviews.form.qualityRating')}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange('qualityRating', rating)}
                    className="rounded-lg p-1 transition-all"
                  >
                    <Star
                      className="h-4 w-4"
                      style={{
                        color:
                          (formData.qualityRating || 0) >= rating
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill:
                          (formData.qualityRating || 0) >= rating ? cssVars.status.warning : 'none',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('reviews.form.communicationRating')}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange('communicationRating', rating)}
                    className="rounded-lg p-1 transition-all"
                  >
                    <Star
                      className="h-4 w-4"
                      style={{
                        color:
                          (formData.communicationRating || 0) >= rating
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill:
                          (formData.communicationRating || 0) >= rating
                            ? cssVars.status.warning
                            : 'none',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('reviews.form.timelinessRating')}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange('timelinessRating', rating)}
                    className="rounded-lg p-1 transition-all"
                  >
                    <Star
                      className="h-4 w-4"
                      style={{
                        color:
                          (formData.timelinessRating || 0) >= rating
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill:
                          (formData.timelinessRating || 0) >= rating
                            ? cssVars.status.warning
                            : 'none',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-semibold"
                style={{ color: cssVars.secondary.DEFAULT }}
              >
                {t('reviews.form.professionalismRating')}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRatingChange('professionalismRating', rating)}
                    className="rounded-lg p-1 transition-all"
                  >
                    <Star
                      className="h-4 w-4"
                      style={{
                        color:
                          (formData.professionalismRating || 0) >= rating
                            ? cssVars.status.warning
                            : cssVars.neutral.border,
                        fill:
                          (formData.professionalismRating || 0) >= rating
                            ? cssVars.status.warning
                            : 'none',
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Response */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.response')}
            </label>
            <textarea
              name="response"
              value={formData.response || ''}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="rounded-xl px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
              color: cssVars.neutral.textSecondary,
            }}
          >
            {t('common.cancel')}
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Save className="h-4 w-4" />
            {submitting ? t('common.saving') : t('common.save')}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
