import apiClient from './client';

export const categoriesApi = {
  getAll: async () => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get(`/categories/${id}`);
    return data;
  },
};
