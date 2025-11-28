'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import MilestoneForm from '@/components/features/projects/MilestoneForm';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { ErrorMessage } from '@/components/ui';

export default function NewMilestonePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('pages.projects');
  const projectId = searchParams.get('projectId');

  // Use default projectId for testing if not provided
  const defaultProjectId = projectId || '1';

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/projects` },
          { label: defaultProjectId, href: `/${locale}/projects/${defaultProjectId}` },
          {
            label: t('milestonesSection.title'),
            href: `/${locale}/projects/${defaultProjectId}/milestones`,
          },
          { label: t('milestonesSection.new') },
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
          {t('milestonesSection.new')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('milestonesSection.newDescription')}
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
        <MilestoneForm
          projectId={defaultProjectId}
          onSuccess={() => router.push(`/${locale}/projects/${defaultProjectId}/milestones`)}
        />
      </div>
    </div>
  );
}
