'use client';

import ProjectCard from '@/components/features/projects/ProjectCard';
import { ResourceGrid } from '@/components/shared/data-display';
import Breadcrumbs from '@/components/shared/navigation/Breadcrumbs';
import { EmptyState, ErrorMessage, LoadingSpinner } from '@/components/ui';
import { useProjects } from '@/lib/hooks/useProjects';
import { cssVars } from '@/styles/theme';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function SupplierProjectsPage() {
  const t = useTranslations('pages.projects');
  const locale = useLocale();
  const router = useRouter();
  const { data: projects, isLoading, error } = useProjects();

  const handleViewProject = (id: string) => {
    router.push(`/${locale}/supplier-projects/${id}`);
  };

  return (
    <div className="container mx-auto py-8" style={{ backgroundColor: cssVars.neutral.bg }}>
      <Breadcrumbs items={[{ label: t('title') || 'Supplier Projects' }]} className="mb-6" />

      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold" style={{ color: cssVars.secondary.DEFAULT }}>
          {t('title') || 'My Projects'}
        </h1>
        <p className="text-base" style={{ color: cssVars.neutral.textSecondary }}>
          {t('subtitle') || 'View and manage all your assigned projects'}
        </p>
      </div>

      {/* Projects List */}
      {isLoading && <LoadingSpinner text={t('loading')} />}

      {error && <ErrorMessage error={error} />}

      {!isLoading && !error && (
        <div className="space-y-6">
          {projects.length === 0 ? (
            <EmptyState
              title={t('noProjects') || 'No projects found'}
              description={
                t('noProjectsDescription') || "You don't have any projects assigned yet."
              }
            />
          ) : (
            <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} onView={handleViewProject} />
              ))}
            </ResourceGrid>
          )}
        </div>
      )}
    </div>
  );
}
