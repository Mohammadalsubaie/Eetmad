'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type {
  Contract,
  CreateContractInput,
  UpdateContractInput,
} from '@/lib/types/contract.types';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useCreateContract, useUpdateContract } from '@/lib/hooks/useContracts';
import Input from '@/components/ui/Input/Input';

interface ContractFormProps {
  contract?: Contract;
  projectId?: string;
  onSuccess?: () => void;
}

export default function ContractForm({ contract, projectId, onSuccess }: ContractFormProps) {
  const t = useTranslations('pages.contracts');
  const locale = useLocale();
  const router = useRouter();
  const isEdit = !!contract;

  const { mutate: create, isLoading: isCreating, error: createError } = useCreateContract();
  const { mutate: update, isLoading: isUpdating, error: updateError } = useUpdateContract();
  const submitting = isCreating || isUpdating;
  const error = createError || updateError;

  const [formData, setFormData] = useState<CreateContractInput>({
    projectId: projectId || contract?.projectId || '',
    contractText: contract?.contractText || '',
    termsAndConditions: contract?.termsAndConditions || '',
    paymentTerms: contract?.paymentTerms || '',
    deliverables: contract?.deliverables || '',
    warrantyTerms: contract?.warrantyTerms || undefined,
    templateUsed: contract?.templateUsed || undefined,
    customClauses: contract?.customClauses || undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEdit && contract) {
        const updateData: UpdateContractInput = {
          contractText: formData.contractText,
          termsAndConditions: formData.termsAndConditions,
          paymentTerms: formData.paymentTerms,
          deliverables: formData.deliverables,
          warrantyTerms: formData.warrantyTerms,
          customClauses: formData.customClauses,
        };
        await update(contract.id, updateData);
      } else {
        await create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/${locale}/contracts`);
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Contract Text */}
      <div>
        <label
          htmlFor="contractText"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.contractText')} *
        </label>
        <textarea
          id="contractText"
          name="contractText"
          value={formData.contractText}
          onChange={handleChange}
          required
          rows={8}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.contractTextPlaceholder')}
        />
      </div>

      {/* Terms and Conditions */}
      <div>
        <label
          htmlFor="termsAndConditions"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.termsAndConditions')} *
        </label>
        <textarea
          id="termsAndConditions"
          name="termsAndConditions"
          value={formData.termsAndConditions}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.termsAndConditionsPlaceholder')}
        />
      </div>

      {/* Payment Terms */}
      <div>
        <label
          htmlFor="paymentTerms"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.paymentTerms')} *
        </label>
        <textarea
          id="paymentTerms"
          name="paymentTerms"
          value={formData.paymentTerms}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.paymentTermsPlaceholder')}
        />
      </div>

      {/* Deliverables */}
      <div>
        <label
          htmlFor="deliverables"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.deliverables')} *
        </label>
        <textarea
          id="deliverables"
          name="deliverables"
          value={formData.deliverables}
          onChange={handleChange}
          required
          rows={4}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.deliverablesPlaceholder')}
        />
      </div>

      {/* Warranty Terms */}
      <div>
        <label
          htmlFor="warrantyTerms"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.warrantyTerms')}
        </label>
        <textarea
          id="warrantyTerms"
          name="warrantyTerms"
          value={formData.warrantyTerms || ''}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.warrantyTermsPlaceholder')}
        />
      </div>

      {/* Template Used */}
      {!isEdit && (
        <div>
          <label
            htmlFor="templateUsed"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.templateUsed')}
          </label>
          <Input
            type="text"
            id="templateUsed"
            name="templateUsed"
            value={formData.templateUsed || ''}
            onChange={handleChange}
            icon={FileText}
            className="w-full"
            placeholder={t('form.templateUsedPlaceholder')}
          />
        </div>
      )}

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
