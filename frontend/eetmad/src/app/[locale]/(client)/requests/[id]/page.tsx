'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useRequest } from '@/lib/hooks/useRequests';
import { LoadingSpinner, ErrorMessage, Button } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import RequestHeader from '@/components/features/requests/RequestHeader';
import RequestDescription from '@/components/features/requests/RequestDescription';
import RequestDetailsCard from '@/components/features/requests/RequestDetailsCard';
import RequestActions from '@/components/features/requests/RequestActions';

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.requests');
  const { data: request, isLoading, error } = useRequest(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/requests` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[{ label: t('title'), href: `/${locale}/requests` }, { label: id }]}
          className="mb-6"
        />
        <div className="flex flex-col items-center gap-4">
          <ErrorMessage
            error={error?.message || t('notFound')}
            variant="banner"
          />
          <Button onClick={() => router.push('/requests')} variant="primary">
            {t('backToRequests')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('title'), href: `/${locale}/requests` }, { label: request.title }]}
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

      <RequestHeader request={request} requestId={id} />

      {/* Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          <RequestDescription request={request} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <RequestDetailsCard request={request} />
          <RequestActions request={request} requestId={id} />
        </div>
      </div>
    </div>
  );
}
