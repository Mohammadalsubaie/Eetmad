'use client';

import { useState, useEffect } from 'react';
import { requestsApi } from '@/lib/api/requests';
import type { Request, CreateRequestInput, UpdateRequestInput } from '@/lib/types/request.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useRequests(params?: QueryParams) {
  const [data, setData] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await requestsApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [params]);

  return { data, isLoading, error };
}

export function useRequest(id: string) {
  const [data, setData] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchRequest = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await requestsApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  return { data, isLoading, error };
}

export function useMyRequests(params?: QueryParams) {
  const [data, setData] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMyRequests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await requestsApi.getMyRequests(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyRequests();
  }, [params]);

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

export function useUpdateRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateRequestInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.update(id, data);
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

export function useDeleteRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await requestsApi.delete(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function usePublishRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.publish(id);
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

export function useCloseRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.close(id);
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

export function useCancelRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.cancel(id);
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

export function useSelectOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (requestId: string, offerId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await requestsApi.selectOffer(requestId, offerId);
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

export function useRequestStatistics() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await requestsApi.getMyStatistics();
        setData(data);
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
