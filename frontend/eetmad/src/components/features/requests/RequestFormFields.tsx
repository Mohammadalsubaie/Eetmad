'use client';

import type { Category } from '@/lib/types/category.types';
import type { CreateRequestInput } from '@/lib/types/request.types';
import { cssVars } from '@/styles/theme';
import { DollarSign } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface RequestFormFieldsProps {
  formData: CreateRequestInput;
  categories: Category[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
}

export default function RequestFormFields({
  formData,
  categories,
  onChange,
}: RequestFormFieldsProps) {
  const t = useTranslations('pages.requests');

  return (
    <>
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.title')} *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.titlePlaceholder')}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.description')} *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.descriptionPlaceholder')}
        />
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="categoryId"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.category')} *
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={onChange}
          required
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
        >
          <option value="">{t('form.selectCategory')}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.nameEn} / {category.nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="budgetMin"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.budgetMin')}
          </label>
          <div className="relative">
            <DollarSign
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type="number"
              id="budgetMin"
              name="budgetMin"
              value={formData.budgetMin || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="w-full rounded-xl border-2 px-4 py-3 pe-12 text-sm"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
              placeholder={t('form.budgetMinPlaceholder')}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="budgetMax"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.budgetMax')}
          </label>
          <div className="relative">
            <DollarSign
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <input
              type="number"
              id="budgetMax"
              name="budgetMax"
              value={formData.budgetMax || ''}
              onChange={onChange}
              min="0"
              step="0.01"
              className="w-full rounded-xl border-2 px-4 py-3 pe-12 text-sm"
              style={{
                backgroundColor: cssVars.neutral.surface,
                borderColor: cssVars.neutral.border,
                color: cssVars.secondary.DEFAULT,
              }}
              placeholder={t('form.budgetMaxPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Duration and Deadline */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="expectedDuration"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.expectedDuration')} *
          </label>
          <input
            type="number"
            id="expectedDuration"
            name="expectedDuration"
            value={formData.expectedDuration}
            onChange={onChange}
            required
            min="1"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.expectedDurationPlaceholder')}
          />
        </div>
        <div>
          <label
            htmlFor="deadline"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.deadline')} *
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={onChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
          />
        </div>
      </div>

      {/* Preferred Start Date */}
      <div>
        <label
          htmlFor="preferredStartDate"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.preferredStartDate')}
        </label>
        <input
          type="date"
          id="preferredStartDate"
          name="preferredStartDate"
          value={formData.preferredStartDate || ''}
          onChange={onChange}
          min={new Date().toISOString().split('T')[0]}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
        />
      </div>

      {/* Location and On-Site Visit */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.location')}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={typeof formData.location === 'string' ? formData.location : ''}
            onChange={onChange}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.locationPlaceholder')}
          />
        </div>
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              id="requiresOnSiteVisit"
              name="requiresOnSiteVisit"
              checked={formData.requiresOnSiteVisit}
              onChange={onChange}
              className="h-5 w-5 cursor-pointer rounded border-2"
              style={{ accentColor: cssVars.primary.DEFAULT }}
            />
            <span className="text-sm font-semibold" style={{ color: cssVars.secondary.DEFAULT }}>
              {t('form.requiresOnSiteVisit')}
            </span>
          </label>
        </div>
      </div>
    </>
  );
}
