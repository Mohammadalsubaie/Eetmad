'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { offersApi } from '@/lib/api/offers';
import { requestsApi } from '@/lib/api/requests';
import type { Offer, CreateOfferInput } from '@/lib/types/offer.types';
import type { Request } from '@/lib/types/request.types';
import { Button } from '@/components/ui/Button';

interface OfferFormProps {
  offer?: Offer;
  requestId?: string;
  onSuccess?: () => void;
}

export default function OfferForm({ offer, requestId, onSuccess }: OfferFormProps) {
  const t = useTranslations('pages.offers');
  const router = useRouter();
  const isEdit = !!offer;

  const [request, setRequest] = useState<Request | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (requestId || offer?.requestId) {
      fetchRequest(requestId || offer!.requestId);
    }
  }, [requestId, offer]);

  const fetchRequest = async (reqId: string) => {
    try {
      const data = await requestsApi.getById(reqId);
      setRequest(data);
    } catch (err) {
      console.error('Failed to fetch request:', err);
    }
  };

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
    setSubmitting(true);
    setError(null);

    try {
      if (isEdit && offer) {
        await offersApi.update(offer.id, formData);
      } else {
        await offersApi.create(formData);
      }

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/offers');
      }
    } catch (err) {
      console.error('Failed to save offer:', err);
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

      {/* Request Info */}
      {request && (
        <div
          className="rounded-xl border-2 p-4"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.primary.DEFAULT} 5%, transparent)`,
            borderColor: cssVars.primary.DEFAULT,
          }}
        >
          <h3 className="mb-2 text-lg font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {request.title}
          </h3>
          <p className="text-sm" style={{ color: cssVars.neutral.textSecondary }}>
            {request.description.substring(0, 150)}...
          </p>
          {request.budgetMin && request.budgetMax && (
            <p className="mt-2 text-sm font-medium" style={{ color: cssVars.primary.DEFAULT }}>
              {t('requestBudget')}: {request.budgetMin.toLocaleString()} -{' '}
              {request.budgetMax.toLocaleString()} {t('currency')}
            </p>
          )}
        </div>
      )}

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

      {/* Proposed Price */}
      <div>
        <label
          htmlFor="proposedPrice"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.proposedPrice')} *
        </label>
        <div className="relative">
          <DollarSign
            className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
            style={{ color: cssVars.neutral.textMuted }}
          />
          <input
            type="number"
            id="proposedPrice"
            name="proposedPrice"
            value={formData.proposedPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full rounded-xl border-2 px-4 py-3 pe-12 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.proposedPricePlaceholder')}
          />
        </div>
      </div>

      {/* Duration and Start Date */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="estimatedDuration"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.estimatedDuration')} *
          </label>
          <input
            type="number"
            id="estimatedDuration"
            name="estimatedDuration"
            value={formData.estimatedDuration}
            onChange={handleChange}
            required
            min="1"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.estimatedDurationPlaceholder')}
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.startDate')} *
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
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
      </div>

      {/* Technical Proposal */}
      <div>
        <label
          htmlFor="technicalProposal"
          className="mb-2 block text-sm font-bold"
          style={{ color: cssVars.secondary.DEFAULT }}
        >
          {t('form.technicalProposal')} *
        </label>
        <textarea
          id="technicalProposal"
          name="technicalProposal"
          value={formData.technicalProposal}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.technicalProposalPlaceholder')}
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
          rows={3}
          className="w-full rounded-xl border-2 px-4 py-3 text-sm"
          style={{
            backgroundColor: cssVars.neutral.surface,
            borderColor: cssVars.neutral.border,
            color: cssVars.secondary.DEFAULT,
          }}
          placeholder={t('form.paymentTermsPlaceholder')}
        />
      </div>

      {/* Warranty */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="warrantyPeriod"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.warrantyPeriod')}
          </label>
          <input
            type="number"
            id="warrantyPeriod"
            name="warrantyPeriod"
            value={formData.warrantyPeriod || ''}
            onChange={handleChange}
            min="0"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.warrantyPeriodPlaceholder')}
          />
        </div>
        <div>
          <label
            htmlFor="warrantyDetails"
            className="mb-2 block text-sm font-bold"
            style={{ color: cssVars.secondary.DEFAULT }}
          >
            {t('form.warrantyDetails')}
          </label>
          <input
            type="text"
            id="warrantyDetails"
            name="warrantyDetails"
            value={formData.warrantyDetails || ''}
            onChange={handleChange}
            className="w-full rounded-xl border-2 px-4 py-3 text-sm"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
            }}
            placeholder={t('form.warrantyDetailsPlaceholder')}
          />
        </div>
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
