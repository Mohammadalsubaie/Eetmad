'use client';

import { FileText, Shield } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useTranslations } from 'next-intl';
import type { Offer } from '@/lib/types/offer.types';

interface OfferContentSectionProps {
  offer: Offer;
  type: 'technicalProposal' | 'deliverables' | 'paymentTerms' | 'warrantyDetails';
}

export default function OfferContentSection({
  offer,
  type,
}: OfferContentSectionProps) {
  const t = useTranslations('pages.offers');

  const content = {
    technicalProposal: offer.technicalProposal,
    deliverables: offer.deliverables,
    paymentTerms: offer.paymentTerms,
    warrantyDetails: offer.warrantyDetails,
  }[type];

  if (!content) {
    return null;
  }

  const isWarranty = type === 'warrantyDetails';
  const isMainContent = !isWarranty;

  const title = t(type);
  const Icon = isWarranty ? Shield : FileText;

  return (
    <div
      className={`rounded-2xl border-2 p-6 ${isMainContent ? '' : ''}`}
      style={{
        backgroundColor: cssVars.neutral.surface,
        borderColor: cssVars.neutral.border,
      }}
    >
      <h2
        className={`mb-4 flex items-center gap-2 ${isMainContent ? 'text-xl' : 'text-lg'} font-bold`}
        style={{ color: cssVars.secondary.DEFAULT }}
      >
        <Icon className="h-5 w-5" />
        {title}
      </h2>
      <p
        className={`${isMainContent ? 'leading-relaxed' : 'text-sm leading-relaxed'} whitespace-pre-line`}
        style={{ color: cssVars.neutral.textSecondary }}
      >
        {content}
      </p>
    </div>
  );
}

