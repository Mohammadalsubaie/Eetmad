/**
 * Helper utility to check if we should use mock data
 */

export const shouldUseMocks = (): boolean => {
  if (typeof window === 'undefined') {
    // Server-side: check env vars
    return process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || process.env.NODE_ENV === 'development';
  }
  // Client-side: always use mocks in development
  return process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
};
