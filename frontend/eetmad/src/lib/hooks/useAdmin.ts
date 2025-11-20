'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api/admin';
import type { VerificationDocument } from '@/lib/types/verification.types';
import type { Dispute } from '@/lib/types/dispute.types';
import type { Report } from '@/lib/types/report.types';
import type { QueryParams } from '@/lib/types/common.types';

export function useVerificationQueue() {
  const [documents, setDocuments] = useState<VerificationDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await adminApi.getVerificationQueue();
        setDocuments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, isLoading, error };
}

export function useDisputes(params?: QueryParams) {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    adminApi
      .getDisputes(params)
      .then((data) => setDisputes(Array.isArray(data) ? data : []))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(params)]);

  return { disputes, isLoading, error };
}

export function useReports(params?: QueryParams) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    adminApi
      .getReports(params)
      .then((data) => setReports(Array.isArray(data) ? data : []))
      .catch((err) => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setIsLoading(false));
  }, [JSON.stringify(params)]);

  return { reports, isLoading, error };
}

