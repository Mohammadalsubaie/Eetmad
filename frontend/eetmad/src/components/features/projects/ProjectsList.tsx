'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { cssVars } from '@/styles/theme';
import { projectsApi } from '@/lib/api/projects';
import type { Project } from '@/lib/types/project.types';
import type { ProjectFilters } from '@/lib/types/common.types';
import ProjectCard from './ProjectCard';
import EmptyState from '@/components/ui/EmptyState';

interface ProjectsListProps {
  filters?: ProjectFilters;
}

export default function ProjectsList({ filters }: ProjectsListProps) {
  const t = useTranslations('pages.projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll(filters);
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  }, [filters, t]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-lg font-medium" style={{ color: cssVars.neutral.textSecondary }}>
          {t('loading')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border-2 p-8 text-center"
        style={{ borderColor: cssVars.status.error }}
      >
        <p style={{ color: cssVars.status.error }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Projects Grid */}
      {projects.length === 0 ? (
        <EmptyState title={t('noProjects')} description={t('noProjectsDescription')} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
