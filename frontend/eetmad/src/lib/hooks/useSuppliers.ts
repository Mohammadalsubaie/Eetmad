'use client';

import { useState, useEffect, useMemo } from 'react';
import { suppliersApi } from '@/lib/api/suppliers';
import type {
  SupplierProfile,
  WorkingHours,
  CreateSupplierProfileData,
  UpdateSupplierProfileData,
  PortfolioItemData,
  CertificationData,
} from '@/lib/api/suppliers';
import type { QueryParams } from '@/lib/types/common.types';

export function useSuppliers(params?: QueryParams) {
  const [data, setData] = useState<SupplierProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const paramsString = useMemo(() => JSON.stringify(params), [params]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  return { data, isLoading, error };
}

export function useSupplier(id: string) {
  const [data, setData] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchSupplier = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchSupplier();
  }, [id]);

  return { data, isLoading, error };
}

export function useMySupplierProfile() {
  const [data, setData] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMyProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getMyProfile();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyProfile();
  }, []);

  return { data, isLoading, error };
}

export function useCreateSupplierProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateSupplierProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.createProfile(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUpdateSupplierProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: UpdateSupplierProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.updateProfile(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useDeleteSupplierProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await suppliersApi.deleteProfile();
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useAddPortfolioItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: PortfolioItemData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.addPortfolioItem(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUpdatePortfolioItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: Partial<PortfolioItemData>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.updatePortfolioItem(id, data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useDeletePortfolioItem() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await suppliersApi.deletePortfolioItem(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useAddCertification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CertificationData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.addCertification(data);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useDeleteCertification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await suppliersApi.deleteCertification(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useUpdateWorkingHours() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (workingHours: WorkingHours) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await suppliersApi.updateWorkingHours(workingHours);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useRequestVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await suppliersApi.requestVerification();
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useSupplierStatistics() {
  const [data, setData] = useState<{
    totalProjects?: number;
    completedProjects?: number;
    activeProjects?: number;
    totalRevenue?: number;
    totalEarnings?: number;
    averageRating?: number;
    totalReviews?: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const statistics = await suppliersApi.getStatistics();
        setData(statistics);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchStatistics();
  }, []);

  return { data, isLoading, error };
}
