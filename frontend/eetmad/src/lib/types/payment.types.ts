// Payment Types
export type PaymentType = 'deposit' | 'milestone' | 'final' | 'refund' | 'withdrawal';

export type PaymentStage =
  | 'initiated'
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'credit_card' | 'debit_card' | 'bank_transfer' | 'wallet' | 'cash';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

export interface Payment {
  id: string;
  transactionId: string; // unique identifier
  projectId: string;
  milestoneId: string | null;
  payerId: string;
  receiverId: string;
  amount: number;
  currency: string; // default 'SAR' or 'USD'
  paymentType: PaymentType;
  paymentStage: PaymentStage;
  paymentMethod: PaymentMethod;
  paymentGateway: string;
  status: PaymentStatus;
  platformFee: number;
  netAmount: number;
  gatewayResponse: Record<string, unknown>; // JSON
  ipAddress: string;
  userAgent: string;
  notes: string | null;
  failureReason: string | null;
  refundAmount: number | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

// Payment Gateway Transaction Types
export type GatewayTransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired';

export interface PaymentGatewayTransaction {
  id: string;
  paymentId: string;
  gatewayName: string;
  gatewayTransactionId: string;
  gatewayOrderId: string;
  amount: number;
  currency: string;
  status: GatewayTransactionStatus;
  requestPayload: Record<string, unknown>; // JSON
  responsePayload: Record<string, unknown>; // JSON
  webhookData: Record<string, unknown> | null; // JSON
  cardType: string | null;
  cardLastFour: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  successUrl: string | null;
  failureUrl: string | null;
  callbackUrl: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// Wallet Types
export interface Wallet {
  id?: string; // Optional if not in DB
  userId: string;
  balance: number;
  currency: string;
  // Add if in DB:
  // frozenBalance?: number;
  // pendingBalance?: number;
}

// Wallet Transaction Types
export type WalletTransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'payment'
  | 'refund'
  | 'commission'
  | 'fee';

export type WalletTransactionReferenceType = 'payment' | 'project' | 'refund' | 'commission';

export type WalletTransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';

export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  type: WalletTransactionType;
  referenceType: WalletTransactionReferenceType;
  referenceId: string;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  status: WalletTransactionStatus;
  createdAt: string;
}

// Refund Types
export type RefundStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'processing'
  | 'completed'
  | 'cancelled';

export type RefundMethod = 'original_method' | 'wallet' | 'bank_transfer';

export interface Refund {
  id: string;
  refundNumber: string;
  paymentId: string;
  requestedBy: string;
  approvedBy: string | null;
  amount: number;
  reason: string;
  status: RefundStatus;
  refundMethod: RefundMethod;
  gatewayRefundId: string | null;
  processedAt: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

// Bank Account Types (keeping for backward compatibility, may need update)
export interface BankAccount {
  id: string;
  userId: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  iban?: string;
  isDefault: boolean;
  verified?: boolean;
}

// Input Types
export interface CreatePaymentInput {
  projectId: string;
  milestoneId?: string | null;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  notes?: string | null;
}

export interface InitiatePaymentInput {
  projectId: string;
  milestoneId?: string | null;
  amount: number;
  paymentType: PaymentType;
  paymentMethod: PaymentMethod;
  gateway?: string;
  notes?: string | null;
}

export interface RefundRequestInput {
  amount?: number; // Optional for full refund
  reason: string;
  refundMethod?: RefundMethod;
}
