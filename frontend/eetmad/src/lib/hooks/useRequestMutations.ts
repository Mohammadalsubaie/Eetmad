'use client';

import { useState } from 'react';
import { requestsApi } from '@/lib/api/requests';
import type { CreateRequestInput, Request } from '@/lib/types/request.types';

export function useCreateRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (data: CreateRequestInput): Promise<Request> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await requestsApi.create(data);
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

export function useUpdateRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const update = async (id: string, data: Partial<CreateRequestInput>): Promise<Request> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await requestsApi.update(id, data);
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

