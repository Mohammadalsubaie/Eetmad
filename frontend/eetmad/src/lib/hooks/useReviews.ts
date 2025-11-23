'use client';

import { useState, useEffect } from 'react';
import { reviewsApi } from '@/lib/api/reviews';
import type {
  Review,
  ReviewStats,
  CreateReviewInput,
  UpdateReviewInput,
} from '@/lib/types/review.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useReviews(params?: QueryParams) {
  const [data, setData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [params]);

  return { data, isLoading, error };
}

export function useReview(id: string) {
  const [data, setData] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchReview = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getById(id);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [id]);

  return { data, isLoading, error };
}

export function useReviewsByProject(projectId: string, params?: QueryParams) {
  const [data, setData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!projectId) {
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getByProject(projectId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [projectId, params]);

  return { data, isLoading, error };
}

export function useReviewsBySupplier(supplierId: string, params?: QueryParams) {
  const [data, setData] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!supplierId) {
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getBySupplier(supplierId, params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [supplierId, params]);

  return { data, isLoading, error };
}

export function useSupplierReviewStats(supplierId: string) {
  const [data, setData] = useState<ReviewStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!supplierId) {
      setIsLoading(false);
      return;
    }

    const fetchStatistics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getSupplierStatistics(supplierId);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatistics();
  }, [supplierId]);

  return { data, isLoading, error };
}

export function useCreateReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (data: CreateReviewInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.create(data);
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

export function useUpdateReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, data: UpdateReviewInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.update(id, data);
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

export function useDeleteReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await reviewsApi.delete(id);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}

export function useRespondToReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, response: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.respond(id, response);
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

export function useMarkHelpful() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.markHelpful(id);
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

export function useMarkNotHelpful() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.markNotHelpful(id);
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

export function useReportReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async (id: string, reason: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await reviewsApi.report(id, reason);
      setIsLoading(false);
    } catch (err) {
      setError(err as Error);
      setIsLoading(false);
      throw err;
    }
  };

  return { mutate, isLoading, error };
}
