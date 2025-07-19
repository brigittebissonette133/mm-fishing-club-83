
import { useCallback } from 'react';

interface UseRetakePhotoOptions {
  setCapturedImage: (image: string | null) => void;
  resetAnalysis: () => void;
  startCamera: () => void;
  toast: any;
}

export const useRetakePhoto = (options: UseRetakePhotoOptions) => {
  const {
    setCapturedImage,
    resetAnalysis,
    startCamera,
    toast
  } = options;

  const handleRetake = useCallback(() => {
    console.log('Handle retake called');
    setCapturedImage(null);
    resetAnalysis();
    
    // Smooth transition back to camera
    setTimeout(() => {
      startCamera();
    }, 100);
    
    toast({
      title: "Ready to capture",
      description: "Position your fish and tap the shutter",
      duration: 1500,
    });
  }, [resetAnalysis, startCamera, toast, setCapturedImage]);

  return { handleRetake };
};
