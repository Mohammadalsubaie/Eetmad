'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Review } from '@/lib/types/review.types';

interface ReviewResponseSectionProps {
  review: Review;
}

export default function ReviewResponseSection({ review }: ReviewResponseSectionProps) {
  const t = useTranslations('admin');

  if (!review.response) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border-2 border-l-4 p-6 shadow-md"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
        borderLeftColor: cssVars.primary.DEFAULT,
      }}
    >
      <h3
        className="mb-4 flex items-center gap-2 text-lg font-bold"
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        <MessageSquare className="h-5 w-5" />
        {t('reviews.detail.sections.response')}
      </h3>
      <p style={{ color: cssVars.secondary.DEFAULT }}>{review.response}</p>
    </motion.div>
  );
}

