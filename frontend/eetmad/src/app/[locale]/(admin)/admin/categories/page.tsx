'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminDataTable from '@/components/shared/admin/AdminDataTable';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { useCategories } from '@/lib/hooks/useCategories';
import { FolderTree, Plus } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { useCategoriesTableColumns } from '@/components/features/admin/CategoriesTableColumns';

export default function CategoriesManagementPage() {
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { data: categories, isLoading } = useCategories();
  const columns = useCategoriesTableColumns();

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('categories.title') },
        ]}
        className="mb-6"
      />

      <AdminPageHeader
        title={t('categories.title')}
        description={t('categories.description')}
        icon={FolderTree}
        action={
          <AdminActionButton
            label={t('categories.actions.addCategory')}
            icon={Plus}
            variant="primary"
          />
        }
      />

      <AdminDataTable
        data={categories}
        columns={columns}
        searchPlaceholder={t('categories.search')}
        isLoading={isLoading}
        emptyMessage={t('categories.empty')}
      />
    </div>
  );
}
