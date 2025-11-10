export type ContractStatus =
  | 'draft'
  | 'pending_client_signature'
  | 'pending_supplier_signature'
  | 'signed'
  | 'cancelled'
  | 'expired';

export interface Contract {
  id: string;
  contractNumber: string;
  projectId: string;
  contractText: string;
  termsAndConditions: string;
  paymentTerms: string;
  deliverables: string;
  warrantyTerms: string | null;
  clientSignature: string | null;
  supplierSignature: string | null;
  clientSignedAt: string | null;
  supplierSignedAt: string | null;
  status: ContractStatus;
  version: number;
  templateUsed: string | null;
  customClauses: Record<string, unknown> | null; // JSON
  createdAt: string;
  updatedAt: string;
}

export interface ContractSignature {
  contractId: string;
  userId: string;
  signatureHash: string;
  ipAddress: string;
  signedAt: string;
}

export interface CreateContractInput {
  projectId: string;
  contractText: string;
  termsAndConditions: string;
  paymentTerms: string;
  deliverables: string;
  warrantyTerms?: string;
  templateUsed?: string;
  customClauses?: Record<string, unknown>;
}

export interface UpdateContractInput {
  contractText?: string;
  termsAndConditions?: string;
  paymentTerms?: string;
  deliverables?: string;
  warrantyTerms?: string;
  customClauses?: Record<string, unknown>;
  status?: ContractStatus;
}
