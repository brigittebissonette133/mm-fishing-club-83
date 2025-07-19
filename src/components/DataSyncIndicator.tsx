
import React, { useState, useEffect } from 'react';
import { Cloud, CloudOff, Check, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface DataSyncIndicatorProps {
  lastSaved?: Date;
  className?: string;
}

const DataSyncIndicator = ({ 
  lastSaved, 
  className = "" 
}: DataSyncIndicatorProps) => {
  const [showStatus, setShowStatus] = useState(false);
  const { isOnline, isSlowConnection } = useNetworkStatus();

  useEffect(() => {
    if (lastSaved) {
      setShowStatus(true);
      const timer = setTimeout(() => setShowStatus(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [lastSaved]);

  const getStatusIcon = () => {
    if (!isOnline) return <CloudOff className="w-4 h-4 text-red-500" />;
    if (isSlowConnection) return <Wifi className="w-4 h-4 text-yellow-500" />;
    if (showStatus) return <Check className="w-4 h-4 text-green-500" />;
    return <Cloud className="w-4 h-4 text-muted-foreground" />;
  };

  const getStatusText = () => {
    if (!isOnline) return "Offline - Data saved locally";
    if (isSlowConnection) return "Slow connection";
    if (showStatus) return "Saved";
    if (lastSaved) {
      const now = new Date();
      const diff = now.getTime() - lastSaved.getTime();
      const minutes = Math.floor(diff / 60000);
      if (minutes < 1) return "Just saved";
      if (minutes < 60) return `Saved ${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      return `Saved ${hours}h ago`;
    }
    return "Auto-save on";
  };

  const getStatusColor = () => {
    if (!isOnline) return "text-red-200";
    if (isSlowConnection) return "text-yellow-200";
    return "text-muted-foreground";
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-1 bg-muted/30 rounded-full text-xs backdrop-blur-sm ${className}`}>
      {getStatusIcon()}
      <span className={getStatusColor()}>{getStatusText()}</span>
    </div>
  );
};

export default DataSyncIndicator;
