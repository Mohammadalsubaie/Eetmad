'use client';

import type { CreateOfferInput } from '@/lib/types/offer.types';
import type { Request } from '@/lib/types/request.types';
import { cssVars } from '@/styles/theme';
import SaudiRiyalIcon from '@/components/shared/icons/SaudiRiyalIcon';
import CurrencyDisplay from '@/components/shared/CurrencyDisplay';
import { useTranslations } from 'next-intl';

interface OfferFormFieldsProps {
  formData: CreateOfferInput;
  request?: Request | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function OfferFormFields({ formData, request, onChange }: OfferFormFieldsProps) {
  const t = useTranslations('pages.offers');

  return (
    <>
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
              {t('requestBudget')}:{' '}
              <CurrencyDisplay amount={request.budgetMin} iconSize={14} showIcon={false} /> -{' '}
              <CurrencyDisplay amount={request.budgetMax} iconSize={14} />
            </p>
          )}
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
          <SaudiRiyalIcon
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
            style={{ color: cssVars.neutral.textMuted }}
            width={20}
            height={20}
          />
          <input
            type="number"
            id="proposedPrice"
            name="proposedPrice"
            value={formData.proposedPrice}
            onChange={onChange}
            onWheel={(e) => e.currentTarget.blur()}
            required
            min="0"
            step="0.01"
            className="w-full rounded-xl border-2 px-4 py-3 ps-12 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{
              backgroundColor: cssVars.neutral.surface,
              borderColor: cssVars.neutral.border,
              color: cssVars.secondary.DEFAULT,
              MozAppearance: 'textfield',
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
            onChange={onChange}
            onWheel={(e) => e.currentTarget.blur()}
            required
            min="1"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{
              backgroundColor: cssVars.neutral.surface,
              MozAppearance: 'textfield',
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
            onChange={onChange}
            onWheel={(e) => e.currentTarget.blur()}
            min="0"
            className="w-full rounded-xl border-2 px-4 py-3 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{
              backgroundColor: cssVars.neutral.surface,
              MozAppearance: 'textfield',
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
            onChange={onChange}
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
    </>
  );
}
