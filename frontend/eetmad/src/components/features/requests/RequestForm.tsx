'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import { categoriesApi } from '@/lib/api/categories';
import type { Request, CreateRequestInput } from '@/lib/types/request.types';
import type { Category } from '@/lib/types/category.types';
import { Button } from '@/components/ui/Button';

interface RequestFormProps {
  request?: Request;
  onSuccess?: () => void;
}

export default function RequestForm({ request, onSuccess }: RequestFormProps) {
  const t = useTranslations('pages.requests');
  const router = useRouter();
  const isEdit = !!request;

  const [categories, setCategories] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateRequestInput>({
    title: request?.title || '',
    description: request?.description || '',
    categoryId: request?.categoryId || '',
    budgetMin: request?.budgetMin || undefined,
    budgetMax: request?.budgetMax || undefined,
    expectedDuration: request?.expectedDuration || 30,
    deadline: request?.deadline
      ? new Date(request.deadline).toISOString().split('T')[0]
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    preferredStartDate: request?.preferredStartDate
      ? new Date(request.preferredStartDate).toISOString().split('T')[0]
      : undefined,
    requiresOnSiteVisit: request?.requiresOnSiteVisit || false,
    location: request?.location || undefined,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoriesApi.getAll();
      setCategories(data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

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
    } else if (name === 'budgetMin' || name === 'budgetMax') {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : undefined,
      }));
    } else if (name === 'expectedDuration') {
      setFormData((prev) => ({
        ...prev,
        [name]: parseInt(value) || 30,
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
      if (isEdit && request) {
        await requestsApi.update(request.id, formData);
      } else {
        await requestsApi.create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/requests/my-requests');
      }
    } catch (err) {
      console.error('Failed to save request:', err);
      setError(t('saveError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div
          className="rounded-xl border-2 p-4"
          style={{
            borderColor: cssVars.status.error,
            backgroundColor: `color-mix(in srgb, ${cssVars.status.error} 10%, transparent)`,
          }}
        >
          <p style={{ color: cssVars.status.error }}>{error}</p>
        </div>
      )}

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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
              onChange={handleChange}
              min="0"
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
              onChange={handleChange}
              min="0"
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

      {/* Duration and Dates */}
      <div className="grid gap-4 md:grid-cols-3">
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
            onChange={handleChange}
            required
            min="1"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
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
            onChange={handleChange}
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
            onChange={handleChange}
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

      {/* On-site Visit */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="requiresOnSiteVisit"
          name="requiresOnSiteVisit"
          checked={formData.requiresOnSiteVisit}
          onChange={handleChange}
          className="h-5 w-5 rounded border-2"
          style={{
            borderColor: cssVars.neutral.border,
            accentColor: cssVars.primary.DEFAULT,
          }}
        />
        <label
          htmlFor="requiresOnSiteVisit"
          className="text-sm font-medium"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.requiresOnSiteVisit')}
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="flex-1"
          style={{
            borderColor: cssVars.neutral.border,
            color: cssVars.neutral.textSecondary,
          }}
        >
          {t('form.cancel')}
        </Button>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
            style={{
              background: cssVars.gradient.gold,
              color: cssVars.secondary.DEFAULT,
            }}
          >
            {submitting ? t('form.saving') : isEdit ? t('form.update') : t('form.create')}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
