import type { ConnectionDetail } from './types';

declare global {
  interface Window {
    electronAPI?: {
      onConnectionUpdate: (callback: (connections: ConnectionDetail[]) => void) => void;
      onConnectionError: (callback: (error: string) => void) => void;
      requestRefresh: () => void;
      removeAllListeners: () => void;
    };
  }
}

export {};
