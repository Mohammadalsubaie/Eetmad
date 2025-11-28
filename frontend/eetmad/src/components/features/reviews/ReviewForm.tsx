'use client';

import { Button, ErrorMessage } from '@/components/ui';
import Input from '@/components/ui/Input/Input';
import { useCreateReview, useUpdateReview } from '@/lib/hooks/useReviews';
import type { CreateReviewInput, Review, UpdateReviewInput } from '@/lib/types/review.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ReviewFormProps {
  review?: Review;
  projectId: string;
  reviewedId: string;
  reviewType: 'client_to_supplier' | 'supplier_to_client';
  onSuccess?: () => void;
}

export default function ReviewForm({
  review,
  projectId,
  reviewedId,
  reviewType,
  onSuccess,
}: ReviewFormProps) {
  const t = useTranslations('pages.reviews');
  const locale = useLocale();
  const router = useRouter();
  const isEdit = !!review;
  const { mutate: create, isLoading: isCreating, error: createError } = useCreateReview();
  const { mutate: update, isLoading: isUpdating, error: updateError } = useUpdateReview();
  const submitting = isCreating || isUpdating;
  const error = createError || updateError;

  const [formData, setFormData] = useState<CreateReviewInput>({
    projectId,
    reviewedId,
    reviewType,
    rating: review?.rating || 5,
    title: review?.title || '',
    comment: review?.comment || '',
    qualityRating: review?.qualityRating || undefined,
    communicationRating: review?.communicationRating || undefined,
    timelinessRating: review?.timelinessRating || undefined,
    professionalismRating: review?.professionalismRating || undefined,
  });

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }));
  };

  const handleSubRatingChange = (field: string, rating: number) => {
    setFormData((prev) => ({ ...prev, [field]: rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && review) {
        const updateData: UpdateReviewInput = {
          rating: formData.rating,
          title: formData.title,
          comment: formData.comment,
          qualityRating: formData.qualityRating,
          communicationRating: formData.communicationRating,
          timelinessRating: formData.timelinessRating,
          professionalismRating: formData.professionalismRating,
          response: review.response || null,
        };
        await update(review.id, updateData);
      } else {
        await create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/${locale}/reviews`);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  const renderStarRating = (
    rating: number,
    onRatingChange: (rating: number) => void,
    hovered: number | null,
    onHover: (rating: number | null) => void
  ) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= (hovered || rating);
          return (
            <button
              key={i}
              type="button"
              onClick={() => onRatingChange(starValue)}
              onMouseEnter={() => onHover(starValue)}
              onMouseLeave={() => onHover(null)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 ${isFilled ? 'fill-current' : ''}`}
                style={{
                  color: isFilled ? cssVars.status.warning : cssVars.neutral.border,
                }}
              />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Overall Rating */}
      <div>
        <label
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('overallRating')} *
        </label>
        {renderStarRating(formData.rating, handleRatingChange, hoveredRating, setHoveredRating)}
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('title')} *
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full"
          placeholder={t('titlePlaceholder')}
        />
      </div>

      {/* Comment */}
      <div>
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('comment')} *
        </label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('commentPlaceholder')}
        />
      </div>

      {/* Sub-ratings */}
      <div>
        <label
          className="mb-3 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('detailedRatings')} ({t('optional')})
        </label>
        <div className="space-y-4">
          <div>
            <label
              className="mb-2 block text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('quality')}
            </label>
            {renderStarRating(
              formData.qualityRating || 0,
              (rating) => handleSubRatingChange('qualityRating', rating),
              null,
              () => {}
            )}
          </div>
          <div>
            <label
              className="mb-2 block text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('communication')}
            </label>
            {renderStarRating(
              formData.communicationRating || 0,
              (rating) => handleSubRatingChange('communicationRating', rating),
              null,
              () => {}
            )}
          </div>
          <div>
            <label
              className="mb-2 block text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('timeliness')}
            </label>
            {renderStarRating(
              formData.timelinessRating || 0,
              (rating) => handleSubRatingChange('timelinessRating', rating),
              null,
              () => {}
            )}
          </div>
          <div>
            <label
              className="mb-2 block text-xs font-semibold"
              style={{ color: cssVars.neutral.textMuted }}
            >
              {t('professionalism')}
            </label>
            {renderStarRating(
              formData.professionalismRating || 0,
              (rating) => handleSubRatingChange('professionalismRating', rating),
              null,
              () => {}
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
          style={{
            borderColor: cssVars.neutral.border,
            color: cssVars.neutral.textSecondary,
          }}
        >
          {t('cancel')}
        </Button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {submitting ? t('submitting') : isEdit ? t('update') : t('submit')}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
