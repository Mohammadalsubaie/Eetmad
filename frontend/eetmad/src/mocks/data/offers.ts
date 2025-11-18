/**
 * Mock offer data
 */

import type { Offer } from '@/lib/types/offer.types';

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    offerNumber: 'OFF-2025-001',
    requestId: '1',
    supplierId: 'supplier-1',
    proposedPrice: 85000,
    estimatedDuration: 75,
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'We will develop a comprehensive website with modern UI/UX, responsive design, and secure authentication system.',
    deliverables:
      '1. Fully functional website\n2. Admin dashboard\n3. User documentation\n4. 3 months support',
    paymentTerms: '30% upfront, 40% on milestone completion, 30% on final delivery',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 90,
    warrantyDetails: '3 months free support and bug fixes',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
  {
    id: 'offer-2',
    offerNumber: 'OFF-2025-002',
    requestId: '1',
    supplierId: 'supplier-2',
    proposedPrice: 92000,
    estimatedDuration: 90,
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'Our team specializes in government portals. We will use React, Node.js, and PostgreSQL for a scalable solution.',
    deliverables:
      '1. Website with all features\n2. Mobile responsive design\n3. Admin panel\n4. API documentation\n5. 6 months support',
    paymentTerms:
      '20% upfront, 30% on design approval, 30% on development completion, 20% on launch',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 180,
    warrantyDetails: '6 months free support and maintenance',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
  {
    id: 'offer-3',
    offerNumber: 'OFF-2025-003',
    requestId: '1',
    supplierId: 'supplier-3',
    proposedPrice: 75000,
    estimatedDuration: 60,
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    technicalProposal:
      'Fast delivery with modern tech stack. We use Next.js for optimal performance and SEO.',
    deliverables: '1. Complete website\n2. Admin dashboard\n3. User guide\n4. 1 month support',
    paymentTerms: '50% upfront, 50% on completion',
    attachments: [],
    status: 'pending',
    warrantyPeriod: 30,
    warrantyDetails: '1 month free support',
    clientNotes: null,
    adminNotes: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: null,
  },
];
