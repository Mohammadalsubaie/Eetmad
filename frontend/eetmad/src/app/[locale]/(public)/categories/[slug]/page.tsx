'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import { categoriesApi } from '@/lib/api/categories';
import type { Category } from '@/lib/types/category.types';
import { Package, ArrowLeft, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('pages.categories');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const allCategories = await categoriesApi.getAll();
      const foundCategory = allCategories.find(
        (cat: Category) => cat.slug === slug || cat.id === slug
      );

      if (foundCategory) {
        setCategory(foundCategory);
        // Find subcategories
        const subs = allCategories.filter(
          (cat: Category) => cat.parentId === foundCategory.id && cat.isActive
        );
        setSubcategories(subs);
      } else {
        setError(t('notFound') || 'Category not found');
      }
    } catch (err) {
      console.error('Failed to fetch category:', err);
      setError(t('error') || 'Failed to load category');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: cssVars.neutral.bg }}
      >
        <div className="text-lg font-semibold" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading') || 'Loading...'}
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.status.error,
          }}
        >
          <p style={{ color: cssVars.status.error }}>
            {error || t('notFound') || 'Category not found'}
          </p>
          <Link
            href="/categories"
            className="mt-4 inline-block rounded-xl px-6 py-3 font-semibold"
            style={{
              backgroundColor: cssVars.primary.DEFAULT,
              color: cssVars.neutral.bg,
            }}
          >
            {t('backToCategories') || 'Back to Categories'}
          </Link>
        </div>
      </div>
    );
  }

  const categoryName = locale === 'ar' ? category.nameAr : category.nameEn;

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
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all hover:scale-105"
          style={{
            backgroundColor: cssVars.neutral.surface,
            color: cssVars.primary.DEFAULT,
          }}
        >
          <ArrowLeft className="h-5 w-5" />
          {t('back') || 'Back'}
        </motion.button>

        {/* Category Header */}
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
                <h1
                  className="mb-2 text-4xl font-bold"
                  style={{ color: cssVars.secondary.DEFAULT }}
                >
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

        {/* Subcategories */}
        {subcategories.length > 0 && (
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
                    <h3
                      className="mb-2 text-lg font-bold"
                      style={{ color: cssVars.secondary.DEFAULT }}
                    >
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
        )}
      </div>
    </div>
  );
}
