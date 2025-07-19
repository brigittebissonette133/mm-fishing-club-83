
import { useCallback } from 'react';
import { SecureFileUpload } from '@/utils/fileUpload';
import { Logger } from '@/utils/logger';

interface UseCapturePhotoOptions {
  capturePhoto: () => string | null;
  stopCamera: () => void;
  analyzeFish: (imageDataUrl: string) => Promise<void>;
  setCapturedImage: (image: string | null) => void;
  toast: any;
}

export const useCapturePhoto = (options: UseCapturePhotoOptions) => {
  const {
    capturePhoto,
    stopCamera,
    analyzeFish,
    setCapturedImage,
    toast
  } = options;

  const handleCapturePhoto = useCallback(async () => {
    console.log('Handle capture photo called');
    try {
      // Haptic feedback for mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      const rawImageDataUrl = capturePhoto();
      console.log('Photo capture result:', rawImageDataUrl ? 'Success' : 'Failed');
      
      if (!rawImageDataUrl) {
        toast({
          title: "Capture Failed",
          description: "Please try again or check camera permissions.",
          variant: "destructive"
        });
        return;
      }

      // Show immediate feedback while compressing
      toast({
        title: "📸 Photo Captured!",
        description: "Optimizing image...",
        duration: 1500,
      });

      // Compress the image for better performance
      let compressedImageDataUrl: string;
      try {
        compressedImageDataUrl = await SecureFileUpload.processImageForCamera(rawImageDataUrl);
        console.log('Image compression completed');
      } catch (error) {
        console.warn('Image compression failed, using original:', error);
        compressedImageDataUrl = rawImageDataUrl;
      }

      setCapturedImage(compressedImageDataUrl);
      stopCamera();
      
      // Update success feedback
      toast({
        title: "📸 Photo Ready!",
        description: "Analyzing your catch...",
        duration: 1500,
      });

      // Start AI analysis with compressed image
      console.log('Starting fish analysis with compressed image...');
      await analyzeFish(compressedImageDataUrl);
      
    } catch (error: any) {
      console.error('Photo capture failed:', error);
      Logger.error('Photo capture failed', { error: error.message });
      toast({
        title: "Capture Failed",
        description: error.message || "Failed to capture photo.",
        variant: "destructive"
      });
    }
  }, [capturePhoto, stopCamera, analyzeFish, toast, setCapturedImage]);

  return { handleCapturePhoto };
};
