
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useCamera } from '@/hooks/useCamera';
import { useFishAnalysis } from '@/hooks/useFishAnalysis';

export const useCameraCaptureLogic = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUiReady, setIsUiReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const cameraHook = useCamera();
  const fishAnalysisHook = useFishAnalysis();

  return {
    // State
    capturedImage,
    setCapturedImage,
    isUiReady,
    setIsUiReady,
    isSaving,
    setIsSaving,
    toast,
    
    // Hooks
    ...cameraHook,
    ...fishAnalysisHook
  };
};
