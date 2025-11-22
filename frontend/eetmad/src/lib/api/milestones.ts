import apiClient from './client';
import type { ProjectMilestone } from '@/lib/types/project.types';
import type { QueryParams } from '@/lib/types/common.types';
import { mockMilestones } from '@/mocks/data/milestones';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export interface CreateMilestoneInput {
  projectId: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  deliverables?: string;
  sortOrder?: number;
}

export interface UpdateMilestoneInput {
  title?: string;
  description?: string;
  amount?: number;
  dueDate?: string;
  deliverables?: string;
  sortOrder?: number;
}

export const milestonesApi = {
  // Get all milestones (across all projects)
  getAll: async (params?: QueryParams): Promise<ProjectMilestone[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock all milestones data');
      return mockMilestones.map((m) => ({ ...m }));
    }
    try {
      const { data } = await apiClient.get('/v1/milestones', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockMilestones.map((m) => ({ ...m }));
    }
  },

  // Get milestone by ID
  getById: async (id: string): Promise<ProjectMilestone> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock milestone data');
      const milestone = mockMilestones.find((m) => m.id === id);
      if (milestone) {
        return { ...milestone };
      }
      // Return default milestone if not found
      return {
        ...mockMilestones[0],
        id,
      };
    }
    try {
    const { data } = await apiClient.get<ProjectMilestone>(`/v1/milestones/${id}`);
    return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const milestone = mockMilestones.find((m) => m.id === id);
      return milestone || { ...mockMilestones[0], id };
    }
  },

  // Get milestones by project
  getByProject: async (projectId: string, params?: QueryParams): Promise<ProjectMilestone[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock milestones by project data');
      const projectMilestones = mockMilestones.filter((m) => m.projectId === projectId);
      return projectMilestones.length > 0 ? projectMilestones.map((m) => ({ ...m })) : mockMilestones.slice(0, 2).map((m) => ({ ...m, projectId }));
    }
    try {
    const { data } = await apiClient.get(`/v1/milestones/project/${projectId}`, { params });
    return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockMilestones.filter((m) => m.projectId === projectId).map((m) => ({ ...m }));
    }
  },

  // Get pending milestones
  getPending: async (projectId: string, params?: QueryParams): Promise<ProjectMilestone[]> => {
    const { data } = await apiClient.get(`/v1/milestones/project/${projectId}/pending`, { params });
    return data;
  },

  // Get completed milestones
  getCompleted: async (projectId: string, params?: QueryParams): Promise<ProjectMilestone[]> => {
    const { data } = await apiClient.get(`/v1/milestones/project/${projectId}/completed`, { params });
    return data;
  },

  // Create milestone
  create: async (milestoneData: CreateMilestoneInput): Promise<ProjectMilestone> => {
    const { data } = await apiClient.post<ProjectMilestone>('/v1/milestones', milestoneData);
    return data;
  },

  // Update milestone
  update: async (id: string, milestoneData: UpdateMilestoneInput): Promise<ProjectMilestone> => {
    const { data } = await apiClient.put<ProjectMilestone>(`/v1/milestones/${id}`, milestoneData);
    return data;
  },

  // Delete milestone
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/milestones/${id}`);
  },

  // Complete milestone
  complete: async (id: string, notes?: string): Promise<ProjectMilestone> => {
    const { data } = await apiClient.patch<ProjectMilestone>(`/v1/milestones/${id}/complete`, {
      notes,
    });
    return data;
  },

  // Approve milestone (Client)
  approve: async (id: string): Promise<ProjectMilestone> => {
    const { data } = await apiClient.patch<ProjectMilestone>(`/v1/milestones/${id}/approve`);
    return data;
  },

  // Reject milestone (Client)
  reject: async (id: string, reason: string): Promise<ProjectMilestone> => {
    const { data } = await apiClient.patch<ProjectMilestone>(`/v1/milestones/${id}/reject`, {
      reason,
    });
    return data;
  },

  // Release payment
  releasePayment: async (id: string): Promise<ProjectMilestone> => {
    const { data } = await apiClient.patch<ProjectMilestone>(`/v1/milestones/${id}/release-payment`);
    return data;
  },

  // Add attachment
  addAttachment: async (id: string, file: File): Promise<{ id: string; filePath: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/v1/milestones/${id}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // Delete attachment
  deleteAttachment: async (id: string, attachmentId: string): Promise<void> => {
    await apiClient.delete(`/v1/milestones/${id}/attachments/${attachmentId}`);
  },

  // Reorder milestones
  reorder: async (projectId: string, milestoneIds: string[]): Promise<void> => {
    await apiClient.put(`/v1/milestones/project/${projectId}/reorder`, { milestoneIds });
  },
};

