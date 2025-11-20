'use client';

import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { useTranslations, useLocale } from 'next-intl';
import type { Supplier } from '@/lib/types/supplier.types';

interface SupplierCategoriesProps {
  supplier: Supplier;
}

export default function SupplierCategories({ supplier }: SupplierCategoriesProps) {
  const t = useTranslations('pages.suppliers');
  const locale = useLocale();

  if (!supplier.categories || supplier.categories.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('categories') || 'Categories'}
      </h2>
      <div className="flex flex-wrap gap-3">
        {supplier.categories.map((cat) => {
          const catName =
            locale === 'ar' ? cat.category?.nameAr : cat.category?.nameEn || 'Category';
          return (
            <span
              key={cat.id}
              className="rounded-xl px-4 py-2 font-semibold"
              style={{
                backgroundColor: cat.isPrimary
                  ? cssVars.primary.DEFAULT
                  : `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
                color: cat.isPrimary ? cssVars.neutral.bg : cssVars.primary.DEFAULT,
              }}
            >
              {catName}
              {cat.isPrimary && (
                <span className="ms-2 text-xs">({t('primary') || 'Primary'})</span>
              )}
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

