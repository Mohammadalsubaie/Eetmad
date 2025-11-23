import apiClient from './client';
import { mockCategories } from '@/mocks/data/categories';
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
  Category,
  CategoryTree,
} from '@/lib/types/category.types';
import { USE_MOCKS } from './_mockHelper';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
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

  getById: async (id: string): Promise<Category> => {
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

  getTree: async (): Promise<CategoryTree[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock categories tree data');
      // Build tree structure from flat mock data
      const tree = mockCategories
        .filter((cat) => !cat.parentId)
        .map((parent) => ({
          ...parent,
          subcategories: mockCategories.filter((cat) => cat.parentId === parent.id),
        })) as CategoryTree[];
      return tree;
    }
    try {
      const { data } = await apiClient.get<CategoryTree[]>('/v1/categories/tree');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const tree = mockCategories
        .filter((cat) => !cat.parentId)
        .map((parent) => ({
          ...parent,
          subcategories: mockCategories.filter((cat) => cat.parentId === parent.id),
        })) as CategoryTree[];
      return tree;
    }
  },

  getActive: async (): Promise<Category[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock active categories data');
      return mockCategories.filter((cat) => cat.isActive);
    }
    try {
      const { data } = await apiClient.get('/v1/categories/active');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockCategories.filter((cat) => cat.isActive);
    }
  },

  getSubcategories: async (id: string): Promise<Category[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock subcategories data');
      return mockCategories.filter((cat) => cat.parentId === id);
    }
    try {
      const { data } = await apiClient.get(`/v1/categories/${id}/subcategories`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockCategories.filter((cat) => cat.parentId === id);
    }
  },

  getParent: async (): Promise<Category[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock parent categories data');
      return mockCategories.filter((cat) => !cat.parentId);
    }
    try {
      const { data } = await apiClient.get('/v1/categories/parent');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockCategories.filter((cat) => !cat.parentId);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/v1/categories/${id}`);
    } catch (error) {
      throw error;
    }
  },

  activate: async (id: string): Promise<Category> => {
    try {
      const { data } = await apiClient.patch<Category>(`/v1/categories/${id}/activate`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  deactivate: async (id: string): Promise<Category> => {
    try {
      const { data } = await apiClient.patch<Category>(`/v1/categories/${id}/deactivate`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  reorder: async (categoryIds: string[]): Promise<Category[]> => {
    try {
      const { data } = await apiClient.put<Category[]>('/v1/categories/reorder', { categoryIds });
      return data;
    } catch (error) {
      throw error;
    }
  },
};
