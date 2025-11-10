export type ConversationStatus = 'active' | 'archived' | 'closed';

export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  filePath?: string; // Alternative to url
  type: string;
  size: number;
  uploadedAt?: string;
}

export interface Conversation {
  id: string;
  requestId: string | null;
  offerId: string | null;
  projectId: string | null;
  participants: string[]; // Array of user IDs
  lastMessageId: string | null;
  lastMessage?: Message;
  lastMessageAt: string;
  status: ConversationStatus;
  unreadCount: number; // Calculated field, not in DB
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  attachments: Attachment[];
  isRead: boolean; // Changed from read
  readAt: string | null;
  isSystemMessage: boolean;
  createdAt: string;
  updatedAt: string;
}
