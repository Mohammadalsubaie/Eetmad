'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface SubcategoriesListProps {
  subcategories: Category[];
}

export default function SubcategoriesList({ subcategories }: SubcategoriesListProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.categories');

  if (subcategories.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
        {t('subcategories') || 'Subcategories'}
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subcategories.map((subcat, index) => {
          const subcatName = locale === 'ar' ? subcat.nameAr : subcat.nameEn;
          return (
            <motion.div
              key={subcat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => router.push(`/categories/${subcat.slug || subcat.id}`)}
              className="cursor-pointer rounded-2xl border-2 p-4 transition-all hover:shadow-lg"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
              }}
            >
              <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {subcatName}
              </h3>
              {subcat.description && (
                <p
                  className="line-clamp-2 text-sm"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {subcat.description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
