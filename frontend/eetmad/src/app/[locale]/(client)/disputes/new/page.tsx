'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import DisputeForm from '@/components/features/disputes/DisputeForm';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function NewDisputePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.disputes');
  const projectId = searchParams.get('projectId') || undefined;

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/disputes` },
          { label: t('newDispute') },
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
        <div className="mb-2 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8" style={{ color: cssVars.status.warning }} />
          <h1 className="text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
            {t('newDispute')}
          </h1>
        </div>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('newDisputeDescription')}
        </p>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl border-2 p-6"
        style={{
          backgroundColor: cssVars.neutral.surface,
          borderColor: cssVars.neutral.border,
        }}
      >
        <DisputeForm
          projectId={projectId}
          onSuccess={() => router.push(`/${locale}/disputes`)}
        />
      </div>
    </div>
  );
}

