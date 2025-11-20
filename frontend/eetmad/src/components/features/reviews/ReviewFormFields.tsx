'use client';

import type { CreateReviewInput, UpdateReviewInput } from '@/lib/api/reviews';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import RatingInput from './RatingInput';

interface ReviewFormFieldsProps {
  formData: CreateReviewInput | UpdateReviewInput;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onRatingChange: (name: string, value: number) => void;
  showProjectFields?: boolean;
}

export default function ReviewFormFields({
  formData,
  onChange,
  onRatingChange,
  showProjectFields = true,
}: ReviewFormFieldsProps) {
  const t = useTranslations('admin');

  return (
    <div className="space-y-6">
      {showProjectFields && 'projectId' in formData && (
        <>
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
              onChange={onChange}
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
              onChange={onChange}
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
              value={'reviewType' in formData ? formData.reviewType : ''}
              onChange={onChange}
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
        </>
      )}

      {/* Overall Rating */}
      <RatingInput
        value={formData.rating ?? 0}
        onChange={(value) => onRatingChange('rating', value)}
        size="md"
        label={`${t('reviews.form.rating')} *`}
      />

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
          value={formData.title || ''}
          onChange={onChange}
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
          value={formData.comment || ''}
          onChange={onChange}
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
        <RatingInput
          value={formData.qualityRating || 0}
          onChange={(value) => onRatingChange('qualityRating', value)}
          size="sm"
          label={t('reviews.form.qualityRating')}
        />
        <RatingInput
          value={formData.communicationRating || 0}
          onChange={(value) => onRatingChange('communicationRating', value)}
          size="sm"
          label={t('reviews.form.communicationRating')}
        />
        <RatingInput
          value={formData.timelinessRating || 0}
          onChange={(value) => onRatingChange('timelinessRating', value)}
          size="sm"
          label={t('reviews.form.timelinessRating')}
        />
        <RatingInput
          value={formData.professionalismRating || 0}
          onChange={(value) => onRatingChange('professionalismRating', value)}
          size="sm"
          label={t('reviews.form.professionalismRating')}
        />
      </div>

      {/* Response (only for edit) */}
      {'response' in formData && (
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
            onChange={onChange}
            rows={4}
            className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
            style={{
              backgroundColor: cssVars.neutral.bg,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>
      )}
    </div>
  );
}
