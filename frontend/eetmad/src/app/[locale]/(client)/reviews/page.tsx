'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import ReviewsList from '@/components/features/reviews/ReviewsList';
import { Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function ReviewsPage() {
  const t = useTranslations('pages.reviews');
  const locale = useLocale();
  const router = useRouter();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <Star className="h-8 w-8" style={{ color: cssVars.status.warning }} />
            <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('title')}
            </h1>
          </div>
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => router.push(`/${locale}/reviews/new`)}
            className="flex items-center gap-2"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
            icon={Plus}
          >
            {t('newReview')}
          </Button>
        </motion.div>
      </div>

      {/* Reviews List */}
      <ReviewsList />
    </div>
  );
}

