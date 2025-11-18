import apiClient from './client';
import { mockCategories } from '@/mocks/data/categories';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  Category,
} from '@/lib/types/category.types';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const categoriesApi = {
  getAll: async () => {
    try {
      const { data } = await apiClient.get('/v1/categories');
      return data;
    } catch (error) {
      // Fallback to mock data if API fails or in development
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock categories data');
        return mockCategories;
      }
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const { data } = await apiClient.get(`/v1/categories/${id}`);
      return data;
    } catch (error) {
      // Fallback to mock data if API fails or in development
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock category data');
        const category = mockCategories.find((cat) => cat.id === id || cat.slug === id);
        if (!category) {
          throw new Error('Category not found');
        }
        return category;
      }
      throw error;
    }
  },

  create: async (categoryData: CreateCategoryInput): Promise<Category> => {
    try {
      const { data } = await apiClient.post<Category>('/v1/categories', categoryData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id: string, categoryData: UpdateCategoryInput): Promise<Category> => {
    try {
      const { data } = await apiClient.put<Category>(`/v1/categories/${id}`, categoryData);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
