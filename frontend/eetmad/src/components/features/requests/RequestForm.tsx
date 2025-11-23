'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cssVars } from '@/styles/theme';
import type { Request, CreateRequestInput } from '@/lib/types/request.types';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useCreateRequest, useUpdateRequest } from '@/lib/hooks/useRequestMutations';
import { useCategories } from '@/lib/hooks/useCategories';
import RequestFormFields from './RequestFormFields';

interface RequestFormProps {
  request?: Request;
  onSuccess?: () => void;
}

export default function RequestForm({ request, onSuccess }: RequestFormProps) {
  const t = useTranslations('pages.requests');
  const router = useRouter();
  const isEdit = !!request;

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { create, isLoading: isCreating, error: createError } = useCreateRequest();
  const { update, isLoading: isUpdating, error: updateError } = useUpdateRequest();
  const submitting = isCreating || isUpdating;
  const error = createError || updateError;

  const getDefaultDeadline = () => {
    if (request?.deadline) {
      return new Date(request.deadline).toISOString().split('T')[0];
    }
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 30);
    return defaultDate.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<CreateRequestInput>({
    title: request?.title || '',
    description: request?.description || '',
    categoryId: request?.categoryId || '',
    budgetMin: request?.budgetMin || undefined,
    budgetMax: request?.budgetMax || undefined,
    expectedDuration: request?.expectedDuration || 30,
    deadline: getDefaultDeadline(),
    preferredStartDate: request?.preferredStartDate
      ? new Date(request.preferredStartDate).toISOString().split('T')[0]
      : undefined,
    requiresOnSiteVisit: request?.requiresOnSiteVisit || false,
    location: request?.location || undefined,
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

    try {
      if (isEdit && request) {
        await update(request.id, formData);
      } else {
        await create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/requests/my-requests');
      }
    } catch {
      // Error handled by hook
    }
  };

  if (categoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}
      <RequestFormFields formData={formData} categories={categories} onChange={handleChange} />

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
