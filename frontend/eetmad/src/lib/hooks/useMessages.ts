'use client';

import { useState, useEffect } from 'react';
import { messagesApi } from '@/lib/api/messages';
import type { Conversation, Message } from '@/lib/types/message.types';

export function useConversations() {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    messagesApi
      .getConversations()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
}

export function useConversation(conversationId: string) {
  const [data, setData] = useState<{ messages: Message[]; conversation: Conversation } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!conversationId) return;
    messagesApi
      .getConversation(conversationId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [conversationId]);

  return { data, isLoading, error };
}

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async ({
    conversationId,
    content,
    attachments,
  }: {
    conversationId: string;
    content: string;
    attachments?: File[];
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await messagesApi.sendMessage(conversationId, content, attachments);
      setIsLoading(false);
      return result;
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}
