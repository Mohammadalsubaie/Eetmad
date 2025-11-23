import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Dispute, DisputeEvidence, DisputeMessage } from '@/lib/types/dispute.types';
import { mockDisputes } from '@/mocks/data/disputes';
import { USE_MOCKS } from './_mockHelper';

export interface CreateDisputeInput {
  projectId: string;
  subject: string;
  description: string;
  category: 'quality' | 'delivery' | 'payment' | 'communication' | 'other';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  evidence?: File[];
}

export interface UpdateDisputeInput {
  subject?: string;
  description?: string;
  category?: string;
  priority?: string;
  status?: string;
}

export interface AddEvidenceInput {
  file: File;
  description?: string;
}

export interface AddDisputeMessageInput {
  content: string;
  messageType?: 'message' | 'evidence' | 'resolution';
  attachments?: File[];
}

export const disputesApi = {
  // Get all disputes (user's disputes)
  getAll: async (params?: QueryParams): Promise<Dispute[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock disputes data');
      return mockDisputes;
    }
    try {
      const { data } = await apiClient.get('/v1/disputes/me', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockDisputes;
    }
  },

  // Get dispute by ID
  getById: async (id: string): Promise<Dispute> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock dispute data');
      const dispute = mockDisputes.find((d) => d.id === id);
      if (!dispute) {
        throw new Error('Dispute not found');
      }
      return dispute;
    }
    try {
      const { data } = await apiClient.get<Dispute>(`/v1/disputes/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const dispute = mockDisputes.find((d) => d.id === id);
      if (!dispute) {
        throw new Error('Dispute not found');
      }
      return dispute;
    }
  },

  // Create dispute
  create: async (disputeData: CreateDisputeInput): Promise<Dispute> => {
    const formData = new FormData();
    formData.append('projectId', disputeData.projectId);
    formData.append('subject', disputeData.subject);
    formData.append('description', disputeData.description);
    formData.append('category', disputeData.category);
    if (disputeData.priority) {
      formData.append('priority', disputeData.priority);
    }
    if (disputeData.evidence && disputeData.evidence.length > 0) {
      disputeData.evidence.forEach((file) => formData.append('evidence', file));
    }
    const { data } = await apiClient.post<Dispute>('/v1/disputes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // Update dispute
  update: async (id: string, disputeData: UpdateDisputeInput): Promise<Dispute> => {
    const { data } = await apiClient.put<Dispute>(`/v1/disputes/${id}`, disputeData);
    return data;
  },

  // Close dispute
  close: async (id: string): Promise<Dispute> => {
    const { data } = await apiClient.patch<Dispute>(`/v1/disputes/${id}/close`);
    return data;
  },

  // Add evidence
  addEvidence: async (id: string, evidence: AddEvidenceInput): Promise<DisputeEvidence> => {
    const formData = new FormData();
    formData.append('file', evidence.file);
    if (evidence.description) {
      formData.append('description', evidence.description);
    }
    const { data } = await apiClient.post<DisputeEvidence>(
      `/v1/disputes/${id}/evidence`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  // Get pending disputes
  getPending: async (params?: QueryParams): Promise<Dispute[]> => {
    const { data } = await apiClient.get('/v1/disputes/pending', { params });
    return data;
  },

  // Get resolved disputes
  getResolved: async (params?: QueryParams): Promise<Dispute[]> => {
    const { data } = await apiClient.get('/v1/disputes/resolved', { params });
    return data;
  },

  // Get dispute statistics
  getStatistics: async (): Promise<Record<string, unknown>> => {
    const { data } = await apiClient.get('/v1/disputes/statistics');
    return data;
  },

  // Admin: Resolve dispute
  resolve: async (id: string, resolution: string): Promise<Dispute> => {
    const { data } = await apiClient.patch<Dispute>(`/v1/disputes/${id}/resolve`, { resolution });
    return data;
  },

  // Admin: Escalate dispute
  escalate: async (id: string): Promise<Dispute> => {
    const { data } = await apiClient.patch<Dispute>(`/v1/disputes/${id}/escalate`);
    return data;
  },

  // Admin: Assign dispute
  assign: async (id: string, adminId: string): Promise<Dispute> => {
    const { data } = await apiClient.patch<Dispute>(`/v1/disputes/${id}/assign`, { adminId });
    return data;
  },

  // Dispute Messages
  getMessages: async (id: string, params?: QueryParams): Promise<DisputeMessage[]> => {
    const { data } = await apiClient.get(`/v1/disputes/${id}/messages`, { params });
    return data;
  },

  addMessage: async (id: string, messageData: AddDisputeMessageInput): Promise<DisputeMessage> => {
    const formData = new FormData();
    formData.append('content', messageData.content);
    if (messageData.messageType) {
      formData.append('messageType', messageData.messageType);
    }
    if (messageData.attachments && messageData.attachments.length > 0) {
      messageData.attachments.forEach((file) => formData.append('attachments', file));
    }
    const { data } = await apiClient.post<DisputeMessage>(`/v1/disputes/${id}/messages`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  // Admin: Add internal note
  addInternalNote: async (id: string, content: string): Promise<DisputeMessage> => {
    const { data } = await apiClient.post<DisputeMessage>(`/v1/disputes/${id}/internal-note`, {
      content,
    });
    return data;
  },
};
