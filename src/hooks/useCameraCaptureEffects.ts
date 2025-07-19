
import { useEffect } from 'react';

interface UseCameraCaptureEffectsOptions {
  setIsUiReady: (ready: boolean) => void;
  startCamera: () => void;
  stopCamera: () => void;
  toast: any;
  onClose: () => void;
  stream: MediaStream | null;
  capturedImage: string | null;
}

export const useCameraCaptureEffects = (options: UseCameraCaptureEffectsOptions) => {
  const {
    setIsUiReady,
    startCamera,
    stopCamera,
    toast,
    onClose,
    stream,
    capturedImage
  } = options;

  // Initialize with smooth entrance
  useEffect(() => {
    console.log('Camera capture component mounted, initializing...');
    setIsUiReady(true);
    
    // Small delay to ensure UI is ready before starting camera
    const initTimer = setTimeout(() => {
      startCamera();
    }, 100);
    
    // Welcome message
    const welcomeTimer = setTimeout(() => {
      toast({
        title: "🎣 AI Fish Identifier Ready",
        description: "Capture your fish and let AI identify the species!",
        duration: 3000,
      });
    }, 1500);

    return () => {
      clearTimeout(initTimer);
      clearTimeout(welcomeTimer);
      console.log('Camera capture component unmounting, stopping camera...');
      stopCamera();
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        console.log('Escape key pressed, closing camera');
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle visibility change to pause/resume camera
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && stream) {
        console.log('Page hidden, camera stream will continue but user should know');
      } else if (!document.hidden && !capturedImage && !stream) {
        console.log('Page visible again, attempting to restart camera');
        startCamera();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [stream, capturedImage, startCamera]);
};
