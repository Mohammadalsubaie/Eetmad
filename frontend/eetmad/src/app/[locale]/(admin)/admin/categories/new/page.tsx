'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import { ArrowLeft, FolderTree, Save } from 'lucide-react';
import type { CreateCategoryInput } from '@/lib/types/category.types';
import { useCreateCategory } from '@/lib/hooks/useCategories';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import CategoryFormFields from '@/components/features/categories/CategoryFormFields';

export default function CreateCategoryPage() {
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { createCategory, isLoading: submitting, error: createError } = useCreateCategory();

  const [formData, setFormData] = useState<CreateCategoryInput>({
    nameAr: '',
    nameEn: '',
    parentId: null,
    icon: 'folder',
    description: '',
    sortOrder: 0,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name === 'sortOrder') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else if (name === 'parentId') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? null : value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategory(formData);
      router.push('/admin/categories');
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
          { label: tPages('new.title') },
        ]}
        className="mb-6"
      />

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
          title={t('categories.create.title')}
          description={t('categories.create.description')}
          icon={FolderTree}
        />
      </div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        {createError && (
          <div className="mb-6">
            <ErrorMessage
              error={createError.message || t('categories.create.error')}
              variant="inline"
            />
          </div>
        )}

        <CategoryFormFields formData={formData} onChange={handleChange} />

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            icon={Save}
            iconPosition="left"
          >
            {submitting ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                {t('common.saving')}
              </>
            ) : (
              t('common.save')
            )}
          </Button>
        </div>
      </motion.form>
    </div>
  );
}
