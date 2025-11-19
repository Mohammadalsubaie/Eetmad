'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import OffersList from '@/components/features/offers/OffersList';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function RequestOffersPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.offers');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchRequest(id);
    }
  }, [id]);

  const fetchRequest = async (requestId: string) => {
    try {
      setLoading(true);
      const data = await requestsApi.getById(requestId);
      setRequest(data);
    } catch (err) {
      console.error('Failed to fetch request:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferAccepted = () => {
    // Refresh request to update selected offer
    fetchRequest(id);
    // Optionally redirect to projects page
    // router.push('/projects');
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: tPages('requests.title'), href: `/${locale}/requests` },
            // TODO: Replace with actual data for id
            { label: '{id}' },
            { label: t('title') },
          ]}
          className="mb-6"
        />

        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
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
