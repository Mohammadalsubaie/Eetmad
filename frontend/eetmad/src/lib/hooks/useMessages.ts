'use client';

import { useState, useEffect } from 'react';
import { messagesApi } from '@/lib/api/messages';
import type {
  Conversation,
  Message,
  CreateConversationInput,
  CreateMessageInput,
} from '@/lib/types/message.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useConversations(params?: QueryParams) {
  const [data, setData] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await messagesApi.getAllConversations(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [params]);

  return { data, isLoading, error };
}

export function useConversation(id: string) {
  const [data, setData] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchConversation = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await messagesApi.getConversation(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversation();
  }, [id]);

  return { data, isLoading, error };
}

export function useMessages(conversationId: string, params?: QueryParams) {
  const [data, setData] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!conversationId) {
      setIsLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await messagesApi.getMessages(conversationId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId, params]);

  return { data, isLoading, error };
}

export function useUnreadCount() {
  const [data, setData] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await messagesApi.getUnreadCount();
        setData(result.count);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnreadCount();
  }, []);

  return { data, isLoading, error };
}

export function useCreateConversation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateConversationInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await messagesApi.createConversation(data);
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

export function useSendMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (
    conversationId: string,
    messageData: CreateMessageInput,
    attachments?: File[]
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await messagesApi.sendMessage(conversationId, messageData, attachments);
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

export function useUpdateMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, content: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await messagesApi.updateMessage(id, content);
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

export function useDeleteMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await messagesApi.deleteMessage(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}
