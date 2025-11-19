'use client';

import { useState, useEffect } from 'react';
import { projectsApi } from '@/lib/api/projects';
import type { ProjectFilters, QueryParams } from '@/lib/types/common.types';
import type { Project, ProjectMilestone } from '@/lib/types/project.types';

export function useProjects(filters?: ProjectFilters | QueryParams) {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    projectsApi
      .getAll(filters)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(filters)]);

  return { data, isLoading, error };
}

export function useProject(id: string) {
  const [data, setData] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    projectsApi
      .getById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}

export function useProjectMilestones(projectId: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!projectId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const [projectData, milestonesData] = await Promise.all([
          projectsApi.getById(projectId),
          projectsApi.getMilestones(projectId),
        ]);
        setProject(projectData);
        setMilestones(milestonesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  return {
    project,
    milestones,
    isLoading,
    error,
  };
}
