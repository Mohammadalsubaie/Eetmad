import apiClient from './client';

export const messagesApi = {
  getConversations: async () => {
    const { data } = await apiClient.get('/messages/conversations');
    return data;
  },

  getConversation: async (conversationId: string) => {
    const { data } = await apiClient.get(`/messages/conversations/${conversationId}`);
    return data;
  },

  sendMessage: async (conversationId: string, content: string, attachments?: File[]) => {
    const formData = new FormData();
    formData.append('content', content);
    if (attachments) {
      attachments.forEach((file) => formData.append('attachments', file));
    }
    const { data } = await apiClient.post(
      `/messages/conversations/${conversationId}/messages`,
      formData
    );
    return data;
  },
};
