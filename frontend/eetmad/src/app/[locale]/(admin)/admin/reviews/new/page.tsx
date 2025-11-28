'use client';

import ReviewFormFields from '@/components/features/reviews/ReviewFormFields';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useCreateReview } from '@/lib/hooks/useReviews';
import type { CreateReviewInput } from '@/lib/types/review.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function CreateReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { mutate: createReview, isLoading, error: createError } = useCreateReview();

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
    try {
      await createReview(formData);
      router.push('/admin/reviews');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('reviews.title'), href: `/${locale}/admin/reviews` },
          { label: tPages('new.title') },
        ]}
        className="mb-6"
      />

      {/* Header */}
      <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:items-center sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex-shrink-0 rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft
            className="h-4 w-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textSecondary }}
          />
        </motion.button>
        <div className="min-w-0 flex-1">
          <AdminPageHeader
            title={t('reviews.create.title')}
            description={t('reviews.create.description')}
            icon={Star}
          />
        </div>
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-xl border-2 p-4 shadow-md sm:rounded-2xl sm:p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {createError && (
          <div className="mb-6">
            <ErrorMessage
              error={createError.message || t('reviews.create.error')}
              variant="inline"
            />
          </div>
        )}

        <ReviewFormFields
          formData={formData}
          onChange={handleChange}
          onRatingChange={handleRatingChange}
          showProjectFields={true}
        />

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:mt-8 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="w-full sm:w-auto"
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            icon={Save}
            iconPosition="left"
            className="w-full sm:w-auto"
          >
            {isLoading ? (
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
