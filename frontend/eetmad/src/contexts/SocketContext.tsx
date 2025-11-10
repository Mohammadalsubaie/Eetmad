'use client';

import { createContext, useContext, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SocketContextType {
  // Socket methods will be added here
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  // Socket implementation will be added here
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
