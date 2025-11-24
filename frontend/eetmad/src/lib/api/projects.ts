import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Project, ProjectMilestone } from '@/lib/types/project.types';
import { mockProjects } from '@/mocks/data/projects';
import { mockMilestones } from '@/mocks/data/milestones';
import { USE_MOCKS } from './_mockHelper';

export const projectsApi = {
  // Get all projects
  getAll: async (params?: QueryParams): Promise<Project[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock projects data');
      return mockProjects;
    }
    try {
      const { data } = await apiClient.get('/v1/projects/me', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockProjects;
    }
  },

  // Get project by ID
  getById: async (id: string): Promise<Project> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock project data');
      const project = mockProjects.find((proj) => proj.id === id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    }
    try {
      const { data } = await apiClient.get(`/v1/projects/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const project = mockProjects.find((proj) => proj.id === id);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    }
  },

  // Get milestones
  getMilestones: async (projectId: string): Promise<ProjectMilestone[]> => {
    try {
      const { data } = await apiClient.get(`/v1/milestones/project/${projectId}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock milestones data');
        // Filter milestones by projectId from mockMilestones
        const projectMilestones = mockMilestones.filter((m) => m.projectId === projectId);
        return projectMilestones.length > 0 ? projectMilestones.map((m) => ({ ...m })) : [];
      }
      throw error;
    }
  },

  // Update project status
  updateStatus: async (id: string, status: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/status`, { status });
    return data;
  },

  // Start project
  start: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/start`);
    return data;
  },

  // Complete project
  complete: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/complete`);
    return data;
  },

  // Cancel project
  cancel: async (id: string, reason?: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/cancel`, { reason });
    return data;
  },

  // Pause project
  pause: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/pause`);
    return data;
  },

  // Resume project
  resume: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/resume`);
    return data;
  },

  // Update progress
  updateProgress: async (id: string, progress: number): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/progress`, { progress });
    return data;
  },

  // Delivery Management (Supplier)
  addDeliveryProof: async (id: string, files: File[], notes?: string): Promise<Project> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    if (notes) {
      formData.append('notes', notes);
    }
    const { data } = await apiClient.post<Project>(`/v1/projects/${id}/delivery-proof`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  updateDeliveryNotes: async (id: string, notes: string): Promise<Project> => {
    const { data } = await apiClient.put<Project>(`/v1/projects/${id}/delivery-notes`, { notes });
    return data;
  },

  // Client Actions
  approveDelivery: async (id: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/approve-delivery`);
    return data;
  },

  rejectDelivery: async (id: string, reason: string): Promise<Project> => {
    const { data } = await apiClient.patch<Project>(`/v1/projects/${id}/reject-delivery`, {
      reason,
    });
    return data;
  },

  requestRevision: async (id: string, notes: string): Promise<Project> => {
    const { data } = await apiClient.post<Project>(`/v1/projects/${id}/request-revision`, {
      notes,
    });
    return data;
  },

  // Query & Filter
  getActive: async (params?: QueryParams): Promise<Project[]> => {
    const { data } = await apiClient.get('/v1/projects/active', { params });
    return data;
  },

  getCompleted: async (params?: QueryParams): Promise<Project[]> => {
    const { data } = await apiClient.get('/v1/projects/completed', { params });
    return data;
  },

  getByStatus: async (status: string, params?: QueryParams): Promise<Project[]> => {
    const { data } = await apiClient.get(`/v1/projects/status/${status}`, { params });
    return data;
  },

  getTimeline: async (id: string): Promise<Record<string, unknown>> => {
    const { data } = await apiClient.get(`/v1/projects/${id}/timeline`);
    return data;
  },

  getStatistics: async (): Promise<Record<string, unknown>> => {
    const { data } = await apiClient.get('/v1/projects/me/statistics');
    return data;
  },
};
