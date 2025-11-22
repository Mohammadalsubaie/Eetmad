'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Star } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import ReviewForm from '@/components/features/reviews/ReviewForm';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage } from '@/components/ui';

export default function NewReviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.reviews');
  const projectId = searchParams.get('projectId') || '1'; // Default for testing
  const reviewedId = searchParams.get('reviewedId') || 'supplier-1'; // Default for testing
  const reviewType = (searchParams.get('reviewType') as 'client_to_supplier' | 'supplier_to_client') || 'client_to_supplier';

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/reviews` },
          { label: t('newReview') },
        ]}
        className="mb-6"
      />

      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <Star className="h-8 w-8" style={{ color: cssVars.status.warning }} />
          <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('newReview')}
          </h1>
        </div>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('newReviewDescription')}
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <ReviewForm
          projectId={projectId}
          reviewedId={reviewedId}
          reviewType={reviewType}
          onSuccess={() => router.push(`/${locale}/reviews`)}
        />
      </div>
    </div>
  );
}

