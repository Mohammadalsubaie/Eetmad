/**
 * Helper utility to check if we should use mock data
 * Works in all environments: development, demo, and production when enabled
 */

export const shouldUseMocks = (): boolean => {
  const isDemo = process.env.NEXT_PUBLIC_ENV === 'demo';
  const useMocksEnabled = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (typeof window === 'undefined') {
    // Server-side: check env vars
    return isDevelopment || isDemo || useMocksEnabled;
  }
  // Client-side: use mocks in development, demo, or when explicitly enabled
  return isDevelopment || isDemo || useMocksEnabled;
};
