'use client';

import { useState, useEffect } from 'react';
import { disputesApi } from '@/lib/api/disputes';
import type { Dispute, DisputeMessage } from '@/lib/types/dispute.types';
import type {
  CreateDisputeInput,
  UpdateDisputeInput,
  AddEvidenceInput,
  AddDisputeMessageInput,
} from '@/lib/api/disputes';
import type { QueryParams } from '@/lib/types/common.types';

export function useDisputes(params?: QueryParams) {
  const [data, setData] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDisputes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisputes();
  }, [params]);

  return { data, isLoading, error };
}

export function useDispute(id: string) {
  const [data, setData] = useState<Dispute | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchDispute = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDispute();
  }, [id]);

  return { data, isLoading, error };
}

export function usePendingDisputes(params?: QueryParams) {
  const [data, setData] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPending = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getPending(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPending();
  }, [params]);

  return { data, isLoading, error };
}

export function useResolvedDisputes(params?: QueryParams) {
  const [data, setData] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchResolved = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getResolved(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResolved();
  }, [params]);

  return { data, isLoading, error };
}

export function useDisputeStatistics() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getStatistics();
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

export function useDisputeMessages(disputeId: string, params?: QueryParams) {
  const [data, setData] = useState<DisputeMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!disputeId) {
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await disputesApi.getMessages(disputeId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [disputeId, params]);

  return { data, isLoading, error };
}

export function useCreateDispute() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateDisputeInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await disputesApi.create(data);
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

export function useUpdateDispute() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateDisputeInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await disputesApi.update(id, data);
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

export function useCloseDispute() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await disputesApi.close(id);
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

export function useAddEvidence() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, evidence: AddEvidenceInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await disputesApi.addEvidence(id, evidence);
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

export function useAddDisputeMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, messageData: AddDisputeMessageInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await disputesApi.addMessage(id, messageData);
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
