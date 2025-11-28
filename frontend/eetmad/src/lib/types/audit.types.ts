export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  changes: Record<string, unknown>;
  metadata: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}
