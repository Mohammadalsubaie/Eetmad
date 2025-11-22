import apiClient from './client';
import { mockCategories } from '@/mocks/data/categories';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  Category,
} from '@/lib/types/category.types';

const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export const categoriesApi = {
  getAll: async () => {
    if (USE_MOCKS) {
      console.log('📦 Using mock categories data');
      return mockCategories;
    }
    try {
      const { data } = await apiClient.get('/v1/categories');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockCategories;
    }
  },

  getById: async (id: string) => {
    if (USE_MOCKS) {
      console.log('📦 Using mock category data');
      const category = mockCategories.find((cat) => cat.id === id || cat.slug === id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    }
    try {
      const { data } = await apiClient.get(`/v1/categories/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const category = mockCategories.find((cat) => cat.id === id || cat.slug === id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
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
