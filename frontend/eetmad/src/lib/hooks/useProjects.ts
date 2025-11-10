'use client';

import { useState, useEffect } from 'react';
import { projectsApi } from '@/lib/api/projects';
import type { QueryParams } from '@/lib/types/common.types';
import type { Project } from '@/lib/types/project.types';

export function useProjects(params?: QueryParams) {
  const [data, setData] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    projectsApi
      .getAll(params)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [params]);

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
