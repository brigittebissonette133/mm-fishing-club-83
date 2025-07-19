
import React from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface NetworkStatusIndicatorProps {
  className?: string;
  showWhenOnline?: boolean;
}

const NetworkStatusIndicator = ({ 
  className = "", 
  showWhenOnline = false 
}: NetworkStatusIndicatorProps) => {
  const { isOnline, isSlowConnection, connectionType } = useNetworkStatus();

  // Only show indicator when offline, slow connection, or when explicitly requested to show online status
  if (isOnline && !isSlowConnection && !showWhenOnline) {
    return null;
  }

  const getStatusInfo = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="w-4 h-4 text-red-500" />,
        text: "Offline",
        bgColor: "bg-red-500/20",
        textColor: "text-red-200",
        borderColor: "border-red-500/40"
      };
    }
    
    if (isSlowConnection) {
      return {
        icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
        text: "Slow connection",
        bgColor: "bg-yellow-500/20",
        textColor: "text-yellow-200",
        borderColor: "border-yellow-500/40"
      };
    }
    
    return {
      icon: <Wifi className="w-4 h-4 text-green-500" />,
      text: "Online",
      bgColor: "bg-green-500/20",
      textColor: "text-green-200",
      borderColor: "border-green-500/40"
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs backdrop-blur-sm border ${statusInfo.bgColor} ${statusInfo.borderColor} ${className}`}>
      {statusInfo.icon}
      <span className={statusInfo.textColor}>{statusInfo.text}</span>
    </div>
  );
};

export default NetworkStatusIndicator;
