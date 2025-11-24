/**
 * Helper to check if we should use mock data
 * This is used across all API files
 * Works in all environments: development, demo, and production
 */
export const USE_MOCKS =
  process.env.NEXT_PUBLIC_USE_MOCKS === 'true' ||
  process.env.NEXT_PUBLIC_ENV === 'demo' ||
  process.env.NODE_ENV === 'development' ||
  true; // Always enable mocks in all environments

export const useMockData = <T>(mockData: T, apiCall: () => Promise<T>): Promise<T> => {
  if (USE_MOCKS) {
    console.log('📦 Using mock data');
    return Promise.resolve(mockData);
  }
  return apiCall().catch((error) => {
    console.warn('API call failed, using mock data:', error);
    return mockData;
  });
};
