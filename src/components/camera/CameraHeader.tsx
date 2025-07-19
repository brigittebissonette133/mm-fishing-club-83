
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraHeaderProps {
  onClose: () => void;
}

const CameraHeader = ({ onClose }: CameraHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-700">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-white hover:bg-white/20"
      >
        <X className="w-5 h-5" />
      </Button>
      <h2 className="text-white font-semibold">Fish Identifier</h2>
      <div className="w-9" />
    </div>
  );
};

export default CameraHeader;
