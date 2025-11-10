import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Dispute, DisputeEvidence } from '@/lib/types/dispute.types';

export interface CreateDisputeInput {
  projectId: string;
  subject: string;
  description: string;
  category: string;
  evidence?: File[];
}

export interface AddEvidenceInput {
  file: File;
  description?: string;
}

export const disputesApi = {
  getAll: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/disputes', { params });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Dispute>(`/disputes/${id}`);
    return data;
  },

  create: async (disputeData: CreateDisputeInput) => {
    const { data: response } = await apiClient.post<Dispute>('/disputes', disputeData);
    return response;
  },

  addEvidence: async (id: string, evidence: AddEvidenceInput) => {
    const { data } = await apiClient.post<DisputeEvidence>(`/disputes/${id}/evidence`, evidence);
    return data;
  },
};
