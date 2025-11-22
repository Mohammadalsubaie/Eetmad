'use client';

import { useState, useEffect } from 'react';
import { contractsApi } from '@/lib/api/contracts';
import type {
  Contract,
  CreateContractInput,
  UpdateContractInput,
} from '@/lib/types/contract.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useContracts(params?: QueryParams) {
  const [data, setData] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await contractsApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [params]);

  return { data, isLoading, error };
}

export function useContract(id: string) {
  const [data, setData] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchContract = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await contractsApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  return { data, isLoading, error };
}

export function useContractByProject(projectId: string) {
  const [data, setData] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    const fetchContract = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await contractsApi.getByProjectId(projectId);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [projectId]);

  return { data, isLoading, error };
}

export function useContractVersions(id: string) {
  const [data, setData] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchVersions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await contractsApi.getVersionHistory(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchVersions();
  }, [id]);

  return { data, isLoading, error };
}

export function useCreateContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateContractInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await contractsApi.create(data);
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

export function useUpdateContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateContractInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await contractsApi.update(id, data);
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

export function useDeleteContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await contractsApi.delete(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useSignContract() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, signature: string, role?: 'client' | 'supplier') => {
    setIsLoading(true);
    setError(null);
    try {
      let result: Contract;
      if (role === 'client') {
        result = await contractsApi.signAsClient(id, signature);
      } else if (role === 'supplier') {
        result = await contractsApi.signAsSupplier(id, signature);
      } else {
        result = await contractsApi.sign(id, signature);
      }
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
