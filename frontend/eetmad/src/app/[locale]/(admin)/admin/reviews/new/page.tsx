'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, Save, Star } from 'lucide-react';
import type { CreateReviewInput } from '@/lib/api/reviews';
import { reviewsApi } from '@/lib/api/reviews';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';

export default function CreateReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('admin');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectId = searchParams.get('projectId') || '';
  const reviewedId = searchParams.get('reviewedId') || '';
  const reviewType =
    (searchParams.get('type') as 'client_to_supplier' | 'supplier_to_client') ||
    'client_to_supplier';

  const [formData, setFormData] = useState<CreateReviewInput>({
    projectId,
    reviewedId,
    reviewType,
    rating: 5,
    title: '',
    comment: '',
    qualityRating: undefined,
    communicationRating: undefined,
    timelinessRating: undefined,
    professionalismRating: undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await reviewsApi.create(formData);
      router.push('/admin/reviews');
    } catch (err) {
      console.error('Failed to create review:', err);
      setError(t('reviews.create.error'));
    } finally {
      setSubmitting(false);
    }
  };

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
          title={t('reviews.create.title')}
          description={t('reviews.create.description')}
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
          {/* Project ID */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.projectId')} *
            </label>
            <input
              type="text"
              name="projectId"
              value={formData.projectId}
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

          {/* Reviewed ID */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.reviewedId')} *
            </label>
            <input
              type="text"
              name="reviewedId"
              value={formData.reviewedId}
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

          {/* Review Type */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('reviews.form.reviewType')} *
            </label>
            <select
              name="reviewType"
              value={formData.reviewType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            >
              <option value="client_to_supplier">{t('reviews.types.client_to_supplier')}</option>
              <option value="supplier_to_client">{t('reviews.types.supplier_to_client')}</option>
            </select>
          </div>

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
                      formData.rating >= rating
                        ? `color-mix(in srgb, ${cssVars.status.warning} 15%, transparent)`
                        : 'transparent',
                  }}
                >
                  <Star
                    className="h-6 w-6"
                    style={{
                      color:
                        formData.rating >= rating ? cssVars.status.warning : cssVars.neutral.border,
                      fill: formData.rating >= rating ? cssVars.status.warning : 'none',
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
