import type { Offer } from '@/lib/types/offer.types';
import type { Request } from '@/lib/types/request.types';
import type { User } from '@/lib/types/user.types';

// Test User type (for type validation purposes)
const _testUser: User = {
  id: '1',
  email: 'test@example.com',
  phone: '+966501234567',
  fullName: 'Test User',
  userType: 'client',
  isEmailVerified: true,
  isPhoneVerified: false,
  status: 'active',
  avatar: '',
  dateOfBirth: null,
  nationalId: null,
  companyName: null,
  commercialRegister: null,
  taxNumber: null,
  averageRating: 0,
  totalReviews: 0,
  completedProjects: 0,
  walletBalance: 0,
  address: {},
  notificationPreferences: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
};

// Test Request type (for type validation purposes)
const _testRequest: Request = {
  id: '1',
  requestNumber: 'REQ-001',
  title: 'Test Request',
  description: 'Test Description',
  categoryId: '1',
  clientId: '1',
  budgetMin: 1000,
  budgetMax: 2000,
  expectedDuration: 30,
  deadline: new Date().toISOString(),
  preferredStartDate: null,
  status: 'open',
  attachments: [],
  selectedOfferId: null,
  viewsCount: 0,
  offersCount: 0,
  requiresOnSiteVisit: false,
  location: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  publishedAt: new Date().toISOString(),
  closedAt: null,
};

// Test Offer type (for type validation purposes)
const _testOffer: Offer = {
  id: '1',
  offerNumber: 'OFF-001',
  requestId: '1',
  supplierId: '1',
  proposedPrice: 1000,
  estimatedDuration: 7,
  startDate: new Date().toISOString(),
  technicalProposal: 'Test technical proposal',
  deliverables: 'Test deliverables',
  paymentTerms: 'Test payment terms',
  attachments: [],
  status: 'pending',
  warrantyPeriod: null,
  warrantyDetails: null,
  clientNotes: null,
  adminNotes: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  acceptedAt: null,
};

// Simple test to verify types compile correctly
describe('Type Definitions', () => {
  it('should have valid User type', () => {
    expect(_testUser).toBeDefined();
    expect(_testUser.id).toBe('1');
  });

  it('should have valid Request type', () => {
    expect(_testRequest).toBeDefined();
    expect(_testRequest.id).toBe('1');
  });

  it('should have valid Offer type', () => {
    expect(_testOffer).toBeDefined();
    expect(_testOffer.id).toBe('1');
  });
});
