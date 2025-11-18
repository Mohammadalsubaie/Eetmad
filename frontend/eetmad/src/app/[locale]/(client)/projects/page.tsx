'use client';

import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import ProjectsList from '@/components/features/projects/ProjectsList';

export default function ProjectsPage() {
  const t = useTranslations('pages.projects');

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
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
