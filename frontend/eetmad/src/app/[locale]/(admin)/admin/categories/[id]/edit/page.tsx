'use client';

import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { categoriesApi } from '@/lib/api/categories';
import type { Category, UpdateCategoryInput } from '@/lib/types/category.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, FolderTree, Save } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const categoryId = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UpdateCategoryInput>({
    nameAr: '',
    nameEn: '',
    parentId: null,
    icon: 'folder',
    description: '',
    sortOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoriesApi.getById(categoryId);
        setCategory(data);
        setFormData({
          nameAr: data.nameAr,
          nameEn: data.nameEn,
          parentId: data.parentId,
          icon: data.icon,
          description: data.description,
          sortOrder: data.sortOrder,
          isActive: data.isActive,
        });
      } catch (error) {
        console.error('Failed to fetch category:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

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
    setSubmitting(true);
    setError(null);

    try {
      await categoriesApi.update(categoryId, formData);
      router.push(`/admin/categories/${categoryId}`);
    } catch (err) {
      console.error('Failed to update category:', err);
      setError(t('categories.edit.error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('categories.title'), href: `/${locale}/admin/categories` },
            // TODO: Replace with actual data for id
            { label: '{id}' },
            { label: tPages('edit.title') },
          ]}
          className="mb-6"
        />

        <div style={{ color: cssVars.neutral.textSecondary }}>{t('categories.loading')}</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div style={{ color: cssVars.status.error }}>{t('categories.notFound')}</div>
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
          title={t('categories.edit.title')}
          description={t('categories.edit.description')}
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
        {error && (
          <div
            className="mb-6 rounded-xl border-2 p-4"
            style={{
              borderColor: cssVars.status.error,
              backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
            }}
          >
            <p style={{ color: cssVars.status.error }}>{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {/* Name Arabic */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.nameAr')} *
            </label>
            <input
              type="text"
              name="nameAr"
              value={formData.nameAr}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Name English */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.nameEn')} *
            </label>
            <input
              type="text"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleChange}
              required
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.description')}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Icon */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.icon')}
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Sort Order */}
          <div>
            <label
              className="mb-2 block text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.sortOrder')}
            </label>
            <input
              type="number"
              name="sortOrder"
              value={formData.sortOrder}
              onChange={handleChange}
              min="0"
              className="w-full rounded-xl border-2 px-4 py-3 outline-none transition-all focus:border-opacity-100"
              style={{
                backgroundColor: cssVars.neutral.bg,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="h-5 w-5 rounded"
            />
            <label
              htmlFor="isActive"
              className="text-sm font-semibold"
              style={{ color: cssVars.secondary.DEFAULT }}
            >
              {t('categories.form.isActive')}
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="rounded-xl px-6 py-3 font-semibold transition-all"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
              color: cssVars.neutral.textSecondary,
            }}
          >
            {t('common.cancel')}
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={submitting}
            className="flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            <Save className="h-4 w-4" />
            {submitting ? t('common.saving') : t('common.save')}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
