'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { useCategories } from '@/lib/hooks/useCategories';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import CategoryHeader from '@/components/features/categories/CategoryHeader';
import SubcategoriesList from '@/components/features/categories/SubcategoriesList';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('pages.categories');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const router = useRouter();
  const { data: allCategories, isLoading, error } = useCategories();

  const { category, subcategories } = useMemo(() => {
    if (!allCategories || allCategories.length === 0) {
      return { category: null, subcategories: [] };
    }

    const foundCategory = allCategories.find((cat) => cat.slug === slug || cat.id === slug);

    if (!foundCategory) {
      return { category: null, subcategories: [] };
    }

    const subs = allCategories.filter((cat) => cat.parentId === foundCategory.id && cat.isActive);

    return { category: foundCategory, subcategories: subs };
  }, [allCategories, slug]);

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: cssVars.neutral.bg }}
      >
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/categories` }, { label: slug }]}
          className="mb-6"
        />
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-20" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/categories` }, { label: slug }]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            error={error?.message || t('notFound') || 'Category not found'}
            variant="banner"
          />
          <Link href="/categories">
            <Button variant="primary">{t('backToCategories') || 'Back to Categories'}</Button>
          </Link>
        </div>
      </div>
    );
  }

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

        <CategoryHeader category={category} />
        <SubcategoriesList subcategories={subcategories} />
      </div>
    </div>
  );
}
