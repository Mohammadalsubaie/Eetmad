export type DisputeCategory = 'quality' | 'delivery' | 'payment' | 'communication' | 'other';

export type DisputeStatus = 'open' | 'in_review' | 'resolved' | 'closed' | 'escalated';

export type DisputePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface DisputeEvidence {
  id: string;
  filePath: string;
  fileType: string;
  description?: string;
  uploadedAt: string;
}

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

export interface CreateDisputeInput {
  projectId: string;
  subject: string;
  description: string;
  category: DisputeCategory;
  priority?: DisputePriority;
  evidence?: File[];
}

export interface UpdateDisputeInput {
  subject?: string;
  description?: string;
  category?: DisputeCategory;
  status?: DisputeStatus;
  priority?: DisputePriority;
  resolution?: string;
  assignedTo?: string | null;
}

export interface AddEvidenceInput {
  file: File;
  description?: string;
}

export interface AddDisputeMessageInput {
  content: string;
  messageType?: 'message' | 'evidence' | 'resolution';
  attachments?: File[];
  isInternal?: boolean;
}
