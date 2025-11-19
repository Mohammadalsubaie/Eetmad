'use client';

import { useState } from 'react';
import { offersApi } from '@/lib/api/offers';
import type { CreateOfferInput, Offer } from '@/lib/types/offer.types';

export function useCreateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateOfferInput): Promise<Offer> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await offersApi.create(data);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading, error };
}

export function useUpdateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, data: Partial<CreateOfferInput>): Promise<Offer> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await offersApi.update(id, data);
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

