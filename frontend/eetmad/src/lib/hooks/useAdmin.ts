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
    const fetchDisputes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await adminApi.getDisputes(params);
        setDisputes(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDisputes();
  }, [params]);

  return { disputes, isLoading, error };
}

export function useReports(params?: QueryParams) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await adminApi.getReports(params);
        setReports(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [params]);

  return { reports, isLoading, error };
}
