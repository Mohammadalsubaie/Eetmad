'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Review } from '@/lib/types/review.types';

interface ReviewInfoSectionProps {
  review: Review;
}

export default function ReviewInfoSection({ review }: ReviewInfoSectionProps) {
  const t = useTranslations('admin');

  return (
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
          <span style={{ color: cssVars.neutral.textSecondary }}>{t('reviews.detail.status')}</span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t(`reviews.statuses.${review.status}`)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
