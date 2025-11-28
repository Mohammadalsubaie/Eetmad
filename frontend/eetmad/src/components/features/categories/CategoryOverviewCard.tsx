'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, FileText, TrendingUp, Users } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Category } from '@/lib/types/category.types';

interface CategoryOverviewCardProps {
  category: Category;
}

export default function CategoryOverviewCard({ category }: CategoryOverviewCardProps) {
  const t = useTranslations('admin');

  return (
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
  );
}
