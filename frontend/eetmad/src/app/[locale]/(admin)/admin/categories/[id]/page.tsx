'use client';

import AdminActionButton from '@/components/shared/admin/AdminActionButton';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import { categoriesApi } from '@/lib/api/categories';
import type { Category } from '@/lib/types/category.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Edit,
  Eye,
  EyeOff,
  FileText,
  FolderTree,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const categoryId = params.id as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await categoriesApi.getById(categoryId);
        setCategory(data);
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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
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

      {/* Category Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl border-2 p-6 shadow-md"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
                color: cssVars.primary.DEFAULT,
              }}
            >
              {category.nameAr.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.nameAr}
              </h2>
              <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
                {category.nameEn}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {category.isActive ? (
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`,
                  color: cssVars.status.success,
                }}
              >
                <Eye className="h-3 w-3" />
                {t('categories.statuses.active')}
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
                  color: cssVars.neutral.textMuted,
                }}
              >
                <EyeOff className="h-3 w-3" />
                {t('categories.statuses.inactive')}
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="grid gap-6 border-t pt-6 sm:grid-cols-3"
          style={{ borderColor: cssVars.neutral.border }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
              }}
            >
              <Users className="h-6 w-6" style={{ color: cssVars.primary.DEFAULT }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.suppliersCount}
              </div>
              <div className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.suppliers')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.accent.primary} 10%, transparent)`,
              }}
            >
              <FileText className="h-6 w-6" style={{ color: cssVars.accent.primary }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.requestsCount}
              </div>
              <div className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.requests')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in srgb, ${cssVars.status.info} 10%, transparent)`,
              }}
            >
              <TrendingUp className="h-6 w-6" style={{ color: cssVars.status.info }} />
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.sortOrder}
              </div>
              <div className="text-xs" style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.sortOrder')}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Details Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Category Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <FolderTree className="h-5 w-5" />
            {t('categories.detail.sections.info')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.slug')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.slug}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.icon')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.icon}
              </span>
            </div>
            {category.parentId && (
              <div className="flex justify-between">
                <span style={{ color: cssVars.neutral.textSecondary }}>
                  {t('categories.detail.parent')}
                </span>
                <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                  {category.parentId}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.status')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {category.isActive
                  ? t('categories.statuses.active')
                  : t('categories.statuses.inactive')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <FileText className="h-5 w-5" />
            {t('categories.detail.sections.description')}
          </h3>
          <p style={{ color: cssVars.secondary.DEFAULT }}>{category.description}</p>
        </motion.div>

        {/* Timestamps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border-2 p-6 shadow-md"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
          }}
        >
          <h3
            className="mb-4 flex items-center gap-2 text-lg font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            <Calendar className="h-5 w-5" />
            {t('categories.detail.sections.timestamps')}
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.createdAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(category.createdAt).toLocaleDateString('en-US')}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: cssVars.neutral.textSecondary }}>
                {t('categories.detail.updatedAt')}
              </span>
              <span className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
                {new Date(category.updatedAt).toLocaleDateString('en-US')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
