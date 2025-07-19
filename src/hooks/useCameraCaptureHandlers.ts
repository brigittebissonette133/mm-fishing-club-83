
import { useCapturePhoto } from './camera/useCapturePhoto';
import { useRetakePhoto } from './camera/useRetakePhoto';
import { useSaveCatch } from './camera/useSaveCatch';
import { useRetryAnalysis } from './camera/useRetryAnalysis';

interface UseCameraCaptureHandlersOptions {
  capturePhoto: () => string | null;
  stopCamera: () => void;
  startCamera: () => void;
  analyzeFish: (imageDataUrl: string) => Promise<void>;
  resetAnalysis: () => void;
  retryAnalysis?: (imageDataUrl: string) => Promise<void>;
  setCapturedImage: (image: string | null) => void;
  setIsSaving: (saving: boolean) => void;
  fishData: any;
  locationData: any;
  capturedImage: string | null;
  analysisError?: string | null;
  toast: any;
  onClose: () => void;
}

export const useCameraCaptureHandlers = (options: UseCameraCaptureHandlersOptions) => {
  const {
    capturePhoto,
    stopCamera,
    startCamera,
    analyzeFish,
    resetAnalysis,
    retryAnalysis,
    setCapturedImage,
    setIsSaving,
    fishData,
    locationData,
    capturedImage,
    analysisError,
    toast,
    onClose
  } = options;

  const { handleCapturePhoto } = useCapturePhoto({
    capturePhoto,
    stopCamera,
    analyzeFish,
    setCapturedImage,
    toast
  });

  const { handleRetake } = useRetakePhoto({
    setCapturedImage,
    resetAnalysis,
    startCamera,
    toast
  });

  const { handleSave } = useSaveCatch({
    fishData,
    locationData,
    capturedImage,
    analysisError,
    setIsSaving,
    toast,
    onClose
  });

  const { handleRetryAnalysis } = useRetryAnalysis({
    capturedImage,
    retryAnalysis,
    toast
  });

  return {
    handleCapturePhoto,
    handleRetake,
    handleSave,
    handleRetryAnalysis
  };
};
