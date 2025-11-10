# Type Updates Required - Database Alignment

This document outlines all required updates to align TypeScript types with the database schema defined in `docs/database/mysql.sql`.

## Overview

The current type definitions need significant updates to match the comprehensive database schema. This document is organized by entity, listing missing fields, incorrect types, and missing type definitions.

---

## 1. User Types (`src/lib/types/user.types.ts`)

### Current Issues

- Missing many required fields from database schema
- Field names don't match database (e.g., `name` vs `fullName`)
- Missing enum types for `userType` and `status`
- Missing nested JSON structures

### Required Updates

#### Add Missing Fields:

```typescript
// Add to User interface:
- userType: 'client' | 'supplier' | 'admin' → Should be enum with proper values
- status: enum (active, inactive, suspended, banned) - MISSING
- passwordHash: string - MISSING (backend only, but types should account for it)
- isEmailVerified: boolean - MISSING (currently only has 'verified' boolean)
- isPhoneVerified: boolean - MISSING
- fullName: string - MISSING (currently using 'name')
- dateOfBirth: date - MISSING
- nationalId: string - MISSING
- companyName: string - MISSING
- commercialRegister: string - MISSING
- taxNumber: string - MISSING
- averageRating: decimal - MISSING
- totalReviews: int - MISSING
- completedProjects: int - MISSING
- walletBalance: decimal - MISSING
- address: json - MISSING (structured object)
- notificationPreferences: json - MISSING (structured object)
- lastLoginAt: timestamp - MISSING
```

#### Field Name Changes:

- `name` → `fullName`
- `verified` → `isEmailVerified` (and add `isPhoneVerified`)

#### Add New Types:

```typescript
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned';
export type UserType = 'client' | 'supplier' | 'admin';

export interface UserAddress {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NotificationPreferences {
  email?: {
    requests?: boolean;
    offers?: boolean;
    messages?: boolean;
    reviews?: boolean;
    system?: boolean;
  };
  push?: {
    requests?: boolean;
    offers?: boolean;
    messages?: boolean;
    reviews?: boolean;
    system?: boolean;
  };
  sms?: {
    important?: boolean;
    security?: boolean;
  };
}
```

#### Update UserProfile:

- Remove fields that should be in User base interface
- Add fields that are truly profile-specific

---

## 2. Supplier Types (`src/lib/types/supplier.types.ts`)

### Current Issues

- `Supplier` interface mixes User and SupplierProfile data
- Missing many SupplierProfile fields
- Categories stored as string array, should be array of Category objects with `isPrimary` flag
- Missing statistics fields

### Required Updates

#### Create Separate SupplierProfile Type:

```typescript
export interface SupplierProfile {
  id: string;
  userId: string;
  categories: SupplierCategory[]; // Changed from string[]
  serviceDescription: string; // Changed from description
  portfolio: PortfolioItem[]; // Keep but verify structure
  certifications: Certification[]; // Changed from certificates, verify structure
  workingHours: WorkingHours; // Keep but verify structure matches DB
  responseTime: number; // MISSING - in minutes/hours
  acceptanceRate: number; // MISSING - decimal 0-100
  onTimeDelivery: number; // MISSING - decimal 0-100
  isVerified: boolean; // Keep
  verificationDate: string | null; // MISSING
  verificationNotes: string | null; // MISSING
  createdAt: string;
  updatedAt: string;
}
```

#### Add SupplierCategory Type:

```typescript
export interface SupplierCategory {
  id: string;
  supplierId: string;
  categoryId: string;
  category?: Category; // Optional expanded category
  isPrimary: boolean; // MISSING
  createdAt: string;
}
```

#### Update PortfolioItem:

```typescript
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[]; // Verify this matches DB JSON structure
  category: string;
  completedAt: string;
  // Add any additional fields from DB JSON structure
}
```

#### Update Certification:

```typescript
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedAt: string;
  expiryDate?: string;
  fileUrl: string;
  // Verify this matches DB JSON structure for certifications
}
```

---

## 3. Category Types (MISSING - Need to Create)

### Required: Create `src/lib/types/category.types.ts`

