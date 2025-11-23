import type { QueryParams } from '@/lib/types/common.types';
import type {
  Contract,
  CreateContractInput,
  UpdateContractInput,
} from '@/lib/types/contract.types';
import { mockContracts } from '@/mocks/data/contracts';
import { USE_MOCKS } from './_mockHelper';
import apiClient from './client';

export const contractsApi = {
  // Get all contracts
  getAll: async (params?: QueryParams): Promise<Contract[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock contracts data');
      return mockContracts;
    }
    try {
      const { data } = await apiClient.get('/v1/contracts', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockContracts;
    }
  },

  // Get contract by ID
  getById: async (id: string): Promise<Contract> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock contract data');
      const contract = mockContracts.find((c) => c.id === id);
      if (!contract) {
        throw new Error('Contract not found');
      }
      return contract;
    }
    try {
      const { data } = await apiClient.get(`/v1/contracts/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const contract = mockContracts.find((c) => c.id === id);
      if (!contract) {
        throw new Error('Contract not found');
      }
      return contract;
    }
  },

  // Get contract by project ID
  getByProjectId: async (projectId: string): Promise<Contract | null> => {
    const { data } = await apiClient.get(`/v1/contracts/project/${projectId}`);
    return data;
  },

  // Create new contract
  create: async (contractData: CreateContractInput): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>('/v1/contracts', contractData);
    return data;
  },

  // Update contract
  update: async (id: string, contractData: UpdateContractInput): Promise<Contract> => {
    const { data } = await apiClient.put<Contract>(`/v1/contracts/${id}`, contractData);
    return data;
  },

  // Delete contract
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/contracts/${id}`);
  },

  // Sign contract (general)
  sign: async (id: string, signature: string): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>(`/v1/contracts/${id}/sign`, { signature });
    return data;
  },

  // Sign as client
  signAsClient: async (id: string, signature: string): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>(`/v1/contracts/${id}/sign/client`, {
      signature,
    });
    return data;
  },

  // Sign as supplier
  signAsSupplier: async (id: string, signature: string): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>(`/v1/contracts/${id}/sign/supplier`, {
      signature,
    });
    return data;
  },

  // Get version history
  getVersionHistory: async (id: string): Promise<Contract[]> => {
    const { data } = await apiClient.get<Contract[]>(`/v1/contracts/${id}/versions`);
    return data;
  },

  // Get specific version
  getVersion: async (id: string, version: number): Promise<Contract> => {
    const { data } = await apiClient.get<Contract>(`/v1/contracts/${id}/versions/${version}`);
    return data;
  },

  // Create new version
  createVersion: async (id: string): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>(`/v1/contracts/${id}/versions`);
    return data;
  },

  // Add custom clause
  addClause: async (id: string, clause: Record<string, unknown>): Promise<Contract> => {
    const { data } = await apiClient.post<Contract>(`/v1/contracts/${id}/clauses`, clause);
    return data;
  },

  // Delete clause
  deleteClause: async (id: string, clauseId: string): Promise<Contract> => {
    const { data } = await apiClient.delete<Contract>(`/v1/contracts/${id}/clauses/${clauseId}`);
    return data;
  },

  // Download contract as PDF
  download: async (id: string): Promise<Blob> => {
    const { data } = await apiClient.get(`/v1/contracts/${id}/download`, {
      responseType: 'blob',
    });
    return data;
  },

  // Get contract status
  getStatus: async (id: string): Promise<{ status: string }> => {
    const { data } = await apiClient.get<{ status: string }>(`/v1/contracts/${id}/status`);
    return data;
  },
};
