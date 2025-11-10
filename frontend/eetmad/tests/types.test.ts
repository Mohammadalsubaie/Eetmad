import type { User } from '@/lib/types/user.types';
import type { Request } from '@/lib/types/request.types';
import type { Offer } from '@/lib/types/offer.types';

// Test User type (for type validation purposes)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testUser: User = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  userType: 'client',
  verified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Test Request type (for type validation purposes)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testRequest: Request = {
  id: '1',
  title: 'Test Request',
  description: 'Test Description',
  category: 'web',
  budget: 1000,
  deadline: new Date().toISOString(),
  status: 'open',
  priority: 'medium',
  clientId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Test Offer type (for type validation purposes)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testOffer: Offer = {
  id: '1',
  requestId: '1',
  supplierId: '1',
  price: 1000,
  deliveryTime: 7,
  description: 'Test Offer',
  status: 'pending',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

console.log('✅ All types are valid!');
