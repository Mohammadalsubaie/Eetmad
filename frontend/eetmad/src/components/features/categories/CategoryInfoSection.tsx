'use client';

import { motion } from 'framer-motion';
import { FolderTree } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface CategoryInfoSectionProps {
  category: Category;
}

export default function CategoryInfoSection({ category }: CategoryInfoSectionProps) {
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
        <FolderTree className="h-5 w-5" />
        {t('categories.detail.sections.info')}
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('categories.detail.slug')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {category.slug}
          </span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('categories.detail.icon')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {category.icon}
          </span>
        </div>
        {category.parentId && (
          <div className="flex justify-between">
            <span style={{ color: cssVars.neutral.textSecondary }}>
              {t('categories.detail.parent')}
            </span>
            <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {category.parentId}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span style={{ color: cssVars.neutral.textSecondary }}>
            {t('categories.detail.status')}
          </span>
          <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
            {category.isActive
              ? t('categories.statuses.active')
              : t('categories.statuses.inactive')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

