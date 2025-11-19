/**
 * MSW request handlers
 */

import { http, HttpResponse } from 'msw';
import { mockCategories } from './data/categories';
import { mockSuppliers } from './data/suppliers';
import {
  mockDashboardOverview,
  mockDashboardStatistics,
  mockRecentActivity,
} from './data/dashboard';
import { mockUser } from './data/users';

export const handlers = [
  // Example handler
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
];
