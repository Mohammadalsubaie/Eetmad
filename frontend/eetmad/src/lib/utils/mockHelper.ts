/**
 * Helper utility to check if we should use mock data
 * Works in all environments: development, demo, and production when enabled
 */

export const shouldUseMocks = (): boolean => {
  // Always enable mocks in all environments
  return true;
};
