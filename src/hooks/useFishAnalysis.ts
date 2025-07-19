
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FishIdentificationService, FishIdentificationResult, LocationData } from '@/services/fishIdentificationService';
import { Logger } from '@/utils/logger';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

export const useFishAnalysis = () => {
  const [fishData, setFishData] = useState<FishIdentificationResult | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isOnline } = useNetworkStatus();

  const analyzeFish = useCallback(async (imageDataUrl: string) => {
    if (!imageDataUrl) {
      Logger.warn('No image provided for fish analysis');
      return;
    }

    // Check network status before starting
    if (!isOnline) {
      Logger.warn('Attempted fish analysis while offline');
      setAnalysisError('No internet connection. You can still save the photo manually.');
      toast({
        title: "📶 No Internet Connection",
        description: "Fish identification requires internet. You can save the photo manually.",
        variant: "default",
        duration: 5000,
      });
      
      // Still try to get cached location
      try {
        const locationResult = await FishIdentificationService.getCurrentLocation();
        setLocationData(locationResult);
      } catch (error) {
        Logger.warn('Failed to get offline location');
      }
      
      return;
    }

    setIsAnalyzing(true);
    setFishData(null);
    setLocationData(null);
    setAnalysisError(null);

    try {
      Logger.info('Starting fish analysis with timeout protection');
      
      // Start both identification and location detection in parallel
      const [identificationResult, locationResult] = await Promise.allSettled([
        FishIdentificationService.identifyFish(imageDataUrl),
        FishIdentificationService.getCurrentLocation()
      ]);

      // Handle fish identification result
      if (identificationResult.status === 'fulfilled') {
        setFishData(identificationResult.value);
        Logger.info('Fish identification successful', { 
          species: identificationResult.value.species,
          confidence: identificationResult.value.confidence 
        });
        
        toast({
          title: "🐟 Fish Identified!",
          description: `Found a ${identificationResult.value.species} with ${identificationResult.value.confidence}% confidence`,
          duration: 3000,
        });
      } else {
        const error = identificationResult.reason;
        Logger.error('Fish identification failed', { error: error.message });
        
        // Check if it's a network-related error
        if (error.message.includes('connection') || error.message.includes('network') || error.message.includes('internet')) {
          setAnalysisError('Network error. Check your connection and try again, or save manually.');
          toast({
            title: "📶 Network Error",
            description: "Check your internet connection. You can still save the photo manually.",
            variant: "default",
            duration: 5000,
          });
        } else if (error.message.includes('timed out')) {
          setAnalysisError('Analysis timed out. You can save the photo manually.');
          toast({
            title: "⏱️ Analysis Timed Out",
            description: "The AI analysis took too long. You can save your catch manually.",
            variant: "default",
            duration: 5000,
          });
        } else {
          setAnalysisError(error.message);
          toast({
            title: "Analysis Failed",
            description: "Unable to identify fish. You can still save the photo.",
            variant: "default",
            duration: 4000,
          });
        }
      }

      // Handle location result (non-critical, always provide fallback)
      if (locationResult.status === 'fulfilled') {
        setLocationData(locationResult.value);
        Logger.info('Location detection successful', { location: locationResult.value.name });
        
        // Cache location for offline use
        localStorage.setItem('lastKnownLocation', JSON.stringify(locationResult.value));
      } else {
        Logger.warn('Location detection failed, using fallback', { error: locationResult.reason });
        setLocationData({
          name: "Unknown Location",
          coordinates: "Location not available"
        });
      }

    } catch (error: any) {
      Logger.error('Fish analysis failed completely', { error: error.message });
      
      setFishData(null);
      setAnalysisError(error.message);
      setLocationData({
        name: "Unknown Location",
        coordinates: "Location not available"
      });
      
      // Network-specific error handling
      if (!isOnline || error.message.includes('connection')) {
        toast({
          title: "📶 Connection Lost",
          description: "Lost internet connection during analysis. You can save the photo manually.",
          variant: "default",
          duration: 4000,
        });
      } else {
        toast({
          title: "Analysis Error",
          description: "Something went wrong during analysis. You can still save your photo.",
          variant: "default",
          duration: 4000,
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast, isOnline]);

  const resetAnalysis = useCallback(() => {
    Logger.info('Resetting fish analysis data');
    setFishData(null);
    setLocationData(null);
    setIsAnalyzing(false);
    setAnalysisError(null);
  }, []);

  const retryAnalysis = useCallback(async (imageDataUrl: string) => {
    // Check network before retry
    if (!navigator.onLine) {
      toast({
        title: "📶 Still Offline",
        description: "Please check your internet connection before retrying.",
        variant: "default",
        duration: 3000,
      });
      return;
    }
    
    Logger.info('Retrying fish analysis');
    await analyzeFish(imageDataUrl);
  }, [analyzeFish, toast]);

  return {
    fishData,
    locationData,
    isAnalyzing,
    analysisError,
    analyzeFish,
    resetAnalysis,
    retryAnalysis,
    isOnline
  };
};
