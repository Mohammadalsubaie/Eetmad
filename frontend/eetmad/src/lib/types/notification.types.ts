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

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string; // Changed from message
  type: NotificationType;
  referenceType: string | null; // e.g., 'request', 'project'
  referenceId: string | null; // UUID
  actionUrl: string | null; // Changed from link
  isRead: boolean; // Changed from read
  readAt: string | null;
  channels: NotificationChannels; // JSON
  sentVia: NotificationSentVia; // JSON
  createdAt: string;
}
