'use client';

import { useTranslations } from 'next-intl';

export default function ProjectsPage() {
  const t = useTranslations('pages');
  
  return (
    <div>
      <h1>{t('projects.title')}</h1>
      {/* Projects list will be implemented here */}
    </div>
  );
}
