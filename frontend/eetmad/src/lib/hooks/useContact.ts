'use client';

import { useState } from 'react';
import { contactApi } from '@/lib/api/contact';
import type { ContactFormInput, ContactFormResponse } from '@/lib/types/contact.types';

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<ContactFormResponse | null>(null);

  const submit = async (formData: ContactFormInput) => {
    setIsSubmitting(true);
    setError(null);
    setResponse(null);
    try {
      const result = await contactApi.submitContactForm(formData);
      setResponse(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
    error,
    response,
  };
}
