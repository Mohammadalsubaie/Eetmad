import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';

export const paymentsApi = {
  getWallet: async () => {
    const { data } = await apiClient.get('/payments/wallet');
    return data;
  },

  getTransactions: async (params?: QueryParams) => {
    const { data } = await apiClient.get('/payments/transactions', { params });
    return data;
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
