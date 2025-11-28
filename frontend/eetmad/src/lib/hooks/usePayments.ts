'use client';

import { useState, useEffect } from 'react';
import { paymentsApi } from '@/lib/api/payments';
import type {
  Payment,
  Wallet,
  WalletTransaction,
  InitiatePaymentInput,
  RefundRequestInput,
} from '@/lib/types/payment.types';
import type { QueryParams } from '@/lib/types/common.types';

export function usePayments(params?: QueryParams) {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [params]);

  return { data, isLoading, error };
}

export function usePayment(id: string) {
  const [data, setData] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchPayment = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  return { data, isLoading, error };
}

export function usePaymentsByProject(projectId: string, params?: QueryParams) {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getByProject(projectId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [projectId, params]);

  return { data, isLoading, error };
}

export function usePaymentHistory(params?: QueryParams) {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getHistory(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [params]);

  return { data, isLoading, error };
}

export function usePendingPayments(params?: QueryParams) {
  const [data, setData] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPending = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getPending(params);
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

export function usePaymentStatistics() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getStatistics();
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

export function useInitiatePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: InitiatePaymentInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.initiate(data);
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

export function useProcessPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, paymentData?: Record<string, unknown>) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.process(id, paymentData);
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

export function useConfirmPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.confirm(id);
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

export function useCancelPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await paymentsApi.cancel(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useReleasePayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.release(id);
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

export function useRefundPayment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, refundData: RefundRequestInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.refund(id, refundData);
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

// Wallet Hooks
export function useWallet() {
  const [data, setData] = useState<Wallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getWallet();
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWallet();
  }, []);

  return { data, isLoading, error };
}

export function useWalletTransactions(params?: QueryParams) {
  const [data, setData] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getWalletTransactions(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [params]);

  return { data, isLoading, error };
}

export function useAddFunds() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (amount: number, method: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.addFunds(amount, method);
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

export function useWithdrawFunds() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (amount: number, bankAccountId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await paymentsApi.withdrawFunds(amount, bankAccountId);
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
