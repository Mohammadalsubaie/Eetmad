'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign, Calendar } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { ProjectMilestone, CreateMilestoneInput, UpdateMilestoneInput } from '@/lib/types/project.types';
import { Button, ErrorMessage } from '@/components/ui';
import { useCreateMilestone, useUpdateMilestone } from '@/lib/hooks/useMilestones';
import Input from '@/components/ui/Input/Input';

interface MilestoneFormProps {
  milestone?: ProjectMilestone;
  projectId: string;
  onSuccess?: () => void;
}

export default function MilestoneForm({ milestone, projectId, onSuccess }: MilestoneFormProps) {
  const t = useTranslations('pages.projects');
  const router = useRouter();
  const isEdit = !!milestone;
  const { mutate: create, isLoading: isCreating, error: createError } = useCreateMilestone();
  const { mutate: update, isLoading: isUpdating, error: updateError } = useUpdateMilestone();
  const submitting = isCreating || isUpdating;
  const error = createError || updateError;

  const [formData, setFormData] = useState<CreateMilestoneInput>({
    projectId,
    title: milestone?.title || '',
    description: milestone?.description || '',
    amount: milestone?.amount || 0,
    dueDate: milestone?.dueDate
      ? new Date(milestone.dueDate).toISOString().split('T')[0]
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    deliverables: milestone?.deliverables || '',
    sortOrder: milestone?.sortOrder || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: CreateMilestoneInput) => ({
      ...prev,
      [name]: name === 'amount' || name === 'sortOrder' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && milestone) {
        const updateData: UpdateMilestoneInput = {
          title: formData.title,
          description: formData.description,
          amount: formData.amount,
          dueDate: formData.dueDate,
          deliverables: formData.deliverables,
          sortOrder: formData.sortOrder,
        };
        await update(milestone.id, updateData);
      } else {
        await create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/projects/${projectId}/milestones`);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('milestonesSection.form.title')} *
        </label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full"
          placeholder={t('milestonesSection.form.titlePlaceholder')}
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('milestonesSection.form.description')} *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('milestonesSection.form.descriptionPlaceholder')}
        />
      </div>

      {/* Amount and Due Date */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('milestonesSection.form.amount')} *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <Input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full pe-12"
              placeholder={t('milestonesSection.form.amountPlaceholder')}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="dueDate"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('milestonesSection.form.dueDate')} *
          </label>
          <div className="relative">
            <Calendar
              className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: cssVars.neutral.textMuted }}
            />
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full pe-12"
            />
          </div>
        </div>
      </div>

      {/* Deliverables */}
      <div>
        <label
          htmlFor="deliverables"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('milestonesSection.form.deliverables')} ({t('optional')})
        </label>
        <textarea
          id="deliverables"
          name="deliverables"
          value={formData.deliverables}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('milestonesSection.form.deliverablesPlaceholder')}
        />
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
          {t('cancel')}
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
            {submitting ? t('milestonesSection.form.saving') : isEdit ? t('milestonesSection.form.update') : t('milestonesSection.form.create')}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
