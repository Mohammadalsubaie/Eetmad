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
    setIsLoading(true);
    setError(null);
    faqApi
      .getAll(params)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(params)]);

  return { data, isLoading, error };
}

