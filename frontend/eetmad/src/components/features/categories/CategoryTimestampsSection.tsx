'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface CategoryTimestampsSectionProps {
  category: Category;
}

export default function CategoryTimestampsSection({ category }: CategoryTimestampsSectionProps) {
  const t = useTranslations('admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
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
        {t('categories.detail.sections.timestamps')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('categories.detail.createdAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(category.createdAt).toLocaleDateString('en-US')}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('categories.detail.updatedAt')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {new Date(category.updatedAt).toLocaleDateString('en-US')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
