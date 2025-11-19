'use client';

import { useState, useEffect, useCallback } from 'react';
import { suppliersApi } from '@/lib/api/suppliers';
import type { Supplier, SupplierProfile, PortfolioItem } from '@/lib/types/supplier.types';
import type { UpdateSupplierProfileData, PortfolioItemData } from '@/lib/api/suppliers';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getAll();
        setSuppliers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return { suppliers, isLoading, error };
}

export function useSupplier(supplierId: string | null) {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      if (!supplierId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getById(supplierId);
        setSupplier(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplier();
  }, [supplierId]);

  return {
    supplier,
    isLoading,
    error,
  };
}

export function useSupplierProfile() {
  const [profile, setProfile] = useState<SupplierProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await suppliersApi.getMyProfile();
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data: UpdateSupplierProfileData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await suppliersApi.updateProfile(data);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
    updateProfile,
  };
}

export function usePortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await suppliersApi.getMyProfile();
      setItems(profile.portfolio || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const addItem = async (itemData: PortfolioItemData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newItem = await suppliersApi.addPortfolioItem(itemData);
      setItems((prev) => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: string, itemData: Partial<PortfolioItemData>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updated = await suppliersApi.updatePortfolioItem(id, itemData);
      setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await suppliersApi.deletePortfolioItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    error,
    refetch: fetchPortfolio,
    addItem,
    updateItem,
    deleteItem,
  };
}

export function useSupplierStatistics() {
  const [stats, setStats] = useState<{
    totalOffers: number;
    acceptedOffers: number;
    totalProjects: number;
    completedProjects: number;
    totalEarnings: number;
    averageRating: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await suppliersApi.getStatistics();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}

