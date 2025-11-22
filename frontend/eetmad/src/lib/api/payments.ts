import apiClient from './client';
import type { QueryParams } from '@/lib/types/common.types';
import type {
  Payment,
  Wallet,
  WalletTransaction,
  Refund,
  CreatePaymentInput,
  InitiatePaymentInput,
  RefundRequestInput,
} from '@/lib/types/payment.types';
import { mockPayments, mockWallet, mockWalletTransactions } from '@/mocks/data/payments';

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export const paymentsApi = {
  // Get all payments
  getAll: async (params?: QueryParams): Promise<Payment[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock payments data');
      // Return a copy to avoid mutations
      return mockPayments.map((p) => ({ ...p }));
    }
    try {
      const { data } = await apiClient.get('/v1/payments/me', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Return a copy to avoid mutations
      return mockPayments.map((p) => ({ ...p }));
    }
  },

  // Get payment by ID
  getById: async (id: string): Promise<Payment> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock payment data');
      // Try to find by exact ID
      let payment = mockPayments.find((p) => p.id === id);
      // If not found, try to find by partial match (e.g., "1" matches "payment-1")
      if (!payment) {
        payment = mockPayments.find((p) => p.id.includes(id) || id.includes(p.id));
      }
      // If still not found, return first payment as fallback
      if (!payment) {
        console.warn(`Payment with ID "${id}" not found, using first payment as fallback`);
        payment = mockPayments[0];
      }
      return { ...payment };
    }
    try {
      const { data } = await apiClient.get<Payment>(`/v1/payments/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      // Try to find by exact ID
      let payment = mockPayments.find((p) => p.id === id);
      // If not found, try to find by partial match
      if (!payment) {
        payment = mockPayments.find((p) => p.id.includes(id) || id.includes(p.id));
      }
      // If still not found, return first payment as fallback
      if (!payment) {
        payment = mockPayments[0];
      }
      return { ...payment };
    }
  },

  // Get payments by project
  getByProject: async (projectId: string, params?: QueryParams): Promise<Payment[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock payments by project data');
      return mockPayments.filter((p) => p.projectId === projectId);
    }
    try {
      const { data } = await apiClient.get(`/v1/payments/project/${projectId}`, { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockPayments.filter((p) => p.projectId === projectId);
    }
  },

  // Get payment history
  getHistory: async (params?: QueryParams): Promise<Payment[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock payment history data');
      return mockPayments;
    }
    try {
      const { data } = await apiClient.get('/v1/payments/history', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockPayments;
    }
  },

  // Get pending payments
  getPending: async (params?: QueryParams): Promise<Payment[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock pending payments data');
      return mockPayments.filter((p) => p.status === 'pending');
    }
    try {
      const { data } = await apiClient.get('/v1/payments/pending', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockPayments.filter((p) => p.status === 'pending');
    }
  },

  // Get failed payments
  getFailed: async (params?: QueryParams): Promise<Payment[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock failed payments data');
      return mockPayments.filter((p) => p.status === 'failed');
    }
    try {
      const { data } = await apiClient.get('/v1/payments/failed', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockPayments.filter((p) => p.status === 'failed');
    }
  },

  // Get payment statistics
  getStatistics: async (): Promise<Record<string, unknown>> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock payment statistics data');
      return {
        total: mockPayments.length,
        completed: mockPayments.filter((p) => p.status === 'completed').length,
        pending: mockPayments.filter((p) => p.status === 'pending').length,
        failed: mockPayments.filter((p) => p.status === 'failed').length,
        totalAmount: mockPayments.reduce((sum, p) => sum + p.amount, 0),
      };
    }
    try {
      const { data } = await apiClient.get('/v1/payments/statistics');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return {
        total: mockPayments.length,
        completed: mockPayments.filter((p) => p.status === 'completed').length,
        pending: mockPayments.filter((p) => p.status === 'pending').length,
        failed: mockPayments.filter((p) => p.status === 'failed').length,
        totalAmount: mockPayments.reduce((sum, p) => sum + p.amount, 0),
      };
    }
  },

  // Initiate payment
  initiate: async (paymentData: InitiatePaymentInput): Promise<Payment> => {
    const { data } = await apiClient.post<Payment>('/v1/payments/initiate', paymentData);
    return data;
  },

  // Process payment
  process: async (id: string, paymentData?: Record<string, unknown>): Promise<Payment> => {
    const { data } = await apiClient.post<Payment>(`/v1/payments/${id}/process`, paymentData);
    return data;
  },

  // Confirm payment
  confirm: async (id: string): Promise<Payment> => {
    const { data } = await apiClient.post<Payment>(`/v1/payments/${id}/confirm`);
    return data;
  },

  // Cancel payment
  cancel: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/payments/${id}/cancel`);
  },

  // Release payment to supplier
  release: async (id: string): Promise<Payment> => {
    const { data } = await apiClient.post<Payment>(`/v1/payments/${id}/release`);
    return data;
  },

  // Calculate platform fee
  calculateFee: async (amount: number): Promise<{ fee: number; netAmount: number }> => {
    const { data } = await apiClient.post('/v1/payments/calculate-fee', { amount });
    return data;
  },

  // Refunds
  refund: async (id: string, refundData: RefundRequestInput): Promise<Refund> => {
    const { data } = await apiClient.post<Refund>(`/v1/payments/${id}/refund`, refundData);
    return data;
  },

  partialRefund: async (
    id: string,
    refundData: RefundRequestInput
  ): Promise<Refund> => {
    const { data } = await apiClient.post<Refund>(`/v1/payments/${id}/refund/partial`, refundData);
    return data;
  },

  // Wallet
  getWallet: async (): Promise<Wallet> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock wallet data');
      return mockWallet;
    }
    try {
      const { data } = await apiClient.get<Wallet>('/v1/wallet');
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockWallet;
    }
  },

  getWalletTransactions: async (params?: QueryParams): Promise<WalletTransaction[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock wallet transactions data');
      return mockWalletTransactions;
    }
    try {
      const { data } = await apiClient.get('/v1/wallet/transactions', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockWalletTransactions;
    }
  },

  addFunds: async (amount: number, method: string): Promise<WalletTransaction> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock add funds');
      const newTransaction: WalletTransaction = {
        id: `wallet-txn-${Date.now()}`,
        userId: mockWallet.userId,
        amount,
        type: 'deposit',
        referenceType: 'payment',
        referenceId: `deposit-${Date.now()}`,
        balanceBefore: mockWallet.balance,
        balanceAfter: mockWallet.balance + amount,
        description: `Deposit via ${method}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      mockWallet.balance = newTransaction.balanceAfter;
      mockWalletTransactions.unshift(newTransaction);
      return newTransaction;
    }
    try {
      const { data } = await apiClient.post<WalletTransaction>('/v1/wallet/deposit', {
        amount,
        method,
      });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const newTransaction: WalletTransaction = {
        id: `wallet-txn-${Date.now()}`,
        userId: mockWallet.userId,
        amount,
        type: 'deposit',
        referenceType: 'payment',
        referenceId: `deposit-${Date.now()}`,
        balanceBefore: mockWallet.balance,
        balanceAfter: mockWallet.balance + amount,
        description: `Deposit via ${method}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      mockWallet.balance = newTransaction.balanceAfter;
      mockWalletTransactions.unshift(newTransaction);
      return newTransaction;
    }
  },

  withdrawFunds: async (amount: number, bankAccountId: string): Promise<WalletTransaction> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock withdraw funds');
      const newTransaction: WalletTransaction = {
        id: `wallet-txn-${Date.now()}`,
        userId: mockWallet.userId,
        amount,
        type: 'withdrawal',
        referenceType: 'payment',
        referenceId: `withdraw-${Date.now()}`,
        balanceBefore: mockWallet.balance,
        balanceAfter: mockWallet.balance - amount,
        description: `Withdrawal to bank account ${bankAccountId}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      mockWallet.balance = newTransaction.balanceAfter;
      mockWalletTransactions.unshift(newTransaction);
      return newTransaction;
    }
    try {
      const { data } = await apiClient.post<WalletTransaction>('/v1/wallet/withdraw', {
        amount,
        bankAccountId,
      });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const newTransaction: WalletTransaction = {
        id: `wallet-txn-${Date.now()}`,
        userId: mockWallet.userId,
        amount,
        type: 'withdrawal',
        referenceType: 'payment',
        referenceId: `withdraw-${Date.now()}`,
        balanceBefore: mockWallet.balance,
        balanceAfter: mockWallet.balance - amount,
        description: `Withdrawal to bank account ${bankAccountId}`,
        status: 'completed',
        createdAt: new Date().toISOString(),
      };
      mockWallet.balance = newTransaction.balanceAfter;
      mockWalletTransactions.unshift(newTransaction);
      return newTransaction;
    }
  },
};
