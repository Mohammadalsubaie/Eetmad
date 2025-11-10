export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired';

export interface OfferAttachment {
  id: string;
  filePath: string;
  fileType: string;
  uploadedAt: string;
}

export interface Offer {
  id: string;
  offerNumber: string;
  requestId: string;
  supplierId: string;
  proposedPrice: number;
  estimatedDuration: number; // in days
  startDate: string;
  technicalProposal: string;
  deliverables: string;
  paymentTerms: string;
  attachments: OfferAttachment[];
  status: OfferStatus;
  warrantyPeriod: number | null; // in days/months
  warrantyDetails: string | null;
  clientNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  acceptedAt: string | null;
}

export interface CreateOfferInput {
  requestId: string;
  proposedPrice: number;
  estimatedDuration: number;
  startDate: string;
  technicalProposal: string;
  deliverables: string;
  paymentTerms: string;
  attachments?: File[]; // For upload
  warrantyPeriod?: number;
  warrantyDetails?: string;
}

export interface UpdateOfferInput {
  proposedPrice?: number;
  estimatedDuration?: number;
  startDate?: string;
  technicalProposal?: string;
  deliverables?: string;
  paymentTerms?: string;
  attachments?: File[];
  status?: OfferStatus;
  warrantyPeriod?: number;
  warrantyDetails?: string;
  clientNotes?: string;
}
