'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ArrowRight, Package, TrendingUp } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface CategoryCardProps {
  category: Category;
  subcategories: Category[];
  index: number;
  onCategoryClick: (category: Category) => void;
}

export default function CategoryCard({
  category,
  subcategories,
  index,
  onCategoryClick,
}: CategoryCardProps) {
  const locale = useLocale();
  const t = useTranslations('pages.categories');
  const categoryName = locale === 'ar' ? category.nameAr : category.nameEn;

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => onCategoryClick(category)}
      className="group cursor-pointer overflow-hidden rounded-3xl border-2 shadow-lg transition-all hover:shadow-2xl"
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
            }}
          >
            {category.icon ? (
              <span className="text-2xl">{category.icon}</span>
            ) : (
              <Package className="h-7 w-7" style={{ color: cssVars.primary.DEFAULT }} />
            )}
          </div>
          <ArrowRight
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            style={{ color: cssVars.primary.DEFAULT }}
          />
        </div>

        <h3 className="mb-2 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {categoryName}
        </h3>

        {category.description && (
          <p className="mb-4 line-clamp-2 text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {category.description}
          </p>
        )}

        <div className="flex items-center gap-4">
          {category.requestsCount !== undefined && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
              <span
                className="text-sm font-semibold"
                style={{ color: cssVars.neutral.textSecondary }}
              >
                {category.requestsCount} {t('requests') || 'requests'}
              </span>
            </div>
          )}
          {subcategories.length > 0 && (
            <span className="text-sm font-semibold" style={{ color: cssVars.primary.DEFAULT }}>
              {subcategories.length} {t('subcategories') || 'subcategories'}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
