'use client';

import OfferActions from '@/components/features/offers/OfferActions';
import OfferContentSection from '@/components/features/offers/OfferContentSection';
import OfferHeader from '@/components/features/offers/OfferHeader';
import OfferStats from '@/components/features/offers/OfferStats';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useOffer } from '@/lib/hooks/useOffers';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const offerId = params.id as string;

  const { data: offer, isLoading, error } = useOffer(offerId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('offers.title'), href: `/${locale}/admin/offers` },
            { label: offerId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('offers.title'), href: `/${locale}/admin/offers` },
            { label: offerId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('offers.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('offers.title'), href: `/${locale}/admin/offers` },
          { label: offer.offerNumber || offerId },
        ]}
        className="mb-6"
      />
      {/* Header */}
      <div className="mb-4 flex items-start gap-2 sm:mb-6 sm:items-center sm:gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex-shrink-0 rounded-xl p-2 transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${cssVars.neutral.border} 30%, transparent)`,
          }}
        >
          <ArrowLeft
            className="h-4 w-4 sm:h-5 sm:w-5"
            style={{ color: cssVars.neutral.textSecondary }}
          />
        </motion.button>
        <div className="min-w-0 flex-1">
          <AdminPageHeader
            title={offer.offerNumber || t('offers.detail.title')}
            description={t('offers.detail.description')}
            icon={Briefcase}
          />
        </div>
      </div>

      <OfferHeader offer={offer} offerId={offerId} />

      {/* Stats */}
      <OfferStats offer={offer} />

      {/* Details Sections */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {offer.technicalProposal && <OfferContentSection offer={offer} type="technicalProposal" />}
        {offer.deliverables && <OfferContentSection offer={offer} type="deliverables" />}
        {offer.paymentTerms && <OfferContentSection offer={offer} type="paymentTerms" />}
        {offer.warrantyDetails && <OfferContentSection offer={offer} type="warrantyDetails" />}
        <OfferActions offer={offer} />
      </div>
    </div>
  );
}