```typescript
export interface Category {
  id: string;
  nameAr: string; // MISSING
  nameEn: string; // MISSING
  parentId: string | null; // MISSING
  icon: string; // MISSING
  description: string; // MISSING
  isActive: boolean; // MISSING
  sortOrder: number; // MISSING
  createdAt: string;
  updatedAt: string;
  // Optional nested
  parent?: Category;
  children?: Category[];
}

export interface CategoryTree extends Category {
  subcategories?: Category[];
  // Statistics
  supplierCount?: number;
  requestCount?: number;
}
```

---

## 4. Request Types (`src/lib/types/request.types.ts`)

### Current Issues

- Missing `requestNumber` field
- `budget` should be `budgetMin` and `budgetMax`
- Missing many fields
- `category` is string, should be `categoryId` with optional Category object
- Status enum incomplete

### Required Updates

#### Update Request Interface:

```typescript
export type RequestStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled' | 'closed'; // Add 'closed'

export interface Request {
  id: string;
  requestNumber: string; // MISSING - unique identifier
  clientId: string;
  title: string;
  description: string;
  categoryId: string; // Changed from category: string
  category?: Category; // Optional expanded category
  budgetMin: number | null; // Changed from budget: number
  budgetMax: number | null; // MISSING
  expectedDuration: number; // MISSING - in days
  deadline: string; // Keep
  preferredStartDate: string | null; // MISSING
  attachments: RequestAttachment[]; // Changed from string[] to structured array
  status: RequestStatus;
  selectedOfferId: string | null; // MISSING
  viewsCount: number; // MISSING
  offersCount: number; // MISSING
  requiresOnSiteVisit: boolean; // MISSING
  location: RequestLocation | null; // MISSING - JSON structure
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null; // MISSING
  closedAt: string | null; // MISSING
  // Remove priority - not in DB schema
}
```

#### Add New Types:

```typescript
export interface RequestAttachment {
  id: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

export interface RequestLocation {
  address?: string;
  city?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  requiresOnSiteVisit: boolean;
}
```

#### Update CreateRequestInput:

```typescript
export interface CreateRequestInput {
  title: string;
  description: string;
  categoryId: string; // Changed from category
  budgetMin?: number;
  budgetMax?: number;
  expectedDuration: number; // Add
  deadline: string;
  preferredStartDate?: string; // Add
  attachments?: File[]; // For upload
  requiresOnSiteVisit: boolean; // Add
  location?: RequestLocation; // Add
}
```

---

## 5. Offer Types (`src/lib/types/offer.types.ts`)

### Current Issues

- Missing `offerNumber` field
- Field names don't match (e.g., `price` vs `proposedPrice`, `deliveryTime` vs `estimatedDuration`)
- Missing many fields (warranty, notes, etc.)
- Status enum incomplete

### Required Updates

#### Update Offer Interface:

```typescript
export type OfferStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn' | 'expired'; // Add if needed

export interface Offer {
  id: string;
  offerNumber: string; // MISSING - unique identifier
  requestId: string;
  supplierId: string;
  proposedPrice: number; // Changed from price
  estimatedDuration: number; // Changed from deliveryTime (in days)
  startDate: string; // MISSING - date
  technicalProposal: string; // Changed from description
  deliverables: string; // MISSING
  paymentTerms: string; // MISSING
  attachments: OfferAttachment[]; // Changed from string[]
  status: OfferStatus;
  warrantyPeriod: number | null; // MISSING - in days/months
  warrantyDetails: string | null; // MISSING
  clientNotes: string | null; // MISSING
  adminNotes: string | null; // MISSING
  createdAt: string;
  updatedAt: string;
  acceptedAt: string | null; // MISSING
}
```

#### Add New Types:

```typescript
export interface OfferAttachment {
  id: string;
  filePath: string;
  fileType: string;
  uploadedAt: string;
}
```

#### Update CreateOfferInput:

```typescript
export interface CreateOfferInput {
  requestId: string;
  proposedPrice: number; // Changed from price
  estimatedDuration: number; // Changed from deliveryTime
  startDate: string; // Add
  technicalProposal: string; // Changed from description
  deliverables: string; // Add
  paymentTerms: string; // Add
  attachments?: File[]; // For upload
  warrantyPeriod?: number; // Add
  warrantyDetails?: string; // Add
}
```

