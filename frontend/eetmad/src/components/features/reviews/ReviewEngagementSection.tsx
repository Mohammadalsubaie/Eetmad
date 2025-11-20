'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Review } from '@/lib/types/review.types';

interface ReviewEngagementSectionProps {
  review: Review;
}

export default function ReviewEngagementSection({ review }: ReviewEngagementSectionProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
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
        <Calendar className="h-5 w-5" />
        {t('reviews.detail.sections.engagement')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('reviews.detail.helpfulCount')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.status.success }}>
            {review.helpfulCount}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('reviews.detail.notHelpfulCount')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.status.error }}>
            {review.notHelpfulCount}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('reviews.detail.createdAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(review.createdAt).toLocaleDateString('en-US')}
          </span>
        </div>
        {review.respondedAt && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('reviews.detail.respondedAt')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {new Date(review.respondedAt).toLocaleDateString('en-US')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

