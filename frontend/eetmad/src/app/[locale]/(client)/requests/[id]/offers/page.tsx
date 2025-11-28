'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useRequest } from '@/lib/hooks/useRequests';
import { LoadingSpinner } from '@/components/ui';
import OffersList from '@/components/features/offers/OffersList';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function RequestOffersPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.offers');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const { data: request, isLoading } = useRequest(id);

  const handleOfferAccepted = () => {
    // Optionally redirect to projects page
    // router.push('/projects');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: tPages('requests.title'), href: `/${locale}/requests` },
            { label: id },
            { label: t('title') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        {request && (
          <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
            {t('subtitle')}: {request.title}
          </p>
        )}
      </div>

      {/* Offers List */}
      <OffersList requestId={id} onAccept={handleOfferAccepted} />
    </div>
  );
}
