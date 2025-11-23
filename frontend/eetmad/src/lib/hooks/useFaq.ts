'use client';

import { useState, useEffect } from 'react';
import { faqApi } from '@/lib/api/faq';
import type { QueryParams } from '@/lib/types/common.types';
import type { FAQ } from '@/lib/types/content.types';

export function useFaq(params?: QueryParams) {
  const [data, setData] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFaq = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await faqApi.getAll(params);
        setData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaq();
  }, [params]);

  return { data, isLoading, error };
}
