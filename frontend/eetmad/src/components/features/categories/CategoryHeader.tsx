'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Package, TrendingUp, Users } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface CategoryHeaderProps {
  category: Category;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  const locale = useLocale();
  const t = useTranslations('pages.categories');
  const categoryName = locale === 'ar' ? category.nameAr : category.nameEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 rounded-3xl border-2 p-8"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            {category.icon ? (
              <span className="text-4xl">{category.icon}</span>
            ) : (
              <Package className="h-10 w-10" style={{ color: cssVars.primary.DEFAULT }} />
            )}
          </div>
          <div>
            <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
              {categoryName}
            </h1>
            {category.description && (
              <p className="text-lg" style={{ color: cssVars.neutral.textSecondary }}>
                {category.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {category.requestsCount !== undefined && (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <TrendingUp className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.requestsCount} {t('requests') || 'requests'}
              </span>
            </div>
          )}
          {category.suppliersCount !== undefined && (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <Users className="h-5 w-5" style={{ color: cssVars.primary.DEFAULT }} />
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.suppliersCount} {t('suppliers') || 'suppliers'}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
