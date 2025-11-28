'use client';

import { useState, useEffect } from 'react';
import { categoriesApi } from '@/lib/api/categories';
import type {
  Category,
  CategoryTree,
  UpdateCategoryInput,
  CreateCategoryInput,
} from '@/lib/types/category.types';

export function useCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getAll();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data: data, isLoading, error };
}

export function useCategory(id: string) {
  const [data, setData] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchCategory = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getById(id);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchCategory();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { data, isLoading, error };
}

export function useUpdateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateCategory = async (id: string, categoryData: UpdateCategoryInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await categoriesApi.update(id, categoryData);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCategory,
    isLoading,
    error,
  };
}

export function useCreateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createCategory = async (categoryData: CreateCategoryInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await categoriesApi.create(categoryData);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCategory,
    isLoading,
    error,
  };
}

export function useCategoryTree() {
  const [data, setData] = useState<CategoryTree[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTree = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getTree();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchTree();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}

export function useActiveCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchActive = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getActive();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchActive();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}

export function useSubcategories(categoryId: string) {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSubcategories = async () => {
      if (!categoryId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getSubcategories(categoryId);
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchSubcategories();
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  return { data, isLoading, error };
}

export function useParentCategories() {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchParents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await categoriesApi.getParent();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchParents();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}

export function useDeleteCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteCategory = async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await categoriesApi.delete(id);
      setSuccess(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteCategory,
    isLoading,
    error,
    success,
  };
}

export function useActivateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const activate = async (id: string): Promise<Category> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await categoriesApi.activate(id);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    activate,
    isLoading,
    error,
  };
}

export function useDeactivateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deactivate = async (id: string): Promise<Category> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await categoriesApi.deactivate(id);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deactivate,
    isLoading,
    error,
  };
}

export function useReorderCategories() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reorder = async (categoryIds: string[]): Promise<Category[]> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await categoriesApi.reorder(categoryIds);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reorder,
    isLoading,
    error,
  };
}
