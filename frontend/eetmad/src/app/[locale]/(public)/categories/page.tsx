'use client';

import { useMemo } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { SectionHeader, LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui';
import { useCategories } from '@/lib/hooks/useCategories';
import { Package } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import CategoryCard from '@/components/features/categories/CategoryCard';
import { Category } from '@/lib/types';
import { cssVars } from '@/styles/theme/cssVariables';

export default function CategoriesPage() {
  const t = useTranslations('pages.categories');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const { data: categories, isLoading, error } = useCategories();

  const handleCategoryClick = (category: Category) => {
    router.push(`/categories/${category.slug || category.id}`);
  };

  const { activeCategories, parentCategories } = useMemo(() => {
    const active = categories.filter((cat) => cat.isActive);
    const parents = active.filter((cat) => !cat.parentId);
    return { activeCategories: active, parentCategories: parents };
  }, [categories]);

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
        <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />
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

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && !isLoading && (
          <ErrorMessage
            error={error.message || t('error') || 'Failed to load categories'}
            variant="banner"
          />
        )}

        {!isLoading && !error && (
          <>
            {parentCategories.length === 0 ? (
              <EmptyState
                icon={Package}
                title={t('noCategories') || 'No categories available'}
                description={t('emptyState') || 'No categories available at the moment.'}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {parentCategories.map((category, index) => {
                  const subcategories = activeCategories.filter(
                    (cat) => cat.parentId === category.id
                  );
                  return (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      subcategories={subcategories}
                      index={index}
                      onCategoryClick={handleCategoryClick}
                    />
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
