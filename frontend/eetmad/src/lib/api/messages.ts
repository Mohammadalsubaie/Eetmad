import apiClient from './client';
import type {
  Conversation,
  Message,
  CreateConversationInput,
  CreateMessageInput,
} from '@/lib/types/message.types';
import type { QueryParams } from '@/lib/types/common.types';
import { mockConversations, mockMessages } from '@/mocks/data/messages';

const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';

export const messagesApi = {
  // Conversations
  getAllConversations: async (params?: QueryParams): Promise<Conversation[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock conversations data');
      return mockConversations;
    }
    try {
      const { data } = await apiClient.get('/v1/conversations', { params });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockConversations;
    }
  },

  getConversation: async (id: string): Promise<Conversation> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock conversation data');
      const conversation = mockConversations.find((c) => c.id === id);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      return conversation;
    }
    try {
      const { data } = await apiClient.get(`/v1/conversations/${id}`);
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      const conversation = mockConversations.find((c) => c.id === id);
      if (!conversation) {
        throw new Error('Conversation not found');
      }
      return conversation;
    }
  },

  createConversation: async (conversationData: CreateConversationInput): Promise<Conversation> => {
    const { data } = await apiClient.post<Conversation>('/v1/conversations', conversationData);
    return data;
  },

  closeConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/v1/conversations/${id}/close`);
    return data;
  },

  archiveConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/v1/conversations/${id}/archive`);
    return data;
  },

  unarchiveConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/v1/conversations/${id}/unarchive`);
    return data;
  },

  muteConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/v1/conversations/${id}/mute`);
    return data;
  },

  unmuteConversation: async (id: string): Promise<Conversation> => {
    const { data } = await apiClient.patch<Conversation>(`/v1/conversations/${id}/unmute`);
    return data;
  },

  // Messages
  getMessages: async (conversationId: string, params?: QueryParams): Promise<Message[]> => {
    if (USE_MOCKS) {
      console.log('📦 Using mock messages data');
      return mockMessages.filter((m) => m.conversationId === conversationId);
    }
    try {
      const { data } = await apiClient.get(`/v1/conversations/${conversationId}/messages`, {
        params,
      });
      return data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return mockMessages.filter((m) => m.conversationId === conversationId);
    }
  },

  sendMessage: async (
    conversationId: string,
    messageData: CreateMessageInput,
    attachments?: File[]
  ): Promise<Message> => {
    const formData = new FormData();
    formData.append('content', messageData.content);
    if (messageData.messageType) {
      formData.append('messageType', messageData.messageType);
    }
    if (attachments && attachments.length > 0) {
      attachments.forEach((file) => formData.append('attachments', file));
    }
    const { data } = await apiClient.post<Message>(
      `/v1/conversations/${conversationId}/messages`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },

  updateMessage: async (id: string, content: string): Promise<Message> => {
    const { data } = await apiClient.put<Message>(`/v1/messages/${id}`, { content });
    return data;
  },

  deleteMessage: async (id: string): Promise<void> => {
    await apiClient.delete(`/v1/messages/${id}`);
  },

  markMessageAsRead: async (id: string): Promise<Message> => {
    const { data } = await apiClient.patch<Message>(`/v1/messages/${id}/read`);
    return data;
  },

  markAllAsRead: async (conversationId: string): Promise<void> => {
    await apiClient.patch(`/v1/conversations/${conversationId}/messages/read-all`);
  },

  // Attachments
  addAttachment: async (messageId: string, file: File): Promise<{ id: string; url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post(`/v1/messages/${messageId}/attachments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  deleteAttachment: async (messageId: string, attachmentId: string): Promise<void> => {
    await apiClient.delete(`/v1/messages/${messageId}/attachments/${attachmentId}`);
  },

  // System Messages
  sendSystemMessage: async (conversationId: string, content: string): Promise<Message> => {
    const { data } = await apiClient.post<Message>(
      `/v1/conversations/${conversationId}/system-message`,
      { content }
    );
    return data;
  },

  // Query
  getUnreadCount: async (): Promise<{ count: number }> => {
    const { data } = await apiClient.get<{ count: number }>('/v1/messages/unread/count');
    return data;
  },

  searchMessages: async (query: string, params?: QueryParams): Promise<Message[]> => {
    const { data } = await apiClient.get('/v1/messages/search', {
      params: { q: query, ...params },
    });
    return data;
  },
};
