'use client';

import { useState, useEffect } from 'react';
import { reviewsApi } from '@/lib/api/reviews';
import type { Review } from '@/lib/types/review.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useReview(reviewId: string | null) {
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      if (!reviewId) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getById(reviewId);
        setReview(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  return {
    review,
    isLoading,
    error,
  };
}

export function useReviews(params?: QueryParams) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await reviewsApi.getAll(params);
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [JSON.stringify(params)]);

  return {
    reviews,
    isLoading,
    error,
  };
}

export function useCreateReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReview = async (reviewData: Parameters<typeof reviewsApi.create>[0]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.create(reviewData);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createReview,
    isLoading,
    error,
  };
}

export function useUpdateReview() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateReview = async (
    id: string,
    reviewData: Parameters<typeof reviewsApi.update>[1]
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await reviewsApi.update(id, reviewData);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateReview,
    isLoading,
    error,
  };
}

