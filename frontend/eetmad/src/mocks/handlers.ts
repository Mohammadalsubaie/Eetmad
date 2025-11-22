/**
 * MSW request handlers
 */

import { http, HttpResponse } from 'msw';
import type { WalletTransaction } from '@/lib/types/payment.types';
import { mockCategories } from './data/categories';
import { mockSuppliers } from './data/suppliers';
import {
  mockDashboardOverview,
  mockDashboardStatistics,
  mockRecentActivity,
} from './data/dashboard';
import { mockUser, mockUsers } from './data/users';
import { mockAnalyticsData } from './data/analytics';
import { mockRequests } from './data/requests';
import { mockOffers } from './data/offers';
import { mockContracts } from './data/contracts';
import { mockProjects } from './data/projects';
import { mockReviews } from './data/reviews';
import { mockConversations, mockMessages } from './data/messages';
import { mockNotifications } from './data/notifications';
import { mockPayments, mockWallet, mockWalletTransactions } from './data/payments';
import { mockDisputes } from './data/disputes';

export const handlers = [
  // Health check
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),

  // Categories endpoints
  http.get('/api/v1/categories', () => {
    return HttpResponse.json(mockCategories);
  }),

  http.get('/api/v1/categories/:id', ({ params }) => {
    const { id } = params;
    const category = mockCategories.find((cat) => cat.id === id || cat.slug === id);
    if (!category) {
      return HttpResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return HttpResponse.json(category);
  }),

  // Suppliers endpoints
  http.get('/api/v1/suppliers', () => {
    return HttpResponse.json(mockSuppliers);
  }),

  http.get('/api/v1/suppliers/:id', ({ params }) => {
    const { id } = params;
    const supplier = mockSuppliers.find((sup) => sup.id === id);
    if (!supplier) {
      return HttpResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }
    return HttpResponse.json(supplier);
  }),

  http.get('/api/v1/suppliers/me', () => {
    return HttpResponse.json(mockSuppliers[0]);
  }),

  // Requests endpoints
  http.get('/api/v1/requests', () => {
    return HttpResponse.json(mockRequests);
  }),

  http.get('/api/v1/requests/active', () => {
    return HttpResponse.json(mockRequests.filter((r) => r.status === 'open'));
  }),

  http.get('/api/v1/requests/me', () => {
    return HttpResponse.json(mockRequests);
  }),

  http.get('/api/v1/requests/:id', ({ params }) => {
    const { id } = params;
    const request = mockRequests.find((req) => req.id === id);
    if (!request) {
      return HttpResponse.json({ error: 'Request not found' }, { status: 404 });
    }
    return HttpResponse.json(request);
  }),

  http.get('/api/v1/requests/category/:categoryId', ({ params }) => {
    const { categoryId } = params;
    return HttpResponse.json(mockRequests.filter((r) => r.categoryId === categoryId));
  }),

  http.post('/api/v1/requests', () => {
    return HttpResponse.json(mockRequests[0], { status: 201 });
  }),

  http.put('/api/v1/requests/:id', () => {
    return HttpResponse.json(mockRequests[0]);
  }),

  http.delete('/api/v1/requests/:id', () => {
    return HttpResponse.json({ success: true });
  }),

  http.patch('/api/v1/requests/:id/publish', () => {
    return HttpResponse.json({ ...mockRequests[0], status: 'open' });
  }),

  http.patch('/api/v1/requests/:id/close', () => {
    return HttpResponse.json({ ...mockRequests[0], status: 'closed' });
  }),

  http.patch('/api/v1/requests/:id/cancel', () => {
    return HttpResponse.json({ ...mockRequests[0], status: 'cancelled' });
  }),

  // Offers endpoints
  http.get('/api/v1/offers', () => {
    return HttpResponse.json(mockOffers);
  }),

  http.get('/api/v1/offers/me', () => {
    return HttpResponse.json(mockOffers);
  }),

  http.get('/api/v1/offers/:id', ({ params }) => {
    const { id } = params;
    const offer = mockOffers.find((o) => o.id === id);
    if (!offer) {
      return HttpResponse.json({ error: 'Offer not found' }, { status: 404 });
    }
    return HttpResponse.json(offer);
  }),

  http.get('/api/v1/requests/:id/offers', ({ params }) => {
    const { id } = params;
    return HttpResponse.json(mockOffers.filter((o) => o.requestId === id));
  }),

  http.post('/api/v1/offers', () => {
    return HttpResponse.json(mockOffers[0], { status: 201 });
  }),

  http.put('/api/v1/offers/:id', () => {
    return HttpResponse.json(mockOffers[0]);
  }),

  http.delete('/api/v1/offers/:id', () => {
    return HttpResponse.json({ success: true });
  }),

  http.post('/api/v1/offers/:id/accept', () => {
    return HttpResponse.json({ ...mockOffers[0], status: 'accepted' });
  }),

  http.post('/api/v1/offers/:id/reject', () => {
    return HttpResponse.json({ ...mockOffers[0], status: 'rejected' });
  }),

  // Contracts endpoints
  http.get('/api/v1/contracts', () => {
    return HttpResponse.json(mockContracts);
  }),

  http.get('/api/v1/contracts/:id', ({ params }) => {
    const { id } = params;
    const contract = mockContracts.find((c) => c.id === id);
    if (!contract) {
      return HttpResponse.json({ error: 'Contract not found' }, { status: 404 });
    }
    return HttpResponse.json(contract);
  }),

  http.post('/api/v1/contracts', () => {
    return HttpResponse.json(mockContracts[0], { status: 201 });
  }),

  http.put('/api/v1/contracts/:id', () => {
    return HttpResponse.json(mockContracts[0]);
  }),

  http.post('/api/v1/contracts/:id/sign', () => {
    return HttpResponse.json({ ...mockContracts[0], status: 'signed' });
  }),

  // Projects endpoints
  http.get('/api/v1/projects', () => {
    return HttpResponse.json(mockProjects);
  }),

  http.get('/api/v1/projects/:id', ({ params }) => {
    const { id } = params;
    const project = mockProjects.find((p) => p.id === id);
    if (!project) {
      return HttpResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return HttpResponse.json(project);
  }),

  http.get('/api/v1/projects/me', () => {
    return HttpResponse.json(mockProjects);
  }),

  // Reviews endpoints
  http.get('/api/v1/reviews', () => {
    return HttpResponse.json(mockReviews);
  }),

  http.get('/api/v1/reviews/:id', ({ params }) => {
    const { id } = params;
    const review = mockReviews.find((r) => r.id === id);
    if (!review) {
      return HttpResponse.json({ error: 'Review not found' }, { status: 404 });
    }
    return HttpResponse.json(review);
  }),

  http.post('/api/v1/reviews', () => {
    return HttpResponse.json(mockReviews[0], { status: 201 });
  }),

  http.put('/api/v1/reviews/:id', () => {
    return HttpResponse.json(mockReviews[0]);
  }),

  http.delete('/api/v1/reviews/:id', () => {
    return HttpResponse.json({ success: true });
  }),

  // Messages endpoints
  http.get('/api/v1/messages/conversations', () => {
    return HttpResponse.json(mockConversations);
  }),

  http.get('/api/v1/messages/conversations/:id', ({ params }) => {
    const { id } = params;
    const conversation = mockConversations.find((c) => c.id === id);
    if (!conversation) {
      return HttpResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }
    return HttpResponse.json(conversation);
  }),

  http.get('/api/v1/messages/conversations/:id/messages', ({ params }) => {
    const { id } = params;
    return HttpResponse.json(mockMessages.filter((m) => m.conversationId === id));
  }),

  http.post('/api/v1/messages/conversations', () => {
    return HttpResponse.json(mockConversations[0], { status: 201 });
  }),

  http.post('/api/v1/messages/conversations/:id/messages', () => {
    return HttpResponse.json(mockMessages[0], { status: 201 });
  }),

  // Notifications endpoints
  http.get('/api/v1/notifications', () => {
    return HttpResponse.json(mockNotifications);
  }),

  http.get('/api/v1/notifications/:id', ({ params }) => {
    const { id } = params;
    const notification = mockNotifications.find((n) => n.id === id);
    if (!notification) {
      return HttpResponse.json({ error: 'Notification not found' }, { status: 404 });
    }
    return HttpResponse.json(notification);
  }),

  http.patch('/api/v1/notifications/:id/read', () => {
    return HttpResponse.json({ success: true });
  }),

  http.patch('/api/v1/notifications/read-all', () => {
    return HttpResponse.json({ success: true });
  }),

  // Payments endpoints
  http.get('/api/v1/payments', () => {
    return HttpResponse.json(mockPayments);
  }),

  http.get('/api/v1/payments/:id', ({ params }) => {
    const { id } = params;
    const payment = mockPayments.find((p) => p.id === id);
    if (!payment) {
      return HttpResponse.json({ error: 'Payment not found' }, { status: 404 });
    }
    return HttpResponse.json(payment);
  }),

  http.get('/api/v1/payments/history', () => {
    return HttpResponse.json(mockPayments);
  }),

  http.get('/api/v1/payments/pending', () => {
    return HttpResponse.json(mockPayments.filter((p) => p.status === 'pending'));
  }),

  http.get('/api/v1/payments/failed', () => {
    return HttpResponse.json(mockPayments.filter((p) => p.status === 'failed'));
  }),

  http.get('/api/v1/payments/statistics', () => {
    return HttpResponse.json({
      total: mockPayments.length,
      completed: mockPayments.filter((p) => p.status === 'completed').length,
      pending: mockPayments.filter((p) => p.status === 'pending').length,
      failed: mockPayments.filter((p) => p.status === 'failed').length,
      totalAmount: mockPayments.reduce((sum, p) => sum + p.amount, 0),
    });
  }),

  http.get('/api/v1/payments/project/:projectId', ({ params }) => {
    const { projectId } = params;
    return HttpResponse.json(mockPayments.filter((p) => p.projectId === projectId));
  }),

  http.post('/api/v1/payments', () => {
    return HttpResponse.json(mockPayments[0], { status: 201 });
  }),

  // Wallet endpoints
  http.get('/api/v1/wallet', () => {
    return HttpResponse.json(mockWallet);
  }),

  http.get('/api/v1/wallet/transactions', () => {
    return HttpResponse.json(mockWalletTransactions);
  }),

  http.post('/api/v1/wallet/deposit', async ({ request }) => {
    const body = await request.json() as { amount: number; method: string };
    const newTransaction: WalletTransaction = {
      id: `wallet-txn-${Date.now()}`,
      userId: mockWallet.userId,
      amount: body.amount,
      type: 'deposit',
      referenceType: 'payment',
      referenceId: `deposit-${Date.now()}`,
      balanceBefore: mockWallet.balance,
      balanceAfter: mockWallet.balance + body.amount,
      description: `Deposit via ${body.method}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    // Update wallet balance
    mockWallet.balance = newTransaction.balanceAfter;
    mockWalletTransactions.unshift(newTransaction);
    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  http.post('/api/v1/wallet/withdraw', async ({ request }) => {
    const body = await request.json() as { amount: number; bankAccountId: string };
    const newTransaction: WalletTransaction = {
      id: `wallet-txn-${Date.now()}`,
      userId: mockWallet.userId,
      amount: body.amount,
      type: 'withdrawal',
      referenceType: 'payment',
      referenceId: `withdraw-${Date.now()}`,
      balanceBefore: mockWallet.balance,
      balanceAfter: mockWallet.balance - body.amount,
      description: `Withdrawal to bank account ${body.bankAccountId}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    // Update wallet balance
    mockWallet.balance = newTransaction.balanceAfter;
    mockWalletTransactions.unshift(newTransaction);
    return HttpResponse.json(newTransaction, { status: 201 });
  }),

  // Disputes endpoints
  http.get('/api/v1/disputes', () => {
    return HttpResponse.json(mockDisputes);
  }),

  http.get('/api/v1/disputes/:id', ({ params }) => {
    const { id } = params;
    const dispute = mockDisputes.find((d) => d.id === id);
    if (!dispute) {
      return HttpResponse.json({ error: 'Dispute not found' }, { status: 404 });
    }
    return HttpResponse.json(dispute);
  }),

  http.post('/api/v1/disputes', () => {
    return HttpResponse.json(mockDisputes[0], { status: 201 });
  }),

  // Dashboard endpoints
  http.get('/api/v1/dashboard/overview', () => {
    return HttpResponse.json(mockDashboardOverview);
  }),

  http.get('/api/v1/dashboard/statistics', () => {
    return HttpResponse.json(mockDashboardStatistics);
  }),

  http.get('/api/v1/dashboard/recent-activity', () => {
    return HttpResponse.json(mockRecentActivity);
  }),

  // Users endpoints
  http.get('/api/v1/users/me', () => {
    return HttpResponse.json(mockUser);
  }),

  http.get('/api/v1/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === id);
    if (!user) {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return HttpResponse.json(user);
  }),

  http.put('/api/v1/users/me', () => {
    return HttpResponse.json(mockUser);
  }),

  // Admin Analytics endpoints
  http.get('/api/v1/admin/analytics', () => {
    return HttpResponse.json(mockAnalyticsData);
  }),
];
