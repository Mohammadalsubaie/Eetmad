'use client';

import { useState, useEffect } from 'react';
import { requestsApi } from '@/lib/api/requests';
import type { Request, CreateRequestInput } from '@/lib/types';
import type { QueryParams } from '@/lib/types/common.types';

export function useRequests(params?: QueryParams) {
  const [data, setData] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    requestsApi
      .getAll(params)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [params]);

  return { data, isLoading, error };
}

export function useRequest(id: string) {
  const [data, setData] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    requestsApi
      .getById(id)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [id]);

  return { data, isLoading, error };
}

export function useCreateRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateRequestInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.create(data);
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
