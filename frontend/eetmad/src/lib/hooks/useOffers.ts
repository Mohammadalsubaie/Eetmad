'use client';

import { useState, useEffect } from 'react';
import { offersApi } from '@/lib/api/offers';
import type { Offer, CreateOfferInput } from '@/lib/types';
import type { QueryParams } from '@/lib/types/common.types';

export function useOffers(params?: QueryParams) {
  const [data, setData] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    offersApi
      .getAll(params)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [params]);

  return { data, isLoading, error };
}

export function useOffer(id: string) {
  const [data, setData] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    offersApi
      .getById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}

export function useCreateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateOfferInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.create(data);
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