---

## 6. Project Types (`src/lib/types/project.types.ts`)

### Current Issues

- Missing `projectNumber` field
- Missing `offerId` and `contractId`
- Missing amount breakdown (deposit, final)
- Missing many fields
- Milestone structure incomplete

### Required Updates

#### Update Project Interface:

```typescript
export type ProjectStatus =
  | 'draft'
  | 'pending_contract'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export interface Project {
  id: string;
  projectNumber: string; // MISSING - unique identifier
  requestId: string;
  offerId: string; // MISSING
  clientId: string;
  supplierId: string;
  contractId: string | null; // MISSING
  totalAmount: number; // Changed from budget
  depositAmount: number; // MISSING
  finalAmount: number; // MISSING
  status: ProjectStatus;
  startDate: string;
  expectedEndDate: string; // Changed from endDate
  actualEndDate: string | null; // MISSING
  deliveryProof: DeliveryProof[]; // MISSING - JSON array
  deliveryNotes: string; // MISSING
  approvedByClient: boolean; // MISSING
  approvalDate: string | null; // MISSING
  progress: number; // MISSING - 0-100 percentage
  milestones: ProjectMilestone[]; // Keep but update structure
  createdAt: string;
  updatedAt: string;
}
```

#### Update Milestone Interface:

```typescript
export type MilestoneStatus = 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected';

export interface ProjectMilestone {
  id: string;
  projectId: string;
  milestoneNumber: number; // MISSING
  title: string;
  description: string;
  amount: number;
  dueDate: string; // Changed from dueDate
  status: MilestoneStatus; // Updated
  deliverables: string | null; // MISSING
  attachments: MilestoneAttachment[] | null; // MISSING
  completedAt: string | null;
  approvedAt: string | null; // MISSING
  paymentReleased: boolean; // MISSING
  notes: string | null; // MISSING
  sortOrder: number; // MISSING
  createdAt: string;
  updatedAt: string;
}
```

#### Add New Types:

```typescript
export interface DeliveryProof {
  id: string;
  filePath: string;
  fileType: string;
  description?: string;
  uploadedAt: string;
}

export interface MilestoneAttachment {
  id: string;
  filePath: string;
  fileType: string;
  uploadedAt: string;
}
```

---

## 7. Contract Types (MISSING - Need to Create)

### Required: Create `src/lib/types/contract.types.ts`

```typescript
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
  customClauses: Record<string, any> | null; // JSON
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
```

---

## 8. Payment Types (`src/lib/types/payment.types.ts`)

### Current Issues

- Very basic structure
- Missing many payment-related entities
- Missing PaymentGatewayTransaction
- Missing WalletTransaction
- Missing Refund

### Required Updates

#### Update Payment Interface:

```typescript
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
  transactionId: string; // MISSING - unique identifier
  projectId: string;
  milestoneId: string | null; // MISSING
  payerId: string; // Changed from walletId reference
  receiverId: string; // MISSING
  amount: number;
  currency: string; // MISSING - default 'SAR' or 'USD'
  paymentType: PaymentType; // Changed from type
  paymentStage: PaymentStage; // MISSING
  paymentMethod: PaymentMethod; // Changed from type reference
  paymentGateway: string; // MISSING
  status: PaymentStatus;
  platformFee: number; // MISSING
  netAmount: number; // MISSING
  gatewayResponse: Record<string, any>; // MISSING - JSON
  ipAddress: string; // MISSING
  userAgent: string; // MISSING
  notes: string | null; // MISSING
  failureReason: string | null; // MISSING
  refundAmount: number | null; // MISSING
  refundedAt: string | null; // MISSING
  createdAt: string;
  updatedAt: string;
  completedAt: string | null; // MISSING
}
```

#### Add PaymentGatewayTransaction:

```typescript
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
  requestPayload: Record<string, any>; // JSON
  responsePayload: Record<string, any>; // JSON
  webhookData: Record<string, any> | null; // JSON
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
```

#### Update WalletTransaction (separate from Transaction):

```typescript
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
```

