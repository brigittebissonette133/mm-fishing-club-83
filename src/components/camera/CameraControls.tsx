
import React, { useState } from 'react';
import { Camera, RotateCcw, Check, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LureSelectionDialog from '../catch/LureSelectionDialog';
import { useSaveCatch } from '@/hooks/camera/useSaveCatch';
import { useToast } from '@/hooks/use-toast';

interface CameraControlsProps {
  capturedImage: string | null;
  error: string | null;
  cameraReady: boolean;
  isLoading: boolean;
  fishData: any;
  analysisError?: string | null;
  isAnalyzing?: boolean;
  onCapture: () => void;
  onRetake: () => void;
  onSave: () => void;
  onRetryAnalysis?: () => void;
}

const CameraControls = ({
  capturedImage,
  error,
  cameraReady,
  isLoading,
  fishData,
  analysisError,
  isAnalyzing,
  onCapture,
  onRetake,
  onSave,
  onRetryAnalysis
}: CameraControlsProps) => {
  const [showLureSelection, setShowLureSelection] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const { handleLureSelected } = useSaveCatch({
    fishData,
    locationData: null,
    capturedImage,
    analysisError,
    setIsSaving,
    toast,
    onClose: () => setShowLureSelection(false)
  });

  const handleSaveClick = () => {
    console.log('Save button clicked, showing lure selection');
    if (!capturedImage) {
      toast({
        title: "No Image",
        description: "Please capture an image first",
        variant: "destructive"
      });
      return;
    }
    setShowLureSelection(true);
  };

  console.log('CameraControls render:', { 
    capturedImage: !!capturedImage, 
    error: !!error, 
    cameraReady, 
    isLoading,
    fishData: !!fishData,
    analysisError,
    isAnalyzing
  });

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <div className="bg-gradient-to-t from-black via-black/90 to-transparent p-6 pb-8">
          {!capturedImage && !error ? (
            <div className="flex flex-col items-center space-y-6">
              {/* Status indicator */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-all duration-300 ${
                  isLoading 
                    ? 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/40' 
                    : !cameraReady 
                      ? 'bg-red-500/20 text-red-200 border border-red-500/40'
                      : 'bg-green-500/20 text-green-200 border border-green-500/40'
                }`}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Initializing camera...
                    </>
                  ) : !cameraReady ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      Camera not ready
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Ready to capture
                    </>
                  )}
                </div>
              </div>
              
              {/* Large shutter button */}
              <div className="relative flex items-center justify-center">
                <Button
                  onClick={() => {
                    console.log('Capture button clicked, cameraReady:', cameraReady, 'isLoading:', isLoading);
                    if (cameraReady && !isLoading) {
                      onCapture();
                    }
                  }}
                  disabled={!cameraReady || isLoading}
                  className="w-20 h-20 rounded-full bg-white hover:bg-gray-100 disabled:bg-gray-300 text-black shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 border-4 border-white/20 flex items-center justify-center group relative overflow-hidden"
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
                  Tap the white button to capture your fish
                </p>
              )}
            </div>
          ) : capturedImage ? (
            <div className="space-y-6">
              {/* Action buttons */}
              <div className="flex justify-center gap-4 max-w-sm mx-auto">
                <Button
                  onClick={() => {
                    console.log('Retake button clicked');
                    onRetake();
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-200 h-12 backdrop-blur-md"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                
                <Button
                  onClick={handleSaveClick}
                  size="lg"
                  disabled={isSaving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white transition-all duration-200 disabled:opacity-50 h-12 shadow-lg"
                >
                  {fishData ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Catch
                    </>
                  ) : isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : analysisError ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Anyway
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Save Photo
                    </>
                  )}
                </Button>
              </div>
              
              {/* Analysis status */}
              {isAnalyzing && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 text-sm backdrop-blur-md">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI analyzing your catch...
                  </div>
                </div>
              )}
              
              {/* Analysis error with retry option */}
              {analysisError && !isAnalyzing && (
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 text-sm backdrop-blur-md">
                    <AlertCircle className="w-4 h-4" />
                    {analysisError.includes('timed out') ? 'Analysis timed out' : 'Analysis failed'}
                  </div>
                  
                  {onRetryAnalysis && (
                    <Button
                      onClick={onRetryAnalysis}
                      variant="outline" 
                      size="sm"
                      className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md"
                    >
                      <RefreshCw className="w-3 h-3 mr-2" />
                      Retry Analysis
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Lure Selection Dialog */}
      <LureSelectionDialog
        isOpen={showLureSelection}
        onClose={() => setShowLureSelection(false)}
        onLureSelected={handleLureSelected}
      />
    </>
  );
};

export default CameraControls;
