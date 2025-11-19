'use client';

import { useState, useEffect } from 'react';
import { paymentsApi } from '@/lib/api/payments';
import type { Payment } from '@/lib/types/payment.types';
import type { QueryParams } from '@/lib/types/common.types';

export function usePayment(paymentId: string | null) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (!paymentId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getById(paymentId);
        setPayment(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayment();
  }, [paymentId]);

  return {
    payment,
    isLoading,
    error,
  };
}

export function usePayments(params?: QueryParams) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await paymentsApi.getTransactions(params);
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [JSON.stringify(params)]);

  return {
    payments,
    isLoading,
    error,
  };
}

