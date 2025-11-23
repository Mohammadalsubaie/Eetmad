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
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="rounded-xl p-2 transition-all flex-shrink-0 self-start"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: cssVars.neutral.textSecondary }} />
        </motion.button>
        <div className="flex-1 min-w-0">
          <AdminPageHeader
            title={category.nameAr}
            description={category.nameEn}
            icon={FolderTree}
            action={
              <AdminActionButton
                label={t('categories.actions.edit')}
                icon={Edit}
                variant="primary"
                size="sm"
                onClick={() => router.push(`/admin/categories/${categoryId}/edit`)}
              />
            }
          />
        </div>
      </div>

      <CategoryOverviewCard category={category} />

      {/* Details Sections */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <CategoryInfoSection category={category} />
        <CategoryDescriptionSection category={category} />
        <CategoryTimestampsSection category={category} />
      </div>
    </div>
  );
}
