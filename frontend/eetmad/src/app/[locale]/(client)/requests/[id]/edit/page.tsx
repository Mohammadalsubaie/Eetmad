'use client';

import RequestForm from '@/components/features/requests/RequestForm';
import { requestsApi } from '@/lib/api/requests';
import type { Request } from '@/lib/types/request.types';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function EditRequestPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const t = useTranslations('pages.requests');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const [request, setRequest] = useState<Request | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequest = useCallback(
    async (requestId: string) => {
      try {
        setLoading(true);
        setError(null);
        const data = await requestsApi.getById(requestId);
        setRequest(data);
      } catch (err) {
        console.error('Failed to fetch request:', err);
        setError(t('fetchError'));
      } finally {
        setLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (id) {
      fetchRequest(id);
    }
  }, [id, fetchRequest]);

  if (loading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div className="flex items-center justify-center py-12">
          <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
            {t('loading')}
          </div>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <div
          className="rounded-2xl border-2 p-8 text-center"
          style={{ borderColor: cssVars.status.error }}
        >
          <p style={{ color: cssVars.status.error }}>{error || t('notFound')}</p>
          <button
            onClick={() => router.push('/requests')}
            className="mt-4 text-sm font-medium underline"
            style={{ color: cssVars.primary.DEFAULT }}
          >
            {t('backToRequests')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/requests` },
          { label: request.title || `#${id}`, href: `/${locale}/requests/${id}` },
          { label: tPages('edit.title') },
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

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('edit.title')} {request.title}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('editSubtitle')}
        </p>
      </div>

      {/* Form Card */}
      <div
        className="rounded-2xl border-2 p-8"
        style={{ backgroundColor: cssVars.neutral.surface, borderColor: cssVars.neutral.border }}
      >
        <RequestForm request={request} onSuccess={() => router.push(`/requests/${id}`)} />
      </div>
    </div>
  );
}
