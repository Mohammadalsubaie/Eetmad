'use client';

import type { CreateCategoryInput, UpdateCategoryInput } from '@/lib/types/category.types';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';

interface CategoryFormFieldsProps {
  formData: UpdateCategoryInput | CreateCategoryInput;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function CategoryFormFields({ formData, onChange }: CategoryFormFieldsProps) {
  const t = useTranslations('admin');

  return (
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
          onChange={onChange}
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
          onChange={onChange}
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
          value={formData.description || ''}
          onChange={onChange}
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
          value={formData.icon || 'folder'}
          onChange={onChange}
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
          value={formData.sortOrder || 0}
          onChange={onChange}
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
          checked={formData.isActive !== undefined ? formData.isActive : true}
          onChange={onChange}
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
  );
}
