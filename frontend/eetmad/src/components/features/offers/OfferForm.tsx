'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import type { Offer, CreateOfferInput } from '@/lib/types/offer.types';
import { Button, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useCreateOffer, useUpdateOffer } from '@/lib/hooks/useOfferMutations';
import { useRequest } from '@/lib/hooks/useRequests';
import OfferFormFields from './OfferFormFields';

interface OfferFormProps {
  offer?: Offer;
  requestId?: string;
  onSuccess?: () => void;
}

export default function OfferForm({ offer, requestId, onSuccess }: OfferFormProps) {
  const t = useTranslations('pages.offers');
  const router = useRouter();
  const isEdit = !!offer;

  const reqId = requestId || offer?.requestId || '';
  const { data: request, isLoading: requestLoading } = useRequest(reqId);
  const { create, isLoading: isCreating, error: createError } = useCreateOffer();
  const { update, isLoading: isUpdating, error: updateError } = useUpdateOffer();
  const submitting = isCreating || isUpdating;
  const error = createError || updateError;

  const [formData, setFormData] = useState<CreateOfferInput>({
    requestId: offer?.requestId || requestId || '',
    proposedPrice: offer?.proposedPrice || 0,
    estimatedDuration: offer?.estimatedDuration || 30,
    startDate: offer?.startDate
      ? new Date(offer.startDate).toISOString().split('T')[0]
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    technicalProposal: offer?.technicalProposal || '',
    deliverables: offer?.deliverables || '',
    paymentTerms: offer?.paymentTerms || '',
    warrantyPeriod: offer?.warrantyPeriod || undefined,
    warrantyDetails: offer?.warrantyDetails || undefined,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : 0,
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
      if (isEdit && offer) {
        await update(offer.id, formData);
      } else {
        await create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/offers');
      }
    } catch (err) {
      // Error handled by hook
    }
  };

  if (requestLoading && reqId) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <ErrorMessage error={error.message || String(error)} variant="inline" />}

      {/* Request ID (if not provided) */}
      {!requestId && !offer && (
        <div>
          <label
            htmlFor="requestId"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.requestId')} *
          </label>
          <input
            type="text"
            id="requestId"
            name="requestId"
            value={formData.requestId}
            onChange={handleChange}
            required
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.requestIdPlaceholder')}
          />
        </div>
      )}

      <OfferFormFields formData={formData} request={request} onChange={handleChange} />

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
