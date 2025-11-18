'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { categoriesApi } from '@/lib/api/categories';
import type { Category } from '@/lib/types/category.types';
import { Package, ArrowRight, TrendingUp } from 'lucide-react';

export default function CategoriesPage() {
  const t = useTranslations('pages.categories');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoriesApi.getAll();
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError(t('error') || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/${category.slug || category.id}`);
  };

  const activeCategories = categories.filter((cat) => cat.isActive);
  const parentCategories = activeCategories.filter((cat) => !cat.parentId);

  return (
    <div
      className="relative min-h-screen py-20"
      style={{
        backgroundColor: cssVars.neutral.bg,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute start-0 top-1/4 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.accent.primary }}
        />
        <div
          className="absolute bottom-1/4 end-0 h-96 w-96 rounded-full blur-3xl"
          style={{ background: cssVars.primary.DEFAULT }}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            badge={t('badge') || 'Browse'}
            title={t('title')}
            subtitle={t('subtitle') || 'Explore all available categories'}
            variant="light"
            align={isRTL ? 'right' : 'left'}
            badgeColor="warm"
            className="max-w-3xl"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-lg font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
              {t('loading') || 'Loading categories...'}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div
            className="rounded-2xl border-2 p-8 text-center"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.status.error,
            }}
          >
            <p style={{ color: cssVars.status.error }}>{error}</p>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <>
            {parentCategories.length === 0 ? (
              <div
                className="rounded-2xl border-2 p-12 text-center"
                style={{
                  backgroundColor: cssVars.neutral.surface,
                  borderColor: cssVars.neutral.border,
                }}
              >
                <Package
                  className="mx-auto mb-4 h-16 w-16"
                  style={{ color: cssVars.neutral.textMuted }}
                />
                <p
                  className="text-lg font-semibold"
                  style={{ color: cssVars.neutral.textSecondary }}
                >
                  {t('noCategories') || 'No categories available at the moment.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {parentCategories.map((category, index) => {
                  const categoryName = locale === 'ar' ? category.nameAr : category.nameEn;
                  const subcategories = activeCategories.filter(
                    (cat) => cat.parentId === category.id
                  );

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      onClick={() => handleCategoryClick(category)}
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
                              <Package
                                className="h-7 w-7"
                                style={{ color: cssVars.primary.DEFAULT }}
                              />
                            )}
                          </div>
                          <ArrowRight
                            className="h-5 w-5 transition-transform group-hover:translate-x-1"
                            style={{ color: cssVars.primary.DEFAULT }}
                          />
                        </div>

                        <h3
                          className="mb-2 text-2xl font-bold"
                          style={{ color: cssVars.secondary.DEFAULT }}
                        >
                          {categoryName}
                        </h3>

                        {category.description && (
                          <p
                            className="mb-4 line-clamp-2 text-sm"
                            style={{ color: cssVars.neutral.textSecondary }}
                          >
                            {category.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4">
                          {category.requestsCount !== undefined && (
                            <div className="flex items-center gap-2">
                              <TrendingUp
                                className="h-4 w-4"
                                style={{ color: cssVars.primary.DEFAULT }}
                              />
                              <span
                                className="text-sm font-semibold"
                                style={{ color: cssVars.neutral.textSecondary }}
                              >
                                {category.requestsCount} {t('requests') || 'requests'}
                              </span>
                            </div>
                          )}
                          {subcategories.length > 0 && (
                            <span
                              className="text-sm font-semibold"
                              style={{ color: cssVars.primary.DEFAULT }}
                            >
                              {subcategories.length} {t('subcategories') || 'subcategories'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
