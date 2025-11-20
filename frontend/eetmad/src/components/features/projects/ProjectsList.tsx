'use client';

import { useTranslations } from 'next-intl';
import type { ProjectFilters } from '@/lib/types/common.types';
import { useProjects } from '@/lib/hooks/useProjects';
import ProjectCard from './ProjectCard';
import { EmptyState, LoadingSpinner, ErrorMessage } from '@/components/ui';
import { ResourceGrid } from '@/components/shared/data-display';

interface ProjectsListProps {
  filters?: ProjectFilters;
}

export default function ProjectsList({ filters }: ProjectsListProps) {
  const t = useTranslations('pages.projects');
  const { data: projects, isLoading, error } = useProjects(filters);

  if (isLoading) {
    return <LoadingSpinner text={t('loading')} />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="space-y-6">
      {projects.length === 0 ? (
        <EmptyState title={t('noProjects')} description={t('noProjectsDescription')} />
      ) : (
        <ResourceGrid columns={{ default: 1, md: 2, lg: 3 }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ResourceGrid>
      )}
    </div>
  );
}
