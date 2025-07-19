
import { useCallback } from 'react';

interface UseRetryAnalysisOptions {
  capturedImage: string | null;
  retryAnalysis?: (imageDataUrl: string) => Promise<void>;
  toast: any;
}

export const useRetryAnalysis = (options: UseRetryAnalysisOptions) => {
  const {
    capturedImage,
    retryAnalysis,
    toast
  } = options;

  const handleRetryAnalysis = useCallback(async () => {
    if (!capturedImage || !retryAnalysis) return;
    
    console.log('Handle retry analysis called');
    toast({
      title: "🔄 Retrying Analysis",
      description: "Attempting to identify your fish again...",
      duration: 2000,
    });
    
    await retryAnalysis(capturedImage);
  }, [capturedImage, retryAnalysis, toast]);

  return { handleRetryAnalysis };
};
