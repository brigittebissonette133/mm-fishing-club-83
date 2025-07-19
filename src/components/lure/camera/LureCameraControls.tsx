
import React from 'react';
import { Camera, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LureCameraStatus from './LureCameraStatus';

interface LureCameraControlsProps {
  capturedImage: string | null;
  error: string | null;
  isLoading: boolean;
  cameraReady: boolean;
  onCapture: () => void;
  onRetake: () => void;
  onSave: () => void;
}

const LureCameraControls = ({
  capturedImage,
  error,
  isLoading,
  cameraReady,
  onCapture,
  onRetake,
  onSave
}: LureCameraControlsProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 animate-slide-in-from-bottom">
      <div className="bg-gradient-to-t from-black via-black/90 to-transparent p-6 pb-8">
        {!capturedImage && !error ? (
          <div className="flex flex-col items-center space-y-6">
            {/* Status indicator */}
            <LureCameraStatus isLoading={isLoading} cameraReady={cameraReady} />
            
            {/* Large shutter button */}
            <div className="relative flex items-center justify-center">
              <Button
                onClick={onCapture}
                disabled={!cameraReady || isLoading}
                className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black shadow-2xl disabled:opacity-50 transition-all duration-200 active:scale-95 border-4 border-white/20 flex items-center justify-center group relative"
              >
                <Camera className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" />
                
                {/* Pulse ring when ready */}
                {cameraReady && !isLoading && (
                  <div className="absolute -inset-1 rounded-full border-2 border-white/30 animate-pulse"></div>
                )}
              </Button>
            </div>
            
            {/* Helper text */}
            {cameraReady && !isLoading && (
              <p className="text-white/90 text-sm text-center max-w-xs leading-relaxed">
                Position your lure in the frame and tap to capture
              </p>
            )}
          </div>
        ) : capturedImage ? (
          <div className="space-y-6">
            {/* Action buttons */}
            <div className="flex justify-center gap-4 max-w-sm mx-auto">
              <Button
                onClick={onRetake}
                variant="outline"
                size="lg"
                className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-200 h-12 backdrop-blur-md"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </Button>
              
              <Button
                onClick={onSave}
                size="lg"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 h-12 shadow-lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Save Lure Photo
              </Button>
            </div>
            
            {/* Clear messaging that this is for lures only */}
            <div className="text-center">
              <p className="text-white/80 text-sm">
                📸 Lure photo ready - no fish analysis will be performed
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LureCameraControls;
