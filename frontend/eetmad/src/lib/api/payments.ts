import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type { Payment } from '@/lib/types/payment.types';
import { mockPayments } from '@/mocks/data/payments';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

export const paymentsApi = {
  getWallet: async () => {
    try {
      const { data } = await apiClient.get('/payments/wallet');
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock wallet data');
        return { balance: 5000, currency: 'SAR' };
      }
      throw error;
    }
  },

  getTransactions: async (params?: QueryParams) => {
    try {
      const { data } = await apiClient.get('/payments/transactions', { params });
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock payments data');
        return mockPayments;
      }
      throw error;
    }
  },

  getById: async (id: string): Promise<Payment> => {
    try {
      const { data } = await apiClient.get<Payment>(`/payments/${id}`);
      return data;
    } catch (error) {
      if (USE_MOCKS || process.env.NODE_ENV === 'development') {
        console.warn('Using mock payment data');
        const payment = mockPayments.find((p) => p.id === id);
        if (!payment) {
          throw new Error('Payment not found');
        }
        return payment;
      }
      throw error;
    }
  },

  addFunds: async (amount: number, method: string) => {
    const { data } = await apiClient.post('/payments/add-funds', { amount, method });
    return data;
  },

  withdrawFunds: async (amount: number, bankAccountId: string) => {
    const { data } = await apiClient.post('/payments/withdraw', { amount, bankAccountId });
    return data;
  },
};
