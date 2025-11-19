'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, Save, Star } from 'lucide-react';
import type { CreateReviewInput } from '@/lib/api/reviews';
import { useCreateReview } from '@/lib/hooks/useReviews';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import ReviewFormFields from '@/components/features/reviews/ReviewFormFields';

export default function CreateReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { createReview, isLoading, error: createError } = useCreateReview();

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
        {createError && (
          <div className="mb-6">
            <ErrorMessage error={createError.message || t('reviews.create.error')} variant="inline" />
          </div>
        )}

        <ReviewFormFields
          formData={formData}
          onChange={handleChange}
          onRatingChange={handleRatingChange}
          showProjectFields={true}
        />

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            icon={Save}
            iconPosition="left"
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
