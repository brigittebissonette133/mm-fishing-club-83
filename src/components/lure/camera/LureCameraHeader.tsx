
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LureCameraHeaderProps {
  onClose: () => void;
}

const LureCameraHeader = ({ onClose }: LureCameraHeaderProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-40">
      <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-white text-lg font-semibold">Capture Lure Photo</h1>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default LureCameraHeader;