#### Update Wallet Interface:

```typescript
export interface Wallet {
  id: string; // Remove if not in DB
  userId: string;
  balance: number;
  currency: string;
  // Add if in DB:
  // frozenBalance?: number;
  // pendingBalance?: number;
}
```

#### Add Refund Interface:

```typescript
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
```

#### Remove/Update Transaction Interface:

- The current `Transaction` interface seems to be a generic wallet transaction
- Should be replaced with `WalletTransaction` above

---

## 9. Review Types (`src/lib/types/review.types.ts`)

### Current Issues

- Missing many fields
- Missing sub-ratings (quality, communication, etc.)
- Missing review type and status
- Missing helpful counts

### Required Updates

#### Update Review Interface:

```typescript
export type ReviewType = 'client_to_supplier' | 'supplier_to_client';

export type ReviewStatus = 'pending' | 'published' | 'hidden' | 'reported';

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewedId: string; // Changed from revieweeId
  rating: number; // 1-5
  reviewType: ReviewType; // MISSING
  title: string; // MISSING
  comment: string; // Keep
  qualityRating: number | null; // MISSING - 1-5
  communicationRating: number | null; // MISSING - 1-5
  timelinessRating: number | null; // MISSING - 1-5
  professionalismRating: number | null; // MISSING - 1-5
  status: ReviewStatus; // MISSING
  isVerified: boolean; // MISSING
  response: string | null; // Keep but verify
  respondedAt: string | null; // MISSING
  helpfulCount: number; // MISSING
  notHelpfulCount: number; // MISSING
  createdAt: string;
  updatedAt: string;
}
```

#### Update ReviewStats:

```typescript
export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    five: number;
    four: number;
    three: number;
    two: number;
    one: number;
  };
  // Add sub-ratings averages
  averageQualityRating?: number;
  averageCommunicationRating?: number;
  averageTimelinessRating?: number;
  averageProfessionalismRating?: number;
}
```

---

## 10. Message Types (`src/lib/types/message.types.ts`)

### Current Issues

- Missing Conversation fields (requestId, offerId, projectId)
- Missing message type and system message flag
- Attachment structure might need update

### Required Updates

#### Update Conversation Interface:

```typescript
export type ConversationStatus = 'active' | 'archived' | 'closed';

export interface Conversation {
  id: string;
  requestId: string | null; // MISSING
  offerId: string | null; // MISSING
  projectId: string | null; // MISSING
  participants: string[]; // Keep but verify - might need Participant[]
  lastMessageId: string | null; // MISSING
  lastMessage?: Message; // Keep
  lastMessageAt: string; // MISSING
  status: ConversationStatus; // MISSING
  unreadCount: number; // Keep
  createdAt: string; // MISSING
  updatedAt: string; // Keep
}
```

#### Update Message Interface:

```typescript
export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType; // MISSING
  attachments: Attachment[]; // Keep but verify structure
  isRead: boolean; // Changed from read
  readAt: string | null; // MISSING
  isSystemMessage: boolean; // MISSING
  createdAt: string;
  updatedAt: string; // MISSING
}
```

#### Update Attachment Interface:

```typescript
export interface Attachment {
  id: string;
  name: string;
  url: string; // Might need filePath instead
  type: string;
  size: number;
  // Add if needed:
  // filePath?: string;
  // uploadedAt?: string;
}
```

---

## 11. Notification Types (`src/lib/types/notification.types.ts`)

### Current Issues

- Missing many fields
- Missing channels and sentVia
- Type enum incomplete

### Required Updates

#### Update Notification Interface:

```typescript
export type NotificationType =
  | 'request'
  | 'offer'
  | 'project'
  | 'message'
  | 'review'
  | 'payment'
  | 'contract'
  | 'dispute'
  | 'system'
  | 'verification';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string; // Changed from message
  type: NotificationType;
  referenceType: string | null; // MISSING - e.g., 'request', 'project'
  referenceId: string | null; // MISSING - UUID
  actionUrl: string | null; // MISSING
  isRead: boolean; // Changed from read
  readAt: string | null; // MISSING
  channels: NotificationChannels; // MISSING - JSON
  sentVia: NotificationSentVia; // MISSING - JSON
  createdAt: string;
  // Remove link and metadata - replace with actionUrl and referenceType/Id
}
```

