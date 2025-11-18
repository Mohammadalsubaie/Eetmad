import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Project, ProjectMilestone } from '@/lib/types/project.types';
import { mockProjects } from '@/mocks/data/projects';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const projectsApi = {
  getAll: async (params?: QueryParams): Promise<Project[]> => {
    try {
      const { data } = await apiClient.get('/v1/projects/me', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock projects data');
        return mockProjects;
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Project> => {
    try {
      const { data } = await apiClient.get(`/v1/projects/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock project data');
        const project = mockProjects.find((proj) => proj.id === id);
        if (!project) {
          throw new Error('Project not found');
        }
        return project;
      }
      throw error;
    }
  },

  getMilestones: async (projectId: string): Promise<ProjectMilestone[]> => {
    try {
      const { data } = await apiClient.get(`/v1/milestones/project/${projectId}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock milestones data');
        const project = mockProjects.find((proj) => proj.id === projectId);
        return project?.milestones || [];
      }
      throw error;
    }
  },
};
