'use client';

import { useEffect, useState } from 'react';

/**
 * MSW Provider - Initializes MSW worker in development, demo, and production mode
 * This component should be added to the root layout
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      // Initialize MSW when enabled via environment variables
      // Works in all environments: development, demo, and production
      // MSW only works in the browser (client-side)
      const isDemo = process.env.NEXT_PUBLIC_ENV === 'demo';
      const useMocksEnabled = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';
      const isDevelopment = process.env.NODE_ENV === 'development';

      const shouldUseMocks =
        typeof window !== 'undefined' && (isDevelopment || isDemo || useMocksEnabled);

      if (shouldUseMocks) {
        try {
          const { worker } = await import('@/mocks/browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
            serviceWorker: {
              url: '/mockServiceWorker.js',
            },
          });
          setMswReady(true);
          console.log('✅ MSW worker started');
        } catch (error) {
          console.error('Failed to start MSW worker:', error);
          setMswReady(true); // Continue anyway
        }
      } else {
        setMswReady(true);
      }
    };

    initMsw();
  }, []);

  // Don't render children until MSW is ready
  if (!mswReady) {
    return null;
  }

  return <>{children}</>;
}
