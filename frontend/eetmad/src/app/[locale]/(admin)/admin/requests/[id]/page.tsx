'use client';

import RequestActions from '@/components/features/requests/RequestActions';
import RequestDescription from '@/components/features/requests/RequestDescription';
import RequestDetailsCard from '@/components/features/requests/RequestDetailsCard';
import RequestHeader from '@/components/features/requests/RequestHeader';
import RequestTimeline from '@/components/features/requests/RequestTimeline';
import AdminPageHeader from '@/components/shared/admin/AdminPageHeader';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useRequest } from '@/lib/hooks/useRequests';
import { cssVars } from '@/styles/theme';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('admin');
  const tPages = useTranslations('pages');
  const locale = useLocale();
  const requestId = params.id as string;

  const { data: request, isLoading, error } = useRequest(requestId);

  if (isLoading) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('requests.title'), href: `/${locale}/admin/requests` },
            { label: requestId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: tPages('admin.title'), href: `/${locale}/admin` },
            { label: tPages('requests.title'), href: `/${locale}/admin/requests` },
            { label: requestId },
          ]}
          className="mb-6"
        />
        <div className="flex h-64 items-center justify-center">
          <ErrorMessage error={error?.message || t('requests.notFound')} variant="banner" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: tPages('admin.title'), href: `/${locale}/admin` },
          { label: tPages('requests.title'), href: `/${locale}/admin/requests` },
          { label: request.title || requestId },
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
            title={request.title || t('requests.detail.title')}
            description={t('requests.detail.description')}
            icon={FileText}
          />
        </div>
      </div>

      <RequestHeader request={request} requestId={requestId} />

      {/* Details Sections */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <RequestDetailsCard request={request} />
        <RequestDescription request={request} />
        <RequestTimeline />
        <RequestActions request={request} requestId={requestId} />
      </div>
    </div>
  );
}
