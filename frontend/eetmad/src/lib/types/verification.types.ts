export type DocumentType =
  | 'national_id'
  | 'commercial_register'
  | 'tax_certificate'
  | 'license'
  | 'certificate'
  | 'other';

export type DocumentStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'expired';

export interface VerificationDocument {
  id: string;
  userId: string;
  documentType: DocumentType;
  documentNumber: string | null;
  documentUrl: string;
  backDocumentUrl: string | null;
  status: DocumentStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  reviewNotes: string | null;
  expiryDate: string | null;
  rejectionReason: string | null;
  metadata: Record<string, unknown> | null; // JSON
  createdAt: string;
  updatedAt: string;
}
