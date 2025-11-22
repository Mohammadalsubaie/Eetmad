'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cssVars } from '@/styles/theme';
import { useMilestone } from '@/lib/hooks/useMilestones';
import { LoadingSpinner, ErrorMessage } from '@/components/ui';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import MilestoneForm from '@/components/features/projects/MilestoneForm';

export default function EditMilestonePage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params.id as string;
  const t = useTranslations('pages.projects');
  const { data: milestone, isLoading, error } = useMilestone(id);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('milestonesSection.title'), href: `/${locale}/milestones` },
            { label: id },
            { label: t('milestonesSection.edit') },
          ]}
          className="mb-6"
        />
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error || !milestone) {
    return (
      <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
        <Breadcrumbs
          items={[
            { label: t('milestonesSection.title'), href: `/${locale}/milestones` },
            { label: id },
            { label: t('milestonesSection.edit') },
          ]}
          className="mb-6"
        />
        <ErrorMessage error={error?.message || t('milestonesSection.notFound')} variant="banner" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs
        items={[
          { label: t('title'), href: `/${locale}/projects` },
          { label: milestone.projectId, href: `/${locale}/projects/${milestone.projectId}` },
          { label: t('milestonesSection.title'), href: `/${locale}/projects/${milestone.projectId}/milestones` },
          { label: milestone.title, href: `/${locale}/milestones/${id}` },
          { label: t('milestonesSection.edit') },
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
          {t('milestonesSection.edit')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('milestonesSection.editDescription')}
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
          milestone={milestone}
          projectId={milestone.projectId}
          onSuccess={() => router.push(`/${locale}/milestones/${id}`)}
        />
      </div>
    </div>
  );
}

