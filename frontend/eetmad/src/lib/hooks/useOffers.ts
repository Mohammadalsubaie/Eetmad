'use client';

import { useState, useEffect } from 'react';
import { offersApi } from '@/lib/api/offers';
import type { Offer, CreateOfferInput, UpdateOfferInput } from '@/lib/types/offer.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useOffers(params?: QueryParams) {
  const [data, setData] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offersApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [params]);

  return { data, isLoading, error };
}

export function useOffer(id: string) {
  const [data, setData] = useState<Offer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchOffer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offersApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  return { data, isLoading, error };
}

export function useOffersByRequest(requestId: string, params?: QueryParams) {
  const [data, setData] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!requestId) {
      setIsLoading(false);
      return;
    }

    const fetchOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offersApi.getByRequestId(requestId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, [requestId, params]);

  return { data, isLoading, error };
}

export function useMyOffers(params?: QueryParams) {
  const [data, setData] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMyOffers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await offersApi.getMyOffers(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOffers();
  }, [params]);

  return { data, isLoading, error };
}

export function useCreateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateOfferInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.create(data);
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

export function useUpdateOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateOfferInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.update(id, data);
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

export function useDeleteOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await offersApi.delete(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useWithdrawOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.withdraw(id);
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

export function useAcceptOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.accept(id);
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

export function useRejectOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.reject(id);
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

export function useUpdateClientNotes() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, notes: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.updateClientNotes(id, notes);
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

export function useCompareOffers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (offerIds: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await offersApi.compare(offerIds);
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