#### Add New Types:

```typescript
export interface NotificationChannels {
  inApp: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface NotificationSentVia {
  inApp: boolean;
  email: boolean;
  sms: boolean;
  push: boolean;
}
```

---

## 12. Missing Types - Need to Create New Files

### 12.1 Dispute Types - Create `src/lib/types/dispute.types.ts`

```typescript
export type DisputeCategory = 'quality' | 'delivery' | 'payment' | 'communication' | 'other';

export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'closed' | 'escalated';

export type DisputePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Dispute {
  id: string;
  disputeNumber: string;
  projectId: string;
  raisedBy: string;
  against: string;
  subject: string;
  description: string;
  category: DisputeCategory;
  evidence: DisputeEvidence[]; // JSON array
  status: DisputeStatus;
  resolution: string | null;
  resolvedBy: string | null;
  resolvedAt: string | null;
  assignedTo: string | null;
  priority: DisputePriority;
  createdAt: string;
  updatedAt: string;
}

export interface DisputeEvidence {
  id: string;
  filePath: string;
  fileType: string;
  description?: string;
  uploadedAt: string;
}

export interface DisputeMessage {
  id: string;
  disputeId: string;
  senderId: string;
  messageType: 'message' | 'evidence' | 'resolution';
  content: string;
  attachments: DisputeEvidence[] | null;
  isInternal: boolean;
  createdAt: string;
}
```

### 12.2 Verification Document Types - Create `src/lib/types/verification.types.ts`

```typescript
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
  metadata: Record<string, any> | null; // JSON
  createdAt: string;
  updatedAt: string;
}
```

### 12.3 OTP Verification Types - Create `src/lib/types/otp.types.ts`

```typescript
export type OTPPurpose =
  | 'email_verification'
  | 'phone_verification'
  | 'password_reset'
  | 'login'
  | 'transaction';

export type OTPChannel = 'email' | 'sms';

export interface OTPVerification {
  id: string;
  userId: string;
  otpCode: string;
  purpose: OTPPurpose;
  channel: OTPChannel;
  isUsed: boolean;
  expiresAt: string;
  attemptCount: number;
  maxAttempts: number;
  createdAt: string;
  usedAt: string | null;
}
```

### 12.4 Audit Log Types - Create `src/lib/types/audit.types.ts`

```typescript
export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  changes: Record<string, any>; // JSON
  metadata: Record<string, any>; // JSON
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}
```

### 12.5 Content Page Types - Create `src/lib/types/content.types.ts`

```typescript
export type PageType = 'about' | 'terms' | 'privacy' | 'faq' | 'help' | 'custom';

export type PageStatus = 'draft' | 'published' | 'archived';

export interface ContentPage {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  pageType: PageType;
  status: PageStatus;
  metaDescription: string | null;
  metaKeywords: string | null;
  displayOrder: number;
  isPublished: boolean;
  publishedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.6 FAQ Types - Add to `src/lib/types/content.types.ts`

```typescript
export interface FAQ {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  categoryId: string | null;
  displayOrder: number;
  isPublished: boolean;
  viewCount: number;
  helpfulCount: number;
  notHelpfulCount: number;
  createdAt: string;
  updatedAt: string;
}
```

### 12.7 System Settings Types - Create `src/lib/types/settings.types.ts`

```typescript
export type SettingDataType = 'string' | 'number' | 'boolean' | 'json' | 'date';

