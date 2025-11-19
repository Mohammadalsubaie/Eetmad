'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useOffer } from '@/lib/hooks/useOffers';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import OfferHeader from '@/components/features/offers/OfferHeader';
import OfferStats from '@/components/features/offers/OfferStats';
import OfferContentSection from '@/components/features/offers/OfferContentSection';
import OfferActions from '@/components/features/offers/OfferActions';

export default function OfferDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.offers');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { data: offer, isLoading, error } = useOffer(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/offers` },
            { label: id },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('title'), href: `/${locale}/offers` },
            { label: id },
          ]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            error={error?.message || t('notFound')}
            variant="banner"
          />
          <Button
            onClick={() => router.push('/offers')}
            variant="primary"
          >
            {t('backToOffers')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/offers` },
          { label: offer.offerNumber || `#${id}` },
        ]}
        className="mb-6"
      />
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm font-medium"
        style={{ color: cssVars.primary.DEFAULT }}
      >
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </motion.button>

      <OfferHeader offer={offer} offerId={id} />
      <OfferStats offer={offer} />

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          <OfferContentSection offer={offer} type="technicalProposal" />
          <OfferContentSection offer={offer} type="deliverables" />
          <OfferContentSection offer={offer} type="paymentTerms" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <OfferContentSection offer={offer} type="warrantyDetails" />
          <OfferActions offer={offer} />
        </div>
      </div>
    </div>
  );
}
