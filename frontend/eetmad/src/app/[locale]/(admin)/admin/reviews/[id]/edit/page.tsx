'use client';

import ReviewFormFields from '@/components/features/reviews/ReviewFormFields';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import type { UpdateReviewInput } from '@/lib/types/review.types';
import { useReview, useUpdateReview } from '@/lib/hooks/useReviews';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditReviewPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const reviewId = params.id as string;

  const { data: review, isLoading: loading, error: fetchError } = useReview(reviewId);
  const { mutate: updateReview, isLoading: submitting, error: updateError } = useUpdateReview();

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
    if (review) {
      setFormData({
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        qualityRating: review.qualityRating || undefined,
        communicationRating: review.communicationRating || undefined,
        timelinessRating: review.timelinessRating || undefined,
        professionalismRating: review.professionalismRating || undefined,
        response: review.response || undefined,
      });
    }
  }, [review]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
    try {
      await updateReview(reviewId, formData);
      router.push(`/admin/reviews/${reviewId}`);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (loading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('reviews.title'), href: `/${locale}/admin/reviews` },
            { label: reviewId },
            { label: tPages('edit.title') },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (fetchError || !review) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('reviews.title'), href: `/${locale}/admin/reviews` },
            { label: reviewId },
            { label: tPages('edit.title') },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={fetchError?.message || t('reviews.notFound')} variant="banner" />
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
        {updateError && (
          <div className="mb-6">
            <ErrorMessage error={updateError.message || t('reviews.edit.error')} variant="inline" />
          </div>
        )}

        <ReviewFormFields
          formData={formData}
          onChange={handleChange}
          onRatingChange={handleRatingChange}
          showProjectFields={false}
        />

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            icon={Save}
            iconPosition="left"
          >
            {submitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {t('common.saving')}
              </>
            ) : (
              t('common.save')
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
