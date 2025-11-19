'use client';

import { useTranslations, useLocale } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ProjectsList from '@/components/features/projects/ProjectsList';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';

export default function ProjectsPage() {
  const t = useTranslations('pages.projects');
  const tPages = useTranslations('pages');
  const locale = useLocale();

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title')}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle')}
        </p>
      </div>

      {/* Projects List */}
      <ProjectsList />
    </div>
  );
}
