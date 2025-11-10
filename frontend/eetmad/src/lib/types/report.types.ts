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
  evidence: Record<string, unknown> | null; // JSON
  status: ReportStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  actionTaken: string | null;
  createdAt: string;
  updatedAt: string;
}