export interface SystemSetting {
  id: string;
  settingKey: string;
  settingValue: string;
  dataType: SettingDataType;
  category: string;
  description: string | null;
  isPublic: boolean;
  isEditable: boolean;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.8 Platform Commission Types - Create `src/lib/types/commission.types.ts`

```typescript
export type CommissionType = 'percentage' | 'fixed';

export interface PlatformCommission {
  id: string;
  categoryId: string | null;
  userType: 'client' | 'supplier' | null;
  minAmount: number | null;
  maxAmount: number | null;
  commissionType: CommissionType;
  commissionValue: number;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.9 Saved Search Types - Create `src/lib/types/search.types.ts`

```typescript
export interface SavedSearch {
  id: string;
  userId: string;
  searchName: string;
  filters: Record<string, any>; // JSON
  notifyOnMatch: boolean;
  lastNotifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.10 Bookmark Types - Create `src/lib/types/bookmark.types.ts`

```typescript
export type BookmarkReferenceType = 'request' | 'offer' | 'supplier' | 'project';

export interface Bookmark {
  id: string;
  userId: string;
  referenceType: BookmarkReferenceType;
  referenceId: string;
  notes: string | null;
  createdAt: string;
}
```

### 12.11 Report Types - Create `src/lib/types/report.types.ts`

```typescript
export type ReportEntityType = 'user' | 'request' | 'offer' | 'project' | 'review' | 'message';

export type ReportReason =
  | 'spam'
  | 'inappropriate_content'
  | 'fraud'
  | 'harassment'
  | 'fake_profile'
  | 'other';

export type ReportStatus = 'pending' | 'under_review' | 'resolved' | 'dismissed';

export interface Report {
  id: string;
  reportedBy: string;
  reportedEntityType: ReportEntityType;
  reportedEntityId: string;
  reportedUserId: string | null;
  reason: ReportReason;
  description: string;
  evidence: Record<string, any> | null; // JSON
  status: ReportStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  actionTaken: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### 12.12 Promotion Types - Create `src/lib/types/promotion.types.ts`

```typescript
export type DiscountType = 'percentage' | 'fixed';

export interface PromotionCampaign {
  id: string;
  campaignCode: string;
  nameAr: string;
  nameEn: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchaseAmount: number | null;
  maxDiscountAmount: number | null;
  usageLimit: number | null;
  usageCount: number;
  userType: 'client' | 'supplier' | null;
  categoryId: string | null;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface PromotionUsage {
  id: string;
  promotionId: string;
  userId: string;
  projectId: string | null;
  discountAmount: number;
  usedAt: string;
}
```

### 12.13 Subscription Types - Create `src/lib/types/subscription.types.ts`

```typescript
export type SubscriptionPlanType = 'basic' | 'premium' | 'enterprise' | 'custom';

export type BillingCycle = 'monthly' | 'quarterly' | 'yearly' | 'lifetime';

export type SubscriptionStatus = 'active' | 'expired' | 'cancelled' | 'pending' | 'suspended';

export interface Subscription {
  id: string;
  userId: string;
  planName: string;
  planType: SubscriptionPlanType;
  features: Record<string, any>; // JSON
  price: number;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  paymentMethod: string | null;
  lastPaymentDate: string | null;
  nextPaymentDate: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

## 13. Update Index File (`src/lib/types/index.ts`)

Add exports for all new types:

```typescript
// ... existing exports ...

// Category types
export * from './category.types';

// Contract types
export * from './contract.types';

// Dispute types
export * from './dispute.types';

// Verification types
export * from './verification.types';

// OTP types
export * from './otp.types';

// Audit types
export * from './audit.types';

// Content types
export * from './content.types';

// Settings types
export * from './settings.types';

// Commission types
export * from './commission.types';

// Search types
export * from './search.types';

// Bookmark types
export * from './bookmark.types';

// Report types
export * from './report.types';

// Promotion types
export * from './promotion.types';

// Subscription types
export * from './subscription.types';
```

---

## 14. Mock Data Updates Required

Update mock data files to match new type structures:

### 14.1 `src/mocks/data/users.ts`

- Update to use `fullName` instead of `name`
- Add all missing User fields
- Add proper status and userType enums

### 14.2 `src/mocks/data/suppliers.ts`

- Update to match SupplierProfile structure
- Update categories to use SupplierCategory array
- Add all missing fields

### 14.3 `src/mocks/data/requests.ts`

- Add `requestNumber`
- Change `budget` to `budgetMin` and `budgetMax`
- Change `category` to `categoryId`
- Add all missing fields

### 14.4 `src/mocks/data/offers.ts`

- Add `offerNumber`
- Change field names to match DB
- Add all missing fields

### 14.5 `src/mocks/data/projects.ts`

- Add `projectNumber`, `offerId`, `contractId`
- Update amount fields
- Update milestone structure
- Add all missing fields

### 14.6 `src/mocks/data/messages.ts`

- Update Conversation structure
- Update Message structure
- Add missing fields

---

## 15. Priority Order for Updates

### Phase 1: Core Entities (High Priority)

1. User types
2. Category types (new)
3. Request types
4. Offer types
5. Project types

### Phase 2: Supporting Entities (Medium Priority)

6. Contract types (new)
7. Payment types (major update)
8. Review types
9. Message/Conversation types
10. Notification types

### Phase 3: Extended Features (Lower Priority)

11. SupplierProfile types
12. Dispute types (new)
13. Verification types (new)
14. All other missing types

---

## 16. Breaking Changes Summary

### Field Name Changes:

- `User.name` → `User.fullName`
- `User.verified` → `User.isEmailVerified` (+ add `isPhoneVerified`)
- `Request.category` → `Request.categoryId`
- `Request.budget` → `Request.budgetMin` and `Request.budgetMax`
- `Offer.price` → `Offer.proposedPrice`
- `Offer.deliveryTime` → `Offer.estimatedDuration`
- `Project.budget` → `Project.totalAmount`
- `Message.read` → `Message.isRead`
- `Notification.message` → `Notification.body`
- `Notification.read` → `Notification.isRead`

### Type Changes:

- `RequestStatus` - Add 'closed'
- `OfferStatus` - Verify enum values
- `ProjectStatus` - Major update with new values
- `PaymentStatus` - Major update
- Many new enum types needed

### Structural Changes:

- `Supplier` split into `User` + `SupplierProfile`
- `Request.attachments` - Change from `string[]` to `RequestAttachment[]`
- `Offer.attachments` - Change from `string[]` to `OfferAttachment[]`
- `Project.milestones` - Update structure
- Many new interfaces needed

---

## 17. Migration Checklist

- [ ] Update User types
- [ ] Create Category types
- [ ] Update Request types
- [ ] Update Offer types
- [ ] Update Project types
- [ ] Create Contract types
- [ ] Update Payment types (major)
- [ ] Create WalletTransaction types
- [ ] Create PaymentGatewayTransaction types
- [ ] Create Refund types
- [ ] Update Review types
- [ ] Update Message/Conversation types
- [ ] Update Notification types
- [ ] Create Dispute types
- [ ] Create Verification types
- [ ] Create OTP types
- [ ] Create Audit types
- [ ] Create Content/FAQ types
- [ ] Create Settings types
- [ ] Create Commission types
- [ ] Create Search/Bookmark types
- [ ] Create Report types
- [ ] Create Promotion types
- [ ] Create Subscription types
- [ ] Update SupplierProfile types
- [ ] Update index.ts exports
- [ ] Update mock data files
- [ ] Update components using old types
- [ ] Update API client files
- [ ] Run TypeScript compiler to catch errors
- [ ] Update tests

---

## 18. Notes

1. **Enum Values**: Verify all enum values match backend implementation. Some enums in the SQL are not fully specified - coordinate with backend team.

2. **JSON Fields**: Fields marked as JSON in the database should be typed as:
   - Simple objects: `Record<string, any>`
   - Structured objects: Create specific interfaces (e.g., `UserAddress`, `NotificationChannels`)

3. **Optional vs Required**: Fields marked as `NULL` in the database should be optional (`| null`) in TypeScript. Fields marked as `NOT NULL` should be required.

4. **Date/Time Fields**: All date fields in the database are `timestamp` or `date`. In TypeScript, use `string` (ISO 8601 format) for consistency with API responses.

5. **UUID Fields**: All IDs in the database are UUIDs. TypeScript types should use `string` type.

6. **Decimal Fields**: Database `decimal` types should be `number` in TypeScript (JavaScript doesn't have a decimal type).

7. **Incremental Updates**: Make updates incrementally, testing after each major change to catch issues early.

8. **Backward Compatibility**: Consider creating migration utilities or keeping old type names as aliases during transition period if needed.

---

## End of Document

This document should be updated as types are modified to track progress. Once all types are aligned, this document can serve as a reference for the type structure.
