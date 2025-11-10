/**
 * App configuration constants
 */

export const CONFIG = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Service Platform',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  API_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  USE_MOCKS: process.env.NEXT_PUBLIC_USE_MOCKS === 'true',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_2FA: process.env.NEXT_PUBLIC_ENABLE_2FA === 'true',
} as const;
