'use client';

import { useEffect, useState } from 'react';

/**
 * MSW Provider - Initializes MSW worker in development mode
 * This component should be added to the root layout
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      // Only initialize MSW in development mode and if USE_MOCKS is enabled
      const shouldUseMocks =
        process.env.NODE_ENV === 'development' &&
        (process.env.NEXT_PUBLIC_USE_MOCKS === 'true' || typeof window !== 'undefined');

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

  // Don't render children until MSW is ready (in development)
  if (!mswReady && process.env.NODE_ENV === 'development') {
    return null;
  }

  return <>{children}</>;
}
