export interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  changes: Record<string, unknown>; // JSON
  metadata: Record<string, unknown>; // JSON
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}
