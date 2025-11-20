'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, FolderTree } from 'lucide-react';
import { useCategory } from '@/lib/hooks/useCategories';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import CategoryOverviewCard from '@/components/features/categories/CategoryOverviewCard';
import CategoryInfoSection from '@/components/features/categories/CategoryInfoSection';
import CategoryDescriptionSection from '@/components/features/categories/CategoryDescriptionSection';
import CategoryTimestampsSection from '@/components/features/categories/CategoryTimestampsSection';
import { cssVars } from '@/styles/theme/cssVariables';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const categoryId = params.id as string;

  const { data: category, isLoading, error } = useCategory(categoryId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
            { label: categoryId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
            { label: categoryId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('categories.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-5 w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <AdminPageHeader
          title={category.nameAr}
          description={category.nameEn}
          icon={FolderTree}
          action={
            <AdminActionButton
              label={t('categories.actions.edit')}
              icon={Edit}
              variant="primary"
              onClick={() => router.push(`/admin/categories/${categoryId}/edit`)}
            />
          }
        />
      </div>

      <CategoryOverviewCard category={category} />

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryInfoSection category={category} />
        <CategoryDescriptionSection category={category} />
        <CategoryTimestampsSection category={category} />
      </div>
    </div>
  );
}
