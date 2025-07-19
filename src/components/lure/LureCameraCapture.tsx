
import React, { useState, useEffect } from 'react';
import { useCamera } from '@/hooks/useCamera';
import { useToast } from '@/hooks/use-toast';
import LureCameraHeader from './camera/LureCameraHeader';
import LureCameraView from './camera/LureCameraView';
import LureCameraControls from './camera/LureCameraControls';

interface LureCameraCaptureProps {
  onClose: () => void;
  onPhotoSaved: (imageDataUrl: string) => void;
}

const LureCameraCapture = ({ onClose, onPhotoSaved }: LureCameraCaptureProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUiReady, setIsUiReady] = useState(false);
  const { toast } = useToast();
  
  const {
    stream,
    error,
    isLoading,
    cameraReady,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    capturePhoto
  } = useCamera();

  // Initialize camera and UI
  useEffect(() => {
    const initializeCamera = async () => {
      await startCamera();
      // Small delay for smooth transition
      setTimeout(() => setIsUiReady(true), 300);
    };

    initializeCamera();

    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const handleCapturePhoto = () => {
    console.log('Capture button clicked for lure photo');
    if (!cameraReady) {
      toast({
        title: "Camera Not Ready",
        description: "Please wait for camera to initialize",
        variant: "destructive"
      });
      return;
    }

    const imageDataUrl = capturePhoto();
    if (imageDataUrl) {
      setCapturedImage(imageDataUrl);
      stopCamera();
      console.log('Lure photo captured successfully - NO FISH ANALYSIS');
    }
  };

  const handleRetake = () => {
    console.log('Retake lure photo button clicked');
    setCapturedImage(null);
    startCamera();
  };

  const handleSave = () => {
    console.log('Save lure photo button clicked - bypassing fish analysis');
    if (capturedImage) {
      // Directly save the lure photo without any fish analysis
      onPhotoSaved(capturedImage);
    }
  };

  const handleClose = () => {
    console.log('Lure camera close button clicked');
    stopCamera();
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ${
      isUiReady ? 'opacity-100' : 'opacity-0'
    }`}>
      <LureCameraHeader onClose={handleClose} />

      {/* Camera View / Captured Image */}
      <div className="flex-1 relative">
        <LureCameraView
          capturedImage={capturedImage}
          error={error}
          videoRef={videoRef}
          canvasRef={canvasRef}
          onRetry={startCamera}
        />
      </div>

      {/* Bottom Controls */}
      <LureCameraControls
        capturedImage={capturedImage}
        error={error}
        isLoading={isLoading}
        cameraReady={cameraReady}
        onCapture={handleCapturePhoto}
        onRetake={handleRetake}
        onSave={handleSave}
      />
    </div>
  );
};

export default LureCameraCapture;
