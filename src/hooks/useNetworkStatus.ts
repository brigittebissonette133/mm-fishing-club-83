
import { useState, useEffect } from 'react';
import { Logger } from '@/utils/logger';

export interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType: string;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    connectionType: 'unknown'
  });

  useEffect(() => {
    const updateNetworkStatus = () => {
      const isOnline = navigator.onLine;
      
      // Detect connection type if available
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection ? connection.effectiveType || 'unknown' : 'unknown';
      const isSlowConnection = connection ? (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') : false;

      const newStatus = {
        isOnline,
        isSlowConnection,
        connectionType
      };

      setNetworkStatus(prevStatus => {
        if (prevStatus.isOnline !== isOnline) {
          Logger.info('Network status changed', { 
            wasOnline: prevStatus.isOnline, 
            isOnline,
            connectionType 
          });
        }
        return newStatus;
      });
    };

    const handleOnline = () => {
      Logger.info('Network connection restored');
      updateNetworkStatus();
    };

    const handleOffline = () => {
      Logger.warn('Network connection lost');
      updateNetworkStatus();
    };

    const handleConnectionChange = () => {
      updateNetworkStatus();
    };

    // Initial status check
    updateNetworkStatus();

    // Event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Connection change listener for mobile networks
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return networkStatus;
};
