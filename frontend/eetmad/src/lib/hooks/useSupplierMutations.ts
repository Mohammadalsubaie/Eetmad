'use client';

import { useState } from 'react';
import { suppliersApi, type UpdateSupplierProfileData } from '@/lib/api/suppliers';
import type { SupplierProfile } from '@/lib/types/supplier.types';

export function useUpdateSupplierProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (data: UpdateSupplierProfileData): Promise<SupplierProfile> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await suppliersApi.updateProfile(data);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { update, isLoading, error };
}

