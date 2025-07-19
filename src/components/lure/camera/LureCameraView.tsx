
import React from 'react';
import { Button } from '@/components/ui/button';

interface LureCameraViewProps {
  capturedImage: string | null;
  error: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onRetry: () => void;
}

const LureCameraView = ({ 
  capturedImage, 
  error, 
  videoRef, 
  canvasRef, 
  onRetry 
}: LureCameraViewProps) => {
  if (capturedImage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black animate-fade-in">
        <img
          src={capturedImage}
          alt="Captured lure"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full animate-fade-in">
      {/* Camera prompt overlay - specifically for lures */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <div className="bg-black/70 text-white px-6 py-3 rounded-lg text-center backdrop-blur-sm">
          <p className="text-lg font-medium">🎣 Position lure in frame</p>
          <p className="text-sm opacity-80 mt-1">Center your lure for the best photo</p>
        </div>
      </div>

      {/* Camera view */}
      {error ? (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white">
          <div className="text-center p-6">
            <p className="text-lg mb-4">Camera Error</p>
            <p className="text-sm text-gray-300 mb-6">{error}</p>
            <Button 
              onClick={onRetry}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Try Again
            </Button>
          </div>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
};

export default LureCameraView;
