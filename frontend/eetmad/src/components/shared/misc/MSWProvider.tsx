'use client';

import { useEffect } from 'react';

/**
 * MSW Provider - Initializes MSW worker in development, demo, and production mode
 * This component should be added to the root layout
 * 
 * Note: This component no longer blocks rendering - MSW initializes in the background
 */
export function MSWProvider({ children }: { children: React.ReactNode }) {
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

      if (!shouldUseMocks) {
        return;
      }

      try {
        const { worker } = await import('@/mocks/browser');
        
        // Add a timeout to worker.start() to prevent hanging
        const startPromise = worker.start({
          onUnhandledRequest: 'bypass',
          serviceWorker: {
            url: '/mockServiceWorker.js',
          },
        });

        // Race between worker.start() and a timeout
        await Promise.race([
          startPromise,
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('MSW start timeout')), 3000)
          ),
        ]);

        console.log('✅ MSW worker started');
      } catch (error) {
        // Log error but don't block the app
        console.error('Failed to start MSW worker:', error);
        console.warn('Continuing without MSW - app will use real API endpoints');
      }
    };

    // Initialize MSW in the background - don't block rendering
    initMsw();
  }, []);

  // Always render children immediately - don't block the app
  // MSW will initialize in the background
  return <>{children}</>;
}
