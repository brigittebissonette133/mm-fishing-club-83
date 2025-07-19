
import React from 'react';
import { AlertCircle, Camera, Target, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  error: string | null;
  isLoading: boolean;
  cameraReady: boolean;
  onRetry: () => void;
}

const CameraView = ({ 
  videoRef, 
  canvasRef, 
  error, 
  isLoading, 
  cameraReady, 
  onRetry 
}: CameraViewProps) => {
  if (error) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
        <div className="text-center text-white max-w-sm space-y-6">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Camera Access Required</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {error.includes('NotAllowedError') || error.includes('denied') 
                ? "Camera permission was denied. Please allow camera access in your browser settings and try again."
                : error
              }
            </p>
          </div>
          
          {error.includes('NotAllowedError') || error.includes('denied') ? (
            <div className="space-y-3">
              <Button 
                onClick={onRetry} 
                variant="outline" 
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Try Again
              </Button>
              <div className="text-xs text-gray-400 space-y-1">
                <p className="flex items-center gap-2 justify-center">
                  <Settings className="w-3 h-3" />
                  Go to browser settings → Allow camera access
                </p>
              </div>
            </div>
          ) : (
            <Button 
              onClick={onRetry} 
              variant="outline" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-black overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20 backdrop-blur-sm">
          <div className="text-center text-white space-y-4">
            <div className="relative">
              <div className="w-16 h-16 mx-auto border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <Camera className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white/70" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Starting Camera</h3>
              <p className="text-white/70 text-sm">Please allow camera access when prompted</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Video element */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          cameraReady ? 'opacity-100' : 'opacity-30'
        }`}
        style={{ transform: 'scaleX(-1)' }}
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Camera overlay - only show when camera is ready */}
      {cameraReady && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Center target */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <Target className="w-8 h-8 text-white/60 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 border-2 border-white/30 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Corner frame indicators */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-white/60 rounded-tl-lg"></div>
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-white/60 rounded-tr-lg"></div>
          <div className="absolute bottom-36 left-8 w-8 h-8 border-l-2 border-b-2 border-white/60 rounded-bl-lg"></div>
          <div className="absolute bottom-36 right-8 w-8 h-8 border-r-2 border-b-2 border-white/60 rounded-br-lg"></div>
          
          {/* Top instruction */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
              <p className="text-white text-sm font-medium">Position fish in center and tap to capture</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraView;
