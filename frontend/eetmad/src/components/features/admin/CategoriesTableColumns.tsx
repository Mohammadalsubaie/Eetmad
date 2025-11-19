'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Category } from '@/lib/types/category.types';
import type { ColumnConfig } from '@/components/shared/admin/AdminDataTable';

export function useCategoriesTableColumns(): ColumnConfig<Category>[] {
  const t = useTranslations('admin');

  return [
    {
      key: 'nameAr',
      header: t('categories.table.name'),
      render: (category: Category) => (
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-bold"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 15%, transparent)`,
              color: cssVars.primary.DEFAULT,
            }}
          >
            {category.nameAr.charAt(0)}
          </div>
          <div>
            <div className="font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {category.nameAr}
            </div>
            <div className="text-xs" style={{ color: cssVars.neutral.textMuted }}>
              {category.nameEn}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      header: t('categories.table.slug'),
      render: (category: Category) => (
        <span style={{ color: cssVars.neutral.textSecondary }}>{category.slug}</span>
      ),
    },
    {
      key: 'sortOrder',
      header: t('categories.table.order'),
      render: (category: Category) => (
        <span className="font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {category.sortOrder}
        </span>
      ),
    },
    {
      key: 'isActive',
      header: t('categories.table.status'),
      render: (category: Category) => (
        <span
          className="inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-bold"
          style={{
            backgroundColor: category.isActive
              ? `color-mix(in srgb, ${cssVars.status.success} 15%, transparent)`
              : `color-mix(in srgb, ${cssVars.neutral.textMuted} 15%, transparent)`,
            color: category.isActive ? cssVars.status.success : cssVars.neutral.textMuted,
          }}
        >
          {category.isActive ? (
            <>
              <Eye className="h-3 w-3" />
              {t('categories.statuses.active')}
            </>
          ) : (
            <>
              <EyeOff className="h-3 w-3" />
              {t('categories.statuses.inactive')}
            </>
          )}
        </span>
      ),
    },
    {
      key: 'actions',
      header: t('categories.table.actions'),
      render: () => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 10%, transparent)`,
            }}
          >
            <Edit className="h-4 w-4" style={{ color: cssVars.primary.DEFAULT }} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
            }}
          >
            <Trash2 className="h-4 w-4" style={{ color: cssVars.status.error }} />
          </button>
          <button
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg p-2 transition-all hover:bg-opacity-80"
            style={{
              backgroundColor: `color-mix(in srgb, ${cssVars.neutral.textMuted} 10%, transparent)`,
            }}
          >
            <ChevronRight className="h-4 w-4" style={{ color: cssVars.neutral.textMuted }} />
          </button>
        </div>
      ),
    },
  ];
}

