'use client';

import type { Category } from '@/lib/types/category.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CategoryDescriptionSectionProps {
  category: Category;
}

export default function CategoryDescriptionSection({ category }: CategoryDescriptionSectionProps) {
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
        <FileText className="h-5 w-5" />
        {t('categories.detail.sections.description')}
      </h3>
      <p style={{ color: cssVars.secondary.DEFAULT }}>{category.description}</p>
    </motion.div>
  );
}
