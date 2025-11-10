import apiClient from './client';

export const contractsApi = {
  getById: async (id: string) => {
    const { data } = await apiClient.get(`/contracts/${id}`);
    return data;
  },

  sign: async (id: string, signature: string) => {
    const { data } = await apiClient.post(`/contracts/${id}/sign`, { signature });
    return data;
  },

  getVersionHistory: async (id: string) => {
    const { data } = await apiClient.get(`/contracts/${id}/versions`);
    return data;
  },
};
